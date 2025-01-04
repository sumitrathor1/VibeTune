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

let songs = []; // Consolidated song list
let oldSongs = []; // Songs from local API
let currentSongIndex = 0;
let audioElement = null;

// Fetch songs from local API
fetch('_fetch.php')
    .then(response => response.json())
    .then(data => {
        oldSongs = data;
        songs = [...oldSongs]; // Default to old API songs
        initializeSongs();
    })
    .catch(error => console.error('Error fetching songs from local API:', error));

// Initialize songs
function initializeSongs() {
    if (songs.length > 0) {
        currentSongIndex = 0;
        audioElement = new Audio(songs[currentSongIndex].songUrl);
        masterSongName.innerText = songs[currentSongIndex].songName;
        updateSongsList();
        addGlobalEventListeners();
    } else {
        songsList.innerHTML = '<p>No songs available.</p>';
    }
}

// Update songs list UI
function updateSongsList() {
    songsList.innerHTML = '';
    songs.forEach((song, i) => {
        songsList.innerHTML += `
            <div id="song-${i}" class="songItem d-flex align-items-center justify-content-between bg-gradient bg-secondary text-dark fw-bold rounded-start-pill m-3 text-wrap">
                <div class="position-relative">
                    <img alt="${i}" src="${song.coverUrl}" class="rounded-circle mx-2 position-relative">
                    <div class="position-absolute"></div>
                </div>
                <span class="songName">${song.songName}</span>
                <span class="timestamp mx-4 w-25 d-flex justify-content-center align-items-center">
                    <span class="me-2">${song.songTime}</span>
                    <i id="play-${i}" class="songItemPlay far fa-play-circle cursor-pointer"></i>
                </span>
            </div>`;
    });
    addSongItemEventListeners();
}

// Add event listeners to song items
function addSongItemEventListeners() {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element, i) => {
        element.addEventListener('click', () => {
            if (currentSongIndex === i && !audioElement.paused) {
                pauseSong();
            } else {
                currentSongIndex = i;
                playSong(true);
            }
        });
    });
}

// Add global event listeners
function addGlobalEventListeners() {
    masterPlay.addEventListener('click', () => {
        if (audioElement.paused || audioElement.currentTime <= 0) {
            playSong(false);
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

    volumeControl.addEventListener('change', () => {
        audioElement.volume = volumeControl.value;
    });

    audioElement.addEventListener('timeupdate', () => {
        const progress = parseFloat((audioElement.currentTime / audioElement.duration) * 100);
        myProgressBar.value = progress;

        const currentTime = formatTime(audioElement.currentTime);
        document.getElementById('currentTime').innerText = currentTime;

        if (progress === 100) {
            currentSongIndex = (currentSongIndex + 1) % songs.length;
            playSong(true);
        }
    });
}

// Play song function
function playSong(updateSource) {
    if (updateSource) {
        audioElement.src = songs[currentSongIndex].songUrl;
    }
    audioElement.play();
    masterSongName.innerText = songs[currentSongIndex].songName;
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    gif.style.opacity = 1;
}

// Pause song function
function pauseSong() {
    audioElement.pause();
    masterPlay.classList.remove('fa-pause-circle');
    masterPlay.classList.add('fa-play-circle');
    gif.style.opacity = 0;
}

// Format time for display
function formatTime(seconds) {
    const min = Math.floor(seconds / 60).toString().padStart(2, '0');
    const sec = Math.floor(seconds % 60).toString().padStart(2, '0');
    return `${min}:${sec}`;
}

// Fetch songs from Deezer API
function fetchFromDeezer(songName) {
    const url = `https://deezerdevs-deezer.p.rapidapi.com/search?q=${songName}`;
    toggleLoading(true);

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
                const deezerSongs = data.data.map(song => ({
                    songName: song.title,
                    songUrl: song.preview,
                    songTime: "00:30",
                    coverUrl: song.album.cover_medium,
                }));
                songs = deezerSongs;
                updateSongsList();
            } else {
                songInfoDiv.innerHTML = '<p>No songs found on Deezer.</p>';
            }
        })
        .catch(error => {
            console.error('Error fetching songs from Deezer:', error);
            toggleLoading(false);
            songInfoDiv.innerHTML = '<p>Error fetching songs from Deezer.</p>';
        });
}

// Define typingTimer at the top of your script
let typingTimer; // Timer for debounce

// Inside the search input event listener
const doneTypingInterval = 3000; // 3 seconds debounce
// const songNameInput = document.getElementById('songName');

songNameInput.addEventListener('input', () => {
    clearTimeout(typingTimer); // Clear existing timer
    songInfoDiv.innerHTML = ''; // Clear previous results

    if (songNameInput.value) {
        toggleLoading(true); // Show loading indicator
        typingTimer = setTimeout(() => fetchFromDeezer(songNameInput.value), doneTypingInterval);
    } else {
        toggleLoading(false); // Hide loading indicator
        initializeSongs(); // Show old API songs when input is cleared
    }
});

// Toggle loading indicator
function toggleLoading(show) {
    if (show) {
        loadingDiv.classList.remove('d-none');
        loadingDiv.classList.add('d-block');
    } else {
        loadingDiv.classList.remove('d-block');
        loadingDiv.classList.add('d-none');
    }
}
