// Initialize Variables
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let songsList = document.getElementById('songsList');
let volumeControl = document.getElementById('volumeControl');
let songInfoDiv = document.getElementById('songInfo');
let songs = []; // Consolidated song list

let songIndex = 0;
let audioElement = null;

// Fetch songs from local API
fetch('_fetch.php')
    .then(response => response.json())
    .then(data => {
        songs = data; // Add fetched songs to the list
        initializeSongs();
    })
    .catch(error => console.error('Error fetching songs from local API:', error));

// Function to initialize songs
function initializeSongs() {
    if (songs.length > 0) {
        songIndex = 0;
        audioElement = new Audio(songs[songIndex].songUrl);
        masterSongName.innerText = songs[songIndex].songName;

        // Populate the songs list
        updateSongsList();
    } else {
        songsList.innerHTML = "No songs available.";
    }
}

// Update songs list UI
function updateSongsList() {
    songsList.innerHTML = '';
    songs.forEach((song, i) => {
        songsList.innerHTML += `
            <div id="${(i + 1) * -1}" class="songItem d-flex align-items-center justify-content-between bg-gradient bg-secondary text-dark fw-bold rounded-start-pill m-3 text-wrap">
                <div class="position-relative">
                    <img alt="${i}" src="${song.coverUrl}" class="rounded-circle mx-2 position-relative">
                    <div class="position-absolute"></div>
                </div>
                <span class="songName">${song.songName}</span>
                <span class="timestamp mx-4 w-25 d-flex justify-content-center align-items-center">
                    <span class="me-2">${song.songTime}</span>
                    <i id="${i}" class="songItemPlay far fa-play-circle cursor-pointer"></i>
                </span>
            </div>`;
    });

    // Add event listeners to play buttons
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element, i) => {
        element.addEventListener('click', () => {
            if (songIndex === i && !audioElement.paused) {
                pauseSong();
            } else {
                songIndex = i;
                playSong(true);
            }
        });
    });
}

// Fetch songs from Deezer API
function fetchFromDeezer(songName) {
    const url = `https://deezerdevs-deezer.p.rapidapi.com/search?q=${songName}`;
    toggleLoading(true);

    fetch(url, {
        method: 'GET',
        headers: {
            'x-rapidapi-host': 'deezerdevs-deezer.p.rapidapi.com',
            'x-rapidapi-key': 'b556e236e4msh30b0ca1d27d9e96p189bb3jsnb6409c2a5bf1'
        }
    })
        .then(response => response.json())
        .then(data => {
            toggleLoading(false);

            if (data.data.length > 0) {
                const deezerSongs = data.data.map(song => ({
                    songName: song.title,
                    songUrl: song.preview,
                    songTime: "00:30", // Preview time from Deezer API
                    coverUrl: song.album.cover_medium,
                    artistName: song.artist.name,
                }));

                songs = [...songs, ...deezerSongs]; // Merge both APIs
                updateSongsList(); // Update UI with merged songs
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

// Event listener for search input
let typingTimer; // Timer for debounce
const doneTypingInterval = 3000; // 3 seconds debounce
const songNameInput = document.getElementById('songName');

songNameInput.addEventListener('input', () => {
    clearTimeout(typingTimer);
    songInfoDiv.innerHTML = ''; // Clear previous results

    if (songNameInput.value) {
        toggleLoading(true);
        typingTimer = setTimeout(() => fetchFromDeezer(songNameInput.value), doneTypingInterval);
    } else {
        toggleLoading(false);
    }
});

// Play song function
function playSong(songIndexChange) {
    if (songIndexChange) {
        audioElement.src = songs[songIndex].songUrl;
    }
    audioElement.play();
    masterSongName.innerText = songs[songIndex].songName;
    gif.style.opacity = 1;
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
}

// Pause song function
function pauseSong() {
    audioElement.pause();
    gif.style.opacity = 0;
    masterPlay.classList.remove('fa-pause-circle');
    masterPlay.classList.add('fa-play-circle');
}

// Toggle loading indicator
function toggleLoading(show) {
    const loadingDiv = document.getElementById('loading');
    if (show) {
        loadingDiv.classList.remove('d-none');
        loadingDiv.classList.add('d-block');
    } else {
        loadingDiv.classList.remove('d-block');
        loadingDiv.classList.add('d-none');
    }
}