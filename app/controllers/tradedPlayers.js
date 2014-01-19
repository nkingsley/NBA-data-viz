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
    if (tp.created > utils.dateTimeless('1-19-2014')){
      continue;
    }
    playersToSplit.push({created:tp.created,PLAYER_ID:tp.PLAYER_ID});
  }
  // mongoose.model(model).find(playersToSplit).exec(function(err,oldPlayerStats){
  //   if (err){
  //     console.log(err);
  //   }
  //   console.log('old players length',oldPlayerStats.length);
  //   for (var i = 0 ; i < oldPlayerStats.length ; i++){
  //     var oldPlayer = oldPlayerStats[i];
  //     // console.log(oldPlayer);
  //     for (var stat in oldPlayer){
  //       var oldId = oldPlayer.PLAYER_ID;
  //       var newId = tradedPlayers[oldId].newId;
  //       stats[newId] = {};
  //       for (var stat in stats[oldId]){
  //         stats[newId][map[stat]] = stats[oldId][stat] - oldPlayer[stat];      
  //       }
  //       stats[oldId] = {};
  //       for (var stat in oldPlayer){
  //         stats[oldId][map[stat]] = oldPlayer[stat];
  //       }
  //     }
  //   }
  //   // console.log(stats[2544]); //LeBron!
  //   d.resolve(stats);
  // });
  // return d.promise;
  for (var player in stats){
    if (stats[player].TEAM_ABBREVIATION === 'TOTAL'){
      stats[player].TEAM_ABBREVIATION = tradedPlayers[player].newId;
    }
  }
  d.resolve(stats);
  return d.promise;
};