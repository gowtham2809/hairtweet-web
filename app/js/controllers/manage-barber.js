angular.module('app')
            .controller('BarberManageController', function ($rootScope, $scope, BarberModel) {
                $scope.allBarbers = [];

                    $rootScope.$broadcast('showLoading');
                    BarberModel.getAllBarbers({
                    }, getAllBarbersSuccess, getAllBarbersFailure);


                function getAllBarbersSuccess(response) {
                    var barbers = response.data.barbers;
                    for (var i = 0; i < barbers.length; i++) {
                        $scope.allBarbers.push(barbers[i]);
                    }

                    $rootScope.$broadcast('hideLoading');
                }

                function getAllBarbersFailure() {
                    $scope.allBarbers = [];
                }

            })
        ;

