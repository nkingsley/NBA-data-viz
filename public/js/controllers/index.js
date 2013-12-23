angular.module('mean.system').controller('IndexController', ['$scope', 'Global', function ($scope, Global) {
    $scope.global = Global;
    $scope.stealsWeight = 0;
    $scope.blocksWeight = 0;

    //Width and height
    var w = 500;
    var h = 100;

    var dataset = [
            [5, 20], [480, 90], [250, 50], [100, 33], [330, 95],
            [410, 12], [475, 44], [25, 67], [85, 21], [220, 88]
            ];

    //Create SVG element
    var svg = d3.select("body")
          .append("svg")
          .attr("width", w)
          .attr("height", h);

    svg.selectAll("circle")
       .data(dataset)
       .enter()
       .append("circle")
       .attr("cx", function(d) {
          return d[0] + $scope.blocksWeight;
       })
       .attr("cy", function(d) {
          return d[1] + $scope.stealsWeight;
       })
       .attr("r", function(d) {
          return Math.sqrt(h - d[1]);
       });


  }]);
