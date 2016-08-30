'use strict';

app.controller('MapCtrl', ['$scope', function ($scope) {

    $scope.myMarker = null;
    if(_.isUndefined($scope.location)){
        var myCenter = new google.maps.LatLng(11.1271, 78.6569);
    }else{
        if($scope.location.latitude != 0 && $scope.location.longitude != 0 ) {
            var myCenter = new google.maps.LatLng($scope.location.latitude, $scope.location.longitude);
        }else {
            var myCenter = new google.maps.LatLng(11.1271, 78.6569);
        }
    }

    $scope.$watch('myMap', function () {
        if (_.isUndefined($scope.myMap)) {
            return;
        }
        // my map is initialised
        if($scope.location.latitude != 0 && $scope.location.longitude != 0 ){
            var latLng = new google.maps.LatLng($scope.location.latitude, $scope.location.longitude);
            $scope.myMarker = new google.maps.Marker({
                map: $scope.myMap,
                position: latLng
            });
        }
    });

    $scope.mapOptions = {
        center: myCenter,
        zoom: 7,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    $scope.addMarker = function ($event, $params) {
        // removing the marker from map
        if ($scope.myMarker != null) {
            $scope.myMarker.setMap(null);
        }
        $scope.location.latitude = $params[0].latLng.lat();
        $scope.location.longitude = $params[0].latLng.lng();
        $scope.myMarker = new google.maps.Marker({
            map: $scope.myMap,
            position: $params[0].latLng,
        });
    };
}])
;