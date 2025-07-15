// Initialize Variables
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songsList = document.getElementById('songsList');
let volumeControl = document.getElementById('volumeControl');
let songInfoDiv = document.getElementById('songInfo');
let songNameInput = document.getElementById('songName');
let loadingDiv = document.getElementById('loading');

let songs = [];
let oldSongs = [];
let currentSongIndex = 0;
let audioElement = null;
let currentSongItem = null;

// Fetch songs from local API
fetch('assets/pages/api/_fetch.php')
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        oldSongs = data;
        songs = [...oldSongs];
        initializeSongs();
    })
    .catch(error => {
        console.error('Error fetching songs from local API:', error);
        songsList.innerHTML = '<p>Error loading songs from the server.</p>';
    });

// Initialize the first song and render song list
function initializeSongs() {
    if (songs.length > 0) {
        currentSongIndex = 0;
        audioElement = new Audio(songs[currentSongIndex].songUrl);
        masterSongName.innerText = songs[currentSongIndex].songName;
        totalTime.innerHTML = songs[currentSongIndex].songTime;
        updateSongsList();
        addGlobalEventListeners();
    } else {
        songsList.innerHTML = '<p>No songs available.</p>';
    }
}

// Render all songs in the UI
function updateSongsList() {
    songsList.innerHTML = '';
    songs.forEach((song, i) => {
        const isLong = song.songName.length > 25;
        const songNameHTML = isLong
            ? `<div class="songName-container"><div class="songName-text-wrapper"><div class="songName-text">${song.songName}&nbsp;&nbsp;&nbsp;&nbsp;${song.songName}</div></div></div>`
            : `<div class="songName-container short"><div class="songName-text-wrapper"><div class="songName-text">${song.songName}</div></div></div>`;

        songsList.innerHTML += `
            <div id="song-${i}" class="songItem mt-2 p-2 d-flex align-items-center justify-content-between border rounded-start-pill text-wrap">
                <div class="position-relative">
                    <img alt="${i}" src="${song.coverUrl}" class="rounded-circle me-2 position-relative" width="50" height="50">
                </div>
                ${songNameHTML}
                <span class="timestamp ms-2 w-25 d-flex justify-content-center align-items-center gap-2">
                    <i class="fa-regular fa-heart"></i>
                    <span>${song.songTime}</span>
                    <i id="play-${i}" class="songItemPlay far fa-play-circle cursor-pointer"></i>
                    <i class="fa-regular fa-square-plus"></i>
                </span>
            </div>
        `;
    });
    addSongItemEventListeners();
}

// Add click listeners to each song item
function addSongItemEventListeners() {
    document.querySelectorAll('.songItem').forEach((element, i) => {
        element.addEventListener('click', () => {
            if (currentSongIndex === i) {
                if (audioElement.paused) {
                    playSong(false);  // Resume
                } else {
                    pauseSong();      // Pause
                }
            } else {
                currentSongIndex = i;
                playSong(true);       // New song
            }
        });
    });
}

// Global control buttons
function addGlobalEventListeners() {
    masterPlay.addEventListener('click', () => {
        if (audioElement.paused || audioElement.currentTime <= 0) {
            playSong(false); // Resume same song
        } else {
            pauseSong();
        }
    });

    document.getElementById('next').addEventListener('click', () => {
        currentSongIndex = (currentSongIndex + 1) % songs.length;
        playSong(true);
    });

    document.getElementById('previous').addEventListener('click', () => {
        currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
        playSong(true);
    });

    myProgressBar.addEventListener('change', () => {
        audioElement.currentTime = (myProgressBar.value / 100) * audioElement.duration;
    });

    volumeControl.addEventListener('input', () => {
        audioElement.volume = volumeControl.value;
    });

    audioElement.addEventListener('timeupdate', () => {
        const progress = (audioElement.currentTime / audioElement.duration) * 100;
        myProgressBar.value = progress;
        document.getElementById('currentTime').innerText = formatTime(audioElement.currentTime);
        if (progress >= 100) {
            currentSongIndex = (currentSongIndex + 1) % songs.length;
            playSong(true);
        }
    });
}

