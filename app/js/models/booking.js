angular.module('app')
    .service('BookingModel', function ($injector, BASE_URL) {
        var model = this;
        var urls = {
            approve_booking: BASE_URL + '/booking/{bookingId}/approve'
        };

        model.approveBooking = function (requestParams, successCallback, failureCallback) {
            $http = $injector.get('$http');
            var url = urls.approve_booking.replace('{bookingId}', requestParams.id);
            return $http.post(url, {
                id: requestParams.id,
                barber_id:requestParams.barberId
            }).success(function (response) {
                successCallback(response);
            }).error(function (data, status) {
                failureCallback(data.error.message)
            });
        };

    });