module.exports = {
	cookieSecret: 'your cookie secret goes here',
	mongo: {
		connectionString: 'mongodb://localhost:27017/wisata',
	},
	site: {
	    title: 'XplOOor',
	    url: 'http://localhost:3000',
	    slogan: 'Cari Paket Wisata di Seluruh Indonesia',
	    description: 'Selamat datang di tripkoo. Cari dan temukan paket wisata terbaik dan termurah ke seluruh indonesia.',
	    static_host: '/images'
	},
	folders: {
		root_folder: '/home/herdiansc/www/web_scraping/site/tripkoo',
		static_folder: '/home/herdiansc/www/web_scraping/site/tripkoo/public/images'
	}
};