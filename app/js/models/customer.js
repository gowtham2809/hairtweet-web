angular.module('app')
    .service('CustomerModel', function ($injector, BASE_URL) {
        var model = this;
        var urls = {
            get_all_customers: BASE_URL + '/user/get-all-users'
        };

        model.getAllCustomers = function (requestParams, successCallback, failureCallback) {
            $http = $injector.get('$http');
            $http.get(urls.get_all_customers,{
                params: {
                    page: requestParams.page
                }
            }).success(function (response) {
                successCallback(response.data);
            }).error(function (data) {
                failureCallback(data.error.message)
            });
        };

    });

