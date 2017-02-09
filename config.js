const config = {
	'version': '1.0.0',
	'static_match':'\/style|\/font|\/script|\/img|\/music|\/favicon.ico',
	'root': __dirname,
	'static_dir': 'src',
	'port': 3000,
	'404': 'error.html',
	'max_age':60*60*24*365,
	'file_match':/^(gif|png|jpg|js|css|ttf|woff)$/ig
};

module.exports = config;