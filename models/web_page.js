var mongoose = require('mongoose');
var webPageSchema = mongoose.Schema({
	title: String,
	url: String,
	description: String,
	price: String,
	status: String,
},{
	collection:'web_pages'
});

var mongoosePages = require('mongoose-pages');

mongoosePages.skip(webPageSchema); 

// webPageSchema.methods.getDisplayPrice = function(){
// 	return '$' + (this.priceInCents / 100).toFixed(2);
// };
var WebPage = mongoose.model('WebPage', webPageSchema);
module.exports = WebPage;
