angular.module('mean.chart')
  .controller('chartCtrl', ['$scope', '$http', 'Global', 'Stats', 'Spearman', 'Teamstar', 'Playerstar',
    'promiseTracker', 
    function ($scope, $http, Global, Stats, Spearman, Teamstar, Playerstar, promiseTracker) {
    var teamsPromise = Global.stats;
    $scope.infoShow = 'Hide Info';
    $scope.itemsClass = "span12";
    $scope.sliderShow = "Show Sliders";
    $scope.slidersCollapsed = true;
    $scope.currentTeam = false;
    $scope.introCollapsed = true;
    $scope.introShow = 'Show Info';
    $scope.options = {width: 680, height: 550};
    $scope.spearman = Spearman;
    $scope.rhoVal = 0;
    $scope.weights = Stats.nestedSliders;
    $scope.recalculate = function(groupName,statName){
      Stats.changeSliders(statName,groupName);
      Teamstar.calculateTeamStarVals($scope.teamStats,$scope.weights,$scope.teams); 
      $scope.calculatePlayerStarVals($scope.currentTeam,false);
      $scope.updateRho();
    };
    $scope.introToggle = function(){
      $scope.introCollapsed = !$scope.introCollapsed;
      $scope.introShow = $scope.introCollapsed ? 'Show Info' : 'Hide Info';
    };
    $scope.sliderToggle = function(){
      $scope.slidersCollapsed = !$scope.slidersCollapsed;
      if ($scope.slidersCollapsed){
        $scope.itemsClass = "span12";
      } else {
        $scope.itemsClass = "span8";
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
      if (rhoVal > 0.9){
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
          debugger;
          group[stat].weight = group[statName].weight;
        }
      }
    };
    $scope.coupleStats = function(group){
      var result = {};
      var coupledStats = {};
      for (var stat in group){
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
    $scope.calculatePlayerStarVals = function(team, click){
      if (!team){
        return;
      }
      if (team !== "ALL"){
        var abbr = team.abbreviation;
      } else{
        var abbr = "ALL"
      }
      teamsPromise.then(function(data){        
        var playerPromise = Playerstar.calculatePlayerStarVals($scope.weights,abbr)
        playerPromise.then(function(){
          $scope.playerStats = Playerstar.teamPlayers;
          if (click){
            $scope.toggleOpenTeam(team);
          }
        });
        $scope.loadingTracker.addPromise(playerPromise);
      });
    };

    teamsPromise.then(function(data){
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

    // appendHackReactorBadge();
    $scope.loadingTracker = promiseTracker('loadingTracker');
    $scope.loadingTracker.addPromise(teamsPromise);
    // $scope.allCollapsed = true;
    $scope.isCollapsed = true;

    $scope.updateRho = function (){
      $scope.rhoVal = $scope.spearman.rho($scope.teams);
    };

    $scope.sendScore = function(weights){
      var name = prompt("Name these Slider Presets");
      $scope.updateRho();
      delete weights._id;
      delete weights.created;
      weights.score = $scope.rhoVal;
      weights.presetName = name;
      $http.post('/highscore',weights).success(function(data){
        console.log(data);
      });
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
