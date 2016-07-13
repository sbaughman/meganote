{
  angular
    .module('meganote.notes')
    .config(configFunction);

    configFunction.$inject = ['$stateProvider'];

    function configFunction($stateProvider) {
      $stateProvider

        .state('notes', {
          url: '/notes',
          templateUrl: 'notes/notes.html',
          controller: 'NotesController',
          controllerAs: 'vm',
          resolve: {
            notesLoaded: notesLoaded
          },
          data: {
            title:  'Notes'
          },
        })

        .state('notes.form', {
          url: '/:noteId',
          templateUrl: 'notes/notes-form.html',
          controller: 'NotesFormController',
          controllerAs: 'vm',
          data: {
            title:  'Notes'
          },
        });
    }

    notesLoaded.$inject = ['notesService'];

    function notesLoaded(notesService) {
      return notesService.getNotes();
    }
}
