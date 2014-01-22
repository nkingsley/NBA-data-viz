angular.module('mean.chart')
  .controller('chartCtrl', ['$scope', '$http', 'Global', 'Stats', 'Spearman', 'Teamstar', 'Playerstar',
    'promiseTracker', 
    function ($scope, $http, Global, Stats, Spearman, Teamstar, Playerstar, promiseTracker) {
    var teamsPromise = Global.stats;
    $scope.options = {width: 840, height: 500};
    //$scope.teams should be replaced by the object at Global.teams
    // $scope.players = Playerstar.players;
    $scope.calculateTeamStarVals = Teamstar.calculateTeamStarVals;
    // $scope.calculateAllTeamStarVals = Stats.calculateAllTeamStarVals;
    // $scope.playerWeightedStats = Stats.playerWeightedStats;
    // $scope.calculatePlayerWeightedStats = Stats.calculatePlayerWeightedStats;
    $scope.changeSliders = Stats.changeSliders;
    $scope.nestedSliders = Stats.nestedSliders;
    $scope.spearman = Spearman;
    $scope.rhoVal = 0;
    $scope.weights = {};
    $scope.currentTeam = null;

    $scope.calculatePlayerStarVals = function(weights,openTeam){
      debugger;
      if (openTeam === $scope.currentTeam){
        var players = $scope.playerStats;
        Playerstar.calculatePlayerStarVals(weights,openTeam,players);
        var teamPlayers = Playerstar.teamPlayers;
        $scope.playerStats = teamPlayers;
        $scope.inflate(openTeam);
      } else {
        Playerstar.teamStatReq(openTeam)
        .then(function(players){
          Playerstar.calculatePlayerStarVals(weights,openTeam,players);
          $scope.playerStats = Playerstar.teamPlayers;
          $scope.currentTeam = openTeam;
          $scope.inflate(openTeam);
        });
      }
    };

    teamsPromise.then(function(data){
      $scope.teamStats = data.teamStats;
      $scope.weights = data.cats;
      $scope.teams = data.teams;
      $scope.nestedSliders = Stats.assignNestedSliders($scope.weights, $scope.nestedSliders);
      $scope.calculateTeamStarVals($scope.teamStats, $scope.weights, $scope.teams);
      $scope.updateRho();
    });
    // playerPromise.then(function(data){
    //   $scope.playerStats = data.playerStats;
    //   $scope.nestedSliders = Stats.assignNestedSliders($scope.weights, $scope.nestedSliders);
    //   $scope.calculatePlayerStarVals($scope.playerStats, $scope.weights, false);
    //   $scope.openTeamPlayers = Playerstar.teamPlayers;
    // });

    var appendHackReactorBadge = function (){
      var img = document.createElement('img');
      img.setAttribute('style', "position: fixed; top: 0; right: 0; border: 0;");
      img.setAttribute('src',"http://i.imgur.com/x86kKmF.png");
      img.setAttribute('alt',"Built at Hack Reactor");
      var a = document.createElement('a');
      a.setAttribute('href',"http://hackreactor.com");
      a.appendChild(img);
      document.body.appendChild(a);
    };

    appendHackReactorBadge();
    // tracks the progress of the stats data fetch and processing
    // so that we can display and hide a spinner to indicate to
    // user that something is happening
    $scope.loadingTracker = promiseTracker('loadingTracker');
    $scope.loadingTracker.addPromise(teamsPromise);

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
    $scope.collapseAll = function(){
      for (var i = 0 ; i < $scope.teams.length ; i++){
        if (!$scope.teams[i].isCollapsed){
          $scope.teams[i].isCollapsed = true;
        }
      }
    };
    $scope.inflate = function(team){
      for (var i = 0 ; i < $scope.teams.length ; i++){
        if ($scope.teams[i].abbreviation === team){
          $scope.teams[i].isCollapsed = false;
        }
      }
    };
    $scope.updateRho = function (){
      $scope.rhoVal = $scope.spearman.rho($scope.teams);
    };

    $scope.makeHeadShotUrl = function(name, isCollapsed) {
      
      if(isCollapsed) { return ""; }

      var removePunctuation = function(str) {
        return str.replace(/[.']/g,'');
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
    };

  }]);



