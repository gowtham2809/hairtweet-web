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
        .constant('BASE_URL', 'http://localhost:8888/api-admin/v1')
        .constant('DEBUG_ENABLED', true);