angular.module('app')
    .controller('ServiceUpdateController', function ($stateParams, $scope, $modalInstance, $log, service, ServiceModel, ToasterService, $rootScope) {
        $scope.service = service;
        $scope.updateService = function () {
            ServiceModel.updateService({
                barberId: $stateParams.barberId,
                id: $scope.service.id,
                service_name: $scope.service.service_name,
                duration: $scope.service.duration_in_minutes,
                cost: $scope.service.cost,
                discount: $scope.service.discount,
                discount_type: $scope.service.discount_type_id
            }, updateServiceSuccess, updateServiceFailure);
            $rootScope.$broadcast('showLoading');
        };
        function updateServiceSuccess(updateResponse) {
            ToasterService.success(null, "Update successful!");
            $rootScope.$broadcast('hideLoading');
            $scope.close();
        }

        function updateServiceFailure($message) {
            ToasterService.error(null, $message);
            $rootScope.$broadcast('hideLoading');
        }

        $scope.close = function () {
            $modalInstance.dismiss('cancel');
        };
    });

angular.module('app')
    .controller('ServiceDeleteController', function ($stateParams, $scope, $modalInstance, $log, id, ServiceModel, ToasterService, $rootScope) {
        $scope.id = id;
        $scope.deleteService = function () {
            ServiceModel.deleteService({
                barberId: $stateParams.barberId,
                id: id
            }, deleteServiceSuccess, deleteServiceFailure);
            $rootScope.$broadcast('showLoading');
        };
        function deleteServiceSuccess(deleteResponse) {
            ToasterService.success(null, "Deleted successful!");
            $rootScope.$broadcast('hideLoading');
            $scope.close();
        }

        function deleteServiceFailure($message) {
            ToasterService.error(null, $message);
            $rootScope.$broadcast('hideLoading');
        }

        $scope.close = function () {
            $modalInstance.dismiss('cancel');
        };
    });

angular.module('app')
    .controller('BookingApproveController', function ($stateParams, $scope, $modalInstance, $log, id, BookingModel, ToasterService, $rootScope) {
        $scope.id = id;
        $scope.approveBooking = function () {
            BookingModel.approveBooking({
                id: id,
                barberId:$stateParams.barberId
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
            $approveBooking.dismiss('cancel');
        };

    });


angular.module('app')
    .controller('BarberController', function ($rootScope, $scope, $stateParams, BarberModel, ServiceModel, ToasterService, $modal, $log) {
        $scope.open = function (size, selectedServicePos) {
            var modalInstance = $modal.open({
                templateUrl: 'updateServiceModal.html',
                controller: 'ServiceUpdateController',
                size: size,
                resolve: {
                    service: function () {
                        return $scope.services[selectedServicePos];
                    }
                }
            });

            modalInstance.result.then(function (selectedItem) {
                $scope.selected = selectedItem;
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };
        $scope.openDeleteService = function (size, id) {
            var modalInstance = $modal.open({
                templateUrl: 'deleteServiceModal.html',
                controller: 'ServiceDeleteController',
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
        $scope.inEditMode = false;
        $scope.coverColor = "#78686F";

        $rootScope.$broadcast('showLoading');
        BarberModel.loadBarberDetails($stateParams.barberId,
            getBarberSuccess, getBarberFailure);

        function getBarberSuccess(response) {
            $scope.barber = response.data.barber;
            $rootScope.$broadcast('hideLoading');
        }

        function getBarberFailure() {
            $rootScope.$broadcast('hideLoading');
            $scope.barber = [];
        }

        BarberModel.getServices($stateParams.barberId,
            getServiceSuccess, getServiceFailure);
        function getServiceSuccess(response) {
            $scope.services = response.data.services;
            $rootScope.$broadcast('hideLoading');
        }

        function getServiceFailure() {
            $rootScope.$broadcast('hideLoading');
            $scope.services = [];
        }

        BarberModel.getBookings($stateParams.barberId,
            getBookingSuccess, getBookingFailure);
        function getBookingSuccess(response) {
            $scope.bookings = response.data.bookings;
            $rootScope.$broadcast('hideLoading');
        }

        function getBookingFailure() {
            $rootScope.$broadcast('hideLoading');
            $scope.bookings = [];
        }

        $scope.setEditMode = function (state) {
            if (state == true)
            // deep copy
                $scope.barberCopy = angular.copy($scope.barber);
            $scope.inEditMode = state;
        };


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
        };

        $scope.getFormattedServiceTime = function (duration) {
            return ServiceModel.getFormattedServiceTime(duration);
        }

        $scope.openApproveBooking = function (size, id) {
            console.log('atatag');
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
    });
