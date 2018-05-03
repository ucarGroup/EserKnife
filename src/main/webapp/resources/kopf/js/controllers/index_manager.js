kopf.controller('ManagerIndexController', ['$scope', '$location',
    'ExternalSettingsService', 'ElasticService', 'AlertService',
    'AceEditorService','ConfirmDialogService2','HostHistoryService','AppState','$http',
    function ($scope, $location, ExternalSettingsService, ElasticService,
              AlertService, AceEditorService,ConfirmDialogService2,HostHistoryService,AppState,$http) {

        ExternalSettingsService.setTheme("dark");
        $scope.selectJqxTabFlag = 0; // 0 创建，1 修改，2 删除，3 重建
        $scope.sqlColArr = [];
        $scope.selectedColArr = [];
        $scope.selectedColArrUpdate=[];
        $scope.sqlColArrUpadate = [];
        $scope.indexManagerAllNames = [];
        $scope.toolsMappings = [];
        $scope.managerEditor=undefined;
        $scope.re_field_types ="";
        $scope.re_field_type = "";
        $scope.re_field_new_index="";
        $scope.dsUpdateId="";
        $scope.shardCount = 5;
        $scope.replicasCount = 1;
        $scope.typeName = "";
        $scope.aliasName = "";
        $scope.indexName = "";
        $scope.updateTabName="";
        $scope.updateTypeName="";
        $scope.checkFlag = false;
        $scope.indexInitLoadFlag = false;

        $scope.initManagerIndex = function() {
            if(!angular.isDefined($scope.managerEditor)){
                $scope.managerEditor = AceEditorService.init('manager-editor','type_map_editor_actions','type_map_copy_as_curl');
            }
        };

        $scope.generate = function (strFlag) {
            if(strFlag && strFlag =="create"){
                if ($scope.tabName == '') {
                    AlertService.warn("选择表名");
                    $('#tabNameIndexManager').focus();
                    return;
                }
                if ($scope.selectedColArr.length == 0) {
                    AlertService.warn("点击表格中的行选择列名,可多选");
                    return;
                }
                initCreateData($scope);
            }else{
                initUpdateData($scope);
            }
        }

        $scope.clear = function (strFlag) {
            if(strFlag && strFlag =="create"){
                $('#dbcol-gridIndexManager').jqxGrid('clearselection');
                $scope.selectedColArr = [];
                initCreateData($scope);
            }else{
                $('#update_dbcol-gridIndexManager').jqxGrid('clearselection');
                $scope.selectedColArrUpdate = [];
                initUpdateData($scope);
            }
        }

        $scope.generateSqlArea = function (strFlag) {
            var all_ddls = "";
            if(strFlag && strFlag =="create"){
                all_ddls = $('#sqlAreaIndexManager').jqxTextArea('val');
            }else if(strFlag && strFlag =="update"){
                all_ddls = $('#update_sqlAreaIndexManager').jqxTextArea('val');
            }else{
                return;
            }

            ElasticService.clusterRequest3("/eserknife/indexmsg/parseSql",
                'POST',{
                    sql:all_ddls,
                    clusterName:clusterName
                },
                function (res) {
                    if (res && res.cols) {
                        for(var i = 0; i < res.cols.length ; i++){
                            var eachProp = $scope.buildProperties(res.tableName, res.cols[i].colname, res.cols[i].coltype);
                            if(strFlag && strFlag =="create"){
                                $scope.sqlColArr.push(eachProp);
                            }else{
                                $scope.sqlColArrUpadate.push(eachProp);
                            }
                        }
                        if(strFlag && strFlag =="create"){
                            initCreateData($scope);
                        }else{
                            initUpdateData($scope);
                        }
                    }
                }
            );
        }

        $scope.clearSqlArea = function (strFlag) {
            if(strFlag && strFlag=="create"){
                $scope.sqlColArr = [];
                $('#sqlAreaIndexManager').jqxTextArea('val', '');
                initCreateData($scope);
            }else{
                $scope.sqlColArrUpadate = [];
                $('#update_sqlAreaIndexManager').jqxTextArea('val', '');
                initUpdateData($scope);
            }
        }

        $scope.sqlType2EsType = function (colType) {
            if (colType.toLowerCase().indexOf("bigint") != -1) {
                return "long";
            } else if (colType.toLowerCase().indexOf("keyword") != -1) {
                return "keyword";
            } else if (colType.toLowerCase().indexOf("tinyint") != -1 || colType.toLowerCase().indexOf("smallint") != -1) {
                return "integer";
            } else if (colType.toLowerCase().indexOf("int") != -1) {
                return "integer";
            } else if (colType.toLowerCase().indexOf("varchar") != -1 || colType.toLowerCase().indexOf("char") != -1 || colType.toLowerCase() == 'text') {
                return "string";
            } else if (colType.toLowerCase().indexOf("decimal") != -1 || colType.toLowerCase().indexOf("double") != -1) {
                return "double";
            } else if (colType.toLowerCase().indexOf("datetime") != -1 || colType.toLowerCase().indexOf("timestamp") != -1 || colType.toLowerCase().indexOf("date") != -1) {
                return "date";
            } else {
                return "不支持的类型";
            }
        }

        $scope.buildProperties = function (tabName, colName, colType) {
            var esType = $scope.sqlType2EsType(colType);
            var col = tabName + "|" + colName;
            if (esType == 'string') {
                return '"' + col + '": {"type": "string","index": "not_analyzed"}';
            } else if(esType =='keyword'){
                return '"' + col + '": {"type": "keyword"}';
            }else if (esType == 'date') {
                return '"' + col + '": {"type": "date","format": "yyyy-MM-dd HH:mm:ss"}';
            } else if (esType == 'integer' || esType == 'long' || esType == 'double' || esType == 'byte') {
                return '"' + col + '": {"type": "' + esType + '"}';
            } else {
                return "不支持的类型";
            }
        }


        $scope.sqlAreaHandlerNew = function ($scope) {
            var quotes = [];
            quotes.push('alter table 表名 add column 列名 varchar(30);');
            quotes.push('alter table 表名 add column 列名 int(11);');

            $('#sqlAreaIndexManager').jqxTextArea({
                theme: "metrodark", height: 200, width: '100%', minLength: 1, source: quotes,
                placeHolder: '将 CREATE 或 ALTER SQL语句粘贴到这里'
            });
            $('#update_sqlAreaIndexManager').jqxTextArea({
                theme: "metrodark", height: 200, width: '100%', minLength: 1, source: quotes,
                placeHolder: '将 CREATE 或 ALTER SQL语句粘贴到这里'
            });

            $scope.showHelp = function () {
                $scope.showHelpText = !$scope.showHelpText;
            }
        };

        $scope.format = function(){
            $scope.managerEditor.format();
        };




        $scope.createIndexManager = function(){
            ConfirmDialogService2.open(
                '操作',
                '确认按照当前条件 <span style="font-size: 20px;color: #fb4e0b">执行</span> 对索引的操作吗?',
                '执行',
                function () {
                    $scope.execute();
                },
                function(){
                    $("#confirm_dialog2").hide();
                }
            );
        };

        $scope.execute = function(){
            $scope.managerEditor.getValue(function(data) {
                var method = data[0].method;
                var url = data[0].url;
                var body = data[0].data;
                if(body){
                    if (!isDefined($scope.managerEditor.error)) {
                        var params={"clusterName":clusterName,"data":body,"url":url,"method":method};
                        ElasticService.clusterRequest2("/eserknife/indexmsg/indexManager" +
                            "", 'POST', {}, params, {},
                            function (res) {
                                $("#confirm_dialog2").hide();
                                if($scope.selectJqxTabFlag ===3){
                                    if(res.total > 0 ){
                                        AlertService.success("重建索引成功！");
                                    }else{
                                        AlertService.warn("原索引字段无数据，重建无意义！");
                                    }
                                }else {
                                    if (res && res.acknowledged) {
                                        $scope.re_field_types ="";
                                        $scope.re_field_type = "";
                                        $scope.re_field_new_index="";
                                        $scope.dsUpdateId="";
                                        $scope.shardCount = 5;
                                        $scope.replicasCount = 1;
                                        $scope.typeName = "";
                                        $scope.aliasName = "";
                                        $scope.indexName = "";
                                        $scope.updateTabName="";
                                        $scope.updateTypeName="";
                                        $("#update-manager-index-com-box").jqxComboBox('clear');
                                        $("#del-manager-index-com-box").jqxComboBox('clear');
                                        $("#re-manager-index-com-box").jqxComboBox('clear');
                                        $scope.indexManagerAllNames=[];
                                        AlertService.success('操作成功',res);
                                    }else{
                                        AlertService.error('操作失败',res);
                                    }
                                }
                            });
                    }
                }
            });
        }

        $scope.loadDataSources = function(){
            ElasticService.clusterRequest2("/eserknife/indexmsg/getDataSource",
                'GET', "", {}, {},
                function (res) {
                    if (res) {
                        $scope.ds_names = res.result;
                        $scope.update_ds_names = res.result;
                    }
                }
            );
        }

        $scope.loadTabNames = function (dsId) {
            ElasticService.clusterRequest2("/eserknife/indexmsg/getTabNamesByDs?dsId=" + dsId,
                'GET', "", {}, {},
                function (res) {
                    if (res) {
                        $scope.tabs = res.result;
                        $scope.updateTabs = res.result;
                    }
                }
            );
        };

        $scope.splitterHandlerNew = function() {
            $('#typeTools').jqxSplitter({
                width: '100%',
                height: 700,
                theme: 'metrodark',
                panels: [{size: '50%', collapsible: false}, {collapsed: false}]
            });
        };


        $scope.getIndexDatas = function() {
            $scope.$watch(
                function () {
                    return ElasticService.cluster;
                },
                function (filter, previous) {
                    if (!ElasticService.cluster) return;
                    if ($scope.indexManagerAllNames.length == 0) {
                        var indexNames = ElasticService.getAllIndicesNames();
                        $scope.indexManagerAllNames= indexNames;
                        $("#update-manager-index-com-box").jqxComboBox({source:indexNames});
                        $("#del-manager-index-com-box").jqxComboBox({source:indexNames});
                        $("#re-manager-index-com-box").jqxComboBox({source:indexNames});
                        return;
                   }
                },
                true
            );
            $("#update-manager-index-com-box").jqxComboBox({
                height:30,
                width:300,
                theme: 'metrodark',
                searchMode: 'contains',
                autoComplete: true,
                placeHolder:'选择索引',
                source: $scope.indexManagerAllNames
            });

            $("#del-manager-index-com-box").jqxComboBox({
                height:30,
                width:300,
                theme: 'metrodark',
                searchMode: 'contains',
                autoComplete: true,
                placeHolder:'选择索引',
                source: $scope.indexManagerAllNames
            });

            $("#re-manager-index-com-box").jqxComboBox({
                height:30,
                width:300,
                theme: 'metrodark',
                searchMode: 'contains',
                autoComplete: true,
                placeHolder:'选择索引',
                source: $scope.indexManagerAllNames
            });

            /**
             * 索引选择框发生变化,级联更新数据
             */
            $("#re-manager-index-com-box").on('change', function (event) {
                if (event.args) {
                    var item = event.args.item;
                    var value = item.value;
                    if (isDefined(value)) {
                        $scope.loadReManagerIndexTypes(value);
                        $scope.re_field_manager_index = value;
                    }
                }
            });

            $("#update-manager-index-com-box").on('change', function (event) {
                if (event.args) {
                    var item = event.args.item;
                    var value = item.value;
                    if (isDefined(value)) {
                        $scope.loadReManagerIndexUpdateTypes(value);
                        $scope.update_field_index = value;
                    }
                }
            });

            $("#newTypeCheck").on('change', function (event) {
                if ($("#newTypeCheck").is(':checked')) {
                    $("#update_field_type").hide();
                    $("#updateTypeName").show();
                    $scope.checkFlag = true;
                    initUpdateData($scope);
                }else{
                    $("#updateTypeName").hide();
                    $("#update_field_type").show();
                    $scope.checkFlag = false;
                    initUpdateData($scope);
                }
            });

        };

        $('#indexManagerJqxTabs').on('selected', function (event){
            $scope.selectJqxTabFlag = event.args.item;
            if( $scope.selectJqxTabFlag === 1){
                $("#jqxRadioUpdateToolsManager").jqxRadioButton({height: 25, theme: 'metrodark', checked: true});
                $("#jqxRadioUpdateSqlIndexManager").jqxRadioButton({height: 25, theme: 'metrodark'});
                $("#jqxRadioUpdateDBIndexManager").jqxRadioButton({height: 25, theme: 'metrodark'});
                loadUpdateEvent($scope);
                initUpdateData($scope);
            }else if( $scope.selectJqxTabFlag === 0){
                $("#jqxRadioToolsManager").jqxRadioButton({height: 25, theme: 'metrodark', checked: true});
                $("#jqxRadioSqlIndexManager").jqxRadioButton({height: 25, theme: 'metrodark'});
                $("#jqxRadioDBIndexManager").jqxRadioButton({height: 25, theme: 'metrodark'});
                loadCreateEvent($scope);
                initCreateData($scope);
            }else if($scope.selectJqxTabFlag === 2){
                initDelData($scope);
            }else if($scope.selectJqxTabFlag === 3){
                initReData($scope);
            }
        });


        $('#del-manager-index-com-box').on('change',function(event){
            var args = event.args;
            $scope.delValue= args.item.value;
            initDelData($scope);
        });

        $scope.loadReManagerIndexTypes = function (index) {
            $scope.re_field_type = '';
            if (notEmpty(index)) {
                ElasticService.getIndexMetadata(index,
                    function (metadata) {
                        $scope.re_field_index_metadata = metadata;
                        $scope.re_field_types = metadata.getTypes();
                        $scope.re_field_type = $scope.re_field_types[0];
                        initReData($scope);
                    },
                    function (error) {
                        $scope.re_field_manager_index = '';
                        AlertService.error('Error loading index types', error);
                    }
                );
            }
        };

        $scope.loadReManagerIndexUpdateTypes = function (index) {
            $scope.update_field_type = '';
            if (notEmpty(index)) {
                ElasticService.getIndexMetadata(index,
                    function (metadata) {
                        $scope.update_field_index_metadata = metadata;
                        $scope.update_field_types = metadata.getTypes();
                        $scope.update_field_type = $scope.update_field_types[0];
                        initUpdateData($scope);
                    },
                    function (error) {
                        $scope.update_field_index = '';
                        AlertService.error('Error loading index types', error);
                    }
                );
            }
        };


        $scope.$watch('re_field_type', function (current, previous) {
            if (isDefined(current)) {
                if ('' == current) {
                    return;
                }
                initReData($scope);
            }
        });

        $scope.$watch('re_field_new_index', function (current, previous) {
            if (isDefined(current)) {
                if ('' == current) {
                    return;
                }
                initReData($scope);
            }
        });


        $scope.$watch('indexName', function (current, previous) {
            if (isDefined(current)) {
                initCreateData($scope);
            }
        });

        $scope.$watch('typeName', function (current, previous) {
            if (isDefined(current)) {
                initCreateData($scope);
            }
        });
        $scope.$watch('shardCount', function (current, previous) {
            if (isDefined(current)) {
                initCreateData($scope);
            }
        });
        $scope.$watch('replicasCount', function (current, previous) {
            if (isDefined(current)) {
                initCreateData($scope);
            }
        });
        $scope.$watch('aliasName', function (current, previous) {
            if (isDefined(current)) {
                initCreateData($scope);
            }
        });

        $scope.$watch('update_field_type', function (current, previous) {
            if (isDefined(current)) {
                if(!$scope.checkFlag){
                    initUpdateData($scope);
                }
            }
        });

        $scope.$watch('updateTypeName', function (current, previous) {
            if (isDefined(current)) {
                if($scope.checkFlag){
                    initUpdateData($scope);
                }
            }
        });

        $scope.initializeController = function() {
            $('#indexManagerJqxTabs').jqxTabs({ height: '100%', position: 'top',theme: "metrodark"});
            setTimeout(function(){
                $scope.getIndexDatas();
            },10);
            $scope.initManagerIndex();
            $scope.loadDataSources();
            radioHandlerNew($scope);
            $scope.sqlAreaHandlerNew($scope);
            db_table_handlerNew($scope, $location);
            db_column_handlerNew($scope, $location);
            db_table_handler_update($scope, $location);
            db_column_handler_update($scope, $location);
            $scope.splitterHandlerNew();
        };
    }
]);

