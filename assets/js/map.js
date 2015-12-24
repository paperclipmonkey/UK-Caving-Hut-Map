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
    uileaflet
  ) {
  var app = angular.module("demoapp", ['ui-leaflet'])

  console.log(geojson)

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
            type: 'xyz',
            options: {
              attribution: 'Road map &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
            }
        },
        oldos: {
            name: 'Old OS',
            url: 'http://nls-1.tileserver.com/os_6_inch_gb/{z}/{x}/{y}.jpg',
            type: 'xyz',
            layerOptions: {
              attribution: 'OS Map provided by; <a href="http://maps.nls.uk/os/6inch-england-and-wales/index.html">NLS</a>'
            }
        },
        geology: {
            name: 'Geology',
            url: 'http://ogc.bgs.ac.uk/cgi-bin/BGS_Bedrock_and_Superficial_Geology/wms?',
            type: 'wms',
            layerParams: {
              format: 'image/png',
              transparent: true,
              layers: 'GBR_BGS_625k_BA',
              attribution: "BGS",
              opacity: 0.5
            }
        }
    }

    angular.extend($scope, {
        london: {
            lat: 54.5906,
            lng: -3.0,
            zoom: 6
        },
        layers: {
            baselayers: {One: tilesDict.satellite, Two: tilesDict.roadmap},
            overlays: {Four: tilesDict.geology}
          },
          overlays:{}
    })

    iconsDict = []

    function makeMarker(color){
      iconsDict[color] = {
        iconUrl: 'assets/img/marker-' + color + '.png',
        iconRetinaUrl: 'assets/img/marker-' + color + '-2x.png',
        shadowUrl: 'assets/img/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [0, 0]
      }
    }

    makeMarker('brown')
    makeMarker('green')

    angular.extend($scope, {
      geojson: {
        data:geojson,
        pointToLayer: function(feature, latlng) {
            if(feature.properties.caveclub === "TRUE"){
              return new L.marker(latlng, {icon: L.icon(iconsDict['brown'])})
            } else {
              return new L.marker(latlng, {icon: L.icon(iconsDict['green'])})
            }
        },
        onEachFeature: function (feature, layer) {
          layer.bindPopup("<h4>" + feature.properties.club + " - " + feature.properties.hutname +  "</h4>" +
            "<p>pppn: £" + feature.properties.pppn + "</p>" +
            "<p>No. bunks: " + feature.properties.guestbunks + "</p>" +
            "<p>Drying room: " + (feature.properties.dryingroom === "TRUE" ? "yes" : "no") + "</p>" +
            "<p>Address: " + feature.properties.location + "</p>" +
            "<p>Grid reference: " + feature.properties.gridref + "</p>" +
            "<a href='" + feature.properties.website + "'>" + feature.properties.website +  "</a>" +
            "<p><a href='https://github.com/paperclipmonkey/UK-Caving-Hut-Map/blob/master/data/huts.csv'>Update this hut</a></p>"
          )
        }
      }
    })

    angular.extend($scope, {
    events: {
      markers: {
        enable: ['click'],
        logic: 'emit'
      }
    }})

    $scope.$on("leafletDirectiveGeoJson.click", function(ev, leafletPayload) {
        console.log("GeoJson Click")
    })

    $scope.$on('leafletDirectivePath.myMap.mouseover', function (event, path) {
      console.log("Mouse over")
    })

    $scope.$on('leafletDirectiveMarker.click', function(event, args){
      console.log("Me", $scope.markers[args.markerName])
    })

    $scope.$on('leafletDirectivePath.click', function(event, link) {
      console.log('Click')
    })
  }
])
})