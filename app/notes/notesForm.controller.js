(function() {
  'use strict';

  angular
    .module('meganote.notes')
    .controller('NotesFormController', NotesFormController);

  NotesFormController.$inject = ['notesService', '$state'];

  function NotesFormController(notesService, $state) {
    var vm = this;

    vm.note = notesService.find($state.params.noteId);
    vm.saveNote = saveNote;
    vm.deleteNote = deleteNote;
    vm.resetForm = resetForm;

    /////////////////

    function saveNote() {
      notesService.saveNote(vm.note).then(function(res) {
        vm.note = angular.copy(res.data.note);
      });
    }

    function deleteNote(note) {
      notesService.deleteNote(note);
      resetForm();
    }

    function resetForm() {
      vm.note = new notesService.Note();
    }

  }

})();
