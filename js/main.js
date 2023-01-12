function filterSelection(labelSelection) {
  const cardElements = document.querySelectorAll("article");

  //console.log(cardElements);
  // Do the filtering by adding/removing the 'show' class from the different
  // cards (safe to add even if it's already there, and safe to remove if it's already gone)
  for (let cardElement of cardElements) {
    if (labelSelection === "all") {
      cardElement.classList.add("show");
    } else if (cardElement.classList.contains(labelSelection)) {
      cardElement.classList.add("show");
    } else {
      cardElement.classList.remove("show");
    }
  }

  // Add active class to the current button (highlight it)
  const buttons = document.querySelectorAll(".btn");
  for (let button of buttons) {
    button.addEventListener("click", function () {
      let currentActive = document.querySelector(".active");
      currentActive.classList.remove("active");
      button.classList.add("active");
    });
  }
}

filterSelection("all");
