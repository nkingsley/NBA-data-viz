//Global service for global variables
angular.module('MoneyBaller').factory("Global", ['$q', '$http', 'teamsList', function($q, $http, teamsList) {
  var statsObj = {};
  var cats = {};
  var teams = teamsList;
  var init = function(lastTen){
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
  var stats = init();
  var data = {
      user: window.user,
      authenticated: !! window.user,
      stats: stats,
      init: init,
      showingLastTen: false,
      lastTenHolder: false,
      totalHolder: false,
      lastTenSetupHolder: false,
      totalSetupHolder: false,
      currentTeam: false
  };
  data.toggleOpenTeam = function(team){
      if (data.currentTeam === team){
        data.currentTeam = false;
      } else {
        data.currentTeam = team;
      }
    };
    
  data.skipStats = {
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
  }

  return data;
}]);
