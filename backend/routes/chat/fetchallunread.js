var express = require('express');
var router = express.Router();
var pool = require('../../database');


router.post('/', function(req,res){
	const userId = req.session.userId;
	pool.query('SELECT * FROM messages WHERE receiver_id = ? AND status = 0', userId,
	function (error, results, fields){
		if (error) {
			console.log("error ocurred",error);
			res.send({
				"code":400,
				"failed":"error ocurred"
			})
		}
		else {
			res.send(JSON.stringify(results.length));
		}
	});

});


module.exports = router;