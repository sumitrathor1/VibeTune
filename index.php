<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Spotify</title>
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="../../assets/bootstrap/css/bootstrap.min.css" />
    <link rel="icon" href="./favicon.ico">
    <style>
    input[type="range"] {
        -webkit-appearance: none;
        width: 100%;
    }

    input[type="range"]::-webkit-slider-runnable-track {
        background: gray;
        height: 8px;
    }

    input[type="range"]::-webkit-slider-thumb {
        -webkit-appearance: none;
        background: white;
        border: 1px solid black;
        height: 20px;
        width: 20px;
        margin-top: -6px;
        cursor: pointer;
    }

    input[type="range"]::-moz-range-track {
        background: gray;
        height: 8px;
    }

    input[type="range"]::-moz-range-thumb {
        background: white;
        border: 1px solid black;
        height: 20px;
        width: 20px;
        cursor: pointer;
    }

    @media (max-width: 600px) {
        .container {
            border: #dc3545 !important;
            width: 98% !important;
            padding: 0px !important;
        }

        .songItem {
            margin: 10px 6px !important;
        }

        .songInfo {
            display: none;
            opacity: 0;
        }
    }

    .cursor-pointer {}
    </style>

</head>

<body class="bg-secondary">
    <header>
        <?php include "_nav.php";
        nav("home"); ?>
    </header>
    <main>
        <div class="container bg-black text-white my-4 p-5 rounded">
            <div class="songList">
                <div class="d-flex flex-row justify-content-around">
                    <h1>Best of NCS - No Copyright Sounds</h1>
                    <div class="d-flex h-50">
                        <input class="form-control me-2" type="search" id="songName" placeholder="Search"
                            aria-label="Search" required>
                        <div class="loading d-none" id="loading">
                            <img src="image/loading.gif" alt="Loading..." width="50">
                        </div>
                    </div>
                </div>
                <div class="loading d-flex justify-content-center d-none" id="loading1">
                    <img src="image/loading2.gif" alt="Loading..." width="150">
                </div>
                <div id="songInfo" class="song-info">
                </div>
                <div class="mt-5" id="songsList">
                </div>
            </div>
        </div>
    </main>

    <footer>
        <div
            class="p-2 position-fixed bottom-0 bg-black text-white d-flex justify-content-center align-items-center flex-column w-100">
            <div class="d-flex flex-row align-items-center w-100">
                <div id="currentTime"></div>
                <input type="range" name="range" class="form-range mx-2" id="myProgressBar" min="0" max="100" value="0"
                    step="0.1">
                <div id="totalTime"></div>
            </div>
            <div class="d-flex flex-row justify-content-around align-items-center w-100">
                <div class="songInfo w-50">
                    <img src="image/playing.gif" id="gif">
                    <span class="fw-bolder text-wrap" id="masterSongName"></span>
                </div>
                <div class="icons mt-2 w-50 d-flex justify-content-center align-items-center">
                    <i class="fas fa-3x fa-step-backward" id="previous"></i>
                    <i class="far fa-3x fa-play-circle mx-2" id="masterPlay"></i>
                    <i class="fas fa-3x fa-step-forward" id="next"></i>
                </div>
                <div class="d-flex justify-content-center align-items-center w-50">
                    <div class="cursor-pointer me-2" data-bs-toggle="tooltip" id="muteDiv" data-bs-placement="top"
                        data-bs-custom-class="custom-tooltip" data-bs-title="mute">
                        <i class="fa-solid fa-volume-low fa-lg" id="mute"></i>
                    </div>
                    <i class="fa-solid fa-volume-xmark fa-lg cursor-pointer" id="low-volume"></i>
                    <input type="range" class="form-range mx-2" id="volumeControl" value="100" min="0" max="1"
                        step="0.01">
                    <i class="fa-solid fa-volume-high fa-lg cursor-pointer" id="full-volume"></i>
                </div>
            </div>

        </div>
    </footer>


    <style>
    .songItem {
        cursor: pointer;
    }
    </style>
    <script src="https://kit.fontawesome.com/a97454ccc3.js" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js"></script>
    <script src="../../assets/bootstrap/js/bootstrap.min.js"></script>
    <script src="./script.js"></script>
</body>

</html>