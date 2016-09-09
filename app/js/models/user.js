angular.module('app')
    .service('UserModel', function ($localStorage, $injector, WEB_URL) {
        $http = $injector.get('$http');
        var model = this;
        var urls = {
            login: WEB_URL + '/web/login'
        };
        model.attemptLogin = function (loginRequest, successCallback, failureCallback) {
            // make a http request to attempt login
            return $http.post(urls.login, {
                email: loginRequest.email,
                password: loginRequest.password
            }).success(function (response) {
                failureCallback("You are not authorised to login.");
                // login success
                successCallback(response.data);
            }).error(function (data, status) {
                // incorrect credentials specified
                if (status == 400)
                    failureCallback("Please check your input.");
                else if (status == 401)
                    failureCallback("Incorrect email or password combination.");
                else
                    failureCallback(data.error.message);
            })
        };

        model.getCurrentUser = function () {
            return $localStorage.currentUser
        };
        model.getUserType = function () {
            return $localStorage.userType
        };

        model.setCurrentUser = function (user) {
            $localStorage.currentUser = user;
        };
        model.currentUserType = function (type) {
            $localStorage.userType = type;
        };
        model.getFullName = function (user) {
            return user.first_name + " " + user.last_name;
        }
    });