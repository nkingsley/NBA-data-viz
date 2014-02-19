angular.module('MoneyBaller').factory("Players", ['$q', '$http', 'Global', 'promiseTracker', function($q, $http, Global, promiseTracker) {

  var exports = {};
  exports.teamPlayers = {};
  Global.stats
  .then(function(stats){
    exports.cats = stats.cats;
  });
  exports.teamStatReq = function(){
    var d = $q.defer();
    if(!Global.currentTeam){
      d.resolve();
      return d.promise;
    }
    if (exports.allPlayers){
      d.resolve(exports.allPlayers);
      return d.promise;
    }
    if (Global.showingLastTen){
      var route = "/players/lt";
    } else{
      var route = "/players";
    }
    $http.get(route).success(function(data){
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

  exports.calculatePlayerStarVals = function(statWeights){
    var d = $q.defer();
    exports.teamStatReq()
    .then(function(players){
      if (!Global.currentTeam){
        d.resolve();
        return;
      }
      var openTeam = Global.currentTeam.abbreviation || Global.currentTeam;
      var weightPlayers = function(players){
        var totalStatWeights = exports.calculateTotalStatWeights(statWeights);
        var result = [];
        for (var player in players){
          if (players[player].Team !== openTeam  && openTeam !== 'ALL'){
            continue;
          }
          var p = players[player];
          var pWeighted = {name:p.Player,scores:{},totalPlayerStar:0};
          for (var stat in p){
            if (!statWeights[stat] || !statWeights[stat].cat || !nestMap[statWeights[stat].cat]){
              continue;
            }
            var statStarVal = statWeights[stat].weight * p[stat];
            pWeighted.scores[nestMap[statWeights[stat].cat]] = pWeighted.scores[nestMap[statWeights[stat].cat]] || 0;
            pWeighted.scores[nestMap[statWeights[stat].cat]] += statStarVal/(30*totalStatWeights);
            pWeighted.totalPlayerStar += statStarVal/(30*totalStatWeights); // makes the star scores a little less arbitrary
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

  exports.calculateTotalStatWeights = function(statWeights){
    var totalValue = 0;
    for (var statName in statWeights){
      if (Global.skipStats[statName]){continue;}
      if (!nestMap[statWeights[statName].cat]){continue;}
      totalValue+=parseFloat(statWeights[statName].weight);
    }
    return totalValue;
  };

  exports.startPlayerCalc = function(team, weights){
    //this bit of tapdancing handles both powerrank players by team and all players calcs
    var d = $q.defer();
    if (team){
      if (Global.currentTeam === team){
        Global.currentTeam = false;
        return d.promise;
      }
      Global.currentTeam = team;
    }
    team = team || Global.currentTeam;
    promiseTracker('loadingTracker').addPromise(d.promise);
    Global.stats.then(function(data){
      var playerPromise = exports.calculatePlayerStarVals(weights);
      playerPromise.then(function(){
        d.resolve();
      });
    });
    return d.promise;
  };

  return exports;
}]);

