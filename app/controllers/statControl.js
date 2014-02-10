var 
  _ = require('lodash'), 
  cbs = require('./callbacks'), 
  normalize = require('./normalize'), 
  maps = require('./map'), map = maps.map,
  Q = require('q');
  tp = require('./tradedPlayers'),
  ranks = require('./ranks');

var runCallbacks = function(player,perGameCalcsComplete){
  for (var stat in player){
    var statMap = map[stat];
    //some callbacks rely on totals made in perGame callback
    if (!perGameCalcsComplete && statMap.callback === cbs.perGame){
      statMap.callback(player,stat,statMap.compare);
    } else if (perGameCalcsComplete && statMap.callback !== cbs.perGame){
      statMap.callback && statMap.callback(player,stat,statMap.compare);
    }
  }
  !perGameCalcsComplete && runCallbacks(player,true);
};

var cleanUp = function(player){
  for (var stat in player){
    if (!map[stat].name && !map[stat].keep){
      delete player[stat];
    }
  }
};

var addTags = function(player){
  for (var stat in player){
    if (map[stat].name){
      map[stat].name = map[stat].name;
    }
    var key = map[stat].name || map[stat].keep || stat;
    player[key] = player[stat];
    !map[stat].keep && delete player[stat];
  }
};


exports.finish = function(allStats,tradedPlayers,skipCallbacks){
  var d = Q.defer();
  for (var id in allStats){
    cleanUp(allStats[id]);
  }
  if (!skipCallbacks){
    for (var id in allStats){
      runCallbacks(allStats[id]);
    } 
  }
  tp.splitData(allStats,'Rawstat',tradedPlayers)
  .then(function(){
    var teamsNorm = normalize.normTeams(allStats,map);  
    for (var team in teamsNorm){
      addTags(teamsNorm[team]);
    }
    // console.log(teamsNorm.MIA);
    var playersNorm = normalize.normPlayers(allStats,map,teamsNorm);
    for (var id in playersNorm){
      addTags(playersNorm[id]);
    }
    for (var id in allStats){
      addTags(allStats[id]);
    }
    // console.log(playersNorm[2544]); //LeBron!
    var megaStats = {
      Teamnorm:teamsNorm,
      Playernorm:playersNorm, 
      Rawstat: allStats
    };
    d.resolve(megaStats);
  });
  return d.promise;
};
