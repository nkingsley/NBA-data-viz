var mongoose = require('mongoose'), utils =require('./utils'),q = require('Q'), 
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

exports.timeWindow = function(req,res){
  var dateStart = utils.dateTimeless(req.params.dateStart);
  var dateEnd = utils.dateTimeless(req.params.dateEnd);
  mongoose.model("Rawstat").find({created: dateStart})
  .exec(function(err,start){
    mongoose.model("Rawstat").find({created: dateEnd})
    .exec(function(err,end){
      var startObj = utils.toObj(start, "Player");
      var endObj = utils.toObj(end, "Player");
      var diff = utils.diff(startObj,endObj);
      utils.reverseTags(diff);
      statControl.finish(diff)
      .then(function(megaStats){
        if (req.params.team.length === 3){
        var completeData = {};
        for (var player in megaStats.Playernorm){
          var pl = megaStats.Playernorm[player];
          if (pl.Team === req.params.team){
            completeData[player] = pl;
          }
        }
      } else {
        completeData = megaStats.Teamnorm;
      }
      res.setHeader('Content-Type', 'application/JSON');
      res.end(JSON.stringify(completeData));
      });
    });
  });
};

exports.player = function(req,res){
  var date = utils.dateTimeless();
  var subroutine = function(date){
    var d = q.defer();
    mongoose.model('Playernorm').find({Player: new RegExp('^'+req.params.name+'$', "i"),created:date},function(err,data){
      console.log(date);
      if (data.length === 0){
        date.setDate(date.getDate()-1);
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

exports.team = function(req,res){
  var date = utils.dateTimeless();
  var subroutine = function(date){
    var d = q.defer();
    mongoose.model('Playernorm').find({Team: new RegExp('^'+req.params.team+'$', "i"),created:date},function(err,data){
      console.log(date);
      if (data.length === 0){
        date.setDate(date.getDate()-1);
        subroutine(date);
        return;
      }
      d.resolve(data);
    });
    return d.promise;
  };
  subroutine(date)
  .then(function(data){
    var playersArr = [];
    var map = maps.reverseMap();
    for (var player in data){
      var playerObj = {
        Player: data[player].Player,
        stats: []
      };
      for (var stat in data[player]){
        if (map[stat] && map[stat].name){
          playerObj.stats.push({name:stat,rank:data[player][stat + '_rank'],norm:data[player][stat]});
        }
      }
      playersArr.push(playerObj);
    }
    res.setHeader('Content-Type', 'application/JSON');
    res.end(JSON.stringify(playersArr));
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