(function () {

var input = document.getElementById('input');
var random = document.getElementById('random');
var aud = document.getElementById('aud');
var vidcnt = $('.vidcnt');
var vid = $('#vid');

var CLIENTID = '0395f25a0fd1442cbba6458d7f021217';

input.addEventListener('keyup',function(){ 
  getVidFromURL(input.value);});

random.addEventListener('mouseup',function(){
  $.ajax({
    dataType: "jsonp",
    url:  'https://api.instagram.com/v1/tags/hyperlapse/media/recent?client_id='+CLIENTID
  }).done(function(data){
    var vids = data.data.filter(function(img){return img.type==='video';});
    var vid = vids[Math.floor(Math.random()*vids.length)];
    updateShareURL(vid.id);
    startVid(vid.videos.low_resolution.url);
  });
});



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
          if (data2.data.videos.low_resolution) {
             
           updateShareURL(id); startVid(data2.data.videos.low_resolution.url);
          } else {
            vidcnt.removeClass('on');
          }
       });
};

var startVid = function (src) {
  vid.attr('src', src).get(0).play();
  vidcnt.addClass('on');
  aud.play();
};


// var URL = 'http://s.codepen.io/hubudibu/full/kqjHx#';
// var share = document.getElementById('sharecnt');
var updateShareURL = function (id) {
  // share.textContent = URL + id;
  window.location.href = '#'+id;
};

// share.addEventListener('mouseup',function(){
//   var range = document.createRange();
//   range.selectNode(share);
//   window.getSelection().addRange(range);
// });

// try {
//   if (parent.window.location.hash) {
//    getVidFromID(parent.window.location.hash.substr(1)); 
//   }
// } catch (e) {
//   console.log('iframe problems, nvm');
// }

if (window.location.hash) {
 getVidFromID(window.location.hash.substr(1)); 
}

})();