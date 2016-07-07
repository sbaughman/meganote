{
  angular
    .module('meganote.signUp')
    .directive('sbSignUp', ['UsersService', (UsersService) => {

      class SignUpController {
        constructor() {
          this.user = {};
        }
        submit() {
          UsersService.create(this.user);
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
