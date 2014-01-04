angular.module('mean.chart')
  .controller('chartCtrl', ['$scope', '$http', 'Global', 'Stats', function ($scope, $http, Global, Stats) {
    $scope.global = Global;
    $scope.teams = Stats.teams;
    $scope.calculateAllTeamStarVals = Stats.calculateAllTeamStarVals;

    $scope.global.stats.then(function(data){
      $scope.teamStats = data.teams;
      $scope.teamStatsNorm = data.teamsNorm;
      $scope.stats = {};
      for (var statName in $scope.teamStatsNorm.ATL['Al Horford']){
        if(statName === 'GP' || statName === 'MIN'){
          continue;
        }
        $scope.stats[statName] = {weight: 1};
      }
      $scope.nestedSliders = {
        Passing:{
          main:1,
          oldMain:1
        },
        Shooting:{
          main:1,
          oldMain:1
        },
        Defense:{
          main:1,
          oldMain:1
        },
        Rebounding:{
          main:1,
          oldMain:1
        },
        Athleticism:{
          main:1,
          oldMain:1
        },
        Unsorted:{
          main:1,
          oldMain:1
        }
      };
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
      $scope.calculateAllTeamStarVals();
    });

    $scope.calculateAllTeamStarVals = function (){
      var cumulativeTeamsStats = Stats.cumulativeTeamsStats($scope.teamStatsNorm);
      var teamsMaxMin = Stats.getStatMaxMin(cumulativeTeamsStats);
      var teamsNormStats = Stats.calculateTeamsNorm(cumulativeTeamsStats, teamsMaxMin);
      for (var i = 0 ; i < $scope.teams.length ; i++){
        $scope.teams[i].starVal = Stats.calculateTeamStar($scope.teams[i].abbreviation, teamsNormStats, $scope.stats);
      }
    };

    $scope.changeSliders = function(groupName) {
      var nest = $scope.nestedSliders[groupName];
      for (statName in nest){
        var stat = nest[statName];
        if (statName === "main" || statName === "oldMain"){
          continue;
        }
        stat.weight = parseFloat(stat.weight) + (parseFloat(nest.main) - parseFloat(nest.oldMain));
        if (stat.weight < 0){
          stat.weight = 0;
        }
        if (stat.weight > 5){
          stat.weight = 5;
        }
      }
      nest.oldMain = parseFloat(nest.main);
    }

    
    $scope.options = {width: 940, height: 500};

    $scope.hovered = function(d){
      console.log(d);
    };
    

  }]);



