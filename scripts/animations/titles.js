import { titlesIndex } from "../../assets/titlesSVG/titlesIndex.js";

export async function displaySVGTitle(title) {
  const response = await fetch(`./assets/titlesSVG/${titlesIndex[title]}`);
  const svg = await response.text();
  const section = document.querySelector(`#${title} .section-title`);
  section.innerHTML = svg;
}
