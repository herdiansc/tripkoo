var express = require('express');
var router = express.Router({mergeParams: true});
var fs = require('fs');

var WebPage = require(config.folders.root_folder+'/models/web_page.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
    var canonical = null;
    if( req.params.keyword != null ) {
        req.query.q = req.params.keyword;
        var canonical = null;//config.site.url + req._parsedOriginalUrl.pathname;
    }
     else {
//	if(typeof req.query.q != 'undefined') {
//		var uri = '/paket-wisata/'.req.query.q
//	}else {
	
//	}
         var canonical = config.site.url + '/paket-wisata';
     }
    if(typeof req.query.q != 'undefined') req.query.q = req.query.q.replace(/-/g,' ');
    var conditions = {
        title:new RegExp(req.query.q, 'i'),
        description:new RegExp(req.query.q, 'i')
    };

    var q = req.query.q || null;
    var currentPage = req.query.page || 1;
    var limit = 10;

    WebPage.findPaginated(conditions,function(err, web_pages){
        res.render('web_pages/index', { web_pages:web_pages, q: q, canonical:canonical  });
    },limit,currentPage).sort({last_updated:-1});
});

router.get('/img', function(req, res, next){
    var request = require("request");
    var easyimg = require('easyimage');

    var query = req.query;

    var req = request
      .get(query.src)
      .on('error', function(err) {
        console.log(err)
      }).on('response',function(res){
        if( res.statusCode >= 200 && res.statusCode < 300 ) {
            var imageLocation = config.folders.static_folder+'/images/'+ query.id +".jpg";
            var save = req.pipe(fs.createWriteStream(imageLocation));
            save.on('finish',function(){
                easyimg.rescrop({
                    src:imageLocation, dst:imageLocation,
                    width:165, height:110, fill:true
                });
            });
        }
      });

    fs.readFile(__dirname + '/../public/images/no_image_listing.png', function(err,data) {
        if(err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('500 - Internal Error');
        } else {
            res.writeHead(200,{ 'Content-Type': 'image/png' });
            res.end(data);
        }
    });
});

module.exports = router;
