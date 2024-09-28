var express = require('express');
var router = express.Router();
var pool = require('../database');

router.post('/', function(req,res){

	var today = new Date();

		var listing={
			"user_id": req.body.userId,
			"username": req.body.userName,
			"date_modified": today,
			"category": req.body.selection.category,
			"subcategory": req.body.selection.subcategory,
			"size": req.body.selection.clothsize,
			"material": req.body.selection.material,
			"state": req.body.selection.condition,
			"brand": req.body.selection.brand,
			"description": req.body.selection.descrtext,
			"weight": req.body.selection.weight,
			"price": req.body.selection.price
		}

		pool.query('UPDATE listings SET ? WHERE ad_id = ?', [listing, req.body.adId], function (error, results, fields) {
			if (error) {
				console.log("error ocurred",error);
				res.send({
					"code":400,
					"failed":"error ocurred"
				})
			}else {
				res.send({"success": "Listing updated successfully"});
			}
	});

});

module.exports = router;