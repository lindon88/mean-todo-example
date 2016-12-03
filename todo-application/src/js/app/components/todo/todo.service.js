/**
 * Created by Lindon on 11/27/2016.
 */
(function(){
    "use strict";

    angular.module("app.components.todo").factory("TodoService", TodoService);

    TodoService.$inject = ["$http", "$q", "RouterService"];

    /**
     * Todo_ service
     * @param $http
     * @param $q
     * @param RouterService
     * @returns {TodoService}
     * @constructor
     */
    function TodoService($http, $q, RouterService){

        /**
         * Get all todo_ items
         * @returns {*}
         */
        this.getAll = function(){
            var deffered = $q.defer();

            $http.get(RouterService.resolve(RouterService.apiRoutes.getAllTodo)).then(
                function(response){
                    if(typeof response.data !== "undefined" && typeof response.data.status !== "undefined" && response.data.status == "success"){
                        var data = response.data.data;
                        angular.forEach(data, function(item, index){
                            item.show = true;
                            if(item.priority == "1"){
                                item.priorityClass = "high";
                            }
                            else if(item.priority == "2"){
                                item.priorityClass = "medium";
                            }
                            else{
                                item.priorityClass = "low";
                            }
                        });

                        deffered.resolve(data);
                    }
                },
                function(error){
                    deffered.reject(error);
                }
            );

            return deffered.promise;
        };

        /**
         * Save todo_ item
         * @param item
         * @returns {*}
         */
        this.saveTodo = function(item){
            var deffered = $q.defer();
            $http.post(RouterService.resolve(RouterService.apiRoutes.saveTodo), item).then(
                function(response){
                    if(typeof response.data !== "undefined" && typeof response.data.status !== "undefined" && response.data.status == "success"){
                        deffered.resolve(response.data.data);
                    }
                    else{
                        deffered.reject(null);
                    }
                },
                function(error){
                    deffered.reject(error);
                }
            );
            return deffered.promise;
        };

        /**
         * Remove todo_ item
         * @param id
         */
        this.removeTodo = function(id){
            var deffered = $q.defer();

            $http.post(RouterService.resolve(RouterService.apiRoutes.removeTodo), {id: id}).then(
                function(response){
                    if(typeof response.data !== "undefined" && typeof response.data.status !== "undefined" && response.data.status == "success"){
                        deffered.resolve(response.data);
                    }
                    else{
                        deffered.reject("Todo item is not removed!");
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
