const anchorBtns = document.querySelectorAll(".section-anchor__link");

anchorBtns.forEach((btn) =>
  btn.addEventListener("click", updateAnchorBtnStyle),
);

function updateAnchorBtnStyle(e) {
  anchorBtns.forEach((btn) => {
    if (btn.dataset.anchor === e.target.dataset.anchor) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });
}
