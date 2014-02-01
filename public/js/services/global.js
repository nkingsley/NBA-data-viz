//Global service for global variables
angular.module('mean.chart').factory("Global", ['$q', '$http', function($q, $http) {
  var _this = this;
  var statsObj = {};
  var cats = {};
  var teams = [
  {
    abbreviation:"ATL",
    franchise:"Atlanta Hawks",
    logo_url: "atl_hawks.gif",
    winPct: 0,
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
    winPct: 0,
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
    winPct: 0,
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
    winPct: 0,
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
    winPct: 0,
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
    winPct: 0,
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
    winPct: 0,
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
    winPct: 0,
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
    winPct: 0,
    teamColor1: "#00519a",
    teamColor2: "#EB003C",
    teamColor3: "#FFFFFF",
    starVal: 0,
    isCollapsed: true
  },
  {
    abbreviation:"GSW",
    franchise:"Golden State Warriors",
    logo_url: "gs_warriors.gif",
    winPct: 0,
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
    winPct: 0,
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
    winPct: 0,
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
    winPct: 0,
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
    winPct: 0,
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
    winPct: 0,
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
    winPct: 0,
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
    winPct: 0,
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
    winPct: 0,
    teamColor1: "#0F4D92",
    teamColor2: "#8c92ac",
    teamColor3: "#50c878",
    starVal: 0,
    isCollapsed: true
  },
  {
    abbreviation:"NOP",
    franchise:"New Orleans Pelicans",
    logo_url: "no_pelicans.gif",
    winPct: 0,
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
    winPct: 0,
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
    winPct: 0,
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
    winPct: 0,
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
    winPct: 0,
    teamColor1: "#D0103A",
    teamColor2: "#0046AD",
    teamColor3: "#FFFFFF",
    starVal: 0,
    isCollapsed: true
  },
  {
    abbreviation:"PHX",
    franchise:"Phoenix Suns",
    logo_url: "phnx_suns.gif",
    winPct: 0,
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
    winPct: 0,
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
    winPct: 0,
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
    winPct: 0,
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
    winPct: 0,
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
    winPct: 0,
    teamColor1: "#00275D",
    teamColor2: "#FF9100",
    teamColor3: "#0D4006",
    starVal: 0,
    isCollapsed: true
  },
  {
    abbreviation:"WAS",
    franchise:"Washington Wizards",
    logo_url: "wash_wizards.gif",
    winPct: 0,
    teamColor1: "#C60C30",
    teamColor2: "#FFFFFF",
    teamColor3: "#002244",
    starVal: 0,
    isCollapsed: true
  }];
  _this.init = function(lastTen){
    var d = $q.defer();
    if (lastTen){
      var route = '/init/lt';
    } else{
      var route = '/init';
    }
    $http.get(route).success(function(data){
      var teamStats = data.teams;
      var winPct = data.winPct;
      cats = data.cat;
      for (team in teamStats){
        statsObj[team] = {};
        for (stat in teamStats[team]){
          if(stat === "NA_MIN_NEU"){
            continue;
          } else {
            statName = stat;
            statsObj[team][statName] = teamStats[team][stat];
          }
        }
      }
      for (var i = 0; i < teams.length; i++){
        var teamName = teams[i].franchise;
        teams[i].winPct = winPct[teamName].winPct;
      }
      d.resolve({teamStats: statsObj, cats: cats, teams: teams, presets:data.presets});
    });
    return d.promise;
  };
  var stats = _this.init();
  _this._data = {
      user: window.user,
      authenticated: !! window.user,
      stats: stats,
      init: _this.init
  };
  return _this._data;
}]);
