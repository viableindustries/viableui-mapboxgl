(function() {

  "use strict";

  /**
   * @ngdoc directive
   * @name managerApp.directive:mapboxGeocoder
   * @description
   *   The Mapbox GL directive enables developers to quickly add Mapbox GL
   *   maps to an angular project.
   *
   *   Example:
   *   <mapboxgl id="map" class="mapboxgl-map"
   *                          options="page.map.options" model="page.map.data">
   *   </mapboxgl>
   */
  angular.module('MapboxGL')
    .directive('mapboxgl', function ($log, $rootScope, $timeout) {

      return {
        scope: {
          options: '='
        },
        restrict: 'E',
        link: function(scope, element, attrs) {

          /**
           * Give feedback that the MapboxGL Directive has loaded
           */
          $log.log('Loaded MapboxGL::viableMapboxglDirective')

          var self = {
            "initializeMap": function(options_) {

              /**
               * Instantiate a new MapboxGL Map object
               */
              var map = new mapboxgl.Map(options_);

              /**
               * Assign MapboxGL Map object to `scope.model` when map has
               * finished loading.
               */
              map.on('load', function () {
                $rootScope.$broadcast('mapboxgl.loaded', {
                  "map_id": options_.map_id,
                  "map": map
                });
              });

            }
          };

          $timeout(function() {
            self.initializeMap(scope.options);
          });

        }
      };
    });

})();
