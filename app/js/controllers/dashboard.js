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
            $scope.createdBookings = response.data.createdBookings;
            $scope.bookings = response.data.bookings;
            $rootScope.$broadcast('hideLoading');
        }

        function getBookingFailure() {
            $rootScope.$broadcast('hideLoading');
            $scope.createdBookings = [];
            $scope.bookings = [];
        }

        $scope.getDashboardBookingDetail = function () {
            if ($scope.userType == "barber")
                return;
            BookingModel.getDashboardBookingDetail(
                getBookingDetailSuccess, getBookingDetailFailure);
        };
        function getBookingDetailSuccess(response) {
            $scope.todaySales = response.data.todaySales;
            $scope.todayBookings = response.data.todayBookings;
            $rootScope.$broadcast('hideLoading');
        }

        function getBookingDetailFailure() {
            $rootScope.$broadcast('hideLoading');
            $scope.todaySales = [];
            $scope.todayBookings = [];
        }

        $scope.getBarberDashboardBookings = function () {
            if ($scope.userType == "admin")
                return;
            BookingModel.getBarberDashboardBookings(
                getBarberBookingSuccess, getBarberBookingFailure);
        };
        function getBarberBookingSuccess(response) {
            $scope.createdBookings = response.data.createdBookings;
            $scope.bookings = response.data.bookings;
            $rootScope.$broadcast('hideLoading');
        }

        function getBarberBookingFailure() {
            $rootScope.$broadcast('hideLoading');
            $scope.bookings = [];
        }
        $scope.getBarberDashboardBookingDetail = function () {
            if ($scope.userType == "admin")
                return;
            BookingModel.getBarberDashboardBookingDetail(
                getBarberBookingDetailSuccess, getBarberBookingDetailFailure);
        };
        function getBarberBookingDetailSuccess(response) {
            $scope.todaySales = response.data.todaySales;
            $scope.todayBookings = response.data.todayBookings;
            $rootScope.$broadcast('hideLoading');
        }

        function getBarberBookingDetailFailure() {
            $rootScope.$broadcast('hideLoading');
            $scope.todaySales = [];
            $scope.todayBookings = [];
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