function radioHandlerNew($scope) {
    $("#jqxRadioSqlIndexManager").jqxRadioButton({height: 25, theme: 'metrodark'});
    $("#jqxRadioDBIndexManager").jqxRadioButton({height: 25, theme: 'metrodark'});
    $("#jqxRadioToolsManager").jqxRadioButton({height: 25, theme: 'metrodark', checked: true});
    loadCreateEvent($scope);
};

function loadCreateEvent($scope){
    $("#jqxRadioToolsManager").on('change', function (event) {
        if (event.args.checked) {
            $("#tools_index_manager").show();
            $("#sql_viewIndexManager").hide();
            $("#col_viewIndexManager").hide();
            $scope.radioFlag = 0;
        }
    });
    $("#jqxRadioSqlIndexManager").on('change', function (event) {
        if (event.args.checked) {
            $("#tools_index_manager").hide();
            $("#sql_viewIndexManager").show();
            $("#col_viewIndexManager").hide();
            $scope.radioFlag = 1;
        }
    });
    $("#jqxRadioDBIndexManager").on('change', function (event) {
        if (event.args.checked) {
            $("#tools_index_manager").hide();
            $("#col_viewIndexManager").show();
            $("#sql_viewIndexManager").hide();
            $scope.radioFlag = 2;
        }
    });
    $("#noAnalysisTools").on('click', function (event) {
        addMapping($scope,"noAnalysis");
    });
    $("#analysisTools").on('click', function (event) {
        addMapping($scope,"analysis");
    });
    $("#dateTools").on('click', function (event) {
        addMapping($scope,"date");
    });
    $("#intTools").on('click', function (event) {
        addMapping($scope,"int");
    });
    $("#longTools").on('click', function (event) {
        addMapping($scope,"long");
    });
}

