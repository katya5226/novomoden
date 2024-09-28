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

// ticket status 1 = open, 0 = closed

router.post('/', function(req, res) {

    var typect = req.body.typect;
    var qType = req.body.questionType;
    var questionType;
    switch(qType) {
		case 1:
			questionType = 'selling';
			break;
		case 2:
			questionType = 'buying';
			break;
		case 3:
			questionType = 'reclamation';
			break;
		default:
			questionType = 'no type';
			break;
	}

    var userId = req.body.userId;
    var msg = req.body.msg;
    var orderNumber = req.body.orderNumber? req.body.orderNumber : 0;

    if(userId > 0 && userId !== '0') {
        pool.query('SELECT email FROM enjoyers WHERE mango_id = ?', userId, function (error, results, fields) {
            if(error) {console.log("ERROR!"); throw error; }
            else {
				var email = results[0].email;
				var ticketId = 0;

				var newTicket = {
					"typect": typect,
					"user_id": userId,
					"question_type": questionType,
					"order_number": orderNumber,
					"date_created": Math.floor(Date.now()/1000),
					"msg": msg
				}

				pool.query('INSERT INTO tickets SET ?', newTicket, function (error, results, fields) {
					if(error) {console.log("ERROR!"); throw error;}
					else {
						pool.query('SELECT * FROM tickets ORDER BY ticket_id DESC LIMIT 1', function (error, results, fields) {
							if(error) {throw error;}
							else {
								ticketId = results[0].ticket_id;

								var mailSubject = 'Zahtevek številka ' + ticketId.toString();
								var mailText = 'Odprli ste nov zahtevek. Številka zahtevka je ' + ticketId.toString() +
								'. Odgovor boste prejeli v najkrajšem možnem času. ' +
								'Vsebina zahtevka: ' + msg +
								'\nTo sporočilo je avtomatsko generirano, zato nanj ne odgovarjajte.';
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

						if(orderNumber !== 0) {
							pool.query('UPDATE orders SET status = 3 WHERE order_id = ?', orderNumber, function (error, results, fields) {
								if(error) {throw error;}
								else {}
							});
						}

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