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
let totalTime = document.getElementById('totalTime');

let songs = [];
let oldSongs = [];
let currentSongIndex = 0;
let audioElement = null;
let currentSongItem = null;
let currentPlaylistItem = null;

fetchSongsByFilter('all');

// Initialize and Play
function initializeSongs() {
    if (audioElement) {
        audioElement.pause();
        audioElement = null;
    }

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

// Highlight Current Playlist
function highlightCurrentPlaylist(playlistName) {
    document.querySelectorAll('.All-song-playlist, .Favorites-song-playlist, .playlist-item').forEach(item => {
        item.classList.remove('border-danger');
    });

    if (playlistName === 'all') {
        document.querySelector('.All-song-playlist')?.classList.add('border-danger');
    } else if (playlistName === 'favorites') {
        document.querySelector('.Favorites-song-playlist')?.classList.add('border-danger');
    } else {
        const playlistItems = document.querySelectorAll('.playlist-item');
        playlistItems.forEach(item => {
            if (item.textContent.trim().includes(playlistName)) {
                item.classList.add('border-danger');
            }
        });
    }
}

// Fetch Songs by Playlist Filter
function fetchSongsByFilter(filter) {
    toggleLoading(true);
    if (audioElement) {
        audioElement.pause();
        audioElement = null;
    }

    fetch('assets/pages/api/_fetch_songs.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `filter=${encodeURIComponent(filter)}`
    })
        .then(res => res.json())
        .then(data => {
            toggleLoading(false);
            highlightCurrentPlaylist(filter);

            if (data.length > 0) {
                songs = data;
                initializeSongs();
            } else {
                songsList.innerHTML = '<p>No songs found.</p>';
            }
        })
        .catch(err => {
            console.error(`Error fetching ${filter} songs:`, err);
            toggleLoading(false);
            songsList.innerHTML = `<p>Error loading ${filter} songs.</p>`;
        });
}

// Toggle Playlist UI and count
function loadPlaylists() {
    fetch('assets/pages/api/_count_songs.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: 'type=playlists'
    })
        .then(res => res.json())
        .then(data => {
            const playlistContainer = document.getElementById('playlistContainer');
            playlistContainer.innerHTML = '';

            if (data.playlists && data.playlists.length > 0) {
                data.playlists.forEach(playlist => {
                    const div = document.createElement('div');
                    div.className = 'playlist-item p-2 d-flex align-items-center justify-content-between border rounded-end-pill mt-2';
                    div.innerHTML = `
                        <div class="d-flex align-items-center gap-2">
                            <i class="fa-regular fa-folder"></i>
                            <div>${playlist.name}</div>
                        </div>
                        <div class="me-2">
                            <small>${playlist.count}</small>
                        </div>
                    `;

                    div.addEventListener('click', () => {
                        fetchSongsByFilter(playlist.name);
                    });

                    playlistContainer.appendChild(div);
                });
            } else {
                playlistContainer.innerHTML = '<div class="text-muted">No playlists found.</div>';
            }
        })
        .catch(err => console.error("Error fetching playlists:", err));
}
loadPlaylists();

// Add Event Listeners
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

    // Heart Icon
    songsList.addEventListener('click', (e) => {
        if (e.target.classList.contains('favorite')) {
            e.preventDefault();
            e.target.classList.toggle('fa-regular');
            e.target.classList.toggle('fa-solid');

            const songItem = e.target.closest('.songItem');
            const songIndex = parseInt(songItem.id.replace('song-', ''));
            const song = songs[songIndex];
            const newFavorite = e.target.classList.contains('fa-solid') ? 1 : 0;

            fetch('assets/pages/api/_update_favorite.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: `sno=${encodeURIComponent(song.sno)}&favorite=${newFavorite}`
            })
                .then(res => res.json())
                .then(data => {
                    if (data.status === 'success') {
                        updateFavoriteCount();
                    } else {
                        console.error("Favorite update failed:", data.message);
                    }
                })
                .catch(err => console.error("AJAX error:", err));
        }
    });
}

let currentDropdownSongIndex = null;

function showPlaylistDropdown(triggerIcon, songIndex) {
    currentDropdownSongIndex = songIndex;
    const dropdown = document.getElementById('playlistDropdown');
    const rect = triggerIcon.getBoundingClientRect();

    dropdown.style.left = `${rect.left}px`;
    dropdown.style.top = `${rect.bottom + window.scrollY}px`;
    dropdown.classList.remove('d-none');

    fetch('assets/pages/api/_count_songs.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: 'type=playlists'
    })
        .then(res => res.json())
        .then(data => {
            const container = document.getElementById('existingPlaylists');
            container.innerHTML = '';
            if (data.playlists) {
                data.playlists.forEach(pl => {
                    const btn = document.createElement('button');
                    btn.className = 'btn btn-sm btn-outline-secondary w-100 text-start mb-1';
                    btn.innerText = pl.name;
                    btn.addEventListener('click', () => updateSongPlaylist(pl.name));
                    container.appendChild(btn);
                });
            }
        });

    document.addEventListener('click', hidePlaylistDropdown, { once: true });
}

