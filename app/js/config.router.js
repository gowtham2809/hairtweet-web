app.config(function ($stateProvider, $urlRouterProvider, $httpProvider, JQ_CONFIG, MODULE_CONFIG) {
        $urlRouterProvider.when('', '/app/manage-barber');
        $urlRouterProvider.when('/', '/app/manage-barber');
        $urlRouterProvider.when('/app', '/app/manage-barber');
        $urlRouterProvider.otherwise('/access/404');
        $httpProvider.interceptors.push('APIInterceptor');
        $stateProvider
            .state('app', {
                url: '/app',
                templateUrl: 'templates/app.html',
                resolve: load(['js/controllers/header.js', 'js/controllers/nav.js', 'user'])
            })
            .state('app.manage-barber', {
                url: '/manage-barber',
                templateUrl: 'templates/pages/manage-barber.html',
                resolve: load(['js/controllers/manage-barber.js', 'barber'])
            })

            .state('access', {
                url: '/access',
                template: '<div ui-view class="fade-in-right-big smooth"></div>',
                abstract: true
            })
            .state('access.signin', {
                url: '/signin',
                templateUrl: 'templates/signin.html',
                resolve: load(['js/controllers/login.js', 'login'])
            })
            .state('access.404', {
                url: '/404',
                templateUrl: 'templates/404.html'
            })
        ;

        function load(srcs, callback) {
            return {
                deps: ['$ocLazyLoad', '$q',
                    function ($ocLazyLoad, $q) {
                        var deferred = $q.defer();
                        var promise = false;
                        srcs = angular.isArray(srcs) ? srcs : srcs.split(/\s+/);
                        if (!promise) {
                            promise = deferred.promise;
                        }
                        angular.forEach(srcs, function (src) {
                            promise = promise.then(function () {
                                if (JQ_CONFIG[src]) {
                                    console.log('Fetching.. ',JQ_CONFIG[src]);
                                    return $ocLazyLoad.load(JQ_CONFIG[src]);
                                }
                                if (_.isEmpty(MODULE_CONFIG)) {
                                    name = src;
                                } else {
                                    angular.forEach(MODULE_CONFIG, function (module) {
                                        if (module.name == src) {
                                            name = module.files;
                                            console.log("files", name);
                                        } else {
                                            name = src;
                                        }
                                    });
                                }
                                return $ocLazyLoad.load(name);
                            });
                        });
                        deferred.resolve();
                        return callback ? promise.then(function () {
                            return callback();
                        }) : promise;
                    }]
            }
        }

    })
;