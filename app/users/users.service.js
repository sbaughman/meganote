{
  angular
    .module('meganote.users')
    .service('UsersService', ['$http', 'API_BASE', ($http, API_BASE) => {

      class UsersService {
        create(user) {
          return $http.post(`${API_BASE}users`, {
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
