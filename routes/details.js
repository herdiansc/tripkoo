var express = require('express');
var router = express.Router({mergeParams: true});
var fs = require('fs');

var WebPage = require(config.folders.root_folder+'/models/web_page.js');

router.get('/', function(req, res, next) {
    var conditions = {
        situs:req.params.situs,
        slug:req.params.slug
    };

    WebPage.findOne(conditions,function(err, detail){
    	res.locals.inspect = require('util').inspect;
        res.render('details/index', { detail:detail,web_pages:{}, q: null, canonical:null  });
    });
});

module.exports = router;