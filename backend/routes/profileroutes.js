var express = require('express');
var router = express.Router();
var pool = require('../database');
var nodemailer = require('nodemailer');

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

	const requestType = req.body.requestType;

	if (req.session.loggedin) {

		const userId = req.session.userId;
		console.log(userId);

		if(requestType === 1) {  //fetch user info

			pool.query('SELECT * FROM enjoyers WHERE mango_id = ?', userId, function (error, results, fields) {
				if (error) {
					console.log("error ocurred",error);
					res.send({
						"code":400,
						"failed":"error ocurred"
					})
				}else {
					res.send(JSON.stringify(results));
				}
			});

		}

		else if(requestType === 2) {  //update user info

			var today = new Date();

			const first_name = req.body.profileInfo.first_name;
			const last_name = req.body.profileInfo.last_name;
			const street = req.body.profileInfo.street_ship;
			const town = req.body.profileInfo.town_ship;
			const region = req.body.profileInfo.region;
			const post_number = req.body.profileInfo.post_number_ship;
			const phone_number = req.body.profileInfo.phone_number;
			const iban = req.body.profileInfo.iban;
			const bic = req.body.profileInfo.bic;


			pool.query('UPDATE enjoyers SET street_ship = ?, town_ship = ?, post_number_ship = ?, phone_number = ?, modified = ? WHERE mango_id = ?', [street, town, post_number, phone_number, today, userId], function (error, results, fields) {
				if (error) {
					console.log("error ocurred",error);
					res.send({
						"code":400,
						"failed":"error ocurred"
					})
				}else {

					/*if(req.body.profileInfo.iban && req.body.profileInfo.bic) {
						console.log("Creating bank account!");
						var account = new BankAccount({
							OwnerName: req.session.username,
							OwnerAddress: new Address({
								"AddressLine1": street + ", " + town,
								"AddressLine2": "",
								"City": town,
								"Region": town,
								"PostalCode": post_number,
								"Country": "SI"
							}),
							Details: new BankAccountDetailsIBAN({
								IBAN: req.body.profileInfo.iban,
								BIC: req.body.profileInfo.bic
							})
						});
						api.Users.createBankAccount(userId, account).then(function(data){
							console.log("Bank Account created!");
						});
					}*/


					res.send({"success": true});
				}
			});

			if(iban && bic) {

				var account = new BankAccount({
					OwnerName: first_name + " " + last_name,
					OwnerAddress: new Address({
						"AddressLine1": street + ", " + town,
						"AddressLine2": "",
						"City": town,
						"Region": region,
						"PostalCode": post_number,
						"Country": "SI"
					}),
					Details: new BankAccountDetailsIBAN({
						IBAN: req.body.profileInfo.iban,
						BIC: req.body.profileInfo.bic
					})
				});


				pool.query('SELECT bank_account, iban, bic from enjoyers WHERE mango_id = ?', userId, function (error, results, fields) {
					if (error) { console.log("error ocurred",error); }
					else {
						if(results[0].bank_account && results[0].iban !== iban) {
							api.Users.getBankAccounts(userId).then(function(result) {
								for (i = 0; i < result.length; i++) {
									api.Users.deactivateBankAccount(userId, result[i].Id).then(function(account) {
										console.log("Account " + account + " deactivated");
									});
								}
								api.Users.createBankAccount(userId, account).then(function(data){
									console.log("Bank Account created!");
									var nowDate = new Date();
									pool.query('UPDATE enjoyers SET bank_account = 1, iban = ?, bic = ?, modified = ? WHERE mango_id = ?', [iban, bic, nowDate, userId], function (error, results, fields) {
										if (error) { console.log("error ocurred",error); }
										else {console.log("New bank account logged");}
									});
								});


							});
						}

						else if(!results[0].bank_account) {
							console.log("Creating bank account!");
							api.Users.createBankAccount(userId, account).then(function(data){
								console.log("Bank Account created!");
								var nowDate = new Date();
								pool.query('UPDATE enjoyers SET bank_account = 1, iban = ?, bic = ?, modified = ? WHERE mango_id = ?', [iban, bic, nowDate, userId], function (error, results, fields) {
									if (error) { console.log("error ocurred",error); }
									else {console.log("New bank account logged");}
								});
							});
						}


					}
				});
			}

		}

		else if(requestType === 3) {  //update password

			bcrypt.hash(req.body.password, saltRounds, function(err, hash) {

				pool.query('UPDATE enjoyers SET password = ? WHERE mango_id = ?', [hash, userId], function (error, results, fields) {
					if (error) {
						console.log("error ocurred",error);
						res.send({
							"code":400,
							"failed":"error ocurred"
						});
					}else {
						console.log("SUCCESS");
						res.send({"success": true});
					}
				});

			});

		}

	}



});

module.exports = router;

