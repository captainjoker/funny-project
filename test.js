var fs = require('fs');
var join = require('path').join;
var root = __dirname;


var copyFile = function(_src, _dst, name) {
	var src = join(root, _src);
	var dst = join(root, _dst, name);
	//exists(dst);
	fs.stat(_src, function(err, st) {
		if (err) {
			throw err;
		}
		// 判断是否为文件
		if (st.isFile()) {
			// 创建读取流
			readable = fs.createReadStream(src);
			// 创建写入流
			writable = fs.createWriteStream(dst);
			// 通过管道来传输流
			readable.pipe(writable);
			console.log('创建文件' + name);
		}
	});
};

var emptyDir = function(fileUrl) {
	var files = fs.readdirSync(fileUrl); //读取该文件夹
	files.forEach(function(file) {
		var stats = fs.statSync(fileUrl + '/' + file);
		if (stats.isDirectory()) {
			emptyDir(fileUrl + '/' + file);
		} else {
			fs.unlinkSync(fileUrl + '/' + file);
			console.log("删除文件" + fileUrl + '/' + file + "成功");
		}
	});
}

var exists = function(dst) {
	fs.exists(dst, function(exists) {
		// 已存在
		if (exists) {
			console.log('已存在');
		} else {
			console.log('不存在');
		}

	});
};

var run = function(length) {
	var i = 0;
	for (; i < length; i++) {
		copyFile('index.js', './src/build', 'index' + i + '.js');
	}
};

var server = {
	emptyDir:emptyDir,
	run: run
};

server.emptyDir('./src/build');
server.run(1000);
module.exports = server;