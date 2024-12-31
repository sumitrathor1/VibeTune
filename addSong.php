<?php ob_start(); ?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Add Song</title>
    <link rel="stylesheet" href="../../assets/bootstrap/css/bootstrap.min.css" />
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Ubuntu&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Varela+Round&display=swap');

        * {
            margin: 0;
            padding: 0;
        }

        .brand img {
            width: 44px;
            padding: 0px 8px;
        }

        footer {
            width: 100%;
            font-family: 'varela Round', sans-serif;
        }

        .container {
            font-family: 'varela Round', sans-serif;
            width: 70%;
        }

        #songPreview {
            height: 37px;
        }

        #coverPreview {
            height: 100px;
        }

        @media (max-width: 600px) {
            .container {
                width: 98%;
                padding: 0px !important;
            }

            .songList {
                padding: 0px 10px 0px 10px;
            }
        }

        /* Flexbox layout to ensure footer stays at the bottom */
        .wrapper {
            min-height: 100vh;
        }

        main {
            flex: 1;
        }
    </style>

</head>

<body class="bg-secondary">
    <div class="wrapper d-flex flex-column">
        <header>
            <?php include "_nav.php";
            nav("addPage"); ?>
        </header>
        <main class="d-flex justify-content-center align-items-center">
            <div class="container bg-black text-white my-4 p-5 rounded">
                <div>
                    <h1 class="m-2">Best of NCS - No Copyright Sounds</h1>
                    <div class="mt-5 songList">
                        <form method="post" enctype="multipart/form-data">
                            <div class="mb-3 border border-secondary border-2 p-2 rounded">
                                <label for="songName" class="form-label">Song Name*</label>
                                <input type="text" class="form-control bg-secondary fw-bolder" name="songName"
                                    id="songName" required>
                            </div>
                            <div class="mb-3 border border-secondary border-3 p-2 rounded">
                                <label for="songFile" class="form-label">Select Song*</label>
                                <input type="file" class="form-control bg-secondary" name="songFile" id="songFile"
                                    accept=".mp3" required>
                            </div>
                            <div class="mb-3 border border-secondary border-3 p-2 rounded">
                                <label for="songPreview" class="form-label">Song Preview</label>
                                <div class="form-control bg-secondary" id="songPreview"></div>
                            </div>

                            <div class="mb-3 border border-secondary border-3 p-2 rounded">
                                <label for="coverFile" class="form-label">Cover Photo</label>
                                <input type="file" class="form-control bg-secondary" name="coverFile" id="coverFile"
                                    accept="image/png, image/jpeg, image/jpg, image/gif, image/webp, image/bmp, image/svg+xml, image/tiff">
                            </div>
                            <div class="mb-3 border border-secondary border-3 p-2 rounded d-none" id="coverPreviewDiv">
                                <label for="coverPreview" class="form-label">Cover Preview</label>
                                <div class="form-control bg-secondary d-flex justify-content-center align-items-center"
                                    id="coverPreview"></div>
                            </div>
                            <input type="text" class="d-none" id="songTime" name="songTime">
                            <button type="submit" name="UPLOAD"
                                class="btn btn-secondary text-black fs-6 fw-bolder w-100 mb-2">UPLOAD</button>
                        </form>
                    </div>
                </div>
            </div>
        </main>
        <footer class="pt-3 mt-4 bg-black position-relative bottom-0" data-bs-theme="dark">
            <ul class="nav justify-content-center border-bottom pb-3 mb-3">
                <li class="nav-item"><a href="./" class="nav-link px-2 text-body-secondary">Home</a></li>
                <li class="nav-item"><a href="./" class="nav-link px-2 text-body-secondary">About</a></li>
                <li class="nav-item"><a href="./addSong.php" class="nav-link px-2 text-body-secondary">Add Song</a></li>
            </ul>
            <p class="text-center text-body-secondary m-0">&#169; <?php echo date("Y") ?> <a
                    href="https://sumitrathor.rf.gd" class="text-white-50 text-decoration-none">sumitrathor.rf.gd</a>
            </p>
        </footer>
    </div>
    <script src="../../assets/bootstrap/js/bootstrap.min.js"></script>
    <script>
        document.getElementById('songFile').addEventListener('change', function (event) {
            const songFile = event.target.files[0];
            const songPreview = document.getElementById('songPreview');

            // Clear any previous preview
            songPreview.innerHTML = '';

            if (songFile && songFile.type === 'audio/mpeg') {

                let songTime = document.getElementById("songTime");

                const audio = document.createElement('audio');
                audio.controls = true;
                audio.controlsList = 'nodownload';
                audio.style.width = "100%";
                audio.style.height = "27px";

                const objectUrl = URL.createObjectURL(songFile);

                audio.addEventListener('loadedmetadata', () => {
                    let totalSecond = audio.duration;
                    let totalMin = Math.floor(totalSecond / 60);
                    let totalSec = Math.floor(totalSecond % 60);

                    totalMin = totalMin < 10 ? '0' + totalMin : totalMin;
                    totalSec = totalSec < 10 ? '0' + totalSec : totalSec;
                    songTime.value = totalMin + ":" + totalSec;
                });

                audio.src = objectUrl;
                songPreview.appendChild(audio);
            } else {
                alert('Please upload a valid .mp3 file.');
            }
        });

        document.getElementById('coverFile').addEventListener('change', function (event) {
            const coverFile = event.target.files[0];
            const coverPreview = document.getElementById('coverPreview');

            // Clear any previous preview
            coverPreview.innerHTML = '';

            if (coverFile && coverFile.type.startsWith('image/')) {

                const coverPreviewDiv = document.getElementById("coverPreviewDiv");
                coverPreviewDiv.classList.remove('d-none');

                const img = document.createElement('img');
                img.style.width = "90px";
                img.style.height = "90px";
                img.classList.add('border', 'border-dark', 'border-3', 'rounded');

                const objectUrl = URL.createObjectURL(coverFile);
                img.src = objectUrl;
                coverPreview.appendChild(img);
            } else {
                alert('Please upload a valid image file.');
            }
        });
    </script>
