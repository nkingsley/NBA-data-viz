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

  rankBy(Teamstar.teams,"winPct");

  exports.rho = function (){
    rankBy(Teamstar.teams,"starVal");
    Teamstar.teams.forEach(function (team){
      team.di = team.starValRank - team.winPctRank;
      team.di2 = Math.pow(team.di,2);
    });

    var sum = Teamstar.teams.reduce(function(seed, eachTeam){
      return seed + eachTeam.di2;
    }, 0);
    var n = Teamstar.teams.length;
    var rhoVal = 1 - (6*sum)/(Math.pow(n,3)-n);

    return rhoVal;
  };

  return exports;

}]);
