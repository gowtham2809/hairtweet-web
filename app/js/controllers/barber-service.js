angular.module('app')
    .controller('ServiceController', function ($rootScope, $scope, $stateParams, BarberModel, ServiceModel, ToasterService, $modal, $log) {
        $scope.oneAtATime = true;
        $scope.loadServices = function () {
            ServiceModel.getServices($stateParams.barberId,
                getServiceSuccess, getServiceFailure);
        };


        function getServiceSuccess(response) {
            $scope.categories = response.data.categories;
            $rootScope.$broadcast('hideLoading');
        }

        function getServiceFailure() {
            $rootScope.$broadcast('hideLoading');
            $scope.categories = [];
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

        $scope.addCategory = function (size) {
            var modalInstance = $modal.open({
                templateUrl: 'addCategoryModal.html',
                controller: 'AddCategoryController',
                size: size
            });
            modalInstance.result.then(function (selectedItem) {
                $scope.selected = selectedItem;
            }, function () {
                refreshCategory();
            });
        };

        $scope.updateCategory = function (size, category) {
            var modalInstance = $modal.open({
                templateUrl: 'updateCategoryModal.html',
                controller: 'UpdateCategoryController',
                size: size,
                resolve: {
                    category: function () {
                        return category;
                    }
                }
            });
            modalInstance.result.then(function (selectedItem) {
                $scope.selected = selectedItem;
            }, function () {
                refreshCategory();
            });
        };

        $scope.deleteCategory = function (size, id) {
            var modalInstance = $modal.open({
                templateUrl: 'deleteCategoryModal.html',
                controller: 'DeleteCategoryController',
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
                refreshCategory();
            });
        };

        $scope.addService = function (size, id) {
            var modalInstance = $modal.open({
                templateUrl: 'addServiceModal.html',
                controller: 'AddServiceController',
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
                refreshCategory();
            });
        };

        $scope.serviceUpdate = function (size, service, id) {
            var modalInstance = $modal.open({
                templateUrl: 'updateService.html',
                controller: 'ServiceUpdateController',
                size: size,
                resolve: {
                    service: function () {
                        return service;
                    },
                    id: function () {
                        return id;
                    }
                }
            });
            modalInstance.result.then(function (selectedItem) {
                $scope.selected = selectedItem;
            }, function () {
                refreshCategory();
            });
        };


        function refreshCategory() {
            $scope.categories = [];
            $scope.loadServices();
        }

        function refreshServices() {
            $scope.services = [];
            $scope.loadServices();
        }
    });


angular.module('app')
    .controller('ServiceUpdateController', function ($stateParams, id, $scope, $modalInstance, $log, service, ServiceModel, ToasterService, $rootScope) {
        $scope.service = service;
        $scope.updateService = function () {
            ServiceModel.updateService({
                barberId: $stateParams.barberId,
                id: $scope.service.id,
                service_name: $scope.service.service_name,
                duration: $scope.service.duration_in_minutes,
                cost: $scope.service.cost,
                discount: $scope.service.discount,
                discount_type: $scope.service.discount_type_id,
                category_id: id
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
        $scope.deleteLocation = function (size, id) {
            var modalInstance = $modal.open({
                templateUrl: 'deleteServiceLocation.html',
                controller: 'DeleteLocationController',
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
                refreshServiceLocation();
            });
        };
        $scope.addArea = function (size, id) {
            var modalInstance = $modal.open({
                templateUrl: 'addServiceArea.html',
                controller: 'ServiceAreaController',
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
                refreshServiceLocation();
            });
        };
        $scope.updateArea = function (size, area) {
            var modalInstance = $modal.open({
                templateUrl: 'updateServiceArea.html',
                controller: 'UpdateAreaController',
                size: size,
                resolve: {
                    area: function () {
                        return area;
                    }
                }
            });

            modalInstance.result.then(function (selectedItem) {
                $scope.selected = selectedItem;
            }, function () {
                refreshServiceLocation();
            });
        };
        $scope.deleteArea = function (size, id) {
            var modalInstance = $modal.open({
                templateUrl: 'deleteServiceArea.html',
                controller: 'DeleteAreaController',
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
                longitude: $scope.location.longitude,
                range:$scope.location.range
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
                id: $scope.location.id,
                city: $scope.location.city_name,
                latitude: $scope.location.latitude,
                longitude: $scope.location.longitude,
                range:$scope.location.range
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
angular.module('app')
    .controller('DeleteLocationController', function ($rootScope, $scope, id, $modalInstance, $stateParams, ServiceModel, ToasterService, $modal, $log) {
        $scope.locationId = id;
        $scope.close = function () {
            $modalInstance.dismiss('cancel');
        };
        $scope.deleteServiceLocation = function () {
            ServiceModel.deleteServiceLocation({
                id: id
            }, deleteServiceLocationSuccess, deleteServiceLocationFailure);
            $rootScope.$broadcast('showLoading');
        };
        function deleteServiceLocationSuccess(deleteResponse) {
            ToasterService.success(null, "Deleted successful!");
            $rootScope.$broadcast('hideLoading');
            $scope.close();
        }

        function deleteServiceLocationFailure($message) {
            ToasterService.error(null, $message);
            $rootScope.$broadcast('hideLoading');
        }
    });
angular.module('app')
    .controller('ServiceAreaController', function ($rootScope, $scope, id, $modalInstance, $stateParams, ServiceModel, ToasterService, $modal, $log) {
        $scope.close = function () {
            $modalInstance.dismiss('cancel');
        };
        $scope.location = {
            latitude: 0,
            longitude: 0
        };
        $scope.addServiceArea = function () {
            ServiceModel.addServiceArea({
                location_id: id,
                area: $scope.location.area,
                latitude: $scope.location.latitude,
                longitude: $scope.location.longitude
            }, addAreaSuccess, addAreaFailure);
            $rootScope.$broadcast('showLoading');
        };
        function addAreaSuccess(Response) {
            ToasterService.success(null, "added successful!");
            $rootScope.$broadcast('hideLoading');
            $scope.close();
        }

        function addAreaFailure($message) {
            ToasterService.error(null, $message);
            $rootScope.$broadcast('hideLoading');
        }
    });
angular.module('app')
    .controller('UpdateAreaController', function ($rootScope, $scope, area, $modalInstance, $stateParams, ServiceModel, ToasterService, $modal, $log) {
        $scope.location = area;
        $scope.close = function () {
            $modalInstance.dismiss('cancel');
        };
        $scope.updateServiceArea = function () {
            ServiceModel.updateServiceArea({
                id: $scope.location.id,
                area: $scope.location.area,
                latitude: $scope.location.latitude,
                longitude: $scope.location.longitude
            }, updateAreaSuccess, updateAreaFailure);
            $rootScope.$broadcast('showLoading');
        };
        function updateAreaSuccess(Response) {
            ToasterService.success(null, "Update successful!");
            $rootScope.$broadcast('hideLoading');
            $scope.close();
        }

        function updateAreaFailure($message) {
            ToasterService.error(null, $message);
            $rootScope.$broadcast('hideLoading');
        }
    });
angular.module('app')
    .controller('DeleteAreaController', function ($rootScope, $scope, id, $modalInstance, $stateParams, ServiceModel, ToasterService, $modal, $log) {
        $scope.close = function () {
            $modalInstance.dismiss('cancel');
        };
        $scope.deleteServiceArea = function () {
            ServiceModel.deleteServiceArea({
                id: id
            }, deleteServiceAreaSuccess, deleteServiceAreaFailure);
            $rootScope.$broadcast('showLoading');
        };
        function deleteServiceAreaSuccess(deleteResponse) {
            ToasterService.success(null, "Deleted successful!");
            $rootScope.$broadcast('hideLoading');
            $scope.close();
        }

        function deleteServiceAreaFailure($message) {
            ToasterService.error(null, $message);
            $rootScope.$broadcast('hideLoading');
        }
    });
angular.module('app')
    .controller('AddCategoryController', function ($rootScope, $scope, $modalInstance, $stateParams, ServiceModel, ToasterService) {
        $scope.category = {};
        $scope.close = function () {
            $modalInstance.dismiss('cancel');
        };
        $scope.addServiceCategory = function () {
            ServiceModel.addServiceCategory({
                barber_id: $stateParams.barberId,
                category_name: $scope.category.name,
                gender: $scope.category.gender
            }, addCategorySuccess, addCategoryFailure);
            $rootScope.$broadcast('showLoading');
        };
        function addCategorySuccess(Response) {
            ToasterService.success(null, "added successful!");
            $rootScope.$broadcast('hideLoading');
            $scope.close();
        }

        function addCategoryFailure($message) {
            ToasterService.error(null, $message);
            $rootScope.$broadcast('hideLoading');
        }
    });
angular.module('app')
    .controller('UpdateCategoryController', function ($rootScope, $scope, category, $modalInstance, $stateParams, ServiceModel, ToasterService) {
        $scope.category = category;
        $scope.close = function () {
            $modalInstance.dismiss('cancel');
        };
        $scope.updateServiceCategory = function () {
            ServiceModel.updateServiceCategory({
                category_id: category.id,
                barber_id: $stateParams.barberId,
                category_name: $scope.category.category_name,
                gender: $scope.category.gender
            }, updateCategorySuccess, updateCategoryFailure);
            $rootScope.$broadcast('showLoading');
        };
        function updateCategorySuccess(Response) {
            ToasterService.success(null, "Update successful!");
            $rootScope.$broadcast('hideLoading');
            $scope.close();
        }

        function updateCategoryFailure($message) {
            ToasterService.error(null, $message);
            $rootScope.$broadcast('hideLoading');
        }
    });
angular.module('app')
    .controller('DeleteCategoryController', function ($rootScope, $scope, id, $modalInstance, $stateParams, ServiceModel, ToasterService, $modal, $log) {
        $scope.close = function () {
            $modalInstance.dismiss('cancel');
        };
        $scope.deleteServiceCategory = function () {
            ServiceModel.deleteServiceCategory({
                id: id,
                barber_id: $stateParams.barberId
            }, deleteServiceCategorySuccess, deleteServiceCategoryFailure);
            $rootScope.$broadcast('showLoading');
        };
        function deleteServiceCategorySuccess(deleteResponse) {
            ToasterService.success(null, "Deleted successful!");
            $rootScope.$broadcast('hideLoading');
            $scope.close();
        }

        function deleteServiceCategoryFailure($message) {
            ToasterService.error(null, $message);
            $rootScope.$broadcast('hideLoading');
        }
    });
angular.module('app')
    .controller('AddServiceController', function ($rootScope, $scope, id, $modalInstance, $stateParams, ServiceModel, ToasterService) {
        $scope.service = {};
        $scope.close = function () {
            $modalInstance.dismiss('cancel');
        };
        $scope.addBarberService = function () {
            ServiceModel.addBarberService({
                barber_id: $stateParams.barberId,
                service_name: $scope.service.name,
                duration_in_minutes: $scope.service.duration,
                cost: $scope.service.cost,
                discount: $scope.service.discount,
                discount_type_id: $scope.service.discount_type,
                category_id: id
            }, addServiceSuccess, addServiceFailure);
            $rootScope.$broadcast('showLoading');
        };
        function addServiceSuccess(Response) {
            ToasterService.success(null, "added successful!");
            $rootScope.$broadcast('hideLoading');
            $scope.close();
        }

        function addServiceFailure($message) {
            ToasterService.error(null, $message);
            $rootScope.$broadcast('hideLoading');
        }
    });