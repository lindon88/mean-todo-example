/**
 * Created by Lindon on 11/26/2016.
 */

var jwt = require('jsonwebtoken');
var express = require("express");

/**
 * Net helper
 * @type {{config: null, apiRoutes: null, init: Function, allowCrossDomain: Function, securityCheck: Function, setResponseHeaders: Function}}
 */
var NetHelper = {

    config: null,
    apiRoutes: null,

    /**
     * Constructor
     * @param factory
     */
    init: function(factory){
        this.config = factory.config;
        factory.app.use(this.allowCrossDomain);

        this.apiRoutes = express.Router();
        this.apiRoutes.use(this.securityCheck);

        // implement security
        factory.app.use("/api", this.apiRoutes);
    },

    /**
     * Define cross domain roules
     * @param req
     * @param res
     * @param next
     */
    allowCrossDomain: function (req, res, next){
        res = NetHelper.setResponseHeaders(res);

        // intercept OPTIONS method
        if ('OPTIONS' == req.method) {
            res.sendStatus(204);
        }
        else {
            next();
        }
    },

    /**
     * Security check
     * @param req
     * @param res
     * @param next
     * @returns {*}
     */
    securityCheck: function(req, res, next){
        // check header or url parameters or post parameters for token
        var token = req.body.token || req.query.token || req.headers['authorization'];

        // decode token
        if(token){
            jwt.verify(token, NetHelper.config.app.secretKey, function(err, decoded) {
                if (err) {
                    return res.json({ status: "error", message: 'Failed to authenticate token.' });
                } else {
                    // if everything is good, save to request for use in other routes
                    req.decoded = decoded;
                    next();
                }
            });
        }
        else{
            return res.status(403).send({
                status: "error",
                message: 'No token provided.'
            });
        }
    },

    /**
     * Define response header
     * @param res
     * @returns {*}
     */
    setResponseHeaders: function(res){
        res.header('Access-Control-Allow-Origin', NetHelper.config.app.allowCrossDomain);
        res.header('Access-Control-Allow-Credentials', 'true');
        res.header('Access-Control-Allow-Headers', 'origin, content-type, accept, authorization');
        return res;
    }
};

module.exports = NetHelper;
