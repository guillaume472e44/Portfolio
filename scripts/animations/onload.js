import { displaySVGTitle } from "./titles.js";
import explosion from "./explosion.js";
import transitions from "./transitions.js";

window.addEventListener("load", contentDisplay);

function contentDisplay() {
  document.querySelector("body").classList.remove("hide-on-load");

  // Masquage du contenu main
  transitions();

  const triggeringItem = {
    selector: document.querySelector(
      ".section-header__navigation button:nth-child(2)",
    ),
    delay: function () {
      return parseFloat(
        window
          .getComputedStyle(this.selector)
          .transitionDelay.replace(/s|ms/, ""),
      );
    },
    duration: function () {
      return parseFloat(
        window
          .getComputedStyle(this.selector)
          .transitionDuration.replace(/s|ms/, ""),
      );
    },
  };

  setTimeout(
    () => {
      // premier affichage du contenu main
      transitions("grid");

      // Suppression listener
      window.removeEventListener("load", contentDisplay);

      // décalage affichage titre de section et photo de profil
      setTimeout(() => {
        // Affichage titre accueil
        displaySVGTitle("presentation");
        // Affichage photo de profil
        explosion({
          selector: document.querySelector(".section-content__img .explosion"),
          delay: 1800,
          imgToDisplay: document.querySelector(".profilPicture"),
        });
      }, 1000);
    },
    (triggeringItem.delay() + triggeringItem.duration()) * 1000,
  );
}
