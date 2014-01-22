var mongoose = require('mongoose'), utils =require('./utils'), Q = require('q');
var Tp = mongoose.model('Tradedplayer');
exports.tradedPlayers = {};
exports.all = function(){
  var d = Q.defer();
  var currentSeason = new Date();
  if (currentSeason.getMonth() < 8){
    currentSeason.setYear(currentSeason.getFullYear() - 1);
  }
  currentSeason.setMonth(8);
  Tp.find({created:{$gte:currentSeason}})
  .exec(function(err,data){
    var tps = utils.toObj(data,'PLAYER_ID');
    exports.tradedPlayers = tps;
    d.resolve(tps);
  });
  return d.promise;
};

exports.create = function(player){
  var tp = {
    PLAYER_ID : player.PLAYER_ID,
    newId : Math.floor(Math.random()*500000000) + 200000000,
    newTeam: player.TEAM_ABBREVIATION,
    created: utils.dateTimeless()
  };
  var tradedPlayer = new Tp(tp);
  tradedPlayer.save(function(err){
    if(err){
      console.log(err);
    }
  });
  return tp;
};

exports.destroy = function(player){
  var tradedPlayer = new Tp(player);
  tradedPlayer.remove(function(err){
    if(err){
      console.log(err);
    }
  });
};


exports.handleTrades = function(player,tradedPlayers,missingTradeData){
  var traded = tradedPlayers[player.PLAYER_ID];
  if (traded && player.TEAM_ABBREVIATION === 'TOTAL' && traded.newTeam){
    player.TEAM_ABBREVIATION === traded.newTeam;
  }
  if (traded && player.TEAM_ABBREVIATION !== 'TOTAL' && !missingTradeData && !traded.newTeam){
    player.TEAM_ABBREVIATION = 'zzzzzz';
  }
  if (!traded && player.TEAM_ABBREVIATION === 'TOTAL'){
    delete player.TEAM_ABBREVIATION;
    exports.create(player);
    return 'NEWTRADE';
  }
};

exports.addNewPlayerTeam = function(tradedPlayers,allStats){
  var updated = false;
  for (var player in tradedPlayers){
    var tp = tradedPlayers[player];
    if (!tp.newTeam || tp.newTeam === 'TOTAL'){
      exports.destroy(tp);
      exports.create(allStats[tp.PLAYER_ID]);
      updated = true;
    }
  }
  if (updated){return true;}
};

exports.splitData = function(tradedPlayers,stats,model,map){
  var d = Q.defer();
  if (!tradedPlayers){
    d.resolve();
    return d.promise;
  }
  var toSplit = 0, splitComplete = 0;
  var cutoffDate = utils.dateTimeless('1-22-2014');
  for (var player in tradedPlayers){
    var tp = tradedPlayers[player];
    if (tp.created < cutoffDate){
      continue;
    }
    toSplit++;
    mongoose.model(model)
    .find({created:tp.created,PLAYER_ID:tp.PLAYER_ID})
    .limit(1)
    .exec(function(err,oldPlayerStats){
      var op = oldPlayerStats[0];
      if (op){
        var oid = op.PLAYER_ID;
        var nid = tradedPlayers[oid].newId;
        stats[nid] = {};
        for (var stat in stats[oid]){
          stats[nid][stat] = stats[oid][stat] - op[map[stat].key];
        }
        stats[oid] = {};
        for (var stat in op){
          stats[oid][map[stat].key] = op[stat];
        }
      }
      splitComplete++;
      if (toSplit === splitComplete){
        d.resolve();
      }
    });
  }
  if ( toSplit === 0 ){
    d.resolve();
  }
  for (var player in stats){
    if (stats[player].TEAM_ABBREVIATION === 'TOTAL'){
      stats[player].TEAM_ABBREVIATION = tradedPlayers[player].newTeam;
    }
  }
  return d.promise;
};
