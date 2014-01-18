var mongoose = require('mongoose'), utils =require('./utils'), Q = require('q');
var Tp = mongoose.model('Tradedplayer');
exports.tradedPlayers = {};
exports.all = function(){
  var d = Q.defer();
  //todo: find this season's traded players
  // var currentSeason = new Date();
  // if (currentSeason.getMonth() < 5){
  //   currentSeason.setYear(currentSeason.getYear() - 1);
  // }
  // currentSeason.setMonth(4);
  Tp.find()
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
  })
}


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
  var playersToSplit = [];
  for (var player in tradedPlayers){
    var tp = tradedPlayers[player];
    tp.created = new Date(tp.created);
    if (tp.created < new Date(1,19,2014)){
      continue;
    }
    var 1dayearlier = utils.makeDate(tp.created,-1);
    playersToSplit.push({created:{$lte:tp.created,$gt:1dayearlier},PLAYER_ID:tp.PLAYER_ID})
  }
  mongoose.Model(model).find(playersToSplit).exec(function(err,oldPlayerStats){
    for (var i = 0 ; i < oldPlayerStats.length ; i++){
      var oldPlayer = oldPlayerStats[i];
      for (var stat in oldPlayer){
        var oldId = oldPlayer.PLAYER_ID;
        var newId = tradedPlayers[oldId].newId;
        stats[newId] = {};
        for (var stat in stats[oldId]){
          stats[newId].stat = stats[oldId][stat] - oldPlayer[stat];      
        }
        stats[oldId] = oldPlayer;
      }
    }
    d.resolve(stats);
  });
  return d.promise;
};