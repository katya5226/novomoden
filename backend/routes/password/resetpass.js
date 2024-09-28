var express = require('express');
var router = express.Router();
var pool = require('../../database');
var jwt = require('jwt-simple');
const crypto = require('crypto');


const bcrypt = require('bcrypt');
const saltRounds = 10;

function checkPassStrength(pass) {
	const mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{8,})");
    return mediumRegex.test(pass);
}


router.post('/', function(req, res) {
	res.charset = 'value';

	var uid = req.body.uid;
	var newPass = req.body.password;
	var isStrong = checkPassStrength(newPass);

	var warn = '<html><head><meta charset="UTF-8"></head><body><div>Geslo mora biti dolgo vsaj 8 znakov in vsebovati vsaj dva od naslednjih znakov: mala črka, velika črka, številka.</div></body></html>';
	var warnStr = warn.toString();

	if(!isStrong) {
		res.send(warnStr);
	}
	else {

		pool.query('SELECT * FROM enjoyers WHERE id = ?',uid, function (error, results, fields) {
			if (error) {
				console.log("error ocurred",error);
				res.send({
					"code":400,
					"failed":"error ocurred"
				})
			}else {

				var reset_exp = results[0].reset_exp - Date.now();

				if(reset_exp < 0) {
					res.send('<div>POVEZAVA JE POTEKLA</div>');
				} else {

					var password = results[0].password;
					var created = results[0].created.getTime();
					var emailFromDatabase = results[0].email;

					var secret = password + '-' + created;


						bcrypt.compare(newPass, password, function(err, result) {

							if(result == true){
								var samePass = '<html><head><meta charset="UTF-8"></head><body><div>GESLO JE PREVEČ PODOBNO STAREMU GESLU</div></body></html>';
								var samePassStr = samePass.toString();
								res.send(samePassStr);
							}else {
								bcrypt.hash(newPass, saltRounds, function(err, hash) {

									pool.query('UPDATE enjoyers SET password = ?, reset_exp = 0 WHERE id = ?',[hash, uid], function (error, results, fields) {
										if (error) {
											console.log("error ocurred",error);
											res.send({
												"code":400,
												"failed":"error ocurred"
											})
										}else {
											var passReset = '<html><head><meta charset="UTF-8"></head><body><div>USPEŠNO STE SPREMENILI GESLO.' +
											'<a href = \'http://185.185.41.32:3000/login_page\'>PRIJAVI SE Z NOVIM GESLOM</a></div></body></html>';
											var passResetStr = passReset.toString();
											res.send(passResetStr);
										}
									});


								});
							}

						});


				}


			}
		});



	}



});

module.exports = router;