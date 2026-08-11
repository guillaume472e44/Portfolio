import { displaySVGTitle } from "./titles.js";
import transitions from "./transitions.js";

window.addEventListener("load", contentDisplay);

function contentDisplay() {
  document.querySelector("body").classList.remove("hide-on-load");

  // Masquage du contenu
  transitions()

  // événement déclenché après l'apparition du dernier élément affiché
  document
    .querySelector(".section-header__navigation button:nth-child(2)")
    .addEventListener("transitionend", contentDisplayed);
}

function contentDisplayed() {
  // Lancement des animations permanantes
  document.querySelector(".caveman-silhouette").classList.add("animate");
  document
    .querySelectorAll(".social-links__anchor")
    .forEach((link) => link.classList.add("animate"));

  // Affichage titre accueil
  setTimeout(() => {
    displaySVGTitle("presentation");
  }, 2000);

  // premier affichage du contenu principal
  transitions("grid")
  // transitionGrid("fadeIn");

  // Suppression listeners
  document
    .querySelector(".social-links__anchor:nth-child(2)")
    .removeEventListener("transitionend", contentDisplayed);
  window.removeEventListener("load", contentDisplay);
}
