/**
 * Created by Lindon on 12/3/2016.
 */

(function(){
    "use strict";

    angular.module("app.components.user.register").controller("RegisterController", RegisterController);

    RegisterController.$inject = ["$scope", "$state", "$rootScope", "FormService", "UserService"];

    function RegisterController($scope, $state, $rootScope, FormService, UserService){
        var ctrlRegister = this;

        ctrlRegister.formId = "registerForm";
        ctrlRegister.schema = {};
        ctrlRegister.form = [];
        ctrlRegister.model = {};

        // get form definition
        FormService.registerForm().then(
            function(response){
                angular.merge(ctrlRegister, response);
            }
        );

        /**
         * Register form submit
         * @param form
         */
        ctrlRegister.onSubmit = function(form){
            $rootScope.$broadcast('schemaFormValidate');
            // validate form
            if(form.$valid){
                // check password
                if(this.model.password != this.model.confirmPassword){
                    $scope.$broadcast('schemaForm.error.confirmPassword','confirmPasswordMessage','Password and confirm password must be the same!');
                    return;
                }

                // remove confirm password is not needed in backend
                var requestItem = angular.extend({}, this.model);
                delete requestItem.confirmPassword;

                // user register service
                UserService.register(requestItem).then(
                    function(response){
                        $state.go("login");
                    },
                    function(error){
                        alert("Error while registering user, try again!");
                    }
                );

            }
        };
    }

})();