function hidePlaylistDropdown(e) {
    const dropdown = document.getElementById('playlistDropdown');
    if (!dropdown.contains(e.target)) {
        dropdown.classList.add('d-none');
    }
}

function updateSongPlaylist(playlistName) {
    const song = songs[currentDropdownSongIndex];
    fetch('assets/pages/api/_update_playlist.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `sno=${song.sno}&playlist=${encodeURIComponent(playlistName)}`
    })
        .then(res => res.json())
        .then(data => {
            if (data.status === 'success') {
                song.playlist = playlistName;
                hidePlaylistDropdown({ target: {} });
                loadPlaylists(); // Refresh playlists
            } else {
                alert('Failed to update playlist');
            }
        });
}

document.getElementById('addPlaylistBtn').addEventListener('click', () => {
    const newName = document.getElementById('newPlaylistName').value.trim();
    if (newName) {
        updateSongPlaylist(newName);
    }
});

document.getElementById('removePlaylistBtn').addEventListener('click', () => {
    updateSongPlaylist('');
});

// Song List Rendering
function updateSongsList() {
    songsList.innerHTML = '';
    songs.forEach((song, i) => {
        const isLong = song.songName.length > 25;
        const songNameHTML = isLong
            ? `<div class="songName-container"><div class="songName-text-wrapper"><div class="songName-text">${song.songName}&nbsp;&nbsp;&nbsp;&nbsp;${song.songName}</div></div></div>`
            : `<div class="songName-container short"><div class="songName-text-wrapper"><div class="songName-text">${song.songName}</div></div></div>`;

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
                    <i class="fa-regular fa-square-plus addToPlaylist" data-index="${i}"></i>
                </span>
            </div>
        `;
    });
    addSongItemEventListeners();
}

function addSongItemEventListeners() {
    document.querySelectorAll('.songItem').forEach((element, i) => {
        element.addEventListener('click', () => {
            if (currentSongIndex === i) {
                audioElement.paused ? playSong(false) : pauseSong();
            } else {
                currentSongIndex = i;
                playSong(true);
            }
        });
    });

    // ➕ playlist icon click
    document.querySelectorAll('.addToPlaylist').forEach(icon => {
        icon.addEventListener('click', (e) => {
            e.stopPropagation();
            const songIndex = parseInt(e.currentTarget.dataset.index);
            showPlaylistDropdown(e.currentTarget, songIndex);
        });
    });
}

function playSong(updateSrc) {
    if (currentSongItem) {
        currentSongItem.classList.remove("border-danger");
        currentSongItem.querySelector('img')?.classList.remove("songOn");
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
    const icon = currentSongItem.querySelector('.songItemPlay');
    icon.classList.remove("fa-play-circle");
    icon.classList.add("fa-pause-circle");

    audioElement.play();
    masterSongName.innerText = songs[currentSongIndex].songName;
    totalTime.innerHTML = songs[currentSongIndex].songTime;
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    gif.style.opacity = 1;
}

function pauseSong() {
    audioElement.pause();
    if (currentSongItem) {
        currentSongItem.classList.remove("border-danger");
        currentSongItem.querySelector('img')?.classList.remove("songOn");
        currentSongItem.querySelector('.songName-text')?.classList.remove("songName-text-scroll");
        const icon = currentSongItem.querySelector('.songItemPlay');
        icon.classList.remove("fa-pause-circle");
        icon.classList.add("fa-play-circle");
    }
    masterPlay.classList.remove('fa-pause-circle');
    masterPlay.classList.add('fa-play-circle');
    gif.style.opacity = 0;
}

function updateFavoriteCount() {
    fetch('assets/pages/api/_count_songs.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: 'type=favorite'
    })
        .then(res => res.json())
        .then(data => {
            const el = document.getElementById('favoriteCount');
            if (el && data.total_favorites !== undefined) {
                el.innerText = data.total_favorites;
            }
        });
}

function countAllSongs() {
    fetch('assets/pages/api/_count_songs.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: 'type=all'
    })
        .then(res => res.json())
        .then(data => {
            const el = document.getElementById('allCount');
            if (el && data.total !== undefined) {
                el.innerText = data.total;
            }
        });
}
countAllSongs();

function toggleLoading(show) {
    loadingDiv.classList.toggle('show', show);
}

function formatTime(seconds) {
    const min = Math.floor(seconds / 60).toString().padStart(2, '0');
    const sec = Math.floor(seconds % 60).toString().padStart(2, '0');
    return `${min}:${sec}`;
}

// Search via Deezer
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

function fetchFromDeezer(songName) {
    const url = `https://deezerdevs-deezer.p.rapidapi.com/search?q=${songName}`;
    fetch(url, {
        method: 'GET',
        headers: {
            'x-rapidapi-host': 'deezerdevs-deezer.p.rapidapi.com',
            'x-rapidapi-key': 'b556e236e4msh30b0ca1d27d9e96p189bb3jsnb6409c2a5bf1',
        },
    })
        .then(res => res.json())
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

// Playlist buttons
document.querySelector('.Favorites-song-playlist').addEventListener('click', () => {
    fetchSongsByFilter('favorites');
});
document.querySelector('.All-song-playlist').addEventListener('click', () => {
    fetchSongsByFilter('all');
});
