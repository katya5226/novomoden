var express = require('express');
var router = express.Router();
var pool = require('../database');

function makedoubles(arr) {
	let newarr = [];
	for(var i=0; i<arr.length; i++) {
		newarr.push(arr[i]);
		newarr.push(arr[i]);
	}
	return newarr;
}

router.post('/', function(req, res, next) {

	const str = req.body.searchFor;
	var words = str.split(" ");

	var statement = '';

	for(var i = 0; i < words.length; i++) {
		if(words[i].length >= 4) { words[i] = '%' + words[i].substring(0, words[i].length -1) + '%'; }
		else if(words[i].length <= 2) { words[i] = 'nothingtosearch' }
		else { words[i] = '%' + words[i] + '%'; }

		if(i === words.length - 1) {statement += ' description LIKE ? OR subcategory_name LIKE ?' }
		else { statement += ' description LIKE ? OR subcategory_name LIKE ? OR ' }

	}

	var wordsDoubled = makedoubles(words);

	pool.query('SELECT ad_id, category, subcategory, photo1_url FROM listings WHERE status = \'active\' AND' + statement, wordsDoubled, function (error, results, fields) {
	   if(error) {
		   console.log("ERROR!")
		   res.send({
			   'code': 400,
			   'result': 'empty'});
		   //throw error;
		}else {
			res.send(JSON.stringify(results));
		}

	});

});


module.exports = router;