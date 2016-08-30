angular.module('app')
    .controller('ServiceController', function ($rootScope, $scope, $stateParams, BarberModel, ServiceModel, ToasterService, $modal, $log) {

        $scope.loadServices = function () {
            ServiceModel.getServices($stateParams.barberId,
                getServiceSuccess, getServiceFailure);
        };


        function getServiceSuccess(response) {
            $scope.services = response.data.services;
            $rootScope.$broadcast('hideLoading');
        }

        function getServiceFailure() {
            $rootScope.$broadcast('hideLoading');
            $scope.services = [];
        }

        $scope.getFormattedServiceTime = function (duration) {
            return ServiceModel.getFormattedServiceTime(duration);
        };

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
                refreshServices();
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
                refreshServices();
            });
        };

        function refreshServices() {
            $scope.services = [];
            $scope.loadServices();
        }
    });


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
    .controller('AccordionCtrl', function ($stateParams, $scope, ServiceModel, ToasterService, $rootScope, $modal) {
        $scope.oneAtATime = true;
        $scope.loadServiceLocation = function () {
            ServiceModel.getServiceLocations(
                getServiceLocationSuccess, getServiceLocationFailure);
        };

        function getServiceLocationSuccess(response) {
            $scope.serviceLocations = response.data.service_locations;
            $rootScope.$broadcast('hideLoading');
        }

        function getServiceLocationFailure() {
            $rootScope.$broadcast('hideLoading');
            $scope.serviceLocations = [];
        }

        $scope.open = function (size) {
            var modalInstance = $modal.open({
                templateUrl: 'addServiceLocation.html',
                controller: 'ServiceLocationController',
                size: size
            });

            modalInstance.result.then(function (selectedItem) {
                $scope.selected = selectedItem;
            }, function () {
                refreshServiceLocation();
            });
        };
        $scope.editLocation = function (size, location) {
            var modalInstance = $modal.open({
                templateUrl: 'updateServiceLocation.html',
                controller: 'UpdateLocationController',
                size: size,
                resolve: {
                    location: function () {
                        return location;
                    }
                }
            });

            modalInstance.result.then(function (selectedItem) {
                $scope.selected = selectedItem;
            }, function () {
                refreshServiceLocation();
            });
        };
        function refreshServiceLocation() {
            $scope.serviceLocations = [];
            $scope.loadServiceLocation();
        }
    });
angular.module('app')
    .controller('ServiceLocationController', function ($rootScope, $scope, $modalInstance, $stateParams, ServiceModel, ToasterService, $modal, $log) {
        $scope.close = function () {
            $modalInstance.dismiss('cancel');
        };
        $scope.location = {
            latitude: 0,
            longitude: 0
        };
        $scope.addLocation = function () {
            ServiceModel.addLocation({
                city: $scope.location.city,
                latitude: $scope.location.latitude,
                longitude: $scope.location.longitude
            }, addLocationSuccess, addLocationFailure);
            $rootScope.$broadcast('showLoading');
        };
        function addLocationSuccess(Response) {
            ToasterService.success(null, "added successful!");
            $rootScope.$broadcast('hideLoading');
            $scope.close();
        }

        function addLocationFailure($message) {
            ToasterService.error(null, $message);
            $rootScope.$broadcast('hideLoading');
        }
    });
angular.module('app')
    .controller('UpdateLocationController', function ($rootScope, $scope, location, $modalInstance, $stateParams, ServiceModel, ToasterService, $modal, $log) {
        $scope.location = location;
        $scope.close = function () {
            $modalInstance.dismiss('cancel');
        };
        $scope.updateLocations = function () {
            ServiceModel.updateLocations({
                id:$scope.location.id,
                city: $scope.location.city_name,
                latitude: $scope.location.latitude,
                longitude: $scope.location.longitude
            }, updateLocationSuccess, updateLocationFailure);
            $rootScope.$broadcast('showLoading');
        };
        function updateLocationSuccess(Response) {
            ToasterService.success(null, "Update successful!");
            $rootScope.$broadcast('hideLoading');
            $scope.close();
        }

        function updateLocationFailure($message) {
            ToasterService.error(null, $message);
            $rootScope.$broadcast('hideLoading');
        }
    });