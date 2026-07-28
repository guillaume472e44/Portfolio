window.addEventListener("load", () => {
  document.querySelector(".cliffs-silhouette").classList.remove("hide");
  document.querySelector(".alpinist-silhouette").classList.remove("hide");
  document
    .querySelectorAll(".section-anchor")
    .forEach((anchor) => anchor.classList.remove("hide"));
  document.querySelector(".footer__silhouettes").classList.remove("hide");

  const screen = document.querySelector(".screen");
  screen.classList.remove("hide");
  screen.addEventListener("transitionend", startAnimations);
});

function startAnimations() {
  document.querySelector(".caveman-silhouette").classList.add("animate");
}
