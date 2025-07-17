<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />

    <title>VibeTune - Discover & Stream Your Favorite Music</title>

    <!-- SEO Meta Tags -->
    <meta name="description"
        content="VibeTune is a free music streaming platform to explore, save, and play your favorite songs seamlessly." />
    <meta name="keywords"
        content="VibeTune, music player, free music streaming, song playlist, music app, online songs" />
    <meta name="author" content="Sumit Rathor, Team VibeTune" />
    <meta name="robots" content="index, follow" />
    <link rel="canonical" href="https://sumitrathor.rf.gd/VibeTune/" />

    <!-- Open Graph / Facebook -->
    <meta property="og:title" content="VibeTune - Stream Your Favorite Songs Free" />
    <meta property="og:description"
        content="Discover new music, create playlists, and enjoy a smooth audio experience with VibeTune." />
    <meta property="og:image" content="https://sumitrathor.rf.gd/VibeTune/assets/images/vibetune-banner.png" />
    <meta property="og:url" content="https://sumitrathor.rf.gd/VibeTune/" />
    <meta property="og:type" content="website" />

    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="VibeTune - Free Music Streaming App" />
    <meta name="twitter:description" content="Create playlists and listen to your favorite songs with VibeTune." />
    <meta name="twitter:image" content="https://sumitrathor.rf.gd/VibeTune/assets/images/vibetune-banner.png" />

    <!-- Favicon -->
    <link rel="icon" href="assets/images/favicon.ico" type="image/x-icon" />

    <!-- Fonts & Bootstrap -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" />
    <link href="https://fonts.googleapis.com/css2?family=Playwrite+AU+SA:wght@100..400&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css" />
    <link rel="stylesheet" href="assets/css/style.css" />
</head>


<body class="bg-secondary">
    <header>
        <?php include "assets/pages/_nav.php";
        nav("home"); ?>
    </header>
    <main>
        <div id="playlistDropdown" class="position-absolute border bg-white p-2 rounded shadow d-none"
            style="z-index: 1000; min-width: 200px;">
            <div id="existingPlaylists" class="mb-2"></div>
            <input type="text" id="newPlaylistName" class="form-control form-control-sm mb-1"
                placeholder="New playlist name">
            <button id="addPlaylistBtn" class="btn btn-sm btn-primary w-100">Add Playlist</button>
            <hr>
            <button id="removePlaylistBtn" class="btn btn-sm btn-danger w-100">Remove from Playlist</button>
        </div>

        <div class="container bg-black text-white my-4 p-5 rounded">
            <div class="songList">
                <div class="d-flex flex-row justify-content-around align-items-center">
                    <h1 class="playwrite">Best of NCS - No Copyright Sounds</h1>
                    <div class="d-flex h-50">
                        <input class="form-control me-2" type="search" id="songName" placeholder="Search"
                            aria-label="Search" required>
                        <div class="loading" id="loading">
                            <img src="assets/images/loading.gif" alt="Loading..." width="50">
                        </div>
                    </div>
                </div>
                <div class="d-flex flex-row">
                    <div class="w-50">
                        <div id="songInfo" class="song-info">
                        </div>
                        <div id="songsList" class="mt-4 border rounded p-2 overflow-auto custom-scrollbar"
                            style="height: 300px; overflow-x: hidden; overflow-y: auto;">
                        </div>
                    </div>

                    <div class="w-50 playlist">
                        <div class="w-50">
                            <div class="mt-4 border rounded p-2 overflow-auto custom-scrollbar"
                                style="height: 300px; overflow-x: hidden; overflow-y: auto;">

                                <!-- Playlist Title / Icon -->
                                <div
                                    class="All-song-playlist p-2 d-flex align-items-center justify-content-between border rounded-end-pill border p-2 mt-2 rounded">
                                    <div class="d-flex align-items-center gap-2">
                                        <i class="fa-regular fa-folder"></i>
                                        <div>All Songs</div>
                                    </div>
                                    <div class="me-2">
                                        <small id="allCount">0</small>
                                    </div>
                                </div>
                                <div>
                                    <div
                                        class="Favorites-song-playlist p-2 d-flex align-items-center justify-content-between border rounded-end-pill border p-2 mt-2 rounded">
                                        <div class="d-flex align-items-center gap-2">
                                            <i class="fa-regular fa-folder"></i>
                                            <div>Favorites</div>
                                        </div>
                                        <div class="me-2">
                                            <small id="favoriteCount">0</small>
                                        </div>
                                    </div>
                                    <div class="playlists" id="playlistContainer"></div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
    </main>
    <?php include "assets/pages/_footer.php"; ?>
    <style>
    .songItem {
        cursor: pointer;
    }
    </style>
    <script src="https://kit.fontawesome.com/a97454ccc3.js" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js"></script>
    <script src="assets/js/script.js"></script>
</body>

</html>