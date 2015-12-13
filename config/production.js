module.exports = {
	cookieSecret: 'your cookie secret goes here',
	mongo: {
		connectionString: 'mongodb://localhost:27017/wisata',
	},
	site: {
	    title: 'XplOOor',
	    url: 'https://xplooor.com',
	    slogan: 'Kunjungi Tempat Wisata Liburan Murah',
	    description: 'Cari temukan objek wisata eksotis seluruh Indonesia yang wajib dikunjungi untuk destinasi liburan & tour anda hanya di XplOOor.com',
	    static_host: 'https://statics.xplooor.com'
	},
	folders: {
		root_folder: '/var/www/domain.com/tripkoo',
		static_folder: '/var/www/domain.com/tripkoo/public/images'
	}
};
