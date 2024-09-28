var express = require('express');
var router = express.Router();
var pool = require('../../database');


router.post('/', function(req,res){

	const orderId = req.body.orderId;
	const orderStatus = req.body.newStatus;
	var nowdate = Math.floor(Date.now()/1000);

	if(orderStatus === 1) {
		pool.query('UPDATE orders SET status = 1, sent = ? WHERE order_id = ?', [nowdate, orderId],
			function (error, results, fields){
				if (error) {
					console.log("error ocurred",error);
					res.send({
							"success":400,
							"failed":"error ocurred"
						})
				}
				else {
					res.send({"success":true});
				}
		});
	}
	else if(orderStatus === 2) {
		pool.query('UPDATE orders SET status = 2, dispute = 0 WHERE order_id = ?', [orderId],
			function (error, results, fields){
				if (error) {
					console.log("error ocurred",error);
					res.send({
							"success":400,
							"failed":"error ocurred"
						})
				}
				else {
					res.send({"success":true});
				}
		});
		pool.query('SELECT * FROM tickets WHERE order_number = ?', [orderId],
			function (error, results, fields){
				if (error) {
					console.log("error ocurred",error);
					res.send({
							"success":400,
							"failed":"error ocurred"
						})
				}
				else {
					if (results.length) {
						pool.query('UPDATE tickets SET status = 0, date_closed = ? WHERE order_number = ?', [nowdate, orderId],
							function (error, results, fields){
								if (error) {
									console.log("error ocurred",error);
								}
						});
					}
				}
		});
	}


});

module.exports = router;