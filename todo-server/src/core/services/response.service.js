/**
 * Created by Lindon on 11/26/2016.
 */

/**
 * Response message
 * @returns {ResponseMessages}
 * @constructor
 */
var ResponseMessages = function(){

    /**
     * Prepare message
     * @param status
     * @param data
     * @param message
     * @returns {{status: *, data: (*|null), message: (*|null)}}
     */
    this.message = function(status, data, message){
        return {
            status: status,
            data: data || null,
            message: message || null
        };
    };

    /**
     * Prepare ok message
     * @param data
     * @param message
     * @returns {{status: *, data: (*|null), message: (*|null)}}
     */
    this.ok = function(data, message){
        return this.message("success", data, message);
    };

    /**
     * Prepare error message
     * @param data
     * @param message
     * @returns {{status: *, data: (*|null), message: (*|null)}}
     */
    this.error = function(data, message){
        return this.message("error", data, message);
    };

    return this;

};

module.exports = ResponseMessages;