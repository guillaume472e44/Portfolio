/**
 * ----------------------------------------
 * - - - - - - - - Carousel - - - - - - - -
 * ----------------------------------------
 */
const carousel = document.querySelector(".custom-carousel");
const carouselImgs = [...carousel.querySelectorAll(".carousel-img")];
const btnsIndicatorContainer = carousel.querySelector(".buttons-indicators");
carousel.querySelector(".carousel-next").addEventListener("click", moveSlide);
carousel.querySelector(".carousel-prev").addEventListener("click", moveSlide);

const transitionDelay =
  parseFloat(
    window
      .getComputedStyle(carouselImgs[0])
      .getPropertyValue("transition-duration")
      .slice(0, -1),
  ) * 1000;

const carouselState = {
  currentIndex: 0,
  direction: "toLeft",
  moveTo: undefined,
  interval: 5000,
  intervalID: null,
  timeOutId: null,
  preventSpam: false,
};

// Création des boutons d'indications en bas des images
function createBtnIndicator() {
  carouselImgs.forEach((element, index) => {
    const btn = document.createElement("button");
    btn.dataset.slideTo = index;
    btn.dataset.moveTo = "target";
    if (index === 0) btn.classList.add("active");
    const span = document.createElement("span");
    span.textContent = `slide to ${index}`;
    span.classList.add("sr-only");
    btn.appendChild(span);
    btnsIndicatorContainer.appendChild(btn);
    btn.addEventListener("click", moveSlide);
  });
}
// Mise à jour style des boutons d'indications
function updateBtnIndicatorStyle(indexImg) {
  [...btnsIndicatorContainer.querySelectorAll("button")].forEach(
    (btn, index) => {
      btn.classList.remove("active");
      if (index === indexImg) btn.classList.add("active");
    },
  );
}

// Animation des slides
function carouselSlide(
  direction = carouselState.direction,
  interval = carouselState.interval,
  moveTo = carousel.moveTo,
) {
  const CSSdirection = direction === "toLeft" ? 1 : -1;
  carousel.style.setProperty("--direction", CSSdirection);

  const currentIndex = carouselState.currentIndex;
  const nextIndex = moveTo === undefined ? getNextIndex(direction) : moveTo;

  requestAnimationFrame(() => {
    carouselImgs[nextIndex].classList.add("active", "next");

    carouselState.intervalID = setTimeout(() => {
      carouselImgs[nextIndex].classList.add("toView");
      carouselImgs[currentIndex].classList.add(direction);
      updateBtnIndicatorStyle(nextIndex);
      carouselState.preventSpam = true;

      carouselState.timeOutId = setTimeout(() => {
        carouselImgs[currentIndex].classList.remove("active", direction);
        carouselImgs[nextIndex].classList.remove("next", "toView");
        carouselState.currentIndex = nextIndex;
        carouselState.preventSpam = false;
        carouselSlide();
      }, transitionDelay + 100);
    }, interval);
  });
}

// index de la prochaine image à afficher
function getNextIndex(direction) {
  let nextIndex;

  if (direction === "toLeft") {
    nextIndex =
      carouselState.currentIndex + 1 > carouselImgs.length - 1
        ? 0
        : carouselState.currentIndex + 1;
  } else if (direction === "toRight") {
    nextIndex =
      carouselState.currentIndex - 1 < 0
        ? carouselImgs.length - 1
        : carouselState.currentIndex - 1;
  }

  return nextIndex;
}

// déplacement vers l'image selectionnée par l'utilisateur (boutons)
function moveSlide(e) {
  if (carouselState.preventSpam) return;
  if (e.target.dataset.moveTo === "target") {
    const nextIndex = Number(e.target.dataset.slideTo);
    if (nextIndex === carouselState.currentIndex) return;
    clearTimers();
    moveSlideToTarget(nextIndex);
  } else {
    clearTimers();
    if (e.target.dataset.moveTo === "left") moveSlideToLeft();
    if (e.target.dataset.moveTo === "right") moveSlideToRight();
  }
}
// Bouton "next" à droite de l'image
function moveSlideToLeft() {
  carouselSlide("toLeft", 0);
}
// Bouton "prev" à gauche de l'image
function moveSlideToRight() {
  carouselImgs[getNextIndex("toLeft")].classList.remove("active", "next");
  carouselSlide("toRight", 0);
}
// boutons indicators en bas de l'image
function moveSlideToTarget(nextIndex) {
  let direction;
  if (nextIndex > carouselState.currentIndex) direction = "toLeft";
  else direction = "toRight";

  carouselImgs[getNextIndex("toLeft")].classList.remove("active", "next");

  setTimeout(() => {
    carouselSlide(direction, 0, nextIndex);
  }, 100);
}

function clearTimers() {
  clearTimeout(carouselState.intervalID);
  carouselState.intervalID = null;
  clearTimeout(carouselState.timeOutId);
  carouselState.timeOutId = null;
}

/**
 * -----------------------------------------------
 * - - - - - - - - Filtres galerie - - - - - - - -
 * -----------------------------------------------
 */
const filtersContainer = document.querySelector(".gallery__filters");
const galleryContainer = document.querySelector(".gallery__items");
const galleryImgs = [...galleryContainer.querySelectorAll("img")];
let currentFilter = "Tous";

