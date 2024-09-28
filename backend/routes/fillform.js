var express = require('express');
var router = express.Router();
var pool = require('../database');

router.post('/', function(req, res, next) {
	const adId = req.body.adId;

    pool.query('SELECT category, subcategory, size, material, state, brand, description, ' +
    'weight, price, photo1_url, photo2_url, photo3_url, username, photo1_orig, photo2_orig, photo3_orig, status, user_id ' +
    'FROM listings WHERE ad_id = ?', adId,
   		function (error, results, fields) {
       		if(error) {
				res.send({"code":400,
						"failed" : "Error occured"});
				throw error;
			}else{
				res.send(JSON.stringify(results));
			}
   		});
});


module.exports = router;