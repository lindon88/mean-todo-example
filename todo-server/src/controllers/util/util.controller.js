/**
 * Created by Lindon on 11/26/2016.
 */

/**
 * Util controller
 * @param factory
 * @returns {UtilController}
 * @constructor
 */
var UtilController = function(factory){

    var factory_ = factory;

    /**
     * Check connection
     * @param req
     * @param res
     */
    this.checkConnection = function(req, res){
        res.send({status: true});
    };

    return this;
};

module.exports = UtilController;