function createFilterBtn() {
  [
    "Tous",
    ...new Set(galleryImgs.map((tag) => tag.dataset.galleryTag)),
  ].forEach((category) => {
    const button = document.createElement("button");
    button.textContent = category;
    button.dataset.filterTag = category;

    if (category === currentFilter) button.classList.add("active");

    button.addEventListener("click", handleFilterGallery);

    filtersContainer.appendChild(button);
  });
}

function handleFilterGallery(e) {
  const categoryTag = e.target.dataset.filterTag;
  if (categoryTag === currentFilter) return;
  currentFilter = categoryTag;

  updateFilterBtnStyle(categoryTag);

  galleryImgs.forEach((img) => {
    img.classList.remove("hidden");
    if (img.dataset.galleryTag !== categoryTag && categoryTag !== "Tous") {
      img.classList.add("hidden");
    }
  });

  requestAnimationFrame(() => {
    galleryContainer.classList.add("hidden");
    galleryContainer.classList.remove("show");

    setTimeout(() => {
      galleryContainer.classList.remove("hidden");
      galleryContainer.classList.add("show");
    }, 100);
  });
}

function updateFilterBtnStyle(tag) {
  [...filtersContainer.children].forEach((btn) => {
    if (btn.dataset.filterTag === tag) btn.classList.add("active");
    else btn.classList.remove("active");
  });
}

/**
 * ----------------------------------------
 * - - - - - - - - Lightbox - - - - - - - -
 * ----------------------------------------
 */
const lightbox = document.getElementById("lightbox");
const lightboxWrapper = lightbox.querySelector(".lightbox__wrapper");
const nextLBImgBtn = lightboxWrapper.querySelector(".mg-next");
const prevLBImgBtn = lightboxWrapper.querySelector(".mg-prev");

galleryImgs.forEach((img) => img.addEventListener("click", openModal));
galleryImgs.forEach((img) => img.addEventListener("keydown", openModal));
lightbox.addEventListener("close", closeModal);
nextLBImgBtn.addEventListener("click", lightboxCommands);
prevLBImgBtn.addEventListener("click", lightboxCommands);
document.addEventListener("keydown", lightboxCommands);
lightboxWrapper.addEventListener("pointerdown", lightboxCommands);
lightboxWrapper.addEventListener("pointerup", lightboxCommands);
lightboxWrapper.addEventListener("pointercancel", lightboxCommands);
lightboxWrapper.addEventListener("pointerleave", lightboxCommands);

let lightboxActive = false;
let lightboxImgs = [];
let currentImgIndex;
let startSwipePosition = undefined;

function openModal(e) {
  if (e.type === "keydown" && e.key !== "Enter") return;

  lightboxActive = true;
  lightboxImgs = galleryImgs.filter((img) => !img.classList.contains("hidden"));
  document.body.style.overflow = "hidden";

  currentImgIndex = lightboxImgs.indexOf(e.target);
  if (currentImgIndex === -1) return;

  currentImageDisplay();

  lightbox.showModal();

  lightbox.focus();
}

function currentImageDisplay() {
  lightboxWrapper.querySelector("img")?.remove();

  const img = document.createElement("img");
  img.src = lightboxImgs[currentImgIndex].src;
  img.alt = lightboxImgs[currentImgIndex].alt;
  lightboxWrapper.appendChild(img);
}

function lightboxCommands(e) {
  if (!lightboxActive) return;

  let direction;
  switch (e.type) {
    case "click":
      direction = handlebtns(e.target);
      break;
    case "keydown":
      direction = handleKeys(e.key);
      break;
    case "pointerdown":
      startSwipePosition = e.clientX;
      break;
    case "pointerup":
      direction = handleSwipe(e.clientX);
      break;
    case "pointercancel":
    case "pointerleave":
      startSwipePosition = undefined;
      break;
  }

  if (direction) switchLightboxImg(direction);
}

function handlebtns(target) {
  if (target.classList.contains("mg-prev")) return "prev";
  if (target.classList.contains("mg-next")) return "next";
}
function handleKeys(key) {
  if (key === "ArrowLeft" || key === "ArrowUp") return "prev";
  if (key === "ArrowRight" || key === "ArrowDown") return "next";
}
function handleSwipe(endSwipePosition) {
  if (startSwipePosition === undefined) return;
  const delta = endSwipePosition - startSwipePosition;
  const threshold = 50;
  startSwipePosition = undefined;
  if (Math.abs(delta) > threshold) return delta > 0 ? "prev" : "next";
}

function switchLightboxImg(direction) {
  if (direction === "next") {
    currentImgIndex++;
    nextLBImgBtn.focus();
  } else {
    currentImgIndex--;
    prevLBImgBtn.focus();
  }

  if (currentImgIndex < 0) currentImgIndex = lightboxImgs.length - 1;
  if (currentImgIndex > lightboxImgs.length - 1) currentImgIndex = 0;

  currentImageDisplay();
}

function closeModal() {
  lightboxWrapper.querySelector("img")?.remove();
  lightboxActive = false;
  lightboxImgs = [];
  document.body.style.overflow = "auto";
}

// Attente chargement de la page avant de
// ----> créer les boutons d'indication images carousel
// ----> lancer l'animation du carousel
// ----> créer les filtres de la galerie
window.addEventListener("load", () => {
  createBtnIndicator();
  carouselSlide();
  createFilterBtn();
});
