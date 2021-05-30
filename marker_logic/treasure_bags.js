// Create list
var treasure_bags_list = document.createElement('ul');
treasure_bags_list.className = 'collectibles_list';

// Add list to sidebar
sidebar.addPanel({
    id: 'treasure_bags',
    tab: '💰',
    title: 'Treasure Bags',
    pane: '<p></p>' // placeholder to get a proper pane
});
document.getElementById('treasure_bags').appendChild(treasure_bags_list);

// Create marekr group
var treasure_bags_group = L.markerClusterGroup({
    maxClusterRadius: 40
});

// Add all markers and attach popups with information
L.geoJSON(treasure_bags, {
    pointToLayer: (feature, latlng) => {
        // custom marker
        return L.marker(latlng, {
            // Simple symbols and text/numbers on markers: https://github.com/coryasilva/Leaflet.ExtraMarkers
            icon: L.ExtraMarkers.icon({
                icon: 'fa-number',
                number: feature.properties.id,
                shape: 'square',
                markerColor: 'cyan'
            })
        });
    },
    onEachFeature: (feature, layer) => {
        onEachFeature(feature, layer, treasure_bags_group, treasure_bags_list, 'treasure_bags', true);
    }
}).addTo(treasure_bags_group);
marker.get('treasure_bags').set("group", treasure_bags_group);
