/**
 * Created by Lindon on 11/19/2016.
 */
(function(){
    "use strict";

    angular.module("app.core.layout").controller("LayoutController", LayoutController);

    LayoutController.$inject = ["$scope", "$state", "UserService"];

    /**
     * Layout controller
     * @param $scope
     * @constructor
     */
    function LayoutController($scope, $state, UserService){
        var ctrlLayout = this;

        ctrlLayout.searchText = "";

        // filters holder
        ctrlLayout.filters = {};
        ctrlLayout.filterArray = [];

        var user = UserService.getUser();
        if(typeof user !== "undefined" && user !== null){
            ctrlLayout.userName = user.userName;
        }

        // apply filters
        ctrlLayout.applyFilters = function(){
            ctrlLayout.filterArray = [];
            if(typeof ctrlLayout.filters !== "undefined"){
                Object.keys(ctrlLayout.filters).map(function(key){
                    var filter = ctrlLayout.filters[key];
                    if(typeof filter === "boolean" && filter == true){
                        ctrlLayout.filterArray.push(key);
                    }
                });
                $scope.$broadcast("selectedFilters", { filters: ctrlLayout.filterArray, searchText: ctrlLayout.searchText });
            }
        };

        // rest filters
        ctrlLayout.resetFilters = function(){
            ctrlLayout.filterArray = [];
            if(typeof ctrlLayout.filters !== "undefined"){
                Object.keys(ctrlLayout.filters).map(function(key){
                    ctrlLayout.filters[key] = false;
                });
                $scope.$broadcast("selectedFilters", { filters: ctrlLayout.filterArray, searchText: ctrlLayout.searchText });
            }
        };

        // sign out action method
        ctrlLayout.signOut = function(){
            if(UserService.signOut() == true){
                $state.go("login");
            }
        };

        /**
         * Called on search
         */
        ctrlLayout.onSearch = function(){
            $scope.$broadcast("selectedFilters", { filters: ctrlLayout.filterArray, searchText: ctrlLayout.searchText });
        };
    }

})();