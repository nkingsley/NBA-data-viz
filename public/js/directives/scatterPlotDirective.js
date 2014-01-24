angular.module('mean.chart')
  .directive('scatterPlot', function(){
  var chart = d3.custom.scatterPlot();
  return {
    restrict: 'E',
    replace: true,
    template: '<div class="chart"></div>',
    scope:{
      height: '=height',
      width: '=width',
      data: '=data',
      hovered: '&hovered'
    },
    link: function(scope, element, attrs) {
      var chartEl = d3.select(element[0]);
      chart.height(scope.height);
      chart.width(scope.width);
      chart.on('customHover', function(d, i){
        scope.hovered({args:d});
      });

      scope.$watch('data', function (newVal, oldVal) {
        if (newVal) {
          chartEl.datum(newVal).call(chart);
        }
      }, true);
    }
  };
});