angular.module('mean.chart').factory("Playerstar", ['$q', '$http', 'Global', function($q, $http, Global) {

  var exports = {};
  exports.teamPlayers = {};
  Global.stats
  .then(function(stats){
    exports.cats = stats.cats;
  });
  var teamStatReq = function(openTeam){
    var teamStatObj = {};
    if (!openTeam){
      return;
    }
    var d = $q.defer();
    var subroutine = function(openTeam){
      $http.get('/teams/' + openTeam).success(function(data){
        var teamStats = data;
        for (var player in teamStats){
          teamStatObj[player] = {};
          for (var stat in teamStats[player]){
            if (stat === "MIN" || stat === "GP" || stat === "__v" || stat === "_id" ||
            stat === "created" || stat === "score"){
              continue;
            } else {
              teamStatObj[player][stat] = teamStats[player][stat];
            }
          }
        }
        d.resolve(data);
      });
    };
    subroutine(openTeam);
    return d.promise;
  };



  exports.calculatePlayerStarVals = function(statWeights, openTeam, players){
    var deferred = $q.defer();
    //for now, just calculate and return the players for the open team
    if (!openTeam){
      return;
    }
    var weightPlayers = function(players){
      var totalStatWeights = calculateTotalStatWeights(statWeights);
      for (var player in players){
        var p = players[player];
        p.scores = {};
        p.totalPlayerStar = 0;
        for (var stat in p.stats){
          var statName = p.stats[stat].name;
          if (statName === "toString"){
            delete(p.stats[stat]);
            continue;
          } else if (statName === 'totalPlayerStar'){
            continue;
          }
          var statStarVal = statWeights[statName].weight * p.stats[stat].norm;
          p.stats[stat].starVal = statStarVal;
          p.scores[statWeights[statName].cat] = p.scores[statWeights[statName].cat] || 0;
          p.scores[statWeights[statName].cat] += 100*statStarVal/totalStatWeights;
          p.totalPlayerStar += 100*statStarVal/totalStatWeights; // makes the star scores a little less arbitrary
        }
      //   players[player].stats.sort(function(stat1, stat2){
      //     return stat2.starVal - stat1.starVal;
      //   });
      }
      debugger;
      // players.sort(function(player1, player2){
      //   return player2.totalPlayerStar - player1.totalPlayerStar;
      // });
    };
    if (players){
      weightPlayers(players.players);
      deferred.resolve({players: players.players});
    } else{
      teamStatReq(openTeam)
      .then(function(players){
        weightPlayers(players);
        deferred.resolve({players: players});
    });
    }
    return deferred.promise;
  };


  var calculateTotalStatWeights = function(statWeights){
    var totalValue = 0;
    for (var statName in statWeights){
      if (statName === "__v" || statName === "_id" || statName === "created" || statName === "score"){
        continue;
      }
      totalValue+=parseFloat(statWeights[statName].weight);
    }
    return totalValue;
  };

  exports.changeSliders = function(nestedSliders, groupName) {
    var nest = nestedSliders[groupName];
    for (var statName in nest){
      var stat = nest[statName];
      if (statName === "main" || statName === "oldMain"){
        continue;
      }
      stat.weight = parseFloat(stat.weight) + (parseFloat(nest.main) - parseFloat(nest.oldMain));
      if (stat.weight < 0){
        stat.weight = 0;
      }
      if (stat.weight > 10){
        stat.weight = 10;
      }
    }
    nest.oldMain = parseFloat(nest.main);
  };

  return exports;
}]);




