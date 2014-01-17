var cbs = require('./callbacks');
var normalize = require('./normalize');
var map = require('./map').map;

var runCallbacks = function(player,pgDone){
  for (var stat in player){
    var statMap = map[stat];
    //callbacks that rely on stats delivered per game must wait for those stats to be totaled
    if (!pgDone && statMap.callback === cbs.perGame){
      statMap.callback && statMap.callback(player,stat,statMap.compare);
    } else if (pgDone && statMap.callback !== cbs.perGame){
      statMap.callback && statMap.callback(player,stat,statMap.compare);
    }
  }
  !pgDone && runCallbacks(player,true);
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
    if (stat === "PLAYER"){
      player['Player'] = player[stat];
      delete player[stat];
      continue;
    }
    if (stat === "TEAM_ABBREVIATION"){
      player['Team'] = player[stat];
      delete player[stat];
      continue;
    }
    var statMap = map[stat];
    if (statMap.name){
      statMap.name = statMap.name.replace(/ /g,'_');
    }
    var key = ( statMap.cat || 'NA' ) + '_' + ( statMap.name || stat ) + '_' + (statMap.posneg || 'NEU');
    player[key] = player[stat];
    delete player[stat];
  }
};

exports.finish = function(allStats){
  for (var id in allStats){
    cleanUp(allStats[id]);
  }
  for (var id in allStats){
    runCallbacks(allStats[id]);
  }
  var teamsNorm = normalize.normTeams(allStats,map);
  for (var id in teamsNorm){
    addTags(teamsNorm[id]);
  }
  // var playersNorm = normalize.normPlayers(allStats,map,teamsNorm);
  // for (var id in allStats){
  //   addTags(allStats[id]);
  // }
  return {teams:teamsNorm};
};
