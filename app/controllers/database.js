var mongoose = require('mongoose'),
    _ = require('lodash');

exports.newHighScore = function(req,res){
  var Catobj = mongoose.model('Catobj');
  var catobj = new Catobj(req.body);
  catobj.save(function(err){
    if(err){
      console.log(err);
    }
    res.end('Success');
  });
}

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
          teams: toObj(teams,'Team'),
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
  var Model = mongoose.model(model);
  for (var item in collection){
    var data = new Model(collection[item]);
    data.save(function(err) {
      if (err){
        console.log(err);
      }
    });
  }
}

exports.saveAll = function(finishedStats){
  for (var model in finishedStats){
    exports.create(model,finishedStats[model]);
  }
};

var toObj = function(array,key){
  var obj = {};
  for (var i = 0 ; i < array.length ; i++){
    obj[array[i][key]] = array[i];
  }
  return obj;
};