function loadUpdateEvent($scope){
    $("#jqxRadioUpdateToolsManager").on('change', function (event) {
        if (event.args.checked) {
            $("#update_tools_index_manager").show();
            $("#update_sql_viewIndexManager").hide();
            $("#update_col_viewIndexManager").hide();
            $scope.radioUpdateFlag = 1;
        }
    });

    $("#jqxRadioUpdateSqlIndexManager").on('change', function (event) {
        if (event.args.checked) {
            $("#update_tools_index_manager").hide();
            $("#update_sql_viewIndexManager").show();
            $("#update_col_viewIndexManager").hide();
            $scope.radioUpdateFlag = 1;
        }
    });

    $("#jqxRadioUpdateDBIndexManager").on('change', function (event) {
        if (event.args.checked) {
            $("#update_tools_index_manager").hide();
            $("#update_col_viewIndexManager").show();
            $("#update_sql_viewIndexManager").hide()
            $scope.radioUpdateFlag = 2;
        }
    });

    $("#noAnalysisUpdateTools").on('click', function (event) {
        addMapping($scope,"noAnalysis");
    });
    $("#analysisUpdateTools").on('click', function (event) {
        addMapping($scope,"analysis");
    });
    $("#dateUpdateTools").on('click', function (event) {
        addMapping($scope,"date");
    });
    $("#intUpdateTools").on('click', function (event) {
        addMapping($scope,"int");
    });
    $("#longUpdateTools").on('click', function (event) {
        addMapping($scope,"long");
    });

}

