angular.module('app')
    .controller('BarberManageController', function ($rootScope, $scope, BarberModel) {
        var controller = this;
        $scope.allBarbers = [];
        controller.busy = false;
        controller.page = 1;
        controller.hasMore = true;
        var tempArray = [];

        $scope.nextPage = function () {
            if (controller.busy || !controller.hasMore)
                return;
            controller.busy = true;
            $rootScope.$broadcast('showLoading');
            BarberModel.getAllBarbers({
                page: controller.page
            }, getAllBarbersSuccess, getAllBarbersFailure);
        };

        function getAllBarbersSuccess(response) {
            var barbers = response.barbers.data;
            for (var i = 0; i < barbers.length; i++) {
                tempArray.push(barbers[i]);
                if (tempArray.length >= 2) {
                    $scope.allBarbers.push(tempArray);
                    tempArray = [];
                }
            }
            controller.page++;
            if (response.barbers.last_page < controller.page) {
                controller.hasMore = false;
                // push the remaining array
                $scope.allBarbers.push(tempArray);
                tempArray = [];
            }
            controller.busy = false;
            $rootScope.$broadcast('hideLoading');
        }

        function getAllBarbersFailure() {
            $scope.allBarbers = [];
        }
    })
;

