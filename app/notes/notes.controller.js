{
  angular
    .module('meganote.notes')
    .controller('NotesController', NotesController);

  NotesController.$inject = ['notesService'];

  function NotesController(notesService) {
    let vm = this;

    vm.notes = notesService.notes;
  }
}
