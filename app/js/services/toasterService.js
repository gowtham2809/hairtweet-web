angular.module('app')
    .service('ToasterService', function (toaster) {
        var service = this;
        service.success = function (title, message) {
            toaster.pop("success", title, message);
        };
        service.info =function (title,message) {
            toaster.pop("info", title, message);
        };
        service.wait = function (title,message) {
            toaster.pop("wait", title, message);
        };
        service.warning = function (title,message) {
            toaster.pop("warning", title, message);
        };
        service.error = function (title,message) {
            toaster.pop("error", title, message);
        };
    });