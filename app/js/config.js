var app = angular.module('app')
    .config(function ($controllerProvider, $compileProvider, $filterProvider, $provide) {
        app.controller = $controllerProvider.register;
        app.directive = $compileProvider.directive;
        app.filter = $filterProvider.register;
        app.factory = $provide.factory;
        app.service = $provide.service;
        app.constant = $provide.constant;
        app.value = $provide.value;
    })
    .constant('BASE_URL', 'http://hairtweet-api.tartlabs.com/api-admin/v1')
    .constant('WEB_URL', 'http://hairtweet-api.tartlabs.com/api-common/v1')
    .constant('BARBER_URL', 'http://hairtweet-api.tartlabs.com/api-barber/v1')
    .constant('DEBUG_ENABLED', true);