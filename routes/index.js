var express = require('express');
var router = express.Router();
var Page = require('../models/page.js');
var mongoose = require('mongoose');

/* GET home page. */
router.get('/', function(req, res, next) {
	Page.findOne(function(err, page){
		if(err) throw err;
		if(!page){
			res.render('index', {button: 'Create resume'});
		}else{
			var list = page.skills;
			var size = 0;
            for(var i = 0; i < list.length; i++){
				size += list[i].skills.length;
            }
            console.log(size);
			res.render('index', { title: page.author, button: 'Update resume', page: page, size: size });
		}
	});
});

router.post('/create', function(req, res, next) {
	var page = new Page(req.body);
	page.save(function(error, result){
		if(error) throw error;
		res.redirect('/');
	});
});

router.post('/update', function(req, res, next) {
	Page.update({ _id: req.body.id}, req.body, function(err, page){
		if(err) throw err;
		res.redirect('/');
	});
});


module.exports = router;
