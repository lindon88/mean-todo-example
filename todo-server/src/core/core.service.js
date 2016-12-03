/**
 * Created by Lindon on 11/26/2016.
 */

var jsonService = require('./services/json.service');
var netService = require('./services/net.service');
var ResponseService = require('./services/response.service');
var dbService = require('./db/db.service');

/**
 * Core service
 * @type {{Utility: {NetHelper: ({config: null, apiRoutes: null, init: Function, allowCrossDomain: Function, securityCheck: Function, setResponseHeaders: Function}|NetHelper|exports), Json: ({sendJson: Function, readJson: Function}|JsonService|exports), Response: ResponseMessages}, Db: (DbService|exports)}}
 */
var Core = {
    Utility: {
        NetHelper: netService,
        Json: jsonService,
        Response: new ResponseService()
    },
    Db: dbService
};

module.exports = Core;
