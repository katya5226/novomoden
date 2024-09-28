var express = require('express');
var router = express.Router();
var pool = require('../database');
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


const bcrypt = require('bcrypt');
const saltRounds = 10;


router.post('/', function(req,res){

	var email= req.body.email;
	pool.query('SELECT * FROM enjoyers WHERE email = ?',email, function (error, results, fields) {

		if (error) {
			console.log("error ocurred",error);
			res.send({
				"code":400,
				"failed":"error ocurred"
			})
		} else if(results.length === 0) {
			res.send({
				"warning":"no user"
			})
		} else if(results[0].confirmed === 1) {
			res.send({
				"code":400,
				"warning":"already confirmed"
			})
		}
		else {

			var uid = results[0].id;
			var created = results[0].created.getTime();
			var payload = {
				uId: uid,
				eMail: email
			}
			var secret = email + '-' + created;
			var token = jwt.encode(payload, secret);
			var linkToConfirm = 'http://192.168.1.172:4007/confirmsignup/' + payload.uId + '/' + token;
			var msgText = 'Uspešno ste se registrirali na minimalist.com! Prosimo potrdite svoj elektronski naslov s klikom na povezavo: ' + linkToConfirm;

			var mailOptions = {
			  from: 'katja_vozel@yahoo.com',
			  to: email,
			  subject: 'Registracija uspešna.',
			  text: msgText
			};

			transporter.sendMail(mailOptions, function(error, info){
			  if (error) {
				console.log(error);
			  } else {
				console.log('Email sent: ' + info.response);
			  }
			});

			//var confirmSignUpExp = Date.now() + 86400000; // 24h
			var confirmSignUpExp = Date.now() + 120000; // 2min

			pool.query('UPDATE enjoyers SET signup_exp = ? WHERE id = ?', [confirmSignUpExp, uid], function (error, results, fields) {
				if (error) {
					console.log("error ocurred",error);
				}else {
					res.send({"success": true});
				}
			});

		}
	});

});

module.exports = router;