/* var petals = [
  {sepalLength:5.1,sepalWidth:3.5,petalLength:1.4,petalWidth:0.2,species:"setosa"},
  {sepalLength:4.9,sepalWidth:3.0,petalLength:1.4,petalWidth:0.2,species:"setosa"},
  {sepalLength:2.7,sepalWidth:3.2,petalLength:1.3,petalWidth:0.2,species:"setosa"},
  {sepalLength:5.1,sepalWidth:3.5,petalLength:1.4,petalWidth:0.2,species:"setosa"},
  {sepalLength:4.9,sepalWidth:4.0,petalLength:1.4,petalWidth:0.2,species:"setosa"},
  {sepalLength:4.7,sepalWidth:1.2,petalLength:1.3,petalWidth:0.2,species:"setosa"},
  {sepalLength:5.1,sepalWidth:3.5,petalLength:1.4,petalWidth:0.2,species:"setosa"},
  {sepalLength:4.2,sepalWidth:4.1,petalLength:1.4,petalWidth:0.2,species:"setosa"},
  {sepalLength:4.7,sepalWidth:7.2,petalLength:1.3,petalWidth:0.2,species:"setosa"},
  {sepalLength:2.1,sepalWidth:3.5,petalLength:1.4,petalWidth:0.2,species:"setosa"},
  {sepalLength:4.9,sepalWidth:8.0,petalLength:9.4,petalWidth:0.2,species:"setosa"},
  {sepalLength:4.7,sepalWidth:3.2,petalLength:3.3,petalWidth:0.2,species:"setosa"},
  {sepalLength:6.1,sepalWidth:9.5,petalLength:1.5,petalWidth:0.2,species:"setosa"},
  {sepalLength:4.3,sepalWidth:3.9,petalLength:1.4,petalWidth:0.2,species:"setosa"},
  {sepalLength:4.7,sepalWidth:3.2,petalLength:1.3,petalWidth:0.2,species:"setosa"},
]; */

var dataset = []; 
var numDataPoints = 30; 
var xRange = Math.random() * 1000; 
var yRange = Math.random() * 1000; 
for (var i = 0; i < numDataPoints; i ++) { 
  var newNumber1 = Math.floor( Math.random() * xRange); 
  var newNumber2 = Math.floor( Math.random() * yRange); 
  dataset.push([ newNumber1, newNumber2]);
} 


 
angular.module('mean.chart')
  .controller('scatterCtrl', function AppCtrl ($scope) {
    $scope.options = { width: 500, height: 300 };
    $scope.data = dataset;
    // $scope.hovered = function(d){
    //   $scope.barValue = d;
    //   $scope.$apply();
    // };
    // $scope.barValue = 'None';
  });



