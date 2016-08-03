angular.module('app')
    .service('BarberModel', function ($injector, BASE_URL) {
        var model = this;
        var urls = {
            get_all_barbers: BASE_URL + '/barber/get-all-barber',
            add_barber: BASE_URL + '/admin/add-barber',
            get_barber: BASE_URL + '/barber/{barberId}/detail'
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
            $http.get(urls.get_all_barbers).success(function (response) {
                console.log(response);
                successCallback(response);
            }).error(function (data) {
                failureCallback(data.error.message)
            });
        };
        model.loadBarberDetails = function (barberId, successCallback, failureCallback) {
            $http = $injector.get('$http');
            var url = urls.get_barber.replace('{barberId}', barberId);
            $http.get(url).success(function (response) {
                console.log(response);
                successCallback(response);
            }).error(function (data) {
                failureCallback(data.error.message)
            });
        };
        model.getBarberAddress = function (barber) {
            var address = _.join(_.compact([barber.address_line_1, barber.address_line_2,
                barber.address_line_3]), ', ');
            return address == "" ? null : address;
        };
    });
