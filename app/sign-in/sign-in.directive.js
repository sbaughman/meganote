{
  angular
    .module('meganote.signIn')
    .directive('signIn', [

      () => {

        class SignInController {
          submit() {
            console.log('submitted');
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
                <form id="new_user" ng-submit="vm.submit()">
                  <p>
                    <label for="name">Full Name</label><br>
                    <input
                      type="text"
                      name="name"
                      autofocus="autofocus"
                      ng-model="vm.user.name"
                      required>
                  </p>
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
              </div>
            </div>
          </div>
`
        };
      }

    ]);
}
