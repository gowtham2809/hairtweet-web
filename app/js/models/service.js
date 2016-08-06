angular.module('app')
    .service('ServiceModel', function ($injector, BASE_URL) {
        var model = this;
        var urls = {
            update_service: BASE_URL + '/services/{serviceId}/update'
        };
        model.updateService = function (requestParams,successCallback,failureCallback) {
            var url = urls.update_service.replace('{serviceId}', requestParams.id);
            return $http.post(url, {
                barber_id:requestParams.barberId,
                id: requestParams.id,
                service_name:requestParams.service_name,
                duration:requestParams.duration,
                cost:requestParams.cost,
                discount:requestParams.discount,
                discount_type_id:requestParams.discount_type
            }).success(function (response) {
                successCallback(response);
            }).error(function (data, status) {
                failureCallback(data.error.message)
            });
        }
    });