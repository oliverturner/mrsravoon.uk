export function formatTimestamp(currentTime: number) {
  const hours = Math.floor(currentTime / 60 / 60);
  const minutes = Math.floor(currentTime / 60) - hours * 60;
  const seconds = Math.floor(currentTime) % 60;

  return [hours, minutes, seconds]
    .map((part) => part.toString().padStart(2, "0"))
    .join(":");
}
