(function() {
  'use strict';

  angular
    .module('meganote.notes', [])

    .config(configFunction)

    .controller('NotesController', NotesController);

    configFunction.$inject = ['$stateProvider'];

    function configFunction($stateProvider) {
      $stateProvider

        .state('notes', {
          url: '/notes',
          templateUrl: 'notes/notes.html',
          controller: 'NotesController',
        })

        .state('notes.form', {
          url: '/:noteId',
          templateUrl: 'notes/notes-form.html'
        });
    }

    function NotesController($scope) {
      $scope.message = "I like to party";
    };

})();
