angular.module('app')
    .controller('ServiceController', function ($rootScope, $scope, $stateParams, BarberModel, ServiceModel, ToasterService, $modal, $log) {
        ServiceModel.getServices($stateParams.barberId,
            getServiceSuccess, getServiceFailure);
        function getServiceSuccess(response) {
            $scope.services = response.data.services;
            $rootScope.$broadcast('hideLoading');
        }

        function getServiceFailure() {
            $rootScope.$broadcast('hideLoading');
            $scope.services = [];
        }
    });