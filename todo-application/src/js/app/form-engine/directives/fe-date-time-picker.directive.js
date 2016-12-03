/**
 * Created by Lindon on 11/28/2016.
 */
(function(){
    "use strict";

    angular.module("app.formEngine").directive("feDateTimePicker", feDateTimePicker);

    feDateTimePicker.$inject = ["$rootScope"];

    /**
     * Date time picker for schema form
     * @param $rootScope
     * @returns {{restrict: string, scope: {options: string}, require: string, templateUrl: string, link: link}}
     */
    function feDateTimePicker($rootScope){

        function link($scope, element, attributes, ngModel){

            $scope.changeHandler = changeHandler;
            $scope.focusOutHandler = changeHandler;

            ngModel.$render = function(){
                $scope.model = ngModel.$modelValue;
            };

            function changeHandler()
            {
                ngModel.$setViewValue($scope.model);
            }
        }

        return {
            restrict: 'AE',
            scope:
            {
                options: "=feOptions"
            },
            require: "ngModel",
            templateUrl: 'form-engine/views/fe-date-time-picker.view.html',
            link: link
        };
    }

})();