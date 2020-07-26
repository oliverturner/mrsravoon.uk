/**
 * Return a play/pause control
 *
 * @param   {HTMLAudioElement}  audioEl  The current <audio /> element
 *
 * @return  {HTMLButtonElement}          The control button
 */
function createPlayBtn(audioEl) {
  const btn = document.createElement("button");
  btn.className = "audio__controls__playbtn";
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
  progressBar.className = "audio__controls__progress";
  progressBar.value = 0;

  /**
   * Update the UI to reflect progress
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

function formatCurrentTime(currentTime) {
  const hours = Math.floor(currentTime / 60 / 60);
  const minutes = Math.floor(currentTime / 60) - hours * 60;
  const seconds = Math.floor(currentTime) % 60;

  return [hours, minutes, seconds]
    .map((part) => part.toString().padStart(2, "0"))
    .join(":");
}

function createTimestamp(audioEl) {
  const timeStamp = document.createElement("span");
  timeStamp.className = "audio__controls__timestamp";
  timeStamp.innerText = "00:00:00";

  /**
   * Update the UI to reflect progress
   *
   * @return  {void}
   */
  function onProgress() {
    timeStamp.innerText = formatCurrentTime(audioEl.currentTime);
  }

  audioEl.addEventListener("timeupdate", onProgress);

  return timeStamp;
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
  controlsEl.className = "audio__controls";

  const playBtn = createPlayBtn(audioEl);
  const progressBar = createProgressBar(audioEl);
  const timeStamp = createTimestamp(audioEl);

  controlsEl.appendChild(playBtn);
  controlsEl.appendChild(progressBar);
  controlsEl.appendChild(timeStamp);

  try {
    audioEl.removeAttribute("controls");
    parentEl.appendChild(controlsEl);
    console.log("hello audio", {
      audioEl,
      controlsEl,
      duration: audioEl.duration,
    });
  } catch (error) {
    console.log({ error });
  }
}
