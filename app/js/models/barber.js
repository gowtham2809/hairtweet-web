angular.module('app')
    .service('BarberModel', function ($injector, BASE_URL) {
        var model = this;
        var urls = {
            get_all_barbers: BASE_URL + '/barber/get-all-barber'
        };

        model.getAllBarbers = function (requestParams, successCallback, failureCallback) {
            $http = $injector.get('$http');
            $http.get(urls.get_all_barbers).success(function (response) {
                console.log(response);
                successCallback(response);
            }).error(function (data) {
                failureCallback(data.error.message)
            });
        };
    })
;