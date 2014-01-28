var mongoose = require('mongoose'), utils =require('./utils'), q = require('q'), 
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

exports.checkDate = function(date){
  var noStatsToday = q.defer();
  mongoose.model('Playernorm').find({created:{$gte:date}},function(err,data){
    if (!data){
      noStatsToday.resolve(true);
      return;
    }
    if (data.length === 0){
      noStatsToday.resolve(true);
      return;
    }
    noStatsToday.resolve(false);
  });
  return noStatsToday.promise;
};

exports.players = function(req,res){
  var date = utils.dateTimeless();
  var d = q.defer();
  var subroutine = function(date){
    mongoose.model('Playernorm').find({created:date},function(err,data){
      console.log(date,data.length);
      if (data.length === 0){
        console.log('lame');
        date.setDate(date.getDate()-1);
        if (date < new Date('1-20-2014')){
          d.resolve();
          return;
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

exports.teamMovAvg = function(req,res){
  var start = utils.dateTimeless(req.params.start);
  var end = utils.dateTimeless(req.params.end);
  mongoose.model('Tnmovavg')
  .find({Team:req.params.team,created:{$gte:start,$lte:end}})
  .exec(function(err,averages){
    res.setHeader('Content-Type', 'application/JSON');
    res.end(JSON.stringify(averages));
  });
};

exports.playerMovAvg = function(req,res){
  var start = utils.dateTimeless(req.params.start);
  var end = utils.dateTimeless(req.params.end);
  mongoose.model('Pnmovavg')
  .find({Player:req.params.player,created:{$gte:start,$lte:end}})
  .exec(function(err,averages){
    res.setHeader('Content-Type', 'application/JSON');
    res.end(JSON.stringify(averages));
  });
};

exports.presetList = function(req,res){
  mongoose.model('Catobj')
  .find({user:req.user._id})
  .exec(function(err,presets){
    res.setHeader('Content-Type', 'application/JSON');
    res.end(JSON.stringify(presets));
  });
};


exports.presets = function(){
  var d = q.defer();
  mongoose.model('Catobj')
  .find({user:"52e6e0bf002038080022c945"})
  .exec(function(err,presets){
    d.resolve(presets);
  });
  return d.promise;
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
        exports.presets()
        .then(function(presets){
          var data = {
            teams: utils.toObj(teams,'Team'),
            cat: catobj[0],
            winPct: utils.toObj(winPct[0].teams,'franchise'),
            presets: presets
          };
          res.setHeader('Content-Type', 'application/JSON');
          res.end(JSON.stringify(data));
        });
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