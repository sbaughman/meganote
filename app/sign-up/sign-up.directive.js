{
  angular
    .module('meganote.signUp')
    .directive('signUp', [

      '$state',
      'Flash',
      'UsersService',
      'errorsService',

      ($state, Flash, UsersService, errorsService) => {

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
                Flash.create('danger', errorsService.render(err) )
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
