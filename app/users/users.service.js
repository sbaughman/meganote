{
  angular
    .module('meganote.users')
    .service('UsersService', ['$http', 'API_BASE', 'AuthToken', 'CurrentUser', ($http, API_BASE, AuthToken, CurrentUser) => {

      const USERS_URL = `${API_BASE}users/`;
      const SESSIONS_URL = `${API_BASE}sessions/`;

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

        // Update user profile
        update(user) {
          return $http.put(`${USERS_URL}${user._id}`, {
            user
          })
          .then((res) => {
            CurrentUser.set(res.data.user);
          });
        }

        // Log in
        login(user) {
          return $http.post(`${SESSIONS_URL}`, {
            user
          })
          .then((res) => {
            console.log(res);
            AuthToken.set(res.data.authToken);
            CurrentUser.set(res.data.user);
          },
          (error) => {
            console.log(error);
          });
        }
      }

      return new UsersService();
    }]);
}