function db_table_handlerNew($scope, $location) {
    $scope.$watch('dsnameIndexManager', function (current, previous) {
        if (isDefined(current)) {
            $scope.dsId = current;
            $scope.loadTabNames(current);
        }
    });
    $scope.$watch('tabNameIndexManager', function (current, previous) {
        if (isDefined(current)) {
            $scope.source.url = 'http://' + $location.$$host + ':' + $location.$$port
                + '/eserknife/indexmsg/getColInfoByTabname?dsId='+$scope.dsId+'&tabName=' + $scope.tabNameIndexManager+'&clusterName='+clusterName;
            $('#dbcol-gridIndexManager').jqxGrid('clearselection');
            $('#dbcol-gridIndexManager').jqxGrid('updatebounddata');
        }
    });
}

function db_table_handler_update($scope, $location) {
    $scope.$watch('updateDsnameIndexManager', function (current, previous) {
        if (isDefined(current)) {
            $scope.dsUpdateId = current;
            $scope.loadTabNames(current);
        }
    });
    $scope.$watch('updateTabName', function (current, previous) {
        if (isDefined(current)) {
            $scope.updateSource.url = 'http://' + $location.$$host + ':' + $location.$$port
                + '/eserknife/indexmsg/getColInfoByTabname?dsId='+$scope.dsUpdateId+'&tabName='
                + $scope.updateTabName+'&clusterName='+clusterName;

            $('#update_dbcol-gridIndexManager').jqxGrid('clearselection');
            $('#update_dbcol-gridIndexManager').jqxGrid('updatebounddata');
        }
    });

}


