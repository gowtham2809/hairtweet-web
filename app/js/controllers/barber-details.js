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
        };
        $scope.updateBarber = function () {
            BarberModel.updateBarber({
                id: $stateParams.barberId,
                first_name: $scope.barber.first_name,
                last_name: $scope.barber.last_name,
                email: $scope.barber.email,
                phone_number: $scope.barber.phone_number,
                shop_name: $scope.barber.shop_name,
                address_line_1: $scope.barber.address_line_1,
                address_line_2: $scope.barber.address_line_2,
                address_line_3: $scope.barber.address_line_3,
                logo:$scope.myFile
            }, updateSuccess, updateFailure)
        };
        function updateSuccess(updateResponse) {

        }

        function updateFailure($message) {
        }

    });