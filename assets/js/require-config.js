require.config({
  shim: {
    angular: {
      exports: 'angular'
    },
    angularRoute: [
      'angular'
    ],
    'angular-simple-logger': [
      'angular'
    ],
    'ui-leaflet': [
      'angular',
      'angular-simple-logger'
    ],
    'Leaflet.awesome-markers': [
      'leaflet'
    ],
    'leaflet-bing-layer': [
      'leaflet'
    ],
    bootstrap: [
      'jquery'
    ],
    'leaflet-sidebar': [
      'leaflet'
    ],
    angularMocks: {
      deps: [
        'angular'
      ],
      exports: 'angular.mock'
    }
  },
  paths: {
    bootstrap: '../../bower_components/bootstrap/dist/js/bootstrap',
    jquery: '../../bower_components/jquery/dist/jquery',
    requirejs: '../../bower_components/requirejs/require',
    json: '../../bower_components/requirejs-plugins/src/json',
    goog: '../../bower_components/requirejs-plugins/src/goog',
    async: '../../bower_components/requirejs-plugins/src/async',
    text: '../../bower_components/requirejs-plugins/lib/text',
    font: '../../bower_components/requirejs-plugins/src/font',
    noext: '../../bower_components/requirejs-plugins/src/noext',
    mdown: '../../bower_components/requirejs-plugins/src/mdown',
    depend: '../../bower_components/requirejs-plugins/src/depend',
    image: '../../bower_components/requirejs-plugins/src/image',
    'Markdown.Converter': '../../bower_components/requirejs-plugins/lib/Markdown.Converter',
    propertyParser: '../../bower_components/requirejs-plugins/src/propertyParser',
    'jquery-ui': '../../bower_components/jquery-ui/jquery-ui',
    leaflet: '../../bower_components/leaflet/dist/leaflet-src',
    'leaflet-sidebar': '../../bower_components/leaflet-sidebar/src/L.Control.Sidebar',
    'Leaflet.awesome-markers': '../../bower_components/Leaflet.awesome-markers/dist/leaflet.awesome-markers',
    'leaflet-bing-layer': '../../bower_components/leaflet-bing-layer/leaflet-bing-layer',
    handlebars: '../../bower_components/handlebars/handlebars'
  },
  packages: [

  ]
})
