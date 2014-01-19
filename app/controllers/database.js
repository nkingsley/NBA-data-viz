var mongoose = require('mongoose'), utils =require('./utils');

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

exports.timeWindow = function(req,res){
  var dateStart = utils.DateTimeless(dateStart);
  var dateEnd = utils.DateTimeless(dateEnd);
  var findStart = {created: dateStart};
  var findEnd = {created: dateEnd};
  if(req.params.filter){
    findStart[filter] = 1;
    findEnd[filter] = 1;
  }
  var filter = req.params.filter || 'Team';
  mongoose.model(req.params.model).find(findStart)
  .exec(function(err,start){
    mongoose.model(req.params.model).find(findEnd)
    .exec(function(err,end){
      var startObj = utils.toObj(start, filter);
      var endObj = utils.toObj(end, filter);
      var diff = utils.diff(startObj,endObj);
      res.setHeader('Content-Type', 'application/JSON');
      res.end(JSON.stringify(diff));
    });
  });
};

exports.player = function(req,res){
  mongoose.model(req.params.model).find({Player: new RegExp('^'+req.params.name+'$', "i")},function(err,data){
    res.setHeader('Content-Type', 'application/JSON');
    res.end(JSON.stringify(data));
  });
};

exports.team = function(req,res){
  mongoose.model(req.params.model).find({Team: new RegExp('^'+req.params.team+'$', "i")},function(err,data){
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
        var data = {
          teams: utils.toObj(teams,'Team'),
          cat: catobj[0]
        };
        res.setHeader('Content-Type', 'application/JSON');
        res.end(JSON.stringify(data));
      });
  });
};

exports.all = function(req,res){
  mongoose.model(req.params.model).find(function(err,data){
    res.setHeader('Content-Type', 'application/JSON');
    res.end(JSON.stringify(data));
  });
};

exports.create = function(model,collection){
  var date = utils.dateTimeless();
  var Model = mongoose.model(model);
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
        exports.total--;
      }
      if (exports.total === 0){
        mongoose.connection.close();
      }
    });
  }
}

exports.saveAll = function(finishedStats){
  exports.total= Object.keys(finishedStats).length;
  for (var model in finishedStats){
    exports.create(model,finishedStats[model]);
  }
};