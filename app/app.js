(function() {
  var app = angular.module('meganote', [
    'ui.router',
    'textAngular',
    'meganote.notes',
    'meganote.core'
  ]);

  function config($urlRouterProvider) {
    $urlRouterProvider.otherwise('/notes/');
  }

  config.$inject = ['$urlRouterProvider'];
  app.config(config);
})();
