{
  angular
    .module('meganote.users')
    .service('CurrentUser', ['$window', $window => {

      class CurrentUser {
        constructor() {
          this.user = JSON.parse($window.localStorage.getItem('currentUser'));
        }
        get() {
          return this.user || {};
        }
        set(user) {
          this.user = user;
          $window.localStorage.setItem('currentUser', JSON.stringify(this.user));
        }
        clear() {
          this.user = undefined;
          $window.localStorage.removeItem('currentUser');
        }
        signedIn() {
          return !!(this.get()._id);
        }
      }

      return new CurrentUser();

    }]);
}
