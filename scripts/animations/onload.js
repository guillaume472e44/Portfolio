window.addEventListener("load", () => {
  document.querySelector(".cliffs-silhouette").classList.remove("hide");
  document.querySelector(".alpinist-silhouette").classList.remove("hide");
  document
    .querySelectorAll(".section-anchor")
    .forEach((anchor) => anchor.classList.remove("hide"));
  document.querySelector(".footer__silhouettes").classList.remove("hide");
  document.querySelector(".screen").classList.remove("hide");

  const socialLinks = document.querySelector(".social-links");
  socialLinks.classList.remove("hide");
  socialLinks.addEventListener("transitionend", startAnimations);
  // const screen = document.querySelector(".screen");
  // screen.classList.remove("hide");
  // screen.addEventListener("transitionend", startAnimations);
});

function startAnimations() {
  document.querySelector(".caveman-silhouette").classList.add("animate");
  document.querySelector(".social-links__anchor").classList.add("animate");

}
