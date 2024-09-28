var express = require('express');
var router = express.Router();
var pool = require('../database');
var mangopay = require('mangopay2-nodejs-sdk');

var api = new mangopay({
    clientId: 'matejtest1',
    clientApiKey: 'SijNKKSVyjeFdbR9yiZDkhKrJUEdzQo8Ngc2VFQGBpy8aKxpiS',
    // Set the right production API url. If testing, omit the property since it defaults to sandbox URL
    //baseUrl: 'https://api.mangopay.com'
});


/*var newEvent = {
	'event_id': req.query.RessourceId,
	'status': req.query.EventType,
	'date': req.query.Date
}*/


router.get('/', function(req, res){


	api.PayIns.get(req.query.RessourceId, function (data, response) {
		var newEvent = {
			'event_id': data.Id,
			'status': data.Status,
			'date': data.ExecutionDate
		}

		pool.query('INSERT INTO payments SET ?',newEvent, function (error, results, fields) {
			if (error) {
				console.log("error ocurred",error);
				res.send({
					"code":400,
					"failed":"error ocurred"
				})
			}else {
				//update order in orders table
				pool.query('UPDATE orders SET payment_status = ?, pay_status_modified = ?, status = 0 WHERE payment_id = ?',
				[data.Status, data.ExecutionDate, data.Id], function (error, results, fields) {
					if (error) {
						console.log("error ocurred",error);
					}else {

						if(data.Status === "SUCCEEDED") {


							pool.query('SELECT ad_ids FROM orders WHERE payment_id = ?', data.Id, function(error, results, fields) {
								if (error) {
									console.log("error ocurred",error);
								}else {
									var adIds = '(' + results[0].ad_ids.toString() + ')';
									pool.query('UPDATE listings SET status=\'sold\' WHERE ad_id IN '+adIds+'', function (error, results, fields) {
										if (error) {
											console.log("error ocurred",error);
										}
									});
								}
							});

						}

						console.log('ORDER UPDATED');
							res.send({
								"code":200,
							})
						}
				});

			}

		});


	});


});



module.exports = router;

