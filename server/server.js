var mine = require('./mine');
var config = require('./config');
var http = require('http');
var url = require('url');
var path = require('path');
var fs = require('fs');
var root = __dirname;

const server = {
	isStatic(pathname) {
		let isStatic = false;
		skeys = Object.keys(config.static);
		for (let k of skeys) {
			if (pathname.indexOf(skeys[k]) !== -1) {
				isStatic = true;
				break;
			}
		}
		if(pathname == '\/' || pathname == '\\' || !pathname){
			isStatic = true;
		}
		return isStatic;
	},
	run() {
		console.log(config.port);
		http.createServer((req, res) => {
			let realurl = url.parse(req.url);
			//是否静态文件
			if (server.isStatic(realurl.pathname)) {
				console.log(realurl);
				let pathname = (realurl.pathname == '\/' || realurl.pathname == '\\' || !realurl.pathname) ? 'index.html' : realurl.pathname.replace(/\.\./g, ''),
					realPath = path.join(config.root, pathname),
					ext = path.extname(realPath);
				ext = ext ? ext.slice(1) : 'unknown';
				console.log(realPath);
				fs.stat(realPath, (err, stat) => {
					if (err) {
						console.log('error');
						if (err.code == 'ENOENT') {
							res.statusCode = 404;
							res.end();
						} else {
							res.statusCode = 500;
							res.end('Internal Server Error');
						}

					} else {
						res.setHeader('Content-Length', stat.size);
						console.log(mine.get(ext));
						res.setHeader('Content-Type', mine.get(ext) || 'text/plain');
						var stream = fs.createReadStream(realPath);
						stream.pipe(res);
						stream.on('error', function(err) {
							res.statusCode = 500;
							res.end('Internal Server Error');
							console.log('找不到静态文件');
						});
					}
				});
			} else {
				res.end('request is not static file');
				//不是静态文件
			}
		}).listen(config.port);
		console.log('HTTP server is listening at port ${config.port}');
	}
};

server.run();

module.exports = server;













