window.addEventListener("load", () => {
  document.querySelector(".cliffs-silhouette").classList.remove("hide");
  document.querySelector(".alpinist-silhouette").classList.remove("hide");
  document
    .querySelectorAll(".section-anchor")
    .forEach((anchor) => anchor.classList.remove("hide"));
  document.querySelector(".footer__silhouettes").classList.remove("hide");
  document
    .querySelector(".Thx1138-silhouette")
    .addEventListener("transitionend", startAnimations);
});

function startAnimations() {
  document.querySelector(".caveman-silhouette").classList.add("animate");
}
