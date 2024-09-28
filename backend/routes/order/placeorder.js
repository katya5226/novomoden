var express = require('express');
var router = express.Router();
var pool = require('../../database');
var mangopay = require('mangopay2-nodejs-sdk');

var api = new mangopay({
    clientId: 'matejtest1',
    clientApiKey: 'SijNKKSVyjeFdbR9yiZDkhKrJUEdzQo8Ngc2VFQGBpy8aKxpiS',
    // Set the right production API url. If testing, omit the property since it defaults to sandbox URL
    //baseUrl: 'https://api.mangopay.com'
});

// order status: 0 - placed&payed, 1 - sent,  2 - confirmed (goods received), 3 - dispute opened, 4 - canceled (refund)

function makePayIn(res, buyerId, sellerId, amount) {
	var payIn = new api.models.PayIn({
		CreditedWalletId: res[0].Id,
		AuthorId: buyerId,
		DebitedFunds: new api.models.Money({
			Amount: amount,
			Currency: 'EUR'
		}),
		Fees: new api.models.Money({
			Amount: 50 + amount*0.05,
			Currency: 'EUR'
		}),
		PaymentType: 'CARD',
		PaymentDetails: new api.models.PayInPaymentDetailsCard({
			CardType: 'CB_VISA_MASTERCARD'
		}),
		ExecutionType: 'WEB',
		ExecutionDetails: new api.models.PayInPaymentDetailsCard({
			ReturnURL: 'http://192.168.1.172:3000/paymentstatus',
			TemplateURL: 'https://TemplateURL.com',
			SecureMode:  'DEFAULT',
			Culture: 'en'
		})
	});
	return payIn;
}

function writeEventId(orderId, eventId) {
	pool.query('UPDATE orders SET payment_id=? WHERE order_id = ?', [eventId, orderId], function (error, results, fields) {
		if (error) {
			console.log("error ocurred",error);
		}else {
		}
	});
}

router.post('/', function(req,res){

	var order = JSON.stringify(req.body.order.ids);

	if(order.toString() === req.session.order.toString()) {

		var newOrder={
			"buyer_id": req.session.userId,
			"buyer": req.session.username,
			"date_created": Math.floor(Date.now()/1000),
			"date_modified": Math.floor(Date.now()/1000),
			"price": req.body.order.price,
			"postage": req.body.order.postage,
			"seller_id": req.body.order.seller_id,
			"seller": req.body.order.seller,
			"ad_ids": req.body.order.ids.toString(),
			"payment_id": '',
			"payment_status": '',
			"pay_status_modified": '',
			"status": req.body.order.status
		}

		var buyerId = req.session.userId;
		var sellerId = req.body.order.seller_id;
		var amount = (req.body.order.price + req.body.order.postage)*100;

		const ids = '(' + req.body.order.ids.toString() + ')';
		pool.query('SELECT ad_id FROM listings WHERE status=\'sold\' AND ad_id IN '+ids+'', function (error, results, fields) {
			if (error) {
				console.log("error ocurred",error);
				res.send({
					"code":400,
					"failed":"error ocurred"
				})
			}else {
				if(!results.length) {
					pool.query('INSERT INTO orders SET ?', newOrder, function (error, results, fields) {
						if (error) {
							console.log("error ocurred",error);
						} else {
							pool.query('SELECT * FROM orders ORDER BY order_id DESC LIMIT 1', function (error, results, fields) {
								if(error) {
									console.log("error ocurred",error);
								}
								else {
									var orderId = results[0].order_id;
									api.Users.getWallets(sellerId).then(function(result) {
										api.PayIns.create(makePayIn(result, buyerId, sellerId, amount)).then(function(resultp) {
											//console.log(resultp);
											writeEventId(orderId, resultp.Id);
											req.session.order = '';
											res.send({"redirectUrl": resultp.RedirectURL});
										})
									});
								}
							});
						}
					});

				}
				else {
					res.send({
						"code": 400,
						"success": 0
					})
				}
			}

		});
	}
	else {
		res.send({
			"code": 400,
			"success": 0
		})
	}


});


module.exports = router;