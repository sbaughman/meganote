(function() {
  'use strict';

  angular
    .module('meganote.notes')
    .factory('notesService', notesService);

  notesService.$inject = ['$http', 'NOTES_URL'];

  function notesService($http, NOTES_URL) {
    var service = {
      notes: [],
      getNotes: getNotes,
      saveNote: saveNote,
      createNote: createNote,
      updateNote: updateNote,
      deleteNote: deleteNote,
      Note: Note,
    };

    return service;

    //////////////

    function Note() {
      this.title = '',
      this.body_html = ''
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
      notesPromise.then(function(res) {
        service.notes = res.data;
      });
      return notesPromise;
    }

    function createNote(note) {
      var notePromise = $http.post(NOTES_URL, { note: note });
      notePromise.then(function(note) {
        service.notes.unshift(note.data.note);
      });
      return notePromise;
    }

    function updateNote(note) {
      var notePromise = $http.put(NOTES_URL + note._id, { note: note });
      notePromise.then(function(updated_note) {
        replaceNote(updated_note.data.note);
      });
      return notePromise;
    }

    function deleteNote(note) {
      $http.delete(NOTES_URL + note._id, { note: note })
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
