function calculateTotalValue(length) {
  var minutes = Math.floor(length / 60),
    seconds_int = length - minutes * 60,
    seconds_str = seconds_int.toString(),
    seconds = seconds_str.substr(0, 2),
    time = minutes + ':' + seconds

  return time;
}

function calculateCurrentValue(currentTime) {
  var current_hour = parseInt(currentTime / 3600) % 24,
    current_minute = parseInt(currentTime / 60) % 60,
    current_seconds_long = currentTime % 60,
    current_seconds = current_seconds_long.toFixed(),
    current_time = (current_minute < 10 ? "0" + current_minute : current_minute) + ":" + (current_seconds < 10 ? "0" + current_seconds : current_seconds);

  return current_time + '   /';
}

function initProgressBar() {
  var player = document.getElementById('player');
  var length = player.duration
  var current_time = player.currentTime;

  // calculate total length of value
  var totalLength = calculateTotalValue(length)
  jQuery(".end-time").html(totalLength);

  // calculate current value time
  var currentTime = calculateCurrentValue(current_time);
  jQuery(".start-time").html(currentTime);

  var progressbar = document.getElementById('seekObj');
  progressbar.value = (player.currentTime / player.duration);
  progressbar.addEventListener("click", seek);

  if (player.currentTime == player.duration) {
    $('#play-btn').removeClass('pause');
  }

  function seek(evt) {
    var percent = evt.offsetX / this.offsetWidth;
    player.currentTime = percent * player.duration;
    progressbar.value = percent / 100;
  }
}

function initPlayers(num) {
  // pass num in if there are multiple audio players e.g 'player' + i

  for (var i = 0; i < num; i++) {
    (function() {

      // Variables
      // ----------------------------------------------------------
      // audio embed object
      var playerContainer = document.getElementById('player-container'),
        player = document.getElementById('player'),
        slidervertical = document.getElementById('slider-vertical'),
        playpause = document.getElementById('.play-pause'),
        isPlaying = false,
        play = document.getElementsByClassName('play');
        playBtn = document.getElementsByClassName('play-btn');

      // Controls Listeners
      // ----------------------------------------------------------
      if (playBtn != null ) {

        for (var i = 0 ; i < playBtn.length; i++) {
            playBtn[i].addEventListener('click', function() {
          togglePlay()
        }); 
        }
      }






      $(".play").click(function(){
            //alert("The play was clicked.");
            togglePlay();
            
            /*$('body.nojQuery div.parent').on('click mouseover', function () {
              
              $(".play").css("display", "block");

            }); */

      });

      // Controls & Sounds Methods
      // ----------------------------------------------------------
      
      

      function togglePlay() {
        if (player.paused === false) {
          player.pause();
          isPlaying = false;
          $('.play-btn').css("background-image", "url(img/play.png)");
          $('.play img.hello').attr("src", "img/play.png"); 
          /*$("#hide_show").css("display","none");*/
  

        } else {
          player.play();
          $('.play-btn').css("background-image", "url(img/pause.png)"); 

          $('.play img.hello').attr("src", "img/pause.png"); 
          isPlaying = true;
         
         $("#hide_show").css("display","block");

        }
      }
    }());
  }
}
initPlayers(jQuery('#player-container').length);