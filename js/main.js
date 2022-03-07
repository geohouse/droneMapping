var map = L.map('map').setView([40.14887986902617,-105.09319176585663],19);

// Need to set the max zoom to 21 here because the tiles go that fine but Leaflet stops at 18 by default.

var customBackgroundSelection = L.control();
var currentBackgroundLayer;

customBackgroundSelection.update = function(properties){
    this._div.innerHTML = '<label id="background-label for=background-select">Choose a map to view</label>' + 
    '<form id = "background-select">' + 
    '    <input type="radio" id="ortho" name="map-type" value="ortho" checked>' + 
    '    <label for="ortho">Orthomosaic</label>' + 
    '    <input type="radio" id="dsm" name="map-type" value="dsm">' + 
    '    <label for="dsm">Digital Surface Model</label>' + 
    '</form>' + 
    '</div>';
};
    
customBackgroundSelection.onAdd = function(map){
    this._div = L.DomUtil.create('div', 'background-div');
    this.update();
    
        return this._div;
    };
    

customBackgroundSelection.addTo(map);

var backgroundSelector = document.getElementById("background-select");
function createMapBackground(){

    // Remove any current background layer if one exists.
    if(currentBackgroundLayer != undefined){
        map.removeLayer(currentBackgroundLayer);
    }

    var data = new FormData(backgroundSelector);
    var selectedBackground = "";
    for (const entry of data){
            selectedBackground = entry[1];
    }  
    console.log("The selected background is:");
    console.log(selectedBackground);
    // Cap the zoom range at what the tiles support
    if(selectedBackground == "ortho"){
        currentBackgroundLayer = L.tileLayer('https://geohouse.github.io/droneMappingCO/mapTiles/Longmont_030422/orthomosaic/{z}/{x}/{-y}.png', {
                    maxZoom:21,
                    attribution: 'Map tiles made with <a href="https://www.opendronemap.org">OpenDroneMap</a>, using drone images collected by <a href="https://github.com/geohouse">geohouse</a>'
        });
    }

    if(selectedBackground == "dsm"){
        currentBackgroundLayer = L.tileLayer('https://geohouse.github.io/droneMappingCO/mapTiles/Longmont_030422/surfaceModel/{z}/{x}/{-y}.png', {
                    maxZoom:21,
                    attribution: 'Map tiles made with <a href="https://www.opendronemap.org">OpenDroneMap</a>, using drone images collected by <a href="https://github.com/geohouse">geohouse</a>'
        });
    }
    currentBackgroundLayer.addTo(map);
}

backgroundSelector.addEventListener("change", createMapBackground);

/*
currentBackgroundLayer = L.tileLayer('https://basemap.nationalmap.gov/arcgis/rest/services/USGSImageryOnly/MapServer/tile/{z}/{y}/{x}',{
    attribution: 'Map tiles by <a href="https://usgs.gov">Department of Interior/USGS</a>',
});
currentBackgroundLayer.addTo(map);
*/

createMapBackground();