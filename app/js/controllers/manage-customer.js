angular.module('app')
    .controller('CustomerManageController', function ($rootScope, $scope, CustomerModel) {
        var controller = this;
        $scope.allCustomers = [];
        controller.busy = false;
        controller.page = 1;
        controller.hasMore = true;
        var tempArray = [];

        $scope.nextPage = function () {
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
                tempArray.push(customers[i]);
                if (tempArray.length >= 3) {
                    $scope.allCustomers.push(tempArray);
                    tempArray = [];
                }
            }
            controller.page++;
            if (response.users.last_page < controller.page) {
                controller.hasMore = false;
                $scope.allCustomers.push(tempArray);
            }
            controller.busy = false;
            $rootScope.$broadcast('hideLoading');
        }

        function getAllCustomerFailure() {
            $scope.allCustomers = [];
        }

    })
;

