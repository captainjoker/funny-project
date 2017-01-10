var http = require('http');
var url = require('url');
var join = require('path').join;
var parse = url.parse;
var fs = require('fs');
var root = __dirname;

var server = {
	run: function() {
		http.createServer(function(req, res) {
			var url = parse(req.url);
			console.log('url.pathname:'+url.pathname);
			var pathname = (url.pathname=='\/' || url.pathname=='\\' || !url.pathname) ? 'index.html':url.pathname;
			console.log('pathname:'+pathname);
			var path = join(root, 'src', pathname);
			console.log(path);
			fs.stat(path, function(err, stat) {
				if (err) {
					if (err.code == 'ENOENT') {
						res.statusCode = 404;
						var stream = fs.createReadStream(join(root, 'src/error.html'));
						stream.pipe(res);
					} else {
						res.statusCode = 500;
						res.end('Internal Server Error');
					}
				} else {
					res.setHeader('COntent-Length', stat.size);
					var stream = fs.createReadStream(path);
					stream.pipe(res);
					stream.on('error', function(err) {
						res.statusCode = 500;
						res.end('Internal Server Error');
						console.log('找不到静态文件');
					});
				}
			});

		}).listen(80);
		console.log('服务80端口已启动');
	}

};

server.run();

module.exports = server;