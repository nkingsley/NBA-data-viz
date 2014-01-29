//Setting up route
angular.module('mean').config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        when('/', {
            templateUrl: 'views/powerRank.html'
        }).
        when('/scatter', {
            templateUrl: 'views/chart.html'
        }).
        when('/players', {
            templateUrl: 'views/playerRanking.html'
        }).
        when('/graph', {
            templateUrl: 'views/graph.html'
        }).
        otherwise({
            redirectTo: '/'
        });
    }
]);

//Setting HTML5 Location Mode
angular.module('mean').config(['$locationProvider',
    function($locationProvider) {
        $locationProvider.hashPrefix("!");
    }
]);