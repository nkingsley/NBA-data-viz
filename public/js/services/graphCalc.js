angular.module('MoneyBaller').factory("Graphcalc", ['Players', function(Players) {
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

  exports.calculateWindowStats = function(graphInputData, statWeights, teams){
    var totalStatWeights = Players.calculateTotalStatWeights(statWeights);
    for (var player in graphInputData){
      var divisor = 30;
      var multiplier = 1;
      if (teams[player]){
            // multiplier = 10000;
            divisor = 1;
          }
      exports.adjWindowStats[player] = [];
      for (var i = 0; i < graphInputData[player].length; i++){
        var playerDayObj = {};
        playerDayObj.baller = 0;
        // for (var j = 0; j < nestMap.length; j++){
        //   playerDayObj[nestMap[j]] = 0;
        // }
        var playerDay = graphInputData[player][i];
        for (var stat in playerDay){
          if (skipStats[stat]){
            continue;
          } else if (stat === "created"){
            playerDayObj.created = playerDay[stat];
            continue;
          }

          var statStarVal = statWeights[stat].weight * multiplier * playerDay[stat];
          debugger;
          playerDayObj[stat] = statStarVal/(divisor*totalStatWeights);

          playerDayObj[nestMap[statWeights[stat].cat]] = playerDayObj[nestMap[statWeights[stat].cat]] || 0;
          playerDayObj[nestMap[statWeights[stat].cat]] += statStarVal/(divisor*totalStatWeights);
          playerDayObj.baller += statStarVal/(divisor*totalStatWeights); // makes the star scores a little less arbitrary
        }
        exports.adjWindowStats[player].push(playerDayObj);
        }
      }
    };

// Data: {
  //   Manu Ginobili: [{"Ginobili Object for day1"}, {"Ginobili Object for day2"}],
  //   Steve Nash: [{"Nash Object for day1"}, {"Nash Object for day2"}]
  // }


   return exports;
   }
  ]);


