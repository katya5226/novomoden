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


router.post('/', function(req,res){
	const userId = req.session.userId;
	var today = new Date();
	var receiver = '';

	pool.query('SELECT first_name FROM enjoyers WHERE mango_id = ?', req.body.receiverId, function (error, results, fields) {
		if (error) {
			console.log("error ocurred",error);
			res.send({
				"code":400,
				"failed":"error ocurred"
			})
		}else {
			receiver = results[0].first_name;
			var conversId = 0;
			pool.query('SELECT convers_id FROM conversations WHERE (id1=? AND id2=?) OR (id1=? AND id2=?)', [userId, req.body.receiverId, req.body.receiverId, userId],
			function(error, results, fields){
				if(error){
					console.log("error occured", error);
				}
				else{
					if(!results.length) {
						var newConv = {
							"id1": userId,
							"conversant1": req.session.username,
							"id2": req.body.receiverId,
							"conversant2": receiver,
							"date_created": today
						}
						pool.query('INSERT INTO conversations SET ?', newConv, function (error, results, fields) {
							if (error) {
								console.log("error occured", error);
							}
							else {
								pool.query('SELECT * FROM conversations ORDER BY convers_id DESC LIMIT 1', function (error, results, fields) {
									if (error) {
										console.log("error occured", error);
									} else {
										conversId = results[0].convers_id;
										var newMsg={
											"convers_id": results[0].convers_id,
											"sender_id": req.session.userId,
											"sender": req.session.username,
											"receiver_id": req.body.receiverId,
											"receiver": receiver,
											"date_created": today,
											"msg": req.body.msg
										}
										pool.query('INSERT INTO messages SET ?', newMsg, function (error, results, fields) {
											if (error) {
												console.log("error ocurred",error);
												res.send({
													"code":400,
													"failed":"error ocurred"
												})
											}else {
												pool.query('SELECT email FROM enjoyers WHERE mango_id = ?', req.body.receiverId, function (error, results, fields) {
													if (error) {
														console.log("error ocurred",error);
														res.send({
															"code":400,
															"failed":"error ocurred"
														})
													}else {
														var msgText = 'Prejeli ste novo sporocilo na minimalist.com! Preverite svoj poštni nabiralnik.';
														var mailOptions = {
														  from: 'katja_vozel@yahoo.com',
														  to: results[0].email,
														  subject: 'Prejeli ste novo sporocilo',
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

												res.send({
													"code": 400,
													"success": 1
												})
											}
										});
									}
								});
							}
						});
					} else {
						var newMsg={
							"convers_id": results[0].convers_id,
							"sender_id": req.session.userId,
							"sender": req.session.username,
							"receiver_id": req.body.receiverId,
							"receiver": receiver,
							"date_created": today,
							"msg": req.body.msg
						}
						pool.query('INSERT INTO messages SET ?', newMsg, function (error, results, fields) {
							if (error) {
								console.log("error ocurred",error);
								res.send({
									"code":400,
									"failed":"error ocurred"
								})
							}else {
								pool.query('SELECT email FROM enjoyers WHERE mango_id = ?', req.body.receiverId, function (error, results, fields) {
									if (error) {
										console.log("error ocurred",error);
										res.send({
											"code":400,
											"failed":"error ocurred"
										})
									}else {
										var msgText = 'Prejeli ste novo sporocilo na minimalist.com! Preverite svoj poštni nabiralnik.';
										var mailOptions = {
										  from: 'katja_vozel@yahoo.com',
										  to: results[0].email,
										  subject: 'Prejeli ste novo sporocilo',
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

								res.send({
									"code": 400,
									"success": 1
								})
							}
						});

					}

				}
			});
		}
	});

});


module.exports = router;