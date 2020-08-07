import Test from "../../components/audio.svelte";

const audioEls = document.querySelectorAll(".audio");

for (const el of audioEls) {
  const imgEl = el.querySelector("img");
  const audioEl = el.querySelector("audio");
  el.innerHTML = "";

for (const el of audioEls) {
  new Test({
    target: el,
    props: {
      imgSrc: imgEl?.src,
      imgAlt: imgEl?.alt,
      audioSrc: audioEl?.src,
    },
  });
}
