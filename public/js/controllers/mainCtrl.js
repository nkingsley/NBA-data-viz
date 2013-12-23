angular.module('mean.chart')
  .controller('mainCtrl', function AppCtrl ($scope, teamStats) {
    $scope.options = {width: 500, height: 300, 'bar': 'aaa'};
    $scope.data = [1, 2, 3, 4];
    
    $scope.hovered = function(d){
      $scope.barValue = d;
      $scope.$apply();
    };

    $scope.barValue = 'None';

    $scope.calculatePlayerStar = function (values, weights) {
      var starStatistic = 0;
      for (key in values){
        starStatistic += (values[key]/leagueMedians[key])*weights[key];
      }
      return values["Total Min"]*starStatistic;
    };
  });