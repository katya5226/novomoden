var express = require('express');
var router = express.Router();
var pool = require('../database');



const bcrypt = require('bcrypt');

  router.post('/', function(req,res){

    if(req.body.type == "logout") {
        req.session.loggedin = false;
        res.send({
            "loggedInUser": "guest",
            "uid": "0",
            "code": 200,
            "success":"Uspešno ste se odjavili."
        });
	} else {
        var email= req.body.enjoyer.email;
        var password = req.body.enjoyer.password;
        pool.query('SELECT * FROM enjoyers WHERE email = ?',email, function (error, results, fields) {
            if (error) {
            console.log("error ocurred",error);
            res.send({
                "code":400,
                "failed":"error ocurred"
            })
            }else {
                if(results.length >0){

					bcrypt.compare(password, results[0].password, function(err, result) {

					    if(result == true){
							var name = results[0].first_name;
							var uid = results[0].mango_id;

							var confirmed = results[0].confirmed;

							if(!confirmed) {
								res.send({
									"success":"Unconfirmed"
								});
							}
							else if(req.session.loggedin == true && req.session.userId == uid) {
								res.send({
									"success":"Ste že prijavljeni!"
								});
							}else if(req.session.loggedin == true && req.session.userId != uid){
								res.send({
									"success":"Za prijavo z drugim uporabniškim imenom se najprej odjavite!"
								});
							}else {
								req.session.loggedin = true;
								req.session.username = name;
								req.session.userId = uid;
								res.send({
									"loggedInUser": name,
									"uid": uid,
									"code": 200,
									"success":"login sucessfull"
								});
							}
						}else {
							res.send({
								"code":204,
								"success":"E-naslov in geslo se ne ujemata."
							});
                    	}

					});

                }else {
                    res.send({
                    "code":204,
                    "success":"E-naslov ne obstaja."
                    });
                }
            }
        });

    }
});


module.exports = router;

