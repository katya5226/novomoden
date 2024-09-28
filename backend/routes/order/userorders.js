var express = require('express');
var router = express.Router();
var pool = require('../../database');


router.post('/', function(req,res){

	const userId = req.session.userId.toString();
	pool.query('SELECT * FROM orders WHERE buyer_id = ? AND status > -1 ORDER BY order_id', userId,
	function (error, results, fields){
		if (error) {
			console.log("error ocurred",error);
			res.send({
				"code":400,
				"failed":"error ocurred"
			})
		}
		else {
			res.send(JSON.stringify(results));
		}
	});

});

module.exports = router;