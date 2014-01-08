// service delivering stat information for any controller that requires it
angular.module('mean.chart').factory("Stats", ['Global',  function (Global) {
 
  var exports = {};
  exports.teams = [
    {
      abbreviation:"ATL",
      franchise:"Atlanta Hawks",
      logo_url: "atl_hawks.gif",
      winPct:0.563,
      teamColor1: "#000080",
      teamColor2: "#FF0000",
      teamColor3: "#C0C0C0",
      starVal: 0
    },
    {
      abbreviation:"BOS",
      franchise:"Boston Celtics",
      logo_url: "bstn_celtics.gif",
      winPct:0.406,
      teamColor1: "#009E60",
      teamColor2: "#FFFFFF",
      teamColor3: "#000000",
      starVal: 0
    },
    {
      abbreviation:"BKN",
      franchise:"Brooklyn Nets",
      logo_url: "bkn_nets.gif",
      winPct:0.344,
      teamColor1: "#000000",
      teamColor2: "#FFFFFF",
      teamColor3: "#000000",
      starVal: 0
    },
    {
      abbreviation:"CHA",
      franchise:"Charlotte Bobcats",
      logo_url: "chlt_bobcats.gif",
      winPct:0.412,
      teamColor1: "#002B5C",
      teamColor2: "#5191CD",
      teamColor3: "#F26531",
      starVal: 0
    },
    {
      abbreviation:"CHI",
      franchise:"Chicago Bulls",
      logo_url: "chi_bulls.gif",
      winPct:0.419,
      teamColor1: "#D4001F",
      teamColor2: "#000000",
      teamColor3: "#FFFFFF",
      starVal: 0
    },
    {
      abbreviation:"CLE",
      franchise:"Cleveland Cavaliers",
      logo_url: "cvld_cavs.gif",
      winPct:0.344,
      teamColor1: "#b3121d",
      teamColor2: "#FFD700",
      teamColor3: "#000080",
      starVal: 0
    },
    {
      abbreviation:"DAL",
      franchise:"Dallas Mavericks",
      logo_url: "dls_mavericks.gif",
      winPct:0.594,
      teamColor1: "#0b60ad",
      teamColor2: "#072156",
      teamColor3: "#A9A9A9",
      starVal: 0
    },
    {
      abbreviation:"DEN",
      franchise:"Denver Nuggets",
      logo_url: "dvr_nuggets.gif",
      winPct:0.452,
      teamColor1: "#4b90cd",
      teamColor2: "#fdb827",
      teamColor3: "#FFFFFF",
      starVal: 0
    },
    {
      abbreviation:"DET",
      franchise:"Detroit Pistons",
      logo_url: "det_pistons.gif",
      winPct:0.424,
      teamColor1: "#00519a",
      teamColor2: "#EB003C",
      teamColor3: "#FFFFFF",
      starVal: 0
    },
    {
      abbreviation:"GSW",
      franchise:"Golden State Warriors",
      logo_url: "gs_warriors.png",
      winPct:0.618,
      teamColor1: "#04529c",
      teamColor2: "#FFCC33",
      teamColor3: "#FFFFFF",
      starVal: 0
    },
    {
      abbreviation:"HOU",
      franchise:"Houston Rockets",
      logo_url: "hstn_rockets.gif",
      winPct:0.618,
      teamColor1: "#CE1138",
      teamColor2: "#CCCCCC",
      teamColor3: "#000000",
      starVal: 0
    },
    {
      abbreviation:"IND",
      franchise:"Indiana Pacers",
      logo_url: "ind_pacers.gif",
      winPct:0.806,
      teamColor1: "#092c57",
      teamColor2: "#ffc322",
      teamColor3: "#FFFFFF",
      starVal: 0
    },
    {
      abbreviation:"LAC",
      franchise:"Los Angeles Clippers",
      logo_url: "la_clippers.gif",
      winPct:0.647,
      teamColor1: "#EE2944",
      teamColor2: "#146AA2",
      teamColor3: "#FFFFFF",
      starVal: 0
    },
    {
      abbreviation:"LAL",
      franchise:"Los Angeles Lakers",
      logo_url: "lakers.gif",
      winPct:0.406,
      teamColor1: "#4A2583",
      teamColor2: "#F5AF1B",
      teamColor3: "#FFFFFF",
      starVal: 0
    },
    {
      abbreviation:"MEM",
      franchise:"Memphis Grizzlies",
      logo_url: "mphs_grizzlies.gif",
      winPct:0.452,
      teamColor1: "#001F70",
      teamColor2: "#7399C6",
      teamColor3: "#BED4E9",
      starVal: 0
    },
    {
      abbreviation:"MIA",
      franchise:"Miami Heat",
      logo_url: "mia_heat.gif",
      winPct:0.750,
      teamColor1: "#1E3344",
      teamColor2: "#B62630",
      teamColor3: "#FFFFFF",
      starVal: 0
    },
    {
      abbreviation:"MIL",
      franchise:"Milwaukee Bucks",
      logo_url: "mil_bucks.gif",
      winPct:0.219,
      teamColor1: "#003614",
      teamColor2: "#E32636",
      teamColor3: "#C0C0C0",
    
      starVal: 0
    },
    {
      abbreviation:"MIN",
      franchise:"Minnesota Timberwolves",
      logo_url: "minn_timberwolves.gif",
      winPct:0.500,
      teamColor1: "#0F4D92",
      teamColor2: "#8c92ac",
      teamColor3: "#50c878",
      starVal: 0
    },
    {
      abbreviation:"NOP",
      franchise:"New Orleans Pelicans",
      logo_url: "no_pelicans.png",
      winPct:0.462,
      winPct:0.467,
      teamColor1: "#072248",
      teamColor2: "#A1854D",
      teamColor3: "#C72E35",
      starVal: 0
    },
    {
      abbreviation:"NYK",
      franchise:"New York Knicks",
      logo_url: "ny_knicks.gif",
      winPct:0.323,
      teamColor1: "#0953a0",
      teamColor2: "#FF7518",
      teamColor3: "#C0C0C0",
      starVal: 0
    },
    {
      abbreviation:"OKC",
      franchise:"Oklahoma City Thunder",
      logo_url: "ok_thunder.gif",
      winPct:0.781,
      teamColor1: "#007DC3",
      teamColor2: "#F05133",
      teamColor3: "#FDBB30",
      starVal: 0
    },
    {
      abbreviation:"ORL",
      franchise:"Orlando Magic",
      logo_url: "orl_magic.gif",
      winPct:0.313,
      teamColor1: "#0047AB",
      teamColor2: "#000000",
      teamColor3: "#708090",
      starVal: 0
    },
    {
      abbreviation:"PHI",
      franchise:"Philadelphia 76ers",
      logo_url: "phil_76ers.gif",
      winPct:0.344,
      teamColor1: "#D0103A",
      teamColor2: "#0046AD",
      teamColor3: "#FFFFFF",
      starVal: 0
    },
    {
      abbreviation:"PHX",
      franchise:"Phoenix Suns",
      logo_url: "phnx_suns.png",
      winPct:0.613,
      teamColor1: "#FF8800",
      teamColor2: "#423189",
      teamColor3: "#000000",
      starVal: 0
    },
    {
      abbreviation:"POR",
      franchise:"Portland Trail Blazers",
      logo_url: "por_trail_blazers.gif",
      winPct:0.788,
      teamColor1: "#F0163A",
      teamColor2: "#B6BFBF",
      teamColor3: "#000000",
      starVal: 0
    },
    {
      abbreviation:"SAC",
      franchise:"Sacramento Kings",
      logo_url: "sac_kings.gif",
      winPct:0.323,
      teamColor1: "#753BBD",
      teamColor2: "#000000",
      teamColor3: "#8A8D8F",
      starVal: 0
    },
    {
      abbreviation:"SAS",
      franchise:"San Antonio Spurs",
      logo_url: "sa_spurs.gif",
      winPct:0.758,
      teamColor1: "#000000",
      teamColor2: "#BEC8C9",
      teamColor3: "#FFFFFF",
      starVal: 0
    },
    {
      abbreviation:"TOR",
      franchise:"Toronto Raptors",
      logo_url: "tor_raptors.gif",
      winPct:0.500,
      teamColor1: "#B31B1B",
      teamColor2: "#000000",
      teamColor3: "#708090",
      starVal: 0
    },
    {
      abbreviation:"UTA",
      franchise:"Utah Jazz",
      logo_url: "utah_jazz.gif",
      winPct:0.314,
      teamColor1: "#00275D",
      teamColor2: "#FF9100",
      teamColor3: "#0D4006",
      starVal: 0
    },
    {
      abbreviation:"WAS",
      franchise:"Washington Wizards",
      logo_url: "utah_jazz.gif",
      winPct:0.483,
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

    exports.playerStars = function (teamStatsNorm, statWeights) {
      var playerStarObj = {};
      var totalValue = 0;
      var weightedStat;
      var playerStarValue;
      for (var statName in statWeights){
        totalValue += parseFloat(statWeights[statName].weight);
      }
      for (var team in teamStatsNorm){
        playerStarObj[team] = {};
        for (var player in teamStatsNorm[team]){
          weightedStat = 0;
          for (var stat in teamStatsNorm[team][player]){
            weightedStat += teamStatsNorm[team][player][stat] * parseFloat(statWeights[stat].weight);
          }
          playerStarValue = weightedStat/totalValue;
          playerStarObj[team][player] = playerStarValue;
        }
      }
      return playerStarObj;

    };

    exports.nestedSliders = {
      Possession:{
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
    };

    exports.assignNestedSliders = function (statWeights, nestedSliders){
      // console.log("assignNestedSliders: ", statWeights);
      for (var statName in statWeights) {
        switch(statWeights[statName].cat) {
          case "POS"  : 
            nestedSliders.Possession[statName] = statWeights[statName];
            break;
          case "SHT":
            nestedSliders.Shooting[statName] = statWeights[statName];
            break; 
          case "DEF":
            nestedSliders.Defense[statName] = statWeights[statName];
            break;
          case "REB"  : 
            nestedSliders.Rebounding[statName] = statWeights[statName];
            break;
          case "ATH":
            nestedSliders.Athleticism[statName] = statWeights[statName];
            break;
        }
      }
      return nestedSliders;
    };
    

    exports.changeSliders = function(nestedSliders, groupName) {
      var nest = nestedSliders[groupName];
      for (var statName in nest){
        var stat = nest[statName];
        if (statName === "main" || statName === "oldMain"){
          continue;
        }
        stat.weight = parseFloat(stat.weight) + (parseFloat(nest.main) - parseFloat(nest.oldMain));
        if (stat.weight < 0){
          stat.weight = 0;
        }
        if (stat.weight > 10){
          stat.weight = 10;
        }
      }
      nest.oldMain = parseFloat(nest.main);
    };

    return exports;
  }]);

