//Animation transition
// Before changing pages, remove the animate-in effect and add animate-out effect so 
// that it animates out before going to the next page
window.addEventListener("beforeunload", function () {
    document.body.classList.remove("animate-in");
    document.body.classList.add("animate-out");
});

// Dropdown
// Toggle class open-menu so that when you click the icon, the height will increase from 0px to 400px
// and be visible
let subMenu = document.getElementById("subMenu");

function toggleMenu(){
    subMenu.classList.toggle("open-menu");
}

// Music player

// Select all the player elements from the HTML page
// and assign them to a variable
let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");
 
let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");
 
let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");
 
// values that is going to be used mostly in this java
let track_index = 0;
let isPlaying = false;
let updateTimer;
 
// Creating of the audio element for the player
let curr_track = document.createElement('audio');
 
// Creating the list of tracks that have to be played and importing the music
let track_list = [
  {
    name: "Viva La Vida",
    artist: "Coldplay",
    image: "images/Vivalavidaimg.jpg",
    path: "music/vivalavida.m4a"
  },
  {
    name: "Something just like this",
    artist: "The Chainsmokers & Coldplay",
    image: "images/somethingjustlikethis.jpg",
    path: "music/somethingjustlikethis.m4a"
  },
  {
    name: "Paradise",
    artist: "Coldplay",
    image: "images/paradise.jpeg",
    path: "music/paradise.m4a",
  },
  {
    name: "A Sky Full Of Stars",
    artist: "Coldplay",
    image: "images/askyfullofstars.jpg",
    path: "music/askyfullofstars.m4a",
  },
  {
    name: "Hymn For The Weekend",
    artist: "Coldplay",
    image: "images/hymnfortheweekend.jpg",
    path: "music/hymnfortheweekend.m4a",
  },
];

function loadTrack(track_index) {
    // Clearing the previous time of the previous song
    clearInterval(updateTimer);
    resetValues();
   
    // Loading a new music track to be played
    curr_track.src = track_list[track_index].path;
    curr_track.load();
   
    // Updating details of the track playing to show the details
    track_art.style.backgroundImage =
       "url(" + track_list[track_index].image + ")";
    track_name.textContent = track_list[track_index].name;
    track_artist.textContent = track_list[track_index].artist;
    now_playing.textContent =
       "PLAYING " + (track_index + 1) + " OF " + track_list.length;
   
    // Set an interval of 1 second for updating the seek slider
    updateTimer = setInterval(seekUpdate, 1000);
   
    // Move to the next track if the current finishes playing using "ended" where the track finishes
    // playing
    curr_track.addEventListener("ended", nextTrack);
  }
   
   
  // Resetting of values of all the timing for
  // when a new track is being played
  function resetValues() {
    curr_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;
  }

  function playpauseTrack() {
    // Switch between playing and pausing
    // depending on the current state
    if (!isPlaying) playTrack();
    else pauseTrack();
  }
   
  function playTrack() {
    // Play the loaded track
    curr_track.play();
    isPlaying = true;
   
    // Replace icon with the pause icon
    playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
  }
   
  function pauseTrack() {
    // Pause the loaded track
    curr_track.pause();
    isPlaying = false;
   
    // Replace icon with the play icon
    playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
  }
   
  function nextTrack() {
    // Go back to the first track if the
    // current one is the last in the track list
    if (track_index < track_list.length - 1)
      track_index += 1;
    else track_index = 0;
   
    // Load and play the newer track
    loadTrack(track_index);
    playTrack();
  }
   
  function prevTrack() {
    // Go back to the last track if the
    // current one is the first in the track list
    if (track_index > 0)
      track_index -= 1;
    else track_index = track_list.length - 1;
     
    // Load and play the newer track
    loadTrack(track_index);
    playTrack();
  }

  function seekTo() {
    // Calculate the seek position by the
    // percentage of the seek slider
    // and get the relative duration to the track
    seekto = curr_track.duration * (seek_slider.value / 100);
   
    // Set the current track position to the calculated seek position
    curr_track.currentTime = seekto;
  }
   
  function setVolume() {
    // Set the volume according to the
    // percentage of the volume slider set
    curr_track.volume = volume_slider.value / 100;
  }
   
  function seekUpdate() {
    let seekPosition = 0;
   
    // Check if the current track duration is a legible number
    // !isNaN return turns if curr_track.duration is a number
    if (!isNaN(curr_track.duration)) {
      seekPosition = curr_track.currentTime * (100 / curr_track.duration);
      seek_slider.value = seekPosition;
   
      // Calculate the time left and the total duration
      let currentMinutes = Math.floor(curr_track.currentTime / 60);
      let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
      let durationMinutes = Math.floor(curr_track.duration / 60);
      let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);
   
      // Add a zero to the single digit time values
      if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
      if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
      if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
      if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }
   
      // Display the updated duration
      curr_time.textContent = currentMinutes + ":" + currentSeconds;
      total_duration.textContent = durationMinutes + ":" + durationSeconds;
    }
  }

  loadTrack(track_index);

  // Making it so that the li is clickable for automatic play
  function track1(){
    loadTrack(0);
    playTrack();
  }
  function track2(){
    loadTrack(1);
    playTrack();
  }
  function track3(){
    loadTrack(2);
    playTrack();
  }
  function track4(){
    loadTrack(3);
    playTrack();
  }
  function track5(){
    loadTrack(4);
    playTrack();
  }
