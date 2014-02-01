var mongoose = require('mongoose'), utils =require('./utils'), Q = require('q'),
Tp = mongoose.model('Tradedplayer'), maps = require('./map');
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
  return tradedPlayer;
};

exports.destroy = function(player){
  var tradedPlayer = new Tp(player);
  tradedPlayer.remove(function(err){
    if(err){
      console.log(err);
    }
  });
};


exports.checkForTrades = function(player){
  var traded = this.tradedPlayers[player.PLAYER_ID];
  var total = (player.TEAM_ABBREVIATION === 'TOTAL');
  if (traded && total && traded.newTeam){
    player.TEAM_ABBREVIATION === traded.newTeam;
  }
  if (traded && !total){
    return 'SKIP';
  }
  if (!traded && total){
    delete player.TEAM_ABBREVIATION;
    this.tradedPlayers[player.PLAYER_ID] = this.create(player);
  }
};

exports.giveNewTeam = function(allStats){
  for (var player in this.tradedPlayers){
    var tp = this.tradedPlayers[player];
    if (!tp.newTeam){
      tp.newTeam = allStats[tp.PLAYER_ID].TEAM_ABBREVIATION;
      tp.save();
    }
  }
};

exports.splitData = function(stats,model,skip){
  var map = maps.map;
  var rmap = maps.reverseMap();
  var d = Q.defer();
  if (skip){
    d.resolve();
    return d.promise;
  }
  var toSplit = 0, splitComplete = 0;
  //traded players created before this date have no pre-trade data
  var cutoffDate = utils.dateTimeless('2-29-2014');
  for (var player in this.tradedPlayers){
    var tp = this.tradedPlayers[player];
    if (tp.created < cutoffDate){
      continue;
    }
    toSplit++;
    mongoose.model(model)
    .find({created:tp.created.setDate(tp.created.getDate()-1),PLAYER_ID:tp.PLAYER_ID})
    .limit(1)
    .exec(function(err,oldPlayerStats){
      var op = oldPlayerStats[0];
      if (op){
        var oid = op.PLAYER_ID;
        var nid = this.tradedPlayers[oid].newId;
        stats[nid] = {};
        for (var stat in stats[oid]){
          if (!map[stat]){
            continue;
          }
          if (stat === "TEAM_ABBREVIATION"){
            stats[nid][stat] = tp.newTeam;
            continue;
          }
          if (stat === "PLAYER"){
            stats[nid][stat] = op.Player;
            continue;
          }
          if (stat === "PLAYER_ID"){
            stats[nid][stat] = tp.newId;
            continue;
          }
          stats[nid][stat] = stats[oid][stat] - op[map[stat].name || map[stat].keep];
        }
        stats[oid] = {};
        for (var stat in op){
          if (!rmap[stat] || !rmap[stat].key){
            continue;
          }
          stats[oid][rmap[stat].key] = op[stat];
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
  return d.promise;
};
