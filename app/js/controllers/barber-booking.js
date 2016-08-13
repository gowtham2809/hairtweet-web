angular.module('app')
    .controller('BookingController', function ($rootScope, $scope, $stateParams, BookingModel, ServiceModel, ToasterService, $modal, $log) {

        $scope.openApproveBooking = function (size, id) {
            var modalInstance = $modal.open({
                templateUrl: 'approveBookingModal.html',
                controller: 'BookingApproveController',
                size: size,
                resolve: {
                    id: function () {
                        return id;
                    }
                }
            });

            modalInstance.result.then(function (selectedItem) {
                $scope.selected = selectedItem;
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };

        $scope.openProposeBooking = function (size, id) {
            var modalInstance = $modal.open({
                templateUrl: 'proposeBookingModal.html',
                controller: 'BookingProposeController',
                size: size,
                resolve: {
                    id: function () {
                        return id;
                    }
                }
            });

            modalInstance.result.then(function (selectedItem) {
                $scope.selected = selectedItem;
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };

        BookingModel.getBookings($stateParams.barberId,
            getBookingSuccess, getBookingFailure);
        function getBookingSuccess(response) {
            $scope.bookings = response.data.bookings;
            $rootScope.$broadcast('hideLoading');
        }

        function getBookingFailure() {
            $rootScope.$broadcast('hideLoading');
            $scope.bookings = [];
        }

        $scope.showApproveButton = function (bookingStatusId) {
            if (bookingStatusId == 1)
                return true;
            else
                return false;
        };

        $scope.showProposeButton = function (bookingStatusId) {
            if (bookingStatusId == 1)
                return true;
            else
                return false;
        };

        $scope.showCancelButton = function (bookingStatusId) {
            if (bookingStatusId == 2 || bookingStatusId == 3)
                return true;
            else
                return false;
        };
    });


angular.module('app')
    .controller('BookingApproveController', function ($stateParams, $scope, $modalInstance, $log, id, BookingModel, ToasterService, $rootScope) {
        $scope.id = id;
        $scope.approveBooking = function () {
            BookingModel.approveBooking({
                id: id,
                barberId: $stateParams.barberId
            }, approveBookingSuccess, approveBookingFailure);
            $rootScope.$broadcast('showLoading');
        };
        function approveBookingSuccess(approveResponse) {
            ToasterService.success(null, "Approved successful!");
            $rootScope.$broadcast('hideLoading');
            $scope.close();
        }

        function approveBookingFailure($message) {
            ToasterService.error(null, $message);
            $rootScope.$broadcast('hideLoading');
        }

        $scope.close = function () {
            $modalInstance.dismiss('cancel');
        };

    });

angular.module('app')
    .controller('BookingProposeController', function ($stateParams, $scope, $modalInstance, $log, id, BookingModel, ToasterService, $rootScope) {
        $scope.id = id;
        $scope.proposeBooking = function () {
            BookingModel.proposeBooking({
                id: id,
                barberId: $stateParams.barberId
            }, proposeBookingSuccess, proposeBookingFailure);
            $rootScope.$broadcast('showLoading');
        };
        function proposeBookingSuccess(approveResponse) {
            ToasterService.success(null, "Proposed successful!");
            $rootScope.$broadcast('hideLoading');
            $scope.close();
        }

        function proposeBookingFailure($message) {
            ToasterService.error(null, $message);
            $rootScope.$broadcast('hideLoading');
        }

        $scope.close = function () {
            $modalInstance.dismiss('cancel');
        };

        function getSlots() {
            BookingModel.getSlots(getAllSlotsSuccess, getAllSlotsFailure);
        }
        getSlots();

        function getAllSlotsSuccess(response) {
            $scope.slots = response.slots;
            $rootScope.$broadcast('hideLoading');
        }

        function getAllSlotsFailure() {
            $rootScope.$broadcast('hideLoading');
            $scope.slots = [];
        }

    });