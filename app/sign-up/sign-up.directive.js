{
  angular
    .module('meganote.signUp')
    .directive('signUp', [

      '$state',
      'Flash',
      'UsersService',

      ($state, Flash, UsersService) => {

        class SignUpController {
          constructor() {
            this.user = {};
          }
          submit() {
            UsersService.create(this.user)
              .then(() => {
                $state.go('notes.form', {noteId: undefined});
              })
              .catch(err => {
                let errors = '';
                for (let error of err.data.errors) {
                  errors += `<li>${error}</li>`
                }
                Flash.create('danger', `<ul>${errors}</ul>` )
              });
          }
        }

        return {
          templateUrl: '/sign-up/sign-up.html',
          controller: SignUpController,
          controllerAs: 'vm',
          bindToController: true,
          scope: {},
        };
    }]);
}
