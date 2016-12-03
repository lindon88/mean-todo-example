/**
 * Created by Lindon on 11/26/2016.
 */

var Controller = require('../controllers/todo/todo.controller');

/**
 * Todo_ routes
 * @param factory
 * @returns {TodoRoutes}
 * @constructor
 */
var TodoRoutes = function(factory){

    var init = function(factory){
        var controller = new Controller(factory);

        factory.app.get("/api/todo", controller.getAllTodo);
        factory.app.get("/api/todo/:id", controller.getTodo);
        factory.app.post("/api/todo/save", controller.saveTodo);
        factory.app.post("/api/todo/remove", controller.removeTodo);
    };

    init(factory);

    return this;
};

module.exports = TodoRoutes;
