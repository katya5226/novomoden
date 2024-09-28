var express = require('express');
var router = express.Router();
var pool = require('../../database');
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


function remindToSend() {

	console.log("Reminding to send");

	var date = Math.floor(Date.now() / 1000);
	//var sendExp = 1*24*60*60;
	var sendExp = 5*60;

	pool.query('SELECT order_id, pay_status_modified, seller_id FROM orders WHERE payment_status=\'SUCCEEDED\' AND status = 0', function (error, results, fields) {
		if (error) {
			console.log("error ocurred",error);
		}else {
			for(i = 0; i<results.length; i++) {
				var orderId = results[i].order_id;
				var aDate = results[i].pay_status_modified;
				var sellerId = results[i].seller_id;
				if((date - aDate) >= sendExp) {
					pool.query('SELECT email FROM enjoyers WHERE mango_id = ?', sellerId, function (error, results, fields) {
						if (error) {
							console.log("error ocurred",error);
						}else {

							var msgText = 'Prosimo odpošljite narocilo št. ' + orderId + ' in v uporabniških straneh potrdite pošiljanje!';
							var mailOptions = {
							  from: 'katja_vozel@yahoo.com',
							  to: results[0].email,
							  subject: 'Prosimo odpošljite izdelke',
							  text: msgText
							};
							transporter.sendMail(mailOptions, function(error, info){
							  if (error) {
								console.log(error);
							  } else {
								console.log('Email sent: ' + info.response);
							  }
							});


						}
					});

				}
			}
		}
	});
}

function remindToConfirmGet() {

	console.log("Reminding to confirm");

	var date = Math.floor(Date.now() / 1000);
	//var getExp = 1*24*60*60;
	var getExp = 2*60;

	pool.query('SELECT order_id, sent, buyer_id FROM orders WHERE payment_status=\'SUCCEEDED\' AND status = 1 AND dispute = 0', function (error, results, fields) {
		if (error) {
			console.log("error ocurred",error);
		}else {
			for(i = 0; i<results.length; i++) {
				var orderId = results[i].order_id;
				var aDate = results[i].sent;
				var buyerId = results[i].buyer_id;
				if((date - aDate) >= getExp) {

					pool.query('SELECT email FROM enjoyers WHERE mango_id = ?', buyerId, function (error, results, fields) {
						if (error) {
							console.log("error ocurred",error);
						}else {

							var msgText = 'Če ste prejeli narocilo št. ' + orderId + ' in ste z njim zadovoljni, vas prosimo da v uporabniških straneh potrdite prejem.';
							var mailOptions = {
							  from: 'katja_vozel@yahoo.com',
							  to: results[0].email,
							  subject: 'Prosimo potrdite prejem naročila',
							  text: msgText
							};
							transporter.sendMail(mailOptions, function(error, info){
							  if (error) {
								console.log(error);
							  } else {
								console.log('Email sent: ' + info.response);
							  }
							});


						}
					});

				}
			}
		}
	});
}

//setInterval(remindToConfirmGet, 12*24*60*60*1000);
//setInterval(remindToSend, 12*24*60*60*1000);
//setInterval(remindToConfirmGet, 1*60*1000);
//setInterval(remindToSend, 3*60*1000);

//clearInterval(myInterval);
module.exports = router;