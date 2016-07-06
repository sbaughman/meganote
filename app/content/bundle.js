(function () {
  var app = angular.module('meganote', ['ui.router', 'textAngular', 'meganote.notes', 'meganote.core']);

  function config($urlRouterProvider) {
    $urlRouterProvider.otherwise('/notes/');
  }

  config.$inject = ['$urlRouterProvider'];
  app.config(config);
})();
(function () {
  'use strict';

  angular.module('meganote.core').constant('NOTES_URL', 'http://localhost:3030/notes/');
})();
(function () {
  'use strict';

  angular.module('meganote.core', []);
})();
(function () {
  'use strict';

  angular.module('meganote.notes').config(configFunction);

  configFunction.$inject = ['$stateProvider'];

  function configFunction($stateProvider) {
    $stateProvider.state('notes', {
      url: '/notes',
      templateUrl: 'notes/notes.html',
      controller: 'NotesController',
      controllerAs: 'vm',
      resolve: {
        notesLoaded: notesLoaded
      }
    }).state('notes.form', {
      url: '/:noteId',
      templateUrl: 'notes/notes-form.html',
      controller: 'NotesFormController',
      controllerAs: 'vm'
    });
  }

  notesLoaded.$inject = ['notesService'];

  function notesLoaded(notesService) {
    return notesService.getNotes();
  }
})();
(function () {
  'use strict';

  angular.module('meganote.notes').controller('NotesController', NotesController);

  NotesController.$inject = ['notesService'];

  function NotesController(notesService) {
    var vm = this;

    vm.notes = notesService.notes;
  }
})();
(function () {
  'use strict';

  angular.module('meganote.notes', []);
})();
(function () {
  'use strict';

  angular.module('meganote.notes').factory('notesService', notesService);

  notesService.$inject = ['$http', 'NOTES_URL'];

  function notesService($http, NOTES_URL) {
    var service = {
      notes: [],
      find: find,
      getNotes: getNotes,
      saveNote: saveNote,
      createNote: createNote,
      updateNote: updateNote,
      deleteNote: deleteNote,
      Note: Note
    };

    return service;

    //////////////

    function Note() {
      this.title = '', this.body_html = '';
    }

    function find(id) {
      for (var i = 0; i < service.notes.length; i++) {
        if (id === service.notes[i]._id) {
          return angular.copy(service.notes[i]);
        }
      }
    }

    function saveNote(note) {
      if (note._id) {
        return service.updateNote(note);
      } else {
        return service.createNote(note);
      }
    }

    function getNotes() {
      var notesPromise = $http.get(NOTES_URL);
      notesPromise.then(function (res) {
        service.notes = res.data;
      });
      return notesPromise;
    }

    function createNote(note) {
      var notePromise = $http.post(NOTES_URL, { note: note });
      notePromise.then(function (note) {
        service.notes.unshift(note.data.note);
      });
      return notePromise;
    }

    function updateNote(note) {
      var notePromise = $http.put(NOTES_URL + note._id, { note: note });
      notePromise.then(function (updated_note) {
        replaceNote(updated_note.data.note);
      });
      return notePromise;
    }

    function deleteNote(note) {
      $http.delete(NOTES_URL + note._id, { note: note }).then(function () {
        removeNote(note);
      });
    }

    function replaceNote(note) {
      for (var i = 0; i < service.notes.length; i++) {
        if (note._id === service.notes[i]._id) {
          service.notes.splice(i, 1);
          service.notes.unshift(note);
          break;
        }
      }
    }

    function removeNote(note) {
      for (var i = 0; i < service.notes.length; i++) {
        if (note._id === service.notes[i]._id) {
          service.notes.splice(i, 1);
          break;
        }
      }
    }
  }
})();
(function () {
  'use strict';

  angular.module('meganote.notes').controller('NotesFormController', NotesFormController);

  NotesFormController.$inject = ['notesService', '$state'];

  function NotesFormController(notesService, $state) {
    var vm = this;

    vm.note = notesService.find($state.params.noteId);
    vm.saveNote = saveNote;
    vm.deleteNote = deleteNote;

    /////////////////

    function saveNote() {
      notesService.saveNote(vm.note).then(function (res) {
        vm.note = angular.copy(res.data.note);
        $state.go('notes.form', { noteId: vm.note._id });
      });
    }

    function deleteNote(note) {
      notesService.deleteNote(note);
      $state.go('notes.form', { noteId: undefined });
    }
  }
})();
(function () {
  'use strict';

  angular.module('meganote.signUp').directive('sbSignUp', sbSignUp);

  function sbSignUp() {}
})();
(function () {
  'use strict';

  angular.module('meganote.signUp', []);
})();
//# sourceMappingURL=bundle.js.map
