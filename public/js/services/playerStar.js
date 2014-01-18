angular.module('mean.chart').factory("Playerstar", ['$q', function ($q) {

  var exports = {};

  exports.players = [];
  exports.teamPlayers = {};

  //needs to generate an object like: 
  // {'SAS': 
  //   {'Aron Baynes': [
  //     {stat: 0.2555, statName: "Drives Total"},
  //     {stat: 0.244, statName: "PTS"}
  //     ]
  //   }
  // }

 exports.calculatePlayerStarVals = function(playerStats, statWeights, openTeam){
    var player, playerName, rawStar, stat, statObj;
    //for now, just calculate and return the players for the open team
    if (!openTeam){
      return;
    }
    exports.teamPlayers[openTeam] = {};
    var totalStatWeights = exports.totalStatWeights(statWeights);
    var teamArray = playerStats[openTeam]
    for (playerIdx in teamArray){
      var statArray = [];
      playerName = teamArray[playerIdx]['Player'];
      rawStar = 0;
      for (stat in teamArray[playerIdx]){
        if (stat === "MIN" || stat === "GP" || stat === "Player" || stat === "PLAYER_ID" || stat === 'Team' || stat === 'starVal'){
          continue;
        }
          statStarVal = statWeights[stat]['weight'] * teamArray[playerIdx][stat];
          rawStar += statStarVal;
          statObj = {'statName': stat, 'starVal': statStarVal};
          if (statArray.length === 0){
            statArray.push(statObj);
          } else {
            for (var i = 0; i < statArray.length; i++){
              if (statStarVal > statArray[i].starVal){
                statArray.splice(i, 0, statObj);
                if (statArray.length > 5){
                  statArray.pop();
                }
                break;
              }
              if(i === statArray.length-1 && statArray.length < 5){
                statArray.push(statObj);
                break;
              }
            }
          }
      }
      exports.teamPlayers[openTeam][playerName] = statArray;
      teamArray[playerIdx]['starVal'] = rawStar/totalStatWeights;
    }
    exports.openTeamPlayers = exports.teamPlayers[openTeam];
    console.log(exports.openTeamPlayers);
  };

  exports.playerWeightedStats = {};


  exports.calculatePlayerWeightedStats = function (playerStats, statWeights, openTeam) {
    var totalValue = 0;
    var weightedStat;
    var playerCume;
    var teamTotals = exports.getTeamCumeTotals(statsByTeam, statWeights)

    if (!openTeam) return;
    
    var team = teamStatsNorm[openTeam];
    exports.playerWeightedStats[openTeam] = {};
    for (var player in team){
      var topFiveStats = [];
      for (var stat in team[player]){
        weightedStat = team[player][stat]*statWeights[stat].weight;
        if(topFiveStats.length === 0){
          topFiveStats.push({'statName': stat, 'stat': 100*weightedStat/teamTotals[openTeam]});
        } else {
          for (var i = 0 ; i < topFiveStats.length; i++){
            if(Math.abs(100*weightedStat/teamTotals[openTeam]) > Math.abs(topFiveStats[i].stat)){
              topFiveStats.splice(i, 0, {'statName': stat, 'stat': 100*weightedStat/teamTotals[openTeam]});
              if(topFiveStats.length > 5){
                topFiveStats.pop();
              }
              break;
            }  
            if(i === topFiveStats.length-1 && topFiveStats.length < 5){
              topFiveStats.push({'statName': stat, 'stat': 100*weightedStat/teamTotals[openTeam]})
              break;
            }
          }
        }
      }
    exports.playerWeightedStats[openTeam][player] = topFiveStats;;
    debugger;
    }

  };

  exports.weight = function(teams, statWeights){
    var weightedStats = {};
    var totalValue = exports.calculateTotalStatWeights(statWeights);
    for (var stat in statsToWeight){
      weightedStats[stat] = parseFloat(statWeights[stat].weight) * statsToWeight[stat];
    }
    return weightedStats;
  };
  
  exports.totalStatWeights = function(statWeights){
    var totalValue = 0;
    for (var statName in statWeights){
      totalValue += parseFloat(statWeights[statName].weight);
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