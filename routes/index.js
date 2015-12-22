var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'TripKOO' });
});
router.get('/tentang-kami', function(req, res, next) {
  res.render('about_us', { 
  	title: 'Tentang Kami',
  	q:null, 
  	web_pages:{}, 
  	canonical:null 
  });
});

module.exports = router;
