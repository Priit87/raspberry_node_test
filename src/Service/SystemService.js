var sys = require('sys');
var logger = require('log4js').getLogger('service_service');
var async = require('async');

var exec = require('child_process').exec;

function SystemService() {

    var self = this;

    this.getSystemInfo = function ( cb ) {
        
        var info = {};

        async.waterfall([
            function temperature(callback) {
                self.getCpuTemperature( function (err, temperature) {
                    if(err){
                        return callback(err);
                    }

                    info.temperature = temperature;
                    callback();
                });
            }
        ], function (err) {
            if(err){
                logger.error(err);
            }
            cb(err, info);
        });
    };
    
    this.getCpuTemperature = function (cb) {

        exec("vcgencmd measure_temp", function (error, stdout, stderr) {
            if(error){
                return cb( error);
            }
            if(stderr){
                return cb( stderr);
            }

            // temp=36.5'C
            cb(null, stdout);
        });
    };
}


module.exports = new SystemService();