/**
 * Created by Lindon Camaj on 5/6/2016.
 */

var express = require("express");
var bodyParser = require('body-parser');
var server = require('./src/app');

// express server
var app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));

// parse application/json
app.use(bodyParser.json());

/**
 * Get application config and then start application
 */
server.Core.Utility.Json.readJson("config/config.json").then(function(config){
    if(typeof config !== "undefined" && config !== null){

        // start application
        server.start(app, config);

        // start server
        app.listen(config.app.port, function () {
            console.log("Server is up: " + config.app.port);
        });
    }
});
