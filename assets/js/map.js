define([
  "jquery",
  "jquery-ui",
  "leaflet",
  "leaflet-sidebar",
  "json!../geojson/huts.geojson",
  "angular",
  "ui-leaflet"
  ], function(
    jquery,
    jqueryui,
    leaflet,
    sidebar,
    geojson,
    angular,
    leaflet
  ) {
  var app = angular.module("demoapp", ['ui-leaflet']);
  console.log("Adding app")
  app.controller('MarkersAddRemoveController', [ '$scope', function($scope) {
  var tilesDict = {
      satellite: {
          name: 'Satellite',
          url: "http://{s}.tiles.mapbox.com/v3/paperclipmonkey.kggafd49/{z}/{x}/{y}.png",
          type: 'xyz',
          options: {
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            maxZoom: 22,
            maxNativeZoom: 19
          }
      },
      roadmap: {
          name: 'Road Map',
          url: "http://{s}.tiles.mapbox.com/v3/paperclipmonkey.kgon2gjp/{z}/{x}/{y}.png",
          options: {
            attribution: 'Road map &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
          }
      },
      oldos: {
          name: 'Old OS',
          url: 'http://nls-1.tileserver.com/os_6_inch_gb/{z}/{x}/{y}.jpg',
          type: 'xyz',
          options: {
            opacity: 0.5,
            attribution: 'OS Map provided by; <a href="http://maps.nls.uk/os/6inch-england-and-wales/index.html">NLS</a>'
          }
      },
      geology: {
          name: 'Mapbox Wheat Paste',
          url: 'http://ogc.bgs.ac.uk/cgi-bin/BGS_Bedrock_and_Superficial_Geology/wms?',
          type: 'wms',
          options: {
            format: 'image/png',
            transparent: true,
            layers: 'GBR_BGS_625k_BA',
            attribution: "BGS",
            opacity: 0.5
          }
      }
  };

      angular.extend($scope, {
          london: {
              lat: 51.505,
              lng: -0.09,
              zoom: 8
          },
          markers: {},
          tiles: {
            baselayers: {One: tilesDict.satellite},
            overlays: {Two: tilesDict.oldos}
          }
      })
    console.log("Initing app")

            $scope.changeTiles = function(tiles) {
                $scope.tiles = tilesDict[tiles];
            };

    console.log($scope)


      $scope.addMarkers = function() {
          console.log("Adding markers");
          angular.extend($scope, {
              markers: {
                  m1: {
                      lat: 51.505,
                      lng: -0.09,
                      message: "I'm a static marker",
                  },
                  m2: {
                      lat: 51,
                      lng: 0,
                      focus: true,
                      message: "Hey, drag me if you want",
                      draggable: true
                  }
              }
          });
      };

      $scope.removeMarkers = function() {
          $scope.markers = {};
      }

      $scope.addMarkers();
  } ]);



	// var expo = {layers:{
 //    markers: {
 //      huts: new L.featureGroup()
 //    },
 //    current: 'satellite'
 //  }};
 //  expo.map = leaflet.map('mapdiv', '', {zoomControl: false});

 //  expo.layers.markers.huts.addTo(expo.map)

 //  function makeMarker(iconsArr, name){
 //    iconsArr[name] = L.icon({
 //      iconUrl: 'assets/img/marker-' + name + '.png',
 //      iconRetinaUrl: 'assets/img/marker-' + name + '-2x.png',
 //      shadowUrl: 'assets/img/marker-shadow.png',
 //      iconSize: [25, 41],
 //      iconAnchor: [12, 41],
 //      popupAnchor: [0, 0]
 //    });
 //  }

 //  function loadMarkers(){
 //    //Define marker icons that can be used
 //    var markerIcons = {};

 //    markerTypes = ['orange', 'brown', 'green', 'blue', 'purple', 'white'];

 //    for (var i = 0; i < markerTypes.length; i++) {
 //      makeMarker(markerIcons, markerTypes[i]);
 //    };

 //    expo.layers.markers.huts.addLayer(L.geoJson(geojson, {
 //      pointToLayer: function (feature, latlng) {
 //        if(feature.properties.caveclub === "TRUE"){
 //          return L.marker(latlng, {icon: markerIcons.brown})
 //        } else {
 //          return L.marker(latlng, {icon: markerIcons.green})
 //        }
 //      }
 //    }));

 //    //addLayerMarkersToOms(mapm.layers.markers);
 //  }

 //  loadMarkers();

 //  function showHideMarkers(showHide){
 //    mapm.oms.clearMarkers();
 //    //Remove all markers from display layer
 //    for(x in  mapm.layers.markers){
 //      var layer = mapm.layers.markers[x];
 //      layer.clearLayers();//Clears LayerGroup
 //    }

 //    //Go through all data layers and add correct data to display layers
 //    for(x in mapm.layers._markers){
 //      var layer = mapm.layers._markers[x];
 //      //Filter
 //      layer.eachLayer(function(markG){
 //        markG.eachLayer(function(mark){
 //          if(filterMarker(showHide, mark)){
 //            mapm.layers.markers[x].addLayer(mark);
 //          }
 //        });
 //      });
 //    }

 //    //Re-add all displayed markers to OMS
 //    for(x in mapm.layers.markers){
 //      var layer = mapm.layers.markers[x];
 //      layer.eachLayer(function(mark){
 //        mapm.oms.addMarker(mark);
 //      });
 //    }

 //  }

 //  function filterMarker(dates, feature){
 //    return true;
 //  }

 //  expo.map.setView([54.5906, -3.0], 6);//Set default map state

 //  //expo.oms = new OverlappingMarkerSpiderfier(expo.map, {keepSpiderfied: true});


 //  expo.layers.satellite = L.tileLayer('http://{s}.tiles.mapbox.com/v3/paperclipmonkey.kggafd49/{z}/{x}/{y}.png', {
 //      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
 //      maxZoom: 22,
 //      maxNativeZoom: 19
 //  }).addTo(expo.map);

 //  expo.layers.road = L.tileLayer('http://{s}.tiles.mapbox.com/v3/paperclipmonkey.kgon2gjp/{z}/{x}/{y}.png', {
 //      attribution: 'Road map &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'});

 //  expo.layers.old = L.tileLayer('http://nls-1.tileserver.com/os_6_inch_gb/{z}/{x}/{y}.jpg', {
 //      opacity: 0.5,
 //      attribution: 'OS Map provided by; <a href="http://maps.nls.uk/os/6inch-england-and-wales/index.html">NLS</a>'
 //  });

 //  expo.layers.geology = L.tileLayer.wms('http://ogc.bgs.ac.uk/cgi-bin/BGS_Bedrock_and_Superficial_Geology/wms?', {
 //    format: 'image/png',
 //    transparent: true,
 //    layers: 'GBR_BGS_625k_BA',
 //    attribution: "BGS",
 //    opacity: 0.5
 //  }).addTo(expo.map);

 //  expo.layers.markers = {
 //    'huts': L.featureGroup().addTo(expo.map)
 //  };

 //  expo.layers._markers = {
 //    'huts': L.featureGroup()
 //  };

 //  var baseLayers = [
 //    {
 //      group: "Maps",
 //      layers: [
 //        {
 //          name: "Satellite",
 //          layer: expo.layers.satellite
 //        },
 //        { 
 //          name: "Road",
 //          layer: expo.layers.road
 //        }
 //      ]
 //    }
 //  ];

 //  var overlayLayers = [
 //    {
 //      group: "Overlays",
 //      layers: [
 //        {
 //          name: "Old OS",
 //          layer: expo.layers.old,
 //          opacity: true
 //        },
 //        { 
 //          name: "Geology",
 //          layer: expo.layers.geology,
 //          opacity: true
 //        }
 //      ]
 //    }
 //  ];
 //  return expo;
})