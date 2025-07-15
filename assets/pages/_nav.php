<?php
function nav($activeNav)
{
    $arr = [
        'home' => '<li class="nav-item"><a class="nav-link" aria-current="page" href="./">Home</a></li>',
        'about' => '<li class="nav-item"><a class="nav-link" href="./about.php">About</a></li>',
        'addPage' => '<li class="nav-item"><a class="nav-link" href="./addSong.php">Add Song</a></li>'
    ];
    ?>
<nav class="navbar navbar-expand-lg bg-black border-bottom border-body" data-bs-theme="dark">
    <div class="container-fluid">
        <a class="navbar-brand" href="./">
            <li class="brand d-flex align-items-center fw-bolder fs-4"><img src="image/logo.png" alt="Spotify">
                Spotify
            </li>
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <?php
                    foreach ($arr as $key => $value) {
                        if ($key == $activeNav) {
                            $pattern = '/(class="[^"]*nav-link)([^"]*")/';
                            $replacement = '$1 active border-bottom border-2$2';
                            $value = preg_replace($pattern, $replacement, $value);
                        }
                        echo $value;
                    }
                    ?>
            </ul>
        </div>
    </div>
</nav>
<?php
}
?>