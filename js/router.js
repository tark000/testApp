angular.module('testApp').config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/', {
                templateUrl: 'template/slider.html',
                controller: 'SliderController'
            }).

            otherwise({
                redirectTo: '/'
            });

    }]);
