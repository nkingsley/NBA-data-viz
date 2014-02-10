angular.module('MoneyBaller').factory("Teamstar", ['$q', function ($q) {

var exports = {};

  exports.weight = function(teams, statWeights){
    var weightedStats = {};
    var totalValue = exports.calculateTotalStatWeights(statWeights);
    for (var stat in statsToWeight){
      weightedStats[stat] = parseFloat(statWeights[stat].weight) * statsToWeight[stat];
    }
    return weightedStats;
  };
  var skipStats = {
    "MIN": true,
    "GP": true,
    "__v": true,
    "_id": true,
    "presetName": true,
    "Team": true,
    "score": true,
    "created": true,
    "user": true,
    "$$hashKey": true,
  }
  exports.totalStatWeights = function(statWeights){
    var totalValue = 0;
    for (var statName in statWeights){
      if (skipStats[statName]){
          continue;
        }
      totalValue += parseFloat(statWeights[statName].weight);
      if (!totalValue && totalValue !== 0){
        debugger;
      }
    }
    return totalValue;
  };

  exports.assignNestedSliders = function (statWeights, nestedSliders){
    for (var statName in statWeights) {
      switch(statWeights[statName].cat) {
        case "PSS": 
          nestedSliders.Possession[statName] = statWeights[statName];
          break;
        case "SHT":
          nestedSliders.Shooting[statName] = statWeights[statName];
          break; 
        case "DEF":
          nestedSliders.Defense[statName] = statWeights[statName];
          break;
        case "REB": 
          nestedSliders.Rebounding[statName] = statWeights[statName];
          break;
        case "MSC":
          nestedSliders.Miscellaneous[statName] = statWeights[statName];
          break;
      }
    }
    return nestedSliders;
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

  exports.calculateTeamStarVals = function(teamStats, statWeights, teams, multiplier){
    var team, teamName, rawStar, stat;
    var totalStatWeights = exports.totalStatWeights(statWeights);

    for (team in teams){
      teamName = teams[team].abbreviation;
      rawStar = 0;
      for (stat in teamStats[teamName]){
        if (skipStats[stat]){
          continue;
        }
          statStarVal = statWeights[stat]['weight'] * teamStats[teamName][stat];
          rawStar += statStarVal;
      }
      multiplier = multiplier || 3;
      var newStar = ((rawStar/totalStatWeights - 0.5) * multiplier) + 0.5; 
      if (newStar > 1 || newStar < 0){
        return exports.calculateTeamStarVals(teamStats,statWeights,teams,1);
      }
      teams[team]['starVal'] = newStar;
    }
    exports.teams = teams;
  };
  return exports;
}]);


