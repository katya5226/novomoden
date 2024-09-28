var express = require('express');
var router = express.Router();
var pool = require('../database');
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({

	host: 'smtp.mail.yahoo.com',
	port: 465,
	service:'yahoo',
	secure: false,
	auth: {
		user: 'katja_vozel@yahoo.com',
		pass: 'vgsrcwffmgzzmsgy'
	},
	debug: false,
	logger: true

});


router.post('/', function(req,res){

	paymentId = req.body.eventId;

	pool.query('SELECT * FROM orders WHERE payment_id = ?', paymentId, function (error, results, fields) {
		if (error) {
			console.log("error ocurred",error);
			res.send({
				"code":400,
				"failed":"error ocurred"
			})
		}else {
			if(results[0].payment_status === 'SUCCEEDED') {

				var buyerId = results[0].buyer_id;
				var sellerId = results[0].seller_id;
				var orderId = results[0].order_id;
				var adIds = (results[0].ad_ids).toString();

				pool.query('SELECT first_name, last_name, street_ship, town_ship, post_number_ship ' +
				'FROM enjoyers WHERE mango_id = ?', buyerId, function (error, results, fields) {
					if (error) {
						console.log("error ocurred",error);
						res.send({
							"code":400,
							"failed":"error ocurred"
						})
					}else {

						var firstName = results[0].first_name;
						var lastName = results[0].last_name;
						var street = results[0].street_ship;
						var town = results[0].town_ship;
						var postNumber = results[0].post_number_ship;

						pool.query('SELECT email from enjoyers WHERE mango_id = ?', sellerId, function (error, results, fields) {
							if (error) {
								console.log("error ocurred",error);
								res.send({
									"code":400,
									"failed":"error ocurred"
								})
							}else {
								var mailSubject = 'Prejeli ste novo narocilo';
								var mailText = 'Prejeli ste novo narocilo. Številka narocila je ' + orderId +
								'. Prodani izdelki: ' + adIds +'. Narocilo si lahko ogledate na svojih straneh pod zavihkom \'prodano\'. ' +
								'Izdelke pošljite na naslov: ' + firstName + ' ' + lastName + ', ' + street + ', ' + postNumber + ' ' + town +
								'. Po oddaji pošiljke le-to potrdite na svojih straneh pod zavihkom \'prodano\'.';

								var mailOptions = {
								  from: 'katja_vozel@yahoo.com',
								  to: results[0].email,
								  subject: mailSubject,
								  text: mailText
								};

								transporter.sendMail(mailOptions, function(error, info){
								  if (error) {
									console.log(error);
									}
								});
							}
						});

					}
				});

				res.send({"success": true, "orderId": results[0].order_id});
			}
			else res.send({"success": false});
		}
	});


});


module.exports = router;

