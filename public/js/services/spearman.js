angular.module('mean.chart').factory('Spearman', ['Global', 'Stats', function (Global, Stats) {
  var exports = {};
  var rankBy = function (theTeams, rankBy){
    theTeams.sort(function(a, b){
      return a[rankBy]-b[rankBy];
    });
    for (var i = 0; i < theTeams.length; i++) {
      theTeams[i][rankBy + "Rank"] = i+1;
    }
  };

  rankBy(Stats.teams,"winPct");

  exports.rho = function (){
    rankBy(Stats.teams,"starVal");
    Stats.teams.forEach(function (team){
      team.di = team.starValRank - team.winPctRank;
      team.di2 = Math.pow(team.di,2);
    });

    var sum = Stats.teams.reduce(function(seed, eachTeam){
      return seed + eachTeam.di2;
    }, 0);
    var n = Stats.teams.length;
    var rhoVal = 1 - (6*sum)/(Math.pow(n,3)-n);

    return rhoVal;
  };

  return exports;

}]);
