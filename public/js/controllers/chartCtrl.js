angular.module('mean.chart')
  .controller('chartCtrl', ['$scope', '$http', 'Global', 'Stats', 'Spearman', 
    'promiseTracker', 
    function ($scope, $http, Global, Stats, Spearman, promiseTracker) {
    var statsPromise = Global.stats;
    // var calPlayerWeightedStatsPromise = Stats.calWeightedPlayerStatsPromise;
    $scope.options = {width: 840, height: 500};
    $scope.teams = Stats.teams;
    $scope.calculateAllTeamStarVals = Stats.calculateAllTeamStarVals;
    $scope.playerWeightedStats = Stats.playerWeightedStats;
    $scope.calculatePlayerWeightedStats = Stats.calculatePlayerWeightedStats;  
    $scope.changeSliders = Stats.changeSliders;
    $scope.nestedSliders = Stats.nestedSliders;
    $scope.spearman = Spearman;
    $scope.rhoVal = 0;
    $scope.stats = Stats.stats;

    statsPromise.then(function(data){
      appendHackReactorBadge();
      $scope.teamStats = data.teams;
      $scope.teamStatsNorm = data.teamsNorm;
      $scope.statsInfo = data.statsInfo;
      $scope.normStatsByStat = data.normStatsByStat;
      $scope.statsByTeam = data.statsByTeam;
      for (var statName in $scope.statsInfo){
        if(statName === 'GP' || statName === 'MIN'){
          continue;
        }
        $scope.stats[statName] = $scope.stats[statName] || {weight: 5, cat: $scope.statsInfo[statName].cat};
      }
      $scope.nestedSliders = Stats.assignNestedSliders($scope.stats, $scope.nestedSliders);
      $scope.calculateAllTeamStarVals($scope.teamStatsNorm, $scope.teams, $scope.stats, $scope.statsByTeam);
      $scope.calculatePlayerWeightedStats($scope.teamStatsNorm, $scope.stats, $scope.statsByTeam);
      $scope.updateRho();
    });

    var appendHackReactorBadge = function (){
      var img = document.createElement('img');
      img.setAttribute('style', "position: fixed; top: 0; right: 0; border: 0;");
      img.setAttribute('src',"http://i.imgur.com/x86kKmF.png");
      img.setAttribute('alt',"Built at Hack Reactor");
      var a = document.createElement('a');
      a.setAttribute('href',"http://hackreactor.com");
      a.appendChild(img);
      document.body.appendChild(a);
    }

    // tracks the progress of the stats data fetch and processing
    // so that we can display and hide a spinner to indicate to
    // user that something is happening
    $scope.loadingTracker = promiseTracker('loadingTracker');
    $scope.loadingTracker.addPromise(statsPromise);

    // tracks the progress of the playerWeightStats processing
    // so that we can display and hide a spinner to indicate to
    // user that something is happening
    // $scope.crunchingTracker = promiseTracker('crunchingTracker');
    // $scope.crunchingTracker.addPromise(calWeightedPlayerStatsPromise);

    // for collasping grouped sliders
    // TODO: have $scope.isCollapsed represent the state of all
    // children collapse components
    $scope.allCollapsed = true;
    $scope.openTeam = null; // expanded team abbreviation
    $scope.isCollapsed = true;

    $scope.collapseOther = function (team){
      if ($scope.openTeam && $scope.openTeam !== team.abbreviation){
        for (var i = 0; i < $scope.teams.length; i++) {
          if ($scope.teams[i].abbreviation === $scope.openTeam) {
            $scope.teams[i].isCollapsed = true;
          }
        }
      }
      team.isCollapsed = !team.isCollapsed;
      $scope.openTeam = team.isCollapsed ? null : team.abbreviation;
    };

    $scope.updateRho = function (){
      $scope.rhoVal = $scope.spearman.rho($scope.teams);
    };  

    $scope.makeHeadShotUrl = function(name, isCollapsed) {
      if(isCollapsed) { return ""; }

      var removePunctuation = function(str) {
        return str.replace(/[.']/g,'')
      };

      var url = "http://i.cdn.turner.com/nba/nba/.element/img/2.0/sect/statscube/players/large/";
      var firstLast = null;
      var formatted_name = null;

      firstLast = name.split(" ");
      for (var i = 0; i < firstLast.length; i++) {
        firstLast[i] = removePunctuation(firstLast[i]);
      }
      formatted_name = firstLast.join("_");
      return url + formatted_name.toLowerCase() + '.png';
      console.log(_);
    };

  }]);



