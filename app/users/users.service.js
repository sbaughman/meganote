{
  angular
    .module('meganote.users')
    .service('UsersService', ['$http', 'API_BASE', 'AuthToken', 'CurrentUser', ($http, API_BASE, AuthToken, CurrentUser) => {

      const USERS_URL = `${API_BASE}users/`;
      const SESSIONS_URL = `${API_BASE}sessions/`;

      class UsersService {

        // Sign up
        create(user) {
          var userPromise = $http.post(USERS_URL, {user});
          userPromise.then((res) => {
            AuthToken.set(res.data.authToken);
            CurrentUser.set(res.data.user);
          });
          return userPromise;
        }

        // Update user profile
        update(user) {
          var userPromise = $http.put(`${USERS_URL}${user._id}`, {user});
          userPromise.then((res) => {
            CurrentUser.set(res.data.user);
          });
          return userPromise;
        }

        // Log in
        login(user) {
          var userPromise = $http.post(`${SESSIONS_URL}`, {user});
          userPromise.then((res) => {
            AuthToken.set(res.data.authToken);
            CurrentUser.set(res.data.user);
          });
          return userPromise;
        }
      }

      return new UsersService();
    }]);
}
