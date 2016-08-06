angular.module('app')
    .controller('ServiceUpdateController', function ($stateParams, $scope, $modalInstance, $log, service, ServiceModel,ToasterService,$rootScope) {
        $scope.service = service;
        $scope.updateService = function () {
            console.log($scope.service.singleSelect);
            ServiceModel.updateService({
                barberId: $stateParams.barberId,
                id: $scope.service.id,
                service_name: $scope.service.service_name,
                duration: $scope.service.duration,
                cost: $scope.service.cost,
                discount: $scope.service.discount,
                discount_type: $scope.service.singleSelect
            }, updateServiceSuccess, updateServiceFailure);
            $rootScope.$broadcast('showLoading');
        };
        function updateServiceSuccess(updateResponse) {
            ToasterService.success(null, "Update successful!");
            $rootScope.$broadcast('hideLoading');
        }

        function updateServiceFailure($message) {
            ToasterService.error(null, $message);
            $rootScope.$broadcast('hideLoading');
        }
    });

angular.module('app')
    .controller('BarberController', function ($rootScope, $scope, $stateParams, BarberModel, ToasterService, $modal, $log) {
        $scope.open = function (size, selectedServicePos) {
            var modalInstance = $modal.open({
                templateUrl: 'updateServiceModel.html',
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
                templateUrl: 'deleteServiceModel.html',
                controller: 'ServiceUpdateController',
                size: size,
                resolve: {
                    id: function () {
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
    });
