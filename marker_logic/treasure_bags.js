// Create list
var treasure_bags_list = document.createElement('ul');
treasure_bags_list.className = 'collectibles_list';

// Add list to sidebar
var treasure_bags_group_name = 'Treasure Bags';
sidebar.addPanel({
    id: 'treasure_bags',
    tab: '💰',
    title: treasure_bags_group_name,
    pane: '<p></p>' // placeholder to get a proper pane
});
document.getElementById('treasure_bags').appendChild(treasure_bags_list);

// Create marekr group
var treasure_bags_group = L.markerClusterGroup({
    maxClusterRadius: 40
});

var treasure_bags_icon = L.Icon.Default.extend({
    options: {
        imagePath: './',
        iconUrl: 'marker/treasure_bags.png',
        shadowUrl: 'marker/shadow.png'
    }
});

L.geoJSON(treasure_bags, {
    pointToLayer: (feature, latlng) => {
        return L.marker(latlng, {
            icon: new treasure_bags_icon,
            riseOnHover: true
        });
    },
    onEachFeature: (feature, layer) => {
        onEachFeature(feature, layer, {
            layer_group: treasure_bags_group,
            list: treasure_bags_list,
            list_name: "treasure_bags",
            create_checkbox: true
        });
    }
}).addTo(treasure_bags_group);
marker.get('treasure_bags').set('group', treasure_bags_group);
marker.get('treasure_bags').set('name', treasure_bags_group_name);
