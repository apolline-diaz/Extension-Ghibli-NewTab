//Bouton lecteur Audio

document.addEventListener("DOMContentLoaded", function () {
    const audioPlayer = document.getElementById("audioPlayer");
    const playButton = document.getElementById("playButton");
  
    playButton.addEventListener("click", function () {
      if (audioPlayer.paused) {
        audioPlayer.play();
      } else {
        audioPlayer.pause();
      }
    });
  
    audioPlayer.addEventListener("play", function () {
      audioPlayer.style.display = "block";
      playButton.style.display = "none";
    });
  
    audioPlayer.addEventListener("pause", function () {
      audioPlayer.style.display = "none";
      playButton.style.display = "block";
    });
  }); 