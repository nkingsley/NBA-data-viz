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
      var team = false;
      exports.adjWindowStats[player] = [];
      if(!graphInputData[player][0].Player){
        team = true;
      }
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
          if (team){
            playerDayObj.baller += statStarVal;
          } else {
            playerDayObj.baller += statStarVal/(totalStatWeights * 30);
          }
        }
        if(team){
          var newBaller = (playerDayObj.baller/totalStatWeights - 0.5) * 3 + 0.5;
          if (newBaller > 1 || newBaller < 0){
            newBaller = playerDayObj.baller/totalStatWeights;
            //hacky presentation fix
          }
          playerDayObj.baller = newBaller;
        }
        exports.adjWindowStats[player].push(playerDayObj);
        }
      }
    };

   return exports;
  }
]);