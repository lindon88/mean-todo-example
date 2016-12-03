/**
 * Created by Lindon on 11/26/2016.
 */

(function(){
    "use strict";

    angular
        .module("app.components.user.login", [])
        .config(Config);

    Config.$inject = ["$stateProvider"];

    /**
     * Login module config
     * @param $stateProvider
     * @constructor
     */
    function Config($stateProvider){
        $stateProvider
            .state("login", {
                url:"/login",
                controller: "LoginController",
                controllerAs: "ctrlLogin",
                templateUrl: "components/user/login/views/login.view.html",
                title: " | User login"
            });
    }

})();
