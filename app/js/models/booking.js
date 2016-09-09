angular.module('app')
    .service('BookingModel', function ($injector, BASE_URL, BARBER_URL, UserModel) {
        var model = this;
        if (UserModel.getUserType() == 'barber') {
            var get_bookings = BARBER_URL + '/barber/{barberId}/bookings';
            var approve_booking = BARBER_URL + '/booking/{bookingId}/approve';
            var propose_booking = BARBER_URL + '/booking/{bookingId}/propose';
            var cancel_booking = BARBER_URL + '/booking/{id}/cancel';
            var get_slots = BARBER_URL + '/barber/{id}/slots';

        } else {
            var get_bookings = BASE_URL + '/barber/{barberId}/bookings';
            var approve_booking = BASE_URL + '/booking/{bookingId}/approve';
            var propose_booking = BASE_URL + '/booking/{bookingId}/propose';
            var cancel_booking = BASE_URL + '/booking/{id}/cancel';
            var get_slots = BASE_URL + '/barber/{id}/slots';


        }
        var urls = {
            get_bookings: get_bookings,
            approve_booking: approve_booking,
            propose_booking: propose_booking,
            cancel_booking: cancel_booking,
            get_slots: get_slots,
            get_customer_bookings: BASE_URL + '/user/{userId}/bookings',
            getDashboardBooking: BASE_URL + '/latest/bookings',
            getChartInformation: BASE_URL + '/chart/info',
            getBarberDashboardBooking: BARBER_URL + '/barber/latest/bookings',
            getBarberChartInformation: BARBER_URL + '/barber/chart/info'

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
        model.getBarberDashboardBookings = function (successCallback, failureCallback) {
            $http = $injector.get('$http');
            $http.get(urls.getBarberDashboardBooking).success(function (response) {
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
        model.getBarberChartInfo = function (successCallback, failureCallback) {
            $http = $injector.get('$http');
            $http.get(urls.getBarberChartInformation).success(function (response) {
                successCallback(response);
            }).error(function (data) {
                failureCallback(data.error.message)
            });
        };
    });