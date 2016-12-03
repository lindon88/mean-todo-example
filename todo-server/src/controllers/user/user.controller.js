/**
 * Created by Lindon on 11/26/2016.
 */

var UserService = require('../../services/user/user.service');
var Core = require('../../core/core.service.js');

/**
 * User controller
 * @param factory
 * @returns {UserController}
 * @constructor
 */
var UserController = function(factory){

    var factory_ = factory;
    var userService = new UserService(factory);

    /**
     * Get user by id
     * @param req
     * @param res
     */
    this.getUser = function(req, res){
        res.send({name: "lindon"});
    };

    /**
     * Authenticate user
     * @param req
     * @param res
     */
    this.authenticate = function(req, res){
        if(typeof req.body !== "undefined"){
            userService.authenticate(req.body).then(
                function(data){
                    res.send(data);
                },
                function(error){
                    res.status(400).send(error);
                }
            );
        }
        else{
            res.status(400).send(Core.Utility.Response.error(null, "Request body is undefined!"));
        }
    };

    /**
     * User register
     * @param req
     * @param res
     */
    this.register = function(req, res){
        if(typeof req.body != "undefined" && req.body != null){
            userService.register(req.body).then(
                function(response){
                    res.send(response);
                },
                function(error){
                    res.status(500).send(error);
                }
            );
        }
        else{
            res.status(400).send({"status": "error"});
        }
    };

    /**
     * Check token (authorization)
     * @param req
     * @param res
     */
    this.checkToken = function(req, res){
        userService.checkToken(req.headers).then(
            function(response){
                res.send(response);
            },
            function(error){
                res.status(400).send(error);
            }
        );
    };

    return this;
};

module.exports = UserController;
