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
let totalTime = document.getElementById('totalTime'); // Assuming this exists in your HTML

let songs = [];
let oldSongs = [];
let currentSongIndex = 0;
let audioElement = null;
let currentSongItem = null;

fetchSongsByFilter('all');

// Initialize the first song and render song list
function initializeSongs() {
    if (songs.length > 0) {
        currentSongIndex = 0;
        audioElement = new Audio(songs[currentSongIndex].songUrl);
        masterSongName.innerText = songs[currentSongIndex].songName;
        totalTime.innerHTML = songs[currentSongIndex].songTime;
        updateSongsList();
        addGlobalEventListeners();
        updateFavoriteCount();

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

        // 👇 Heart icon updated based on favorite status
        const heartClass = song.favorite == 1 ? 'fa-solid' : 'fa-regular';

        songsList.innerHTML += `
            <div id="song-${i}" class="songItem mt-2 p-2 d-flex align-items-center justify-content-between border rounded-start-pill text-wrap">
                <div class="position-relative">
                    <img alt="${i}" src="${song.coverUrl}" class="rounded-circle me-2 position-relative" width="50" height="50">
                </div>
                ${songNameHTML}
                <span class="timestamp ms-2 w-25 d-flex justify-content-center align-items-center gap-2">
                    <i class="${heartClass} fa-heart favorite"></i>
                    <span>${song.songTime}</span>
                    <i id="play-${i}" class="songItemPlay far fa-play-circle cursor-pointer"></i>
                    <i class="fa-regular fa-square-plus"></i>
                </span>
            </div>
        `;
    });
    addSongItemEventListeners();
}

function updateFavoriteCount() {
    fetch('assets/pages/api/_count_songs.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'type=favorite'
    })
    .then(response => response.json())
    .then(data => {
        const favoriteCountElement = document.querySelector('#favoriteCount');
        if (favoriteCountElement && data.total_favorites !== undefined) {
            favoriteCountElement.innerText = data.total_favorites;
        }
    })
    .catch(error => {
        console.error("Error fetching favorite count:", error);
    });
}

function countAllSongs() {
    fetch('assets/pages/api/_count_songs.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'type=all'
    })
    .then(response => response.json())
    .then(data => {
        const allCountElement = document.querySelector('#allCount');
        if (allCountElement && data.total !== undefined) {
            allCountElement.innerText = data.total;
        }
    })
    .catch(error => {
        console.error("Error fetching favorite count:", error);
    });
}
countAllSongs();

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

    // ✅ Event Delegation for Heart Clicks
    songsList.addEventListener('click', (e) => {
        if (e.target.classList.contains('favorite')) {
            e.preventDefault();

            // Toggle icon on UI
            e.target.classList.toggle('fa-regular');
            e.target.classList.toggle('fa-solid');

            // Get the song element and its `sno` from img alt attribute
            const songItem = e.target.closest('.songItem');
            const songIndex = parseInt(songItem.id.replace('song-', ''));
            const song = songs[songIndex];

            // Determine new favorite value
            const newFavorite = e.target.classList.contains('fa-solid') ? 1 : 0;

            // ✅ Send AJAX request to backend
            fetch('assets/pages/api/_update_favorite.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: `sno=${encodeURIComponent(song.sno)}&favorite=${newFavorite}`
            })
                .then(res => res.json())
                .then(data => {
                    if (data.status == "success") {
                        updateFavoriteCount();
                    }
                    else{
                        console.error("Failed to update favorite:", data.message);
                    }
                })
                .catch(err => {
                    console.error("AJAX error:", err);
                });
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

document.querySelector('.Favorites-song-playlist').addEventListener('click', () => {
    fetchSongsByFilter('favorites');
});

document.querySelector('.All-song-playlist').addEventListener('click', () => {
    fetchSongsByFilter('all');
});

function fetchSongsByFilter(filter) {
    toggleLoading(true);

    fetch('assets/pages/api/_fetch_songs.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `filter=${encodeURIComponent(filter)}`
    })
    .then(response => {
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        return response.json();
    })
    .then(data => {
        toggleLoading(false);

        if (data.length > 0) {
            songs = data;
            initializeSongs(); // Re-render the song list
        } else {
            songsList.innerHTML = '<p>No songs found.</p>';
        }
    })
    .catch(error => {
        console.error(`Error fetching ${filter} songs:`, error);
        toggleLoading(false);
        songsList.innerHTML = `<p>Error loading ${filter} songs.</p>`;
    });
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
