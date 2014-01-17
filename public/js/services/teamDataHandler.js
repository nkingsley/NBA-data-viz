angular.module('mean.chart').factory('teamData', ['$q', '$http', function($q, $http) {
  var _this = this;
  var teamsObj = {};
  var d = $q.defer();

  $http.get('/stats').success(function(data){
    d.resolve({teams: data});
  };

  _this.data = {
    user: window.user,
    authenticated: !! window.user,
    stats: d.promise
  };

};