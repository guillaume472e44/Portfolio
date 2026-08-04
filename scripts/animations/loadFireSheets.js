export default function () {
  const fireContainer = document.querySelector(".fire");
  if (fireContainer.childNodes.length) return;

  const imgsCount = 16;
  const animationDuration = 1.6;

  for (let i = 0; i < imgsCount; i++) {
    const img = document.createElement("img");
    img.src = `./assets/fire/Fire_sheet-${i}.webp`;
    img.alt = `Fire_sheet-${i}`;
    img.width = 128;
    img.height = 128;
    img.style.animationDelay = `${(animationDuration / imgsCount) * i}s`;
    fireContainer.appendChild(img);
  }
}
