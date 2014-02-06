angular.module('MoneyBaller').factory("Sliders", ['$q', 'Global',  function ($q, Global) {
  var exports = {};
  exports.slidersCollapsed = true;
  exports.itemsClass = "span12";
  resetMains = function(){
    for (var nest in exports.nestedSliders){
      var n = exports.nestedSliders[nest];
      n.main = 0;
      n.oldMain = 0;
    }
    var nn = exports.nestedSliders.Defense["Team Defense"];
    nn.main = 0;
    nn.oldMain = 0;
  }
  exports.nestedSliders = {
    Possession:{
      main:0,
      oldMain:0
    },
    Shooting:{
      main:0,
      oldMain:0
    },
    Defense:{
      main:0,
      oldMain:0,
      "Team Defense": {
        main: 0,
        oldMain:0
      }
    },
    Rebounding:{
      main:0,
      oldMain:0
    },
    Miscellaneous:{
      main:0,
      oldMain:0
    }
  };

  exports.sliderToggle = function(){
    exports.slidersCollapsed = !exports.slidersCollapsed;
    if (exports.slidersCollapsed){
      exports.itemsClass = "span12";
    } else {
      exports.itemsClass = "span7";
    }
  };

  exports.assignNestedSliders = function (statWeights){
    var nestedSliders = exports.nestedSliders;
    resetMains();
    //main and oldMain are used for a difference purpose later, but serve as temp objects for averaging their nest
    for (var statName in statWeights) {
      var weight = parseFloat(statWeights[statName].weight);
      switch(statWeights[statName].cat) {
        case "PSS": 
        case "PSS_TM":
          nestedSliders.Possession[statName] = statWeights[statName];
          nestedSliders.Possession.oldMain++;
          nestedSliders.Possession.main+= weight;
          break;
        case "SHT":
        case "SHT_TM":
          nestedSliders.Shooting[statName] = statWeights[statName];
          nestedSliders.Shooting.oldMain++;
          nestedSliders.Shooting.main+= weight;
          break;
        case "DEF":
          nestedSliders.Defense[statName] = statWeights[statName];
          nestedSliders.Defense.oldMain++;
          nestedSliders.Defense.main+= weight;
          break;
        case "REB": 
          nestedSliders.Rebounding[statName] = statWeights[statName];
          nestedSliders.Rebounding.oldMain++;
          nestedSliders.Rebounding.main+= weight;
          break;
        case "MSC":
          nestedSliders.Miscellaneous[statName] = statWeights[statName];
          nestedSliders.Miscellaneous.oldMain++;
          nestedSliders.Miscellaneous.main+= weight;
          break;
        case "TM_DEF":
          debugger
          nestedSliders.Defense["Team Defense"][statName] = statWeights[statName];
          nestedSliders.Defense["Team Defense"].oldMain++;
          nestedSliders.Defense["Team Defense"].main += weight;
          break;
      }
    }
    for(var nest in nestedSliders){
      var n = nestedSliders[nest];
      if(n.main){
        n.main = n.main/n.oldMain;
        n.oldMain = n.main;        
      }
    }
    var nn = nestedSliders.Defense["Team Defense"];
    nn.main = nn.main/nn.oldMain;
    nn.oldMain = nn.main;
    return nestedSliders;
  };
  

  exports.changeSliders = function(groupName) {
    if (groupName === "Team Defense"){
      var nest = exports.nestedSliders.Defense[groupName];
    } else{
      var nest = exports.nestedSliders[groupName];        
    }
    for (var statName in nest){
      if (statName === "Team Defense"){
        continue;
      }
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
    if (groupName === "Defense"){
      exports.nestedSliders.Defense["Team Defense"].main = exports.nestedSliders.Defense.main;
      exports.changeSliders("Team Defense");
    }
    debugger;
  };
    return exports;
  }]);

