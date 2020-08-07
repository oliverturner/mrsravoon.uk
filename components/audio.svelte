<style>
  .controls {
    display: flex;
    align-items: center;

    margin-top: 0.5rem;
  }

  .playbtn {
    --wh: 1rem;

    all: unset;

    flex: 0 0 var(--wh);

    overflow: hidden;

    width: var(--wh);
    height: var(--wh);
    padding: 0.25rem;
    border-radius: var(--wh);
    text-align: center;
    cursor: pointer;
  }

  .progress {
    flex: 1;
    margin: 0 0.5rem;
  }

  .timestamp {
    flex: 0;
  }
</style>

<script>
  export let imgSrc;
  export let imgAlt;
  export let audioSrc;

  let paused = true;
  let duration;
  let currentTime;

  let progress = 0;
  let timeStamp = "00:00:00";
  let playBtnLabel = "play";
  let playBtnIcon = "#icon-play";

  function togglePlayback() {
    paused = !paused;
    playBtnLabel = paused ? "play" : "pause";
    playBtnIcon = paused ? "#icon-play" : "#icon-pause";
  }

  function formatTimestamp() {
    const hours = Math.floor(currentTime / 60 / 60);
    const minutes = Math.floor(currentTime / 60) - hours * 60;
    const seconds = Math.floor(currentTime) % 60;

    return [hours, minutes, seconds]
      .map((part) => part.toString().padStart(2, "0"))
      .join(":");
  }

  function onTimeupdate() {
    progress = currentTime / duration;
    timeStamp = formatTimestamp();
  }

  function onProgressClick(event){
    currentTime = (event.offsetX / event.target.clientWidth) * duration
  }
</script>

{@debug currentTime, duration, progress}

<img class="img" src="{imgSrc}" alt="{imgAlt}" />
<audio
  src="{audioSrc}"
  bind:paused
  bind:duration
  bind:currentTime
  on:timeupdate="{onTimeupdate}"
>
  <track
    src="captions_en.vtt"
    kind="captions"
    srclang="en"
    label="english_captions"
  />
</audio>
<div class="controls">
  <button class="playbtn" on:click="{togglePlayback}">
    <svg class="icon">
      <use href="{playBtnIcon}">
    </svg>
  </button>
  <progress class="progress" value="{progress}" on:click={onProgressClick}></progress>
  <span class="timestamp">{timeStamp}</span>
</div>
