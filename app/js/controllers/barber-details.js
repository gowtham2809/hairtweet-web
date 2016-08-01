angular.module('app')
    .controller('BarberController', function ($rootScope, $scope, $stateParams, BarberModel) {
        $scope.inEditMode = false;
        $rootScope.$broadcast('showLoading');
        BarberModel.loadBarberDetails($stateParams.barberId,
            getBarberSuccess, getBarberFailure);

        $scope.setEditMode = function (state) {
            $scope.inEditMode = state;
        };
        function getBarberSuccess(response) {
            var barber = response.data.barber;
            $scope.barber = barber;

            $rootScope.$broadcast('hideLoading');
        }

        function getBarberFailure() {
            $scope.barber = [];
        }
        $scope.getBarberAddress = function (barber) {
            return BarberModel.getBarberAddress(barber);
        }

    });