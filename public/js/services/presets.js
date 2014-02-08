angular.module('MoneyBaller').factory("Presets", ['$http', 'Global', function($http, Global) {
  var exports = {
    userPresets: [],
    sendScore: function(weights){
      var name = prompt("Name these Slider Presets");
      if (!name){return;}
      $scope.updateRho();
      delete weights._id;
      delete weights.created;
      weights.score = $scope.rhoVal;
      weights.presetName = name;
      weights.user = Global.user._id;
      $http.post('/highscore',weights).success(function(data){
        if (exports.userPresets){
          exports.userPresets.push(weights);
        }
      });
    }
  }
  if(Global.user){
    $http.get('/presets').success(function(data){
      exports.userPresets = data;
    });
  }
  return exports;
}]);