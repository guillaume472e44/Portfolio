export default function (transition) {
  const transitionContainer = document.querySelector(".transitions-container");
  transitionContainer.classList.add("hideContent");

  if (transition === "grid") {
    grid(transitionContainer);
  } else if (transition) {
    sweep(transitionContainer, transition);
  }
}

function sweep(container, transition) {
  const duration = 250;

  container.classList.add("sweep");
  container.style.transformOrigin = transition.split("-")[1];
  container.style.animationName = `${transition.split("-")[0]}Sweep`;
  container.style.animationDuration = `${duration}ms`;

  lockNavigation();

  setTimeout(() => {
    container.classList.remove("hideContent");
    container.classList.remove("sweep");
    container.style.animationName = null;
    unLockNavigation();
  }, duration);
}

function grid(container) {
  const duration = 300;
  const delay = 16;
  const boxesCount = 144;

  for (let i = 0; i < boxesCount; i++) {
    const box = document.createElement("div");
    box.style.animationName = "fadeOutAndScale";
    box.style.animationDuration = `${duration}ms`;
    box.style.animationDelay = `${i * delay}ms`;
    container.appendChild(box);
  }

  shuffleBoxes(container.querySelectorAll("div"));

  lockNavigation();

  setTimeout(
    () => {
      container.textContent = "";
      unLockNavigation();
    },
    delay * boxesCount + duration,
  );

  container.classList.remove("hideContent");
}

function shuffleBoxes(boxes) {
  boxes.forEach((box) => {
    const min = Math.ceil(0);
    const max = Math.floor(144);
    const randomPos = Math.floor(Math.random() * (max - min + 1) + min);
    box.style.order = randomPos;
  });
}

function lockNavigation() {
  document
    .querySelectorAll(".section-anchor__link")
    .forEach((anchor) => (anchor.dataset.locked = true));
}
function unLockNavigation() {
  document
    .querySelectorAll(".section-anchor__link")
    .forEach((anchor) => (anchor.dataset.locked = false));
}
