angular.module('mean.chart')
  .directive('sliderBlock', function(){
    return{
      templateUrl: 'views/sliders.html'
    }
  })
  .directive('accuracy', function(){
    return{
      template: '<div ng-class = "redGreen(rhoVal)"><span class = "rank bigger">Accuracy:</span> {{rhoVal | number:3}}</div>'
    }
  })
  .directive('header', function(){
    return {
      templateUrl: 'views/infoAndButtons.html'
    }
  })
  .directive('players', function(){
    return{
      templateUrl: 'views/players.html'
    }
  });