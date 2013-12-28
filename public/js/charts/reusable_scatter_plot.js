// d3.custom = {};

d3.custom.scatterPlot = function module() {
  var margin = {top: 40, right: 45, bottom: 40, left: 75},
      width = 720,
      height = 500,
      ease = 'cubic-in-out';  // from reusable chart
  var svg, duration = 500;  // from resusable_chart

  var dispatch = d3.dispatch('customHover');
  function exports(_selection) {
    _selection.each(function(_data) {

      var chartW = width - margin.left - margin.right,
        chartH = height - margin.top - margin.bottom;
      
      var x = d3.scale.linear()
        .domain([25000000, 45000000])
        .range([0, chartW]);

      var y = d3.scale.linear()
        .domain([0, 1])
        .range([chartH, 0]);

      var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom")
        .tickFormat(d3.format("0.3r"));

      var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .tickFormat(d3.format("0.3r"));

      var color = d3.scale.category20();

      if(!svg) {
        svg = d3.select(this)
          .append('svg')
          .classed('chart', true);
        var container = svg.append('g').classed('container-group', true);
        container.append('g').classed('chart-group', true);
        container
          .append('g')
          .classed('x-axis-group axis', true)
          .append("text")
          .attr("class", "label")
          .attr("x", width / 2 - 30)
          .attr("y", 40)
          .style("text-anchor", "end")
          .text("Star Value");

        container
          .append('g')
          .classed('y-axis-group axis', true)
          .append("text")
          .attr("class", "label")
          .attr("transform", "rotate(-90)")
          .attr("x", -155)
          .attr("y", -60)
          .attr("dy", ".71em")
          .style("text-anchor", "end")
          .text("Wins/Games Played");

      }

      svg.transition().duration(duration).attr({width: width, height: height});
      svg.select('.container-group')
        .attr({transform: 'translate(' + margin.left + ',' + margin.top + ')'});

      svg.select('.x-axis-group.axis')
        .attr({transform: 'translate(0,' + chartH + ')'})
        .transition()
        .duration(duration)
        .ease(ease)
        .call(xAxis);
        
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
          .attr("r", 15)
          .attr("cx", function(d) { return x(d.starVal); })
          .attr("cy", function(d) { return y(d.winPct); })
          .style("fill", function(d) { return d.teamColor1; })
          .attr("opacity", 0.8);

      // update dot position on data change
      dots.transition()
          .duration(duration)
          .ease(ease)
          .attr("r", 15)
          .attr("cx", function(d) { return x(d.starVal); })
          .attr("cy", function(d) { return y(d.winPct); })
          .style("fill", function(d) { return d.teamColor1; });

      dots.exit().transition().style({opacity: 0}).remove();

      var teamLabels = svg.select(".chart-group")
        .selectAll('.team-label')
        .data(_data);


      teamLabels.enter().append("text")
        .classed('team-label', true)
        .attr("x", function(d) { return x(d.starVal); })
        .attr("y", function(d) { return y(d.winPct) + 3; })
        .text(function(d) { return d.abbreviation; })
        .style("fill", function(d) { return d.teamColor2; })
        .attr("text-anchor", "middle");

      // update label position on data change
      dots.transition()
          .duration(duration)
          .ease(ease)
          .attr("r", 15)
          .attr("cx", function(d) { return x(d.starVal); })
          .attr("cy", function(d) { return y(d.winPct); })
          .style("fill", function(d) { return d.teamColor1; });

      dots.exit().transition().style({opacity: 0}).remove();

      teamLabels.transition()
        .duration(duration)
        .ease(ease)
        .attr("x", function(d) { return x(d.starVal); })
        .attr("y", function(d) { return y(d.winPct) + 3; })
        .text(function(d) { return d.abbreviation; })
        .style("fill", function(d) { return d.teamColor2; })
        .attr("text-anchor", "middle");

      teamLabels.exit().transition().style({opacity: 0}).remove();


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

