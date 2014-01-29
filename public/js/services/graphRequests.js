angular.module('mean.chart').factory("Graphrequests", ['$q', '$http', function($q, $http) {
  var exports = {};
  exports.chosen = {};



  exports.playerRequest = function(playerName, startDate, endDate){
  var d = $q.defer();
    $http.get('/player-window/' + playerName + '/' + startDate + '/' + endDate).success(function(data){
      exports.chosen = data;
      d.resolve(data);
    });
    return d.promise;
  };

  return exports;
  }
]);
   