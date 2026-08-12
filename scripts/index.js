export * from "./animations/onload.js";
import { displaySVGTitle } from "./animations/titles.js";
import transitions from "./animations/transitions.js";
import loadFireSheets from "./animations/loadFireSheets.js";
import { projects } from "../assets/projects/projectsIndex.js";
import tagsIndex from "../assets/tags/tagsIndex.js";

/**
 * ----------------------------------------
 * - - - - - - - Navigation - - - - - - - -
 * ----------------------------------------
 */

const sections = document.querySelectorAll(".main-content");
const linksButtons = document.querySelectorAll(".section-anchor__link");
linksButtons.forEach((btn) => btn.addEventListener("click", navigation));

let currentPosition = 1;
let isOnFire = false;

function navigation(e) {
  if (
    e.target.dataset.locked === "true" ||
    e.target.classList.contains("active")
  )
    return;

  sections.forEach((section) => {
    section.classList.add("hidden");
    if (section.id === e.target.dataset.anchor) {
      section.classList.remove("hidden");
    }
  });

  const sweepDirection =
    parseInt(e.target.dataset.position) > currentPosition
      ? "vertical-bottom"
      : "vertical-top";

  transitions(sweepDirection);
  updatelinksButtonsStyle(e.target.dataset.anchor);
  displaySVGTitle(e.target.dataset.anchor);

  if (!isOnFire) {
    loadFireSheets();
    isOnFire = true;
  }
}

const skipToSectionBtns = document.querySelectorAll(
  ".section-header__navigation button",
);
skipToSectionBtns.forEach((btn) =>
  btn.addEventListener("click", skipToSection),
);

function skipToSection(e) {
  sections.forEach((section) => {
    section.classList.add("hidden");
    if (section.id === e.currentTarget.dataset.sectiontarget) {
      section.classList.remove("hidden");
    }
  });

  transitions(`horizontal-${e.currentTarget.dataset.direction}`);
  updatelinksButtonsStyle(e.currentTarget.dataset.sectiontarget);
  displaySVGTitle(e.currentTarget.dataset.sectiontarget);

  if (!isOnFire) {
    loadFireSheets();
    isOnFire = true;
  }
}

function updatelinksButtonsStyle(link) {
  linksButtons.forEach((btn) => {
    if (btn.dataset.anchor === link) {
      btn.classList.add("active");
      currentPosition = parseInt(btn.dataset.position);
    } else {
      btn.classList.remove("active");
    }
  });
}

/**
 * ----------------------------------------
 * - - - - - - - Projets - - - - - - - - -
 * ----------------------------------------
 */

const sectionFolders = document.querySelector(".section-content__folders");

// Tri des projets dans l'ordre alphabetique
projects.sort((a, b) => {
  const nameA = a.title.toUpperCase();
  const nameB = b.title.toUpperCase();
  if (nameA < nameB) return -1;
  if (nameA > nameB) return 1;
  return 0;
});

projects.forEach((project, index) => {
  const buttonFolder = document.createElement("button");
  const popover = document.createElement("div");

  buttonFolder.classList.add("fileholder");
  buttonFolder.dataset.filters = project.filters;
  buttonFolder.popoverTargetElement = popover;
  buttonFolder.innerHTML = buttonFolderInnerHTML(
    project.screenshotURL,
    project.title,
  );

  popover.classList.add("projects-details");
  popover.popover = "auto";
  popover.appendChild(projectsDetailsTagsInnerHTML(project.tags));
  popover.appendChild(projectsDetailsDescriptionInnerHTML(project.description));
  popover.appendChild(projectsDetailsLinksInnerHTML(project.links));

  sectionFolders.appendChild(buttonFolder);
  sectionFolders.appendChild(popover);
});

function buttonFolderInnerHTML(screenshotURL, title) {
  return `
<div class="fileholder__content">
  <img src=${screenshotURL} alt="screenshot du projet ${title}" width="150" />
</div>
<div class="fileholder__front"><h3>${title}</h3></div>
`;
}

function projectsDetailsTagsInnerHTML(tags) {
  const tagsContainer = document.createElement("div");
  tagsContainer.classList.add("projects-details__tags");

  tags.forEach((tag) => {
    const img = document.createElement("img");
    img.src = tagsIndex[tag].url;
    img.alt = tagsIndex[tag].alt;
    img.title = tagsIndex[tag].title;
    tagsContainer.appendChild(img);
  });

  return tagsContainer;
}

function projectsDetailsDescriptionInnerHTML(descriptions) {
  const descriptionContainer = document.createElement("div");
  descriptionContainer.classList.add("projects-details__description");

  descriptions.forEach((description) => {
    const p = document.createElement("p");
    p.textContent = description;

    descriptionContainer.appendChild(p);
  });

  return descriptionContainer;
}

function projectsDetailsLinksInnerHTML(links) {
  const linksContainer = document.createElement("div");
  linksContainer.classList.add("projects-details__links");

  links.forEach((link) => {
    const a = document.createElement("a");
    a.href = link.hrefLink;
    a.target = "_blank";

    switch (link.target) {
      case "new-tab":
        a.textContent = "Ouvrir dans un nouvel onglet";
        break;
      case "GitHub":
        a.textContent = "Repo GitHub";
        break;
      case "presentation":
        a.textContent = "Lire la présentation";
        break;
    }

    linksContainer.appendChild(a);
  });

  return linksContainer;
}

// ******** Filtres

const filtersBtns = document.querySelectorAll(
  ".section-content__filters button",
);
const projectsList = document.querySelectorAll(".fileholder");

filtersBtns.forEach((btn) => btn.addEventListener("click", handleFilterBtn));

function handleFilterBtn(e) {
  const categoryID = e.target.dataset.category;
  updateFilterBtnStyle(categoryID);

  projectsList.forEach((project) => {
    const filterList = project.dataset.filters.split(",");
    if (!filterList.includes(categoryID) && categoryID != "0") {
      project.classList.add("hidden");
    } else {
      project.classList.remove("hidden");
    }
  });
}

function updateFilterBtnStyle(categoryID) {
  filtersBtns.forEach((btn) => {
    if (btn.dataset.category === categoryID) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });
}

/**
 * ----------------------------------------
 * - - - - - - - Contact - - - - - - - - -
 * ----------------------------------------
 */
const copyToClipboardBtn = document.querySelector(".link-contact.btn");
copyToClipboardBtn.addEventListener("click", copyToClipboard);

function copyToClipboard() {
  navigator.clipboard.writeText("guillaume.duval-dev@orange.fr");
  copyToClipboardBtn.classList.add("active");
  setTimeout(() => {
    copyToClipboardBtn.classList.remove("active");
  }, 2000);
}
