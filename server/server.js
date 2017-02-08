var mine = require('./mine');
var config = require('../config');
var http = require('http');
var url = require('url');
var path = require('path');
var fs = require('fs');
var root = __dirname;
var num = 0;
const server = {
	isStatic(pathname) {
		let isStatic = false;
		skeys = Object.keys(config.static);
		for (let k of skeys) {
			console.log(config.static[k]);
			if (pathname.indexOf(config.static[k]) != -1) {
				isStatic = true;
				break;
			}
		}
		if (pathname == '/' || !pathname) {
			isStatic = true;
		}
		return isStatic;
	},
	run() {
		http.createServer((req, res) => {
			let realurl = url.parse(req.url);
			//是否静态文件
			if (server.isStatic(realurl.pathname)) {
				let pathname = (realurl.pathname == '/' || !realurl.pathname) ? 'index.html' : realurl.pathname.replace(/\.\./g, ''),
					file_Path = path.join(config.root, config.static_dir, pathname),
					ext = path.extname(file_Path);
				ext = ext ? ext.slice(1) : 'unknown';
				fs.stat(file_Path, (err, stat) => {
					if (err) {
						if (err.code == 'ENOENT') {
							res.writeHead(404, 'Not Found', {
								'Content-Type': 'text/plain'
							});
						} else {
							res.writeHead(500, 'Internal Server Error', {
								'Content-Type': 'text/plain'
							});
						}
						res.end();
					} else {
						res.setHeader('Content-Length', stat.size);
						res.setHeader('Content-Type', mine.get(ext) || 'text/plain');
						res.statusCode = 200;
						var stream = fs.createReadStream(file_Path);
						stream.pipe(res);
						stream.on('error', function(err) {
							res.writeHead(500, 'Internal Server Error', {
								'Content-Type': 'text/plain'
							});
							res.end();
							console.log('找不到静态文件');
						});
					}
				});
			} else {
				//不是静态文件
				res.writeHead(404, 'Not Found', {
					'Content-Type': 'text/plain'
				});
				res.end();
			}
		}).listen(config.port);
		console.log('HTTP server is listening at port '+config.port);
	}
};

//server.run();

module.exports = server;