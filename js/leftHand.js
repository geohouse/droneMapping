// Left Hand Creek area mapping
var map = L.map("map").setView([40.149408, -105.0942], 19);

// Need to set the max zoom to 21 here because the tiles go that fine but Leaflet stops at 18 by default.

var customBackgroundSelection = L.control();
var currentBackgroundLayer;

customBackgroundSelection.update = function (properties) {
  this._div.innerHTML =
    '<label id="background-label" for="background-select">Choose a map to view</label>' +
    '<form id = "background-select">' +
    '    <input type="radio" id="orthomosaic" name="map-type" value="orthomosaic" checked>' +
    '    <label for="orthomosaic">Orthomosaic</label>' +
    '    <input type="radio" id="surfaceModel" name="map-type" value="surfaceModel">' +
    '    <label for="surfaceModel">Digital Surface Model</label>' +
    "</form>" +
    "</div>";
};

customBackgroundSelection.onAdd = function (map) {
  this._div = L.DomUtil.create("div", "background-div");
  this.update();

  return this._div;
};

customBackgroundSelection.addTo(map);

// var customControlYearSlider = L.control();

// customControlYearSlider.update = function (properties) {
//   this._div.innerHTML =
//     '<label id="slide-label" for="slider">Month to map (2022)</label>' +
//     '<input type = "range" id = "slider" name = "slider" min="1" max="11" step="1" value="1">' +
//     '<div class="sliderTicks">' +
//     '<p class="sliderTick">Mar.</p>' +
//     '<p class="sliderTick">Apr.</p>' +
//     '<p class="sliderTick">May</p>' +
//     '<p class="sliderTick">May</p>' +
//     '<p class="sliderTick">May</p>' +
//     '<p class="sliderTick">May</p>' +
//     '<p class="sliderTick">Jun.</p>' +
//     '<p class="sliderTick">Jul.</p>' +
//     '<p class="sliderTick">Aug.</p>' +
//     '<p class="sliderTick">Sep.</p>' +
//     '<p class="sliderTick">Oct.</p>' +
//     "</div>" +
//     '<div class="sliderTicks">' +
//     '<p class="sliderTick">     </p>' +
//     '<p class="sliderTick">     </p>' +
//     '<p class="sliderTick">-----</p>' +
//     '<p class="sliderTick">-----</p>' +
//     '<p class="sliderTick">-----</p>' +
//     '<p class="sliderTick">-----</p>' +
//     '<p class="sliderTick">     </p>' +
//     '<p class="sliderTick">     </p>' +
//     '<p class="sliderTick">     </p>' +
//     '<p class="sliderTick">     </p>' +
//     '<p class="sliderTick">     </p>' +
//     "</div>" +
//     '<div class="sliderTicks">' +
//     '<p class="sliderTick">     </p>' +
//     '<p class="sliderTick">     </p>' +
//     '<p class="sliderTick">1st wk.</p>' +
//     '<p class="sliderTick">2nd wk.</p>' +
//     '<p class="sliderTick">3rd wk.</p>' +
//     '<p class="sliderTick">4th wk.</p>' +
//     '<p class="sliderTick">     </p>' +
//     '<p class="sliderTick">     </p>' +
//     '<p class="sliderTick">     </p>' +
//     '<p class="sliderTick">     </p>' +
//     '<p class="sliderTick">     </p>' +
//     "</div>";
// };

// customControlYearSlider.onAdd = function (map) {
//   this._div = L.DomUtil.create("div", "slider-div");
//   this.update();
//   // Disable map dragging when clicking and dragging within the year slider box (makes it so the slider selects, but
//   // doesn't pan the map at the same time)
//   this._div.onmousedown = (e) => {
//     map.dragging.disable();
//     //console.log("selected in slider");
//   };
//   this._div.onmouseup = () => {
//     map.dragging.enable();
//     //console.log("selected in slider");
//   };
//   this._div.onmouseover = () => {
//     map.dragging.disable();
//     //console.log("selected in slider");
//   };
//   this._div.onmouseout = () => {
//     map.dragging.enable();
//     //console.log("selected in slider");
//   };
//   return this._div;
// };

// customControlYearSlider.addTo(map);

const dateButtonSelection = L.control();

dateButtonSelection.update = function (properties) {
  this._div.innerHTML = `
  <p id="month-select-label">Month to map (2022)</p>
  <div class="date-button-div">
      <button type="button" class="date-select">Mar</button>
      <button type="button" class="date-select">Apr</button>
      <div id="may-buttons">
      <button type="button" class="date-select" id="may-1">May Wk 1</button>
      <button type="button" class="date-select" id="may-2">May Wk 2</button>
      <button type="button" class="date-select" id="may-3">May Wk 3</button>
      <button type="button" class="date-select" id="may-4">May Wk 4</button>
      </div>
      <button type="button" class="date-select">Jun</button>
      <button type="button" class="date-select">Jul</button>
      <button type="button" class="date-select">Aug</button>
      <button type="button" class="date-select">Sep</button>
      <button type="button" class="date-select">Oct</button>
      </div>`;
};

