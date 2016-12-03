/**
 * Created by Lindon on 11/19/2016.
 */

(function () {
    "use strict";

    angular
        .module("app.components.todo", [])
        .config(config);

    config.$inject = ["$stateProvider"];

    /**
     * Todo module config
     * @param $stateProvider
     */
    function config($stateProvider) {
        $stateProvider
            .state("todo", {
                url: "/todo",
                parent: "app",
                views: {
                    content: {
                        controller: "TodoController",
                        controllerAs: "ctrlTodo",
                        templateUrl: "components/todo/views/todo.view.html",
                    }
                },
                title: ""
            });
    }

})();