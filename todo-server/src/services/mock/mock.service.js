/**
 * Created by Lindon on 11/26/2016.
 */

var Core = require('../../core/core.service.js');

/**
 * MockService
 */
var MockService = {

    mockData: function(res, fileName){
        Core.Utility.Json.sendJson(res, fileName);
    }

};

module.exports = MockService;
