angular.module('mean.system').controller('IndexController', ['$scope', '$http', 'Global', function ($scope, $http, Global) {
    $http.get('/teams').success(function(data){
      var teamsObj = {}
      var totals = {}
      var newPlayerData = []
      var player
      var team
      var timeObj = {}
      console.log(data)
      for (var j in data[0]){
        if(j === "Player" || j === "Position" || j === "Team" || j ==="_id"){
          continue
        }else{
          totals[j] = 0;
          for (var i = 0; i < data.length; i ++){
            if(data[i]["Team"] === "TOTAL"){
              continue
            }
            totals[j] += data[i][j]
          }
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
            newKey = j+"_norm"
            playerStats[newKey] = ((playerStats[j]/totals[j])/(playerStats["MIN"]/totals["MIN"]))*(playerStats["MIN"]/timeObj[playerStats["Team"]]);
          }
        }
        teamsObj[team][player] = playerStats
      }

    console.log(teamsObj);
    // console.log(totals)
    return teamsObj
    });
  }]);