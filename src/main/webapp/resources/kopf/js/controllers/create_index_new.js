kopf.controller('IndexManageController', ['$scope', '$location',
    'ExternalSettingsService', 'ElasticService', 'AlertService',
    'AceEditorService','HostHistoryService','AppState','$http',
    function ($scope, $location, ExternalSettingsService, ElasticService,
              AlertService, AceEditorService,HostHistoryService,AppState,$http) {

        ExternalSettingsService.setTheme("dark");
        var TemplateBase = JSON.stringify(
            {
                settings: {},
                mappings: {},
                aliases: {}
            },
            undefined,
            2
        );
        $scope.alias="";
        $scope.tabs=[];
        $scope.selectedColArr = [];
        $scope.field_type = "example";
        $scope.ds_names = [{name:"test1"}];
        $scope.dsId = '';
        $scope.tabNameIndexManager = "";
        $scope.sqlColArr = [];
        $scope.editor = undefined;
        $scope.setMapEditor = undefined;
        $scope.paginator = new Paginator(1, 10, [],
            new wjlIndexTemplateFilter('', '',''));

        $scope.index = new IndexTemplate('', {});

        $scope.$watch('paginator', function(filter, previous) {
            $scope.index.name = $scope.paginator.filter.indexName;
            $scope.page = $scope.paginator.getPage();
        }, true);

        $scope.initEditorIndexManager = function() {
            if (!angular.isDefined($scope.editor)) {
                $scope.editor = AceEditorService.init('type-settings-editor');
                $scope.editor.setValue(TemplateBase);
            }
            if(!angular.isDefined($scope.setMapEditor)){
                $scope.setMapEditor = AceEditorService.init('type-mappings-editor');
                $scope.setMapEditor.setValue(TemplateBase);
            }
        };

        $scope.generate = function () {
            if ($scope.tabName == '') {
                AlertService.warn("选择表名");
                $('#tabNameIndexManager').focus();
                return;
            }
            if ($scope.selectedColArr.length == 0) {
                AlertService.warn("点击表格中的行选择列名,可多选");
                return;
            }
            $scope.setMapEditor.setValue('{"mappings":{"' + $scope.field_type + '":{"dynamic": "strict","properties": {' + $scope.selectedColArr.join(",") + '}}}}');
            $scope.setMapEditor.format();
        }

        $scope.clear = function () {
            $('#dbcol-gridIndexManager').jqxGrid('clearselection');
            $scope.selectedColArr = [];
        }

        $scope.generateSqlArea = function () {
            var all_ddls = $('#sqlAreaIndexManager').jqxTextArea('val');

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
                        $scope.setMapEditor.setValue('{"mappings":{"' + $scope.field_type + '":{"dynamic": "strict","properties": {' + $scope.sqlColArr.join(",") + '}}}}');
                        $scope.setMapEditor.format();
                    }
                }
            );
        }

        $scope.clearSqlArea = function () {
            $scope.sqlColArr = [];
            $('#sqlAreaIndexManager').jqxTextArea('val', '');
            $scope.editor.setValue('{}');
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

        $scope.loadTemplates = function() {
            ElasticService.getIndexTemplates(
                function(templates) {
                    $scope.paginator.setCollection(templates);
                    $scope.page = $scope.paginator.getPage();
                },
                function(error) {
                    AlertService.error('Error while loading templates', error);
                }
            );
        };

        $scope.sqlAreaHandlerNew = function ($scope) {
            var quotes = [];
            quotes.push('alter table 表名 add column 列名 varchar(30);');
            quotes.push('alter table 表名 add column 列名 int(11);');

            $('#sqlAreaIndexManager').jqxTextArea({
                theme: "metrodark", height: 440, width: '100%', minLength: 1, source: quotes,
                placeHolder: '将 CREATE 或 ALTER SQL语句粘贴到这里'
            });

            $scope.showHelp = function () {
                $scope.showHelpText = !$scope.showHelpText;
            }
        };

        $scope.createIndex = function(id){
            var checkValue = $("#enableTools").val();
            var value = null;
            var mappings = null;
            var body = $scope.editor.getValue();
            var settings = JSON.parse(body).settings;
            var aliases = JSON.parse(body).aliases;
            var firstMappings = JSON.parse(body).mappings;
            var editorBody = $scope.setMapEditor.getValue();
            var secondMappings = JSON.parse(editorBody).mappings;
            if ($scope.index.name) {
                if(!isDefined($scope.setMapEditor.error) && checkValue){
                    if(JSON.stringify(secondMappings) && JSON.stringify(secondMappings) != "{}" && id == "buttonTwo") {
                        mappings = secondMappings;
                    }else{
                        mappings = firstMappings;
                    }
                    value = '{"settings":' + JSON.stringify(settings) + ',"mappings":' + JSON.stringify(mappings) + ',"aliases":' + JSON.stringify(aliases) + '}';
                    $scope.editor.setValue(value);
                }else{
                    if(JSON.stringify(secondMappings) && JSON.stringify(secondMappings) != "{}"){
                        mappings = secondMappings;
                    }else{
                        mappings = firstMappings;
                    }
                }
                if(!checkValue){
                    var shardNum =$('#shard_num_new').val();
                    var repliNum = $('#replica_num_new').val();
                    var aliasName = $('#alias').val();
                    if(!shardNum){
                        shardNum = 5;
                    }
                    if(!repliNum){
                        repliNum = 1;
                    }
                    if(aliasName && aliasName.length > 0){
                        aliasName = '{"'+aliasName+'":{}}';
                    }else{
                        aliasName="{}";
                    }
                    value = '{"settings":{"index":{"number_of_shards":"'+shardNum+'","number_of_replicas":"'+repliNum+'"}},"mappings":' + JSON.stringify(mappings) + ',"aliases":'+aliasName+'}';
                    $scope.editor.setValue(value);
                }
                if ($scope.editor.hasContent()) {
                    $scope.editor.format();
                    if (!isDefined($scope.editor.error)) {
                        $scope.index.body = $scope.editor.getValue();
                        ElasticService.createIndex($scope.index,
                            function(response) {
                                if(response.exist){
                                    AlertService.success(
                                        'Index has existed',
                                        response
                                    );
                                }else if(response.success){
                                    AlertService.success(
                                        'Index successfully created',
                                        response
                                    );
                                }else{
                                    AlertService.error('Error while creating index', response);
                                }
                            },
                            function(error) {
                                AlertService.error('Error while creating index', error);
                            }
                        );
                    }
                } else {
                    AlertService.error('Index body can\'t be empty');
                }
            } else {
                AlertService.error('Index name can\'t be empty');
            }
        };



        $scope.loadIndexTemplate = function(template) {
            var settings = JSON.stringify(template.body.settings);
            var mappings = JSON.stringify(template.body.mappings);
            var aliases = JSON.stringify(template.body.aliases);
            var body = '{"settings":'+settings+',"mappings":'+mappings+',"aliases":'+aliases+'}';
            $scope.editor.setValue(body);
            $scope.editor.format();
        };

        $('#jqxTabsIndexManager').on('selected', function (event)
        {
            var selectedTab = event.args.item;
            var body = $scope.editor.getValue();
            if(selectedTab == 1 ){
                $('#indexName').val($scope.index.name);
                var mappings = JSON.parse(body).mappings;
                var value = '{"mappings":'+JSON.stringify(mappings)+'}';
                $scope.setMapEditor.setValue(value);
                $scope.setMapEditor.format();
                $('#typeTools').jqxSplitter('expand');
            }
            if(selectedTab == 0 ){
                var editorBody = $scope.setMapEditor.getValue();
                var mappings = JSON.parse(editorBody).mappings;
                if(JSON.stringify(mappings) && JSON.stringify(mappings) != "{}"){
                    var settings = JSON.parse(body).settings;
                    var aliases = JSON.parse(body).aliases;
                    var value = '{"settings":'+JSON.stringify(settings)+',"mappings":'+JSON.stringify(mappings)+',"aliases":'+JSON.stringify(aliases)+'}';
                    $scope.editor.setValue(value);
                    $scope.editor.format();
                }
            }
        });

        $scope.goNext= function(){
            $('#jqxTabsIndexManager').jqxTabs('select', 1);
        };

        $scope.goBack= function(){
            $('#jqxTabsIndexManager').jqxTabs('select', 0);
        };


        $scope.loadDataSources = function(){
            ElasticService.clusterRequest2("/eserknife/indexmsg/getDataSource",
                'GET', "", {}, {},
                function (res) {
                    if (res) {
                        $scope.ds_names = res.result;
                    }
                }
            );
        }

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

        $scope.initializeController = function() {
            $('#jqxTabsIndexManager').jqxTabs({ width: '100%', height:660, position: 'top',theme: "metrodark",toggleMode:'none'});
            $scope.loadTemplates();
            $scope.loadDataSources();
            $scope.initEditorIndexManager();
            radioHandlerNew();
            $scope.sqlAreaHandlerNew($scope);
            db_table_handlerNew($scope, $location, ElasticService);
            db_column_handlerNew($scope, $location);
            $scope.splitterHandlerNew();
            $("#indexTempleTool").hide();
            $("#rowTwo").hide();
            $("#firstEditor").hide();
        };

        $scope.splitterHandlerNew = function() {
            $("#enableTools").jqxCheckBox({checked: false, theme: 'metrodark'});
            $("#enableTools").on('change', function (event) {
                if (event.args.checked) {
                    $('.rowOne').hide();
                    $('#rowTwo').show();
                    var body = $scope.editor.getValue();
                    var editorBody = $scope.setMapEditor.getValue();
                    var mappings = JSON.parse(editorBody).mappings;
                    var settings = JSON.parse(body).settings;
                    var aliases = JSON.parse(body).aliases;
                    var value = '{"settings":'+JSON.stringify(settings)+',"mappings":'+JSON.stringify(mappings)+',"aliases":'+JSON.stringify(aliases)+'}';
                    $scope.editor.setValue(value);
                    $scope.editor.format();
                    $('#indexTempleTool').show();
                    $("#firstEditor").show();
                } else {
                    $('.rowOne').show();
                    $('#rowTwo').hide();
                    $('#indexTempleTool').hide();
                    $("#firstEditor").hide();
                }
            });
            $('#typeTools').jqxSplitter({
                width: '100%',
                height: 650,
                theme: 'metrodark',
                panels: [{size: '50%', collapsible: false}, {collapsed: true}]
            });
        };

    }
]);

