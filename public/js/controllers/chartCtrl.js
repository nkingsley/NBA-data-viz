angular.module('mean.chart')
  .controller('chartCtrl', ['$scope', '$http', 'Global', 'Stats', function ($scope, $http, Global, Stats) {
    
    $scope.options = {width: 940, height: 500};
    $scope.teams = Stats.teams;
    $scope.calculateAllTeamStarVals = Stats.calculateAllTeamStarVals;
    $scope.changeSliders = Stats.changeSliders;
    $scope.nestedSliders = Stats.nestedSliders;

    Global.stats.then(function(data){
      $scope.teamStats = data.teams;
      $scope.teamStatsNorm = data.teamsNorm;
      $scope.stats = {};
      for (var statName in $scope.teamStatsNorm.ATL['Al Horford']){
        if(statName === 'GP' || statName === 'MIN'){
          continue;
        }
        $scope.stats[statName] = {weight: 1};
      }
      
      for (var statName in $scope.stats) {
        switch(statName) {
          case "AST"  : 
          case "Assist opportunities" : 
          case "Passes" : 
          case "Points created by assist" : 
          case "FT Assists" : 
          case "Secondary Assists":
          case "PTS":
            $scope.nestedSliders.Passing[statName] = $scope.stats[statName];
            break;
          case "Catch and Shoot 3FG Missed"  : 
          case "Catch and Shoot 3FG Made" : 
          case "Catch and Shoot FG Missed" : 
          case "Catch and Shoot FG Made" : 
          case "Catch and Shoot PTS" : 
          case "Close Shots PTS" : 
          case "Pull Up Shots FG3 Missed" : 
          case "Pull Up Shots FG3 Made" : 
          case "Pull Up Shots FG Missed" : 
          case "Pull Up Shots FG Made" : 
          case "Pull Up Shots PTS":
            $scope.nestedSliders.Shooting[statName] = $scope.stats[statName];
            break;
          case "BLK"  : 
          case "Opp FG Missed at Rim" : 
          case "Opp FG Made at Rim" : 
          case "PF" : 
          case "STL":
            $scope.nestedSliders.Defense[statName] = $scope.stats[statName];
            break;
          case "REB"  : 
          case "REB Missed" : 
          case "Uncontested REB" : 
          case "Contested REB":
            $scope.nestedSliders.Rebounding[statName] = $scope.stats[statName];
            break;
          case "Distance Traveled miles":
          case "Elbow Touches":
          case "Touches":
          case "Front Court Touches":
          case "Drives":
          case "Drives PTS":
          case "TOV":
          case "Close Touches":
            $scope.nestedSliders.Athleticism[statName] = $scope.stats[statName];
            break;
          default:
            $scope.nestedSliders.Unsorted[statName] = $scope.stats[statName];
        }
      }
      $scope.teams = $scope.calculateAllTeamStarVals($scope.teamStatsNorm, $scope.teams, $scope.stats);
    });



  }]);



