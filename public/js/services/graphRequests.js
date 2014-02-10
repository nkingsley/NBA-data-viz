angular.module('MoneyBaller').factory("Graphrequests", ['$q', '$http', function($q, $http) {
  var exports = {};

  exports.timeRequest = function(selectedName, startDate, endDate){
    var d = $q.defer();
    var chosenUrl = '/team-window/' + selectedName;
    if (selectedName.indexOf(" ") > -1){ // absolutely terrible, it probably needs to check for an exact match in the list of team abbreviations
      chosenUrl = '/player-window/' + selectedName;
    }
    $http.get(chosenUrl).success(function(data){
      d.resolve(data);
    });
    return d.promise;
  };
  
  return exports;
  }
]);
   
