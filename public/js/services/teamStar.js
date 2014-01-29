
angular.module('mean.chart').factory("Teamstar", ['$q', function ($q) {

var exports = {};

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
      if (statName === "MIN" || statName === "GP" || statName === '__v' || statName === "_id" ||
          statName === "created" || statName === "score" || statName === 'Team' || statName === "presetName"
          || statName === "user" || statName === "$$hashKey"){
          continue;
        }
      totalValue += parseFloat(statWeights[statName].weight);
      if (!totalValue){
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
  
  var edgeCase = function(total,statWeights){
    for(var stat in statWeights){
      if(total/2.5 < statWeights[stat].weight){
        return true;
      }
    }
    return false;
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

  exports.calculateTeamStarVals = function(teamStats, statWeights, teams){
    var team, teamName, rawStar, stat;
    var totalStatWeights = exports.totalStatWeights(statWeights);

    for (team in teams){
      teamName = teams[team].abbreviation;
      rawStar = 0;
      for (stat in teamStats[teamName]){
        if (stat === "MIN" || stat === "GP" || stat === '__v' || stat === "_id" ||
          stat === "created" || stat === "score" || stat === 'Team' || stat === "presetName"
          || stat === "user" || stat === "$$hashKey"){
          continue;
        }
          statStarVal = statWeights[stat]['weight'] * teamStats[teamName][stat];
          rawStar += statStarVal;
      }
      if (edgeCase(totalStatWeights,statWeights)){
        teams[team]['starVal'] = rawStar/totalStatWeights;
      } else{
        teams[team]['starVal'] = ((rawStar/totalStatWeights - 0.5) * 3) + 0.5;        
      }
    }
    exports.teams = teams;
  };
  return exports;
}]);


