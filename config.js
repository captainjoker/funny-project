const config = {
	'version': '1.0.0',
	'static': {
		'css': 'style',
		'font': 'font',
		'script': 'script',
		'img': 'img',
		'music':'music',
		'favicon': 'favicon.ico'
	},
	'root': __dirname,
	'static_dir': 'src',
	'port': 3000,
	'404': 'error.html'
};

module.exports = config;