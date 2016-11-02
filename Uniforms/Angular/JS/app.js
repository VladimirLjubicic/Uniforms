(function () {
    angular.module('uniforms', ['ngRoute'])
        .config(function ($routeProvider) {

            // for future partials
            $routeProvider
                .when('/', {
                    templateUrl: '/Angular/Partials/Home.html'
                })
                .when('/quiz', {
                    templateUrl: 'Angular/Partials/Quiz.html'
                })
                .when('/results', {
                    templateUrl: 'Angular/Partials/Results.html'
                })
                .otherwise({
                    redirectTo: '/'
                });
        });
})();