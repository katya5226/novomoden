var express = require('express');
var multer = require('multer');
var router = express.Router();
var pool = require('../database');
const sharp = require('sharp');
var fs = require('fs');


router.post('/', function(req, res) {

	var adId = req.body.adId;
	pool.query('SELECT photo1_url, photo2_url, photo3_url FROM listings WHERE ad_id = ?', adId, function(error, results, fields){

		if(error) {
			res.send({
				"code":400,
				"failed" : "Error occured"
			});
			throw error;
		}else {

			fs.unlink(results[0].photo1_url, function (err) {
				if (err) throw err;
			});

			fs.unlink(results[0].photo2_url, function (err) {
				if (err) throw err;
			});

			fs.unlink(results[0].photo3_url, function (err) {
				if (err) throw err;
			});

		}

	});


	pool.query('DELETE FROM listings WHERE ad_id = ?', adId, function(error, results, fields){

		if(error) {
			res.send({
				"code":400,
				"failed" : "Error occured"
			});
			throw error;
		}else {
			res.send({
				success: true
			})

		}

	});


})

module.exports = router;