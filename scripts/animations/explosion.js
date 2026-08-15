export default function (params) {
  const frames = 9;
  const animationDuration = 900;

  // Lancement de l'explosion
  setTimeout(() => {
    for (let i = 0; i < frames; i++) {
      const img = document.createElement("img");
      img.src = `./assets/explosion/Explosion_sheet-${i}.webp`;
      img.alt = "";
      img.ariaHidden = true;
      img.width = 256;
      img.height = 256;
      img.style.animationDelay = `${(animationDuration / frames) * i}ms`;

      params.selector.appendChild(img);
    }
  }, params.delay);

  // Affichage du contenu en dessous de l'explosion
  setTimeout(() => {
    params.imgToDisplay.classList.remove("hidden");
  }, params.delay + 400);

  // Suppression des images de l'explosion
  setTimeout(() => {
    params.selector.textContent = "";
    params.selector.classList.add("hidden")
  }, params.delay + animationDuration);
}
