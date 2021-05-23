{ // Defining overlay maps - markers
    var overlayMaps = {
        "Treasure Bags": treasure_bag_cluster
    };

    // Make overlay layer visible by default
    map.addLayer(treasure_bag_cluster);

    // Center view over map
    map.fitBounds([[0, 0], [-256, 256]]);

    // Add user selection to map
    L.control.layers(baseMaps, overlayMaps).addTo(map);
}
