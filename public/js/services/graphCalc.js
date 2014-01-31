angular.module('mean.chart').factory("Graphcalc", ['Playerstar', function(Playerstar) {
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
    var totalStatWeights = Playerstar.calculateTotalStatWeights(statWeights);
    for (var player in graphInputData){
        console.log(player);
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
          console.log(stat);
          var statStarVal = statWeights[stat].weight * playerDay[stat];
          playerDayObj[stat] = statStarVal/(10*totalStatWeights);

          playerDayObj[nestMap[statWeights[stat].cat]] = playerDayObj[nestMap[statWeights[stat].cat]] || 0;
          playerDayObj[nestMap[statWeights[stat].cat]] += statStarVal/(10*totalStatWeights);
          playerDayObj.baller += statStarVal/(10*totalStatWeights); // makes the star scores a little less arbitrary
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

