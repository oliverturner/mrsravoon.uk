import Test from "../../components/audio.svelte";

const audioEls = document.querySelectorAll(".audio");

console.log("hello world!");

for (const el of audioEls) {
  const player = el.querySelector("audio");
  new Test({
    target: el,
    props: {
      player,
    },
  });
}
