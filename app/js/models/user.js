angular.module('app')
    .service('UserModel', function ($http, $localStorage, BASE_URL) {
        var model = this;
        var urls = {
            login: BASE_URL + '/auth/login',
            getAllDsr: BASE_URL + '/dsr/get-all-dsr',
            getAllManager: BASE_URL + '/manager/get-all-manager',
            getAllAdmin: BASE_URL + '/admin/get-all-admin'
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

        model.setCurrentUser = function (user) {
            $localStorage.currentUser = user;
        };

        model.getAllDsr = function (page, successCallback, failureCallback) {
            return $http.get(urls.getAllDsr, {params: {page: page}}).success(function (response) {
                successCallback(response.data);
            }).error(function (data) {
                failureCallback(data.error.message)
            });
        };

        model.getAllManager = function (page, successCallback, failureCallback) {
            return $http.get(urls.getAllManager, {params: {page: page}}).success(function (response) {
                successCallback(response.data)
            }).error(function (response) {
                failureCallback(response.error.data)
            })
        };

        model.getAllAdmin = function (page, successCallback, failureCallback) {
            return $http.get(urls.getAllAdmin, {params: {page: page}}).success(function (response) {
                successCallback(response.data)
            }).error(function (response) {
                failureCallback(response.error.data)
            })
        }

        model.getFullName = function (user) {
            return user.first_name + " " + user.last_name;
        }
    });