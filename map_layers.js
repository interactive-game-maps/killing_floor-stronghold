var website = 'https://github.com/interactive-game-maps/killing_floor-stronghold';
var website_subdir = 'killing_floor-stronghold';
var attribution = ``;
const MAX_ZOOM = 4;

var map = L.map('map', {
    crs: L.CRS.Simple,
    // minZoom: 0,
    maxZoom: 4,
    zoom: 3
});

// Use tiled maps if possible, allows better zooming
// Make sure tiling scheme is growing downwards!
// https://github.com/Leaflet/Leaflet/issues/4333#issuecomment-199753161
// https://github.com/commenthol/gdal2tiles-leaflet
// ./gdal2tiles.py -l -p raster -w none -z 2-5 full_map.jpg map_tiles
var tiled_map = new L.tileLayer('map_tiles/{z}/{x}/{y}.png', {
    minNativeZoom: 2,
    maxNativeZoom: L.Browser.retina ? MAX_ZOOM - 1 : MAX_ZOOM, // 1 level LOWER for high pixel ratio device.
    attribution: 'Map and images from <a href="https://steamcommunity.com/sharedfiles/filedetails/?id=280577526">EnigmaticRunner</a>',
    noWrap: true,
    detectRetina: true
});

var baseMaps = {
    "Ingame map": tiled_map
};

// Make one base layer visible by default
tiled_map.addTo(map);
