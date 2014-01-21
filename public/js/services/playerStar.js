angular.module('mean.chart').factory("Playerstar", ['$q', '$http', function($q, $http) {

  var exports = {};
  exports.teamPlayers = {};
     //needs to generate an object like: 
  // {'SAS': 
  //   {'Aron Baynes': [
  //     {stat: 0.2555, statName: "Drives Total"},
  //     {stat: 0.244, statName: "PTS"}
  //     ]
  //   }
  // }
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



  exports.calculatePlayerStarVals = function(statWeights, openTeam){
    var deferred = $q.defer();
    //for now, just calculate and return the players for the open team
    if (!openTeam){
      return;
    }
    teamStatReq(openTeam)
    .then(function(players){
      for (var player in players){
        players[player].totalPlayerStar = 0;
        for (var stat in players[player].stats){
          var statName = players[player].stats[stat].name;
          if (statName === "toString"){
            delete(players[player].stats[stat]);
            continue;
          } else if (statName === 'totalPlayerStar'){
            continue;
          }
          var statStarVal = statWeights[statName].weight * players[player].stats[stat].norm;
          players[player].stats[stat].starVal = statStarVal;
          players[player].totalPlayerStar += statStarVal;
        }
        //player level
        players[player].stats.sort(function(stat1, stat2){
          return stat2.starVal - stat1.starVal;
        });
      }
      players.sort(function(player1, player2){
        return player2.totalPlayerStar - player1.totalPlayerStar;
      });
      // team level
      deferred.resolve({players: players});
    });
    return deferred.promise;
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




