/**
 * Created by Lindon on 11/19/2016.
 */

(function () {
    "use strict";

    angular
        .module("app", ["ui.router", "ngSanitize", "schemaForm", "ngStorage", "kendo.directives", "app.core", "app.components", "app.formEngine"])
        .config(config)
        .run(run);

    config.$inject = ["$stateProvider", "$urlRouterProvider", "$locationProvider", "$urlMatcherFactoryProvider", "$httpProvider"];
    run.$inject = ["$rootScope", "$http", "$state", "UserService"];

    /**
     * Angular config method
     * @param $stateProvider
     */
    function config($stateProvider, $urlRouterProvider, $locationProvider, $urlMatcherFactoryProvider, $httpProvider) {

        $urlMatcherFactoryProvider.strictMode(false);
        $httpProvider.defaults.withCredentials = true;

        // Rule that converts url to lower case
        $urlRouterProvider.rule(function ($injector, $location) {
            var path = $location.path(),
                lowerCasePath = path.toLowerCase();

            // if path is not lower case then convert to lower case
            if (path != lowerCasePath) {
                $location.replace().path(lowerCasePath);
            }
        });

        $locationProvider.hashPrefix("!");
        $urlRouterProvider.otherwise("/app/todo");
    }

    /**
     * Angular app run method
     * @param $rootScope
     * @param $http
     * @param $state
     * @param UserService
     */
    function run($rootScope, $http, $state, UserService) {
        $http.defaults.headers.common["Accept"] = "application/json";
        $http.defaults.headers.common['Content-Type'] = 'application/json';

        // local token, set as http header
        var localToken = UserService.getToken();
        if (localToken != null) {
            $http.defaults.headers.common["authorization"] = localToken;
        }

        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {

            $rootScope.title = "Todo application";
            if (toState.title !== "undefined") {
                $rootScope.title += toState.title;
            }

            localToken = UserService.getToken();
            if (localToken !== null) {
                UserService.checkToken().then(
                    function (response) {
                        if (typeof response != null && response == true) {
                            if (toState.name == "login" || toState.name == "register") {
                                event.preventDefault();
                                $state.go("todo");
                            }
                        }
                    },
                    function (error) {
                        event.preventDefault();
                        $state.go("login");
                    }
                );
            }
            else {
                if (toState.name != "login" && toState.name != "register") {
                    event.preventDefault();
                    $state.go("login");
                }
            }
        });

        $rootScope.$on('$stateNotFound', function (event, unfoundState, fromState, fromParams) {

        });

        $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {

        });

    }

})();
