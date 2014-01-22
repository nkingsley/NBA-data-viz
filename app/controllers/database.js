var mongoose = require('mongoose'), utils =require('./utils'), q = require('Q'), 
statControl = require('./statControl'), maps = require('./map');

exports.newHighScore = function(req,res){
  var Catobj = mongoose.model('Catobj');
  var catobj = new Catobj(req.body);
  catobj.save(function(err){
    if(err){
      console.log(err);
    }
    res.end('Success');
  });
};

exports.saveWins = function(wl){
  var Winloss = mongoose.model('Winloss');
  var winloss = new Winloss(wl);
  winloss.created = utils.dateTimeless();
  winloss.save(function(err){
    if(err){
      console.log(err);
    }
  });
};

exports.players = function(req,res){
  var date = utils.dateTimeless();
  var subroutine = function(date){
    var d = q.defer();
    mongoose.model('Playernorm').find({created:date},function(err,data){
      console.log(date);
      if (data.length === 0){
        date.setDate(date.getDate()-1);
        if (date < new Date('1-20-2014')){
          d.resolve();
        }
        subroutine(date);
        return;
      }
      d.resolve(data);
    });
    return d.promise;
  };
  subroutine(date)
  .then(function(data){
    res.setHeader('Content-Type', 'application/JSON');
    res.end(JSON.stringify(data));
  });
};

exports.init = function(req,res){
  mongoose.model('Teamnorm')
  .find()
  .sort({created:-1})
  .limit(30)
  .exec(function(err,teams){
    mongoose.model('Catobj')
    .find()
    .sort({score:-1})
    .limit(1)
    .exec(function(err,catobj){
      mongoose.model('Winloss')
      .find()
      .sort({created:-1})
      .limit(1)
      .exec(function(err,winPct){
        var data = {
          teams: utils.toObj(teams,'Team'),
          cat: catobj[0],
          winPct: utils.toObj(winPct[0].teams,'franchise')
        };
        res.setHeader('Content-Type', 'application/JSON');
        res.end(JSON.stringify(data));
      })
    });
  });
};

exports.create = function(model,collection){
  var date = utils.dateTimeless();
  var Model = mongoose.model(model);
  var d = q.defer();
  var done = 0, total= Object.keys(collection).length;
  for (var item in collection){
    var data = new Model(collection[item]);    
    data.created = date;
    data.save(function(err) {
      done++;
      if (err){
        console.log(err);
      }
      if (total === done){
        d.resolve();
      }
    });
  }
  return d.promise;
}

exports.saveAll = function(finishedStats){
  var d = q.defer();
  var total= Object.keys(finishedStats).length;
  var done = 0;
  for (var model in finishedStats){
    exports.create(model,finishedStats[model])
    .then(function(){
      done++;
      if (done === total){
        d.resolve();
      }
    })
  }
  return d.promise;
};