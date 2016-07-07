(function() {
  angular.module('meganote', [
    'ui.router',
    'textAngular',
    'meganote.notes',
    'meganote.core'
  ])
  .config(configFunction)
  .run(runFunction);

  configFunction.$inject = ['$urlRouterProvider'];

  function configFunction($urlRouterProvider) {
    $urlRouterProvider.otherwise('/notes/');
  }

  runFunction.$inject = ['$state'];

  function runFunction($state) {
    
  }
})();
