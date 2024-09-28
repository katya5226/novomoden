var express = require('express');
var router = express.Router();
var pool = require('../../database');


router.post('/', function(req,res){

	let order = '';

	if(req.body.type === 1) { //type 1 means posting new order, type 2 means fetching order

		if(!req.body.ids.length) {
			req.session.order = '';
			console.log('ORDER CANCELED: ' + req.session.order);
			res.send({
				"code": 200,
				"success": "order cancelled"
			});
		}
		else {
			const ids = '(' + req.body.ids.toString() + ')';
			pool.query('SELECT ad_id FROM listings WHERE status=\'sold\' AND ad_id IN '+ids+'', function (error, results, fields) {
				if (error) {
					console.log("error ocurred",error);
				}else {
					if(!results.length) {
						order = JSON.stringify(req.body.ids);
						req.session.order = order;
						console.log('ORDER: ' + req.session.order);
						res.send({
							"code": 200,
							"success": "order logged"
						});
					}
					else {
						res.send({
							"available": "0"
						})
					}
				}
			});

		}

	}
	else if(req.body.type === 2) { //type 1 means posting new order, type 2 means fetching order

		res.send(JSON.stringify(req.session.order));

	}

});


module.exports = router;