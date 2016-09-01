angular.module('app')
    .service('ServiceModel', function ($injector, BASE_URL) {
        var model = this;
        var urls = {
            get_services: BASE_URL + '/barber/{id}/categories',
            update_service: BASE_URL + '/services/{serviceId}/update',
            delete_service: BASE_URL + '/services/{serviceId}/delete',
            get_service_location: BASE_URL + '/get-service-locations',
            add_location: BASE_URL + '/add/service-location',
            update_location: BASE_URL + '/update/{id}/service-location',
            delete_location: BASE_URL + '/delete/{id}/service-location',
            add_area: BASE_URL + '/add/service-area',
            update_area: BASE_URL + '/update/{id}/service-area',
            delete_area: BASE_URL + '/delete/{id}/service-area',
            add_category: BASE_URL + '/category/add'
        };

        model.getServices = function (barberId, successCallback, failureCallback) {
            $http = $injector.get('$http');
            var url = urls.get_services.replace('{id}', barberId);
            $http.get(url).success(function (response) {
                successCallback(response);
            }).error(function (data) {
                failureCallback(data.error.message)
            });
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
        model.deleteServiceLocation = function (requestParams, successCallback, failureCallback) {
            var url = urls.delete_location.replace('{id}', requestParams.id);
            return $http.post(url).success(function (response) {
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

        model.getServiceLocations = function (successCallback, failureCallback) {
            $http = $injector.get('$http');
            var url = urls.get_service_location
            $http.get(url).success(function (response) {
                successCallback(response);
            }).error(function (data) {
                failureCallback(data.error.message)
            });
        };

        model.addLocation = function (requestParams, successCallback, failureCallback) {
            var url = urls.add_location;
            return $http.post(url, {
                city_name: requestParams.city,
                latitude: requestParams.latitude,
                longitude: requestParams.longitude
            }).success(function (response) {
                successCallback(response);
            }).error(function (data, status) {
                failureCallback(data.error.message)
            });
        };
        model.updateLocations = function (requestParams, successCallback, failureCallback) {
            var url = urls.update_location.replace('{id}', requestParams.id);
            return $http.post(url, {
                city_name: requestParams.city,
                latitude: requestParams.latitude,
                longitude: requestParams.longitude
            }).success(function (response) {
                successCallback(response);
            }).error(function (data, status) {
                failureCallback(data.error.message)
            });
        };
        model.addServiceArea = function (requestParams, successCallback, failureCallback) {
            var url = urls.add_area;
            return $http.post(url, {
                location_id: requestParams.location_id,
                area: requestParams.area,
                latitude: requestParams.latitude,
                longitude: requestParams.longitude
            }).success(function (response) {
                successCallback(response);
            }).error(function (data, status) {
                failureCallback(data.error.message)
            });
        };
        model.updateServiceArea = function (requestParams, successCallback, failureCallback) {
            var url = urls.update_area.replace('{id}', requestParams.id);
            return $http.post(url, {
                area: requestParams.area,
                latitude: requestParams.latitude,
                longitude: requestParams.longitude
            }).success(function (response) {
                successCallback(response);
            }).error(function (data, status) {
                failureCallback(data.error.message)
            });
        };
        model.deleteServiceArea = function (requestParams, successCallback, failureCallback) {
            var url = urls.delete_area.replace('{id}', requestParams.id);
            return $http.post(url).success(function (response) {
                successCallback(response);
            }).error(function (data, status) {
                failureCallback(data.error.message)
            });
        };
        model.addServiceCategory = function (requestParams, successCallback, failureCallback) {
            var url = urls.add_category;
            return $http.post(url, {
                barber_id: requestParams.barber_id,
                category_name: requestParams.category_name,
                gender: requestParams.gender
            }).success(function (response) {
                successCallback(response);
            }).error(function (data, status) {
                failureCallback(data.error.message)
            });
        };
    });