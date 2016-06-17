(function() {
  'use strict';

  angular
    .module('meganote.notes')
    .controller('NotesController', NotesController);

  NotesController.$inject = ['notesService'];

  function NotesController(notesService) {
    var vm = this;

    notesService.getNotes().then(function() {
      vm.notes = notesService.notes;
    });
  }

})();
