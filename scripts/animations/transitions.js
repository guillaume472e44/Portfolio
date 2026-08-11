export default function (transition) {
  const transitionContainer = document.querySelector(".transitions-container");
  transitionContainer.classList.add("hideContent");

  switch (transition) {
    case "grid":
      grid(transitionContainer);
      break;
    case "vertical-bottom":
      fadeIn(transitionContainer, "bottom");
      break;
  }
}

function fadeIn(container, transformOrigin) {
  const duration = 2000;

  container.classList.add("verticalSweep");
  container.style.transformOrigin = transformOrigin;

  lockNavigation();

  setTimeout(() => {
    container.classList.remove("hideContent");
    container.classList.remove("verticalSweep");
    unLockNavigation();
  }, duration);
}

function grid(container) {
  const duration = 300;
  const delay = 16;
  const boxesCount = 144;

  for (let i = 0; i < boxesCount; i++) {
    const box = document.createElement("div");
    // box.style.transformOrigin = "center";
    box.style.animationName = "fadeOutAndScale";
    box.style.animationDuration = `${duration}ms`;
    box.style.animationDelay = `${i * delay}ms`;
    container.appendChild(box);
  }

  shuffleBoxes(container.querySelectorAll("div"));

  lockNavigation();

  setTimeout(
    () => {
      containerCleaning(container);
      unLockNavigation();
    },
    delay * boxesCount + duration,
  );

  container.classList.remove("hideContent");
}

// export function transitionGrid(
//   animationName = null,
//   transformOrigin = "center",
// ) {
//   const gridContainer = document.querySelector(".transitions-container");
//   containerCleaning(gridContainer);

//   const duration = 300;
//   const delay = 16;
//   const boxesCount = 144;

//   for (let i = 0; i < boxesCount; i++) {
//     const box = document.createElement("div");
//     box.style.transformOrigin = transformOrigin;
//     box.style.animationName = animationName;
//     box.style.animationDuration = `${duration}ms`;
//     box.style.animationDelay = `${i * delay}ms`;
//     gridContainer.appendChild(box);
//   }

//   if (animationName) {
//     shuffleBoxes(gridContainer.querySelectorAll("div"));

//     lockNavigation();

//     setTimeout(
//       () => {
//         containerCleaning(gridContainer);
//         unLockNavigation();
//       },
//       delay * boxesCount + duration,
//     );
//   }
// }

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
