angular.module('app')
    .controller('DashboardController', function ($rootScope, $scope, BookingModel, UserModel) {
        $scope.userType = UserModel.getUserType();
        $scope.getDashboardBookings = function () {
            if ($scope.userType == "barber")
                return;
            BookingModel.getDashboardBookings(
                getBookingSuccess, getBookingFailure);
        };
        function getBookingSuccess(response) {
            $scope.bookings = response.data.bookings;
            $rootScope.$broadcast('hideLoading');
        }

        function getBookingFailure() {
            $rootScope.$broadcast('hideLoading');
            $scope.bookings = [];
        }

        $scope.getBarberDashboardBookings = function () {
            if ($scope.userType == "admin")
                return;
            BookingModel.getBarberDashboardBookings(
                getBarberBookingSuccess, getBarberBookingFailure);
        };
        function getBarberBookingSuccess(response) {
            $scope.bookings = response.data.bookings;
            $rootScope.$broadcast('hideLoading');
        }

        function getBarberBookingFailure() {
            $rootScope.$broadcast('hideLoading');
            $scope.bookings = [];
        }

        $scope.getChartInfo = function () {
            if ($scope.userType == "barber")
                return;
            BookingModel.getChartInfo(
                getInfoSuccess, getInfoFailure);
        };
        function getInfoSuccess(response) {
            $scope.chartInfo = response.data.data;
            $rootScope.$broadcast('hideLoading');
        }

        function getInfoFailure() {
            $rootScope.$broadcast('hideLoading');
            $scope.chartInfo = [];
        }

        $scope.getBarberChartInfo = function () {
            if ($scope.userType == "admin")
                return;
            BookingModel.getBarberChartInfo(
                getBarberInfoSuccess, getBarberInfoFailure);
        };
        function getBarberInfoSuccess(response) {
            $scope.chartInfo = response.data.data;
            $rootScope.$broadcast('hideLoading');
        }

        function getBarberInfoFailure() {
            $rootScope.$broadcast('hideLoading');
            $scope.chartInfo = [];
        }

    });