function db_column_handler_update($scope, $location) {
    $scope.updateUrl = 'http://' + $location.$$host + ':' + $location.$$port
        + '/eserknife/indexmsg/getColInfoByTabname?dsId='+(isDefined($scope.dsUpdateId)?$scope.dsUpdateId:"")+
        '&tabName=' + (isDefined($scope.updateTabName)?$scope.updateTabName:"")+'&clusterName='+clusterName;
    $scope.updateSource = {
        datatype: "json",
        datafields: [
            {name: 'db_colname', type: 'string'},
            {name: 'db_colname_def', type: 'string'}
        ],
        url: $scope.updateUrl,
        beforeprocessing: function (data) {
            if (data != null && data.dbColNames != null) {
                $scope.updateSource.records = data.dbColNames;
            }
        }
    };
    var dataAdapter = new $.jqx.dataAdapter($scope.updateSource);
    $("#update_dbcol-gridIndexManager").jqxGrid({
        width: '100%',
        height: 360,
        source: dataAdapter,
        showfilterrow: true,
        filterable: true,
        theme: 'metrodark',
        selectionmode: "multiplerows",
        columns: [
            {
                text: '列名',
                datafield: 'db_colname',
                columntype: 'textbox',
                filtercondition: 'contains',
                width: '100%',
                cellsalign: 'left',
                align: 'left',
                cellclassname: 'enter'
            },
            {text: '定义', datafield: 'db_colname_def', hidden: true}
        ]
    });


    $('#update_dbcol-gridIndexManager').on('rowunselect', function (event) {
        var tabName = $scope.updateTabName;
        var colName = event.args.row.db_colname;
        var colType = event.args.row.db_colname_def;
        $scope.selectedColArrUpdate.remove($scope.buildProperties(tabName, colName, colType));
    });

    $('#update_dbcol-gridIndexManager').on('rowselect', function (event) {
        var tabName = $scope.updateTabName;
        var colName = event.args.row.db_colname;
        var colType = event.args.row.db_colname_def;
        $scope.selectedColArrUpdate.push($scope.buildProperties(tabName, colName, colType));
    });
}

