var express = require('express');
var router = express.Router();

var systemService = require('../../service/SystemService');

/* GET users listing. */
router.get('/', function(req, res, next) {

    systemService.getSystemInfo( function (err, data) {
        if(err){
            return res.send({error:err});
        }
        res.send(data);
    });
});

module.exports = router;
