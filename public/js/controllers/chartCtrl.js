angular.module('mean.chart')
  .controller('chartCtrl', ['$scope', '$http', 'Global', function ($scope, $http, Global) {
    $scope.global = Global;
    $scope.global.stats.then(function(data){
      $scope.teamStats = data.teams;
      $scope.teamStatsNorm = data.teamsNorm
      $scope.stats = {};
      for (var statName in $scope.teamStatsNorm.ATL['Al Horford']){
        $scope.stats[statName] = {weight: 1};
      }
    })
    $scope.options = {width: 940, height: 500};
    // $scope.data = [1, 2, 3, 4];
    
    // $scope.hovered = function(d){
    //   $scope.barValue = d;
    //   $scope.$apply();
    // };

    // $scope.barValue = 'None';

    $scope.calculateAllTeamStarVals = function (){
      var cumulativeTeamsStats = $scope.cumulativeTeamsStats($scope.teamStatsNorm);
      var teamsMaxMin = $scope.getStatMaxMin(cumulativeTeamsStats);
      var teamsNormStats = $scope.calculateTeamsNorm(cumulativeTeamsStats, teamsMaxMin);
      for (var i = 0 ; i < $scope.teams.length ; i++){
        
        $scope.teams[i].starVal = $scope.calculateTeamStar($scope.teams[i], teamsNormStats);
        
      }
    };
    
    $scope.cumulativeTeamsStats = function(teamsStatsNorm) {
      var teamsCumeStats = {};
      for (var team in teamsStatsNorm){
        if(!teamsCumeStats[teamsStatsNorm[team]]){
          teamsCumeStats[team] = {}
        }
        for (var player in teamsStatsNorm[team]){
          for(var stat in teamsStatsNorm[team][player]){
            if(!teamsCumeStats[team][stat]){
              teamsCumeStats[team][stat] = teamsStatsNorm[team][player][stat]
            } else {
              teamsCumeStats[team][stat] += teamsStatsNorm[team][player][stat]
            }
          }
        }
      }
      return teamsCumeStats
      //return $scope.calculateTeamStar(teamsCumeStats);
    }

    $scope.getStatMaxMin = function(t){
      var statsMaxMin = {}

      for (var i in t){
        for (var j in t[i]){
          if (!statsMaxMin[j]) {
            statsMaxMin[j] = {
              'max': t[i][j],
              'min': t[i][j],
              'range': statsMaxMin['max']-statsMaxMin['min']
            }
          } else{
        if(t[i][j] > statsMaxMin[j]['max']){
          statsMaxMin[j]['max'] = t[i][j];
          statsMaxMin[j]['range'] = statsMaxMin[j]['max'] - statsMaxMin[j]['min'];
        }
        if(t[i][j] < statsMaxMin[j]['min']){
          statsMaxMin[j]['min'] = t[i][j];
          statsMaxMin[j]['range'] = statsMaxMin[j]['max'] - statsMaxMin[j]['min'];
        }
      }
        }          
      }

      return statsMaxMin      
    }

    $scope.calculateTeamsNorm = function(cumulativeTeamsStats, teamsMaxMin){
      var teamNorms = {};
      for (var team in cumulativeTeamsStats){
        //creates each team in teamNorms)
        if(!teamNorms[team]){
          teamNorms[team] = {};
        }
        for(j in cumulativeTeamsStats[team]){ 
          if (!teamNorms[team][j]){
            teamNorms[team][j]
          }         
          teamNorms[team][j] = 1-(teamsMaxMin[j]['max'] - (cumulativeTeamsStats[team][j]))/teamsMaxMin[j]['range']
        }
            
      }
      return teamNorms

    }
      
    $scope.calculateTeamStar = function (team, normStats) {
      var star = 0;
      var weightedStat
      var counter = 0
      var totalStat = 0
      for (var stat in normStats[team.abbreviation]){
        if(stat === 'MIN'){
          continue;
        }
        weightedStat = normStats[team.abbreviation][stat] * $scope.stats[stat].weight;
        totalStat += weightedStat;
        counter++;
      }
      star = totalStat/counter
      return star;
    };

    $scope.calculatePlayerStar = function (player, weights) {
      console.log("inside calculatePlayerStar");
      weights = weights || $scope.stats;
      var starStatistic = 0;
      for (var teams in weights){

        starStatistic += player[key]*parseFloat(weights[key].weight);
      }
      return player["Total_MIN"]*starStatistic;
    };

    $scope.hovered = function(d){
      console.log(d);
    };
    $scope.teams = [
    {
      abbreviation:"ATL",
      franchise:"Atlanta Hawks",
      winPct:0.536,
      teamColor1: "#000080",
      teamColor2: "#FF0000",
      teamColor3: "#C0C0C0",
      starVal: 35000000
    },
    {
      abbreviation:"BOS",
      franchise:"Boston Celtics",
      winPct:0.414,
      teamColor1: "#009E60",
      teamColor2: "#FFFFFF",
      teamColor3: "#000000",
      starVal: 35000000
    },
    {
      abbreviation:"BKN",
      franchise:"Brooklyn Nets",
      winPct:0.333,
      teamColor1: "#000000",
      teamColor2: "#FFFFFF",
      teamColor3: "#000000",
      starVal: 35000000
    },
    {
      abbreviation:"CHA",
      franchise:"Charlotte Bobcats",
      winPct:0.483,
      teamColor1: "#002B5C",
      teamColor2: "#5191CD",
      teamColor3: "#F26531",
      starVal: 35000000
    },
    {
      abbreviation:"CHI",
      franchise:"Chicago Bulls",
      winPct:0.385,
      teamColor1: "#D4001F",
      teamColor2: "#000000",
      teamColor3: "#FFFFFF",
      starVal: 35000000
    },
    {
      abbreviation:"CLE",
      franchise:"Cleveland Cavaliers",
      winPct:0.370,
      teamColor1: "#b3121d",
      teamColor2: "#FFD700",
      teamColor3: "#000080",
      starVal: 35000000
    },
    {
      abbreviation:"DAL",
      franchise:"Dallas Mavericks",
      winPct:0.571,
      teamColor1: "#0b60ad",
      teamColor2: "#072156",
      teamColor3: "#A9A9A9",
      starVal: 35000000
    },
    {
      abbreviation:"DEN",
      franchise:"Denver Nuggets",
      winPct:0.519,
      teamColor1: "#4b90cd",
      teamColor2: "#fdb827",
      teamColor3: "#FFFFFF",
      starVal: 35000000
    },
    {
      abbreviation:"DET",
      franchise:"Detroit Pistons",
      winPct:0.467,
      teamColor1: "#00519a",
      teamColor2: "#EB003C",
      teamColor3: "#FFFFFF",
      starVal: 35000000
    },
    {
      abbreviation:"GSW",
      franchise:"Golden State Warriors",
      winPct:0.552,
      teamColor1: "#04529c",
      teamColor2: "#FFCC33",
      teamColor3: "#FFFFFF",
      starVal: 35000000
    },
    {
      abbreviation:"HOU",
      franchise:"Houston Rockets",
      winPct:0.621,
      teamColor1: "#CE1138",
      teamColor2: "#CCCCCC",
      teamColor3: "#000000",
      starVal: 35000000
    },
    {
      abbreviation:"IND",
      franchise:"Indiana Pacers",
      winPct:0.821,
      teamColor1: "#092c57",
      teamColor2: "#ffc322",
      teamColor3: "#FFFFFF",
      starVal: 35000000
    },
    {
      abbreviation:"LAC",
      franchise:"Los Angeles Clippers",
      winPct:0.690,
      teamColor1: "#EE2944",
      teamColor2: "#146AA2",
      teamColor3: "#FFFFFF",
      starVal: 35000000
    },
    {
      abbreviation:"LAL",
      franchise:"Los Angeles Lakers",
      winPct:0.464,
      teamColor1: "#4A2583",
      teamColor2: "#F5AF1B",
      teamColor3: "#FFFFFF",
      starVal: 35000000
    },
    {
      abbreviation:"MEM",
      franchise:"Memphis Grizzlies",
      winPct:0.444,
      teamColor1: "#001F70",
      teamColor2: "#7399C6",
      teamColor3: "#BED4E9",
      starVal: 35000000
    },
    {
      abbreviation:"MIA",
      franchise:"Miami Heat",
      winPct:0.778,
      teamColor1: "#1E3344",
      teamColor2: "#B62630",
      teamColor3: "#FFFFFF",
      starVal: 35000000
    },
    {
      abbreviation:"MIL",
      franchise:"Milwaukee Bucks",
      winPct:0.214,
      teamColor1: "#003614",
      teamColor2: "#E32636",
      teamColor3: "#C0C0C0",
    
      starVal: 35000000
    },
    {
      abbreviation:"MIN",
      franchise:"Minnesota Timberwolves",
      winPct:0.464,
      teamColor1: "#0F4D92",
      teamColor2: "#8c92ac",
      teamColor3: "#50c878",
      starVal: 35000000
    },
    {
      abbreviation:"NOP",
      franchise:"New Orleans Pelicans",
      winPct:0.462,
      teamColor1: "#072248",
      teamColor2: "#A1854D",
      teamColor3: "#C72E35",
      starVal: 35000000
    },
    {
      abbreviation:"NYK",
      franchise:"New York Knicks",
      winPct:0.333,
      teamColor1: "#0953a0",
      teamColor2: "#FF7518",
      teamColor3: "#C0C0C0",
      starVal: 35000000
    },
    {
      abbreviation:"OKC",
      franchise:"Oklahoma City Thunder",
      winPct:0.815,
      teamColor1: "#007DC3",
      teamColor2: "#F05133",
      teamColor3: "#FDBB30",
      starVal: 35000000
    },
    {
      abbreviation:"ORL",
      franchise:"Orlando Magic",
      winPct:0.286,
      teamColor1: "#0047AB",
      teamColor2: "#000000",
      teamColor3: "#708090",
      starVal: 35000000
    },
    {
      abbreviation:"PHI",
      franchise:"Philadelphia 76ers",
      winPct:0.286,
      teamColor1: "#D0103A",
      teamColor2: "#0046AD",
      teamColor3: "#FFFFFF",
      starVal: 35000000
    },
    {
      abbreviation:"PHX",
      franchise:"Phoenix Suns",
      winPct:0.630,
      teamColor1: "#FF8800",
      teamColor2: "#423189",
      teamColor3: "#000000",
      starVal: 35000000
    },
    {
      abbreviation:"POR",
      franchise:"Portland Trail Blazers",
      winPct:0.821,
      teamColor1: "#F0163A",
      teamColor2: "#B6BFBF",
      teamColor3: "#000000",
      starVal: 35000000
    },
    {
      abbreviation:"SAC",
      franchise:"Sacramento Kings",
      winPct:0.296,
      teamColor1: "#753BBD",
      teamColor2: "#000000",
      teamColor3: "#8A8D8F",
      starVal: 35000000
    },
    {
      abbreviation:"SAS",
      franchise:"San Antonio Spurs",
      winPct:0.786,
      teamColor1: "#000000",
      teamColor2: "#BEC8C9",
      teamColor3: "#FFFFFF",
      starVal: 35000000
    },
    {
      abbreviation:"TOR",
      franchise:"Toronto Raptors",
      winPct:0.423,
      teamColor1: "#B31B1B",
      teamColor2: "#000000",
      teamColor3: "#708090",
      starVal: 35000000
    },
    {
      abbreviation:"UTA",
      franchise:"Utah Jazz",
      winPct:0.258,
      teamColor1: "#00275D",
      teamColor2: "#FF9100",
      teamColor3: "#0D4006",
      starVal: 35000000
    },
    {
      abbreviation:"WAS",
      franchise:"Washington Wizards",
      winPct:0.480,
      teamColor1: "#C60C30",
      teamColor2: "#FFFFFF",
      teamColor3: "#002244",
      starVal: 35000000
    }
    ]


  }]);



