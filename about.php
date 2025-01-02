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
            font-family: 'Varela Round', sans-serif;
        }

        .container {
            font-family: 'Varela Round', sans-serif;
            width: 70%;
        }

        @media (max-width: 600px) {
            .container {
                width: 98%;
                padding: 0px !important;
            }

            .padding {
                padding: 0px 10px 0px 10px;
            }
        }

        .wrapper {
            min-height: 100vh;
            display: flex;
            flex-direction: column;
        }

        main {
            flex: 1;
        }
    </style>
</head>

<body class="bg-secondary">
    <div class="wrapper">
        <header>
            <?php include "_nav.php";
            nav("about"); ?>
        </header>
        <main class="d-flex justify-content-center align-items-center">
            <div class="container bg-black text-white my-4 p-5 rounded">
                <div>
                    <h1 class="m-2">About Project</h1>
                    <div class="mt-5 padding">
                        <div class="mb-3 border border-secondary border-2 p-2 rounded">
                            <label for="projectDescription" class="form-label">Project Overview</label>
                            <div id="projectDescription" class="form-control bg-secondary fw-bolder">
                                Welcome to our music website! This platform was created to provide music enthusiasts with a space to upload, and listen to their favorite songs. <br>website     Built using HTML, CSS, JavaScript, Bootstrap, PHP, MySQL, and AJAX, our website offers a user-friendly interface and robust functionality.
                            </div>
                        </div>
                        <div class="mb-3 border border-secondary border-2 p-2 rounded">
                            <label for="featuresDescription" class="form-label">Features</label>
                            <div id="featuresDescription" class="form-control bg-secondary fw-bolder">
                                Our website includes the following features:
                                <ul>
                                    <li>Users can upload their own songs and listen to them.</li>
                                    <li>Access to a variety of online songs, available to listen to for 30 seconds using an API.</li>
                                    <li>Responsive design for optimal use on both desktop and mobile devices.</li>
                                    <li>Secure and efficient data management using MySQL.</li>
                                    <li>Dynamic interactions and seamless user experience enhanced by AJAX.</li>
                                </ul>
                            </div>
                        </div>
                        <div class="mb-3 border border-secondary border-2 p-2 rounded">
                            <label for="technologyDescription" class="form-label">Technologies Used</label>
                            <div id="technologyDescription" class="form-control bg-secondary fw-bolder">
                                The development of this music website involved a variety of technologies, including:
                                <ul>
                                    <li><strong>HTML & CSS:</strong> For structuring and styling the web pages.</li>
                                    <li><strong>JavaScript & Bootstrap:</strong> For interactive and responsive design elements.</li>
                                    <li><strong>PHP & MySQL:</strong> For server-side scripting and database management.</li>
                                    <li><strong>AJAX:</strong> For asynchronous data loading and smooth user experience.</li>
                                </ul>
                            </div>
                        </div>
                        <div class="mb-3 border border-secondary border-2 p-2 rounded">
                            <label for="aboutMe" class="form-label">About Me</label>
                            <div id="aboutMe" class="form-control bg-secondary fw-bolder">
                                Hi, I'm Sumit Rathor, a passionate Full Stack Developer with a love for creating dynamic and interactive web applications. I have extensive experience working with both front-end and back-end technologies, and I enjoy tackling challenging projects that push the boundaries of what's possible on the web. This music website is a testament to my dedication to combining creativity with technical expertise to deliver high-quality user experiences. When I'm not coding, you can find me exploring new music, contributing to open-source projects, or honing my skills on competitive programming platforms like CodeChef, LeetCode, GeeksforGeeks, and HackerRank.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
        <footer class="pt-3 mt-4 bg-black position-relative bottom-0" data-bs-theme="dark">
            <ul class="nav justify-content-center border-bottom pb-3 mb-3">
                <li class="nav-item"><a href="./" class="nav-link px-2 text-body-secondary">Home</a></li>
                <li class="nav-item"><a href="./about.php" class="nav-link px-2 text-body-secondary">About</a></li>
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
