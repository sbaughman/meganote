{
  angular
    .module('meganote.notes')
    .controller('NotesFormController', NotesFormController);

  NotesFormController.$inject = ['notesService', '$state'];

  function NotesFormController(notesService, $state) {
    const vm = this;

    vm.note = notesService.find($state.params.noteId);
    vm.saveNote = saveNote;
    vm.deleteNote = deleteNote;

    /////////////////

    function saveNote() {
      notesService.saveNote(vm.note).then(function(res) {
        vm.note = angular.copy(res.data.note);
        $state.go('notes.form', { noteId: vm.note._id });
      });
    }

    function deleteNote(note) {
      notesService.deleteNote(note);
      $state.go('notes.form', { noteId: undefined });
    }
  }
}
