var express = require('express');
var router = express.Router();

var WebPage = require('../models/web_page.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
    var conditions = {
      title:new RegExp(req.query.q, 'i'),
      description:new RegExp(req.query.q, 'i')
    };
    var q = req.query.q || null;
    var currentPage = req.query.page || 1;
    var limit = 10;

	WebPage.findPaginated(conditions,function(err, web_pages){
		console.log(web_pages);
		res.render('web_pages/index', { web_pages:web_pages, q: q  });
	},limit,currentPage);
});

module.exports = router;
