{
  angular
    .module('meganote.signIn')
    .directive('signIn', [

      '$state',
      'Flash',
      'UsersService',
      'errorsService',

      ($state, Flash, UsersService, errorsService) => {

        class SignInController {
          submit() {
            UsersService.login(this.user)
              .then(data => {
                $state.go('notes.form', {noteId: undefined});
              })
              .catch(err => {
                Flash.create('danger', errorsService.render(err));
              });
          }
        }

        return {
          scope: {},
          controller: SignInController,
          controllerAs: 'vm',
          bindToController: true,
          template: `<div class="container">
            <div class="row">
              <div class="col-xs-6 col-xs-offset-4">
                <h3>Welcome Back!</h3>
                <form id="new_user" ng-submit="vm.submit()" novalidate>
                  <p>
                    <label for="username">Username</label><br>
                    <input
                      type="text"
                      name="username"
                      ng-model="vm.user.username"
                      required>
                  </p>
                  <p>
                    <label for="password">Password</label><br>
                    <input
                      type="password"
                      name="password"
                      ng-model="vm.user.password"
                      required>
                  </p>
                  <input
                    type="submit"
                    name="commit"
                    value="Log in"
                    class="btn btn-default">
                  <span class="login">
                    Don't have an account?
                    <a ui-sref="sign-up">Sign up.</a>
                  </span>
                </form>
                <div id="flash">
                  <flash-message
                    duration="5000"
                    show-close="true">
                  </flash-message>
                </div>
              </div>
            </div>
          </div>
`
        };
      }

    ]);
}
