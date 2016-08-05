angular.module('app')
    .controller('BarberManageController', function ($rootScope, $scope, BarberModel) {
        var controller = this;
        $scope.allBarbers = [];
        $scope.isBusy = false;
        controller.page = 1;
        controller.hasMore = true;

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
            console.log(response);
            var barbers = response.barbers.data;
            for (var i = 0; i < barbers.length; i++) {
                $scope.allBarbers.push(barbers[i]);
            }
            controller.page++;
            if (response.barbers.last_page < controller.page) {
                controller.hasMore = false;
            }
            controller.busy = false;
            $rootScope.$broadcast('hideLoading');        }

        function getAllBarbersFailure() {
            $scope.allBarbers = [];
        }

    })
;

