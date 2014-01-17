angular.module('mean.chart').factory("Playerstar", ['$q', 'Global', function ($q, Global) {

  var exports = {};

  exports.players = [];

  exports.calculatePlayerStars = function(players, statWeights){
    for (var player in players){
      player.starVal = 0;
      for (var stat in player){
        if (stat !== 'MIN' || 'GP'){
          player.starVal += stat * statWeights[stat];
        }
      }
    }
    exports.players[player] = players;
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

  exports.assignNestedSliders = function (statWeights, nestedSliders){
    for (var statName in statWeights) {
      switch(statWeights[statName].cat) {
        case "POS"  : 
          nestedSliders.Possession[statName] = statWeights[statName];
          break;
        case "SHT":
          nestedSliders.Shooting[statName] = statWeights[statName];
          break; 
        case "DEF":
          nestedSliders.Defense[statName] = statWeights[statName];
          break;
        case "REB"  : 
          nestedSliders.Rebounding[statName] = statWeights[statName];
          break;
        case "ATH":
          nestedSliders.Athleticism[statName] = statWeights[statName];
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

  return exports;
}]);