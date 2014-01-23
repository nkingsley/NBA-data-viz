angular.module('mean.chart').factory("Playerstar", ['$q', '$http', 'Global', function($q, $http, Global) {

  var exports = {};
  exports.teamPlayers = {};
  var teamStatObj = {};
  Global.stats
  .then(function(stats){
    exports.cats = stats.cats;
  });
  exports.teamStatReq = function(){
    var d = $q.defer();
    var subroutine = function(){
      $http.get('/players').success(function(data){
        // var playerStats = data;
        // for (var player in playerStats){
        //   p = playerStats[player];
        //   teamStatObj[p.Team] = teamStatObj[p.Team] || {};
        //   teamStatObj[p.Team][p.Player] = teamStatObj[p.Team][p.Player] || {};
        //   for (var stat in p){
        //     if (stat === "MIN" || stat === "GP" || stat === "__v" || stat === "_id" ||
        //     stat === "created" || stat === "score" || stat === "Team" || stat === "PLAYER_ID" || stat === "Player"){
        //       continue;
        //     } else {
        //       teamStatObj[p.Team][p.Player][stat] = playerStats[player][stat];
        //     }
        //   }
        // }
        d.resolve(data);
      });
    };
    subroutine();
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
  };

  var calculateTotalStatWeights = function(statWeights){
    var totalValue = 0;
    for (var statName in statWeights){
      if (statName === "__v" || statName === "_id" || statName === "created" || statName === "score" || statWeights[statName].cat === "TM_DEF"){
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




