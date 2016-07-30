angular.module('app')
    .controller('HeaderController', function ($scope, UserModel) {
        $scope.currentUser = UserModel.getCurrentUser();
    })
;