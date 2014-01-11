// service delivering stat information for any controller that requires it
angular.module('mean.chart').factory("Stats", ['$q', 'Global',  function ($q, Global) {
 
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
      starVal: 0,
      isCollapsed: true
    },
    {
      abbreviation:"BOS",
      franchise:"Boston Celtics",
      logo_url: "bstn_celtics.gif",
      winPct:0.406,
      teamColor1: "#009E60",
      teamColor2: "#FFFFFF",
      teamColor3: "#000000",
      starVal: 0,
      isCollapsed: true
    },
    {
      abbreviation:"BKN",
      franchise:"Brooklyn Nets",
      logo_url: "bkn_nets.gif",
      winPct:0.344,
      teamColor1: "#000000",
      teamColor2: "#FFFFFF",
      teamColor3: "#000000",
      starVal: 0,
      isCollapsed: true
    },
    {
      abbreviation:"CHA",
      franchise:"Charlotte Bobcats",
      logo_url: "chlt_bobcats.gif",
      winPct:0.412,
      teamColor1: "#002B5C",
      teamColor2: "#5191CD",
      teamColor3: "#F26531",
      starVal: 0,
      isCollapsed: true
    },
    {
      abbreviation:"CHI",
      franchise:"Chicago Bulls",
      logo_url: "chi_bulls.gif",
      winPct:0.419,
      teamColor1: "#D4001F",
      teamColor2: "#000000",
      teamColor3: "#FFFFFF",
      starVal: 0,
      isCollapsed: true
    },
    {
      abbreviation:"CLE",
      franchise:"Cleveland Cavaliers",
      logo_url: "cvld_cavs.gif",
      winPct:0.344,
      teamColor1: "#b3121d",
      teamColor2: "#FFD700",
      teamColor3: "#000080",
      starVal: 0,
      isCollapsed: true
    },
    {
      abbreviation:"DAL",
      franchise:"Dallas Mavericks",
      logo_url: "dls_mavericks.gif",
      winPct:0.594,
      teamColor1: "#0b60ad",
      teamColor2: "#072156",
      teamColor3: "#A9A9A9",
      starVal: 0,
      isCollapsed: true
    },
    {
      abbreviation:"DEN",
      franchise:"Denver Nuggets",
      logo_url: "dvr_nuggets.gif",
      winPct:0.452,
      teamColor1: "#4b90cd",
      teamColor2: "#fdb827",
      teamColor3: "#FFFFFF",
      starVal: 0,
      isCollapsed: true
    },
    {
      abbreviation:"DET",
      franchise:"Detroit Pistons",
      logo_url: "det_pistons.gif",
      winPct:0.424,
      teamColor1: "#00519a",
      teamColor2: "#EB003C",
      teamColor3: "#FFFFFF",
      starVal: 0,
      isCollapsed: true
    },
    {
      abbreviation:"GSW",
      franchise:"Golden State Warriors",
      logo_url: "gs_warriors.png",
      winPct:0.618,
      teamColor1: "#04529c",
      teamColor2: "#FFCC33",
      teamColor3: "#FFFFFF",
      starVal: 0,
      isCollapsed: true
    },
    {
      abbreviation:"HOU",
      franchise:"Houston Rockets",
      logo_url: "hstn_rockets.gif",
      winPct:0.618,
      teamColor1: "#CE1138",
      teamColor2: "#CCCCCC",
      teamColor3: "#000000",
      starVal: 0,
      isCollapsed: true
    },
    {
      abbreviation:"IND",
      franchise:"Indiana Pacers",
      logo_url: "ind_pacers.gif",
      winPct:0.806,
      teamColor1: "#092c57",
      teamColor2: "#ffc322",
      teamColor3: "#FFFFFF",
      starVal: 0,
      isCollapsed: true
    },
    {
      abbreviation:"LAC",
      franchise:"Los Angeles Clippers",
      logo_url: "la_clippers.gif",
      winPct:0.647,
      teamColor1: "#EE2944",
      teamColor2: "#146AA2",
      teamColor3: "#FFFFFF",
      starVal: 0,
      isCollapsed: true
    },
    {
      abbreviation:"LAL",
      franchise:"Los Angeles Lakers",
      logo_url: "lakers.gif",
      winPct:0.406,
      teamColor1: "#4A2583",
      teamColor2: "#F5AF1B",
      teamColor3: "#FFFFFF",
      starVal: 0,
      isCollapsed: true
    },
    {
      abbreviation:"MEM",
      franchise:"Memphis Grizzlies",
      logo_url: "mphs_grizzlies.gif",
      winPct:0.452,
      teamColor1: "#001F70",
      teamColor2: "#7399C6",
      teamColor3: "#BED4E9",
      starVal: 0,
      isCollapsed: true
    },
    {
      abbreviation:"MIA",
      franchise:"Miami Heat",
      logo_url: "mia_heat.gif",
      winPct:0.750,
      teamColor1: "#1E3344",
      teamColor2: "#B62630",
      teamColor3: "#FFFFFF",
      starVal: 0,
      isCollapsed: true
    },
    {
      abbreviation:"MIL",
      franchise:"Milwaukee Bucks",
      logo_url: "mil_bucks.gif",
      winPct:0.219,
      teamColor1: "#003614",
      teamColor2: "#E32636",
      teamColor3: "#C0C0C0",
    
      starVal: 0,
      isCollapsed: true
    },
    {
      abbreviation:"MIN",
      franchise:"Minnesota Timberwolves",
      logo_url: "minn_timberwolves.gif",
      winPct:0.500,
      teamColor1: "#0F4D92",
      teamColor2: "#8c92ac",
      teamColor3: "#50c878",
      starVal: 0,
      isCollapsed: true
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
      starVal: 0,
      isCollapsed: true
    },
    {
      abbreviation:"NYK",
      franchise:"New York Knicks",
      logo_url: "ny_knicks.gif",
      winPct:0.323,
      teamColor1: "#0953a0",
      teamColor2: "#FF7518",
      teamColor3: "#C0C0C0",
      starVal: 0,
      isCollapsed: true
    },
    {
      abbreviation:"OKC",
      franchise:"Oklahoma City Thunder",
      logo_url: "ok_thunder.gif",
      winPct:0.781,
      teamColor1: "#007DC3",
      teamColor2: "#F05133",
      teamColor3: "#FDBB30",
      starVal: 0,
      isCollapsed: true
    },
    {
      abbreviation:"ORL",
      franchise:"Orlando Magic",
      logo_url: "orl_magic.gif",
      winPct:0.313,
      teamColor1: "#0047AB",
      teamColor2: "#000000",
      teamColor3: "#708090",
      starVal: 0,
      isCollapsed: true
    },
    {
      abbreviation:"PHI",
      franchise:"Philadelphia 76ers",
      logo_url: "phil_76ers.gif",
      winPct:0.344,
      teamColor1: "#D0103A",
      teamColor2: "#0046AD",
      teamColor3: "#FFFFFF",
      starVal: 0,
      isCollapsed: true
    },
    {
      abbreviation:"PHX",
      franchise:"Phoenix Suns",
      logo_url: "phnx_suns.png",
      winPct:0.613,
      teamColor1: "#FF8800",
      teamColor2: "#423189",
      teamColor3: "#000000",
      starVal: 0,
      isCollapsed: true
    },
    {
      abbreviation:"POR",
      franchise:"Portland Trail Blazers",
      logo_url: "por_trail_blazers.gif",
      winPct:0.788,
      teamColor1: "#F0163A",
      teamColor2: "#B6BFBF",
      teamColor3: "#000000",
      starVal: 0,
      isCollapsed: true
    },
    {
      abbreviation:"SAC",
      franchise:"Sacramento Kings",
      logo_url: "sac_kings.gif",
      winPct:0.323,
      teamColor1: "#753BBD",
      teamColor2: "#000000",
      teamColor3: "#8A8D8F",
      starVal: 0,
      isCollapsed: true
    },
    {
      abbreviation:"SAS",
      franchise:"San Antonio Spurs",
      logo_url: "sa_spurs.gif",
      winPct:0.758,
      teamColor1: "#000000",
      teamColor2: "#BEC8C9",
      teamColor3: "#FFFFFF",
      starVal: 0,
      isCollapsed: true
    },
    {
      abbreviation:"TOR",
      franchise:"Toronto Raptors",
      logo_url: "tor_raptors.gif",
      winPct:0.500,
      teamColor1: "#B31B1B",
      teamColor2: "#000000",
      teamColor3: "#708090",
      starVal: 0,
      isCollapsed: true
    },
    {
      abbreviation:"UTA",
      franchise:"Utah Jazz",
      logo_url: "utah_jazz.gif",
      winPct:0.314,
      teamColor1: "#00275D",
      teamColor2: "#FF9100",
      teamColor3: "#0D4006",
      starVal: 0,
      isCollapsed: true
    },
    {
      abbreviation:"WAS",
      franchise:"Washington Wizards",
      logo_url: "utah_jazz.gif",
      winPct:0.483,
      teamColor1: "#C60C30",
      teamColor2: "#FFFFFF",
      teamColor3: "#002244",
      starVal: 0,
      isCollapsed: true
    }];

    exports.stats = {};
  

    exports.calculateAllTeamStarVals = function (teamStatsNorm, teams, statWeights, statsByTeam){
      var cumulativeTeamsStats = exports.cumulativeTeamsStats(statsByTeam);
      var teamsNormStats = exports.getNormalizedStats(cumulativeTeamsStats);
      for (var i = 0 ; i < teams.length ; i++){
        teams[i].starVal = exports.calculateTeamStar(teams[i].abbreviation, teamsNormStats, statWeights);
      }
    };

    exports.cumulativeTeamsStats = function(statsByTeam){
      var cumeTeamsStatsObj = {}
      for (team in statsByTeam){
        cumeTeamsStatsObj[team] = exports.teamCumeStats(statsByTeam[team])
      }
      return cumeTeamsStatsObj
    }

    exports.teamCumeStats = function(team) {
      var teamCumeStatsObj = {};
      for (stat in team){
        teamCumeStatsObj[stat] = exports.statCume(team[stat]);
      }
      return teamCumeStatsObj
    }

    exports.statCume = function(stat){
      statTotal = 0
      for (player in stat) {
        statTotal += stat[player];
      }
      return statTotal
    }

    exports.getNormalizedStats = function(stats){
      var normalized = {}
      for (entity in stats){
        normalized[entity] = {}
        for (stat in stats[entity]){
          normalized[entity][stat] = exports.normalize(stat, stats[entity], stats)

        }
      }
      return normalized
    };

    exports.normalize = function(stat, statsToNorm, statsToMaxMin){
      var maxMinRange = exports.getMaxMinRange(statsToMaxMin, stat)
      var normedStat
      normedStat = 1-(maxMinRange.max - (statsToNorm[stat]))/maxMinRange.range;
      return normedStat;
    };

    exports.getMaxMinRange = function(obj, stat){
      for (var entity in obj){
        if(!statMaxMinRange){
          var statMaxMinRange = {
            max: obj[entity][stat],
            min: obj[entity][stat],
            range: 0
          }
        }
        if(obj[entity][stat] > statMaxMinRange.max){
          statMaxMinRange.max = obj[entity][stat];
        }
        if(obj[entity][stat] < statMaxMinRange.min){
          statMaxMinRange.min = obj[entity][stat];
        }
      }
      statMaxMinRange.range = statMaxMinRange.max - statMaxMinRange.min;
      return statMaxMinRange;
    };

    exports.calculateTeamStar = function (team, normStats, statWeights) {

      var star = 0
      var weightedStats = exports.weight(normStats[team], statWeights)
      var totalWeightValue = exports.calculateTotalStatWeights(statWeights)
      var totalStat = 0
      for (var stat in weightedStats){
        if(stat === 'MIN' || stat === 'GP'){
          continue;
        }
        totalStat += weightedStats[stat]
      }
      star = totalStat/totalWeightValue
      return star;
    };

    exports.weight = function(statsToWeight, statWeights){
      var weightedStats = {}
      var totalValue = exports.calculateTotalStatWeights(statWeights)
      for (var stat in statsToWeight){
        weightedStats[stat] = parseFloat(statWeights[stat].weight) * statsToWeight[stat];
      }
      return weightedStats
    };
    
    exports.calculateTotalStatWeights = function(statWeights){
      var totalValue = 0
      for (var statName in statWeights){
        totalValue+=parseFloat(statWeights[statName].weight)
      }
      return totalValue
    }


    exports.ranks = function(statsToRank){
      var ranked = [];
      for (var stat in statsToRank){
        if(ranked.length === 0){
          ranked.push({statName: stat, stat: statsToRank[stat]});
        } else {
          for (var i = 0 ; i < ranked.length; i++){
            if(statsToRank[stat] > ranked[i].stat){
              ranked.splice(i, 0, {'statName': stat, 'stat': statsToRank[stat]});
            }
            if(i === ranked.length-1 && statsToRank[stat] < ranked[i].stat){
              statsToRank.push({'statName': stat, 'stat': statsToRank[stat]});
            }
          }
        }
      }
    };

    
    exports.getTeamCumeTotals = function(statsByTeam, statWeights) {
      var cumulativeTeamsStats = exports.cumulativeTeamsStats(statsByTeam)
      var teamCumeTotals = {}
      for (var team in cumulativeTeamsStats){
        teamCumeTotals[team] = 0
        for(var stats in cumulativeTeamsStats[team]){
          
          teamCumeTotals[team]+=(Math.abs(cumulativeTeamsStats[team][stats]))*(statWeights[stats].weight)
        }
      }
      return teamCumeTotals
    }

    exports.playerWeightedStats = {};

    exports.calculatePlayerWeightedStats = function (teamStatsNorm, statWeights, statsByTeam, openTeam) {
      var totalValue = 0;
      var weightedStat;
      var playerCume;
      var teamTotals = exports.getTeamCumeTotals(statsByTeam, statWeights)

      if (!openTeam) return;
      
      var team = teamStatsNorm[openTeam];
      exports.playerWeightedStats[openTeam] = {};
      for (var player in team){
        var topFiveStats = [];
        for (var stat in team[player]){
          weightedStat = team[player][stat]*statWeights[stat].weight;
          if(topFiveStats.length === 0){
            topFiveStats.push({'statName': stat, 'stat': 100*weightedStat/teamTotals[openTeam]});
          } else {
            for (var i = 0 ; i < topFiveStats.length; i++){
              debugger
              if(Math.abs(100*weightedStat/teamTotals[openTeam]) > Math.abs(topFiveStats[i].stat)){
                topFiveStats.splice(i, 0, {'statName': stat, 'stat': 100*weightedStat/teamTotals[openTeam]});
                if(topFiveStats.length > 5){
                  topFiveStats.pop();
                }
                break;
              }  
              if(i === topFiveStats.length-1 && topFiveStats.length < 5){
                topFiveStats.push({'statName': stat, 'stat': 100*weightedStat/teamTotals[openTeam]})
                break;
              }
            }
          }
        }
      exports.playerWeightedStats[openTeam][player] = topFiveStats;;
      }

      debugger
      console.log(exports.playerWeightedStats)
    };

    exports.nestedSliders = {
      Possession:{
        main:5,
        oldMain:5
      },
      Shooting:{
        main:5,
        oldMain:5
      },
      Defense:{
        main:5,
        oldMain:5
      },
      Rebounding:{
        main:5,
        oldMain:5
      },
      Athleticism:{
        main:5,
        oldMain:5
      },
    };

    exports.assignNestedSliders = function (statWeights, nestedSliders){
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

