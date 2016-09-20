angular.module('app')
    .controller('NavController', function ($scope,UserModel) {
        $scope.currentUser = UserModel.getCurrentUser();
        $scope.userType = UserModel.getUserType();
    })
;