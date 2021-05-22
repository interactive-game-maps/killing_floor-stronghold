{ // Helper functions
    function add_checkbox_for_marker(feature, marker, list, list_name, cluster) {
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
                cluster.removeLayer(marker);
                // save to localStorage
                localStorage.setItem(list_name + ":" + feature.properties.id, true);
            } else {
                marker.addTo(cluster);
                // remove from localStorage
                localStorage.removeItem(list_name + ":" + feature.properties.id);
            }
        });

        // hide if checked previously
        if (localStorage.getItem(list_name + ":" + feature.properties.id)) {
            checkbox.checked = true;
            return false;
        }

        return true;
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

            if (!add_checkbox_for_marker(feature, marker, treasure_bag_list, "treasure_bags", treasure_bag_cluster)) {
                return null;
            }
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
