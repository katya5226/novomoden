var express = require('express');
var router = express.Router();
var mangopay = require('mangopay2-nodejs-sdk');

var api = new mangopay({
    clientId: 'matejtest1',
    clientApiKey: 'SijNKKSVyjeFdbR9yiZDkhKrJUEdzQo8Ngc2VFQGBpy8aKxpiS',
    // Set the right production API url. If testing, omit the property since it defaults to sandbox URL
    //baseUrl: 'https://api.mangopay.com'
});


router.get('/', function(req,res){

	api.Hooks.create({
		EventType: 'PAYIN_NORMAL_CREATED',
		Url: 'http://92.37.56.206:4007/paymentcheck'
	}, function(data, response){
		hook = data;
		done()
	});

	api.Hooks.create({
		EventType: 'PAYIN_NORMAL_SUCCEEDED',
		Url: 'http://92.37.56.206:4007/paymentcheck'
	}, function(data, response){
		hook = data;
		done()
	});

	api.Hooks.create({
		EventType: 'PAYIN_NORMAL_FAILED',
		Url: 'http://92.37.56.206:4007/paymentcheck'
	}, function(data, response){
		hook = data;
		done()
	});

});



module.exports = router;