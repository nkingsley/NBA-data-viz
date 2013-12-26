angular.module('mean.system').controller('IndexController', ['$scope', '$http', 'Global', function ($scope, $http, Global) {
    $http.get('/teams').success(function(data){
      console.log(data);
    });




  }]);
