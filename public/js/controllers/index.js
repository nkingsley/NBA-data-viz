angular.module('mean.system').controller('IndexController', ['$scope', '$http', 'Global', function ($scope, $http, Global) {
    $http.get('/teams').success(function(data){
      var maxMinRangeObj = {}; // to normalize
      var timeObj = {}; //total team playing times
      var teamsObj={}; // stats organized by team, player with multipliers


      //following section gets the max/min/range for each stat across the league to calculate the normalized stat
      for (var j in data[0]){
        if(j === "Player" || j === "Position" || j === "Team" || j ==="_id"){
          continue;
        } else {
          maxMinRangeObj[j] = {
            'max': data[0][j]/data[0]['MIN'],
            'min': data[0][j]/data[0]['MIN'],
            'range': 0
          }
          for (var i = 1 ; i < data.length; i++){
            if (data[i][j]/data[i]['MIN'] > maxMinRangeObj[j]['max']){
              maxMinRangeObj[j]['max'] = data[i][j]/data[i]['MIN'];
            }
            if (data[i][j]/data[i]['MIN'] < maxMinRangeObj[j]['min']){
              maxMinRangeObj[j]['min'] = data[i][j]/data[i]['MIN'];
            }
          }
          maxMinRangeObj[j]['range'] = maxMinRangeObj[j]['max']-maxMinRangeObj[j]['min'];

        }
      }
      
      //following section calculates the total amt of time each team has played in minutes for when we need to calc the % time each player played
      for (var i =0; i < data.length; i++){
        team = data[i]['Team'];
        if(team === "TOTAL"){
          continue;
        }
        if(!timeObj[team]){
          timeObj[team] = 0;
        }
        timeObj[team]+=data[i]['MIN'];
      }

      //following section calculates and adds keys for normalized versions of the data to an object organized by team name

      for (var i = 0; i < data.length; i ++){
        //creates each team in teamsObj)
        team = data[i]['Team'];
        if(team === "TOTAL"){
          continue;
        }
        if(!teamsObj[team]){
          teamsObj[team] = {};
        }
        //creates the player within each team
        player = data[i]['Player'];
        var playerStats = data[i];
        for(j in playerStats){
          if(j === "Player" || j === "Position" || j === "Team" || j ==="_id"){
            continue;
          }else{
            //new key name for the normalized value
            newKey = j+"_norm";
            //calculates the % of a teams total time a player played
            var playerPctTime = playerStats['MIN']/timeObj[playerStats['Team']];
            //turns the stat into a per-minute stat
            var perMinStat = playerStats[j]/playerStats['MIN'];
            //Normalizes the per min stat based on the max at value 1, min at value 0, 
            var normalized = 1 - (maxMinRangeObj[j]['max']-(playerStats[j]/playerStats['MIN']))/maxMinRangeObj[j]['range'];
            //sets the stat_norm to the normalized, time-adjusted value
            playerStats[newKey] = playerPctTime * normalized;
          }
        }
        teamsObj[team][player] = playerStats;
      }

      console.log(teamsObj)
     return teamsObj;
    });

  }]);