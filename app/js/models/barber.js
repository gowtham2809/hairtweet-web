angular.module('app')
    .service('BarberModel', function ($localStorage, $injector, BASE_URL, BARBER_URL, UserModel) {
        var model = this;
        var urls = {
            get_all_barbers: BASE_URL + '/barber/get-all-barber',
            add_barber: BASE_URL + '/admin/add-barber',
            delete_barber: BASE_URL + '/admin/{id}/delete-barber'
        };
        model.addBarber = function (requestParams, successCallback, failureCallback) {
            var fd = new FormData();
            //post data via formdata ,append all data in fd
            fd.append('logo', requestParams.logo);
            fd.append('first_name', requestParams.firstName);
            fd.append('last_name', requestParams.lastName);
            fd.append('email', requestParams.email);
            fd.append('password', requestParams.password);
            fd.append('phone_number', requestParams.phoneNumber);
            fd.append('shop_name', requestParams.shopName);
            fd.append('address_line_1', requestParams.address1);
            fd.append('address_line_2', requestParams.address2);
            fd.append('address_line_3', requestParams.address3);
            fd.append('latitude',requestParams.latitude);
            fd.append('longitude',requestParams.longitude);
            $http = $injector.get('$http');
            $http.post(urls.add_barber, fd, {
                //add headers to upload
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}
            }).success(function (response) {
                successCallback(response);
            }).error(function (data) {
                failureCallback(data.error.message)
            })
        };

        model.getAllBarbers = function (requestParams, successCallback, failureCallback) {
            $http = $injector.get('$http');
            $http.get(urls.get_all_barbers, {
                params: {
                    page: requestParams.page
                }
            }).success(function (response) {
                successCallback(response.data);
            }).error(function (data) {
                failureCallback(data.error.message)
            });
        };
        model.getReviewsForBarber = function (requestParams, successCallback, failureCallback) {
            $http = $injector.get('$http');
            if (UserModel.getUserType() == 'barber') {
                var barber_review = BARBER_URL + '/barber/{id}/reviews';
            }else{
                var barber_review = BASE_URL + '/barber/{id}/reviews'
            }
            var url = barber_review.replace('{id}', requestParams.barberId);
            $http.get(url).success(function (response) {
                successCallback(response);
            }).error(function (data) {
                failureCallback(data.error.message)
            });
        };

        model.loadBarberDetails = function (barberId, successCallback, failureCallback) {
            if (UserModel.getUserType() == 'barber') {
                var get_barber = BARBER_URL + '/barber/{barberId}/detail';
            }else{
                var get_barber = BASE_URL + '/barber/{barberId}/detail';
            }
                $http = $injector.get('$http');
            var url = get_barber.replace('{barberId}', barberId);
            $http.get(url).success(function (response) {
                successCallback(response);
            }).error(function (data) {
                failureCallback(data.error.message)
            });
        };
        model.deleteBarber = function (requestParams, successCallback, failureCallback) {
            $http = $injector.get('$http');
            var url = urls.delete_barber.replace('{id}', requestParams.id);
            $http.post(url, {}).success(function (response) {
                successCallback(response);
            }).error(function (data) {
                failureCallback(data.error.message)
            });
        };

        model.getBookings = function (barberId, successCallback, failureCallback) {
            $http = $injector.get('$http');
            if (UserModel.getUserType() == 'barber') {
                var get_bookings = BARBER_URL + '/barber/{barberId}/bookings';
            }else{
                var get_bookings = BASE_URL + '/barber/{barberId}/bookings';
            }
            var url = get_bookings.replace('{barberId}', barberId);
            $http.get(url).success(function (response) {
                successCallback(response);
            }).error(function (data) {
                failureCallback(data.error.message)
            });
        };


        model.getBarberAddress = function (barber) {
            if (_.isUndefined(barber)) {
                return "";
            }
            var address = _.join(_.compact([barber.address_line_1, barber.address_line_2,
                barber.address_line_3]), ', ');
            return address == "" ? null : address;
        };

        model.updateBarber = function (requestParams, successCallback, failureCallback) {
            var fd = new FormData();
            fd.append('id', requestParams.id);
            fd.append('logo', requestParams.logo);
            fd.append('condition', requestParams.condition);
            fd.append('first_name', requestParams.first_name);
            fd.append('last_name', requestParams.last_name);
            fd.append('email', requestParams.email);
            fd.append('phone_number', requestParams.phone_number);
            fd.append('shop_name', requestParams.shop_name);
            fd.append('address_line_1', requestParams.address_line_1);
            fd.append('address_line_2', requestParams.address_line_2);
            fd.append('address_line_3', requestParams.address_line_3);
            fd.append('latitude', requestParams.latitude);
            fd.append('longitude', requestParams.longitude);
            if (UserModel.getUserType() == 'barber') {
                var update_barber = BARBER_URL + '/admin/{barberId}/update-barber';
            }else {
                var update_barber = BASE_URL + '/admin/{barberId}/update-barber';
            }
            var url = update_barber.replace('{barberId}', requestParams.id);
            return $http.post(url, fd, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}
            }).success(function (response) {
                successCallback(response);
            }).error(function (data, status) {
                failureCallback(data.error.message)
            });
        };
    });
