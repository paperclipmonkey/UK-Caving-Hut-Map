require([
  'angular',
  'map',
  'angular-simple-logger'
], function (angular, app, logger) {
  angular.element(document).ready(function () {
    // bootstrap the app manually
    angular.bootstrap(document, ['demoapp'])
  })
}
)
