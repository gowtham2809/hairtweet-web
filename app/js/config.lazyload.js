angular.module('app')
/**
 * jQuery plugin config use ui-jq directive , config the js and css files that required
 * key: function name of the jQuery plugin
 * value: array of the css js file located
 */
    .constant('JQ_CONFIG', {
        login: [
            'js/models/user.js',
            'js/models/token.js'
        ],
        user: ['js/models/user.js'],
        barber: ['js/models/barber.js','js/models/service.js'],
        service: ['js/models/service.js'],
        customer:['js/models/customer.js'],
        booking: ['js/models/booking.js'],
        screenfull: ['bower_components/screenfull/dist/screenfull.js']
    })
    .constant('MODULE_CONFIG', [

    ])
    .config(['$ocLazyLoadProvider', 'MODULE_CONFIG', function ($ocLazyLoadProvider, MODULE_CONFIG, DEBUG_ENABLED) {
        $ocLazyLoadProvider.config({
            debug: DEBUG_ENABLED,
            events: true,
            modules: MODULE_CONFIG
        });
    }])
;
