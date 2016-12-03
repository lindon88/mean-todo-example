/**
 * Created by Lindon on 11/26/2016.
 */

var Controller = require('../controllers/user/user.controller');

/**
 * User routes
 * @param factory
 * @constructor
 */
var UserRoutes = function(factory){

    var init = function(factory){
        var controller = new Controller(factory);

        factory.app.post("/authenticate", controller.authenticate);
        factory.app.post("/register", controller.register);
        factory.app.post("/checkToken", controller.checkToken);
        factory.app.get('/api/user/:id', controller.getUser);

    };

    init(factory);

};

module.exports = UserRoutes;
