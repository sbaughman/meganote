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
    vm.updateNote = updateNote;
    vm.saveOrUpdateNote = saveOrUpdateNote;
    vm.deleteNote = deleteNote;
    vm.resetForm = resetForm;

    /////////////////

    function saveOrUpdateNote() {
      if (vm.note._id) {
        updateNote();
      } else {
        addNote();
      }
    }

    function addNote() {
      notesService.createNote(vm.note);
      resetForm();
    }

    function editNote(note) {
      vm.note = angular.copy(note);
    }

    function updateNote() {
      notesService.updateNote(vm.note);
      resetForm();
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
