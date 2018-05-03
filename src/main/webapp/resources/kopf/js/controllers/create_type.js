kopf.controller('CreateTypeController', ['$scope', '$location','$timeout',
    'ExternalSettingsService', 'ElasticService', 'AlertService',
    'AceEditorService','ConfirmDialogService','ConfirmDialogService2','AppState',
    function ($scope, $location,$timeout, ExternalSettingsService, ElasticService,
              AlertService, AceEditorService,ConfirmDialogService,ConfirmDialogService2,AppState) {

        ExternalSettingsService.setTheme("dark");
        $scope.indexNames = [];
        $scope.field_types = "";
        $scope.ds_names = [{name:"test1"}];
        $scope.dsId ='';
        $scope.tabs=[];
        $scope.tabName = "";
        $scope.opsjs = '';
        $scope.selectedColArr = [];
        $scope.selectDemoArr = [];
        $scope.sqlColArr = [];
        $scope.showHelpText = true;
        $scope.field_type = "";

        setTimeout(function(){
            initHandle_type($scope, ElasticService,AppState);
            splitterHandler_type();
            loadDataSources($scope,ElasticService);
            indexComboboxHandler_type($scope, $timeout);
            editorHandler_type($scope, AceEditorService);
            typeHandler_type($scope, ElasticService, AlertService);
            radioHandler_type();
            sqlAreaHandler_type($scope);
            db_table_handler_type($scope, $location, ElasticService);
            db_column_handler_type($scope, $location);
            demo_handler_type($scope, $location,AlertService);
            submitActionHandler_type($scope, ElasticService, AlertService, ConfirmDialogService2);
            toolActionHandler_type($scope, AlertService,ElasticService);
        },10);
    }]
);
function initHandle_type($scope, ElasticService,AppState) {
    $scope.$watch(
        function () {
            return ElasticService.cluster;
        },
        function (filter, previous) {
            if (!ElasticService.cluster) return;
            if ($scope.indexNames.length == 0) {
                ElasticService.getIndices().forEach(function (eachIndex) {
                    $scope.indexNames.push(eachIndex.name);
                    $("#type-index-combobox").jqxComboBox('addItem', eachIndex.name);
                });
                return;
            }
        },
        true
    );

    //处理参数传递
    var selectedIndex = AppState.getProperty("CreateType","selectedIndex","");
    $scope.field_index = selectedIndex != "" ? selectedIndex : "";
    AppState.setProperty("CreateType","selectedIndex","");
}
function indexComboboxHandler_type($scope, $timeout) {
    $("#type-index-combobox").jqxComboBox({
        height:30,
        width:'100%',
        theme: 'metrodark',
        searchMode: 'contains',
        autoComplete: true,
        placeHolder:'选择索引',
        source: $scope.indexNames
    });

    $timeout(function () {
        if ($scope.field_index && $scope.field_index != "") {
            $("#type-index-combobox").val($scope.field_index);
        }
    },1000);

}
function typeHandler_type($scope, ElasticService, AlertService) {

    $scope.$watch('field_type', function(current, previous) {
        if (isDefined(current)) {

            var content = $.trim($scope.editor.getValue());
            //如果是初始值,直接赋值
            if ( '' == current) {
                //return;
            }
            var mappingJson = "";
            var propJson = getJsonNode($.parseJSON(content),"properties");

            if("" == propJson){
                mappingJson = '{"'+current+'":{"dynamic": "strict","properties": {}}}';
            }else{  //已经有值,部分更新json
                mappingJson = '{"'+current+'":{"dynamic": "strict","properties": '+JSON.stringify(propJson)+'}}';
            }

            $scope.editor.setValue(mappingJson);
            $scope.editor.format();
        }
    });
}
function  loadDataSources($scope,ElasticService){
    ElasticService.clusterRequest2("/eserknife/indexmsg/getDataSource",
        'GET', "", {}, {},
        function (res) {
            if (res) {
                $scope.ds_names = res.result;
            }
        }
    );
}
function db_table_handler_type($scope, $location, ElasticService) {
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
            $('#dbcol-grid_from_type').jqxGrid('clearselection');
            $('#dbcol-grid_from_type').jqxGrid('updatebounddata');
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

function demo_handler_type($scope, $location,AlertService){
    $scope.demoClickCount = 0;
    $scope.generateDemo = function () {
        if ($scope.selectDemoArr.length == 0) {
            AlertService.warn("点击表格中的行选择,可多选");
            return;
        }
        var body = JSON.parse($scope.editor.getValue());
        var subBody = body[$scope.field_type];
        var properties = subBody['properties'];
        var newData =JSON.parse('{'+$scope.selectDemoArr.join(",")+'}');
        var data = $.extend(newData,properties);
        $scope.editor.setValue('{"' + $scope.field_type + '":{"dynamic": "strict","properties": ' + JSON.stringify(data) + '}}');
        $scope.editor.format();
        $('#demo-grid_from_type').jqxGrid('clearselection');
        $scope.selectedDemoArr = [];
        $scope.demoClickCount++;
    }
    $scope.clearDemo = function () {
        $('#demo-grid_from_type').jqxGrid('clearselection');
        $scope.selectedDemoArr = [];
    };
    $scope.demoUrl = 'http://' + $location.$$host + ':' + $location.$$port
        + '/eserknife/indexmsg/getDemoData';
    $scope.demoSource = {
        datatype: "json",
        url: $scope.demoUrl,
        beforeprocessing: function (data) {
            if (data != null && data.dbColNames != null) {
                $scope.demoSource.records = data.dbColNames;
            }
        }
    };
    var dataAdapter = new $.jqx.dataAdapter($scope.demoSource);
    $("#demo-grid_from_type").jqxGrid({
        width: '100%',
        height: 250,
        source: dataAdapter,
        showfilterrow: false,
        filterable: false,
        theme: 'metrodark',
        selectionmode: "multiplerows",
        columns: [
            {text: '类型', datafield: 'demo_type'},
            {text: '描述', datafield: 'demo_remark'}
        ]
    });

    $('#demo-grid_from_type').on('rowunselect', function (event) {
        var type = event.args.row.demo_type;
        if(type){
            $scope.selectDemoArr.remove($scope.newBuildProperties( $scope.demoClickCount,type));
        }
    });

    $('#demo-grid_from_type').on('rowselect', function (event) {
        var type = event.args.row.demo_type;
        if(type){
            $scope.selectDemoArr.push($scope.newBuildProperties( $scope.demoClickCount,type));
        }
    });

}
function db_column_handler_type($scope, $location) {
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

    $("#dbcol-grid_from_type").jqxGrid({
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

    $('#dbcol-grid_from_type').on('rowunselect', function (event) {
        var tabName = $scope.tabName;
        var colName = event.args.row.db_colname;
        var colType = event.args.row.db_colname_def;
        $scope.selectedColArr.remove($scope.buildProperties(tabName, colName, colType));
    });

    $('#dbcol-grid_from_type').on('rowselect', function (event) {
        var tabName = $scope.tabName;
        var colName = event.args.row.db_colname;
        var colType = event.args.row.db_colname_def;
        $scope.selectedColArr.push($scope.buildProperties(tabName, colName, colType));
    });
}
function toolActionHandler_type($scope, AlertService,ElasticService) {
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
        $('#dbcol-grid_from_type').jqxGrid('clearselection');
        $scope.selectedColArr = [];
    }

    $scope.generateSqlArea = function () {
        var all_ddls = $('#sqlArea_from_type').jqxTextArea('val');

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
        $('#sqlArea_from_type').jqxTextArea('val', '');
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

    $scope.newBuildProperties = function (count,colType) {
        var esType = colType;
        var col = '字段名称'+count+'|'+colType;
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
}
function submitActionHandler_type($scope, ElasticService, AlertService, ConfirmDialogService2) {
    $scope.updateIndex = function () {
        var params = {
            clusterName:clusterName,
            indexName:$("#type-index-combobox").val(),
            typeName:$scope.field_type,
            newColsJson:$scope.submitJsonBody
        };
        ElasticService.clusterRequest2("/eserknife/indexmsg/addNewType",
            'POST',
            "",
            params,
            {},
            function(res){
                if(!res){
                    AlertService.error("服务端响应对象为空!");
                    return;
                }
                if(res.code){
                    AlertService.success(res.sucMsg);
                    $scope.field_type = '';
                    $("#type-index-combobox").val('');
                    $scope.editor.setValue('{}');

                    //工具区域
                    $scope.clear();
                    $scope.clearSqlArea();
                    $scope.tabName = '';
                    $('#dbcol-grid_from_type').jqxGrid('clear');

                }else{
                    AlertService.error(res.errMsg);
                }
            },
            function(res){
                AlertService.error(res);
            }
        );
    }
    var reg = new RegExp("^[a-zA-Z]([0-9a-zA-Z_]+)$");
    $scope.promptUpdateIndex = function () {

        if($.trim($scope.field_type).length == 0) {
            AlertService.warn('类型名不能为空');
            $("#field_type").focus();
            return;
        }

        if(!reg.test($.trim($scope.field_type))) {
            AlertService.warn("类型名要求字母开头,可以包含字母下划线数字");
            $("#field_type").focus();
            return;
        }

        if($.trim($("#type-index-combobox").val()).length == 0) {
            AlertService.warn('索引名不能为空');
            $("#type-index-combobox").jqxComboBox('focus');
            return;
        }

        var content = $.trim($scope.editor.getValue());
        if(content.length == 0 || content.length == '{}') {
            AlertService.warn('请填入字段定义json串');
            return;
        }

        try{
            var json4Content = $.parseJSON(content);
            //debugger;

            if(!json4Content[$scope.field_type].properties){
                AlertService.warn('字段定义必须包含properties属性');
                return;
            }
            if($.isEmptyObject(json4Content[$scope.field_type].properties)){
                AlertService.warn('字段定义properties属性不能空,可以直接编辑或者通过辅助区自动产生');
                return;
            }
            $scope.submitJsonBody = JSON.stringify(json4Content[$scope.field_type])

        }catch (e){
            AlertService.warn('字段定义必须是合法的json串');
            return;
        }

        $("#submitA_from_type").click();

        ConfirmDialogService2.open(
            '修改索引',
            '确认在索引<span style="font-size: 20px;color: #be386a"> ' + $("#type-index-combobox").val()
            + '</span> 里添加一个新类型,取名 <span style="font-size: 20px;color: #B73766">' + $scope.field_type + ' </span>吗?',
            '修改',
            function () {
                $scope.updateIndex();
            }
        );
    };
}
function sqlAreaHandler_type($scope) {
    var quotes = [];
    quotes.push('alter table 表名 add column 列名 varchar(30);');
    quotes.push('alter table 表名 add column 列名 int(11);');

    $('#sqlArea_from_type').jqxTextArea({
        theme: "metrodark", height: 460, width: '100%', minLength: 1, source: quotes,
        placeHolder: '将 CREATE 或 ALTER SQL语句粘贴到这里'
    });

    $scope.showHelp = function () {
        $scope.showHelpText = !$scope.showHelpText;
    }
}
function editorHandler_type($scope, AceEditorService) {
    if (!isDefined($scope.editor)) {
        $scope.editor = AceEditorService.init('type-settings-editor');
        $scope.editor.setValue('{}');
    }
}
function radioHandler_type() {
    $('#mainSplitter_from_type').on('expanded',
        function (event) {
            $("#jqxRadioSql_from_type").jqxRadioButton({height: 25, theme: 'metrodark', checked: true});
            $("#jqxRadioDB_from_type").jqxRadioButton({height: 25, theme: 'metrodark'});
            $("#jqxRadioDemo_from_type").jqxRadioButton({height: 25, theme: 'metrodark'});

            $("#jqxRadioSql_from_type").on('change', function (event) {
                if (event.args.checked) {
                    $("#sql_view_from_type").show();
                    $("#col_view_from_type").hide();
                    $("#demo_view_from_type").hide();
                }
            });

            $("#jqxRadioDB_from_type").on('change', function (event) {
                if (event.args.checked) {
                    $("#col_view_from_type").show();
                    $("#sql_view_from_type").hide();
                    $("#demo_view_from_type").hide();
                }
            });

            $("#jqxRadioDemo_from_type").on('change', function (event) {
                if (event.args.checked) {
                    $("#demo_view_from_type").show();
                    $("#col_view_from_type").hide();
                    $("#sql_view_from_type").hide();
                }
            });
        }
    );
}
function splitterHandler_type() {
    $("#enablehover_from_type").jqxCheckBox({checked: false, theme: 'metrodark'});
    $("#enablehover_from_type").on('change', function (event) {
        if (event.args.checked) {
            $('#mainSplitter_from_type').jqxSplitter('expand');
        } else {
            $('#mainSplitter_from_type').jqxSplitter('collapse');
        }
    });
    $('#mainSplitter_from_type').jqxSplitter({
        width: '100%',
        height: 650,
        theme: 'metrodark',
        panels: [{size: 750, collapsible: false}, {collapsed: true}]
    });
}
function getJsonNode(jsonContent,nodeName){
    var xContent = jsonContent;
    for(each in xContent) {
        if(nodeName == each) {
            return xContent[nodeName];
        }

        if ($.type(xContent[each]) === "object") {
            return getJsonNode(xContent[each],nodeName);
        }
    }
    return "";
}




