angular.module('app')
    .service('APIInterceptor', function (TokenModel, $rootScope, $q, BASE_URL) {
        var service = this;
        var exceptionUrls = [
            BASE_URL + '/auth/login',
            BASE_URL + '/auth/refresh-token'
        ];

        service.request = function (config) {
           /* console.log('Intercepting request ', config);*/
            /*// check it req is for the same domain
            if (config.url.indexOf(BASE_URL) != 0) {
                return config;
            }*/
            var match = _.find(exceptionUrls, function (url) {
                return config.url == url;
            });

            if (typeof match != 'undefined') {
                //console.log('exception URL');
                return config;
            }

            if (TokenModel.getToken() != null) {
                // check if the token has expired
                if (TokenModel.isTokenValid()) {
                    //token didn't expire
                    //console.log('Token Valid');
                    config.headers.Authorization = "Bearer " + TokenModel.getToken().api_token;
                    return config;
                } else {
                    //console.log('Token expired do a synchronous request to refresh the token');
                    var differed = $q.defer();
                    TokenModel.refreshToken().then(function () {
                        //console.log('Token obtained successfully');
                        differed.resolve(config);
                    }, function () {
                        //console.log('Failed to get token');
                        $rootScope.$broadcast('unauthorized');
                        differed.resolve(config);
                    });
                    return differed.promise;
                }
            }
            // token is null, Proceed with request
            // if response is 401 broadcast message
            $rootScope.$broadcast('unauthorized');
            return config;
        };

        service.responseError = function (response) {
            if (response.status === 401) {
                $rootScope.$broadcast('unauthorized');
            }else if(response.status === 404){
                $rootScope.$broadcast('notFound');
            }
            return $q.reject(response);
        };

    })
;