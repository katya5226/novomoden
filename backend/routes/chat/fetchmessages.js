var express = require('express');
var router = express.Router();
var pool = require('../../database');


router.post('/', function(req,res){
	const userId = req.session.userId;
	const conversantId = req.body.conversantId;
	pool.query('SELECT * FROM messages WHERE (sender_id = ? AND receiver_id = ?) OR (sender_id = ? AND receiver_id = ?) ORDER BY msg_id', [userId, conversantId, conversantId, userId],
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
			pool.query('UPDATE messages SET status = 1 WHERE sender_id = ? AND receiver_id = ?', [conversantId, userId],
				function (error, results, fields) {
					if(error) conosle.log("error ocurred",error);
				}
			);
		}
	});
});


module.exports = router;