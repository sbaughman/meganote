{
  angular
    .module('meganote.users')
    .service('UsersService', ['$http', 'API_BASE', 'AuthToken', ($http, API_BASE, AuthToken) => {

      const USERS_URL = `${API_BASE}users/`;

      class UsersService {

        // Sign up
        create(user) {
          return $http.post(USERS_URL, {
            user
          })
            .then((res) => {
              AuthToken.set(res.data.authToken);
              console.log(`Gotten: ${AuthToken.get()}`);
            })
            .catch((error) => {
              console.log(error);
            });
        }
      }

      return new UsersService();
    }]);
}
