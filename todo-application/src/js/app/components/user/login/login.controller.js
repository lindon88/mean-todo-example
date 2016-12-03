/**
 * Created by Lindon on 11/26/2016.
 */
(function(){
    "use strict";

    angular.module("app.components.user.login").controller("LoginController", LoginController);

    LoginController.$inject = ["$scope", "$rootScope", "$state", "FormService", "UserService"];

    /**
     * Login controller
     * @param $scope
     * @param $rootScope
     * @param FormService
     * @param UserService
     * @constructor
     */
    function LoginController($scope, $rootScope, $state, FormService, UserService){
        var ctrlLogin = this;

        ctrlLogin.formId = "loginForm";
        ctrlLogin.schema = {};
        ctrlLogin.form = [];
        ctrlLogin.model = {};

        // get form definition
        FormService.loginForm().then(
            function(response){
                angular.merge(ctrlLogin, response);
            }
        );

        // on submit action method
        ctrlLogin.onSubmit = function(form){
            $rootScope.$broadcast('schemaFormValidate');
            if(form.$valid){

                UserService.authenticate(this.model).then(
                    function(response){
                        $state.go("todo");
                    }
                );

            }
        };

    }

})();