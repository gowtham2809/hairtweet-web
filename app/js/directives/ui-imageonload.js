angular.module('app')
    .directive('imageonload', function () {
        return {
            restrict: 'A',
            link: function ($scope, element, attrs) {
                element.bind('load', function () {
                    $scope.$broadcast('imageLoaded');
                });
                element.bind('error', function () {
                    $scope.$broadcast('imageLoadingFailed');
                });
            }
        };
    })
;