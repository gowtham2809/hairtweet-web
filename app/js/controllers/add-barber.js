'use strict';

angular.module('app')
    .controller('AddBarberController', function ($scope, $state, BarberModel,ToasterService) {
        $scope.barber = {};
        $scope.location = {
            latitude: 0,
            longitude: 0
        };
        $scope.addBarber = function () {
            BarberModel.addBarber({
                firstName: $scope.barber.first_name,
                lastName: $scope.barber.last_name,
                email: $scope.barber.email,
                password: $scope.barber.password,
                phoneNumber: $scope.barber.phone_number,
                logo: $scope.barber.myFile,
                shopName: $scope.barber.shop_name,
                address1: $scope.barber.address_line_1,
                address2: $scope.barber.address_line_2,
                address3: $scope.barber.address_line_3,
                latitude: $scope.location.latitude,
                longitude: $scope.location.longitude
            }, addSuccess, addFailure)
        };
        function addSuccess(addResponse) {
            ToasterService.success(null, "added successful!");
            $state.go('app.manage-barber');
        }

        function addFailure($message) {
            ToasterService.error(null, $message);
        }
    });