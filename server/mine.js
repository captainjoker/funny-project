function objToMap(obj) {
	let map = new Map();
	for (let k of Object.keys(obj)) {
		map.set(k, obj[k]);
	}
	return map;
}

var mineObj = {
	"css": "text/css",
	"gif": "image/gif",
	"html": "text/html",
	"ico": "image/x-icon",
	"jpeg": "image/jpeg",
	"jpg": "image/jpeg",
	"js": "text/javascript",
	"json": "application/json",
	"pdf": "application/pdf",
	"png": "image/png",
	"svg": "image/svg+xml",
	"swf": "application/x-shockwave-flash",
	"tiff": "image/tiff",
	"txt": "text/plain",
	"wav": "audio/x-wav",
	"wma": "audio/x-ms-wma",
	"wmv": "video/x-ms-wmv",
	"xml": "text/xml",
	"mp3": "audio/x-mpeg",
	"mp4": "video/mp4"
};


var mineMap = objToMap(mineObj);

module.exports = mineMap;