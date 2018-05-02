# MapboxGL Implementation for AngularJS and Viable's UI Platform

This module is intended for use with your https://www.viable.io/data account.

## Installation

1. Install the NPM package
````
npm install viableui-mapboxgl --save
````

2. Include the following files into your Angular.js application index.html file.

```
<script src="node_modules/viableui-mapboxgl/mapboxgl--module.js"></script>
<script src="node_modules/viableui-mapboxgl/mapboxgl/mapboxgl--constant.js"></script>
<script src="node_modules/viableui-mapboxgl/mapboxgl/mapboxgl--directive.js"></script>
```

3. Add the ViableUI MapboxGL module to your Angular.js project along with your
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

2. Tell your controller to activate the map after the required Javascript has
loaded into your page.
```

var self = this;

self.map = null;

...

$rootScope.$on('mapboxgl.loaded', function(event, args) {

  self.map = args.map;

});
```

3. Tell your controller how and where to display the map in your view.
```
self.options = {
    container: 'map',
    style: MapboxGLSettings.style,
    center: [-98.58900742, 38.36264194],
    zoom: 4,
    maxZoom: 15
};
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

### Load an image to use for a map pin/marker

### Add a click behavior to a marker Layer

### Add a click behavior to a polygon layer

### Add a mouseover/mouseleave state to a layer

### Extract Data from the Map and Use it On Page

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
