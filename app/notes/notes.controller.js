(function() {
  'use strict';

  angular
    .module('meganote.notes')
    .controller('NotesController', NotesController);

  NotesController.$inject = ['$state', 'notesService'];

  function NotesController($state, notesService) {
    $state.go('notes.form');
    var vm = this;

    notesService.getNotes().then(function() {
      vm.notes = notesService.notes;
    });

    vm.note = new notesService.Note();
    vm.editNote = editNote;
    vm.saveNote = saveNote;
    vm.deleteNote = deleteNote;
    vm.resetForm = resetForm;

    /////////////////

    function saveNote() {
      notesService.saveNote(vm.note).then(function(res) {
        vm.note = angular.copy(res.data.note);
      });
    }

    function editNote(note) {
      vm.note = angular.copy(note);
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
