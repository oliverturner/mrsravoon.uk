import Audio from "../../components/audio/index.svelte";

const audioEls = document.querySelectorAll(".audio");

for (const el of audioEls) {
  const imgEl = el.querySelector("img");
  const audioEl = el.querySelector("audio");
  el.innerHTML = "";

  new Audio({
    target: el,
    props: {
      imgSrc: imgEl?.src,
      imgAlt: imgEl?.alt,
      audioSrc: audioEl?.src,
    },
  });
}
