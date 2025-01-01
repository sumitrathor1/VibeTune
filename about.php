<?php ob_start(); ?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>About</title>
    <link rel="stylesheet" href="../../assets/bootstrap/css/bootstrap.min.css" />
    <link rel="icon" href="./favicon.ico">
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
            nav("about"); ?>
        </header>
        <main class="d-flex justify-content-center align-items-center">
            <div class="container bg-black text-white my-4 p-5 rounded">
                <div>
                    <h1 class="m-2">About Project</h1>
                    <div class="mt-5 songList">
                        <div class="mb-3 border border-secondary border-2 p-2 rounded">
                            <label for="songName" class="form-label">Work</label>
                            <div class="form-control bg-secondary fw-bolder">fgf</div>
                        </div>
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
</body>
</html>