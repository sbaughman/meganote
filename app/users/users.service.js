{
  angular
    .module('meganote.users')
    .service('UsersService', ['$http', 'API_BASE', 'AuthToken', 'CurrentUser', ($http, API_BASE, AuthToken, CurrentUser) => {

      const USERS_URL = `${API_BASE}users/`;

      class UsersService {

        // Sign up
        create(user) {
          return $http.post(USERS_URL, {
            user
          })
            .then((res) => {
              AuthToken.set(res.data.authToken);
              CurrentUser.set(res.data.user);
            })
            .catch((error) => {
              console.log(error);
            });
        }
      }

      return new UsersService();
    }]);
}
