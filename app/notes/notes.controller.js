{
  angular
    .module('meganote.notes')
    .controller('NotesController', NotesController);

  NotesController.$inject = ['notesService'];

  function NotesController(notesService) {
    const vm = this;

    vm.notes = notesService.notes;
  }
}
