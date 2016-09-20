'use strict';

angular.module('app')
    .controller('LoginFormController', function ($scope, $state, UserModel, TokenModel) {
        $scope.user = {};
        $scope.authError = null;

        UserModel.setCurrentUser(null);
        TokenModel.setToken(null);

        $scope.login = function () {
            $scope.authError = null;
            UserModel.attemptLogin({
                email: $scope.user.email,
                password: $scope.user.password
            }, loginSuccess, loginFailure)
        };

        function loginSuccess(loginResponse) {
            // save toke and current user data
            TokenModel.setToken(loginResponse.token);
            if(loginResponse.user_type == "barber") {
                UserModel.setCurrentUser(loginResponse.barber);
            }
            if(loginResponse.user_type == "admin") {
                UserModel.setCurrentUser(loginResponse.admin);
            }
            UserModel.currentUserType(loginResponse.user_type);
            if(loginResponse.user_type == "barber"){
                $state.go('app.barber-dashboard');
                return;
            }
            $state.go('app');
        }

        function loginFailure($message) {
            $scope.authError = $message;
        }
    })
;