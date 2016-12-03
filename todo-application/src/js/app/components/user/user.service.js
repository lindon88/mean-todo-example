/**
 * Created by Lindon on 11/27/2016.
 */
(function(){
    "use strict";

    angular.module("app.components.user").factory("UserService", UserService);

    UserService.$inject = ["$http", "$q", "$localStorage", "RouterService"];

    /**
     * User service
     * @param $http
     * @param $q
     * @param RouterService
     * @returns {{authenticate: Function}}
     * @constructor
     */
    function UserService($http, $q, $localStorage, RouterService){

        /**
         * Authenticate
         * @param model
         * @returns {*}
         */
        this.authenticate = function(model){
            var deffered = $q.defer();
            $http.post(RouterService.resolve(RouterService.apiRoutes.authenticate), model).then(
                function(response){
                    if(typeof response !== "undefined" && typeof response.data !== "undefined" && typeof response.data.data !== "undefined"){
                        var data = response.data.data;
                        $localStorage.token = data.token;
                        $localStorage.user = data.user;

                        // define http header
                        $http.defaults.headers.common["authorization"] = data.token;

                        deffered.resolve(data.user);
                    }
                    else{
                        deffered.reject("Data not found");
                    }
                },
                function(error){
                    deffered.reject(error);
                }
            );
            return deffered.promise;
        };

        /**
         * Register user method
         * @param model
         */
        this.register = function(model){
            var deffered = $q.defer();

            $http.post(RouterService.resolve(RouterService.apiRoutes.register), model).then(
                function(response){
                    if(typeof response.data !== "undefined" && typeof response.data.status !== "undefined" && response.data.status == "success"){
                        deffered.resolve(response);
                    }
                },
                function(error){
                    deffered.reject(error);
                }
            );

            return deffered.promise;
        };

        /**
         * Get local token
         * @returns {*}
         */
        this.getToken = function(){
            var token = $localStorage.token;
            if(typeof token !== "undefined"){
                return token;
            }
            return null;
        };

        /**
         * Check token
         * @returns {*}
         */
        this.checkToken = function(){
            var deffered = $q.defer();
            var token = $localStorage.token;

            if(typeof token !== "undefined" && token != null){
                $http.post(RouterService.resolve(RouterService.apiRoutes.checkToken)).then(
                    function(response){
                        if(typeof response.data !== "undefined" && typeof response.data.status !== "undefined" && response.data.status == "success"){
                            deffered.resolve(true);
                        }
                        else{
                            deffered.reject(false);
                        }
                    },
                    function(error){
                        debugger;
                        deffered.reject(false);
                    }
                );
            }
            else{
                deffered.reject(false);
            }

            return deffered.promise;
        };

        /**
         * Get local user
         * @returns {user|*|app.components.user}
         */
        this.getUser = function(){
            return $localStorage.user;
        };

        /**
         * Sign out user
         * @returns {boolean}
         */
        this.signOut = function(){
            $localStorage.token = null;
            $localStorage.user = null;

            return true;
        };

        return this;
    }

})();