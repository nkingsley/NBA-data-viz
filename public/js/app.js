angular.module('mean', ['ngCookies', 'ngResource', 'ngRoute', 'ngAnimate',
  'ui.bootstrap', 'ui.route', 'ngTouch', 'nvd3ChartDirectives',
  'mean.system',
  'mean.chart'
  ]);

angular.module('mean.system', []);
angular.module('mean.chart', ['ajoslin.promise-tracker', 'cgBusy']);
