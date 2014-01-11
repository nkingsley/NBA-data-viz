d3.custom = {};

d3.custom.scatterPlot = function module() {
  var margin = {top: 40, right: 45, bottom: 40, left: 75},
      width = 500,
      height = 500,
      ease = 'cubic-in-out';
  var svg, duration = 500;

  var dispatch = d3.dispatch('customHover', 'datumChange');
  function exports(_selection) {
    _selection.each(function(_data) {

      var chartW = width - margin.left - margin.right,
        chartH = height - margin.top - margin.bottom;
      
      var x = d3.scale.linear()
        .domain([0, 1])
        // .domain([d3.min(_data, function(d) { return d.starVal; }),
        //   d3.max(_data, function(d) { return d.starVal; })])
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

      if(this.childElementCount === 0) {
        svg = d3.select(this)
          .append('svg')
          .classed('svg-chart', true);
        var container = svg.append('g').classed('container-group', true); 
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

        container
          .append('g')
          .classed('chart-group', true);

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
        
      svg.select('.y-axis-group.axis')
        .transition()
        .duration(duration)
        .ease(ease)
        .call(yAxis);

      // Dots
      // ======================================================================
      var dots = svg.select('.chart-group')
        .selectAll('.dot')
        .data(_data, function (d) { return d.abbreviation; });

      dots.enter().append("circle")
        .classed('dot', true)
        .attr("r", 15)
        .attr("cx", function(d) { return x(d.starVal); })
        .attr("cy", function(d) { return y(1); })
        .style("fill", function(d) { return d.teamColor1; })
        .attr("opacity", 0.8);

      // execute transition when datum changes
      dots.transition()
        .duration(750)
        .ease(ease)
        .attr("r", 15)
        .attr("cx", function(d) { return x(d.starVal); })
        .attr("cy", function(d) { return y(d.winPct); })
        .style("fill", function(d) { return d.teamColor1; });

      dots.exit().transition().style({opacity: 0}).remove(); 

      // Behaviors
      var darken = function(el) {
        d3.select(el)
          .transition()
          .duration(duration)
          .attr("opacity", 1.0);
      };

      var lighten = function(el) {
        d3.select(el)
          .transition()
          .duration(duration)
          .attr("opacity", 0.3);
      };

      var fadeDotsIn = function() {
        dots
        .transition()
        .duration(duration)
        .attr("opacity", 0.8);
      };

      var dotMouseOver = function(d, i) {
        var dot = this;
        dots.each(function() {
          if (dot === this) { 
            darken(this);
          } else {
            lighten(this);
          }
        });
      };

      // Commented out my fancy fade in/fade on mouseover since it was
      // intermittant issues with the initial
      // dots
      //   .on("mouseover", dotMouseOver)
      //   .on("mouseout", fadeDotsIn);

      // Team Labels
      // ======================================================================
      var teamLabels = svg.select(".chart-group")
        .selectAll('.team-label')
        .data(_data, function (d) { return d.abbreviation; });

      teamLabels.enter().append("text")
        .classed('team-label', true)
        .attr("x", function(d) { return x(d.starVal); })
        .attr("y", function(d) { return y(1) + 3; })
        .text(function(d) { return d.abbreviation; })
        .style("fill", function(d) { return d.teamColor2; })
        .attr("text-anchor", "middle");

      // teamLabels.on("mouseover", function(d, i) {
      //   dotMouseOver.call(dots[0][i]);
      // }).on("mouseout", fadeDotsIn);

      // update label position on data change
      teamLabels.transition()
        .duration(750)
        .ease(ease)
        .attr("x", function(d) { return x(d.starVal); })
        // .attr("y", function(d) { return y(1) + 3; })
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

exports.width = function(_x) {
  if (!arguments.length) return width;
  width = parseInt(_x);
  return this;
};
exports.height = function(_x) {
  if (!arguments.length) return height;
  height = parseInt(_x);
  return this;
};
exports.ease = function(_x) {
  if (!arguments.length) return ease;
  ease = _x;
  return this;
};
d3.rebind(exports, dispatch, 'on', 'datumChange');
  return exports;
};
