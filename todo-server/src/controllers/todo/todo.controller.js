/**
 * Created by Lindon on 11/26/2016.
 */

var TodoService = require('../../services/todo/todo.service');
var Core = require('../../core/core.service.js');

/**
 * Todo_ controller
 * @param factory
 * @returns {TodoController}
 * @constructor
 */
var TodoController = function(factory){
    var factory_ = factory;
    var todoService = new TodoService(factory);

    /**
     * Get all todo_ items
     * @param req
     * @param res
     */
    this.getAllTodo = function(req, res){
        if(typeof req.decoded != "undefined" && req.decoded != null){
            todoService.getAllTodo(req.decoded).then(
                function(response){
                    res.send(response);
                },
                function(error){
                    res.status(500).send(error);
                }
            );
        }
        else{
            res.status(401).send(Core.Utility.Response.error(null, "Missing authorization data!"));
        }
    };

    /**
     * Get todo_ item by id
     * @param req
     * @param res
     */
    this.getTodo = function(req, res){
        if(typeof req.params !== "undefined" && typeof req.params.id !== "undefined"){
            todoService.getTodo(req.params.id).then(
                function(response){
                    res.send(response);
                },
                function(error){
                    res.status(400).send(error);
                }
            );
        }
        else{
            res.status(400).send(Core.Utility.Response.error(null, "Missing request parameter!"));
        }
    };

    /**
     * Save todo_ item
     * @param req
     * @param res
     */
    this.saveTodo = function(req, res){
        if(typeof req.body != "undefined" && typeof req.decoded != "undefined" && req.decoded != null){
            todoService.saveTodo(req.body, req.decoded).then(
                function(response){
                    res.send(response);
                },
                function(error){
                    res.status(500).send(error);
                }
            );
        }
        else{
            res.status(401).send({status: "error", "message": "Missing request body or authorization token!"});
        }
    };

    /**
     * Remove todo_ item
     * @param req
     * @param res
     */
    this.removeTodo = function(req, res){
        if(typeof req.body != "undefined" && typeof req.body.id != "undefined"){
            todoService.removeTodo(req.body.id).then(
                function(response){
                    res.send(response);
                },
                function(error){
                    res.status(400).send(error);
                }
            );
        }
        else{
            res.status(400).send(Core.Utility.Response.error(null, "Missing request parameter id!"));
        }
    };


    return this;
};

module.exports = TodoController;