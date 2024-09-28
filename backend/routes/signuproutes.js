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


var mangopay = require('mangopay2-nodejs-sdk');
var BankAccount = require('mangopay2-nodejs-sdk/lib/models/BankAccount');
var BankAccountDetailsIBAN = require('mangopay2-nodejs-sdk/lib/models/BankAccountDetailsIBAN');
var Address = require('mangopay2-nodejs-sdk/lib/models/Address');

var api = new mangopay({
    clientId: 'matejtest1',
    clientApiKey: 'SijNKKSVyjeFdbR9yiZDkhKrJUEdzQo8Ngc2VFQGBpy8aKxpiS',
    // Set the right production API url. If testing, omit the property since it defaults to sandbox URL
    //baseUrl: 'https://api.mangopay.com'
});


const bcrypt = require('bcrypt');
const saltRounds = 10;


router.post('/', function(req,res){

	var email= req.body.enjoyer.email;
	pool.query('SELECT * FROM enjoyers WHERE email = ?',email, function (error, results, fields) {
		if (error) {
			console.log("error ocurred",error);
			res.send({
				"code":400,
				"failed":"error ocurred"
			})
		}else {
			if(results.length >0){
				res.send({"signUpSuccess": {"code": 0, "text": "Ta e-naslov že obstaja v naši bazi."}});
			}
			else {
				var today = new Date();

				bcrypt.hash(req.body.enjoyer.password, saltRounds, function(err, hash) {
				    // Store hash in your password DB.

					var mangoUserId = '';

					api.Users.create({
					    PersonType: "NATURAL",
					    FirstName: req.body.enjoyer.firstName,
					    LastName: req.body.enjoyer.lastName,
                        Birthday: req.body.enjoyer.birthday,
                        Address: {
                            "AddressLine1": req.body.enjoyer.street,
                            "AddressLine2": "",
                            "City": req.body.enjoyer.town,
                            "Region": req.body.enjoyer.region,
                            "PostalCode": req.body.enjoyer.postNumber,
                            "Country": req.body.enjoyer.country
                        },
					    Nationality: req.body.enjoyer.nationality,
					    CountryOfResidence: req.body.enjoyer.country,
					    Email: req.body.enjoyer.email,
					}).then(function (user) {

							var enjoyerset={
								"mango_id":user.Id,
								"first_name":req.body.enjoyer.firstName,
								"last_name":req.body.enjoyer.lastName,
								"street":req.body.enjoyer.street,
								"town":req.body.enjoyer.town,
								"post_number":req.body.enjoyer.postNumber,
								"street_ship":req.body.enjoyer.street,
								"town_ship":req.body.enjoyer.town,
								"post_number_ship":req.body.enjoyer.postNumber,
								"phone_number":req.body.enjoyer.phoneNumber,
								"email":req.body.enjoyer.email,
								"iban":req.body.enjoyer.iban,
								"bic":req.body.enjoyer.bic,
								"password":hash,
								"created":today,
								"modified":today
							}

							pool.query('INSERT INTO enjoyers SET ?',enjoyerset, function (error, results, fields) {
								if (error) {
									console.log("error ocurred",error);
									res.send({
										"code":400,
										"failed":"error ocurred"
									})
								}else {
									pool.query('SELECT * FROM enjoyers ORDER BY id DESC LIMIT 1', function (error, results, fields) {
										if(error) {res.send({"signUpSuccess": {"code": 0, "text": "NAPAKA!"}}); throw error;}
										else {
											res.send({"signUpSuccess": {"code": 1, "text": "Registracija uspešna! Preveri svoj poštni nabiralnik."}});

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

											//to: req.body.enjoyer.email,
											var mailOptions = {
											  from: 'katja_vozel@yahoo.com',
											  to: email,
											  subject: 'Registracija uspešna.',
											  text: msgText
											};

											transporter.sendMail(mailOptions, function(error, info){
											  if (error) {
												console.log(error);
											  }
											});

											//var confirmSignUpExp = Date.now() + 86400000; // 24h
											var confirmSignUpExp = Date.now() + 60000; // 1min

											pool.query('UPDATE enjoyers SET signup_exp = ? WHERE id = ?', [confirmSignUpExp, uid], function (error, results, fields) {
												if (error) {
													console.log("error ocurred",error);
												}
											});


										}


									});

								}
							});

					    api.Wallets.create({
					        Owners: [ user.Id ],
					        Description: "create wallet - demo",
					        Currency: "EUR",
                        })
                        .then(function (res) {
                             console.log("Wallet successfully created ", res);
                             if(req.body.enjoyer.iban && req.body.enjoyer.bic) {
								var account = new BankAccount({
									OwnerName: req.body.enjoyer.firstName + " " + req.body.enjoyer.lastName ,
									OwnerAddress: new Address({
										"AddressLine1": req.body.enjoyer.street + ", " + req.body.enjoyer.town,
										"AddressLine2": "",
										"City": req.body.enjoyer.town,
										"Region": req.body.enjoyer.region,
										"PostalCode": req.body.enjoyer.postNumber,
										"Country": "SI"
									}),
									Details: new BankAccountDetailsIBAN({
										IBAN: req.body.enjoyer.iban,
										BIC: req.body.enjoyer.bic
									})
								});
                                api.Users.createBankAccount(user.Id, account).then(function(data){
                                    console.log("Bank Account created!");
									var nowDate = new Date();
									pool.query('UPDATE enjoyers SET bank_account = 1, iban = ?, bic = ?, modified = ? WHERE mango_id = ?', [req.body.enjoyer.iban, req.body.enjoyer.bic, nowDate, user.Id],
									function (error, results, fields) {
										if (error) { console.log("error ocurred",error); }
										else {console.log("New bank account logged");}
									});

                                });
                             }


					    });
					});

				});


			}
		}
	});

});

module.exports = router;