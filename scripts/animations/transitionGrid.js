export default function (animationName = null, transformOrigin = "center") {
  const gridContainer = document.querySelector(".transition-grid");
  containerCleaning(gridContainer);

  const duration = 200;
  const delay = 8;
  const boxesCount = 144;

  for (let i = 0; i < boxesCount; i++) {
    const box = document.createElement("div");
    box.style.transformOrigin = transformOrigin;
    box.style.animationName = animationName;
    box.style.animationDuration = `${duration}ms`;
    box.style.animationDelay = `${i * delay}ms`;
    gridContainer.appendChild(box);
  }

  if (animationName) {
    shuffleBoxes(gridContainer.querySelectorAll("div"));

    lockNavigation();

    setTimeout(
      () => {
        containerCleaning(gridContainer);
        unLockNavigation();
      },
      delay * boxesCount + duration,
    );
  }
}

function shuffleBoxes(boxes) {
  boxes.forEach((box) => {
    const min = Math.ceil(0);
    const max = Math.floor(144);
    const randomPos = Math.floor(Math.random() * (max - min + 1) + min);
    box.style.order = randomPos;
  });
}

const containerCleaning = (container) => (container.textContent = "");

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
