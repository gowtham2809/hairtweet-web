angular.module('app')
    .controller('BarberController', function ($rootScope, $scope, $stateParams, BarberModel, ToasterService) {
        $scope.inEditMode = false;
        $scope.coverColor = "#78686F";

        $rootScope.$broadcast('showLoading');
        BarberModel.loadBarberDetails($stateParams.barberId,
            getBarberSuccess, getBarberFailure);

        $scope.setEditMode = function (state) {
            if (state == true)
            // deep copy
                $scope.barberCopy = angular.copy($scope.barber);
            $scope.inEditMode = state;
        };
        function getBarberSuccess(response) {
            $scope.barber = response.data.barber;
            $rootScope.$broadcast('hideLoading');
        }

        function getBarberFailure() {
            $rootScope.$broadcast('hideLoading');
            $scope.barber = [];
        }

        $scope.getBarberAddress = function (barber) {
            return BarberModel.getBarberAddress(barber);
        };
        $scope.updateBarber = function () {
            BarberModel.setBarberActivateState({
                id: $stateParams.barberId,
                condition: $scope.barberCopy.is_active
            }, setSuccess, setFailure);
            BarberModel.updateBarber({
                id: $stateParams.barberId,
                first_name: $scope.barberCopy.first_name,
                last_name: $scope.barberCopy.last_name,
                email: $scope.barberCopy.email,
                phone_number: $scope.barberCopy.phone_number,
                shop_name: $scope.barberCopy.shop_name,
                address_line_1: $scope.barberCopy.address_line_1,
                address_line_2: $scope.barberCopy.address_line_2,
                address_line_3: $scope.barberCopy.address_line_3,
                logo: $scope.myFile
            }, updateSuccess, updateFailure);

            $rootScope.$broadcast('showLoading');
        };
        function updateSuccess(updateResponse) {
            $scope.barber = angular.copy($scope.barberCopy);
            ToasterService.success(null, "Update successful!");
            $rootScope.$broadcast('hideLoading');
            $scope.inEditMode = false;
        }

        function updateFailure($message) {
            ToasterService.error(null, $message);
            $rootScope.$broadcast('hideLoading');
        }
        function setSuccess(updateResponse) {
        }

        function setFailure($message) {
        }

        $scope.isBarberActive = function (barber) {
            if (_.isUndefined(barber))return;
            return BarberModel.isBarberActive(barber);
        }
    });