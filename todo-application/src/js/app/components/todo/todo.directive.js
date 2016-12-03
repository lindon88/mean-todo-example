/**
 * Created by Lindon on 11/27/2016.
 */
(function(){
    "use strict";

    angular.module("app.components.todo").directive("todoGroup", todoGroup);

    todoGroup.$inject = ["$templateCache"];

    /**
     * Todo_ group directive (component)
     * @param $templateCache
     * @returns {{restrict: string, scope: {options: string}, link: link, templateUrl: string}}
     */
    function todoGroup($templateCache){

        function link($scope, element, attribute){
            $scope.conditions = {
                isComplete: 1
            };

            /**
             * Edit action method
             */
            $scope.edit = function(){
              $scope.$emit("editTodo", this);
            };

            /**
             * Complete check action method
             */
            $scope.check = function(){
                $scope.$emit("completeTodo", this);
            };

            /**
             * Remove action method
             */
            $scope.remove = function(){
                $scope.$emit("removeTodo", this);
            };

        }

        return {
            restrict: 'AE',
            scope: {
                options: "="
            },
            link: link,
            templateUrl: "components/todo/views/todo-group.view.html"
        };
    }
})();
