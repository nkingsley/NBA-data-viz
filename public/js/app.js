angular.module('mean', ['ngCookies', 'ngResource', 'ngRoute', 'ngAnimate',
  'ui.bootstrap', 'ui.route', 
  'mean.system',
  'mean.articles',
  'mean.chart', 
  ]);

angular.module('mean.system', []);
angular.module('mean.articles', []);
angular.module('mean.chart', ['ajoslin.promise-tracker', 'cgBusy']);
angular.module('mean.stats', []);
