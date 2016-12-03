/**
 * Created by Lindon on 11/19/2016.
 */

(function () {
    "user strict";

    angular.module("app.core.services").factory("RouterService", RouterService);

    /**
     * Router service
     * @constructor
     */
    function RouterService() {

        var endPoint = "http://localhost:6634";

        /**
         * Resolve url
         * @param url
         * @returns {string}
         */
        var resolve = function (url) {
            if (typeof url === "undefined" || url === null) {
                url = "";
            }
            return endPoint + url;
        };

        /**
         * Get api routes
         * @returns {{checkConnection: string}}
         */
        var apiRoutes = function () {
            return {
                "checkConnection":      "/connection/status",
                "checkToken":           "/checkToken",
                "authenticate":         "/authenticate",
                "register":             "/register",

                "getAllTodo":           "/api/todo",
                "getTodo":              "/api/todo/",
                "saveTodo":             "/api/todo/save",
                "removeTodo":           "/api/todo/remove"
            };
        };

        return {
            apiRoutes: apiRoutes(),
            resolve: resolve
        };
    }

})();