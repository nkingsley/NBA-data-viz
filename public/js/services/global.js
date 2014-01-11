//Global service for global variables
angular.module('mean.chart').factory("Global", ['$q', '$http', function($q, $http) {
  var _this = this;
  var statsObj = {};
  var d = $q.defer();

  $http.get('/teams').success(function(data){
    var team, player, minutes;
    statsObj.maxMinRangeObj = {}; // to normalize
    statsObj.timeObj = {}; //total team playing times
    statsObj.teamsObj = {}; // stats organized by team, player, stat
    statsObj.teamsObjNorm = {}; //stats organized by team, player normalized by time played
    statsObj.normStatsByStat = {}; //stats organized by stat, then team then player
    statsObj.normStatsByTeam = {}; //stats organized by team, then stat then player


    //following section gets the max/min/range for each stat across the league to calculate the normalized stat
    for (var j in data[0]){
      if(j === "Player" || j === "Position" || j === "Team" || j ==="_id" || j === "NA_MIN_Total_NEU" || j === "NA_GP_Total_NEU"){
        continue;
      } else {
        statName = j.slice(4, -4).replace(/_/g , ' ');
        statsObj.maxMinRangeObj[statName] = {
          'imp': j.slice(-4).replace(/_/g , ''),
          'cat': j.slice(0, 4).replace(/_/g , ''),
          'max': data[0][j]/data[0].NA_MIN_Total_NEU,
          'min': data[0][j]/data[0].NA_MIN_Total_NEU,
          'range': 0
        };
        statsObj.normStatsByStat[statName] = {};
        for (var i = 1 ; i < data.length; i++){
          minutes = data[i].NA_MIN_Total_NEU;
          if(!statsObj.normStatsByStat[statName][data[i].Team]){
            statsObj.normStatsByStat[statName][data[i].Team] = {};
          }

          if (data[i][j]/minutes > statsObj.maxMinRangeObj[statName].max){
            statsObj.maxMinRangeObj[statName].max = data[i][j]/minutes;
          }
          if (data[i][j]/minutes < statsObj.maxMinRangeObj[statName].min){
            statsObj.maxMinRangeObj[statName].min = data[i][j]/minutes;
          }
        }
        statsObj.maxMinRangeObj[statName].range = statsObj.maxMinRangeObj[statName].max-statsObj.maxMinRangeObj[statName].min;

      }
    }
  
    //following section calculates the total amt of time each team has played in
    // minutes for when we need to calc the % time each player played
    for (var i = 0; i < data.length; i++){
      minutes = data[i].NA_MIN_Total_NEU;
      team = data[i].Team;
      if(!statsObj.timeObj[team]){
        statsObj.timeObj[team] = 0;
      }
      statsObj.timeObj[team]+=minutes;
    }

    //following section calculates and adds keys for normalized versions of the data to an object organized by team name

    for (var i = 0; i < data.length; i++){
      //creates each team in statsObj.teamsObj)
      team = data[i].Team;
      if(!statsObj.teamsObj[team]){
        statsObj.teamsObj[team] = {};
      }
      if(!statsObj.teamsObjNorm[team]){
        statsObj.teamsObjNorm[team] = {};
      }
      if(!statsObj.normStatsByTeam[team]){
        statsObj.normStatsByTeam[team] = {};
      }
      if(!statsObj.normStatsByStat[statName][team]){
        statsObj.normStatsByStat[statName][team] = {};
      }
      //creates the player within each team
      player = data[i].Player;
      minutes = data[i].NA_MIN_Total_NEU;
      var playerStatsObj = data[i];
      var playerStatsNorm = {};
      var playerStats = {};
      for(j in playerStatsObj){
        if(j === "Player" || j === "Position" || j === "Team" || j ==="_id" || j === "NA_MIN_Total_NEU" || j === "NA_GP_Total_NEU"){
          continue;
        }else{
          //new key name for the normalized value
          var statName = j.slice(4, -4).replace(/_/g, ' ');
          var newKey = statName.replace(/_/g , ' ');
          if(!statsObj.normStatsByTeam[team][newKey]){
            statsObj.normStatsByTeam[team][newKey] = {};
          }
          //calculates the % of a teams total time a player played
          var playerPctTime = minutes/statsObj.timeObj[playerStatsObj.Team];
          //turns the stat into a per-minute stat
          var perMinStat = playerStatsObj[j]/minutes;
          var normalized = null;
          //Normalizes the per min stat based on the max at value 1, min at value 0, or max at -1, min at 0 if a neg stat, 
          if(statsObj.maxMinRangeObj[statName].imp === "POS"){
            normalized = 1 - ((statsObj.maxMinRangeObj[statName].max-(perMinStat))/statsObj.maxMinRangeObj[statName].range);
          } else {
            normalized = -1*(1 - ((statsObj.maxMinRangeObj[statName].max-(perMinStat))/statsObj.maxMinRangeObj[statName].range));
          }
          //sets the stat_norm to the normalized, time-adjusted value
          if(j !== 'NA_MIN_Total_NEU'){
            playerStatsNorm[newKey] = playerPctTime * normalized;
            playerStats[newKey] = playerStatsObj[j];
            statsObj.normStatsByStat[statName][team][player] = playerPctTime * normalized;
            statsObj.normStatsByTeam[team][newKey][player] = playerPctTime * normalized;
          }
        }
      }
      statsObj.teamsObjNorm[team][player] = playerStatsNorm;
      statsObj.teamsObj[team][player] = playerStats;
    }
    d.resolve({teams: statsObj.teamsObj, teamsNorm: statsObj.teamsObjNorm, statsInfo: statsObj.maxMinRangeObj, statsByStats: statsObj.normStatsByStat, statsByTeam: statsObj.normStatsByTeam});
  });




  _this._data = {
      user: window.user,
      authenticated: !! window.user,
      stats: d.promise
  };

  return _this._data;
}]);
