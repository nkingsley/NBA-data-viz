angular.module('MoneyBaller')
  .controller('mainController', ['$scope', '$http', '$location', 'Global', 'Sliders', 'Scatter',
    'Spearman', 'Teamstar', 'Players', 'Graphrequests', 'Graphcalc', 'promiseTracker', 'Header',
    'Coupling', 'Presets',
    function ($scope, $http, $location, Global, Sliders, Scatter, Spearman, Teamstar, Players, Graphrequests, Graphcalc, promiseTracker, Header, Coupling, Presets) {
    $scope.players = Players;
    $scope.global = Global;
    $scope.presets = Presets;
    $scope.coupling = Coupling;
    $scope.sl = Sliders;
    $scope.head = Header;
    $scope.scatter = Scatter;
    $scope.loadingTracker = promiseTracker('loadingTracker');
    $scope.$watch('sl.slidersCollapsed',Scatter.toggleChart);
    $scope.spearman = Spearman;
    $scope.rhoVal = 0;
    $scope.weights = Sliders.nestedSliders;



    // Line-Chart variables and functions //  
    $scope.adjWindowStats = Graphcalc.adjWindowStats;
    $scope.calculateWindowStats = Graphcalc.calculateWindowStats;
    $scope.timeRequest = Graphrequests.timeRequest;
    $scope.dt = {};
    $scope.graphStat = "baller";
    $scope.graphSelected = null;
    $scope.graphData = [];
    var graphInputData = {};


    $scope.getGraphData = function(){
      $scope.drawChart = true;
      if (!graphInputData[$scope.graphSelected]){
        $scope.graphRequest = Graphrequests.timeRequest($scope.graphSelected, $scope.dt.startDate, $scope.dt.endDate);
        $scope.graphRequest.then(function(data){
          graphInputData[$scope.graphSelected] = data;
          $scope.calculateWindowStats(graphInputData, $scope.weights, $scope.teamStats);
          $scope.makeGraphData($scope.graphStat);
        })
      } else 
      $scope.makeGraphData($scope.graphStat);
    };

    $scope.makeGraphData = function(statName){
      $scope.graphData = [];
      for (var key in $scope.adjWindowStats){
        var entity = key;
        var windowStats = {key: null, values: []}; // e.g. 'Lebron James' over a two week span
          windowStats['key'] = entity;
        for (var i = 0; i < $scope.adjWindowStats[entity].length; i++){
          var dayData = [new Date($scope.adjWindowStats[entity][i].created), $scope.adjWindowStats[entity][i][statName]];
          windowStats['values'].push(dayData);
        }
      $scope.graphData = $scope.graphData.concat([windowStats]);
      }
    };
    
    $scope.removeGraphData = function(){
      $scope.drawChart = false;
      $scope.graphData = [];
      $scope.adjWindowStats = Graphcalc.adjWindowStats;
      graphInputData = {};
    };

    $scope.startDate = function() {
      $scope.dt.startDate = new Date();
    };
    $scope.endDate = function() {
      $scope.dt.endDate = new Date();
    };
    $scope.startDate();
    $scope.endDate();

    $scope.recalculate = function(groupName){
      groupName && Sliders.changeSliders(groupName);
      Teamstar.calculateTeamStarVals($scope.teamStats,$scope.weights,$scope.teams);
      Players.startPlayerCalc(false, $scope.weights);
      //TODO: only if requested by current instance of controller
      if ($location.path() === '/graph'){
        $scope.teamsAndPlayers = Players.teamPlayers.concat($scope.teams);
        $scope.calculateWindowStats(graphInputData, $scope.weights);
        $scope.makeGraphData($scope.graphStat);
      }
      $scope.updateRho();
    };


    var setup = function(data,fromLocal){
      if(!fromLocal){
        if (Global.showingLastTen){
          Global.lastTenSetupHolder = angular.copy(data.teamStats);
        } else{
          Global.totalSetupHolder = angular.copy(data.teamStats);
        }
        $scope.teamStats = data.teamStats;
      } else{
        $scope.teamStats = data;
      }
      Global.stats.then(function(stats){
        $scope.teams = stats.teams;
        $scope.presets = stats.presets;
        $scope.weights = stats.cats;
        $scope.nestedSliders = Sliders.assignNestedSliders($scope.weights);
        $scope.recalculate();
      });
    };

    $scope.updateRho = function (){
      $scope.rhoVal = $scope.spearman.rho($scope.teams);
    };

    $scope.setWeights = function(preset){
      $scope.weights = preset;
      $scope.nestedSliders = Sliders.assignNestedSliders($scope.weights);
      $scope.recalculate();
    };

    $scope.loadingTracker.addPromise(Global.stats);

    $scope.lastTen = function(){
      if(Global.showingLastTen){return;}
      Global.showingLastTen = true;
      if(Players.allPlayers){
        Global.totalHolder = Players.allPlayers;
        Players.allPlayers = Global.lastTenHolder;
      }
      if (Global.lastTenSetupHolder){
        setup(Global.lastTenSetupHolder,true);
      } else{
        var gp = Global.init('lt');
        gp.then(setup);
        $scope.loadingTracker.addPromise(gp);
      }
    };
    $scope.total = function(){
      if(!Global.showingLastTen){return;}
      Global.showingLastTen = false;
      if(Players.allPlayers){
        Global.lastTenHolder = Players.allPlayers;
        Players.allPlayers = Global.totalHolder;
      }      
      setup(Global.totalSetupHolder,true);
    }
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

    $scope.routes = {};
    $scope.routes[$location.path()] = true;

    //kickoff process
    if (Global.showingLastTen){
      setup(Global.lastTenSetupHolder, 'local');    
    } else{
      if(Global.totalSetupHolder){
        setup(Global.totalSetupHolder, 'local');
      } else{
        Global.stats.then(setup);
      }
    }
  }]);
