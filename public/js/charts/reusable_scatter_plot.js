// d3.custom = {};

d3.custom.scatterPlot = function module() {
  var margin = {top: 20, right: 20, bottom: 30, left: 40},
      width = 700,
      height = 500,
      ease = 'cubic-in-out';  // from reusable chart
  var svg, duration = 500;  // from resusable_chart

  var dispatch = d3.dispatch('customHover');
  function exports(_selection) {
    _selection.each(function(_data) {

      var chartW = width - margin.left - margin.right,
        chartH = height - margin.top - margin.bottom;
      
      var x = d3.scale.linear()
        .domain(d3.extent(_data, function(d) { return d.sepalWidth; })).nice()
        .range([0, chartW]);

      var y = d3.scale.linear()
        .domain(d3.extent(_data, function(d) { return d.sepalLength; })).nice()
        .range([chartH, 0]);

      var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom")
        .tickFormat(d3.format("0.3r"));

      var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .tickFormat(d3.format("0.3r"));

      var color = d3.scale.category10();

      if(!svg) {
        svg = d3.select(this)
          .append('svg')
          .classed('chart', true);
        var container = svg.append('g').classed('container-group', true);
        console.log("svg", svg);
        console.log("container", container);
        container.append('g').classed('chart-group', true);
        container
          .append('g')
          .classed('x-axis-group axis', true)
          .append("text")
          .attr("class", "label")
          .attr("x", width - 60)
          .attr("y", -6)
          .style("text-anchor", "end")
          .text("Star Value");

        container
          .append('g')
          .classed('y-axis-group axis', true)
          .append("text")
          .attr("class", "label")
          .attr("transform", "rotate(-90)")
          .attr("y", 6)
          .attr("dy", ".71em")
          .style("text-anchor", "end")
          .text("Wins/Games Played");

      }

      svg.transition().duration(duration).attr({width: width, height: height});
      svg.select('.container-group')
        .attr({transform: 'translate(' + margin.left + ',' + margin.top + ')'});

      svg.select('.x-axis-group.axis')
        .transition()
        .duration(duration)
        .ease(ease)
        .attr({transform: 'translate(0,' + (chartH) + ')'})
        .call(xAxis)
        
      var yAxisSel = svg.select('.y-axis-group.axis')
        .transition()
        .duration(duration)
        .ease(ease)
        .call(yAxis);

      var dots = svg.select('.chart-group')
        .selectAll('.dot')
        .data(_data);

      dots.enter().append("circle")
          .classed('dot', true)
          .attr("r", 6)
          .attr("cx", function(d) { return x(d.sepalWidth); })
          .attr("cy", function(d) { return y(d.sepalLength); })
          .style("fill", function(d) { return color(d.species); });

      // var legend = svg.selectAll(".legend")
      //     .data(color.domain())
      //   .enter().append("g")
      //     .attr("class", "legend")
      //     .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

      // legend.append("rect")
      //     .attr("x", width - 18)
      //     .attr("width", 18)
      //     .attr("height", 18)
      //     .style("fill", color);

      // legend.append("text")
      //     .attr("x", width - 24)
      //     .attr("y", 9)
      //     .attr("dy", ".35em")
      //     .style("text-anchor", "end")
      //     .text(function(d) { return d; });
  });
}
// I think these are the options based into the directive via the
// $scope.options object
exports.width = function(_x) {
  if (!arguments.length) return width;
  width = parseInt(_x);
  return this;
};
exports.height = function(_x) {
  if (!arguments.length) return height;
  height = parseInt(_x);
  duration = 0;
  return this;
};
exports.gap = function(_x) {
  if (!arguments.length) return gap;
  gap = _x;
  return this;
};
exports.ease = function(_x) {
  if (!arguments.length) return ease;
  ease = _x;
  return this;
};
d3.rebind(exports, dispatch, 'on');
  return exports;
};

