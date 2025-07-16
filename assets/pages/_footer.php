<footer>
    <div
        class="p-2 position-fixed bottom-0 bg-black text-white d-flex justify-content-center align-items-center flex-column w-100">
        <div class="d-flex flex-row align-items-center w-100">
            <div id="currentTime"></div>
            <input type="range" name="range" class="form-range mx-2" id="myProgressBar" min="0" max="100" value="0"
                step="0.01">
            <div id="totalTime"></div>
        </div>
        <div class="d-flex flex-row justify-content-around align-items-center w-100">
            <div class="songInfo w-50">
                <img src="assets/images/playing.gif" id="gif">
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
                    <!-- <i class="fa-solid fa-volume-low fa-lg" id="mute"></i> -->
                </div>
                <i class="fa-solid fa-volume-low fa-lg cursor-pointer" id="low-volume"></i>
                <input type="range" class="form-range mx-2" id="volumeControl" value="100" min="0" max="1"
                    step="0.01">
                <i class="fa-solid fa-volume-high fa-lg cursor-pointer" id="full-volume"></i>
            </div>
        </div>

    </div>
</footer>