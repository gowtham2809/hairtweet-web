angular.module('app')
    .service('TokenModel', function ($localStorage, $injector, BASE_URL) {
        var model = this;
        var urls = {
            refresh_token: BASE_URL + '/auth/refresh-token'
        };
        model.getToken = function () {
            return $localStorage.token;
        };

        model.setToken = function (token) {
            // persist the token object in local storage
            $localStorage.token = token;
        };

        model.refreshToken = function () {
            //Injected to prevent circular dependency error
            $http = $injector.get('$http');
            return $http.post(urls.refresh_token, {refresh_token: model.getToken().refresh_token}).success(
                function (response) {
                    model.setToken(response.data.data.token);
                }
            );
        };

        model.isTokenValid = function () {
            var token = model.getToken();
            var timeDiff = moment.utc().format('X') - moment(token.token_created_at).format('X');
            return timeDiff < token.expire_in_sec;
        }
    });