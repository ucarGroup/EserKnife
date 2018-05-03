kopf.controller('AliasController', ['$scope', '$location', '$timeout',
    'AlertService', 'ElasticService','AceEditorService','AppState',
function($scope, $location, $timeout, AlertService, ElasticService,AceEditorService,AppState) {

    $scope.toolsFlag = 0; //1 新建  2 迁移 3 移除
    $scope.aliasEditor = undefined;
    $scope.createIndexName = "";
    $scope.fromAliasIndexName="";
    $scope.fromAliasName="";
    $scope.toAliasName="";
    $scope.aliasName = undefined;
    $scope.indexAliasNames = [];
    $scope.paginator = new Paginator(1, 10, [], new AliasFilter('', ''));
    $scope.page = $scope.paginator.getPage();

    $scope.createDefaultJson = 'POST /_aliases\n' +
        '{\n' +
        '  "actions": [\n' +
        '    {\n' +
        '      "add": {\n' +
        '        "index": "",\n' +
        '        "alias": ""\n' +
        '      }\n' +
        '    }\n' +
        '  ]\n' +
        '}';

    $scope.mvDefaultJson = 'POST /_aliases\n' +
        '{\n' +
        '  "actions": [\n' +
        '    {\n' +
        '      "remove": {\n' +
        '        "index": "",\n' +
        '        "alias": ""\n' +
        '      }\n' +
        '    },\n' +
        '    {\n' +
        '      "add": {\n' +
        '        "index": "",\n' +
        '        "alias": ""\n' +
        '      }\n' +
        '    }\n' +
        '  ]\n' +
        '}';

    $scope.delDefaultJson = 'POST /_aliases\n' +
        '{\n' +
        '  "actions": [\n' +
        '    {\n' +
        '      "remove": {\n' +
        '        "index": "",\n' +
        '        "alias": ""\n' +
        '      }\n' +
        '    }\n' +
        '  ]\n' +
        '}';

    $scope.$watch('paginator', function (filter, previous) {
        $scope.page = $scope.paginator.getPage();
    }, true);

    $scope.viewDetails = function (alias) {
        $scope.details = alias;
    };

    $scope.loadAliases = function () {
        ElasticService.fetchAliases(
            function (indexAliases) {
                $scope.original = indexAliases.map(function (ia) {
                    return ia.clone();
                });
                $scope.originalAlias = indexAliases.map(function (ia) {
                    return ia.clone();
                });
                $scope.paginator.setCollection(indexAliases);
                $scope.page = $scope.paginator.getPage();
            },
            function (error) {
                AlertService.error('Error while fetching aliases', error);
            }
        );
    };

    $scope.removeIndexAlias = function (index, alias) {
        var indexPosition = 0;
        var collection = $scope.paginator.getCollection();
        for (; indexPosition < collection.length; indexPosition++) {
            if (index == collection[indexPosition].index) {
                break;
            }
        }
        var indexAliases = collection[indexPosition];
        var size = indexAliases.aliases.length;
        for (var aliasPosition = 0; aliasPosition < size; aliasPosition++) {
            if (alias == indexAliases.aliases[aliasPosition].alias) {
                indexAliases.aliases.splice(aliasPosition, 1);
                if (indexAliases.aliases.length === 0) {
                    collection.splice(indexPosition, 1);
                }
                break;
            }
        }
        $scope.paginator.setCollection(collection);
        $scope.page = $scope.paginator.getPage();
        $scope.aliasEditor.getValue(function(data) {
            var actions ;
            if(data && data.length > 0){
                var body=data[0].data;
                if(body){
                    actions = JSON.parse(body).actions;
                }
            }
           var removeJson = $.parseJSON('{\n' +
                '      "remove": {\n' +
                '        "index": "' + index + '",\n' +
                '        "alias": "' + alias + '"\n' +
                '      }\n' +
                '    }\n');
            if(actions){
                for(var i= 0;i<actions.length;i++){
                    var action =actions[i];
                    if(!action.remove.index || !action.remove.alias){
                        actions.remove(action);
                    }
                }
            }
            if(actions){
                actions.push(removeJson);
            }else{
                actions[0] = removeJson;
            }
            var str = formatJson('{\n"actions":\n'+JSON.stringify(actions)+'\n}');

            $scope.aliasEditor.setValue('POST /_aliases\n'+str);
        });
    };

    $scope.initEditorAliasManager = function () {
        if (!angular.isDefined($scope.setMapEditor)) {
            $scope.aliasEditor = AceEditorService.init('alias-editor','editor_alias_actions','copy_as_alias_curl');
            $scope.aliasEditor.setValue($scope.createDefaultJson);
        }
    };

    $scope.splitterHandlerAliasManager = function () {
        $('#aliasTools').jqxSplitter({
            width: '100%',
            height: 710,
            theme: 'metrodark',
            panels: [{size: '50%', collapsible: false}, {collapsed: false}]
        });
    };

    $scope.initAliasHandle = function () {
        $scope.$watch(
            function () {
                return ElasticService.cluster;
            },
            function (filter, previous) {
                if (!ElasticService.cluster) return;
                if ($scope.indexAliasNames.length == 0) {
                    var indexNames = ElasticService.getAllIndicesNames();
                    $scope.indexAliasNames= indexNames;
                    $("#alias-index-combobox").jqxComboBox({source:indexNames});
                    $("#to_alias-index-combobox").jqxComboBox({source:indexNames});
                    return;
                }
            },
            true
        );
        var selectedIndex = AppState.getProperty("CreateAliasManager", "selectedIndex", "");
        $scope.aliasIndex = selectedIndex != "" ? selectedIndex : "";
        AppState.setProperty("CreateAliasManager", "selectedIndex", "");
    };

    $scope.indexComboboxHandlerAliasManager = function () {
        $("#alias-index-combobox").jqxComboBox({
            height: 30,
            width: '100%',
            theme: 'metrodark',
            searchMode: 'contains',
            autoComplete: true,
            placeHolder: '选择索引',
            source: $scope.indexAliasNames
        });
        $("#to_alias-index-combobox").jqxComboBox({
            height: 30,
            width: 300,
            theme: 'metrodark',
            searchMode: 'contains',
            autoComplete: true,
            placeHolder: '选择索引',
            source: $scope.indexAliasNames
        });
        $("#alias-index-combobox").on('change', function (event) {
            if (event.args) {
                var item = event.args.item;
                var value = item.value;
                if (isDefined(value)) {
                    $("#aliasName").val("");
                    $scope.createIndexName = value;
                    var new_val = 'POST /_aliases\n' +
                        '{\n' +
                        '  "actions": [\n' +
                        '    {\n' +
                        '      "add": {\n' +
                        '        "index": "' + value + '",\n' +
                        '        "alias": ""\n' +
                        '      }\n' +
                        '    }\n' +
                        '  ]\n' +
                        '}';
                    $scope.aliasEditor.setValue(new_val);
                }
            }
        });

        $("#to_alias-index-combobox").on('change', function (event) {
            if (event.args) {
                var item = event.args.item;
                var value = item.value;
                if (isDefined(value)) {
                    $scope.toAliasName = value;
                    $scope.aliasEditor.setValue('POST /_aliases\n' +
                        '{\n' +
                        '  "actions": [\n' +
                        '    {\n' +
                        '      "remove": {\n' +
                        '        "index": "' + $scope.fromAliasIndexName + '",\n' +
                        '        "alias": "' + $scope.fromAliasName + '"\n' +
                        '      }\n' +
                        '    },\n' +
                        '    {\n' +
                        '      "add": {\n' +
                        '        "index": "' + $scope.toAliasName + '",\n' +
                        '        "alias": "' + $scope.fromAliasName + '"\n' +
                        '      }\n' +
                        '    }\n' +
                        '  ]\n' +
                        '}');
                }
            }
        });
    };

    $scope.$watch("aliasName", function (current, previous) {
        if (isDefined(current)) {
            var newVal = 'POST /_aliases\n' +
                '{\n' +
                '  "actions": [\n' +
                '    {\n' +
                '      "add": {\n' +
                '        "index": "' + $scope.createIndexName + '",\n' +
                '        "alias": "' + current + '"\n' +
                '      }\n' +
                '    }\n' +
                '  ]\n' +
                '}';
            $scope.aliasEditor.setValue(newVal);
        }
    });



    $scope.$watch("fromAliasIndexName", function (current, previous) {
        if (isDefined(current)) {
            if($scope.originalAlias){
                $scope.fromAliasName="";
                for(var i= 0;i<$scope.originalAlias.length;i++){
                    if(current == $scope.originalAlias[i].index){
                        $scope.allAlias =  $scope.originalAlias[i];
                    }
                }
                if($scope.fromAliasIndexName){
                    $scope.aliasEditor.setValue('POST /_aliases\n' +
                        '{\n' +
                        '  "actions": [\n' +
                        '    {\n' +
                        '      "remove": {\n' +
                        '        "index": "' + $scope.fromAliasIndexName + '",\n' +
                        '        "alias": "' + $scope.fromAliasName + '"\n' +
                        '      }\n' +
                        '    },\n' +
                        '    {\n' +
                        '      "add": {\n' +
                        '        "index": "' + $scope.toAliasName + '",\n' +
                        '        "alias": "' + $scope.fromAliasName + '"\n' +
                        '      }\n' +
                        '    }\n' +
                        '  ]\n' +
                        '}');
                }
            }
        }
    });
    $scope.$watch("fromAliasName", function (current, previous) {
        if (isDefined(current)　&& current) {
            if($scope.fromAliasName){
                $scope.aliasEditor.setValue('POST /_aliases\n' +
                    '{\n' +
                    '  "actions": [\n' +
                    '    {\n' +
                    '      "remove": {\n' +
                    '        "index": "' + $scope.fromAliasIndexName + '",\n' +
                    '        "alias": "' + $scope.fromAliasName + '"\n' +
                    '      }\n' +
                    '    },\n' +
                    '    {\n' +
                    '      "add": {\n' +
                    '        "index": "' + $scope.toAliasName + '",\n' +
                    '        "alias": "' + $scope.fromAliasName + '"\n' +
                    '      }\n' +
                    '    }\n' +
                    '  ]\n' +
                    '}');
            }
        }
    });



    $scope.createAliasManager=function(){
        $scope.aliasEditor.getValue(function(data) {
            var method = data[0].method;
            var url = data[0].url;
            var body = data[0].data;
            if(body){
                if (!isDefined($scope.aliasEditor.error)) {
                    var params={"clusterName":clusterName,"data":body,"url":url,"method":method};
                    ElasticService.clusterRequest2("/eserknife/aliasManager/createAll" +
                        "", 'POST', {}, params, {},
                        function (res) {
                            if (res && res.acknowledged) {
                                $scope.clearData();
                                $scope.loadAliases();
                                AlertService.success('操作成功');
                            }else{
                                AlertService.error('操作失败',res);
                            }
                        });
                }
            }
        });

    };


    $scope.radioHandlerAliasManager = function() {
        $("#jqxRadioCreateAliasManager").jqxRadioButton({height: 25, theme: 'metrodark', checked: true});
        $("#jqxRadioMvAliasManager").jqxRadioButton({height: 25, theme: 'metrodark'});
        $("#jqxRadioDeleteAliasManager").jqxRadioButton({height: 25, theme: 'metrodark'});

        $("#jqxRadioCreateAliasManager").on('change', function (event) {
            if (event.args.checked) {
                $("#create_alias_manager").show();
                $("#mv_alias_manager").hide();
                $("#delete_alias_manager").hide();
                $scope.clearData();
                $scope.aliasEditor.setValue($scope.createDefaultJson);
            }
        });

        $("#jqxRadioMvAliasManager").on('change', function (event) {
            if (event.args.checked) {
                $scope.loadAliases();
                $("#create_alias_manager").hide();
                $("#mv_alias_manager").show();
                $("#delete_alias_manager").hide();
                $scope.clearData();
                $scope.aliasEditor.setValue($scope.mvDefaultJson);
            }
        });
        $("#jqxRadioDeleteAliasManager").on('change', function (event) {
            if (event.args.checked) {
                $scope.loadAliases();
                $("#create_alias_manager").hide();
                $("#mv_alias_manager").hide();
                $("#delete_alias_manager").show();
                $scope.clearData();
                $scope.aliasEditor.setValue($scope.delDefaultJson);
            }
        });
    }

    $scope.clearData = function(){
        $scope.fromAliasName="";
        $scope.fromAliasIndexName = "";
        $scope.allAlias=[];
        $("#alias-index-combobox").val("");
        $("#aliasName").val("");
        $("#to_alias-index-combobox").val("");
        $scope.aliasEditor.setValue();
    };

    $scope.initializeController = function () {
        $scope.initEditorAliasManager();
        $scope.indexComboboxHandlerAliasManager();
        var indexNames = ElasticService.getAllIndicesNames();
        if(indexNames && indexNames.length > 1000){
            setTimeout(function() {
                $scope.initAliasHandle();
            },10);
        }else{
            $scope.initAliasHandle();
        }
        $scope.splitterHandlerAliasManager();
        $scope.radioHandlerAliasManager();
        $scope.loadAliases();
    };
  }
]);
