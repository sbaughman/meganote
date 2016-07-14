{
  angular
    .module('meganote.core')
    .factory('errorsService', errorsService);

  errorsService.$inject = [];

  function errorsService() {
    let service = {
      render: render,
    }

    return service;

    ////////////

    function render(err) {
      let errors = '';
      for (let error of err.data.errors) {
        errors += `<li>${error}</li>`
      }
      return `<ul>${errors}</ul>`
    }
  }
}
