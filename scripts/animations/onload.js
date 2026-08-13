import { displaySVGTitle } from "./titles.js";
import transitions from "./transitions.js";

window.addEventListener("load", contentDisplay);

function contentDisplay() {
  document.querySelector("body").classList.remove("hide-on-load");

  // Masquage du contenu main
  transitions();

  const lastIllustration = {
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
      // Affichage titre accueil
      setTimeout(() => {
        displaySVGTitle("presentation");
      }, 2000);

      // premier affichage du contenu principal
      transitions("grid");
      // transitionGrid("fadeIn");

      // Suppression listener
      window.removeEventListener("load", contentDisplay);
    },
    (lastIllustration.delay() + lastIllustration.duration()) * 1000,
  );
}
