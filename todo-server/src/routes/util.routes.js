/**
 * Created by Lindon on 11/26/2016.
 */

var Controller = require('../controllers/util/util.controller');

/**
 * Util routes
 * @param factory
 * @constructor
 */
var UtilRoutes = function(factory){

    var init = function(factory){
        var controller = new Controller(factory);
        factory.app.get("/connection/status", controller.checkConnection);
    };

    init(factory);
};

module.exports = UtilRoutes;