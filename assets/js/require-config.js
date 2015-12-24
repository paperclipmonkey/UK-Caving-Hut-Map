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
    angular: '../../bower_components/angular/angular',
    'angular-animate': '../../bower_components/angular-animate/angular-animate',
    'angular-resource': '../../bower_components/angular-resource/angular-resource',
    'angular-route': '../../bower_components/angular-route/angular-route',
    bootstrap: '../../bower_components/bootstrap/dist/js/bootstrap',
    'bower-leaflet': '../../bower_components/bower-leaflet/leaflet-src',
    jquery: '../../bower_components/jquery/dist/jquery',
    requirejs: '../../bower_components/requirejs/require',
    'requirejs-text': '../../bower_components/requirejs-text/text',
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
    'ui-leaflet': '../../bower_components/ui-leaflet/dist/ui-leaflet',
    leaflet: '../../bower_components/leaflet/dist/leaflet-src',
    'angular-simple-logger': '../../bower_components/angular-simple-logger/dist/angular-simple-logger',
    'leaflet-sidebar': '../../bower_components/leaflet-sidebar/src/L.Control.Sidebar'
  },
  packages: []
})
