angular.module('app')
    .controller('HeaderController', function ($scope, UserModel) {
        $scope.currentUser = UserModel.getCurrentUser();
        $scope.userType = UserModel.getUserType();
    })
;