angular.module('MoneyBaller').factory("Graph", ['$q', '$http', 'Sliders', 'Graphcalc', function ($q, $http, Sliders, Graphcalc) {

  var exports = {
    options: Sliders.slidersCollapsed ? {width: 900, height: 600} : {width: 550, height: 450}
  };

  exports.graphData = exports.graphData || [];
  exports.drawChart = false;

  var inputData = inputData || {};
  var weights = Sliders.nestedSliders;
  var adjWindowStats = Graphcalc.adjWindowStats;
  var calculateWindowStats = Graphcalc.calculateWindowStats;

  exports.toggleChart = function(n,o){
    if (n === true) {
      exports.options.width = 900;
      exports.options.height =  600;
    } else {
      exports.options.width = 550;
      exports.options.height =  450;
    }
  };

  var graphRequest = function(graphEntity){
    var d = $q.defer();
    var chosenUrl = '/team-window/' + graphEntity;
    if (graphEntity.indexOf(" ") > -1){ // absolutely terrible, it probably needs to check for an exact match in the list of team abbreviations
      chosenUrl = '/player-window/' + graphEntity;
    }
    $http.get(chosenUrl).success(function(data){
      d.resolve(data);
    });
    return d.promise;
  };
 
  var makeGraphData = function(statName){
    exports.graphData = [];
    for (var key in adjWindowStats){
      var entity = key;
      var windowStats = {key: null, values: []}; // e.g. 'Lebron James' over a two week span
        windowStats['key'] = entity;
      for (var i = 0; i < adjWindowStats[entity].length; i++){
        var dayData = [new Date(adjWindowStats[entity][i].created), adjWindowStats[entity][i][statName]];
        windowStats['values'].push(dayData);
      }
    exports.graphData = graphData.concat([windowStats]);
    }
  };
  
  exports.getGraphData = function(graphEntity, statName){
    exports.drawChart = true;
    if (!inputData[graphEntity]){
      graphRequest(graphEntity).then(function(data){
        inputData[graphEntity] = data;
        calculateWindowStats(inputData, weights);
        makeGraphData(statName);
      })
    } else {
      makeGraphData(statName);
    }
  };

  exports.removeGraphData = function(){
    exports.drawChart = false;
    exports.graphData = [];
    inputData = {};
  };

  return exports;
  }
]);
