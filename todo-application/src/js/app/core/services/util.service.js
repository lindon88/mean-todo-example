/**
 * Created by Lindon on 11/26/2016.
 */
(function(){
    "use strict";

    angular.module("app.core.services").factory("UtilService", UtilService);

    UtilService.$inject = ["$http", "$q", "RouterService"];

    /**
     * Util service
     * @param $http
     * @param $q
     * @param RouterService
     * @returns {{checkConnection: Function}}
     * @constructor
     */
    function UtilService($http, $q, RouterService){

        /**
         * Check connection with backend
         * @returns {*}
         */
        this.checkConnection = function(){
            var deffered = $q.defer();
            $http.get(RouterService.resolve(RouterService.apiRoutes.checkConnection)).then(
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

        return this;
    }

})();