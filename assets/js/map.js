define([
  'bootstrap',
  'jquery',
  'jquery-ui',
  'leaflet',
  'Leaflet.awesome-markers',
  'leaflet-bing-layer',
  'leaflet-sidebar',
  'handlebars',
  'json!../geojson/huts.geojson'
], function (
  bootstrap,
  jquery,
  jqueryui,
  L,
  awesomeMarkers,
  leafletBing,
  sidebar,
  Handlebars,
  geojson
) {
    var tilesDict = {
      // satellite: L.tileLayer('http://{s}.tiles.mapbox.com/v3/paperclipmonkey.kggafd49/{z}/{x}/{y}.png',
      //   {
      //     attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      //     maxZoom: 22,
      //     maxNativeZoom: 19
      // }),
      bing: L.tileLayer.bing({
        bingMapsKey: 'AlOSk9s7dT-NuGYcSPavlvaFmf6sJVkvyqt7AegBWg1BtJY4-OIHmUIogjKM9QpQ',
        imagerySet: 'Aerial'
      }),
      roadmap: L.tileLayer('http://{s}.tiles.mapbox.com/v3/paperclipmonkey.kgon2gjp/{z}/{x}/{y}.png',{
        attribution: 'Road map &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
      })
    }

    var overlaysDict = {
      // oldos: L.tileLayer('http://nls-1.tileserver.com/os_6_inch_gb/{z}/{x}/{y}.jpg',{
      //   attribution: 'OS Map provided by; <a href="http://maps.nls.uk/os/6inch-england-and-wales/index.html">NLS</a>'
      // }),
      geology: L.tileLayer.wms('http://ogc.bgs.ac.uk/cgi-bin/BGS_Bedrock_and_Superficial_Geology/wms?',{
        format: 'image/png',
        transparent: true,
        layers: 'GBR_BGS_625k_BA',
        attribution: 'BGS',
        opacity: 0.4
      })
    }


    var hbsSource   = $("#popup-template").html();
    var popupTemplate = Handlebars.compile(hbsSource);

    // initialize the map on the "map" div with a given center and zoom
    var map = L.map('map', {
      center: [54.5906, -3.0],
      zoom: 6,
      layers: [tilesDict.bing]
    })

    L.control.layers(tilesDict, overlaysDict).addTo(map);

    markers = {
      'caving': new L.AwesomeMarkers.icon({
        icon: 'home',
        prefix: 'fa',
        markerColor: 'orange'
      }),
      'mountain': new L.AwesomeMarkers.icon({
        icon: 'home',
        prefix: 'fa',
        markerColor: 'green'
      })
    }

    L.geoJson(geojson, {
      pointToLayer: function (feature, latLng) {
        if(feature.properties.caveclub){
          return new L.Marker(latLng, {icon: markers.caving}).addTo(map);
        } else {
          return new L.Marker(latLng, {icon: markers.mountain}).addTo(map);
        }
      },
      onEachFeature: function (feature, layer) {
          //layer.bindPopup(feature.properties.description);
      }
    }).on('click', function(a){
      var popup = L.popup()
      .setLatLng(a.latlng)
      .setContent(popupTemplate(a.layer.feature.properties))
      .openOn(map);
    }).addTo(map);
})
