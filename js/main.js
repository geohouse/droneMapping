var map = L.map('map').setView([40.15,-105.1],15);

drone_ortho = L.tileLayer('https://geohouse.github.io/droneMappingCO/mapTiles/Longmont_030422/orthomosaic/{z}/{x}/{-y}.png', {
                attribution: 'Map tiles made with <a href="https://www.opendronemap.org">OpenDroneMap</a>, using drone images collected by geohouse.',
        });
drone_ortho.addTo(map);