dateButtonSelection.onAdd = function (map) {
  this._div = L.DomUtil.create("div", "date-div");
  this.update();

  return this._div;
};

dateButtonSelection.addTo(map);

//

let backgroundSelector = document.getElementById("background-select");
let sliderElement = document.getElementById("slider");

function getSelectedBackgroundName() {
  let data = new FormData(backgroundSelector);
  var selectedBackground = "";
  for (const entry of data) {
    selectedBackground = entry[1];
  }
  console.log("The selected background is:");
  // Should be either 'orthomosaic' or 'surfaceModel'
  console.log(selectedBackground);
  return selectedBackground;
}

function getSelectedMonth() {
  // The selected month is the date selector button that
  // has the class .active on it (only 1 date can have the
  // .active class at a time)

  // Return the march date by default
  let dateToPlot = "Mar";

  for (let dateButton of Array.from(dateButtons)) {
    console.log({ dateButton });
    if (dateButton.classList.contains("active")) {
      dateToPlot = dateButton.innerText;
    }
  }

  console.log(`Date to plot is: ${dateToPlot}`);

  //let dateToPlot = document.getElementById("slider").value;
  // This is the name of the folder in both the ortho and the DSM
  // tile locations that contains the tiles for the selected month
  let tileFolderNameForDate = "";
  if (dateToPlot == "Mar") {
    tileFolderNameForDate = "Longmont_030422";
  }
  if (dateToPlot == "Apr") {
    tileFolderNameForDate = "Longmont_040822";
  }
  if (dateToPlot == "May Wk 1") {
    tileFolderNameForDate = "Longmont_050322";
  }
  if (dateToPlot == "May Wk 2") {
    tileFolderNameForDate = "Longmont_051022";
  }
  if (dateToPlot == "May Wk 3") {
    tileFolderNameForDate = "Longmont_051822";
  }
  if (dateToPlot == "May Wk 4") {
    tileFolderNameForDate = "Longmont_052622";
  }
  if (dateToPlot == "Jun") {
    tileFolderNameForDate = "Longmont_060622";
  }
  if (dateToPlot == "Jul") {
    tileFolderNameForDate = "Longmont_072822";
  }
  if (dateToPlot == "Aug") {
    tileFolderNameForDate = "Longmont_082622";
  }
  if (dateToPlot == "Sep") {
    tileFolderNameForDate = "Longmont_091922";
  }
  if (dateToPlot == "Oct") {
    tileFolderNameForDate = "Longmont_101422";
  }
  return tileFolderNameForDate;
}

function createTileLayerURL(tileTypeSelection, monthSelection) {
  let tileLayerURL = `https://geohouse.github.io/droneMapping/mapTiles/${monthSelection}/${tileTypeSelection}/{z}/{x}/{-y}.png`;
  return tileLayerURL;
}

function createMapBackground() {
  // Remove any current background layer if one exists.
  if (currentBackgroundLayer != undefined) {
    map.removeLayer(currentBackgroundLayer);
  }
  let tileTypeSelection = getSelectedBackgroundName();
  let monthSelection = getSelectedMonth();
  let tileLayerURL = createTileLayerURL(tileTypeSelection, monthSelection);
  // Cap the zoom range at what the tiles support

  currentBackgroundLayer = L.tileLayer(tileLayerURL, {
    maxZoom: 21,
    attribution:
      'Map tiles made with <a href="https://www.opendronemap.org">OpenDroneMap</a>, using drone images collected by <a href="https://github.com/geohouse">geohouse</a>',
  });
  currentBackgroundLayer.addTo(map);
}

const dateButtons = document.querySelectorAll(".date-select");

dateButtons.forEach((dateButton) => {
  console.log(dateButton);
  dateButton.addEventListener("click", (event) => {
    dateButtons.forEach((dateButton) => {
      // clear any .active class for any button other than the one clicked
      if (dateButton.innerText !== event.currentTarget.innerText) {
        dateButton.classList.remove("active");
      } else {
        // toggle the .active class for the button clicked.
        event.currentTarget.classList.toggle("active");
      }
      createMapBackground();
    });
  });
});

backgroundSelector.addEventListener("change", createMapBackground);
// sliderElement.addEventListener("change", createMapBackground);
/*
currentBackgroundLayer = L.tileLayer('https://basemap.nationalmap.gov/arcgis/rest/services/USGSImageryOnly/MapServer/tile/{z}/{y}/{x}',{
    attribution: 'Map tiles by <a href="https://usgs.gov">Department of Interior/USGS</a>',
});
currentBackgroundLayer.addTo(map);
*/

createMapBackground();
