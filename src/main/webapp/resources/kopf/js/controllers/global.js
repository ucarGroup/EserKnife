kopf.controller('DebugController', ['$scope', 'DebugService',
    function($scope, DebugService) {

        $scope.messages = [];

        $scope.visible = false;

        $scope.$watch(
            function() {
                return $scope.visible ? DebugService.getUpdatedAt() : 0;
            },
            function(newValue, oldValue) {
                $scope.messages = $scope.visible ? DebugService.getMessages() : [];
            }
        );

    }

]);

kopf.controller('GlobalController', ['$scope', '$location', '$sce', '$window',
    'AlertService', 'ExternalSettingsService','AppState','ElasticService','PageService',
    function ($scope, $location, $sce, $window, AlertService,
              ExternalSettingsService,AppState,ElasticService,PageService) {

        $scope.version = '2.0.1';
        ElasticService.connect();
        ElasticService.refresh();
        $scope.modal = new ModalControls();

        $scope.getTheme = function () {
            return ExternalSettingsService.getTheme();
        };

        $scope.readParameter = function (name) {
            var regExp = new RegExp('[\\?&]' + name + '=([^&#]*)');
            var results = regExp.exec($window.location.href);
            return isDefined(results) ? results[1] : null;
        };

        $scope.displayInfo = function (title, info) {
            $scope.modal.title = title;
            $scope.modal.info = $sce.trustAsHtml(JSONTree.create(info));
            $('#modal_info').modal({show: true, backdrop: true});
        };

        $scope.displayInfo2 = function (title, info) {
            //$scope.modal.title = title;
            //$scope.modal.info = "<h1>hello</h1>";
            $('#modal_info').modal({show: true, backdrop: true});
        };

    }
]);