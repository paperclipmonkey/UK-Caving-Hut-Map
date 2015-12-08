    $(function(){


    });//Jquery ready function

    var markers;
    function initMap(){
      mapm.init();
      loadMarkers();
      mapm.oms.addListener('click', omsClickHandler);
      showHideMarkers();
    }

    function omsClickHandler(marker) {
      //Show element
      if (marker.feature.properties) {
        var props = marker.feature.properties;
        var htmlString = "";
        var extraProps = {};
        htmlString += "<h4>" + props["Name"] + "</h4>";
        htmlString += "<p><a href=\"" + props["Website"] + "\">" + props["Website"] + "</a></p>";
        htmlString += "<p>Drying Room: "  + props["DryingRoom"] + "</p>";
        htmlString += "<p>No. Guest Bunks: "  + props["GuestBunks"] + "</p>";
        htmlString += "<p>Guest Fees: £"  + props["GuestFees"] + "</p>";
        if(props.page){
          htmlString += "<h6>Page no. " + props.page + "</h6>";
        }

        var popup = new L.popup(extraProps);
        popup.setContent(htmlString);
        popup.setLatLng(marker.getLatLng());
        mapm.map.openPopup(popup);

        //Take hash and insert in to address
        if(props.HashCode){
          window.location.hash = props.HashCode;
        }
      }
    }

    $(function () {
      $('[data-toggle="tooltip"]').tooltip()
    });

    $('.btn-tooltip').tooltip();
    $('.label-tooltip').tooltip();
    $('.pick-class-label').click(function(){
        var new_class = $(this).attr('new-class');  
        var old_class = $('#display-buttons').attr('data-class');
        var display_div = $('#display-buttons');
        if(display_div.length) {
          var display_buttons = display_div.find('.btn');
          display_buttons.removeClass(old_class);
          display_buttons.addClass(new_class);
          display_div.attr('data-class', new_class);
        }
    });   

    function addLayerMarkersToOms(layers){
      //console.log(layers);
      //var layer;
      for(x in layers){
        drillOverlay(layers[x]);
      }
    } 

    function drillOverlay(layer){
      if(layer.eachLayer){//It's an LayerGroup - Drill!
        layer.eachLayer(function(eLayer){
          drillOverlay(eLayer);
        });
      }
      else{
        mapm.oms.addMarker(layer);
      }
    }

    function makeMarker(iconsArr, name){
      iconsArr[name] = L.icon({
        iconUrl: 'assets/img/marker-' + name + '.png',
        iconRetinaUrl: 'assets/img/marker-' + name + '-2x.png',
        shadowUrl: 'assets/img/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [0, 0]
      });
    }

    function loadMarkers(){
      //Define marker icons that can be used
      var markerIcons = {};

      markerTypes = ['orange', 'brown', 'green', 'blue', 'purple', 'white'];

      for (var i = 0; i < markerTypes.length; i++) {
        makeMarker(markerIcons, markerTypes[i]);
      };

      mapm.layers._markers.caves.addLayer(L.geoJson(caves, {
        pointToLayer: function (feature, latlng) {
          return L.marker(latlng, {icon: markerIcons.brown});
        }
      }));

      addLayerMarkersToOms(mapm.layers.markers);
    }


    function showHideMarkers(dates){
      mapm.oms.clearMarkers();
      //Remove all markers from display layer
      for(x in  mapm.layers.markers){
        var layer = mapm.layers.markers[x];
        layer.clearLayers();//Clears LayerGroup
      }

      //Go through all data layers and add correct data to display layers
      for(x in mapm.layers._markers){
        var layer = mapm.layers._markers[x];
        //Filter
        layer.eachLayer(function(markG){
          markG.eachLayer(function(mark){
            if(filterMarker(dates, mark)){
              mapm.layers.markers[x].addLayer(mark);
            }
          });
        });
      }

      //Re-add all displayed markers to OMS
      for(x in mapm.layers.markers){
        var layer = mapm.layers.markers[x];
        layer.eachLayer(function(mark){
          mapm.oms.addMarker(mark);
        });
      }

    }

    function filterMarker(dates, feature){
      return true;
    }

    $(function(){
        //Start it all off
        initMap();
    });