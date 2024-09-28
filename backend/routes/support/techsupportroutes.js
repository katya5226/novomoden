var express = require('express');
var router = express.Router();
var pool = require('../../database');
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({

	host: 'smtp.mail.yahoo.com',
	port: 465,
	service:'yahoo',
	secure: false,
	auth: {
		user: 'katja_vozel@yahoo.com',
		pass: 'vgsrcwffmgzzmsgy'
	},
	debug: false,
	logger: true

});


router.post('/', function(req, res) {

    var typect = req.body.typect;
    var userId = req.body.userId;
    var msg = req.body.msg;

    if(userId > 0 && userId !== '0') {
        pool.query('SELECT email FROM enjoyers WHERE id = ?', userId, function (error, results, fields) {
            if(error) {console.log("ERROR!"); throw error; }
            else {
				var email = results[0].email;
				var ticketId = 0;

				var newTicket = {
					"typect": typect,
					"user_id": userId,
					"question_type": 'technical',
					"msg": msg
				}

				pool.query('INSERT INTO tickets SET ?', newTicket, function (error, results, fields) {
					if(error) {console.log("ERROR!"); throw error;}
					else {
						pool.query('SELECT * FROM tickets ORDER BY ticket_id DESC LIMIT 1', function (error, results, fields) {
							if(error) {throw error;}
							else {
								ticketId = results[0].ticket_id;

								var mailSubject = 'Vprašanje številka ' + ticketId.toString();
								var mailText = 'Poslali ste nam novo vprašanje s številko ' + ticketId.toString() +
								'. Odgovor boste prejeli v najkrajšem možnem casu.' +
								'Vsebina sporočila: ' + msg +
								'\nTo sporočilo je avtomatsko generirano, zato nanj ne odgovarjajte.'
								var siteEmail = 'katja.vozel@impvoda.com';
								var to = [email, siteEmail];

								var mailOptions = {
								  from: 'katja_vozel@yahoo.com',
								  to: to,
								  subject: mailSubject,
								  text: mailText
								};

								transporter.sendMail(mailOptions, function(error, info){
								  if (error) {
									console.log(error);
								  } else {
									console.log('Email sent: ' + info.response);
								  }
								});


							}

						});

					}
				});


				res.send({
					"success" : true
				});
			}

        });
    }
});


module.exports = router;