var treasure_bags_group_name = 'Treasure Bags';
var treasure_bags_group_id = 'treasure_bags';
var treasure_bags_create_checkbox = true;

var treasure_bags_list = createSidebarTab(treasure_bags_group_id, treasure_bags_group_name, '💰');

var treasure_bags_group = L.featureGroup.subGroup(marker_cluster);

L.geoJSON(treasure_bags, {
    pointToLayer: (feature, latlng) => {
        return L.marker(latlng, {
            icon: getCustomIcon('💰'),
            riseOnHover: true
        });
    },
    onEachFeature: (feature, layer) => {
        addPopup(feature, layer, {
            layer_group: treasure_bags_group,
            list: treasure_bags_list,
            list_id: treasure_bags_group_id,
            create_checkbox: treasure_bags_create_checkbox
        });
        saveMarker(feature, layer, {
            list_id: treasure_bags_group_id
        });
    }
}).addTo(treasure_bags_group);
marker.get(treasure_bags_group_id).set('group', treasure_bags_group);
marker.get(treasure_bags_group_id).set('name', treasure_bags_group_name);

if (treasure_bags_create_checkbox) {
    setColumnCount(marker.get(treasure_bags_group_id), treasure_bags_list);
}

// Add as a default layer
// This needs the display name because the layer control don't report ids
default_layers.push(treasure_bags_group_name);
