var express = require('express');
var router = express.Router();


router.get('/', function(req, res) {

	if (req.session.loggedin) {
		res.send({"loggedInUser": req.session.username, "userId": req.session.userId});
	}else {
		res.send({"loggedInUser": "guest", "userId": "0"});
	}
});

module.exports = router;