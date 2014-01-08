angular.module('mean.chart')
  .controller('chartCtrl', ['$scope', '$http', 'Global', 'Stats', function ($scope, $http, Global, Stats) {
    
    $scope.options = {width: 840, height: 500};
    $scope.teams = Stats.teams;
    $scope.calculateAllTeamStarVals = Stats.calculateAllTeamStarVals;
    $scope.playerStars = Stats.playerStars;
    $scope.changeSliders = Stats.changeSliders;
    $scope.nestedSliders = Stats.nestedSliders;

    Global.stats.then(function(data){
      $scope.teamStats = data.teams;
      $scope.teamStatsNorm = data.teamsNorm;
      $scope.statsInfo = data.statsInfo;
      $scope.stats = {};
      for (var statName in $scope.statsInfo){
        if(statName === 'GP' || statName === 'MIN'){
          continue;
        }
        $scope.stats[statName] = {weight: 1, cat: $scope.statsInfo[statName].cat};
      }
      $scope.nestedSliders = Stats.assignNestedSliders($scope.stats, $scope.nestedSliders);
      $scope.calculateAllTeamStarVals($scope.teamStatsNorm, $scope.teams, $scope.stats);
      $scope.playerStars($scope.teamStatsNorm, $scope.stats);
    });

    // for collasping grouped sliders
    $scope.isCollapsed = true;

  }]);



