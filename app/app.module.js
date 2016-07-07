{
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

  runFunction.$inject = ['$rootScope', '$state'];

  function runFunction($rootScope, $state) {
    $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
      $rootScope.$state = $state;
    });
  }
}
