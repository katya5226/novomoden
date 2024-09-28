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


router.post('/', function(req,res){

	var userId = req.session.userId;
	var wallet;
	var availableBalance = 0;
	var amount = req.body.amount;

	if(!amount) {

		api.Users.getWallets(userId).then(function (result) {

			api.Wallets.get(result[0].Id).then(function(data){
				wallet = data;

				pool.query('SELECT price, postage FROM orders WHERE seller_id = ?  AND payment_status=\'SUCCEEDED\' AND status = 1', userId, function (error, results, fields) {
					if (error) {
						console.log("error ocurred",error);
					}else {
						if(results.length) {
							results.forEach(function (result, index) {
							  availableBalance += result.price + result.postage;
							});

							res.send({
								"wallet": wallet,
								"availableBalance": availableBalance
							})

						}
						else {
							res.send({
								"wallet": wallet,
								"availableBalance": availableBalance
							})
						}
					}
				});

			});

		});

	}
	else if(amount > 10){

		pool.query('SELECT iban, bic FROM enjoyers WHERE mango_id = ?', userId, function (error, results, fields) {
			if (error) {
				console.log("error ocurred",error);
			}else {
				if(!results[0].iban || !results[0].bic) {
					res.send({"success": "NOBANK"});
				}
				else {


					// here comes payout creation



				}

			}
		});




	}


});


module.exports = router;