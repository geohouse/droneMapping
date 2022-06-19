// LA landscape area mapping
var map = L.map('map').setView([35.887520,-106.324200],21);

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

let backgroundSelector = document.getElementById("background-select");

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

function createTileLayerURL(tileTypeSelection){

    let tileLayerURL = "https://geohouse.github.io/droneMapping/mapTiles/LA_landscape_061822/" + tileTypeSelection + "/{z}/{x}/{-y}.png";
    return tileLayerURL;
}


function createMapBackground(){

    // Remove any current background layer if one exists.
    if(currentBackgroundLayer != undefined){
        map.removeLayer(currentBackgroundLayer);
    }
    let tileTypeSelection = getSelectedBackgroundName();
    let tileLayerURL = createTileLayerURL(tileTypeSelection);
    // Cap the zoom range at what the tiles support
    
    currentBackgroundLayer = L.tileLayer(tileLayerURL, {
                maxZoom:21,
                attribution: 'Map tiles made with <a href="https://www.opendronemap.org">OpenDroneMap</a>, using drone images collected by <a href="https://github.com/geohouse">geohouse</a>'
    });
    currentBackgroundLayer.addTo(map);
}

backgroundSelector.addEventListener("change", createMapBackground);

createMapBackground();
