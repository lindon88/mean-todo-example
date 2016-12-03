/**
 * Created by Lindon on 11/26/2016.
 */

var UserProvider = require('./user.routes');
var UtilProvider = require('./util.routes');
var TodoProvider = require('./todo.routes');

/**
 * Routes
 * @type {{registerRoutes: Function}}
 */
var Routes = {
    registerRoutes: function(factory){
        var userRoutes = new UserProvider(factory);
        var utilRoutes = new UtilProvider(factory);
        var todoRoutes = new TodoProvider(factory);
    }
};


module.exports = Routes;