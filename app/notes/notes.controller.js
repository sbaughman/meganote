(function() {
  'use strict';

  angular
    .module('meganote.notes')
    .controller('NotesController', NotesController);

  NotesController.$inject = ['$scope'];

  function NotesController($scope) {
    $scope.notes = [];

    function Note() {
      this.title = '',
      this.body = ''
    }

    $scope.addNote = addNote;
    $scope.note = new Note();

    function addNote(note) {
      $scope.notes.push(note);
      $scope.note = new Note();
    }
  }

})();
