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
        $scope.openBookingDetail = function (size, booking) {
            var modalInstance = $modal.open({
                templateUrl: 'bookingDetailModal.html',
                controller: 'BookingDetailController',
                size: size,
                resolve: {
                    booking: function () {
                        return booking;
                    }
                }
            });

            modalInstance.result.then(function () {

            }, function () {
                refreshBookings();
            });
        };

        $scope.openProposeBooking = function (size, id, barberId, date) {
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
                    },
                    date: function () {
                        return date;
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
            if (bookingStatusId == 2 || bookingStatusId == 3 || bookingStatusId == 1)
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
    .controller('BookingProposeController', function ($stateParams, $scope, date, $modalInstance, $log, id, barberId, BookingModel, ToasterService, $rootScope) {
        $scope.date = date;
        $scope.bookingId = id;
        $scope.category = {};
        $scope.proposeBooking = function () {
            BookingModel.proposeBooking({
                id: id,
                barberId: barberId,
                slotId: $scope.category.id
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
        $scope.getSlots = function () {
            BookingModel.getSlots({
                barberId: barberId
            }, getAllSlotsSuccess, getAllSlotsFailure);
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

angular.module('app')
    .controller('BookingDetailController', function ($stateParams, $scope, $modalInstance, booking) {
        $scope.booking = booking;
        $scope.close = function () {
            $modalInstance.dismiss('cancel');
        };

    });
angular.module('app')
    .directive('starRating', function () {
        return {
            restrict: 'EA',
            template: '<ul class="star-rating" ng-class="{readonly: readonly}">' +
            '  <li ng-repeat="star in stars" class="star" ng-class="{filled: star.filled}" ng-click="toggle($index)">' +
            '    <i class="fa fa-star"></i>' + // or &#9733
            '  </li>' +
            '</ul>',
            scope: {
                ratingValue: '=ngModel',
                max: '=?', // optional (default is 5)
                onRatingSelect: '&?',
                readonly: '=?'
            },
            link: function (scope, element, attributes) {
                if (scope.max == undefined) {
                    scope.max = 5;
                }
                function updateStars() {
                    scope.stars = [];
                    for (var i = 0; i < scope.max; i++) {
                        scope.stars.push({
                            filled: i < scope.ratingValue
                        });
                    }
                };
                scope.toggle = function (index) {
                    if (scope.readonly == undefined || scope.readonly === false) {
                        scope.ratingValue = index + 1;
                        scope.onRatingSelect({
                            rating: index + 1
                        });
                    }
                };
                scope.$watch('ratingValue', function (oldValue, newValue) {
                    if (newValue) {
                        updateStars();
                    }
                });
            }
        };
    });
