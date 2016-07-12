{
  angular
    .module('meganote.users')
    .directive('userProfile', [

      'CurrentUser',
      'UsersService',

      (CurrentUser, UsersService) => {

        class UserProfileController {
          constructor() {
            this.user = angular.copy(CurrentUser.get());
          }
          submit() {
            UsersService.update(this.user);
          }
        }

        return {
          scope: {},
          controller: UserProfileController,
          controllerAs: 'vm',
          bindToController: true,
          template: `
          <div class="container">
            <div class="row">
              <div class="col-xs-6 col-xs-offset-4">
                <h3>Update your profile</h3>
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
                  <input
                    type="submit"
                    name="commit"
                    value="Save Changes"
                    class="btn btn-default">
                  <span class="login">
                    <a ui-sref="notes.form({ noteId: undefined })">
                      Back to Notes
                    </a>
                  </span>
                </form>
              </div>
            </div>
          </div>

          `
        }
      }
    ])
}
