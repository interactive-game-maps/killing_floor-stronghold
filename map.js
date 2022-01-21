var interactive_map = new InteractiveMap('map', {
    max_good_zoom: 4,
    max_map_zoom: 4,
    website_source: 'https://github.com/interactive-game-maps/killing_floor-stronghold',
    website_subdir: 'killing_floor-stronghold',
    attribution: ''
});

interactive_map.addTileLayer('Overview', {
    minNativeZoom: 2,
    maxNativeZoom: 5,
    attribution: 'Map and images from <a href="https://steamcommunity.com/sharedfiles/filedetails/?id=280577526">EnigmaticRunner</a>'
});

interactive_map.addInteractiveLayer(getTreasureBags());

interactive_map.finalize();
