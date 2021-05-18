var map = L.map('map', {
    crs: L.CRS.Simple,
    // minZoom: 0,
    maxZoom: 10,
    zoom: 3
});

{ // Defining base maps
    // Use tiled maps if possible, allows better zooming
    // Make sure tiling scheme is growing downwards!
    // https://github.com/Leaflet/Leaflet/issues/4333#issuecomment-199753161
    // https://github.com/commenthol/gdal2tiles-leaflet
    // ./gdal2tiles.py -l -p raster -w none -z 2-5 full_map.jpg map_tiles
    var tiled_map = new L.tileLayer('map_tiles/{z}/{x}/{y}.png', {
        minNativeZoom: 2,
        maxNativeZoom: 5,
        attribution: '<a href="https://steamcommunity.com/sharedfiles/filedetails/?id=280577526">Map and images from EnigmaticRunner</a>',
        noWrap: true,
        detectRetina: true
    });

    var baseMaps = {
        "Ingame map": tiled_map
    };

    // Make one base layer visible by default
    tiled_map.addTo(map);
}

{ // Helper functions
    function add_checkbox_for_marker(feature, marker, list, cluster) {
        // Add checkbox for marker
        var list_entry = document.createElement('li');
        var checkbox = document.createElement('input');
        checkbox.type = "checkbox";
        var label = document.createElement('label')
        label.appendChild(document.createTextNode(feature.properties.number));
        label.onclick = () => {
            // center marker
            map.setView(marker.getLatLng());
            // Opening the popup stops the animation of setView()
            // marker.openPopup();
        };
        list_entry.appendChild(checkbox);
        list_entry.appendChild(label);
        list.appendChild(list_entry);

        checkbox.addEventListener('change', () => {
            if (checkbox.checked) {
                map.removeLayer(marker);
            } else {
                marker.addTo(cluster).addTo(map);
            }
        });
    }

}

{ // Defining overlay maps - markers
    // Make markers groupable to clusters
    var treasure_bag_cluster = L.markerClusterGroup({
        maxClusterRadius: 40
    });

    // Add lists to sidebar
    var treasure_bag_list = document.getElementById("treasure_bags").appendChild(document.createElement('ul'));

    // Add all markers and attach popups with information
    L.geoJSON(treasure_bags, {
        pointToLayer: function (feature, latlng) {
            // custom marker
            var marker = L.marker(latlng, {
                // Simple symbols and text/numbers on markers: https://github.com/coryasilva/Leaflet.ExtraMarkers
                icon: L.ExtraMarkers.icon({
                    icon: 'fa-number',
                    number: feature.properties.number,
                    shape: 'square',
                    markerColor: 'cyan'
                })
            });

            add_checkbox_for_marker(feature, marker, treasure_bag_list, treasure_bag_cluster);
            return marker;
        },
        onEachFeature: function (feature, layer) {
            // popup with simple image and description
            layer.bindPopup("<a href='https://steamuserimages-a.akamaihd.net/ugc/" + feature.properties.id + "/'><img src='https://steamuserimages-a.akamaihd.net/ugc/" + feature.properties.id + "/' width='500/' /></a>" + feature.properties.description, { maxWidth: 500 });
        }
    }).addTo(treasure_bag_cluster);

    var overlayMaps = {
        "Treasure Bags": treasure_bag_cluster
    };

    // Make overlay layer visible by default
    map.addLayer(treasure_bag_cluster);

    // Center view over map
    map.fitBounds(treasure_bag_cluster.getBounds());
}

// Add user selection to map
L.control.layers(baseMaps, overlayMaps).addTo(map);

// Add siedbar to map
var sidebar = L.control.sidebar('sidebar').addTo(map);

{ // Coordinate Finder, disable after getting all positions
    // https://www.techtrail.net/creating-an-interactive-map-with-leaflet-js/
    // var marker = L.marker([0, 0], {
    //     draggable: true,
    // }).addTo(map);
    // marker.bindPopup('LatLng Marker').openPopup();
    // marker.on('dragend', function (e) {
    //     marker.getPopup().setContent('<span style="white-space: pre">' + JSON.stringify(marker.toGeoJSON(), null, 4) + '</span>').openOn(map);
    // });
}
