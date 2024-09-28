var express = require('express');
var router = express.Router();
var pool = require('../../database');
var nodemailer = require('nodemailer');
var jwt = require('jwt-simple');

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
	res.charset = 'value';

	var email = req.body.email;
	if(email) {

		pool.query('SELECT * FROM enjoyers WHERE email = ?',email, function (error, results, fields) {
			if (error) {
				console.log("error ocurred",error);
				res.send({
					"code":400,
					"failed":"error ocurred"
				})
			}else {
				if(!results.length) {
					res.send({
						success: 'Oprostite, vašega naslova nismo našli v naši bazi!'
					})
				}
				else {
					var attempts = results[0].reset_attempts;

					if(attempts >= 10) {
						res.send({
							success: 'Prekoračili ste število dovoljenih zahtev za menjavo gesla.'
						})
					}
					else {

						var uid = results[0].id;
						var password = results[0].password;
						var created = results[0].created.getTime();
						var payload = {
							uId: uid,
							eMail: email
						}
						var secret = password + '-' + created;
						var token = jwt.encode(payload, secret);

						var linkToReset = 'http://185.185.41.32:4007/passwordreset/' + payload.uId + '/' + token

						var mailOptions = {
						  from: 'katja_vozel@yahoo.com',
						  to: email,
						  subject: 'reset password',
						  text: linkToReset
						};

						transporter.sendMail(mailOptions, function(error, info){
						  if (error) {
							console.log(error);
						  } else {
							console.log('Email sent: ' + info.response);
							res.send({
								success: 'Na vaš e-naslov smo poslali povezavo za spremembo gesla.'
							})
						  }
						});

						var resetPasswordExpires = Date.now() + 900000; //expires in 15 minutes

						attempts++;

						pool.query('UPDATE enjoyers SET reset_exp = ?, reset_attempts = ? WHERE id = ?',[resetPasswordExpires, attempts, uid], function (error, results, fields) {
							if (error) {
								console.log("error ocurred",error);
								res.send({
									"code":400,
									"failed":"error ocurred"
								})
							}else {
								console.log('expiration set');
							}
						});

					}

				}

			}
		});

	}

});



module.exports = router;

