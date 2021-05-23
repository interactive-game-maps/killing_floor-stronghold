// Create list
var treasure_bags_list = document.createElement('ul');
treasure_bags_list.className = 'collectibles_list';

// Create marekr group
var treasure_bag_cluster = L.markerClusterGroup({
    maxClusterRadius: 40
});

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

        if (!add_checkbox_for_marker(feature, marker, treasure_bags_list, "treasure_bags", treasure_bag_cluster)) {
            return null;
        }
        return marker;
    },
    onEachFeature: function (feature, layer) {
        // popup with simple image and description
        layer.bindPopup("<a href='https://steamuserimages-a.akamaihd.net/ugc/" + feature.properties.id + "/'><img src='https://steamuserimages-a.akamaihd.net/ugc/" + feature.properties.id + "/' width='500/' /></a>" + feature.properties.description, { maxWidth: 500 });
    }
}).addTo(treasure_bag_cluster);

// Add list to sidebar
sidebar.addPanel({
    id: 'treasure_bags',
    tab: '💰',
    title: 'Treasure Bags',
    pane: '<p></p>' // placeholder to get a proper pane
});
document.getElementById('treasure_bags').appendChild(treasure_bags_list);
