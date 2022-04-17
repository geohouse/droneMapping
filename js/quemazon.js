// Quemazon area mapping
var map = L.map('map').setView([35.884460,-106.333577],18);

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



var customSceneSelection = L.control();

customSceneSelection.update = function(properties){
    this._div.innerHTML = '<label id="scene-label for=scene-select">Choose an overlapping scene to view</label>' + 
    '<form id = "scene-select">' + 
    '    <input type="checkbox" id="canyons" name="scene-type" value="CanyonsOnly" checked>' + 
    '    <label for="canyons">Show canyons scene</label>' + 
    '    <input type="checkbox" id="trails" name="scene-type" value="TrailsOnly" checked>' + 
    '    <label for="trails">Show trails scene</label>' + 
    '</form>' + 
    '</div>';
};
    
customSceneSelection.onAdd = function(map){
    this._div = L.DomUtil.create('div', 'scene-div');
    this.update();

    // Normally a double click causes Leaflet to zoom to where is double clicked. This removes that
    // functionality from the buttons, because a double click can trigger (and therefore move/zoom the map)
    // when just trying to compare the float types and clicking fairly quickly. This doesn't affect the 
    // ability to double click to zoom anywhere else on the map. 
    // From: https://gist.github.com/rdaly1490/eb98fc5ff5be253c5610
    this._div.ondblclick = (e) => {
        e.stopPropagation();
        console.log("double clicked");
    };
        return this._div;
    };
    

customSceneSelection.addTo(map);

function generateTileURL(selectedBackground, mapLocation){
    // For the canyons flight area
    let tileLayerURL = "https://geohouse.github.io/droneMapping/mapTiles/" + mapLocation + "/" + selectedBackground + "/{z}/{x}/{-y}.png";
    console.log(tileLayerURL);
    return tileLayerURL;
}

// These will be used in createMapBackgrounds to get the selected scenes
let canyonSceneCheck = document.getElementById("canyons");
let trailSceneCheck = document.getElementById("trails");
let trailLayer;
let canyonLayer;
function createMapBackgrounds(){

    // Remove any current background layer if one exists.
    if(canyonLayer != undefined){
        map.removeLayer(canyonLayer);
    }

    if(trailLayer != undefined){
        map.removeLayer(trailLayer);
    }
    let selectedBackgroundType = getSelectedBackgroundName();

    // Cap the zoom range at what the tiles support
    // Plot the trails layer first (under the canyons tile layer) for the DSM, 
    // And the canyons layer first (under the trails tile layer) for the ortho photo.
    
    if(canyonSceneCheck.checked){
        let tileURL_canyons = generateTileURL(selectedBackgroundType, "Quemazon_canyons_032822");
        canyonLayer = L.tileLayer(tileURL_canyons, {
                    maxZoom:21,
                    attribution: 'Map tiles made with <a href="https://www.opendronemap.org">OpenDroneMap</a>, using drone images collected by <a href="https://github.com/geohouse">geohouse</a>'
        });
 
    } 

    if(trailSceneCheck.checked){
        let tileURL_trail = generateTileURL(selectedBackgroundType, "Quemazon_trail_032822");
        trailLayer = L.tileLayer(tileURL_trail, {
            maxZoom:21,
            attribution: 'Map tiles made with <a href="https://www.opendronemap.org">OpenDroneMap</a>, using drone images collected by <a href="https://github.com/geohouse">geohouse</a>'
        });
    }

    if(trailSceneCheck.checked && canyonSceneCheck.checked && selectedBackgroundType == "orthomosaic"){
        canyonLayer.addTo(map);
        trailLayer.addTo(map);
    }

    if(trailSceneCheck.checked && canyonSceneCheck.checked && selectedBackgroundType == "surfaceModel"){
        trailLayer.addTo(map);
        canyonLayer.addTo(map);
    }

    if(trailSceneCheck.checked){
        trailLayer.addTo(map);
    }

    if(canyonSceneCheck.checked){
        canyonLayer.addTo(map);
    }


}

backgroundSelector.addEventListener("change", createMapBackgrounds);

canyonSceneCheck.addEventListener("change", createMapBackgrounds);
trailSceneCheck.addEventListener("change", createMapBackgrounds);


createMapBackgrounds();