// Play selected or resume song
function playSong(updateSrc) {
    if (currentSongItem) {
        currentSongItem.classList.remove("border-danger");
        currentSongItem.querySelector('img').classList.remove("songOn");
        currentSongItem.querySelector('.songName-text')?.classList.remove("songName-text-scroll");
        const icon = currentSongItem.querySelector('.songItemPlay');
        icon.classList.remove("fa-pause-circle");
        icon.classList.add("fa-play-circle");
    }

    currentSongItem = document.getElementById(`song-${currentSongIndex}`);

    if (updateSrc) {
        audioElement.src = songs[currentSongIndex].songUrl;
    }

    currentSongItem.classList.add("border-danger");
    currentSongItem.querySelector('img').classList.add("songOn");
    currentSongItem.querySelector('.songName-text')?.classList.add("songName-text-scroll");
    const playIcon = currentSongItem.querySelector('.songItemPlay');
    playIcon.classList.remove("fa-play-circle");
    playIcon.classList.add("fa-pause-circle");

    audioElement.play();
    masterSongName.innerText = songs[currentSongIndex].songName;
    totalTime.innerHTML = songs[currentSongIndex].songTime;
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    gif.style.opacity = 1;
}

// Pause song
function pauseSong() {
    audioElement.pause();
    if (currentSongItem) {
        currentSongItem.classList.remove("border-danger");
        currentSongItem.querySelector('img').classList.remove("songOn");
        currentSongItem.querySelector('.songName-text')?.classList.remove("songName-text-scroll");
        const icon = currentSongItem.querySelector('.songItemPlay');
        icon.classList.remove("fa-pause-circle");
        icon.classList.add("fa-play-circle");
    }
    masterPlay.classList.remove('fa-pause-circle');
    masterPlay.classList.add('fa-play-circle');
    gif.style.opacity = 0;
}

// Format seconds into MM:SS
function formatTime(seconds) {
    const min = Math.floor(seconds / 60).toString().padStart(2, '0');
    const sec = Math.floor(seconds % 60).toString().padStart(2, '0');
    return `${min}:${sec}`;
}

// Debounced search
let typingTimer;
const doneTypingInterval = 3000;

songNameInput.addEventListener('input', () => {
    clearTimeout(typingTimer);
    songInfoDiv.innerHTML = '';

    if (songNameInput.value) {
        toggleLoading(true);
        typingTimer = setTimeout(() => fetchFromDeezer(songNameInput.value), doneTypingInterval);
    } else {
        toggleLoading(false);
        songs = [...oldSongs];
        initializeSongs();
    }
});

// Toggle loading animation
function toggleLoading(show) {
    loadingDiv.classList.toggle('show', show);
}

// Fetch from Deezer
function fetchFromDeezer(songName) {
    const url = `https://deezerdevs-deezer.p.rapidapi.com/search?q=${songName}`;

    fetch(url, {
        method: 'GET',
        headers: {
            'x-rapidapi-host': 'deezerdevs-deezer.p.rapidapi.com',
            'x-rapidapi-key': 'b556e236e4msh30b0ca1d27d9e96p189bb3jsnb6409c2a5bf1',
        },
    })
        .then(response => response.json())
        .then(data => {
            toggleLoading(false);
            if (data.data.length > 0) {
                songs = data.data.map(song => ({
                    songName: song.title,
                    songUrl: song.preview,
                    songTime: "00:30",
                    coverUrl: song.album.cover_medium,
                }));
                updateSongsList();
            } else {
                songInfoDiv.innerHTML = '<p>No songs found on Deezer.</p>';
            }
        })
        .catch(error => {
            console.error('Error fetching from Deezer:', error);
            toggleLoading(false);
            songInfoDiv.innerHTML = '<p>Error fetching songs from Deezer.</p>';
        });
}
