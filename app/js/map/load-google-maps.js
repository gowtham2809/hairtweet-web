var loadGoogleMaps = (function ($) {
    console.log('loadinf google aknsf');
    var now = $.now(), promise;

    return function (version, language) {
        var apiKey = 'AIzaSyDS7Imf91sMkPvbyxZDyurFdFC91ZsRhqw';
        if (promise) {
            return promise;
        }

        var deferred = $.Deferred(),

            resolve = function () {
                deferred.resolve(window.google && google.maps ? google.maps : false);
            },

            callbackName = "loadGoogleMaps_" + ( now++ ),

            params = $.extend(
                {'sensor': false}
                , apiKey ? {"key": apiKey} : {}
                , language ? {"language": language} : {}
            );
        ;

        if (window.google && google.maps) {

            resolve();

        } else if (window.google && google.load) {

            google.load("maps", version || 3, {"other_params": $.param(params), "callback": resolve});

        } else {

            params = $.extend(params, {
                'v': version || 3,
                'callback': callbackName
            });

            window[callbackName] = function () {

                resolve();

                setTimeout(function () {
                    try {
                        delete window[callbackName];
                    } catch (e) {
                    }
                }, 20);
            };

            $.ajax({
                dataType: 'script',
                data: params,
                url: 'http://maps.google.com/maps/api/js'
            });

        }

        promise = deferred.promise();

        return promise;
    };

}(jQuery));
