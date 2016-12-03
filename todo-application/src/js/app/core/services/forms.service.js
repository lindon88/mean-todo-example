/**
 * Created by Lindon on 11/26/2016.
 */
(function(){
    "use strict";

    angular.module("app.core.services").factory("FormService", FormService);

    FormService.$inject = ["$http", "$q"];

    /**
     * Form service
     * @param $http
     * @param $q
     * @returns {{loginForm: loginForm}}
     * @constructor
     */
    function FormService($http, $q){

        var _loginForm = "/src/forms/login.json";
        var _registerForm = "/src/forms/register.json";
        var _todoForm = "/src/forms/todo-add.json";

        /**
         * Get login form definition
         * @returns {*}
         */
        this.loginForm = function(){
            var deffered = $q.defer();
            $http.get(_loginForm).then(
                function(response){
                    if(typeof response !== "undefined" && typeof response.data !== "undefined"){
                        deffered.resolve(response.data);
                    }
                    else{
                        deffered.reject("No data!!!");
                    }
                },
                function(error){
                    deffered.reject(error);
                }
            );
            return deffered.promise;
        };

        /**
         * Register form json definition
         * @returns {*}
         */
        this.registerForm = function(){
            var deffered = $q.defer();

            $http.get(_registerForm).then(
                function(response){
                    if(typeof response !== "undefined" && typeof response.data !== "undefined"){
                        deffered.resolve(response.data);
                    }
                    else{
                        deffered.reject("No data!!!");
                    }
                },
                function(error){
                    deffered.reject("No data");
                }
            );

            return deffered.promise;
        };

        /**
         * Get todo_ add form
         */
        this.todoAddForm = function(){
            var deffered = $q.defer();
            $http.get(_todoForm).then(
                function(response){
                    if(typeof response !== "undefined" && typeof response.data !== "undefined"){
                        deffered.resolve(response.data);
                    }
                    else{
                        deffered.reject("No data");
                    }
                }
            );
            return deffered.promise;
        };

        return this;
    }

})();