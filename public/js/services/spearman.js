angular.module('mean.chart').factory('Spearman', ['Global', 'Teamstar', function (Global, Teamstar) {
  var exports = {};
  var rankBy = function (theTeams, rankBy){
    theTeams.sort(function(a, b){
      return a[rankBy]-b[rankBy];
    });
    for (var i = 0; i < theTeams.length; i++) {
      theTeams[i][rankBy + "Rank"] = i+1;
    }
  };
  Global.stats
  .then(function(data){
    debugger;
    rankBy(data.teams,"winPct");
  });

  exports.rho = function (teams){
    rankBy(teams,"starVal");
    teams.forEach(function (team){
      team.di = team.starValRank - team.winPctRank;
      team.di2 = Math.pow(team.di,2);
    });

    var sum = teams.reduce(function(seed, eachTeam){
      return seed + eachTeam.di2;
    }, 0);
    var n = teams.length;
    var rhoVal = 1 - (6*sum)/(Math.pow(n,3)-n);

    return rhoVal;
  };

  return exports;

}]);
