/**
 * Created by Lindon on 11/26/2016.
 */

var jsonFile = require('jsonfile');
var Promise = require("promise");

/**
 * Json service
 * @type {{sendJson: Function, readJson: Function}}
 */
var JsonService = {

    /**
     * Send json from file
     * @param res
     * @param fileName
     */
    sendJson: function(res, fileName){
        jsonFile.readFile(fileName, function(err, obj) {
            if(err){
                return;
            }
            res.send(obj);
        });
    },

    /**
     * Read json
     * @param fileName
     * @returns {Promise}
     */
    readJson: function(fileName){
        return new Promise(function(resolve, reject){
            jsonFile.readFile(fileName, function(err, obj){
                if(err){
                    reject(err);
                }
                else{
                    resolve(obj);
                }
            });
        });
    }
};

module.exports = JsonService;
