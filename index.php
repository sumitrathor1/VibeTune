<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta author="Sumit, Vandana, Latasha, Himanshu">
    <title>VibeTune | Home</title>
    <link rel="stylesheet" href="assets/css/style.css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.7/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-LN+7fdVzj6u52u30Kp6M/trliBMCMKTyK833zpbD+pXdCLuTusPj697FH4R/5mcr" crossorigin="anonymous">
    <link rel="icon" href="assets/images/favicon.ico">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Playwrite+AU+SA:wght@100..400&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css"
        integrity="sha512-Evv84Mr4kqVGRNSgIGL/F/aIDqQb7xQ2vcrdIwxfjThSH8CSR7PBEakCr51Ck+w+/U6swU2Im1vVX0SVk9ABhg=="
        crossorigin="anonymous" referrerpolicy="no-referrer" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/brands.min.css"
        integrity="sha512-58P9Hy7II0YeXLv+iFiLCv1rtLW47xmiRpC1oFafeKNShp8V5bKV/ciVtYqbk2YfxXQMt58DjNfkXFOn62xE+g=="
        crossorigin="anonymous" referrerpolicy="no-referrer" />
</head>

<body class="bg-secondary">
    <header>
        <?php include "assets/pages/_nav.php";
        nav("home"); ?>
    </header>
    <main>
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
                                <div class="All-song-playlist p-2 d-flex align-items-center justify-content-between border rounded-end-pill border p-2 mt-2 rounded">
                                    <div class="d-flex align-items-center gap-2">
                                        <i class="fa-regular fa-folder"></i>
                                        <div>All Songs</div>
                                    </div>
                                    <div class="me-2">
                                        <small id="allCount">0</small>
                                    </div>
                                </div>
                                <div>
                                <div class="Favorites-song-playlist p-2 d-flex align-items-center justify-content-between border rounded-end-pill border p-2 mt-2 rounded">
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