angular.module('mean.chart').factory("Playerstar", ['$q', function ($q) {

  var exports = {};

  exports.players = [];
  exports.teamPlayers = [];

 exports.calculatePlayerStarVals = function(playerStats, statWeights, openTeam){
    var player, playerName, rawStar, stat;
    //for now, just calculate and return the players for the open team
    if (!openTeam){
      return;
    }
    var totalStatWeights = exports.totalStatWeights(statWeights);
    var teamArray = playerStats[openTeam]
    for (playerIdx in teamArray){
      playerName = teamArray[playerIdx]['Player'];
      rawStar = 0;
      for (stat in teamArray[playerIdx]){
        if (stat === "MIN" || stat === "GP" || stat === "Player" || stat === "PLAYER_ID" || stat === 'Team' || stat === 'starVal'){
          continue;
        }
          statStarVal = statWeights[stat]['weight'] * teamArray[playerIdx][stat];
          rawStar += statStarVal;
      }
      teamArray[playerIdx]['starVal'] = rawStar/totalStatWeights;
    }
    exports.teamPlayers = teamArray;
    console.log(exports.teamPlayers);
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