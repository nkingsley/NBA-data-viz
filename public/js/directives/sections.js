angular.module('MoneyBaller')
  .directive('sliderBlock', function(){
    return{
      templateUrl: 'views/sliders.html'
    }
  })
  .directive('accuracy', function(){
    return{
      template: '<div ng-class = "spearman.redGreen(rhoVal)"><span class = "rank">Accuracy:{{rhoVal | number:3}}</span> </div>'
    }
  })
  .directive('buttons', function(){
    return {
      templateUrl: 'views/buttons.html'
    }
  })
  .directive('players', function(){
    return{
      templateUrl: 'views/players.html'
    }
  })
  .directive('info', function(){
    return{
      templateUrl: 'views/info.html'
    }
  })
  .directive('header',function(){
    return{
      templateUrl: 'views/header.html'
    }
  });