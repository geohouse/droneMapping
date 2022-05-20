// Left Hand Creek area mapping
var map = L.map('map').setView([40.149408,-105.094659],19);

// Need to set the max zoom to 21 here because the tiles go that fine but Leaflet stops at 18 by default.

var customBackgroundSelection = L.control();
var currentBackgroundLayer;

customBackgroundSelection.update = function(properties){
    this._div.innerHTML = '<label id="background-label for=background-select">Choose a map to view</label>' + 
    '<form id = "background-select">' + 
    '    <input type="radio" id="orthomosaic" name="map-type" value="orthomosaic" checked>' + 
    '    <label for="orthomosaic">Orthomosaic</label>' + 
    '    <input type="radio" id="surfaceModel" name="map-type" value="surfaceModel">' + 
    '    <label for="surfaceModel">Digital Surface Model</label>' + 
    '</form>' + 
    '</div>';
};
    
customBackgroundSelection.onAdd = function(map){
    this._div = L.DomUtil.create('div', 'background-div');
    this.update();
    
        return this._div;
    };
    

customBackgroundSelection.addTo(map);

var customControlYearSlider = L.control();

customControlYearSlider.update = function(properties){
    this._div.innerHTML = '<label id="slide-label" for="slider">Month to map (2022)</label>' + 
    '<input type = "range" id = "slider" name = "slider" min="1" max="5" step="1" value="1">' + 
    '<div class="sliderTicks">' + 
        '<p class="sliderTick">Mar.</p>' + 
        '<p class="sliderTick">Apr.</p>' + 
        '<p class="sliderTick">early May</p>' + 
        '<p class="sliderTick">mid May</p>' + 
        '<p class="sliderTick">late May</p>' + 
        '</div>';
};

customControlYearSlider.onAdd = function(map){
    this._div = L.DomUtil.create('div', 'slider-div');
    this.update();
    // Disable map dragging when clicking and dragging within the year slider box (makes it so the slider selects, but
    // doesn't pan the map at the same time)
    this._div.onmousedown = (e) => {
        map.dragging.disable();
        //console.log("selected in slider");
    };
    this._div.onmouseup = () => {
        
        map.dragging.enable();
        //console.log("selected in slider");
    };
    this._div.onmouseover = () => {
        
        map.dragging.disable();
        //console.log("selected in slider");
    };
    this._div.onmouseout = () => {
        
        map.dragging.enable();
        //console.log("selected in slider");
    };
        return this._div;
    };

customControlYearSlider.addTo(map);

let backgroundSelector = document.getElementById("background-select");
let sliderElement = document.getElementById("slider");

function getSelectedBackgroundName(){
    let data = new FormData(backgroundSelector);
    var selectedBackground = "";
    for (const entry of data){
            selectedBackground = entry[1];
    }  
    console.log("The selected background is:");
    // Should be either 'orthomosaic' or 'surfaceModel'
    console.log(selectedBackground);
    return selectedBackground;
}

function getSelectedMonth(){
    // Will be either 'Mar. 2022' or 'Apr. 2022'
    let dateToPlot = document.getElementById("slider").value;
    // This is the name of the folder in both the ortho and the DSM
    // tile locations that contains the tiles for the selected month
    console.log("Date to plot is: " + dateToPlot)
    let tileFolderNameForDate = ""
    if (dateToPlot == "1"){
        tileFolderNameForDate = "Longmont_030422"
    }
    if (dateToPlot == "2"){
        tileFolderNameForDate = "Longmont_040822"
    }
    if (dateToPlot == "3"){
        tileFolderNameForDate = "Longmont_050322"
    }
    if (dateToPlot == "4"){
        tileFolderNameForDate = "Longmont_051022"
    }
    if (dateToPlot == "5"){
        tileFolderNameForDate = "Longmont_051822"
    }
    return tileFolderNameForDate;
}

function createTileLayerURL(tileTypeSelection, monthSelection){

    let tileLayerURL = "https://geohouse.github.io/droneMapping/mapTiles/" + monthSelection + "/" + tileTypeSelection + "/{z}/{x}/{-y}.png";
    return tileLayerURL;
}


function createMapBackground(){

    // Remove any current background layer if one exists.
    if(currentBackgroundLayer != undefined){
        map.removeLayer(currentBackgroundLayer);
    }
    let tileTypeSelection = getSelectedBackgroundName();
    let monthSelection = getSelectedMonth();
    let tileLayerURL = createTileLayerURL(tileTypeSelection, monthSelection);
    // Cap the zoom range at what the tiles support
    
    currentBackgroundLayer = L.tileLayer(tileLayerURL, {
                maxZoom:21,
                attribution: 'Map tiles made with <a href="https://www.opendronemap.org">OpenDroneMap</a>, using drone images collected by <a href="https://github.com/geohouse">geohouse</a>'
    });
    currentBackgroundLayer.addTo(map);
}

backgroundSelector.addEventListener("change", createMapBackground);
sliderElement.addEventListener("change", createMapBackground);
/*
currentBackgroundLayer = L.tileLayer('https://basemap.nationalmap.gov/arcgis/rest/services/USGSImageryOnly/MapServer/tile/{z}/{y}/{x}',{
    attribution: 'Map tiles by <a href="https://usgs.gov">Department of Interior/USGS</a>',
});
currentBackgroundLayer.addTo(map);
*/

createMapBackground();











