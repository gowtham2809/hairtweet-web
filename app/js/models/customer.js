angular.module('app')
    .service('CustomerModel', function ($injector, BASE_URL, BARBER_URL, UserModel) {
        var model = this;
        if (UserModel.getUserType() == 'barber') {
            var get_all_customers=BARBER_URL+'/user/{id}/get-users-for-barber'
        } else {

        }
        var urls = {
            get_all_customers: BASE_URL + '/user/get-all-users',
            get_user: BASE_URL + '/user/{userId}/detail',

        };

        model.getAllCustomers = function (requestParams, successCallback, failureCallback) {
            $http = $injector.get('$http');
            $http.get(urls.get_all_customers, {
                params: {
                    page: requestParams.page
                }
            }).success(function (response) {
                successCallback(response.data);
            }).error(function (data) {
                failureCallback(data.error.message)
            });
        };
        model.loadCustomerDetails = function (customerId, successCallback, failureCallback) {
            $http = $injector.get('$http');
            var url = urls.get_user.replace('{userId}', customerId);
            $http.get(url).success(function (response) {
                successCallback(response);
            }).error(function (data) {
                failureCallback(data.error.message)
            });
        };

    });

