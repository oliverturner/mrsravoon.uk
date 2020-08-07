<style>
  p strong {
    color: red;
  }
</style>

<script>
  export let audioEl;

  audioEl.controls = false;
</script>

{@debug}

<div class="audio__controls">
  <button class="audio__controls__playbtn">play</button>
  <progress class="audio__controls__progress" value="0"></progress>
  <span class="audio__controls__timestamp">00:00:00</span>
</div>
