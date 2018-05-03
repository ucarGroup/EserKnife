kopf.directive('ngStaticInclude', function () {
    return {
        templateUrl: function (elem, attr) {
            return './resources/kopf/html/partials/' + attr.file + '.html';
        }
    };
});

