angular.module('MoneyBaller')
  .directive('scatterPlot', function(){
  var chart = d3.custom.scatterPlot();
  return {
    restrict: 'EA',
    replace: true,
    template: '<div class="chart"></div>',
    scope:{
      options: '=options',
      data: '=data',
      hovered: '&hovered'
    },
    link: function(scope, element, attrs) {
      var chartEl = d3.select(element[0]);
      chart.height(scope.options.height);
      chart.width(scope.options.width);
      chart.on('customHover', function(d, i){
        scope.hovered({args:d});
      });

      scope.$watch('data', function (newVal, oldVal) {
        if (newVal) {
          chartEl.datum(newVal).call(chart);
        }
      }, true);
      scope.$watch('options', function (newVal, oldVal){
        chart.height(newVal.height);
        chart.width(newVal.width);
        if (newVal !== oldVal){
          chartEl.call(chart);
        }
      }, true);
    }
  };
});