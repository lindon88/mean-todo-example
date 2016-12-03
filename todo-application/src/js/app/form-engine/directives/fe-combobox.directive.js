/**
 * Created by Lindon on 11/27/2016.
 */
(function () {
    "use strict";

    angular.module("app.formEngine").directive("feComboBox", feComboBox);

    feComboBox.$inject = ["$rootScope"];

    /**
     * Combo box dircetive used for schema form
     * @param $rootScope
     * @returns {{restrict: string, scope: {options: string}, require: string, templateUrl: string, link: link}}
     */
    function feComboBox($rootScope) {

        function link($scope, element, attributes, ngModel) {

            var dataTextField = $scope.options.kendoOptions.dataTextField,
                dataValueField = $scope.options.kendoOptions.dataValueField,
                model;

            $scope.changeHandler = changeHandler;
            $scope.focusOutHandler = changeHandler;

            ngModel.$render = function () {

                $scope.model = ngModel.$modelValue;
                model = $scope.model;

                if (model === "" || model === undefined || model === null) {
                    $scope.model = model = {};
                }

                if (!(model[dataTextField] && model[dataValueField])) {
                    ngModel.$setViewValue(undefined);
                    model[dataTextField] = undefined;
                    model[dataValueField] = undefined;
                }
            };

            function changeHandler() {
                var modelValue = undefined;

                if ($scope.model[dataValueField]) {
                    modelValue = $scope.model;
                }

                ngModel.$setViewValue(modelValue);
                $scope.$emit('schemaFormValidate');
            }

        }

        return {
            restrict: 'AE',
            scope: {
                options: "=feOptions"
            },
            require: "ngModel",
            templateUrl: 'form-engine/views/fe-combobox.view.html',
            link: link
        };
    }

})();