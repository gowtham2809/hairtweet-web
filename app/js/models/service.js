angular.module('app')
    .service('ServiceModel', function ($injector, BASE_URL) {
        var model = this;
        var urls = {
            update_service: BASE_URL + '/services/{serviceId}/update',
            delete_service: BASE_URL + '/services/{serviceId}/delete'
        };

        model.updateService = function (requestParams, successCallback, failureCallback) {
            var url = urls.update_service.replace('{serviceId}', requestParams.id);
            return $http.post(url, {
                barber_id: requestParams.barberId,
                id: requestParams.id,
                service_name: requestParams.service_name,
                duration_in_minutes: requestParams.duration,
                cost: requestParams.cost,
                discount: requestParams.discount,
                discount_type_id: requestParams.discount_type
            }).success(function (response) {
                successCallback(response);
            }).error(function (data, status) {
                failureCallback(data.error.message)
            });
        };

        model.deleteService = function (requestParams, successCallback, failureCallback) {
            var url = urls.delete_service.replace('{serviceId}', requestParams.id);
            return $http.post(url, {
                    barber_id: requestParams.barberId
                }).success(function (response) {
                successCallback(response);
            }).error(function (data, status) {
                failureCallback(data.error.message)
            });
        };

        model.getFormattedServiceTime = function (duration) {
            if (_.isUndefined(duration)) {
                return "";
            }

            var formatted = "";
            if (_.toInteger(duration / 60) > 0)
                if (_.toInteger(duration / 60) == 1)
                    formatted += _.toInteger(duration / 60) + " Hour ";
                else
                    formatted += _.toInteger(duration / 60) + " Hours ";

            if (duration % 60 > 0)
                if (duration % 60 == 1)
                    formatted += duration % 60 + " Minute";
                else
                    formatted += duration % 60 + " Minutes";

            return formatted;
        }
    });