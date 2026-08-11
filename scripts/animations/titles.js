import { titlesIndex } from "../../assets/titlesSVG/titlesIndex.js";

export async function displaySVGTitle(title) {
  const response = await fetch(`./assets/titlesSVG/${titlesIndex[title]}`);
  const svg = await response.text();
  const sectionTitle = document.querySelector(`#${title} .section-header__title`);
  sectionTitle.innerHTML = svg;
}
