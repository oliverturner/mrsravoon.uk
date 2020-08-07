<style>
  p strong {
    color: red;
  }
</style>

<script>
  export let player;

  player.controls = false;
  console.log(`hello from ${ player?.src }!`);
</script>

<p>here's some <strong>HTML!!!</strong></p>