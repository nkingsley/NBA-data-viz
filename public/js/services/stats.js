// service delivering stat information for any controller that requires it
angular.module('mean.chart').factory("Stats", ['Global',  function (Global) {
 
  var exports = {};
  
  exports.teams = [
    {
      abbreviation:"ATL",
      franchise:"Atlanta Hawks",
      winPct:0.536,
      teamColor1: "#000080",
      teamColor2: "#FF0000",
      teamColor3: "#C0C0C0",
      starVal: 0
    },
    {
      abbreviation:"BOS",
      franchise:"Boston Celtics",
      winPct:0.414,
      teamColor1: "#009E60",
      teamColor2: "#FFFFFF",
      teamColor3: "#000000",
      starVal: 0
    },
    {
      abbreviation:"BKN",
      franchise:"Brooklyn Nets",
      winPct:0.333,
      teamColor1: "#000000",
      teamColor2: "#FFFFFF",
      teamColor3: "#000000",
      starVal: 0
    },
    {
      abbreviation:"CHA",
      franchise:"Charlotte Bobcats",
      winPct:0.483,
      teamColor1: "#002B5C",
      teamColor2: "#5191CD",
      teamColor3: "#F26531",
      starVal: 0
    },
    {
      abbreviation:"CHI",
      franchise:"Chicago Bulls",
      winPct:0.385,
      teamColor1: "#D4001F",
      teamColor2: "#000000",
      teamColor3: "#FFFFFF",
      starVal: 0
    },
    {
      abbreviation:"CLE",
      franchise:"Cleveland Cavaliers",
      winPct:0.370,
      teamColor1: "#b3121d",
      teamColor2: "#FFD700",
      teamColor3: "#000080",
      starVal: 0
    },
    {
      abbreviation:"DAL",
      franchise:"Dallas Mavericks",
      winPct:0.571,
      teamColor1: "#0b60ad",
      teamColor2: "#072156",
      teamColor3: "#A9A9A9",
      starVal: 0
    },
    {
      abbreviation:"DEN",
      franchise:"Denver Nuggets",
      winPct:0.519,
      teamColor1: "#4b90cd",
      teamColor2: "#fdb827",
      teamColor3: "#FFFFFF",
      starVal: 0
    },
    {
      abbreviation:"DET",
      franchise:"Detroit Pistons",
      winPct:0.467,
      teamColor1: "#00519a",
      teamColor2: "#EB003C",
      teamColor3: "#FFFFFF",
      starVal: 0
    },
    {
      abbreviation:"GSW",
      franchise:"Golden State Warriors",
      winPct:0.552,
      teamColor1: "#04529c",
      teamColor2: "#FFCC33",
      teamColor3: "#FFFFFF",
      starVal: 0
    },
    {
      abbreviation:"HOU",
      franchise:"Houston Rockets",
      winPct:0.621,
      teamColor1: "#CE1138",
      teamColor2: "#CCCCCC",
      teamColor3: "#000000",
      starVal: 0
    },
    {
      abbreviation:"IND",
      franchise:"Indiana Pacers",
      winPct:0.821,
      teamColor1: "#092c57",
      teamColor2: "#ffc322",
      teamColor3: "#FFFFFF",
      starVal: 0
    },
    {
      abbreviation:"LAC",
      franchise:"Los Angeles Clippers",
      winPct:0.690,
      teamColor1: "#EE2944",
      teamColor2: "#146AA2",
      teamColor3: "#FFFFFF",
      starVal: 0
    },
    {
      abbreviation:"LAL",
      franchise:"Los Angeles Lakers",
      winPct:0.464,
      teamColor1: "#4A2583",
      teamColor2: "#F5AF1B",
      teamColor3: "#FFFFFF",
      starVal: 0
    },
    {
      abbreviation:"MEM",
      franchise:"Memphis Grizzlies",
      winPct:0.444,
      teamColor1: "#001F70",
      teamColor2: "#7399C6",
      teamColor3: "#BED4E9",
      starVal: 0
    },
    {
      abbreviation:"MIA",
      franchise:"Miami Heat",
      winPct:0.778,
      teamColor1: "#1E3344",
      teamColor2: "#B62630",
      teamColor3: "#FFFFFF",
      starVal: 0
    },
    {
      abbreviation:"MIL",
      franchise:"Milwaukee Bucks",
      winPct:0.214,
      teamColor1: "#003614",
      teamColor2: "#E32636",
      teamColor3: "#C0C0C0",
    
      starVal: 0
    },
    {
      abbreviation:"MIN",
      franchise:"Minnesota Timberwolves",
      winPct:0.464,
      teamColor1: "#0F4D92",
      teamColor2: "#8c92ac",
      teamColor3: "#50c878",
      starVal: 0
    },
    {
      abbreviation:"NOP",
      franchise:"New Orleans Pelicans",
      winPct:0.462,
      teamColor1: "#072248",
      teamColor2: "#A1854D",
      teamColor3: "#C72E35",
      starVal: 0
    },
    {
      abbreviation:"NYK",
      franchise:"New York Knicks",
      winPct:0.333,
      teamColor1: "#0953a0",
      teamColor2: "#FF7518",
      teamColor3: "#C0C0C0",
      starVal: 0
    },
    {
      abbreviation:"OKC",
      franchise:"Oklahoma City Thunder",
      winPct:0.815,
      teamColor1: "#007DC3",
      teamColor2: "#F05133",
      teamColor3: "#FDBB30",
      starVal: 0
    },
    {
      abbreviation:"ORL",
      franchise:"Orlando Magic",
      winPct:0.286,
      teamColor1: "#0047AB",
      teamColor2: "#000000",
      teamColor3: "#708090",
      starVal: 0
    },
    {
      abbreviation:"PHI",
      franchise:"Philadelphia 76ers",
      winPct:0.286,
      teamColor1: "#D0103A",
      teamColor2: "#0046AD",
      teamColor3: "#FFFFFF",
      starVal: 0
    },
    {
      abbreviation:"PHX",
      franchise:"Phoenix Suns",
      winPct:0.630,
      teamColor1: "#FF8800",
      teamColor2: "#423189",
      teamColor3: "#000000",
      starVal: 0
    },
    {
      abbreviation:"POR",
      franchise:"Portland Trail Blazers",
      winPct:0.821,
      teamColor1: "#F0163A",
      teamColor2: "#B6BFBF",
      teamColor3: "#000000",
      starVal: 0
    },
    {
      abbreviation:"SAC",
      franchise:"Sacramento Kings",
      winPct:0.296,
      teamColor1: "#753BBD",
      teamColor2: "#000000",
      teamColor3: "#8A8D8F",
      starVal: 0
    },
    {
      abbreviation:"SAS",
      franchise:"San Antonio Spurs",
      winPct:0.786,
      teamColor1: "#000000",
      teamColor2: "#BEC8C9",
      teamColor3: "#FFFFFF",
      starVal: 0
    },
    {
      abbreviation:"TOR",
      franchise:"Toronto Raptors",
      winPct:0.423,
      teamColor1: "#B31B1B",
      teamColor2: "#000000",
      teamColor3: "#708090",
      starVal: 0
    },
    {
      abbreviation:"UTA",
      franchise:"Utah Jazz",
      winPct:0.258,
      teamColor1: "#00275D",
      teamColor2: "#FF9100",
      teamColor3: "#0D4006",
      starVal: 0
    },
    {
      abbreviation:"WAS",
      franchise:"Washington Wizards",
      winPct:0.480,
      teamColor1: "#C60C30",
      teamColor2: "#FFFFFF",
      teamColor3: "#002244",
      starVal: 0
    }];

    exports.calculateAllTeamStarVals = function (teamStatsNorm, teams, statWeights){
      var cumulativeTeamsStats = exports.cumulativeTeamsStats(teamStatsNorm);
      var teamsMaxMin = exports.getStatMaxMin(cumulativeTeamsStats);
      var teamsNormStats = exports.calculateTeamsNorm(cumulativeTeamsStats, teamsMaxMin);
      for (var i = 0 ; i < teams.length ; i++){
        teams[i].starVal = exports.calculateTeamStar(teams[i].abbreviation, teamsNormStats, statWeights);
      }
    };

    exports.cumulativeTeamsStats = function(teamsStatsNorm) {
      var teamsCumeStats = {};
      for (var team in teamsStatsNorm){
        if(!teamsCumeStats[teamsStatsNorm[team]]){
          teamsCumeStats[team] = {};
        }
        for (var player in teamsStatsNorm[team]){
          for(var stat in teamsStatsNorm[team][player]){
            if(!teamsCumeStats[team][stat]){
              teamsCumeStats[team][stat] = teamsStatsNorm[team][player][stat];
            } else {
              teamsCumeStats[team][stat] += teamsStatsNorm[team][player][stat];
            }
          }
        }
      }
      return teamsCumeStats;
    };

    exports.getStatMaxMin = function(t){
      var statsMaxMin = {};
      for (var i in t){
        for (var j in t[i]){
          if (!statsMaxMin[j]) {
            statsMaxMin[j] = {
              'max': t[i][j],
              'min': t[i][j],
              'range': statsMaxMin.max-statsMaxMin.min
            };
          } else {
            if(t[i][j] > statsMaxMin[j].max){
              statsMaxMin[j].max = t[i][j];
              statsMaxMin[j].range = statsMaxMin[j].max - statsMaxMin[j].min;
            }
            if(t[i][j] < statsMaxMin[j].min){
              statsMaxMin[j].min = t[i][j];
              statsMaxMin[j].range = statsMaxMin[j].max - statsMaxMin[j].min;
            }
          }
        }
      }
      return statsMaxMin;
    };

    exports.calculateTeamsNorm = function(cumulativeTeamsStats, teamsMaxMin){
      var teamNorms = {};
      for (var team in cumulativeTeamsStats){
        //creates each team in teamNorms)
        if(!teamNorms[team]){
          teamNorms[team] = {};
        }
        for(var j in cumulativeTeamsStats[team]){ 
          if (!teamNorms[team][j]){
            teamNorms[team][j]= 0;
          }
          teamNorms[team][j] = 1-(teamsMaxMin[j].max - (cumulativeTeamsStats[team][j]))/teamsMaxMin[j].range;
        }
      }
      return teamNorms;
    };
      
    exports.calculateTeamStar = function (team, normStats, statWeights) {
      var star = 0;
      var weightedStat = 0;
      var totalValue = 0;
      for (var statName in statWeights){
        totalValue+=parseFloat(statWeights[statName].weight);
      }
      for (var stat in normStats[team]){
        if(stat === 'MIN' || stat === 'GP'){
          continue;
        }
        weightedStat += normStats[team][stat] * parseFloat(statWeights[stat].weight);
      }
      (totalValue === 0) ? star = 0 : star = weightedStat/totalValue;
      return star;
    };

    exports.calculatePlayerStar = function (player, weights) {
      console.log("inside calculatePlayerStar");
      weights = weights || stat.stats;
      var starStatistic = 0;
      for (var teams in weights){
        starStatistic += player[key]*parseFloat(weights[key].weight);
      }
      return player.Total_MIN*starStatistic;
    };

    exports.nestedSliders = {
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

    exports.assignNestedSliders = function (statWeights, nestedSliders){
      for (var statName in statWeights) {
        switch(statName) {
          case "AST"  : 
          case "Assist opportunities" : 
          case "Passes" : 
          case "Points created by assist" : 
          case "FT Assists" : 
          case "Secondary Assists":
          case "PTS":
            nestedSliders.Passing[statName] = statWeights[statName];
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
            nestedSliders.Shooting[statName] = statWeights[statName];
            break;
          case "BLK"  : 
          case "Opp FG Missed at Rim" : 
          case "Opp FG Made at Rim" : 
          case "PF" : 
          case "STL":
            nestedSliders.Defense[statName] = statWeights[statName];
            break;
          case "REB"  : 
          case "REB Missed" : 
          case "Uncontested REB" : 
          case "Contested REB":
            nestedSliders.Rebounding[statName] = statWeights[statName];
            break;
          case "Distance Traveled miles":
          case "Elbow Touches":
          case "Touches":
          case "Front Court Touches":
          case "Drives":
          case "Drives PTS":
          case "TOV":
          case "Close Touches":
            nestedSliders.Athleticism[statName] = statWeights[statName];
            break;
          default:
            nestedSliders.Unsorted[statName] = statWeights[statName];
        }
      }
      return nestedSliders;
    }

    exports.changeSliders = function(nestedSliders, groupName) {
      var nest = nestedSliders[groupName];
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

    return exports;
  }]);