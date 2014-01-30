angular.module('mean.chart').factory("GraphCalc", ['Playerstar', function(Playerstar) {
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
    "created": true,
    "user": true,
    "$$hashKey": true,
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
    debugger;
    for (var key in graphInputData){
      exports.adjWindowStats[key] = [];
      for (var i = 0; i < graphInputData[key].length; i++){
        var playerDayObj = {};
        playerDayObj.totalPlayerStar = 0;
        // for (var j = 0; j < nestMap.length; j++){
        //   playerDayObj[nestMap[j]] = 0;
        // }
        var playerDay = graphInputData[key][i];
        for (var stat in playerDay){
          if (skipStats[stat]){
            continue;
          }
          var statStarVal = statWeights[stat].weight * playerDay[stat];
          playerDayObj[stat] = statStarVal/(10*totalStatWeights);

          playerDayObj[nestMap[statWeights[stat].cat]] = playerDayObj[nestMap[statWeights[stat].cat]] || 0;
          playerDayObj[nestMap[statWeights[stat].cat]] += statStarVal/(10*totalStatWeights);
          playerDayObj.totalPlayerStar += statStarVal/(10*totalStatWeights); // makes the star scores a little less arbitrary
        }
        exports.adjWindowStats[key].push(playerDayObj);
        }
      }
    };

// Data: {
  //   Manu Ginobili: [{"Ginobili Object for day1"}, {"Ginobili Object for day2"}],
  //   Steve Nash: [{"Nash Object for day1"}, {"Nash Object for day2"}]
  // }

  exports.makeGraphData = function(statName){
    var entity = $scope.graphSelected;
    for (var key in graphInputData){
      var windowStats = {key: null, values: []}; // e.g. 'Lebron James' over a two week span
        windowStats['key'] = entity;
      for (var i = 0; i < graphInputData[entity].length; i++){ // for each day in Lebron's window
        var dayData = [new Date(graphInputData[entity][i].created), graphInputData[entity][i][statName]];
        windowStats['values'].push(dayData);
      }
    }
    $scope.graphData = $scope.graphData.concat([windowStats]);
    };

   return exports;
   }
  ]);


