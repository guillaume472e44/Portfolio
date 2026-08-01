import { displaySVGTitle } from "./titles.js";
import transitionGrid from "./transitionGrid.js";

window.addEventListener("load", contentDisplay);

function contentDisplay() {
  document.querySelector("body").classList.remove("hide-on-load");

  // Grille masquant le contenu
  transitionGrid();

  // événement déclenché après l'apparition du dernier élément affiché
  document
    .querySelector(".social-links__anchor:nth-child(2)")
    .addEventListener("transitionend", pageLoaded);
}

function pageLoaded() {
  // Lancement des animations permanantes
  document.querySelector(".caveman-silhouette").classList.add("animate");
  document
    .querySelectorAll(".social-links__anchor")
    .forEach((link) => link.classList.add("animate"));

  // Affichage titre accueil
  displaySVGTitle("presentation");

  // premier affichage du contenu principal
  setTimeout(() => {
    transitionGrid("fadeIn");
  }, 1600);

  // Suppression listeners
  document
    .querySelector(".social-links__anchor:nth-child(2)")
    .removeEventListener("transitionend", pageLoaded);
  window.removeEventListener("load", contentDisplay);
}
