angular.module('mean.chart').factory("Playerstar", ['$q', function ($q) {

  var exports = {};

  exports.players = [];

 exports.calculatePlayerStarVals = function(playerStats, statWeights){
    var player, playerName, rawStar, stat;
    var totalStatWeights = exports.totalStatWeights(statWeights);
    for (player in exports.players){
      teamName = exports.teams[team].abbreviation;
      rawStar = 0;
      for (stat in teamStats[teamName]){
        if (stat === ("MIN" || "GP")){
          continue;
        }
          statStarVal = statWeights[stat]['weight'] * teamStats[teamName][stat];
          rawStar += statStarVal;
      }
      exports.teams[team]['starVal'] = rawStar/totalStatWeights;
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
  
  exports.calculateTotalStatWeights = function(statWeights){
    var totalValue = 0;
    for (var statName in statWeights){
      totalValue += parseFloat(statWeights[statName].weight);
    }
    return totalValue
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