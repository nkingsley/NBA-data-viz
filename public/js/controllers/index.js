angular.module('mean.system').controller('IndexController', ['$scope', '$http', 'Global', function ($scope, $http, Global) {
    $http.get('/teams').success(function(data){
      var teamsObj = {}
      var totals = {}
      var player
      var team
      console.log(data)
      for (var j in data[0]){
        if(j === "Player" || j === "Position" || j === "Team" || j ==="_id"){
          continue
        }else{
          totals[j] = 0;
          for (var i = 0; i < data.length; i ++){
            totals[j] += data[i][j]
          }
        }
      }
      // for (var i = 0; i < data.length; i ++){
      //   team = data[i]['Team'];
      //   if(!teamsObj[team]){
      //     teamsObj[team] = {}
      //   }
      //   player = data[i]['Player'];
      //   var playerStats = data[i];
      //   teamsObj[team][player] = playerStats
      // }

    console.log(totals);
    return teamsObj
    });
  }]);