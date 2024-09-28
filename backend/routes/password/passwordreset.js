var express = require('express');
var router = express.Router();
var pool = require('../../database');
var jwt = require('jwt-simple');
const crypto = require('crypto');


router.get('/:id/:token', function(req, res) {
	res.charset = 'value';

	var uid = req.params.id;

	console.log('TOKEN: ' + req.params.token);

	pool.query('SELECT * FROM enjoyers WHERE id = ?',uid, function (error, results, fields) {
		if (error) {
			console.log("error ocurred",error);
			res.send({
				"code":400,
				"failed":"error ocurred"
			})
		}else {
			var password = results[0].password;
			var created = results[0].created.getTime();
			var emailFromDatabase = results[0].email;

			var secret = password + '-' + created;

			var payload = jwt.decode(req.params.token, secret);

			var reset_exp = results[0].reset_exp - Date.now();
			console.log(reset_exp);

			if(reset_exp < 0) {
				res.send('<div>POVEZAVA JE POTEKLA</div>');
			}

			else if(payload.eMail === emailFromDatabase) {

				var myString = '<html><head><meta charset="UTF-8"></head><body>' +
					'<h1>MINIMALIST SPREMEMBA GESLA</h1>' +
					'<p>Geslo mora biti dolgo 8 znakov in vsebovati vsaj dva od naslednjih znakov: mala črka, velika črka, številka.</p>' +
					'<form action="/resetpass" method="POST">' +
					'<input type="hidden" name="uid" value="' + payload.uId + '" />' +
					'<input type="hidden" name="token" value="' + req.params.token + '" />' +
					'<input type="password" name="password" value="" placeholder="Vpiši novo geslo..." />' +
					'<input type="submit" value="Spremeni geslo" />' +
					'</form></body></html>';

    			var str = myString.toString();
				res.send(str);

			}else {
				res.send('<div>SOMETHING WENT WRONG</div>');
			}

		}
	});

});

module.exports = router;