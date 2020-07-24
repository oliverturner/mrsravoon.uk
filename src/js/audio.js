function enableControls() {
  console.log("enableControls");
}

/**
 * Return a play/pause control
 *
 * @param   {HTMLAudioElement}  audioEl  The current <audio /> element
 *
 * @return  {HTMLButtonElement}          The control button
 */
function createPlayBtn(audioEl) {
  const btn = document.createElement("button");
  btn.innerText = "play";

  /**
   * On clicking the button control the playback
   *
   * @return  {void}
   */
  function onClick() {
    audioEl.paused ? audioEl.play() : audioEl.pause();
  }

  /**
   * Update the UI to reflect play state
   *
   * @param   {MediaStreamEvent}  event
   *
   * @return  {void}
   */
  function onPlayPause(event) {
    btn.innerText = event.type === "play" ? "pause" : "play";
  }

  btn.addEventListener("click", onClick);
  audioEl.addEventListener("play", onPlayPause);
  audioEl.addEventListener("pause", onPlayPause);

  return btn;
}

/**
 * Return a progress bar
 *
 * @param   {HTMLAudioElement}  audioEl  The current <audio /> element
 *
 * @return  {HTMLProgressElement}          The control button
 */
function createProgressBar(audioEl) {
  const progressBar = document.createElement("progress");
  progressBar.value = 0;

  /**
   * Update the UI to reflect progress
   *
   * @param   {MediaStreamEvent}  event
   *
   * @return  {void}
   */
  function onProgress() {
    const { currentTime, duration } = audioEl;
    const percent = currentTime / duration;

    console.log({ currentTime, duration, percent });

    progressBar.value = percent;
  }

  audioEl.addEventListener("timeupdate", onProgress);

  return progressBar;
}

/**
 * Replace the <audio> element's default UI
 *
 * @param   {HTMLAudioElement}  audioEl
 *
 * @return  void
 */
export function audio(audioEl) {
  const parentEl = audioEl.parentNode;
  const controlsEl = document.createElement("div");

  const playBtn = createPlayBtn(audioEl);
  const progressBar = createProgressBar(audioEl);

  controlsEl.appendChild(playBtn);
  controlsEl.appendChild(progressBar);

  audioEl.addEventListener("canplay", enableControls);

  try {
    // audioEl.removeAttribute("controls");
    parentEl.appendChild(controlsEl);
    console.log("hello audio", { audioEl, controlsEl });
  } catch (error) {
    console.log({ error });
  }
}
