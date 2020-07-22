/**
 * Replace the <audio> element's default UI
 *
 * @param   {HTMLAudioElement}  el
 *
 * @return  void
 */
export function audio(el) {
  const parent = el.parentNode;
  const playerEl = document.createElement("div");
  playerEl.innerHTML = "<p>woohoo</p>";

  try {
    parent.appendChild(playerEl);
    console.log("hello audio", el, playerEl);
  } catch (error) {
    console.log({ error });
  }
}
