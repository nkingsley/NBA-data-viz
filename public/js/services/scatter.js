angular.module('MoneyBaller').factory("Scatter", ['Sliders',  function (Sliders) {
  var exports = {
    options: Sliders.slidersCollapsed ? {width: 900, height: 600} : {width: 550, height: 450},
    toggleChart: function(n,o){
      if (n === true){
        exports.options.width = 900;
        exports.options.height =  600;
      } else{
        exports.options.width = 550;
        exports.options.height =  450;
      }
    }
  }
  return exports;
}]);