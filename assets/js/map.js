(function(){
	var expo = {};

    function init(){
      expo.map = L.map('mapdiv', '', {zoomControl: false});

      expo.map.setView([54.5906, -3.0], 6);//Set default map state

      expo.oms = new OverlappingMarkerSpiderfier(expo.map, {keepSpiderfied: true});

      expo.layers.satellite = L.tileLayer('http://{s}.tiles.mapbox.com/v3/paperclipmonkey.kggafd49/{z}/{x}/{y}.png', {
          attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
          maxZoom: 22,
          maxNativeZoom: 19
      }).addTo(expo.map);

      expo.layers.road = L.tileLayer('http://{s}.tiles.mapbox.com/v3/paperclipmonkey.kgon2gjp/{z}/{x}/{y}.png', {
          attribution: 'Road map &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'});

      expo.layers.old = L.tileLayer('http://nls-1.tileserver.com/os_6_inch_gb/{z}/{x}/{y}.jpg', {
          opacity: 0.5,
          attribution: 'OS Map provided by; <a href="http://maps.nls.uk/os/6inch-england-and-wales/index.html">NLS</a>'
      });

      expo.layers.geology = L.tileLayer.wms('http://ogc.bgs.ac.uk/cgi-bin/BGS_Bedrock_and_Superficial_Geology/wms?', {
        format: 'image/png',
        transparent: true,
        layers: 'GBR_BGS_625k_BA',
        attribution: "BGS",
        opacity: 0.5
      }).addTo(expo.map);

      expo.layers.markers = {
        'caves': L.featureGroup().addTo(expo.map)
      };

      expo.layers._markers = {
        'caves': L.featureGroup()
      };

      var baseLayers = [
        {
          group: "Maps",
          layers: [
            {
              name: "Satellite",
              layer: expo.layers.satellite
            },
            { 
              name: "Road",
              layer: expo.layers.road
            }
          ]
        }
      ];

      var overlayLayers = [
        {
          group: "Overlays",
          layers: [
            {
              name: "Old OS",
              layer: expo.layers.old,
              opacity: true
            },
            { 
              name: "Geology",
              layer: expo.layers.geology,
              opacity: true
            }
          ]
        }
      ];

      var panelLayers = new L.Control.PanelLayers(baseLayers, overlayLayers, {collapsed: true});
      expo.map.addControl(panelLayers);
    }

    expo.init = init;

    expo.layers = {};
    
    expo.layers.current = "satellite";

    window.mapm = expo;
})();