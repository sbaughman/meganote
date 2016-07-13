{
  angular
    .module('meganote.notes')
    .factory('notesService', notesService);

  notesService.$inject = ['$http', 'API_BASE'];

  function notesService($http, API_BASE) {
    const NOTES_URL = `${API_BASE}notes/`;

    const service = {
      notes: [],
      find: find,
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

    function find(id) {
      for (let i = 0; i < service.notes.length; i++) {
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
      const notesPromise = $http.get(NOTES_URL);
      notesPromise.then((res) => { service.notes = res.data });
      return notesPromise;
    }

    function createNote(note) {
      const notePromise = $http.post(NOTES_URL, { note: note });
      notePromise.then((note) => { service.notes.unshift(note.data.note) });
      return notePromise;
    }

    function updateNote(note) {
      const notePromise = $http.put(NOTES_URL + note._id, { note: note });
      notePromise.then((updated_note) => { replaceNote(updated_note.data.note)});
      return notePromise;
    }

    function deleteNote(note) {
      const notePromise = $http.delete(NOTES_URL + note._id, { note: note });
      notePromise.then(() => { removeNote(note) });
      return notePromise;
    }

    function replaceNote(note) {
      for (let i = 0; i < service.notes.length; i++) {
        if (note._id === service.notes[i]._id) {
          service.notes.splice(i, 1);
          service.notes.unshift(note);
          break;
        }
      }
    }

    function removeNote(note){
      for (let i = 0; i < service.notes.length; i++) {
        if (note._id === service.notes[i]._id) {
          service.notes.splice(i, 1);
          break;
        }
      }
    }
  }
}
