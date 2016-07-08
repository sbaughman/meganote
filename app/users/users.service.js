{
  angular
    .module('meganote.users')
    .service('UsersService', ['$http', 'API_BASE', ($http, API_BASE) => {

      const USERS_URL = `${API_BASE}users/`;

      class UsersService {
        create(user) {
          return $http.post(USERS_URL, {
            user
          })
            .then((returned_user) => {
              console.log(returned_user);
            })
            .catch((error) => {
              console.log(error);
            });
        }
      }

      return new UsersService();
    }]);
}
