/**
 * Created by Lindon on 11/26/2016.
 */

var Promise = require("promise");
var _ = require('underscore');
var uuid = require('node-uuid');

var TodoModel = require('../../models/todo/todo.model');
var Core = require('../../core/core.service.js');

/**
 * Todo_ service
 * @param factory
 * @returns {TodoService}
 * @constructor
 */
var TodoService = function(factory){

    var factory_ = factory;

    /**
     * Get all todo_ items
     * @param user
     * @returns {Promise}
     */
    this.getAllTodo = function(user){
        return new Promise(function(resolve, reject){
            try{
                var todoCollection = factory_.db.collection("todos");
                var todoItems = todoCollection.find({ "userId" : user.id }).toArray(function(err, items) {
                    resolve(Core.Utility.Response.ok(items, null));
                });
            }
            catch(ex){
                reject(Core.Utility.Response.error(ex, "Exception"));
            }
        });
    };

    /**
     * Get todo_ item
     * @param id
     * @returns {Promise}
     */
    this.getTodo = function(id){
        return new Promise(function(resolve, reject){
            factory_.db.collection("todos").find({id: id}).toArray(function(err, items){
                if(!err && items.length > 0){
                    resolve(Core.Utility.Response.ok(items[0], null));
                }
                else{
                    reject(Core.Utility.Response.error(null, "Item with id: " + id + " not exists!"));
                }
            });
        });
    };


    /**
     * Save todo_ item
     * @param obj
     * @param user
     * @returns {Promise}
     */
    this.saveTodo = function(obj, user){
        return new Promise(function(resolve, reject){
            var date = new Date();
            var todoCollections = factory_.db.collection("todos");
            var todo = null;
            if(obj.id == null || obj.id == ""){
                // insert data
                todo = _.extend(_.clone(TodoModel), obj);
                todo.setId(uuid.v4());
                todo.setUserId(user.id);

                // set current date if not defined
                if(todo.getCreated() == null || todo.getCreated() == ""){
                    todo.setCreated(date.getTime());
                }

                // insert
                todoCollections.insertOne(todo, function(err, result){
                    if(err){
                        reject(Core.Utility.Response.error(err, "Error while adding new todo!"));
                    }
                    else{
                        resolve(Core.Utility.Response.ok(result, null));
                    }
                });
            }
            else{
                todo = _.extend(_.clone(TodoModel), obj);
                todo.setUserId(user.id);
                if(todo.getIsComplete()){
                    todo.setCompleted(date.getTime());
                }
                todo.setUpdated(date.getTime());

                // update
                todoCollections.updateOne({ "id": todo.getId()}, todo, function(err, result){
                    if(err){
                        reject(Core.Utility.Response.error(err, "Error while updating existing todo!"));
                    }
                    else{
                        resolve(Core.Utility.Response.ok(result, null));
                    }
                });
            }
        });
    };

    /**
     * Remove todo_ item
     * @param id
     * @returns {Promise}
     */
    this.removeTodo = function(id){
        return new Promise(function(resolve, reject){
            factory_.db.collection("todos").deleteOne(
                { id: id },
                function(err, result){
                    if(err){
                        reject(Core.Utility.Response.error(err, "Error while trying to remove itame with id: " + id));
                    }
                    else{
                        resolve(Core.Utility.Response.ok(result, "Successfully removed item with id: " + id));
                    }
                }
            );
        });
    };

    return this;
};

module.exports = TodoService;