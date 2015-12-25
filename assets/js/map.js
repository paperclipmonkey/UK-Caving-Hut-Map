define([
  'bootstrap',
  'jquery',
  'jquery-ui',
  'leaflet',
  'Leaflet.awesome-markers',
  'leaflet-google',
  'leaflet-sidebar',
  'json!../geojson/huts.geojson'
], function (
  bootstrap,
  jquery,
  jqueryui,
  leaflet,
  awesomeMarkers,
  leafletgoogle,
  sidebar,
  geojson
) {
    var tilesDict = {
      satellite: {
        name: 'Satellite',
        url: 'http://{s}.tiles.mapbox.com/v3/paperclipmonkey.kggafd49/{z}/{x}/{y}.png',
        type: 'xyz',
        options: {
          attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          maxZoom: 22,
          maxNativeZoom: 19
        }
      },
      roadmap: {
        name: 'Road Map',
        url: 'http://{s}.tiles.mapbox.com/v3/paperclipmonkey.kgon2gjp/{z}/{x}/{y}.png',
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
          attribution: 'BGS',
          opacity: 0.5
        }
      }
    }
})
