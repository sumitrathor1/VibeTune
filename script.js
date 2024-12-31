// Initialize the Variables
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let songsList = document.getElementById('songsList');
let volumeControl = document.getElementById('volumeControl');

let songs = [];

fetch('_fetch.php')
    .then(response => response.json())
    .then(data => {
        songs = data;

        if (songs.length > 0) {

            let songIndex = 0;
            let audioElement = new Audio(songs[songIndex].songUrl);
            masterSongName.innerText = songs[songIndex].songName;

            let currentTime = document.getElementById('currentTime').innerText = "00:00";
            let totalTime = document.getElementById("totalTime").innerHTML = songs[songIndex].songTime;

            songs.forEach((element, i) => {
                songsList.innerHTML += `<div id="${(i + 1) * -1}" class="songItem d-flex align-items-center justify-content-between bg-gradient bg-secondary text-dark fw-bold rounded-start-pill m-3 text-wrap">
                                    <div class="position-relative">
                                        <img alt="${i}" src="${element.coverUrl}"cover-image class="rounded-circle mx-2 position-relative">
                                        <div class="position-absolute"></div>
                                    </div>
                                    <span class="songName">${element.songName}</span>
                                    <span class="timestamp mx-4 w-25 d-flex justify-content-center align-items-center"><span class="me-2">${element.songTime}</span> <i id="${i}"
                                            class="songItemPlay far fa-play-circle cursor-pointer"></i></span>
                                </div>`;
            })



            audioElement.addEventListener('timeupdate', () => {
                progress = parseFloat((audioElement.currentTime / audioElement.duration) * 100);
                myProgressBar.value = progress;

                let second = parseInt(audioElement.currentTime);
                let min = Math.floor(second / 60);
                let sec = Math.floor(second % 60);

                min = min < 10 ? '0' + min : min;
                sec = sec < 10 ? '0' + sec : sec;

                let currentTime = document.getElementById('currentTime');
                currentTime.innerText = `${min}:${sec}`;

                if (progress == 100) {
                    if (songIndex >= songs.length - 1) {
                        songIndex = 0
                    }
                    else {
                        songIndex += 1
                    }
                    
                    playSong(true);
                }
            })

            myProgressBar.addEventListener('change', () => {
                audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
            })

            volumeControl.addEventListener('change', () => {
                audioElement.volume = volumeControl.value;
            })

            let mute = document.getElementById("mute");
            mute.parentElement.addEventListener('click', () =>{
                if (audioElement.muted) {
                    mute.classList.remove('fa-volume-xmark');
                    mute.classList.add('fa-volume-low');
                    audioElement.muted = false;
                }
                else{
                    mute.classList.remove('fa-volume-high');
                    mute.classList.add('fa-volume-xmark');
                    audioElement.muted = true;
                }
            })

            document.getElementById("full-volume").addEventListener('click', () =>{
                audioElement.volume = 1;
                volumeControl.value = 1;
            })

            document.getElementById("low-volume").addEventListener('click', () =>{
                audioElement.volume = 0;
                volumeControl.value = 0;
            })

            const makeAllPlays = () => {
                Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
                    element.classList.remove('fa-pause-circle');
                    element.classList.add('fa-play-circle');

                    let targetElement = element.parentElement.previousElementSibling.previousElementSibling;
                    targetElement.childNodes[1].classList.remove('SongImage');
                    targetElement.childNodes[3].classList.remove('songOn');
                })
            }

            playSong = ((songIndexChange) => {
                makeAllPlays();
                let song = document.getElementById(songIndex);
                let targetElement = song.parentElement.previousElementSibling.previousElementSibling;
                targetElement.childNodes[1].classList.add('SongImage');
                targetElement.childNodes[3].classList.add('songOn');

                song.classList.remove('fa-play-circle');
                song.classList.add('fa-pause-circle');

                if(songIndexChange){
                    audioElement.src = songs[songIndex].songUrl;
                }

                masterSongName.innerText = songs[songIndex].songName;
                totalTime = document.getElementById("totalTime").innerHTML = songs[songIndex].songTime;
                audioElement.play();
                masterPlay.classList.remove('fa-play-circle');
                masterPlay.classList.add('fa-pause-circle');
                gif.style.opacity = 1;
            })

            pauseSong = (() => {
                makeAllPlays();
                audioElement.pause();
                masterPlay.classList.remove('fa-pause-circle');
                masterPlay.classList.add('fa-play-circle');
                gif.style.opacity = 0;
            })

            Array.from(document.getElementsByClassName('songItem')).forEach(element => {
                element.addEventListener('click', (e) => {
                    if(songIndex == (parseInt(element.id) + 1) * -1){
                        if(audioElement.paused){
                            playSong(false);
                        }
                        else{
                            pauseSong();
                        }
                    }
                    else{
                        songIndex = (parseInt(element.id) + 1) * -1;
                        playSong(true);
                    }
                })
            });

            // Handle play/pause click
            masterPlay.addEventListener('click', () => {
                if (audioElement.paused || audioElement.currentTime <= 0) {
                    playSong(false);
                }
                else {
                    pauseSong();
                }
            })

            document.getElementById('next').addEventListener('click', () => {
                if (songIndex >= songs.length - 1) {
                    songIndex = 0
                }
                else {
                    songIndex += 1
                }
                playSong(true);
            })

            document.getElementById('previous').addEventListener('click', () => {
                if (songIndex <= 0) {
                    songIndex = 0
                }
                else {
                    songIndex -= 1
                }

                playSong(true);
            })
        }
        else {
            songsList.innerHTML = "No song available"
        }

    })
    .catch(error => console.error('Error fetching songs:', error));
