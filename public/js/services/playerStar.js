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
          var statStarVal = statWeights[stat].weight * players[player].stats[stat].norm;
          players[player].stats[stat].starVal = statStarVal;
          players[player].totalPlayerStar += statStarVal;
        }
        debugger;
        //player level
        player.stats.sort(function(stat1, stat2){
          return stat1.starVal - stat2.starVal;
        });
      }
      // team level

      deferred.resolve({players: players});
    });
    return deferred.promise;
  };


  // exports.playerWeightedStats = {};


  // exports.calculatePlayerWeightedStats = function (playerStats, statWeights, openTeam) {
  //   var totalValue = 0;
  //   var weightedStat;
  //   var playerCume;
  //   var teamTotals = exports.getTeamCumeTotals(statsByTeam, statWeights)

  //   if (!openTeam) return;
  //   var team = teamStatsNorm[openTeam];
  //   exports.playerWeightedStats[openTeam] = {};
  //   for (var player in team){
  //     var topFiveStats = [];
  //     for (var stat in team[player]){
  //       weightedStat = team[player][stat]*statWeights[stat].weight;
  //       if(topFiveStats.length === 0){
  //         topFiveStats.push({'statName': stat, 'stat': 100*weightedStat/teamTotals[openTeam]});
  //       } else {
  //         for (var i = 0 ; i < topFiveStats.length; i++){
  //           if(Math.abs(100*weightedStat/teamTotals[openTeam]) > Math.abs(topFiveStats[i].stat)){
  //             topFiveStats.splice(i, 0, {'statName': stat, 'stat': 100*weightedStat/teamTotals[openTeam]});
  //             if(topFiveStats.length > 5){
  //               topFiveStats.pop();
  //             }
  //             break;
  //           }
  //           if(i === topFiveStats.length-1 && topFiveStats.length < 5){
  //             topFiveStats.push({'statName': stat, 'stat': 100*weightedStat/teamTotals[openTeam]})
  //             break;
  //           }
  //         }
  //       }
  //     }
  //   exports.playerWeightedStats[openTeam][player] = topFiveStats;;
  //   debugger;
  //   }

  // };

  // exports.weight = function(teams, statWeights){
  //   var weightedStats = {};
  // var totalValue = exports.calculateTotalStatWeights(statWeights);
  //   for (var stat in statsToWeight){
  //     weightedStats[stat] = parseFloat(statWeights[stat].weight) * statsToWeight[stat];
  //   }
  //   return weightedStats;
  // };

  // var totalStatWeights = function(statWeights){
  //   var totalValue = 0;
  //   for (var stat in statWeights){
  //     if (stat === "__v" || stat === "_id" || stat === "created" || stat === "score"){
  //       continue;
  //     }
  //     totalValue += parseFloat(statWeights[stat].weight);
  //   }
  //   return totalValue;
  // };

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




