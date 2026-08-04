export * from "./animations/onload.js";
import { displaySVGTitle } from "./animations/titles.js";
import loadFireSheets from "./animations/loadFireSheets.js";

/**
 * ----------------------------------------
 * - - - - - - - Navigation - - - - - - - -
 * ----------------------------------------
 */

const linksButtons = document.querySelectorAll(".section-anchor__link");
linksButtons.forEach((btn) => btn.addEventListener("click", navigation));

function navigation(e) {
  if (
    e.target.dataset.locked === "true" ||
    e.target.classList.contains("active")
  )
    return;

  loadFireSheets();

  updatelinksButtonsStyle(e.target.dataset.anchor);
  displaySVGTitle(e.target.dataset.anchor);
}

function updatelinksButtonsStyle(link) {
  linksButtons.forEach((btn) => {
    if (btn.dataset.anchor === link) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });
}
