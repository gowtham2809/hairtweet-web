app.config(function ($stateProvider, $urlRouterProvider, $httpProvider, JQ_CONFIG, MODULE_CONFIG) {
    $urlRouterProvider.when('', '/app/dashboard');
    $urlRouterProvider.when('/', '/app/dashboard');
    $urlRouterProvider.when('/app', '/app/dashboard');
    $urlRouterProvider.otherwise('/access/404');
    $httpProvider.interceptors.push('APIInterceptor');
    $stateProvider
        .state('app', {
            url: '/app',
            templateUrl: 'templates/app.html',
            resolve: load(['js/controllers/header.js', 'js/controllers/nav.js', 'user'])
        })
        .state('app.dashboard', {
            url: '/dashboard',
            templateUrl: 'templates/pages/dashboard.html',
            resolve: load(['js/controllers/dashboard.js', 'booking', 'user', 'chart'])
        })
        .state('app.barber-dashboard', {
            url: '/barber/dashboard',
            templateUrl: 'templates/pages/barber-dashboard.html',
            resolve: load(['js/controllers/dashboard.js', 'booking', 'user', 'chart'])
        })
        .state('app.manage-barber', {
            url: '/manage-barber',
            templateUrl: 'templates/pages/manage-barber.html',
            resolve: load(['js/controllers/manage-barber.js', 'barber'])
        })
        .state('app.manage-customer', {
            url: '/manage-customer',
            templateUrl: 'templates/pages/manage-customer.html',
            resolve: load(['js/controllers/manage-customer.js', 'customer'])
        })
        .state('app.service-locations', {
            url: '/service-locations',
            templateUrl: 'templates/pages/service-locations.html',
            resolve: load(['js/controllers/barber-service.js', 'service', 'js/map/load-google-maps.js', 'js/map/ui-map.js', 'js/map/map.js'], function () {
                return loadGoogleMaps();
            })
        })
        .state('app.add-barber', {
            url: '/add-barber',
            templateUrl: 'templates/pages/add-barber.html',
            resolve: load(['js/controllers/add-barber.js', 'barber', 'js/map/load-google-maps.js', 'js/map/ui-map.js', 'js/map/map.js'], function () {
                return loadGoogleMaps();
            })
        })
        .state('app.barber-detail', {
            url: '/barber/:barberId',
            templateUrl: 'templates/pages/barber-detail.html',
            resolve: load(['js/controllers/barber-details.js', 'barber'])
        })
        .state('app.customer-detail', {
            url: '/customer/:customerId',
            templateUrl: 'templates/pages/customer-detail.html',
            resolve: load(['js/controllers/customer-details.js', 'customer'])
        })
        .state('app.barber-detail.services', {
            url: '/service',
            views: {
                'barber_service': {
                    templateUrl: 'templates/blocks/barber-detail-services.html'
                }
            },
            resolve: load(['js/controllers/barber-service.js', 'service'])
        })
        .state('app.barber-detail.bookings', {
            url: '/booking',
            views: {
                'barber_booking': {
                    templateUrl: 'templates/blocks/barber-detail-bookings.html'
                }
            },
            resolve: load(['js/controllers/barber-booking.js', 'booking'])
        })
        .state('app.barber-detail.others', {
            url: '/others',
            views: {
                'barber_others': {
                    templateUrl: 'templates/blocks/barber-others.html'
                }
            },
            resolve: load(['js/controllers/barber-details.js', 'barber'])
        })
        .state('app.barber-detail.reviews', {
            url: '/reviews',
            views: {
                'barber_reviews': {
                    templateUrl: 'templates/blocks/barber-reviews.html'
                }
            },
            resolve: load(['js/controllers/barber-details.js', 'barber'])
        })
        .state('app.customer-detail.bookings', {
            url: '/booking',
            views: {
                'customer_booking': {
                    templateUrl: 'templates/blocks/customer-detail-booking.html'
                }
            },
            resolve: load(['js/controllers/barber-booking.js', 'booking'])
        })
        .state('app.bookings-barber', {
            url: '/barber/bookings/:barberId',
            templateUrl: 'templates/pages/barber-detail.html',
            resolve: load(['js/controllers/barber-details.js', 'barber'])
        })
        .state('app.approve-booking', {
            url: '/approve/booking/:bookingId',
            templateUrl: 'templates/pages/barber-detail.html',
            resolve: load(['js/controllers/barber-details.js', 'booking'])
        })
        .state('app.update-barber', {
            url: '/update-barber/:barberId',
            templateUrl: 'templates/pages/barber-detail.html',
            resolve: load(['js/controllers/barber-details.js', 'barber', 'js/map/load-google-maps.js', 'js/map/ui-map.js', 'js/map/map.js'], function () {
                return loadGoogleMaps();
            })
        })
        .state('app.update-service', {
            url: '/update-service/:serviceId',
            templateUrl: 'templates/modals/update-service.html',
            resolve: load(['js/controllers/barber-details.js', 'barber'])
        })
        .state('app.delete-service', {
            url: '/delete-service/:serviceId',
            templateUrl: 'templates/modals/delete-service.html',
            resolve: load(['js/controllers/barber-details.js', 'barber'])
        })
        .state('app.active-barber', {
            url: '/active-barber/:barberId',
            templateUrl: 'templates/pages/barber-detail.html',
            resolve: load(['js/controllers/manage-barber.js', 'barber'])
        })
        .state('app.barber-bookings', {
            url: '/barber-bookings/:barberId',
            templateUrl: 'templates/pages/barber-bookings.html',
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
                                console.log('Fetching.. ', JQ_CONFIG[src]);
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