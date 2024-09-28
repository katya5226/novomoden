var express = require('express');
var router = express.Router();
var pool = require('../../database');


router.post('/', function(req,res){
	const userId = req.session.userId;
	const iLId = req.body.iLId;
	pool.query('SELECT first_name FROM enjoyers WHERE mango_id = ?', iLId,
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