function db_column_handlerNew($scope, $location) {
    $scope.dataurl = 'http://' + $location.$$host + ':' + $location.$$port
        + '/eserknife/indexmsg/getColInfoByTabname?dsId='+(isDefined($scope.dsId)?$scope.dsId:"")+
    '&tabName=' + (isDefined($scope.tabNameIndexManager)?$scope.tabNameIndexManager:"")+'&clusterName='+clusterName;
    $scope.source = {
        datatype: "json",
        datafields: [
            {name: 'db_colname', type: 'string'},
            {name: 'db_colname_def', type: 'string'}
        ],
        url: $scope.dataurl,
        beforeprocessing: function (data) {
            if (data != null && data.dbColNames != null) {
                $scope.source.records = data.dbColNames;
            }
        }
    };

    var dataAdapter = new $.jqx.dataAdapter($scope.source);

    $("#dbcol-gridIndexManager").jqxGrid({
        width: '100%',
        height: 250,
        source: dataAdapter,
        showfilterrow: true,
        filterable: true,
        theme: 'metrodark',
        selectionmode: "multiplerows",
        columns: [
            {
                text: '列名',
                datafield: 'db_colname',
                columntype: 'textbox',
                filtercondition: 'contains',
                width: '100%',
                cellsalign: 'left',
                align: 'left',
                cellclassname: 'enter'
            },
            {text: '定义', datafield: 'db_colname_def', hidden: true}
        ]
    });

    $('#dbcol-gridIndexManager').on('rowunselect', function (event) {
        var tabName = $scope.tabNameIndexManager;
        var colName = event.args.row.db_colname;
        var colType = event.args.row.db_colname_def;
        $scope.selectedColArr.remove($scope.buildProperties(tabName, colName, colType));
    });

    $('#dbcol-gridIndexManager').on('rowselect', function (event) {
        var tabName = $scope.tabNameIndexManager;
        var colName = event.args.row.db_colname;
        var colType = event.args.row.db_colname_def;
        $scope.selectedColArr.push($scope.buildProperties(tabName, colName, colType));
    });

}

