function filterSelection(labelSelection) {
  const columnElements = document.querySelectorAll(".column");

  //console.log(columnElements);
  // Do the filtering by adding/removing the 'show' class from the different
  // columns (safe to add even if it's already there, and safe to remove if it's already gone)
  for (let columnElement of columnElements) {
    if (labelSelection === "all") {
      columnElement.classList.add("show");
    } else if (columnElement.classList.contains(labelSelection)) {
      columnElement.classList.add("show");
    } else {
      columnElement.classList.remove("show");
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
