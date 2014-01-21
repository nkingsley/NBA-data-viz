// service delivering stat information for any controller that requires it
angular.module('mean.chart').factory("Stats", ['$q', 'Global',  function ($q, Global) {
 
  var exports = {};


    exports.nestedSliders = {
      Possession:{
        main:5,
        oldMain:5
      },
      Shooting:{
        main:5,
        oldMain:5
      },
      Defense:{
        main:5,
        oldMain:5
      },
      Rebounding:{
        main:5,
        oldMain:5
      },
      Miscellaneous:{
        main:5,
        oldMain:5
      },
    };

    exports.assignNestedSliders = function (statWeights, nestedSliders){
      for (var statName in statWeights) {
        switch(statWeights[statName].cat) {
          case "PSS"  : 
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
          case "MSC":
            nestedSliders.Miscellaneous[statName] = statWeights[statName];
            break;
        }
      }
      return nestedSliders;
    };
    

    exports.changeSliders = function(nestedSliders, currentStat, groupName) {
      if (!groupName){
        groupName = currentStat;
      }
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

