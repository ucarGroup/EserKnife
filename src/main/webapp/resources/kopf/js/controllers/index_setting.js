kopf.controller('SettingIndexController', ['$scope', '$location',
    'ExternalSettingsService', 'ElasticService', 'AlertService',
    'AceEditorService','HostHistoryService','AppState','$http',
    function ($scope, $location, ExternalSettingsService, ElasticService,
              AlertService,AceEditorService, HostHistoryService,AppState,$http) {

        ExternalSettingsService.setTheme("dark");

        $scope.index = null;
        $scope.settings = null;
        $scope.editable_settings = null;

        $scope.saveReplicas = function (){
            var newSettings = {};
            newSettings['index.number_of_replicas'] = $scope.editable_settings['index.number_of_replicas'];
            $scope.saveSetting(newSettings,$scope.index,'[number_of_replicas]');
        }

        $scope.saverRefreshInterval = function (){
            var newSettings = {};
            newSettings['index.refresh_interval'] = $scope.editable_settings['index.refresh_interval'];
            $scope.saveSetting(newSettings,$scope.$scope.index,'[index.refresh_interval]');
        }

        $scope.saveAllocation = function (){
            var newSettings = {};
            var toggled = $("#disable_allocationBtn").jqxToggleButton('toggled');
            newSettings['index.routing.allocation.disable_allocation'] = !toggled;
            $scope.saveSetting(newSettings,$scope.index,'[index.routing.allocation.disable_allocation]');
        }

        $scope.saveSetting = function saveSetting(newSettings,index,settingName) {
            var settingStr = btoa(JSON.stringify(newSettings)); // angular post nested json 报403,先对其base64处理
            ElasticService.clusterRequest3("/eserknife/indexmsg/settingIndex",
                'POST',
                {
                    settings: settingStr,
                    indexName: index,
                    clusterName: clusterName
                },
                function (res) {
                    AlertService.success(res+settingName);
                }
            );
        }

        function applySetting2Page() {
            var disable_allocation_state = $scope.editable_settings['index.routing.allocation.disable_allocation'];
            if (!!!disable_allocation_state || disable_allocation_state == 'false') {//没配置 或者 false,表示允许分配
                $('#disable_allocationBtn').jqxSwitchButton('check');
            }else if(disable_allocation_state == 'true'){
                $('#disable_allocationBtn').jqxSwitchButton('uncheck');
            }else{
                alert("出错了");
            }
        }

        $scope.initializeController = function() {
            $('#jqxTabs').jqxTabs({ width: 1000, height: 300, position: 'top',theme: "metrodark"});
            $('#disable_allocationBtn').jqxSwitchButton({
                height: 20,
                width: 80,
                onLabel:'<span style="font-size: 11px">开</span>',
                offLabel:'<span style="font-size: 11px">关</span>',
                thumbSize:'40%',
                checked: true,
                theme: "ui-sunny" });
            var index = $location.search().index;
            ElasticService.getIndexMetadata(index,
                function(metadata) {
                    $scope.index = index;
                    $scope.settings = metadata.settings;
                    $scope.editable_settings = new EditableIndexSettings(
                        $scope.settings
                    );
                    applySetting2Page();
                },
                function(error) {
                    AlertService.error('Error while loading index settings for [' +
                        index + ']',
                        error);
                }
            );
        };
    }
]);
