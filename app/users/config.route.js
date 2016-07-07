{
  angular
    .module('meganote.users')
    .config(configFunction);

  configFunction.$inject = ['$stateProvider'];

  function configFunction($stateProvider) {
    $stateProvider
      .$state('sign-up', {
        url: '/sign-up',
        template: '<sb-sign-up></sb-sign-up>'
      });
  }
}
