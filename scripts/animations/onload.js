window.addEventListener("load", () => {
  document.querySelector(".cliffs-silhouette").classList.remove("hide");
  document.querySelector(".alpinist-silhouette").classList.remove("hide");
  document
    .querySelectorAll(".section-anchor")
    .forEach((anchor) => anchor.classList.remove("hide"));
});
