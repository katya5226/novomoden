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


function intervalFunc() {
  console.log('Cant stop me now!');
  //var date = Math.floor(Date.now() / 1000);
  //console.log(date);
}

//var myInterval = setInterval(intervalFunc, 1500);


function checkPurchaseProtectionExp() {

	console.log("Checking for expired protection");

	var date = Math.floor(Date.now() / 1000);
	//var protectExp = 3*24*60*60;
	var protectExp = 10*60;

	//querying only the orders that don't have an open dispute and were sent
	pool.query('SELECT pay_status_modified FROM orders WHERE payment_status=\'SUCCEEDED\' AND status = 1', function (error, results, fields) {
		if (error) {
			console.log("error ocurred",error);
		}else {

			for(i = 0; i<results.length; i++) {
				var aDate = results[i].pay_status_modified;
				if((date - aDate) >= protectExp) {
					pool.query('UPDATE orders SET status = 2 WHERE pay_status_modified = ?', aDate, function (error, results, fields) {
						if (error) {
							console.log("error ocurred",error);
						}else {
						}
					});
				}
			}
		}
	});
}

function checkReclamationExp() {

	console.log("Checking for unresolved reclamations");

	var date = Math.floor(Date.now() / 1000);
	//var recExp = 7*24*60*60*1000;
	//var recExp = 3*24*60*60;
	var recExp = 2*60;

	pool.query('SELECT ticket_id, user_id, order_number, date_created FROM tickets WHERE status = 1', function (error, results, fields) {
		if (error) {
			console.log("error ocurred",error);
		}else {
			for(i = 0; i<results.length; i++) {
				var ticketId = results[i].ticket_id;
				var aDate = results[i].date_created;
				var orderNumber = results[i].order_number;
				var userId = results[i].user_id;
				//console.log("Elapsed: " + (date - aDate).toString());
				if((date - aDate) >= recExp) {
					pool.query('UPDATE orders SET status = 4, dispute = 0 WHERE order_id = ?', orderNumber, function (error, results, fields) {
						if (error) {
							console.log("error ocurred",error);
						}else {
							pool.query('SELECT email FROM enjoyers WHERE mango_id = ?', userId, function (error, results, fields) {
								if (error) {
									console.log("error ocurred",error);
								}else {
									var msgText = 'Vaše naročilo št. ' + orderNumber + ' je preklicano. Denar bo vrnjen na vaš bančni račun.';
									var siteEmail = 'katja.vozel@impvoda.com';
									var to = [results[0].email, siteEmail];
									var mailOptions = {
									  from: 'katja_vozel@yahoo.com',
									  to: to,
									  subject: 'Naročilo je preklicano.',
									  text: msgText
									};
									transporter.sendMail(mailOptions, function(error, info){
									  if (error) {
										console.log(error);
									  } else {
										console.log('Email sent: ' + info.response);
									  }
									});
									// make refund
								}
							});
						}
					});
					pool.query('UPDATE tickets SET status = 0 WHERE ticket_id = ?', ticketId, function (error, results, fields) {
						if (error) {
							console.log("error ocurred",error);
						}else {
							// send email?
						}
					});
				}
			}
		}
	});
}

//setInterval(checkPurchaseProtectionExp, 43200);
//setInterval(checkPurchaseProtectionExp, 24*60*60*1000);
//setInterval(checkReclamationExp, 24*60*60*1000);
//setInterval(checkPurchaseProtectionExp, 6*60*1000);
//setInterval(checkReclamationExp, 2*60*1000);

//clearInterval(myInterval);
module.exports = router;