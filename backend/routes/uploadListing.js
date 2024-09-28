var express = require('express');
var multer = require('multer');
var router = express.Router();
var pool = require('../database');
const sharp = require('sharp');
var fs = require('fs');


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
          cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        const fileName = Date.now() + '-' + file.originalname
          cb(null, fileName)
    }
})

var upload = multer({ storage: storage }).array('file');

router.post('/', function(req, res) {

    console.log("HELLO FROM SERVER!");

	for(let i = 0; i < 3; i++) {
		//console.log(req.files[i]);
	}

    upload(req, res, function (err) {

		//console.log(req);

        if (err instanceof multer.MulterError) {
            return res.status(500).json(err)
        } else if (err) {
            return res.status(500).json(err)
        } else {
            let originalImages = new Array(3);
            var outputImages = new Array(3);
            var fileExtensions = new Array(3);
            for(let i = 0; i < 3; i++) {
                originalImages[i] = req.files[i].path
                fileExtensions[i] = req.files[i].originalname.replace(/^.*\./, '');
                outputImages[i] = './uploads/cropped' + req.body.userId + Date.now() + i + '.' + fileExtensions[i];
            }
            const widths = [parseInt(req.body.width1), parseInt(req.body.width2), parseInt(req.body.width3)]
            const heights = [parseInt(req.body.height1), parseInt(req.body.height2), parseInt(req.body.height3)]
            const lefts = [parseInt(req.body.left1), parseInt(req.body.left2), parseInt(req.body.left3)]
            const tops = [parseInt(req.body.top1), parseInt(req.body.top2), parseInt(req.body.top3)]

            for(let i = 0; i < 3; i++) {
                const image = sharp(originalImages[i]);
                let ratio = 1;
                image.metadata()
                .then(function(metadata) {
                    const rW = metadata.width;
                    const rH = metadata.height;

                    if(rW*(60/45) < rH) {
                        ratio = rH/600;
                    } else {
                        ratio = rW/450;
                    }
                    let w, h, l, t;

                    parseInt(widths[i]*ratio) < parseInt(rW) ? w = parseInt(widths[i]*ratio) : w = parseInt(rW);
                    parseInt(heights[i]*ratio) < parseInt(rH) ? h = parseInt(heights[i]*ratio) : h = parseInt(rH);
                    parseInt(lefts[i]*ratio) + w < parseInt(rW) ? l = parseInt(lefts[i]*ratio) : l = 0;
                    parseInt(tops[i]*ratio) + h < parseInt(rH) ? t = parseInt(tops[i]*ratio) : t = 0;

                    //return image.extract({ width: parseInt(widths[i]*ratio), height: parseInt(heights[i]*ratio), left: parseInt(lefts[i]*ratio), top: parseInt(tops[i]*ratio) }).resize({ width: 400 }).toFile(outputImages[i])
                    return image.extract({ width: w, height: h, left: l, top: t }).toFile(outputImages[i])
                })
                .then(function(new_file_info) {
                    fs.unlink(originalImages[i], function (err) {
                        if (err) throw err;
                        // if no error, file has been deleted successfully
                    })
                })
            }
        }
        if(req.body.type === 'first') {

            var today = new Date();

            var listing={
                "user_id": req.body.userId,
                "username": req.body.userName,
                "date_created": today,
                "date_modified": today,
                "category": req.body.category,
                "subcategory": req.body.subcategory,
                "subcategory_name": req.body.subcategoryName,
                "size": req.body.clothsize,
                "material": req.body.material,
                "state": req.body.condition,
                "brand": req.body.brand,
                "description": req.body.descrtext,
                "weight": req.body.weight,
                "price": req.body.price,
                "photo1_url": outputImages[0],
                "photo1_orig": outputImages[0],
                "photo2_url": outputImages[1],
                "photo2_orig": outputImages[1],
                "photo3_url": outputImages[2],
                "photo3_orig": outputImages[2]
            }

            pool.query('INSERT INTO listings SET ?',listing, function (error, results, fields) {
                if (error) {
                    console.log("error ocurred",error);
                    res.send({
                        "code":400,
                        "failed":"error ocurred"
                    })
                }else {
                    res.send({"success": "Listing saved successfully"});
                }
            });
        } else if(req.body.type === 'edit') {

            var today = new Date();

            var listing={
                "user_id": req.body.userId,
                "username": req.body.userName,
                "date_modified": today,
                "category": req.body.category,
                "subcategory": req.body.subcategory,
                "subcategory_name": req.body.subcategoryName,
                "size": req.body.clothsize,
                "material": req.body.material,
                "state": req.body.condition,
                "brand": req.body.brand,
                "description": req.body.descrtext,
                "weight": req.body.weight,
                "price": req.body.price,
                "photo1_url": outputImages[0],
                "photo1_orig": outputImages[0],
                "photo2_url": outputImages[1],
                "photo2_orig": outputImages[1],
                "photo3_url": outputImages[2],
                "photo3_orig": outputImages[2]
            }

            pool.query('UPDATE listings SET ? WHERE ad_id=?', [listing, req.body.adId], function (error, results, fields) {
                if (error) {
                    console.log("error ocurred",error);
                    res.send({
                        "code":400,
                        "failed":"error ocurred"
                    })
                }else {
                    res.send({"success": "Listing updated successfully"});
                }
            });
        }

    })

})

module.exports = router;