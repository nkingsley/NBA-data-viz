angular.module('MoneyBaller').factory("Graphcalc", ['Players', function (Players) {
  var exports = {};
  exports.adjWindowStats = {};

  var skipStats = {
    "MIN": true,
    "GP": true,
    "__v": true,
    "_id": true,
    "presetName": true,
    "Team": true,
    "score": true,
    "$$hashKey": true,
    "PLAYER_ID": true,
    "Player": true,
  };

  var nestMap = {
    DEF: "Defense",
    SHT: "Shooting",
    REB: "Rebounding",
    MSC: "Miscellaneous",
    PSS: "Possession"
  };

  exports.calculateWindowStats = function(graphInputData, statWeights){
    var totalStatWeights = Players.calculateTotalStatWeights(statWeights);
    for (var player in graphInputData){
      exports.adjWindowStats[player] = [];
      for (var i = 0; i < graphInputData[player].length; i++){
        var playerDayObj = {};
        playerDayObj.baller = 0;
        var playerDay = graphInputData[player][i];
        for (var stat in playerDay){
          if (skipStats[stat]){
            continue;
          } else if (stat === "created"){
            playerDayObj.created = playerDay[stat];
            continue;
          }

          var statStarVal = statWeights[stat].weight * playerDay[stat];
          playerDayObj[stat] = statStarVal/(totalStatWeights*30);

          playerDayObj[nestMap[statWeights[stat].cat]] = playerDayObj[nestMap[statWeights[stat].cat]] || 0;
          playerDayObj[nestMap[statWeights[stat].cat]] += statStarVal/(totalStatWeights*30);
          playerDayObj.baller += statStarVal/(totalStatWeights*30);
        }
        exports.adjWindowStats[player].push(playerDayObj);
        }
      }
    };

   return exports;
  }
]);