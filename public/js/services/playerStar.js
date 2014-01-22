angular.module('mean.chart').factory("Playerstar", ['$q', '$http', 'Global', function($q, $http, Global) {

  var exports = {};
  exports.teamPlayers = {};
  Global.stats
  .then(function(stats){
    exports.cats = stats.cats;
  });
  exports.teamStatReq = function(openTeam){
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

  var nestMap = {
    DEF: "Defense",
    SHT: "Shooting",
    REB: "Rebounding",
    MSC: "Miscellaneous",
    PSS: "Possession"
  };

  exports.calculatePlayerStarVals = function(statWeights, openTeam, players){
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
        for (var stat in p){
          if (stat === "toString"){
            delete(p.stats[stat]);
            continue;
          } else if (!statWeights[stat] || !statWeights[stat].cat){
            continue;
          }
          var statStarVal = statWeights[stat].weight * p[stat];
          p.scores[nestMap[statWeights[stat].cat]] = p.scores[nestMap[statWeights[stat].cat]] || 0;
          p.scores[nestMap[statWeights[stat].cat]] += statStarVal/(10*totalStatWeights);
          p.totalPlayerStar += statStarVal/(10*totalStatWeights); // makes the star scores a little less arbitrary
        }
      }
    };
    weightPlayers(players);
    exports.teamPlayers = players;
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




