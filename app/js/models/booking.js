angular.module('app')
    .service('BookingModel', function ($injector, BASE_URL) {
        var model = this;
        var urls = {
            get_bookings: BASE_URL + '/barber/{barberId}/bookings',
            approve_booking: BASE_URL + '/booking/{bookingId}/approve',
            propose_booking: BASE_URL + '/booking/{bookingId}/propose',
            get_slots: BASE_URL + '/barber/{id}/slots',
            get_customer_bookings: BASE_URL + '/user/{userId}/bookings',
            cancel_booking: BASE_URL + '/booking/{id}/cancel',
            getDashboardBooking: BASE_URL + '/latest/bookings',
            getChartInformation: BASE_URL + '/chart/info'

        };

        model.approveBooking = function (requestParams, successCallback, failureCallback) {
            $http = $injector.get('$http');
            var url = urls.approve_booking.replace('{bookingId}', requestParams.id);
            return $http.post(url, {
                id: requestParams.id,
                barber_id: requestParams.barberId
            }).success(function (response) {
                successCallback(response);
            }).error(function (data, status) {
                failureCallback(data.error.message)
            });
        };

        model.getBookings = function (barberId, successCallback, failureCallback) {
            $http = $injector.get('$http');
            var url = urls.get_bookings.replace('{barberId}', barberId);
            $http.get(url).success(function (response) {
                successCallback(response);
            }).error(function (data) {
                failureCallback(data.error.message)
            });
        };
        model.getCustomerBookings = function (userId, successCallback, failureCallback) {
            $http = $injector.get('$http');
            var url = urls.get_customer_bookings.replace('{userId}', userId);
            $http.get(url).success(function (response) {
                successCallback(response);
            }).error(function (data) {
                failureCallback(data.error.message)
            });
        };

        model.proposeBooking = function (requestParams, successCallback, failureCallback) {
            $http = $injector.get('$http');
            var url = urls.propose_booking.replace('{bookingId}', requestParams.id);
            return $http.post(url, {
                slot_id: requestParams.slotId,
                barber_id: requestParams.barberId
            }).success(function (response) {
                successCallback(response);
            }).error(function (data, status) {
                failureCallback(data.error.message)
            });
        };

        model.cancelBooking = function (requestParams, successCallback, failureCallback) {
            $http = $injector.get('$http');
            var url = urls.cancel_booking.replace('{id}', requestParams.id);
            return $http.post(url, {
                barber_id: requestParams.barberId
            }).success(function (response) {
                successCallback(response);
            }).error(function (data, status) {
                failureCallback(data.error.message)
            });
        };

        model.getSlots = function (requestParams, successCallback, failureCallback) {
            $http = $injector.get('$http');
            var url = urls.get_slots.replace('{id}', requestParams.barberId);
            $http.get(url).success(function (response) {
                successCallback(response.data);
            }).error(function (data) {
                failureCallback(data.error.message)
            });
        };

        model.getDashboardBookings = function (successCallback, failureCallback) {
            $http = $injector.get('$http');
            $http.get(urls.getDashboardBooking).success(function (response) {
                successCallback(response);
            }).error(function (data) {
                failureCallback(data.error.message)
            });
        };
        model.getChartInfo = function (successCallback, failureCallback) {
            $http = $injector.get('$http');
            $http.get(urls.getChartInformation).success(function (response) {
                successCallback(response);
            }).error(function (data) {
                failureCallback(data.error.message)
            });
        };

    });