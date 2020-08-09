<script lang="ts">
  import { formatTimestamp } from "./utils";

  export let imgSrc: string;
  export let imgAlt: string;
  export let audioSrc: string;

  let paused = true;
  let duration = 0;
  let currentTime = 0;

  let progress = 0;
  let timeStamp = "00:00:00";
  let playBtnLabel = "play";
  let playBtnIcon = "#icon-play";

  function togglePlayback() {
    paused = !paused;
    playBtnLabel = paused ? "play" : "pause";
    playBtnIcon = paused ? "#icon-play" : "#icon-pause";
  }

  function onTimeupdate() {
    progress = currentTime / duration;
    timeStamp = formatTimestamp(currentTime);
  }

  function onProgressClick(event: MouseEvent) {
    currentTime =
      (event.offsetX / (event.target as HTMLProgressElement).clientWidth) *
      duration;
  }
</script>

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

  .playbtn__icon,
  .playbtn__label {
    display: block;
  }

  .progress {
    flex: 1;
    margin: 0 0.5rem;
  }

  .timestamp {
    flex: 0;
  }
</style>

<img class="img" src={imgSrc} alt={imgAlt} />
<audio
  src={audioSrc}
  bind:paused
  bind:duration
  bind:currentTime
  on:timeupdate={onTimeupdate}>
  <!-- svelte-ignore missing-declaration -->
  <track
    src="captions_en.vtt"
    kind="captions"
    srclang="en"
    label="english_captions" />
</audio>
<div class="controls">
  <button class="playbtn" on:click={togglePlayback}>
    <svg class="icon playbtn__icon">
      <use xlink:href={playBtnIcon} />
    </svg>
    <span class="playbtn__label">{playBtnLabel}</span>
  </button>
  <progress class="progress" value={progress} on:click={onProgressClick} />
  <span class="timestamp">{timeStamp}</span>
</div>
