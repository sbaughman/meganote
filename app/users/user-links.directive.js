{
  angular
    .module('meganote.users')
    .directive('userLinks', [

      'AuthToken',
      'CurrentUser',

      (AuthToken, CurrentUser) => {

        class UserLinksController {
          user() {
            return CurrentUser.get();
          }
          signedIn() {
            return CurrentUser.signedIn();
          }
          logout() {
            AuthToken.clear();
            CurrentUser.clear();
          }
        }

        return {
          scope: {},
          controller: UserLinksController,
          controllerAs: 'vm',
          bindToController: true,
          template: `
            <div class="user-links">
              <span ng-show="vm.signedIn()">
                Signed in as {{ vm.user().name }}
                |
                <a ui-sref="sign-up" ng-click="vm.logout()">Log out</a>
              </span>
              <span ng-hide="vm.signedIn()">
                <a ui-sref="sign-up">Sign up for Meganote today!</a>
              </span>
            </div>`,
        };
    }]);
}
