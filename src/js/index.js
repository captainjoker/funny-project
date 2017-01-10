(function() {
	initMusic();
}());

function initMusic() {
	var music = document.getElementById('music'),
		musicContainer = document.getElementById('musicContainer'),
		width = musicContainer.offsetWidth*0.8,
		height = musicContainer.offsetWidth*0.8,
		context = null;
	music.setAttribute('width',width);
	music.setAttribute('height',width);
	context = music.getContext('2d');
	getMusic(function(imgObj){
		context.drawImage(imgObj,0,0,width,height);
	});

}

function getMusic(callback){
	var imgObj = new Image();
	imgObj.onload = function(){
		callback(imgObj);
	};
	imgObj.src='../img/music.jpg';
}