</body>

</html>

<?php
include "_connection.php";
if (isset($_POST['UPLOAD']) && isset($_POST['songName']) && isset($_FILES["songFile"]) && isset($_POST['songTime'])) {
    $songName = $_POST['songName'];
    $songTime = $_POST['songTime'];
    $uploadSong = false;

    if (isset($_FILES['songFile']["name"])) {
        $target_dir = "songs/";
        $targetSong = $target_dir . date('YmdHis') . "_" . basename($_FILES["songFile"]["name"]);

        $songFileType = strtolower(pathinfo($targetSong, PATHINFO_EXTENSION));

        if (!file_exists($targetSong)) {
            if ($songFileType == "mp3") {
                if (move_uploaded_file($_FILES["songFile"]["tmp_name"], $targetSong)) {
                    $uploadSong = true;
                }
            }
        }
    }

    $coverName = $_FILES['coverFile']['name'];
    $targetCover = "";
    $uploadCover = false;
    if ($coverName != "") {
        if (isset($_FILES['coverFile']["name"])) {
            $target_dir = "covers/";
            $targetCover = $target_dir . date('YmdHis') . "_" . basename($_FILES["coverFile"]["name"]);

            $imageFileType = strtolower(pathinfo($targetCover, PATHINFO_EXTENSION));

            if (!file_exists($targetCover)) {
                if (!($_FILES["coverFile"]["size"] > 10485760)) {
                    if (!($imageFileType != "png" && $imageFileType != "jpeg" && $imageFileType != "jpg" && $imageFileType != "gif" && $imageFileType != "webp" && $imageFileType != "bmp" && $imageFileType != "svg" && $imageFileType != "svg+xml" && $imageFileType != "tiff")) {
                        if (move_uploaded_file($_FILES["coverFile"]["tmp_name"], $targetCover)) {
                            $uploadCover = true;
                        }
                    }
                }
            }
        }
    }

    if ($uploadSong == true) {
        $insert = "INSERT INTO `song`(`songName`, `songUrl`, `coverUrl`, `songTime`) VALUES ('$songName','$targetSong','$targetCover','$songTime')";
        $result = $conn->query($insert);

        if ($result) {
            header("Location:./");
        }
    }
}
?>