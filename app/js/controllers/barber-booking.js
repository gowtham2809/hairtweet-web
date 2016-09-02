angular.module('app')
    .controller('BookingController', function ($rootScope, $scope, $state, $stateParams, BookingModel, ToasterService, $modal, $log) {
        $scope.openApproveBooking = function (size, id, barberId) {
            var modalInstance = $modal.open({
                templateUrl: 'approveBookingModal.html',
                controller: 'BookingApproveController',
                size: size,
                resolve: {
                    id: function () {
                        return id;
                    },
                    barberId: function () {
                        return barberId;
                    }
                }
            });

            modalInstance.result.then(function () {

            }, function () {
                refreshBookings();
            });
        };

        $scope.openProposeBooking = function (size, id, barberId) {
            var modalInstance = $modal.open({
                templateUrl: 'proposeBookingModal.html',
                controller: 'BookingProposeController',
                size: size,
                resolve: {
                    id: function () {
                        return id;
                    },
                    barberId: function () {
                        return barberId;
                    }
                }
            });

            modalInstance.result.then(function (selectedItem) {
                $scope.selected = selectedItem;
            }, function () {
                refreshBookings();
            });
        };
        $scope.openCancelBooking = function (size, id, barberId) {
            var modalInstance = $modal.open({
                templateUrl: 'cancelBookingModal.html',
                controller: 'BookingCancelController',
                size: size,
                resolve: {
                    id: function () {
                        return id;
                    },
                    barberId: function () {
                        return barberId;
                    }
                }
            });

            modalInstance.result.then(function (selectedItem) {
                $scope.selected = selectedItem;
            }, function () {
                refreshBookings();
            });
        };

        $scope.getBookings = function () {
            BookingModel.getBookings($stateParams.barberId,
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

        $scope.getCustomerBookings = function () {
            BookingModel.getCustomerBookings($stateParams.customerId,
                getCustomerBookingSuccess, getCustomerBookingFailure);
        };

        function getCustomerBookingSuccess(response) {
            $scope.bookings = response.data.bookings;
            $rootScope.$broadcast('hideLoading');
        }

        function getCustomerBookingFailure() {
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

        function refreshBookings() {
            $scope.bookings = [];
            if ($state.current.name == 'app.barber-detail.bookings') {
                $scope.getBookings();
            }
            if ($state.current.name == 'app.customer-detail.bookings') {
                $scope.getCustomerBookings();
            }
        }
    });


angular.module('app')
    .controller('BookingApproveController', function ($stateParams, $scope, $modalInstance, $log, id, barberId, BookingModel, ToasterService, $rootScope) {
        $scope.id = id;
        $scope.approveBooking = function () {
            BookingModel.approveBooking({
                id: id,
                barberId: barberId
            }, approveBookingSuccess, approveBookingFailure);
            $rootScope.$broadcast('showLoading');
        };
        function approveBookingSuccess(approveResponse) {
            ToasterService.success(null, "Successfully approved!");
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
    .controller('BookingProposeController', function ($stateParams, $scope, $modalInstance, $log, id, barberId, BookingModel, ToasterService, $rootScope) {
        $scope.bookingId = id;
        $scope.category = {};
        $scope.proposeBooking = function () {
            BookingModel.proposeBooking({
                id: id,
                barberId: barberId,
                slotId:$scope.category.id
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
        $scope.getSlots =function () {
            BookingModel.getSlots({
                barberId: barberId
            },getAllSlotsSuccess, getAllSlotsFailure);
        };
        function getAllSlotsSuccess(response) {
            $scope.slots = response.slots;
            $rootScope.$broadcast('hideLoading');
        }

        function getAllSlotsFailure() {
            $rootScope.$broadcast('hideLoading');
            $scope.slots = [];
        }

    });

angular.module('app')
    .controller('BookingCancelController', function ($stateParams, $scope, $modalInstance, $log, id, barberId, BookingModel, ToasterService, $rootScope) {
        $scope.cancelBooking = function () {
            BookingModel.cancelBooking({
                id: id,
                barberId: barberId
            }, cancelBookingSuccess, cancelBookingFailure);
            $rootScope.$broadcast('showLoading');
        };
        function cancelBookingSuccess(Response) {
            ToasterService.success(null, "Cancelled Successfully!");
            $rootScope.$broadcast('hideLoading');
            $scope.close();
        }

        function cancelBookingFailure($message) {
            ToasterService.error(null, $message);
            $rootScope.$broadcast('hideLoading');
        }

        $scope.close = function () {
            $modalInstance.dismiss('cancel');
        };

    });