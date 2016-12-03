/**
 * Created by Lindon on 11/26/2016.
 */

var Core = require('./core/core.service');
var routes = require('./routes/routes');

/**
 * Main application
 * @type {{start: Function, Routes: (Routes|*|exports), Core: (Core|*|exports)}}
 */
var Main = {

    /**
     * Start application
     * @param app
     * @param config
     */
    start: function(app, config){
        var self = this;
        var db = new this.Core.Db(config);

        // create factory
        var factory = {
            app: app,
            config: config
        };

        // after db connect initialize application providers and routes
        db.then(function(database){
            factory.db = database;
            self.Core.Utility.NetHelper.init(factory);
            self.Routes.registerRoutes(factory);
        });
    },
    Routes: routes,
    Core: Core
};

module.exports = Main;
