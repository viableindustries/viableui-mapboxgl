# MapboxGL Implementation for AngularJS and Viable's UI Platform

This module is intended for use with your https://www.viable.io/data account.

## Installation

1. Install the NPM package
````
npm install git://github.com/viableindustries/viableui-mapboxgl.git --save
````

2. Include the Mapbox stylesheet in the `<head>` of your `index.html` document
```
<link href='https://api.tiles.mapbox.com/mapbox-gl-js/v0.44.2/mapbox-gl.css' rel='stylesheet' />
```
[Newest version of CSS can be found at Mapbox.com](https://www.mapbox.com/mapbox-gl-js/api/)


3. Include the MapboxGL Javascript file in the `<body>` of your `index.html` document above the library's include.
```
<script src='https://api.tiles.mapbox.com/mapbox-gl-js/v0.44.2/mapbox-gl.js'></script>
```
[Newest version of MapboxGL.js can be found at Mapbox.com](https://www.mapbox.com/mapbox-gl-js/api/)


3. Include the following files into your Angular.js application index.html file.

```
<script src="node_modules/viableui-mapboxgl/viableui-mapboxgl-module.js"></script>
<script src="node_modules/viableui-mapboxgl/viableui-mapboxgl-constant.js"></script>
<script src="node_modules/viableui-mapboxgl/viableui-mapboxgl-directive.js"></script>
```

4. Add the ViableUI MapboxGL module to your Angular.js project along with your
Mapbox Access Token.
````
angular
  .module('ViableDataUI', [
    'MapboxGL',
  ]).run(function () {
      mapboxgl.accessToken = 'pk.eyxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';
  });
````

For more information on working with Mapbox.com Access Tokens, please see
[Mapbox's documentation](https://www.mapbox.com/help/how-access-tokens-work/).


## Getting Started

## Load a Map

1. Add the ViableUI MapboxGL directive to your controller's view.
```
<mapboxgl id="map" options="page.options" />
```

2. Tell your controller how and where to display the map in your view.
```
self.options = {
    container: 'map',
    style: MapboxGLSettings.style,
    center: [-98.58900742, 38.36264194],
    zoom: 4,
    maxZoom: 15
};
```

3. Tell your controller to do other things with your map.
```

var self = this;

self.map = null;

$rootScope.$on('mapboxgl.loaded', function(event, args) {

  self.map = args.map;

});

```

## Code Samples
A list of one-off ViableUI compatible MapboxGL recipes that you can mix and
match in your applications.

### Track Your Map Loading and Manipluate it after load
```
var MAP_HAS_LOADED = false;

...

self.map.on('render', function () {

  if (!self.map.loaded() || MAP_HAS_LOADED) return;

  MAP_HAS_LOADED = true;

  //
  // ADD YOUR CODE HERE THAT MAKES THE MAP DO WHAT YOU WANT IT TO
  //

});
```

### Manage Map Controls (i.e., Zoom, Layer Selector)
```
var _navigationControls = new mapboxgl.NavigationControl();

self.map.addControl(_navigationControls);
```
[More information about map.addControl](https://www.mapbox.com/mapbox-gl-js/api#map#addcontrol)

### Add Source to Your Map and Instantiate it as a Map layer
```
self.map.addSource("mapbox-satellite", {
  "type": "raster",
  "url": "mapbox://mapbox.satellite",
  "tileSize": 256
});

self.map.addLayer({
  "type": "raster",
  "id": 'satellite-map',
  "source": "mapbox-satellite", // THIS MUST MATCH A SOURCE THAT IS ALREADY LOADED (SEE ABOVE)
  "layout": {
    visibility: "none"
  }
});
```
[More information about map.addSource](https://www.mapbox.com/mapbox-gl-js/api#map#addsource)
[More information about map.addLayer](https://www.mapbox.com/mapbox-gl-js/api#map#addlayer)

### Set Basemaps and set their default visibility
```
self.basemap = {
  satellite: function() {
    self.map.setLayoutProperty('satellite-map', 'visibility', 'visible');
  },
  street: function() {
    self.map.setLayoutProperty('satellite-map', 'visibility', 'none');
  }
}
```
[More information about map.setLayoutProperty](https://www.mapbox.com/mapbox-gl-js/api#map#setlayoutproperty)

### Add a hover state for a specific map layer
```
self.map.addSource("counties", {
    "type": "vector",
    "url": "mapbox://ACCOUNT.STYLE"
});

self.map.addLayer({
   'id': 'ORIGINAL_LAYER',
   'type': 'fill',
   'source': "counties", // SEE SOURCE LOAD ABOVE
   'source-layer': 'NAME_OF_LAYER_FROM_MAPBOX_URL',
   'paint': {...}
   'layout': {
     'visibility':'none'
   }
});

self.map.addLayer({
    "id": "HOVER_LAYER",
    "type": "line",
    'source': "counties",
    'source-layer': 'NAME_OF_LAYER_FROM_MAPBOX_URL',
    "paint": {
      'line-color': '#ffffff',
      'line-opacity': 0.8,
      'line-width': 2
    },
    "filter": ["==", "FIELD_TO_FILTER_ON", ""]
});

self.map.on("mousemove", "ORIGINAL_LAYER", function(e) {
    self.map.setFilter("HOVER_LAYER", ["==", "FIELD_TO_FILTER_ON", e.features[0].properties.FIELD_TO_FILTER_ON]);
});

self.map.on("mouseleave", "ORIGINAL_LAYER", function() {
  self.map.setFilter("HOVER_LAYER", ["==", "FIELD_TO_FILTER_ON", ""]);
});

```

### Extract Data from the Map and Use it On Page
```

self.content = {
  'features': []
};


//
// Load your source from Mapbox
//
self.map.addSource("SOURCE_NAME", {
    "type": "vector",
    "url": 'mapbox://ACCOUNT.style'
});


//
// Load source from the map
//
var sourceContent = self.map.querySourceFeatures("SOURCE_NAME", {
  sourceLayer: "SOURCE_LAYER_NAME_IN_SOURCE",
  filter: ["==", "SOME_FIELD", "1"] // OPTIONAL, REMOVE TO SHOW ALL
});


//
// Loop over the source to build out the content you need
//
for(var i=0; i<sourceContent.length; i++){
  self.content.features.push({
    'title':sourceContent[i].properties['Title']
  })
}

```
[More information about map.querySourceFeatures](https://www.mapbox.com/mapbox-gl-js/api#map#querysourcefeatures)

### Add a click behavior and return a popup
```
self.map.on('click', 'LAYER_NAME', function (e) {

  return new mapboxgl.Popup()
      .setLngLat(e.features[0].geometry.coordinates)
      .setHTML("<div class='some-div'>" + e.features[0].properties['Title'] + "</div>")
      .addTo(self.map);

});
```

### Zoom to a specific location
```
self.map.flyTo({

    //
    // These options control the ending camera position: centered at
    // the target, at zoom level 9, and north up.
    //
    center: [-98.58900742, 38.36264194],
    zoom: 4,
    bearing: 0,

    //
    // These options control the flight curve, making it move
    // slowly and zoom out almost completely before starting
    // to pan.
    //
    // How fast should the flyTo happen?
    //
    speed: 3,

    easing: function (t) {
        return t;
    }
});
```

[More information about map.flyTo](https://www.mapbox.com/mapbox-gl-js/example/flyto/)

### Available Map Events
```
self.map.on('mousedown', function(e) {
  $log.log('mousedown', 'Mapbox Event')
});

self.map.on('mouseup', function(e) {
  $log.log('mouseup', 'Mapbox Event')
});

self.map.on('click', function(e) {
  $log.log('click', 'Mapbox Event')
});

self.map.on('dblclick', function(e) {
  $log.log('dblclick', 'Mapbox Event')
});

self.map.on('mousemove', function(e) {
  $log.log('mousemove', 'Mapbox Event')
});

self.map.on('mouseenter', function(e) {
  $log.log('mouseenter', 'Mapbox Event')
});

self.map.on('mouseleave', function(e) {
  $log.log('mouseleave', 'Mapbox Event')
});

self.map.on('mouseover', function(e) {
  $log.log('mouseover', 'Mapbox Event')
});

self.map.on('mouseout', function(e) {
  $log.log('mouseout', 'Mapbox Event')
});

self.map.on('contextmenu', function(e) {
  $log.log('contextmenu', 'Mapbox Event')
});
```
