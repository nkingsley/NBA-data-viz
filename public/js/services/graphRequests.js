angular.module('mean.chart').factory("Graphrequests", ['$q', '$http', function($q, $http) {
  var exports = {};

  exports.teamRequest = function(teamName, startDate, endDate){
  var d = $q.defer();
    $http.get('/team-window/' + teamName + '/' + startDate + '/' + endDate).success(function(data){
      d.resolve(data);
    });
    return d.promise;
  };

  exports.playerRequest = function(selectedName, startDate, endDate, isTeam){
    var d = $q.defer();
    var chosenUrl = '/team-window/' + selectedName + '/' + startDate + '/' + endDate;
    if (!isTeam){
      chosenUrl = '/player-window/' + selectedName + '/' + startDate + '/' + endDate;
    }
    $http.get(chosenUrl).success(function(data){
      d.resolve(data);
    });
    return d.promise;
  };

  return exports;
  }
]);
   