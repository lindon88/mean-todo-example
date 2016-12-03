/**
 * Created by Lindon on 11/19/2016.
 */
(function(){
    "use strict";

    angular
        .module("app.core.layout", [])
        .config(config);

    config.$inject = ["$stateProvider"];

    /**
     * Layout module config method
     * @param $stateProvider
     */
    function config($stateProvider){
        $stateProvider
            .state("app", {
                abstract: true,
                url: "/app",
                controller: "LayoutController",
                controllerAs: "ctrlLayout",
                templateUrl: "core/layout/views/layout.view.html",
                resolve: {
                    connectivity: function($q, UtilService){
                        var deffered = $q.defer();

                        UtilService.checkConnection().then(
                            function(response){
                                if(typeof response !== "undefined" && typeof response.status !== "undefined"){
                                    deffered.resolve(response.status);
                                }
                                else{
                                    deffered.reject("No connection!!!");
                                }
                            },
                            function(reject){
                                deffered.reject("No connection!!!");
                            }
                        );
                        return deffered.promise;
                    }
                }
            });
    }
})();
