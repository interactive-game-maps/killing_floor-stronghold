var treasure_bags_layer = new InteractiveLayer('treasure_bags', treasure_bags, {
    name: "Treasure Bags",
    create_checkbox: true,
    create_feature_popup: true,
    is_default: true,
    sidebar_icon_html: '💰',
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {
            icon: getCustomIcon('💰'),
            riseOnHover: true
        });
    }
});

interactive_layers.set(treasure_bags_layer.id, treasure_bags_layer);
