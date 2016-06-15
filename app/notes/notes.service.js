(function() {
  'use strict';

  angular
    .module('meganote.notes')
    .factory('notesService', notesService);

  notesService.$inject = ['$http'];

  function notesService($http) {
    var service = {
      notes: [],
      getNotes: getNotes,
      createNote: createNote,
      updateNote: updateNote,
      deleteNote: deleteNote,
      Note: Note,
    };

    return service;

    //////////////

    function Note() {
      this.title = '',
      this.body_html = '',
      this._id = ''
    }

    function getNotes() {
      var notesPromise = $http.get('https://meganote.herokuapp.com/notes');
      notesPromise.then(function(res) {
        service.notes = res.data;
      });
      return notesPromise;
    }

    function createNote(note) {
      $http.post('https://meganote.herokuapp.com/notes', { note: note })
        .then(function(note) {
          service.notes.unshift(note.data.note);
        });
    }

    function updateNote(note) {
      $http.put('https://meganote.herokuapp.com/notes/' + note._id, { note: note })
        .then(function() {
          replaceNote(note);
        });
    }

    function deleteNote(note) {
      $http.delete('https://meganote.herokuapp.com/notes/' + note._id, { note: note })
        .then(function() {
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

    function removeNote(note){
      for (var i = 0; i < service.notes.length; i++) {
        if (note._id === service.notes[i]._id) {
          service.notes.splice(i, 1);
          break;
        }
      }
    }

  }
})();
