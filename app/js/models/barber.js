angular.module('app')
    .service('BarberModel', function ($injector, BASE_URL) {
        var model = this;
        var urls = {
            get_all_barbers: BASE_URL + '/barber/get-all-barber',
            add_barber: BASE_URL + '/admin/add-barber'
        };
        model.addBarber = function (requestParams, successCallback, failureCallback) {
            $http = $injector.get('$http');
            $http.post(urls.add_barber, {
                first_name: requestParams.firstName,
                last_name: requestParams.lastName,
                email: requestParams.email,
                password: requestParams.password,
                phone_number: requestParams.phoneNumber,
                shop_name: requestParams.shopName,
                logo:requestParams.logo,
                address_line_1:requestParams.address1,
                address_line_2:requestParams.address2,
                address_line_3:requestParams.address3
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
        }
    });
