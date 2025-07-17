<?php ob_start(); ?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>About VibeTune | Discover Our Mission & Team</title>

  <!-- SEO Meta Tags -->
  <meta name="description" content="Learn more about VibeTune, the music platform built for passionate listeners. Discover our story, vision, and the team behind the experience." />
  <meta name="keywords" content="VibeTune, about VibeTune, music platform, music app, team, our story, Sumit Rathor" />
  <meta name="author" content="Sumit Rathor, Team VibeTune" />
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="https://sumitrathor.rf.gd/VibeTune/about.php" />

  <!-- Open Graph -->
  <meta property="og:title" content="About VibeTune" />
  <meta property="og:description" content="Discover the story and mission behind VibeTune." />
  <meta property="og:image" content="https://sumitrathor.rf.gd/VibeTune/assets/images/vibetune-banner.png" />
  <meta property="og:url" content="https://sumitrathor.rf.gd/VibeTune/about.php" />
  <meta property="og:type" content="website" />

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="About VibeTune" />
  <meta name="twitter:description" content="Explore the journey and mission of VibeTune." />
  <meta name="twitter:image" content="https://sumitrathor.rf.gd/VibeTune/assets/images/vibetune-banner.png" />

  <!-- Favicon -->
  <link rel="icon" href="assets/images/favicon.ico" type="image/x-icon" />

  <!-- CSS & Fonts -->
  <link rel="stylesheet" href="assets/css/style.css">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.7/dist/css/bootstrap.min.css" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css2?family=Playwrite+AU+SA:wght@100..400&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css">
  <link href="https://fonts.googleapis.com/css2?family=Ubuntu&display=swap" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css2?family=Varela+Round&display=swap" rel="stylesheet">

  <!-- Custom Style -->
  <style>
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
        padding: 0px 10px;
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
            <?php include "assets/pages/_nav.php";
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
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js"></script>

</body>
</html>
