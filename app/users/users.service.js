{
  angular
    .module('meganote.users')
    .service('UsersService', ['$http', 'API_BASE', ($http, API_BASE) => {

      class UsersService {
        create(user) {
          $http.post(${API_BASE}users, {
            user
          })
            .then((user) => {
                console.log(user);
            });
        }
      }

      return new UsersService();
    }]);
}
