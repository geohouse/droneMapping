var map = L.map('map').setView([40.14887986902617,-105.09319176585663],19);

// Need to set the max zoom to 21 here because the tiles go that fine but Leaflet stops at 18 by default.
drone_ortho = L.tileLayer('https://geohouse.github.io/droneMappingCO/mapTiles/Longmont_030422/orthomosaic/{z}/{x}/{-y}.png', {
                maxZoom:21,
                attribution: 'Map tiles made with <a href="https://www.opendronemap.org">OpenDroneMap</a>, using drone images collected by <a href="https://github.com/geohouse">geohouse</a>'
        });


/*
currentBackgroundLayer = L.tileLayer('https://basemap.nationalmap.gov/arcgis/rest/services/USGSImageryOnly/MapServer/tile/{z}/{y}/{x}',{
    attribution: 'Map tiles by <a href="https://usgs.gov">Department of Interior/USGS</a>',
});
currentBackgroundLayer.addTo(map);
*/

drone_ortho.addTo(map);