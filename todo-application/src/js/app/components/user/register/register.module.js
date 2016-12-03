/**
 * Created by Lindon on 12/3/2016.
 */

(function(){
    "use strict";

    angular
        .module("app.components.user.register", [])
        .config(Config);

    Config.$inject = ["$stateProvider"];

    function Config($stateProvider){
        $stateProvider
            .state("register", {
                url: "/register",
                controller: "RegisterController",
                controllerAs: "ctrlRegister",
                templateUrl: "components/user/register/views/register.view.html",
                title: " | User register"
            });
    }

})();