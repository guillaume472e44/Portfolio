export default function (params) {
  const animationDuration = 900;

  // Lancement de l'explosion
  setTimeout(() => {
    params.selector.classList.remove("hidden");
  }, params.delay);

  // Affichage du contenu en dessous de l'explosion
  setTimeout(() => {
    params.imgToDisplay.classList.remove("hidden");
  }, params.delay + 400);

  // Suppression des images de l'explosion
  setTimeout(() => {
    params.selector.textContent = "";
    params.selector.classList.add("hidden");
  }, params.delay + animationDuration);
}
