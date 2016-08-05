angular.module('app')
    .controller('CustomerManageController', function ($rootScope, $scope, CustomerModel) {
        var controller = this;
        $scope.allCustomers = [];
        $scope.isBusy = false;
        controller.page = 1;
        controller.hasMore = true;

        $scope.next = function () {
            if (controller.busy || !controller.hasMore)
                return;
            controller.busy = true;
            $rootScope.$broadcast('showLoading');
            CustomerModel.getAllCustomers({
                page: controller.page
            }, getAllCustomerSuccess, getAllCustomerFailure);
        };

        function getAllCustomerSuccess(response) {
            var customers = response.users.data;
            for (var i = 0; i < customers.length; i++) {
                $scope.allCustomers.push(customers[i]);
            }
            controller.page++;
            if (response.users.last_page < controller.page) {
                controller.hasMore = false;
            }
            controller.busy = false;
            $rootScope.$broadcast('hideLoading');
        }

        function getAllCustomerFailure() {
            $scope.allCustomers = [];
        }

    })
;

