kopf.controller('UpdateMappingController', ['$scope', '$location','$timeout',
    'ExternalSettingsService', 'ElasticService', 'AlertService',
    'AceEditorService','ConfirmDialogService','ConfirmDialogService2','AppState',
    function ($scope, $location,$timeout, ExternalSettingsService, ElasticService,
              AlertService, AceEditorService,ConfirmDialogService,ConfirmDialogService2,AppState) {

        ExternalSettingsService.setTheme("dark");
        $scope.indexNames = [];

        $scope.field_types = "";
        $scope.field_type = "";
        $scope.ds_names = [{name:"test1"}];
        $scope.dsId = '';

        $scope.tabs=[];
        $scope.tabName = "";

        $scope.opsjs = '';
        $scope.selectedColArr = [];
        $scope.sqlColArr = [];
        $scope.showHelpText = true;


        setTimeout(function(){

            initUpdataMapHandle($scope, ElasticService,AppState);

            loadDataSources($scope, ElasticService);
            indexUpdateMapComboboxHandler($scope, $timeout);
            typeHandler($scope, ElasticService, AlertService);
            editorHandler($scope, AceEditorService);

            radioHandler();

            sqlAreaHandler($scope);

            db_table_handler($scope, $location, ElasticService);
            db_column_handler($scope, $location);

            submitActionHandler($scope, ElasticService, AlertService, ConfirmDialogService2);
            toolActionHandler($scope, AlertService,ElasticService);

            splitterHandler();






        },10);
    }]
);
function initUpdataMapHandle($scope, ElasticService,AppState) {
    $scope.$watch(
        function () {
            return ElasticService.cluster;
        },
        function (filter, previous) {
            if (!ElasticService.cluster) return;
            if ($scope.indexNames.length == 0) {
                ElasticService.getIndices().forEach(function (eachIndex) {
                    $scope.indexNames.push(eachIndex.name);
                    $("#update-index-combobox").jqxComboBox('addItem', eachIndex.name);
                });
                return;
            }
        },
        true
    );

    //处理参数传递
    var selectedIndex = AppState.getProperty("ClusterOverview","selectedIndex","");
    $scope.field_index = selectedIndex != "" ? selectedIndex : "";
    console.log("1>>>"+$scope.field_index);
    AppState.setProperty("ClusterOverview","selectedIndex","");



}
function indexUpdateMapComboboxHandler($scope, $timeout) {
    $("#update-index-combobox").jqxComboBox({
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
    $("#update-index-combobox").on('change', function (event) {
        if (event.args) {
            var item = event.args.item;
            var value = item.value;
            if (isDefined(value)) {
                $scope.loadIndexTypes(value);
                $scope.field_index = value;
                $scope.ops_head = "PUT  /" + $scope.field_index + "/" + $scope.field_type + "/_mapping";
            }
        }
    });

    $timeout(function () {
        if ($scope.field_index && $scope.field_index != "") {
            $("#update-index-combobox").val($scope.field_index);
        }
    },1000);
}

function loadDataSources($scope,ElasticService){
    ElasticService.clusterRequest2("/eserknife/indexmsg/getDataSource",
        'GET', "", {}, {},
        function (res) {
            if (res) {
                $scope.ds_names = res.result;
            }
        }
    );
}

function typeHandler($scope, ElasticService, AlertService) {
    $scope.$watch('field_type', function (current, previous) {
        if (isDefined(current)) {

            $scope.ops_head = "PUT  /" + $scope.field_index + "/" + $scope.field_type + "/_mapping";

            var content = $.trim($scope.editor.getValue());
            //如果是初始值,直接赋值
            if ('' == current) {
                return;
            }
            var mappingJson = '{"' + current + '":{"dynamic": "strict","properties": {}}}';
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
function db_table_handler($scope, $location, ElasticService) {
    $scope.$watch('dsname', function (current, previous) {
        if (isDefined(current)) {
            $scope.dsId = current;
            $scope.loadTabNames(current);
        }
    });



    $scope.$watch('tabName', function (current, previous) {
        if (isDefined(current)) {
            $scope.source.url = 'http://' + $location.$$host + ':' + $location.$$port
                + '/eserknife/indexmsg/getColInfoByTabname?dsId='+$scope.dsId+'&tabName=' + $scope.tabName+'&clusterName='+clusterName;
            $('#dbcol-grid').jqxGrid('clearselection');
            $('#dbcol-grid').jqxGrid('updatebounddata');
        }
    });


    $scope.loadTabNames = function (ds) {

        ElasticService.clusterRequest2("/eserknife/indexmsg/getTabNamesByDs?dsId=" + $scope.dsId,
            'GET', "", {}, {},
            function (res) {
                if (res) {
                    $scope.tabs = res.result;
                }
            }
        );
    };
}
function db_column_handler($scope, $location) {
    $scope.dataurl = 'http://' + $location.$$host + ':' + $location.$$port
        + '/eserknife/indexmsg/getColInfoByTabname?dsId='+$scope.dsId+'&tabName=' + $scope.tabName+'&clusterName='+clusterName;

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

    $("#dbcol-grid").jqxGrid({
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

    $('#dbcol-grid').on('rowunselect', function (event) {
        var tabName = $scope.tabName;
        var colName = event.args.row.db_colname;
        var colType = event.args.row.db_colname_def;
        $scope.selectedColArr.remove($scope.buildProperties(tabName, colName, colType));
    });

    $('#dbcol-grid').on('rowselect', function (event) {
        var tabName = $scope.tabName;
        var colName = event.args.row.db_colname;
        var colType = event.args.row.db_colname_def;
        $scope.selectedColArr.push($scope.buildProperties(tabName, colName, colType));
    });
}
function toolActionHandler($scope, AlertService,ElasticService) {
    $scope.generate = function () {
        if ($scope.tabName == '') {
            AlertService.warn("选择表名");
            $('#tabName').focus();
            return;
        }
        if ($scope.selectedColArr.length == 0) {
            AlertService.warn("点击表格中的行选择列名,可多选");
            return;
        }
        $scope.editor.setValue('{"' + $scope.field_type + '":{"dynamic": "strict","properties": {' + $scope.selectedColArr.join(",") + '}}}');
        $scope.editor.format();
    }

    $scope.clear = function () {
        $('#dbcol-grid').jqxGrid('clearselection');
        $scope.selectedColArr = [];
    }

    $scope.generateSqlArea = function () {
        var all_ddls = $('#sqlArea').jqxTextArea('val');

        ElasticService.clusterRequest3("/eserknife/indexmsg/parseSql",
            'POST',{
                sql:all_ddls,
                clusterName:clusterName
            },
            function (res) {
                if (res) {
                    for(var i = 0; i < res.cols.length ; i++){
                        var eachProp = $scope.buildProperties(res.tableName, res.cols[i].colname, res.cols[i].coltype);
                        $scope.sqlColArr.push(eachProp);
                    }
                    $scope.editor.setValue('{"' + $scope.field_type + '":{"dynamic": "strict","properties": {' + $scope.sqlColArr.join(",") + '}}}');
                    $scope.editor.format();
                }
            }
        );
    }

    $scope.clearSqlArea = function () {
        $scope.sqlColArr = [];
        $('#sqlArea').jqxTextArea('val', '');
        $scope.editor.setValue('{}');
    }

    $scope.buildProperties = function (tabName, colName, colType) {
        var esType = $scope.sqlType2EsType(colType);
        var col = tabName + "|" + colName;
        if (esType == 'string') {
            return '"' + col + '": {"type": "string","index": "not_analyzed"}';
        } else if (esType == 'date') {
            return '"' + col + '": {"type": "date","format": "yyyy-MM-dd HH:mm:ss"}';
        } else if (esType == 'integer' || esType == 'long' || esType == 'double' || esType == 'byte') {
            return '"' + col + '": {"type": "' + esType + '"}';
        } else {
            return "不支持的类型";
        }
    }

    $scope.sqlType2EsType = function (colType) {
        if (colType.toLowerCase().indexOf("bigint") != -1) {
            return "long";
        } else if (colType.toLowerCase().indexOf("tinyint") != -1 || colType.toLowerCase().indexOf("smallint") != -1) {
            return "integer";
        } else if (colType.toLowerCase().indexOf("int") != -1) {
            return "integer";
        } else if (colType.toLowerCase().indexOf("varchar") != -1 || colType.toLowerCase().indexOf("char") != -1 || colType == 'text') {
            return "string";
        } else if (colType.toLowerCase().indexOf("decimal") != -1 || colType.toLowerCase().indexOf("double") != -1) {
            return "double";
        } else if (colType.toLowerCase().indexOf("datetime") != -1 || colType.toLowerCase().indexOf("timestamp") != -1 || colType.toLowerCase().indexOf("date") != -1) {
            return "date";
        } else {
            return "不支持的类型";
        }
    }
}
function submitActionHandler($scope, ElasticService, AlertService, ConfirmDialogService2) {
    $scope.updateIndex = function () {
        var params = {
            clusterName: clusterName,
            indexName: $scope.field_index,
            typeName: $scope.field_type,
            newColsJson: $scope.submitJsonBody
        };
        ElasticService.clusterRequest2("/eserknife/indexmsg/addNewCols",
            'POST',
            "",
            params,
            {},
            function (res) {
                if (!res) {
                    AlertService.error("服务端响应对象为空!");
                    return;
                }
                if (res.code) {
                    AlertService.success(res.sucMsg);

                    $scope.field_type = '';
                    $("#update-index-combobox").val('');
                    $scope.editor.setValue('{}');

                    //工具区域
                    $scope.clear();
                    $scope.clearSqlArea();
                    $scope.tabName = '';
                    $('#dbcol-grid').jqxGrid('clear');

                } else {
                    AlertService.error(res.errMsg);
                }
            },
            function (res) {
                AlertService.error(res);
            }
        );
    }

    $scope.promptUpdateIndex = function () {

        if ($.trim($scope.field_index).length == 0) {
            AlertService.warn('索引名不能为空');
            return;
        }

        var content = $.trim($scope.editor.getValue());
        if (content.length == 0 || content.length == '{}') {
            AlertService.warn('请填入字段定义json串');
            return;
        }

        try {
            var json4Content = $.parseJSON(content);
            if (!json4Content[$scope.field_type].properties) {
                AlertService.warn('字段定义必须包含properties属性');
                return;
            }
            if ($.isEmptyObject(json4Content[$scope.field_type].properties)) {
                AlertService.warn('字段定义properties属性不能空,可以直接编辑或者通过辅助区自动产生');
                return;
            }
            $scope.submitJsonBody = JSON.stringify(json4Content[$scope.field_type])
        } catch (e) {
            AlertService.warn('字段定义必须是合法的json串');
            return;
        }

        $("#submitA").click();

        ConfirmDialogService2.open(
            '修改索引',
            '确认在索引  <span style="font-size: 20px;color: #be386a">' + $scope.field_index
            + '</span>,  类型  <span style="font-size: 20px;color: #B73766">' + $scope.field_type + '</span>  下添加新字段吗?',
            '修改',
            function () {
                $scope.updateIndex();
            }
        );
    };
}
function sqlAreaHandler($scope) {
    var quotes = [];
    quotes.push('alter table 表名 add column 列名 varchar(30);');
    quotes.push('alter table 表名 add column 列名 int(11);');

    $('#sqlArea').jqxTextArea({
        theme: "metrodark", height: 460, width: '100%', minLength: 1, source: quotes,
        placeHolder: '将 CREATE 或 ALTER SQL语句粘贴到这里'
    });

    $scope.showHelp = function () {
        $scope.showHelpText = !$scope.showHelpText;
    }
}
function editorHandler($scope, AceEditorService) {
    if (!isDefined($scope.editor)) {
        $scope.editor = AceEditorService.init('index-settings-editor');
        $scope.editor.setValue('{}');
    }
}
function radioHandler() {

    $('#mainSplitter').on('expanded',
        function (event) {
            $("#jqxRadioSql").jqxRadioButton({height: 25, theme: 'metrodark', checked: true});
            $("#jqxRadioDB").jqxRadioButton({height: 25, theme: 'metrodark'});
            $("#jqxRadioSql").on('change', function (event) {
                if (event.args.checked) {
                    $("#sql_view").show();
                    $("#col_view").hide();
                }
            });

            $("#jqxRadioDB").on('change', function (event) {
                if (event.args.checked) {
                    $("#col_view").show();
                    $("#sql_view").hide();
                }
            });
        }
    );
}
function splitterHandler() {
    $("#enablehover").jqxCheckBox({checked: false, theme: 'metrodark'});
    $("#enablehover").on('change', function (event) {
        //$("#jqxgrid").jqxGrid('enablehover', event.args.checked);
        if (event.args.checked) {
            $('#mainSplitter').jqxSplitter('expand');
        } else {
            $('#mainSplitter').jqxSplitter('collapse');
        }
    });
    $('#mainSplitter').jqxSplitter({
        width: '100%',
        height: 650,
        theme: 'metrodark',
        panels: [{size: 750, collapsible: false}, {collapsed: true}]
    });


}





