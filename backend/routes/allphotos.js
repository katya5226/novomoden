var express = require('express');
var router = express.Router();
var pool = require('../database');

router.post('/', function(req, res, next) {

	console.log(req.body.type);

	if(req.body.type === 1) {

		const category = req.body.category.toString();
		const subcategory = req.body.subcategory.toString();

		if( subcategory === '0' && category !== '0') {
			pool.query('SELECT ad_id, category, subcategory, photo1_url, price FROM listings WHERE status = \'active\' AND category = ?', category, function (error, results, fields) {
				   if(error) {
					   res.send({
						   'code': 400,
						   'result': 'empty'});
					   //throw error;
					}
				   res.send(JSON.stringify(results));
		});

		} else if (subcategory === '0' && category === '0') {

			pool.query('SELECT ad_id, category, subcategory, photo1_url FROM listings WHERE status = \'active\'', function (error, results, fields) {
				   if(error) {
					   res.send({
						   'code': 400,
						   'result': 'empty'});
					   //throw error;
					}
				   res.send(JSON.stringify(results));
			});

		} else {
			pool.query('SELECT ad_id, category, subcategory, photo1_url FROM listings WHERE status = \'active\' AND category = ? AND subcategory = ?', [category, subcategory], function (error, results, fields) {
			   if(error) {
				   res.send({
					   'code': 400,
					   'result': 'empty'});
				   //throw error;
				}
			   res.send(JSON.stringify(results));
			});
		}

	}

	if(req.body.type === 2) {
		pool.query('SELECT ad_id, category, subcategory, price, photo1_url FROM listings WHERE user_id = ? AND status = \'active\'', req.body.sellerId, function (error, results, fields) {
			   if(error) {
				   res.send({
					   'code': 400,
					   'result': 'empty'});
				   //throw error;
				}
			   res.send(JSON.stringify(results));
		});

	}




});


module.exports = router;
