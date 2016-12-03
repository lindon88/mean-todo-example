/**
 * Created by Lindon on 11/14/2016.
 */

var md5 = require('md5');
var jwt = require('jsonwebtoken');
var Promise = require("promise");
var uuid = require('node-uuid');
var _ = require('underscore');

var UserModel = require('../../models/user/user.model');
var Core = require('../../core/core.service.js');

var UserService = function(factory){

    var factory_ = factory;

    /**
     * User authenticate and create token
     * @param requestData
     * @returns {Promise}
     */
    this.authenticate = function(requestData){
        if(typeof requestData.userName !== "undefined" && typeof requestData.password !== "undefined"){
            return new Promise(function(resolve, reject){
                var usersCollection = factory_.db.collection("users");
                var user = usersCollection.find({"userName" : requestData.userName});

                if(typeof user == "undefined" || user == null){
                    reject(Core.Utility.Response.error(null, "User name or password is invalid!!!"));
                }

                user.each(function(err, item){
                    if(item != null){
                        if(item.password == md5(requestData.password)){
                            var token = jwt.sign(item, factory_.config.app.secretKey, { expiresIn: '24h' });
                            resolve(Core.Utility.Response.ok({ token: token, user: item }, null));
                        }
                        reject(Core.Utility.Response.error(null, "User name or password is invalid!!!"));
                    }
                    reject(Core.Utility.Response.error(null, "User name or password is invalid!!!"));
                });
            });
        }
    };

    /**
     * Register user
     * @param requestData
     * @returns {Promise}
     */
    this.register = function(requestData){
        var userModel = _.extend(_.clone(UserModel), requestData);
        userModel.setId(uuid.v4());
        userModel.setPassword(md5(requestData.password));

        return new Promise(function(resolve, reject){
            var usersCollection = factory_.db.collection("users");
            usersCollection.insertOne(userModel, function(err, result){
                if(err){
                    reject(Core.Utility.Response.error(err, "Error while creating new user!!!"));
                }
                else{
                    resolve(Core.Utility.Response.ok(result, null));
                }
            });
        });
    };

    /**
     * Check token (authorization)
     * @param requestData
     * @returns {Promise}
     */
    this.checkToken = function(requestData){
        return new Promise(function(resolve, reject){
            if(typeof requestData["authorization"] !== "undefined"){
                jwt.verify(requestData["authorization"], factory_.config.app.secretKey, function(err, decoded){
                    if(!err){
                        resolve(Core.Utility.Response.ok(decoded, null));
                    }
                    else{
                        reject(Core.Utility.Response.error(err, "Authorization is not valid."));
                    }
                });
            }
            else{
                reject(Core.Utility.Response.error(err, "Authorization is not defined!!!"));
            }
        });
    };

    return this;
};

module.exports = UserService;

