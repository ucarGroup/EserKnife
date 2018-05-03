kopf.filter('bytes', function () {

    var UNITS = ['b', 'KB', 'MB', 'GB', 'TB', 'PB'];

    function stringify(bytes) {
        if (bytes > 0) {
            var e = Math.floor(Math.log(bytes) / Math.log(1024));
            return (bytes / Math.pow(1024, e)).toFixed(2) + UNITS[e];
        } else {
            return 0 + UNITS[0];
        }
    }

    return function (bytes) {
        return stringify(bytes);
    };

});

kopf.filter('startsWith', function () {

    function strStartsWith(str, prefix) {
        return (str + '').indexOf(prefix) === 0;
    }

    return function (elements, prefix) {
        var filtered = [];
        angular.forEach(elements, function (element) {
            if (strStartsWith(element, prefix)) {
                filtered.push(element);
            }
        });

        return filtered;
    };
});

kopf.filter('timeInterval', function () {

    var UNITS = ['yr', 'mo', 'd', 'h', 'min'];

    var UNIT_MEASURE = {
        yr: 31536000000,
        mo: 2678400000,
        wk: 604800000,
        d: 86400000,
        h: 3600000,
        min: 60000
    };

    function stringify(seconds) {

        var result = 'less than a minute';

        for (var idx = 0; idx < UNITS.length; idx++) {
            var amount = Math.floor(seconds / UNIT_MEASURE[UNITS[idx]]);
            if (amount) {
                result = amount + UNITS[idx] + '.';
                break;
            }
        }

        return result;
    }

    return function (seconds) {
        return stringify(seconds);
    };

});


kopf.filter('to_trusted', ['$sce', function ($sce) {
    return function (text) {
        return $sce.trustAsHtml(text);
    };
}]);