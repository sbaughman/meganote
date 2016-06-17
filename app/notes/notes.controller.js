(function() {
  'use strict';

  angular
    .module('meganote.notes')
    .controller('NotesController', NotesController);

  NotesController.$inject = ['notesService'];

  function NotesController(notesService) {
    var vm = this;

    vm.notes = notesService.notes;
    vm.resetForm = resetForm;

    function resetForm() {
      vm.note = new notesService.Note();
    }
  }

})();
