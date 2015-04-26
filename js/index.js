(function () {

var TAG = 'slowmotion';

var input = document.getElementById('input');
var random = document.getElementById('random');
var aud = document.getElementById('aud');
var vidcnt = $('.vidcnt');
var vid = $('#vid');

var CLIENTID = '0395f25a0fd1442cbba6458d7f021217';



var getRandomVid = function () {
  $.ajax({
    dataType: "jsonp",
    url:  'https://api.instagram.com/v1/tags/' + TAG + '/media/recent?client_id='+CLIENTID
  }).done(function(data){
    var vids = data.data.filter(function(img){return img.type==='video';});
    var vid = vids[Math.floor(Math.random()*vids.length)];
    updateShareURL(vid.id);
    startVid(vid.videos.low_resolution.url);
  });
};

var getVidFromURL = function (url) {
  $.ajax({
    dataType: "jsonp",
    url:  'http://api.instagram.com/oembed?url='+url
  }).done(function(data){
    getVidFromID(data.media_id);
  });
};

var getVidFromID = function (id) {
    $.ajax({
        dataType: "jsonp",
        url:  'https://api.instagram.com/v1/media/'+id+'?client_id='+CLIENTID
      }).done(function(data2){
          if (data2.data && data2.data.videos && data2.data.videos.low_resolution) {
            updateShareURL(id);
            startVid(data2.data.videos.low_resolution.url);
            unError();
          } else {
            vidcnt.removeClass('on');
            errorMsg();
          }
       });
};

var startVid = function (src) {
  vid.attr('src', src).get(0).play();
  vidcnt.addClass('on');
  aud.play();
};


var updateShareURL = function (id) {
  window.location.href = '#'+id;
};

var error = document.getElementById('error');
var errorMsg = function (msg) {
  error.textContent = msg;
  error.classList.add('on');
  vid.attr('src', '');
};
var unError = function () {
  error.classList.remove('on');
};




input.addEventListener('keyup',function(){
  getVidFromURL(input.value);
});

random.addEventListener('mouseup',function(){
  getRandomVid();
});


if (window.location.hash) {
  getVidFromID(window.location.hash.substr(1));
} else {
  getRandomVid();
}

})();
