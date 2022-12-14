// From https://www.w3schools.com/howto/howto_js_portfolio_filter.asp

function filterSelection(labelSelection) {
  const columnElements = document.querySelectorAll(".column");

  console.log(columnElements);
  for (let columnElement of columnElements) {
    if (labelSelection === "all") {
      columnElement.classList.add("show");
    } else if (columnElement.classList.contains(labelSelection)) {
      columnElement.classList.add("show");
    } else {
      columnElement.classList.remove("show");
    }
  }

  //   for (let index = 0; index < columnElements.length; index++) {
  //     w3RemoveClass(columnElements[index], "show");
  //     if (columnElements[index].className.indexOf(labelSelection) > -1) {
  //       w3AddClass(columnElements[index], "show");
  //     }
  //   }
  // }

  // function w3AddClass(element, name) {
  //   const arr1 = element.className.split(" ");
  //   const arr2 = name.split(" ");
  //   for (let index = 0; index < arr2.length; index++) {
  //     if (arr1.indexOf(arr2[index]) === -1) {
  //       element.className += " " + arr2[index];
  //     }
  //   }
  // }

  // function w3RemoveClass(element, name) {
  //   const arr1 = element.className.split(" ");
  //   const arr2 = name.split(" ");
  //   for (let index = 0; index < arr2.length; index++) {
  //     while (arr1.indexOf(arr2[index]) > -1) {
  //       arr1.splice(arr1.indexOf(arr2[index]), 1);
  //     }
  //   }
  //   element.className = arr1.join(" ");
  // }

  // Add active class to the current button (highlight it)
  const btnContainer = document.querySelector("#myBtnContainer");
  const btns = btnContainer.querySelectorAll(".btn");
  for (let index = 0; index < btns.length; index++) {
    btns[index].addEventListener("click", function () {
      var current = document.querySelectorAll(".active");
      current[0].className = current[0].className.replace(" active", "");
      this.className += " active";
    });
  }
}

filterSelection("all");
