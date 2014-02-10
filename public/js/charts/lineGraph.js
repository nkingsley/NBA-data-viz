d3.custom = d3.custom || {};

var dispatch = d3.dispatch('customHover', 'datumChange');
d3.custom.lineGraph = nv.addGraph(function() {

   if(this.childElementCount === 0) {
        svg = d3.select(this)
          .append('svg')
          .classed('svg-chart', true);

   var chart = nv.models.cumulativeLineChart()
             .useInteractiveGuideline(false)
             .rightAlignYAxis(true)
             .margin({right:90})
             .x(function(d) { return d[0] })
             .y(function(d) { return d[1] })
             .color(d3.scale.category10().range())
             .average(function(d) { return d.mean/100; })
             .clipVoronoi(true);

   chart.xAxis
      .tickFormat(function(d) {
          return d3.time.format('%d/%m')(new Date(d))
        });

  chart.yAxis
      .tickFormat(d3.format(',.1%'));

  d3.select('#chart2 svg')
      .datum(data)
      .call(chart);

  //TODO: Figure out a good way to do this automatically
  nv.utils.windowResize(chart.update);

  chart.dispatch.on('stateChange', function(e) { nv.log('New State:', JSON.stringify(e)); });

  return chart;
});




