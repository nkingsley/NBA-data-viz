angular.module('mean.system').controller('IndexController', ['$scope', '$http', 'Global', function ($scope, $http, Global) {
    $http.get('/teams').success(function(data){
      var max
      var min
      var maxMinRangeObj = {};
      var timeObj = {} //total team playing times
      var teamsObj={} // stats organized by team, player with multipliers
      for (var j in data[0]){
        if(j === "Player" || j === "Position" || j === "Team" || j ==="_id"){
          continue;
        }else{
          maxMinRangeObj[j] = {
            'max': data[0][j]/data[0]['MIN'],
            'min': data[0][j]/data[0]['MIN'],
            'range': 0
          }
          for (var i = 1 ; i < data.length; i++){
            if (data[i][j]/data[i]['MIN'] > maxMinRangeObj[j]['max']){
              max = data[i][j]/data[i]['MIN'];
              maxMinRangeObj[j]['max'] = max;
            }
            if (data[i][j]/data[i]['MIN'] < maxMinRangeObj[j]['min']){
              min = data[i][j]/data[i]['MIN'];
              maxMinRangeObj[j]['min'] = min;
            }
          }
          debugger
          maxMinRangeObj[j]['range'] = maxMinRangeObj[j]['max']-maxMinRangeObj[j]['min'];

        }
      }
      
      for (var i =0; i < data.length; i++){
        team = data[i]['Team'];
        if(team === "TOTAL"){
          continue
        }
        if(!timeObj[team]){
          timeObj[team] = 0
        }
        timeObj[team]+=data[i]['MIN']
      }

      for (var i = 0; i < data.length; i ++){
        team = data[i]['Team'];
        if(team === "TOTAL"){
          continue
        }
        if(!teamsObj[team]){
          teamsObj[team] = {}
        }
        player = data[i]['Player'];
        var playerStats = data[i];
        for(j in playerStats){
          if(j === "Player" || j === "Position" || j === "Team" || j ==="_id"){
            continue
          }else{
            newKey = j+"_norm";
            debugger
            playerStats[newKey] = (playerStats['MIN']/timeObj[playerStats['Team']])*(1-((maxMinRangeObj[j]['max']-(playerStats[j]/playerStats['MIN']))/maxMinRangeObj[j]['range']));
          }
        }
        teamsObj[team][player] = playerStats;
        console.log(teamsObj)
      }



    });

  }]);
    //   var teamsObj = {} //obj of teams
    //   var totals = {} //league totals
    //   var newPlayerData = [] //normalized player data
    //   var player
    //   var team
    //   
    //   console.log(data)
    //   // for (var j in data[0]){
    //   //   if(j === "Player" || j === "Position" || j === "Team" || j ==="_id"){
    //   //     continue
    //   //   }else{
    //   //     totals[j] = 0;
    //   //     for (var i = 0; i < data.length; i ++){
    //   //       if(data[i]["Team"] === "TOTAL"){
    //   //         continue
    //   //       }
    //   //       totals[j] += data[i][j]
    //   //     }
    //   //   }
    //   // }
    //   for (var i =0; i < data.length; i++){
    //     team = data[i]['Team'];
    //     if(team === "TOTAL"){
    //       continue
    //     }
    //     if(!timeObj[team]){
    //       timeObj[team] = 0
    //     }
    //     timeObj[team]+=data[i]['MIN']
    //   }

    //   for (var i = 0; i < data.length; i ++){
    //     team = data[i]['Team'];
    //     if(team === "TOTAL"){
    //       continue
    //     }
    //     if(!teamsObj[team]){
    //       teamsObj[team] = {}
    //     }
    //     player = data[i]['Player'];
    //     var playerStats = data[i];
    //     for(j in playerStats){
    //       if(j === "Player" || j === "Position" || j === "Team" || j ==="_id"){
    //         continue
    //       }else{
    //         newKey = j+"_norm"
    //         playerStats[newKey] = ((playerStats[j]/totals[j])/(playerStats["MIN"]/totals["MIN"]))*(playerStats["MIN"]/timeObj[playerStats["Team"]]);
    //       }
    //     }
    //     teamsObj[team][player] = playerStats
    //   }

    // console.log(teamsObj);
    // // console.log(totals)
    // return teamsObj
    // });