function initReData($scope){
    var str = 'POST /_reindex\n' +
        '{\n' +
        '  "source":  {\n' +
        '     "index": "' +  (isDefined($scope.re_field_manager_index)?$scope.re_field_manager_index:"") + '",\n' +
        '     "type": "' +   (isDefined($scope.re_field_type)?$scope.re_field_type:"") + '"\n' +
        '    },\n' +
        '  "dest": {\n' +
        '     "index": "' + (isDefined($scope.re_field_new_index)?$scope.re_field_new_index:"") +'"\n' +
        '    }\n' +
        '}';
    $scope.managerEditor.setValue(str);
}

function initCreateData($scope){
    var mappingDatas =  $scope.sqlColArr.join(",")
    if($scope.radioFlag === 2){
        mappingDatas=  $scope.selectedColArr.join(",")
    }
    var str = '{\n' +
        '  "settings":  {\n' +
        '     "number_of_shards": "' +  $scope.shardCount + '",\n' +
        '     "number_of_replicas": "' +   $scope.replicasCount + '"\n' +
        '    }';
    if($scope.typeName || mappingDatas){
        str +=',\n' +
            '  "mappings": {\n' +
            '     "'+$scope.typeName+'": {\n' +
            '           "properties" : {\n'+
                            mappingDatas +
            '            }\n' +
            '        }\n' +
            '    }';
    }
    if($scope.aliasName){
        str +=',\n' +
            '  "aliases": {\n' +
            '     "'+$scope.aliasName+'": {\n' +
            '        }\n' +
            '    }';
    }
    str +='\n}';
    $scope.managerEditor.setValue('PUT '+$scope.indexName+'\n' +formatJson(str));
}

function initUpdateData($scope){
    var mappingDatas =  $scope.sqlColArrUpadate.join(",")
    if($scope.radioUpdateFlag === 2){
        mappingDatas=  $scope.selectedColArrUpdate.join(",")
    }
    var str='{\n' +
        '      "properties" : {\n'+
                    mappingDatas +
        '      }\n' +
        '}';
    var typeName =(isDefined($scope.update_field_type)?$scope.update_field_type:"");
    if($scope.checkFlag){
        typeName =  $scope.updateTypeName;
    }
    $scope.managerEditor.setValue('PUT '+(isDefined($scope.update_field_index)?$scope.update_field_index:"")
            +'/_mapping/'+typeName+'\n' +formatJson(str));
}

