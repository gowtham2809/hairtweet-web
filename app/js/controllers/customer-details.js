angular.module('app')
    .controller('CustomerController', function ($rootScope, $scope, $stateParams, CustomerModel, ToasterService, $modal, $log) {

        $rootScope.$broadcast('showLoading');
        CustomerModel.loadCustomerDetails($stateParams.customerId,
            getCustomerSuccess, getCustomerFailure);

        function getCustomerSuccess(response) {
            $scope.customer = response.data.user;
            $rootScope.$broadcast('hideLoading');
        }

        function getCustomerFailure() {
            $rootScope.$broadcast('hideLoading');
            $scope.customer = [];
        }

    });