function radioHandlerNew() {
    $('#typeTools').on('expanded',
        function (event) {
            $("#jqxRadioSqlIndexManager").jqxRadioButton({height: 25, theme: 'metrodark', checked: true});
            $("#jqxRadioDBIndexManager").jqxRadioButton({height: 25, theme: 'metrodark'});
            $("#jqxRadioSqlIndexManager").on('change', function (event) {
                if (event.args.checked) {
                    $("#sql_viewIndexManager").show();
                    $("#col_viewIndexManager").hide();
                }
            });

            $("#jqxRadioDBIndexManager").on('change', function (event) {
                if (event.args.checked) {
                    $("#col_viewIndexManager").show();
                    $("#sql_viewIndexManager").hide();
                }
            });
        }
    );
};

function db_table_handlerNew($scope, $location, ElasticService) {
    $scope.$watch('dsnameIndexManager', function (current, previous) {
        if (isDefined(current)) {
            $scope.dsId = current;
            $scope.loadTabNames(current);
        }
    });

    $scope.$watch('tabNameIndexManager', function (current, previous) {
        if (isDefined(current)) {
            $scope.source.url = 'http://' + $location.$$host + ':' + $location.$$port
                + '/eserknife/indexmsg/getColInfoByTabname?dsId='
                +$scope.dsId+'&tabName=' + $scope.tabNameIndexManager+'&clusterName='+clusterName;
            $('#dbcol-gridIndexManager').jqxGrid('clearselection');
            $('#dbcol-gridIndexManager').jqxGrid('updatebounddata');
        }
    });

}
function db_column_handlerNew($scope, $location) {
    $scope.dataurl = 'http://' + $location.$$host + ':' + $location.$$port
        + '/eserknife/indexmsg/getColInfoByTabname?dsId='+$scope.dsId+'&tabName=' + $scope.tabNameIndexManager+'&clusterName='+clusterName;

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