function initDelData($scope){
    $scope.managerEditor.setValue('DELETE /'+(isDefined($scope.delValue)?$scope.delValue:""));
}

function getItemOtherName(str){
    var s=null;
    if(str == "noAnalysis"){
        s= "NOANALYSISCOL";
    }else if(str=="analysis"){
        s= "ANALYSISCOL";
    }else if(str=="date"){
        s= "DATECOL";
    }else if(str=="int"){
        s= "INTCOL";
    }else if(str=="long"){
        s= "LONGCOL";
    }
    return s;
}

function addMapping($scope,str){
    $scope.managerEditor.getValue(function(data) {
        var jsonStr;
        var body = data[0].data;
        var properties;
        var mm =[];
        var flag = false;
        if(body){
            if($scope.selectJqxTabFlag ===0){//新建
                var mappings =  JSON.parse(body).mappings;
                if(mappings){
                    for(var item in mappings){
                        properties = mappings[item].properties;
                        break;
                    }
                }
            }else if($scope.selectJqxTabFlag ===1) {//修改
                properties = JSON.parse(body).properties;
            }
            if(properties){
                for(var item in properties){
                    mm.push('"'+item+'":'+ JSON.stringify(properties[item]));
                    if(getItemOtherName(str) == item){
                        flag = true;
                    }
                }
            }
        }
        if(!flag){
            if(str == "noAnalysis"){
                if(versionFirst >=5){
                    jsonStr= '"NOANALYSISCOL": {"type": "text","index": "not_analyzed"}';
                }else{
                    jsonStr= '"NOANALYSISCOL": {"type": "string","index": "not_analyzed"}';
                }
            }else if(str=="analysis"){
                if(versionFirst >=5){
                    jsonStr= '"ANALYSISCOL": {"type": "text","index": "analyzed"}';
                }else{
                    jsonStr= '"ANALYSISCOL": {"type": "string","index": "analyzed"}';
                }
            }else if(str=="date"){
                jsonStr= '"DATECOL": {"type": "date","format": "yyyy-MM-dd HH:mm:ss"}';
            }else if(str=="int"){
                jsonStr= '"INTCOL": {"type": "integer"}';
            }else if(str=="long"){
                jsonStr= '"LONGCOL": {"type": "long"}';
            }
            mm.push(jsonStr);
        }else{
            return;
        }
        if($scope.selectJqxTabFlag ===0){//新建
            upDateCreateData($scope,mm.join(","));
        }else if($scope.selectJqxTabFlag ===1){//修改
            reLoadUpdateData($scope,mm.join(","));
        }
    });

}


function upDateCreateData($scope,mappingDatas){
    var str = '{\n' +
        '  "settings":  {\n' +
        '     "number_of_shards": "' +  $scope.shardCount + '",\n' +
        '     "number_of_replicas": "' +   $scope.replicasCount + '"\n' +
        '    }';
    if($scope.typeName || mappingDatas){
        str +=',\n' +
            '  "mappings": {\n' +
            '     "'+$scope.typeName+'": {\n' +
            '           "properties" : {\n'+
            mappingDatas +
            '            }\n' +
            '        }\n' +
            '    }';
    }
    if($scope.aliasName){
        str +=',\n' +
            '  "aliases": {\n' +
            '     "'+$scope.aliasName+'": {\n' +
            '        }\n' +
            '    }';
    }
    str +='\n}';
    $scope.managerEditor.setValue('PUT '+$scope.indexName+'\n' +formatJson(str));
}

function reLoadUpdateData($scope,mappingDatas){
    var str='{\n' +
        '      "properties" : {\n'+
                    mappingDatas +
        '      }\n' +
        '}';
    var typeName =(isDefined($scope.update_field_type)?$scope.update_field_type:"");
    if($scope.checkFlag){
        typeName =  $scope.updateTypeName;
    }
    $scope.managerEditor.setValue(' PUT '+(isDefined($scope.update_field_index)?$scope.update_field_index:"")
        +'/_mapping/'+typeName+'\n' +formatJson(str));
}
