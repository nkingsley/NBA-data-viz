angular.module('mean.chart')
  .controller('chartCtrl', ['$scope', '$http', '$timeout', 'Global', 'Stats', 'Spearman', 'Teamstar', 'Playerstar', 'Graphrequests', 'Graphcalc',
    'promiseTracker',
    function ($scope, $http, $timeout, Global, Stats, Spearman, Teamstar, Playerstar, Graphrequests, Graphcalc, promiseTracker) {
    $scope.global = Global;
    $scope.infoShow = 'Hide Info';
    $scope.itemsClass = "span12";
    $scope.sliderShow = "Show Sliders";
    $scope.slidersCollapsed = true;
    $scope.currentTeam = false;
    $scope.introCollapsed = true;
    $scope.introShow = 'i';
    $scope.options = {width: 550, height: 430};
    $scope.spearman = Spearman;
    $scope.rhoVal = 0;
    $scope.weights = Stats.nestedSliders;


    // Line-Chart variables and functions //  
    $scope.makeGraphData = Graphcalc.makeGraphData;
    $scope.calculateWindowStats = Graphcalc.calculateWindowStats;
    $scope.timeRequest = Graphrequests.timeRequest;
    $scope.dt = {};
    $scope.graphStat = null;
    $scope.graphSelected = null;
    $scope.graphData = [];
    var graphInputData = {};
    $scope.xAxisTickFormat_Time_Format = function(){
      return function(d){
        console.log(d);
        return d3.time.format('%x')(new Date(d)); 
      }
    };
    $scope.getGraphData = function(){
      if (!graphInputData[$scope.graphSelected]){
        $scope.graphRequest = Graphrequests.timeRequest($scope.graphSelected, $scope.dt.startDate, $scope.dt.endDate);
        $scope.graphRequest.then(function(data){
          graphInputData[$scope.graphSelected] = data;
          $scope.calculateWindowStats(graphInputData, $scope.weights);
          $scope.makeGraphData($scope.graphStat);
        })
      }
    };

    $scope.makeGraphData = function(statName){
      var entity = $scope.graphSelected;
      for (var key in graphInputData){
        var windowStats = {key: null, values: []}; // e.g. 'Lebron James' over a two week span
          windowStats['key'] = entity;
        for (var i = 0; i < graphInputData[entity].length; i++){ // for each day in Lebron's window
          var dayData = [new Date(graphInputData[entity][i].created), graphInputData[entity][i][statName]];
          windowStats['values'].push(dayData);
        }
      }
      $scope.graphData = $scope.graphData.concat([windowStats]);
      };
    $scope.buttonShrink = function(){
      return $scope.slidersCollapsed ? 'medium' : 'medSmall';
    }
    $scope.startDate = function() {
      $scope.dt.startDate = new Date();
    };
    $scope.endDate = function() {
      $scope.dt.endDate = new Date();
    };
    $scope.startDate();
    $scope.endDate();

    $scope.recalculate = function(groupName,statName){
      Stats.changeSliders(statName,groupName);
      Teamstar.calculateTeamStarVals($scope.teamStats,$scope.weights,$scope.teams);
      $scope.calculatePlayerStarVals($scope.currentTeam,false);
      $scope.updateRho();
    };
    $scope.introToggle = function(){
      $scope.introCollapsed = !$scope.introCollapsed;
      $scope.introShow = $scope.introCollapsed ? 'i' : '^';
    };
    $scope.sliderToggle = function(){
      $scope.slidersCollapsed = !$scope.slidersCollapsed;
      if ($scope.slidersCollapsed){
        $scope.itemsClass = "span12";
      } else {
        $scope.itemsClass = "span7";
      }
      $scope.sliderShow = $scope.slidersCollapsed ? 'Show Sliders' : 'Hide Sliders';
    };
    $scope.toggleOpenTeam = function(team){
      if ($scope.currentTeam === team){
        $scope.currentTeam = false;
      } else {
        $scope.currentTeam = team;
      }
    };

    $scope.redGreen = function(rhoVal){
      if (rhoVal > 0.8){
        return 'rhoGreen';
      } else{
        return 'rhoRed';
      }
    };
    $scope.changeCoupled = function(statName,group){
      if (!group[statName].coupledName){
        return;
      }
      for (var stat in group){
        if (stat === statName){
          continue;
        }
        if (group[stat].coupledName === group[statName].coupledName){
          group[stat].weight = group[statName].weight;
        }
      }
    };
    $scope.coupleStats = function(group){
      var result = {};
      var coupledStats = {};
      for (var stat in group){
        if (!$scope.filterTeamOnlySliders(group[stat]) && stat !== "Team Defense"){continue;}
        if (coupledStats[group[stat].coupledName] || stat === "main" || stat === "oldMain"){
          continue;
        }
        if (group[stat].coupledName){
          coupledStats[group[stat].coupledName] = true;
        }
        result[stat]= group[stat];
      }
      return result;
    };

    $scope.filterTeamOnlySliders = function(stat){
      if (!(stat.weight > -1)){return false;}
      if ($scope.currentTeam === 'ALL'){
        if (stat.cat === "PSS_TM" || stat.cat === "SHT_TM"){
          return false;
        }
      }
      return true;
    };

    $scope.calculatePlayerStarVals = function(team, click){
      if (!team){
        return;
      }
      if (team !== "ALL"){
        var abbr = team.abbreviation;
      } else{
        var abbr = "ALL"
      }
      Global.stats.then(function(data){
        var playerPromise = Playerstar.calculatePlayerStarVals($scope.weights,abbr)
        playerPromise.then(function(){
          $scope.playerStats = Playerstar.teamPlayers;
          if (click){
            $scope.toggleOpenTeam(team);
          }
          $scope.teamsAndPlayers = $scope.playerStats.concat($scope.teams); // Might be sad code, but it has to run somewhere after playerStats gets defined
        });
        $scope.loadingTracker.addPromise(playerPromise);
      });
      return false;
    };


    // HEY THIS PROBABLY SHOULD BE SOMEWHERE NICER
    $scope.calculatePlayerStarVals("ALL");



    Global.stats.then(function(data){
      $scope.presets = data.presets;
      $scope.teamStats = data.teamStats;
      $scope.weights = data.cats;
      $scope.teams = data.teams;
      $scope.nestedSliders = Stats.assignNestedSliders($scope.weights);
      Teamstar.calculateTeamStarVals($scope.teamStats, $scope.weights, $scope.teams);
      $scope.updateRho();
    });
    $scope.setWeights = function(preset){
      $scope.weights = preset;
      $scope.nestedSliders = Stats.assignNestedSliders($scope.weights);
      Teamstar.calculateTeamStarVals($scope.teamStats, $scope.weights, $scope.teams);
      $scope.currentTeam && $scope.calculatePlayerStarVals($scope.currentTeam);
      $scope.updateRho();
      console.log($scope.weights);
    };
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

    $scope.loadingTracker = promiseTracker('loadingTracker');
    $scope.loadingTracker.addPromise(Global.stats);

    $scope.updateRho = function (){
      $scope.rhoVal = $scope.spearman.rho($scope.teams);
    };

    $scope.sendScore = function(weights){
      var name = prompt("Name these Slider Presets");
      if (!name){return;}
      $scope.updateRho();
      delete weights._id;
      delete weights.created;
      weights.score = $scope.rhoVal;
      weights.presetName = name;
      weights.user = Global.user._id;
      $http.post('/highscore',weights).success(function(data){
        console.log(data);
        if ($scope.userPresets){
          $scope.userPresets.push(weights);
        }
      });
    };

    if(Global.user){
      $http.get('/presets').success(function(data){
        $scope.userPresets = data;
      });
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
  }]);
