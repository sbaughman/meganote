{
  angular
    .module('meganote.signUp')
    .directive('sbSignUp', () => {

      class SignUpController {
        constructor() {
          this.user = {};
        }
        submit() {
          console.log(this.user);
        }
      }

      return {
        templateUrl: '/sign-up/sign-up.html',
        controller: SignUpController,
        controllerAs: 'vm',
        bindToController: true,
        scope: {},
      };
    });
}
