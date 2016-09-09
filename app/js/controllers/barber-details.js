angular.module('app')
    .controller('BarberController', function ($rootScope, $scope, $state, $stateParams, UserModel, BarberModel, ServiceModel, ToasterService, $modal, $log) {
        $scope.inEditMode = false;
        $scope.coverColor = "#78686F";
        $scope.userType = UserModel.getUserType();

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

        $scope.removeBarber = function (size) {
            var modalInstance = $modal.open({
                templateUrl: 'removeBarberModal.html',
                controller: 'RemoveBarberController',
                size: size
            });

            modalInstance.result.then(function (selectedItem) {
                $scope.selected = selectedItem;
            }, function () {
                $state.go('app.manage-barber');
            });
        };

        $scope.setEditMode = function (state) {
            if (state == true)
            // deep copy
                $scope.barberCopy = angular.copy($scope.barber);
            $scope.barberCopy.is_active = $scope.barberCopy.is_active == 1;
            $scope.inEditMode = state;
        };

        $scope.getBarberAddress = function (barber) {
            return BarberModel.getBarberAddress(barber);
        };
        $scope.updateBarber = function () {
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
                logo: $scope.myFile,
                condition: $scope.barberCopy.is_active
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


        $scope.isBarberActive = function (barber) {
            if (_.isUndefined(barber))return;
            return BarberModel.isBarberActive(barber);
        };

        $scope.getReviewsForBarber = function () {
            BarberModel.getReviewsForBarber({
                barberId: $stateParams.barberId
            }, getReviewSuccess, getReviewFailure);
            $rootScope.$broadcast('showLoading');
        };
        function getReviewSuccess(response) {
            $scope.reviews = response.data.reviews;
            $rootScope.$broadcast('hideLoading');
        }

        function getReviewFailure($message) {
            $rootScope.$broadcast('hideLoading');
            $scope.reviews = [];
        }

    });
angular.module('app')
    .directive('reviewRating', function () {
        return {
            restrict: 'EA',
            template: '<ul class="star-rating" ng-class="{readonly: readonly}">' +
            '  <li ng-repeat="star in stars" class="star" ng-class="{filled: star.filled}" ng-click="toggle($index)">' +
            '    <i class="fa fa-star"></i>' + // or &#9733
            '  </li>' +
            '</ul>',
            scope: {
                ratingValue: '=ngModel',
                max: '=?', // optional (default is 5)
                onRatingSelect: '&?',
                readonly: '=?'
            },
            link: function (scope, element, attributes) {
                if (scope.max == undefined) {
                    scope.max = 5;
                }
                function updateStars() {
                    scope.stars = [];
                    for (var i = 0; i < scope.max; i++) {
                        scope.stars.push({
                            filled: i < scope.ratingValue
                        });
                    }
                };
                scope.toggle = function (index) {
                    if (scope.readonly == undefined || scope.readonly === false) {
                        scope.ratingValue = index + 1;
                        scope.onRatingSelect({
                            rating: index + 1
                        });
                    }
                };
                scope.$watch('ratingValue', function (oldValue, newValue) {
                    if (newValue) {
                        updateStars();
                    }
                });
            }
        };
    });
angular.module('app')
    .controller('RemoveBarberController', function ($rootScope, $scope, $stateParams, $modalInstance, BarberModel, ToasterService, $modal, $log) {
        $scope.close = function () {
            $modalInstance.dismiss('cancel');
        };
        $scope.deleteBarber = function () {
            BarberModel.deleteBarber({
                id: $stateParams.barberId
            }, deleteBarberSuccess, deleteBarberFailure);
            $rootScope.$broadcast('showLoading');
        };
        function deleteBarberSuccess(deleteResponse) {
            ToasterService.success(null, "Deleted successful!");
            $rootScope.$broadcast('hideLoading');
            $scope.close();
        }

        function deleteBarberFailure($message) {
            ToasterService.error(null, $message);
            $rootScope.$broadcast('hideLoading');
        }
    });
