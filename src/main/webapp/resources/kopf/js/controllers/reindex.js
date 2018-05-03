kopf.controller('ReIndexController', ['$scope', '$location','$timeout',
    'ExternalSettingsService', 'ElasticService', 'AlertService',
    'AceEditorService','ConfirmDialogService','ConfirmDialogService2','AppState',
    function ($scope, $location,$timeout, ExternalSettingsService, ElasticService,
              AlertService, AceEditorService,ConfirmDialogService,ConfirmDialogService2,AppState) {

        ExternalSettingsService.setTheme("dark");
        $scope.indexNames = [];
        $scope.field_types = "";
        $scope.field_type = "";
        $scope.field_new_index = "";

        setTimeout(function(){

            initHandle($scope, ElasticService,AppState);
            indexComboboxHandler($scope, $timeout);
            typeHandler($scope, ElasticService, AlertService);
            editorHandler($scope, AceEditorService);
            submitActionHandler($scope, ElasticService, AlertService, ConfirmDialogService2);
        },10);
    }]
);
function initHandle($scope, ElasticService,AppState) {
    $scope.$watch(
        function () {
            return ElasticService.cluster;
        },
        function (filter, previous) {
            if (!ElasticService.cluster) return;
            if ($scope.indexNames.length == 0) {
                ElasticService.getIndices().forEach(function (eachIndex) {
                    $scope.indexNames.push(eachIndex.name);
                    $("#re-index-combobox").jqxComboBox('addItem', eachIndex.name);
                });
                return;
            }
        },
        true
    );
    //处理参数传递
    var selectedIndex = AppState.getProperty("ClusterOverview","selectedIndex","");
    $scope.field_index = selectedIndex != "" ? selectedIndex : "";
    AppState.setProperty("ClusterOverview","selectedIndex","");
}
function indexComboboxHandler($scope, $timeout) {
    $("#re-index-combobox").jqxComboBox({
        height: 30,
        width: '100%',
        theme: 'metrodark',
        searchMode: 'contains',
        autoComplete: true, //筛选结果的显示效果
        placeHolder: '选择索引',
        source: $scope.indexNames
    });

    /**
     * 索引选择框发生变化,级联更新数据
     */
    $("#re-index-combobox").on('change', function (event) {
        if (event.args) {
            var item = event.args.item;
            var value = item.value;
            if (isDefined(value)) {
                $scope.loadIndexTypes(value);
                $scope.field_index = value;
            }
        }
    });
    $timeout(function () {
        if ($scope.field_index && $scope.field_index != "") {
            $("#re-index-combobox").val($scope.field_index);
        }
    },1000);
}
function typeHandler($scope, ElasticService, AlertService) {

    $scope.$watch('field_new_index', function (current, previous) {
        if (isDefined(current)) {
            if ('' == current) {
                $scope.editor.setValue("{}");
                return;
            }
            var mappingJson = '{"source": {"index": "'+$scope.field_index+'","type": "'+$scope.field_type+'"},"dest": {"index": "'+$scope.field_new_index+'"}}';
            $scope.editor.setValue(mappingJson);
            $scope.editor.format();
        }
    });

    $scope.loadIndexTypes = function (index) {
        $scope.field_type = '';
        $scope.field_field = '';
        if (notEmpty(index)) {
            ElasticService.getIndexMetadata(index,
                function (metadata) {
                    $scope.field_index_metadata = metadata;
                    $scope.field_types = metadata.getTypes();
                    $scope.field_type = $scope.field_types[0];
                },
                function (error) {
                    $scope.field_index = '';
                    AlertService.error('Error loading index types', error);
                }
            );
        }
    };
}

function submitActionHandler($scope, ElasticService, AlertService, ConfirmDialogService2) {
    $scope.reIndex = function () {
        var params = {
            clusterName: clusterName,
            newColsJson: $scope.editor.getValue()
        };
        ElasticService.clusterRequest2("/eserknife/indexmsg/reindex",
            'POST',
            "",
            params,
            {},
            function (res) {
                if (!res) {
                    AlertService.error("服务端响应对象为空!");
                    return;
                }
                if(res.total > 0 ){
                    AlertService.success("重建索引成功！");
                    $scope.field_type = '';
                    $scope.field_new_index = '';
                    $("#re-index-combobox").val('');
                    $scope.editor.setValue('{}');
                }else{
                    AlertService.warn("原索引字段无数据，重建无意义！");
                }
            },
            function (res) {
                AlertService.error("重建索引失败！");
            }
        );
    }

    $scope.promptUpdateIndex = function () {
        if ($.trim($scope.field_index).length == 0) {
            AlertService.warn('索引名不能为空');
            return;
        }
        if ($.trim($scope.field_new_index).length == 0) {
            AlertService.warn('重建索引名不能为空');
            return;
        }
        $("#submitA").click();
        ConfirmDialogService2.open(
            '重建索引',
            '确认按照索引  <span style="font-size: 20px;color: #be386a">' + $scope.field_index
            + '</span>,  类型  <span style="font-size: 20px;color: #B73766">' + $scope.field_type + '</span>  重建索引吗?',
            '重建',
            function () {
                $scope.reIndex();
            }
        );
    };
}

function editorHandler($scope, AceEditorService) {
    if (!isDefined($scope.editor)) {
        $scope.editor = AceEditorService.init('index-settings-editor');
        $scope.editor.setValue('{}');
    }
}

