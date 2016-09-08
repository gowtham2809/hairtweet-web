angular.module('app')
    .controller('DashboardController', function ($rootScope, $scope, BookingModel, $state, $stateParams, ToasterService, $modal, $log) {
        $scope.getDashboardBookings = function () {
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

        $scope.getChartInfo = function () {
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

    });