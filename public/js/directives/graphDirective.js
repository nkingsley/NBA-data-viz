angular.module('mean.chart')
  .directive('lineGraph', function () {
    return {
      restrict: 'E',
      replace: true,
      template: '<div class="graph"</div>',
      
    link: function(scope, element, attrs) {
      var chartEl = d3.select(element[0]);
      chartEl
      .append("svg:svg")
      .attr("width", 700)
      .attr("height", 500)
      .classed("lineGraph", true)

      scope.$watch('graphData', function (newVal, oldVal){ // problem is here: newVal ($scope.graphData) keeps every added player
        debugger;

        chartEl.selectAll('.nv-lineWrap').empty();

        var dataFunc = function (){
          return newVal;
        };
        
        if (newVal.length === 0){
          console.log("Empty!");
          chartEl.selectAll('.path').empty();
        } else if (newVal === oldVal) {
          return;
        }

        nv.addGraph(function() {
          var chart = nv.models.cumulativeLineChart()
            .useInteractiveGuideline(false)
            .rightAlignYAxis(false)
            .margin({left:90})
            .x(function(d) { return d[0]; })
            .y(function(d) { return d[1]; })
            .color(d3.scale.category10().range())
            .average(function(d) { return d.mean/100; })
            .clipVoronoi(true);

          chart.xAxis
              .tickFormat(function(d) {
                  return d3.time.format('%m/%d')(new Date(d))
                });

          chart.yAxis
              .tickFormat(d3.format(',.2f'));
                console.log('submitted to nvd3->',newVal);
          
          d3.select('.lineGraph')
              .datum(dataFunc())
              .transition().duration(500)
              .call(chart);

        //TODO: Figure out a good way to do this automatically
          nv.utils.windowResize(chart.update);

          chart.dispatch.on('stateChange', function(e) { nv.log('New State:', JSON.stringify(e)); });
          return chart;
        });
      }, true);
    }
  }
});