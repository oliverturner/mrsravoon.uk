async function init() {
  const audioEls = document.querySelectorAll("audio");
  if (audioEls.length) {
    const { audio } = await import("./audio");
    for (const el of audioEls) audio(el);
  }
}

init();
