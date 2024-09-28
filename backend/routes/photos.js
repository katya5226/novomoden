var express = require('express');
var router = express.Router();
var pool = require('../database');


router.post('/', function(req, res) {
    var userId = req.body.userId;

    if(userId > 0) {
        pool.query('SELECT ad_id, category, subcategory, photo1_url, photo2_url, photo3_url FROM listings WHERE user_id = ? AND status = \'active\'', userId, function (error, results, fields) {
            if(error) {console.log("ERROR!"); throw error; }
            //if(results.length>0){
                //console.log("SENDING RESULTS: " + JSON.stringify(results));
                res.send(JSON.stringify(results));
            //}
        });
    }
});


module.exports = router;
