/**
 * Created by Lindon on 11/14/2016.
 */

var MongoClient = require('mongodb').MongoClient;
var Promise = require('promise');

/**
 * Database service
 * @param config
 * @returns {Promise}
 * @constructor
 */
var DbService = function(config){

    var database = null;
    var url = "mongodb://localhost:27017/test";

    /**
     * Constructor
     * @returns {Promise}
     */
    var init = function(config){
        if(typeof config !== "undefined" && typeof config.database !== "undefined"){
            url = "mongodb://" + config.database.host + ":" + config.database.port + "/" + config.database.dbName;
            return connect();
        }
    };

    /**
     * Connect
     * @returns {Promise}
     */
    var connect = function(){
        return new Promise(function(resolve, reject){
            MongoClient.connect(url, function(err, db){
                if(err == null){
                    database = db;
                    resolve(db);
                }
                else{
                    reject("Error: can not connect to MongoDB!!!");
                }
            });
        });
    };

    // initialize
    return init(config);
};

module.exports = DbService;