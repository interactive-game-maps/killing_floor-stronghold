// Create list
var treasure_bags_list = document.createElement('ul');
treasure_bags_list.className = 'collectibles_list';

// Create marekr group
var treasure_bags_group = L.markerClusterGroup({
    maxClusterRadius: 40
});

// save all marker in a map so we can access them later
var treasure_bags_map = new Map();

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

        // Add marker to lists
        treasure_bags_map.set(feature.properties.number.toString(), marker);
        if (!add_checkbox_for_marker(feature, marker, treasure_bags_list, "treasure_bags", treasure_bags_group)) {
            return null;
        }
        return marker;
    },
    onEachFeature: function (feature, layer) {
        // popup with simple image and description
        layer.bindPopup("<a href='https://steamuserimages-a.akamaihd.net/ugc/" + feature.properties.id + "/'><img src='https://steamuserimages-a.akamaihd.net/ugc/" + feature.properties.id + "/' width='500/' /></a>" + feature.properties.description, { maxWidth: 500 });

        // rewrite url for easy copy pasta
        layer.on('popupopen', (event) => {
            history.replaceState({}, "", "index.html?list=" + "treasure_bags" + "&id=" + feature.properties.number);
        });
    }
}).addTo(treasure_bags_group);
treasure_bags_map.set("group", treasure_bags_group);

// save local list in global list of lists
marker.set("treasure_bags", treasure_bags_map);

// Add list to sidebar
sidebar.addPanel({
    id: 'treasure_bags',
    tab: '💰',
    title: 'Treasure Bags',
    pane: '<p></p>' // placeholder to get a proper pane
});
document.getElementById('treasure_bags').appendChild(treasure_bags_list);
