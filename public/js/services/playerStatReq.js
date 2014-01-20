angular.module('mean.chart').factory("Playerstatreq", ['$q', '$http', function($q, $http) {

  var exports = {};
  var statsObj = {};
  var d = $q.defer();
  var _this = this;

  exports.teamStatReq = function(openTeam){
    if (!openTeam){
      return;
    }
    var promise = async({method:'GET', url:'/teams/Playernorm/' + openTeam}).success(function(data){
      var teamStats = data;
      for (player in teamStats){
        statsObj[player] = {};
        for (stat in teamStats[player]){
          if(stat === "NA_MIN_NEU"){
            continue;
          } else {
            statsObj[player][stat] = teamStats[player][stat];
          }
        }
      }
    });
    console.log(promise);
  };

  _this._data = {
    user: window.user,
    authenticated: !! window.user,
    stats: d.promise
  };
  return _this._data;
}]);