{
  angular
    .module('meganote.notes')
    .controller('NotesFormController', NotesFormController);

  NotesFormController.$inject = ['Flash', 'notesService', '$state', 'errorsService'];

  function NotesFormController(Flash, notesService, $state, errorsService) {
    const vm = this;

    vm.note = notesService.find($state.params.noteId) || {};
    vm.saveNote = saveNote;
    vm.deleteNote = deleteNote;

    /////////////////

    function saveNote() {
      notesService.saveNote(vm.note)
        .then(res => {
          vm.note = angular.copy(res.data.note);
          Flash.create('success', res.data.message);
          $state.go('notes.form', { noteId: vm.note._id });
        },
        err => {
          Flash.create('danger', errorsService.render(err));
        });
    }

    function deleteNote(note) {
      notesService.deleteNote(note)
        .then(res => {
          Flash.create('success', res.data.message);
          $state.go('notes.form', { noteId: undefined });
        },
        err => {
          Flash.create('danger', errorsService.render(err));
        });
    }
  }
}
