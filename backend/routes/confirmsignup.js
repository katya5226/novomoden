var express = require('express');
var router = express.Router();
var pool = require('../database');
var jwt = require('jwt-simple');
const crypto = require('crypto');


router.get('/:id/:token', function(req, res) {
	res.charset = 'value';

	var uid = req.params.id;

	pool.query('SELECT * FROM enjoyers WHERE id = ?',uid, function (error, results, fields) {
		if (error) {
			console.log("error ocurred",error);
			res.send({
				"code":400,
				"failed":"error ocurred"
			})
		}else {
			var created = results[0].created.getTime();
			var emailFromDatabase = results[0].email;

			var secret = emailFromDatabase + '-' + created;

			var payload = jwt.decode(req.params.token, secret);

			var signup_exp = results[0].signup_exp - Date.now();

			if(signup_exp < 0) {
				res.send('<div>POVEZAVA JE POTEKLA</div>');
			}

			else if(payload.eMail === emailFromDatabase) {

				pool.query('UPDATE enjoyers SET confirmed = 1 WHERE id = ?', uid, function (error, results, fields) {
					if(error) {
						console.log("error ocurred",error);
					}
					else {
						var myString = '<html><head><meta charset="UTF-8"></head><body>' +
							'<h1>USPEŠNO STE POTRDILI SVOJ E-NASLOV. ZDAJ SE LAHKO PRIJAVITE.</h1>' +
							'<a href = "http://192.168.1.172:3000/login_page?confirmed">NAZAJ NA PRIJAVO</a>' +
							'</body></html>';

						var str = myString.toString();
						res.send(str);
					}
				});



			}else {
				res.send('<div>SOMETHING WENT WRONG</div>');

		}


		}
	});

});

module.exports = router;