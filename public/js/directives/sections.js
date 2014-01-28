angular.module('mean.chart')
  .directive('sliderBlock', function(){
    return{
      templateUrl: 'views/sliders.html'
    }
  })
  .directive('accuracy', function(){
    return{
      template: '<div ng-class = "redGreen(rhoVal)"><span class = "rank">Accuracy:{{rhoVal | number:3}}</span> </div>'
    }
  })
  .directive('buttons', function(){
    return {
      templateUrl: 'views/infoAndButtons.html'
    }
  })
  .directive('players', function(){
    return{
      templateUrl: 'views/players.html'
    }
  })
  .directive('header',function(){
    return{
      templateUrl: 'views/header.html'
    }
  });