const customCursor = document.querySelector(".custom-cursor");
window.addEventListener("mousemove", handleCustomCursor);
function handleCustomCursor(e) {
  customCursor.style.transform = `translate(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%))`;
}

const title = document.querySelector("h1");
const subtitle = document.querySelector(".subtitle");
const heroPushBtn = document.querySelector(".button");
const textTitle = "Porshe, set free.";

function typewriter(word, index) {
  if (index === 3) subtitle.classList.add("active");
  if (index === 6) heroPushBtn.classList.add("active");
  if (index < word.length) {
    setTimeout(() => {
      title.innerHTML += `<span>${word[index]}</span>`;
      typewriter(textTitle, index + 1);
    }, 108);
  }
}

setTimeout(() => {
  typewriter(textTitle, 0);
}, 300);

// scroll animations
const generalAnimatedElements = [
  ...document.querySelectorAll("h2"),
  ...document.querySelectorAll(".section__subtitle"),
];
const contactSectionElements = [
  document.querySelector(".contact__section__info h3"),
  document.querySelector(".contact__section__info p"),
  document.querySelector(".contact__section__link"),
  document.querySelector(".contact__section__img"),
];
const modelsBrowser = [...document.querySelectorAll(".model__browser")];

const animatedContent = [
  ...generalAnimatedElements,
  ...contactSectionElements,
  ...modelsBrowser,
];

const intersectionObserver = new IntersectionObserver(handleIntersect, {
  rootMargin: "-10%",
});

animatedContent.forEach((el) => intersectionObserver.observe(el));

function handleIntersect(entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
      intersectionObserver.unobserve(entry.target);
    }
  });
}
