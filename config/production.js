module.exports = {
	cookieSecret: 'your cookie secret goes here',
	mongo: {
		connectionString: 'mongodb://localhost:27017/wisata',
	},
	site: {
	    title: 'TripKOO',
	    url: 'http://www.tripkoo.com',
	    slogan: 'Cari Paket Wisata di Seluruh Indonesia',
	    description: 'Selamat datang di tripkoo. Cari dan temukan paket wisata terbaik dan termurah ke seluruh indonesia.',
	    static_host: '/images'
	},
	folders: {
		root_folder: '/var/www/domain.com/tripkoo',
		static_folder: '/var/www/domain.com/tripkoo/public/images'
	}
};