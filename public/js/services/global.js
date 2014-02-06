//Global service for global variables
angular.module('MoneyBaller').factory("Global", ['$q', '$http', 'teamsList', function($q, $http, teamsList) {
  var _this = this;
  var statsObj = {};
  var cats = {};
  var teams = teamsList;
  _this.init = function(lastTen){
    var d = $q.defer();
    if (lastTen){
      var route = '/init/lt';
    } else{
      var route = '/init';
    }
    $http.get(route).success(function(data){
      var teamStats = data.teams;
      var winPct = data.winPct;
      cats = data.cat;
      for (team in teamStats){
        statsObj[team] = {};
        for (stat in teamStats[team]){
          if(stat === "NA_MIN_NEU"){
            continue;
          } else {
            statName = stat;
            statsObj[team][statName] = teamStats[team][stat];
          }
        }
      }
      for (var i = 0; i < teams.length; i++){
        var teamName = teams[i].franchise;
        teams[i].winPct = winPct[teamName].winPct;
      }
      d.resolve({teamStats: statsObj, cats: cats, teams: teams, presets:data.presets});
    });
    return d.promise;
  };
  var stats = _this.init();
  _this._data = {
      user: window.user,
      authenticated: !! window.user,
      stats: stats,
      init: _this.init,
      showingLastTen: false,
      lastTenHolder: false,
      totalHolder: false,
      lastTenSetupHolder: false,
      totalSetupHolder: false,
      currentTeam: false
  };
  return _this._data;
}]);
