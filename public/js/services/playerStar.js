angular.module('mean.chart').factory("Playerstar", ['$q', '$http', 'Global', function($q, $http, Global) {

  var exports = {};
  exports.teamPlayers = {};
  Global.stats
  .then(function(stats){
    exports.cats = stats.cats;
  });
  exports.teamStatReq = function(){
    var d = $q.defer();
    if (exports.allPlayers){
      d.resolve(exports.allPlayers);
      return d.promise;
    }
    $http.get('/players').success(function(data){
      exports.allPlayers = data;
      d.resolve(data);
    });
    return d.promise;
  };

  var nestMap = {
    DEF: "Defense",
    SHT: "Shooting",
    REB: "Rebounding",
    MSC: "Miscellaneous",
    PSS: "Possession"
  };

  exports.calculatePlayerStarVals = function(statWeights, openTeam){
    var d = $q.defer();
    exports.teamStatReq()
    .then(function(players){
      //for now, just calculate and return the players for the open team
      if (!openTeam){
        return;
      }
      var weightPlayers = function(players){
        var totalStatWeights = calculateTotalStatWeights(statWeights);
        var result = [];
        for (var player in players){
          if (players[player].Team !== openTeam  && openTeam !== 'ALL'){
            continue;
          }
          var p = players[player];
          var pWeighted = {name:p.Player,scores:{},totalPlayerStar:0};
          for (var stat in p){
            if (!statWeights[stat] || !statWeights[stat].cat){
              continue;
            }
            var statStarVal = statWeights[stat].weight * p[stat];
            pWeighted.scores[nestMap[statWeights[stat].cat]] = pWeighted.scores[nestMap[statWeights[stat].cat]] || 0;
            pWeighted.scores[nestMap[statWeights[stat].cat]] += statStarVal/(10*totalStatWeights);
            pWeighted.totalPlayerStar += statStarVal/(10*totalStatWeights); // makes the star scores a little less arbitrary
          }
          result.push(pWeighted);
        }
        return result;
      };
      exports.teamPlayers = weightPlayers(players);
      d.resolve(exports.teamPlayers);
    });
    return d.promise;
  };

  var calculateTotalStatWeights = function(statWeights){
    var totalValue = 0;
    for (var statName in statWeights){
      if (statName === "__v" || statName === "_id" || statName === "created" 
        || statName === "score" || statWeights[statName].cat === "TM_DEF" 
        || statName === "presetName" || statName === "$$hashKey" || statName === "user"){
        continue;
      }
      totalValue+=parseFloat(statWeights[statName].weight);
      if (!totalValue && totalValue !== 0){
      }
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




