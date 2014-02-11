angular.module('MoneyBaller')
  .directive('lineGraph', function () {
    return {
      restrict: 'E',
      replace: true,
      template: '<div class="graph"</div>',
      scope: {
        options: "=options",
        data: "=data",
        hovered: "&hovered"
      },
      
    link: function(scope, element, attrs) {
      var chartEl = d3.select(element[0]);
      chartEl
      .append("svg:svg")
      .attr("width", scope.options.width)
      .attr("height", scope.options.height)
      .classed("lineGraph", true)

      scope.$watch('data', function (newVal, oldVal){ // problem is here: newVal ($scope.graphData) keeps every added player
        // chartEl.selectAll('.lineGraph').empty();

        var dataFunc = function (){
          return newVal;
        };
        // d3.select('.lineGraph').selectAll('.nv-group').empty();
        // d3.select('.lineGraph').selectAll('path').exit().remove();



        if (newVal.length === 0){
          console.log("Empty!");
          chartEl.selectAll('.nv-group').empty();
        } else if (newVal === oldVal) {
          return;
        }

        var mouseMove = function (){
          var curLine = d3.svg.mouse(this);
          console.log(curLine);

        };
        var click = function(element){
            console.log(element);
          };
        nv.addGraph(function() {
          var chart = nv.models.lineChart()
            .rightAlignYAxis(false)
            .margin({left:90})
            .x(function(d) { return d[0]; })
            .y(function(d) { return d[1]; })
            .color(d3.scale.category10().range())



          chart.xAxis
              .tickFormat(function(d) {
                  return d3.time.format('%m/%d')(new Date(d))
                });

          chart.yAxis
              .tickFormat(d3.format(',.2f'))
              .axisLabel('Score')
                console.log('submitted to nvd3->',newVal);

          d3.selectAll('.lineGraph')
              .on("click", click)
              .datum(dataFunc())
              .transition().duration(500)
              .call(chart)

        //TODO: Figure out a good way to do this automatically
          nv.utils.windowResize(chart.update);


          chart.dispatch.on('stateChange', function(e) { nv.log('New State:', JSON.stringify(e)); });
          return chart;
        });
      }, true);
    }
  }
});