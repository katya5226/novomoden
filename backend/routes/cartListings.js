var express = require('express');
var router = express.Router();
var pool = require('../database');

router.post('/', function(req, res, next) {
	const cart = req.body;
	let stringCart = "(" + cart[0];
	if(cart.length > 1) {
		for (let i = 1; i < cart.length; i++) {
			stringCart += ", " + cart[i];
		}
	}
	stringCart += ")";

    pool.query('SELECT ad_id, user_id, username, category, subcategory, size, weight, price, photo1_url, username, status '
    + 'FROM listings WHERE ad_id in '+stringCart+' AND status = \'active\' ORDER BY username', function (error, results, fields) {
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