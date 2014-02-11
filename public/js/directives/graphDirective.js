angular.module('MoneyBaller')
  .directive('lineGraph', function () {
    return {
      restrict: 'E',
      replace: true,
      template: '<div class="graph"></div>',
      scope: {
        options: "=options",
        data: "=data",
        hovered: "&hovered"
      },
      
    link: function(scope, element, attrs) {
      var chartHolder;
      var chartEl = d3.select(element[0]);
      chartEl
      .append("svg:svg")
      .attr("width", scope.options.width)
      .attr("height", scope.options.height)
      .classed("lineGraph", true);

      var update = function (newVal, oldVal){ 
        var dataFunc = function (){
          return newVal;
        };

        if (newVal.length === 0){
          console.log("Empty!");
          chartEl.selectAll('.nv-group').empty();
        } else if (newVal === oldVal) {
          return;
        }

        var mouseMove = function (){
          var curLine = d3.svg.mouse(this);
        };
        var click = function(element){
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
          d3.selectAll('.lineGraph')
              .on("click", click)
              .datum(dataFunc())
              .transition().duration(500)
              .call(chart)
          chart.dispatch.on('stateChange', function(e) { nv.log('New State:', JSON.stringify(e)); });
          return chart;
        });
      };
      scope.$watch('data', update, true);
      scope.$watch('options', function(){
        console.log(scope.options)
        if(scope.options.clear){
          scope.data = [];
          console.log('data is cleared to ',scope.data);
        }
        update(scope.data);
      }, true);

    }
  }
});