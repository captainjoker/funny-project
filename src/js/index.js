(function() {
	//initMusic();
	var music = new MusicControl();
	music.play();

	
}());
function initMusic() {
		var musicbg = document.getElementById('musicbg'),
			musicContainer = document.getElementById('musicContainer'),
			width = musicContainer.offsetWidth * 0.8,
			height = musicContainer.offsetWidth * 0.8,
			animation = null,
			context = null;
		musicbg.setAttribute('width', width);
		musicbg.setAttribute('height', height);
		contextbg = musicbg.getContext('2d');
		contextbg.fillStyle = 'red';
		contextbg.fillRect(0, 0, 100, 100);
		getImg(function(imgObj) {
			contextbg.drawImage(imgObj, 0, 0, width, height);
		}, 'music2.jpg');
		animationbg = new Animation(contextbg);
	}

	function getImg(callback, src) {
		var imgObj = new Image();
		imgObj.onload = function() {
			callback(imgObj);
		};
		imgObj.src = '../img/' + src;
	}

	function Animation(context) {
		var w = window,
			then = Date.now(),
			requestAnimationFrame = w.requestAnimationFrame ||
			w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;
		this.context = context;
		this.run = function(method, fn, speed) {
			var now = Date.now(),
				time = now - then;
			if (!this[method]) {
				return;
			}
			this[method](time, speed);
			fn();
			then = now;
			this.animationId = requestAnimationFrame(arguments.callee.apply(this, [method, fn, speed]));

		};
		this.stop = function() {
			cancelAnimationFrame(this.animationId);
		};

		this.rotate = function(time, speed) {
			speed = speed || 5;
			this.context.rotate((time / 1000 * speed) + 'deg');
		};
	}

	function MusicControl() {
		var self = this,
			play = document.querySelector('.music-controll .js-music-play'),
			pause = document.querySelector('.music-controll .js-music-pause'),
			bar = document.querySelector('.music-controll .js-music-bar'),
			buffer = document.querySelector('.music-controll .js-music-buffer'),
			processBar = document.querySelector('.music-controll .js-music-process'),
			img = document.getElementById('cd');

		var updateProcess = function(e) {
			var bufferRange = self.music.buffered,
				bufferTime = bufferRange.end(bufferRange.length - 1);
			bar.style.width = self.music.currentTime * 100 / self.music.duration.toFixed(2).toString() + '%';
			buffer.style.width = bufferTime * 100 / self.music.duration.toFixed(2).toString() + '%';
		};

		var go = function(e) {
			console.log(e);
			//self.music.currentTime = (e.offsetX/processBar.offsetWidth).toFixed(2)*self.music.duration;
			self.music.currentTime = 250;
			e.stopPropagation();
		};

		this.music = document.getElementById('music');

		this.play = function() {
			self.music.play();
			img.style.webkitAnimationPlayState = "running";
			img.style.MozAnimationPlayState = "running";
			img.style.animationPlayState = "running";
		};
		this.pause = function() {
			self.music.pause();
			img.style.webkitAnimationPlayState = "paused";
			img.style.MozAnimationPlayState = "paused";
			img.style.animationPlayState = "paused";
		};

		this.destory = function() {
			this.pause();
			play.removeEventListener('click', this.play);
			pause.removeEventListener('click', this.pause);
			this.music.removeEventListener('timeupdate', updateProcess);
		};

		this.init = function() {
			play.addEventListener('click', this.play);
			pause.addEventListener('click', this.pause);
			processBar.addEventListener('click', go);
			this.music.addEventListener('timeupdate', updateProcess, true);
		};
		this.init();
	}

	this.classHand = function(doc, method, className) {
		var classNameArr = doc.className.split(' ') || [],
			index = classNameArr.indexOf(className);
		switch (method) {
			case 'remove':
				index >= 0 && classNameArr.splice(index, 1);
				doc.className = classNameArr.join(' ');
				break;
			case 'add':
				index >= 0 || classNameArr.push(className);
				doc.className = classNameArr.join(' ');
				break;
			case 'has':
				return index >= 0 ? true : false;
				break;
		}
		return doc;
	};