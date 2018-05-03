/*
kopf.controller('IndexManageController', ['$scope', '$location',
    'ExternalSettingsService', 'ElasticService', 'AlertService',
    'AceEditorService','HostHistoryService','AppState','$http',
    function ($scope, $location, ExternalSettingsService, ElasticService,
              AlertService, AceEditorService,HostHistoryService,AppState,$http) {

        ExternalSettingsService.setTheme("dark");
        var TemplateBase = "POST XXX\r\t"+JSON.stringify(
            {
                settings: {
                    number_of_shards : 5,
                    number_of_replicas : 1
                }
            },
            undefined,
            2
        );
        $scope.alias="";
        $scope.tabs=[];
        $scope.selectedColArr = [];
        $scope.field_type = "example";
        $scope.ds_names = [{name:"test1"}];
        $scope.dsId = "";
        $scope.tabNameIndexManager = "";
        $scope.sqlColArr = [];
        $scope.setMapEditor = undefined;
        $scope.index = new IndexTemplate('', {});

        $scope.initEditorIndexManager = function() {
            if(!angular.isDefined($scope.setMapEditor)){
                $scope.setMapEditor = AceEditorService.init('type-map-editor','type_map_editor_actions','type_map_copy_as_curl');
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
            var body = $scope.setMapEditor.getValue();
            var settings = JSON.parse(body).settings;
            var aliases = JSON.parse(body).aliases;
            if(aliases){
                $scope.setMapEditor.setValue('{"settings":' + JSON.stringify(settings) + ',"mappings":{"' + $scope.field_type + '":{"dynamic": "strict","properties": {' + $scope.selectedColArr.join(",") + '}}},"aliases":'+JSON.stringify(aliases)+'}');
            }else{
                $scope.setMapEditor.setValue('{"settings":' + JSON.stringify(settings) + ',"mappings":{"' + $scope.field_type + '":{"dynamic": "strict","properties": {' + $scope.selectedColArr.join(",") + '}}}}');
            }
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
                        var body = $scope.setMapEditor.getValue();
                        var settings = JSON.parse(body).settings;
                        var aliases = JSON.parse(body).aliases;
                        if(aliases){
                            $scope.setMapEditor.setValue('{"settings":' + JSON.stringify(settings) + ',"mappings":{"' + $scope.field_type + '":{"dynamic": "strict","properties": {' + $scope.sqlColArr.join(",") + '}}},"aliases":'+JSON.stringify(aliases)+'}');
                        }else{
                            $scope.setMapEditor.setValue('{"settings":' + JSON.stringify(settings) + ',"mappings":{"' + $scope.field_type + '":{"dynamic": "strict","properties": {' + $scope.sqlColArr.join(",") + '}}}}');
                        }
                        $scope.setMapEditor.format();
                    }
                }
            );
        }

        $scope.clearSqlArea = function () {
            $scope.sqlColArr = [];
            $('#sqlAreaIndexManager').jqxTextArea('val', '');
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
                theme: "metrodark", height: 467, width: '100%', minLength: 1, source: quotes,
                placeHolder: '将 CREATE 或 ALTER SQL语句粘贴到这里'
            });

            $scope.showHelp = function () {
                $scope.showHelpText = !$scope.showHelpText;
            }
        };

        // $scope.$watch('alias', function (current, previous) {
        //     var body = $scope.setMapEditor.getValue();
        //     var settings = JSON.parse(body).settings;
        //     var mappings = JSON.parse(body).mappings;
        //     if (isDefined(current)) {
        //         if ('' == current) {
        //             $scope.setMapEditor.setValue('{"settings":' + JSON.stringify(settings) + ',"mappings":'+JSON.stringify(mappings)+'}');
        //             $scope.setMapEditor.format();
        //             return;
        //         }
        //         $scope.setMapEditor.setValue('{"settings":' + JSON.stringify(settings) + ',"mappings":'+JSON.stringify(mappings)+',"aliases":{"'+current+'":{}}}');
        //         $scope.setMapEditor.format();
        //     }
        // });

        $scope.format = function(){alert(1);
            $scope.setMapEditor.format();
        };

        $scope.createIndex = function(){
            $scope.setMapEditor.getValue(function(data){

                alert(data);
            });




            // if ($scope.index.name) {
            //     if ($scope.setMapEditor.hasContent()) {
            //         $scope.setMapEditor.format();
            //         if (!isDefined($scope.setMapEditor.error)) {
            //             $scope.index.body = $scope.setMapEditor.getValue();
            //             ElasticService.createIndex($scope.index,
            //                 function(response) {
            //                     if(response.exist){
            //                         AlertService.success(
            //                             'Index has existed',
            //                             response
            //                         );
            //                     }else if(response.success){
            //                         AlertService.success(
            //                             'Index successfully created',
            //                             response
            //                         );
            //                     }else{
            //                         AlertService.error('Error while creating index', response);
            //                     }
            //                 },
            //                 function(error) {
            //                     AlertService.error('Error while creating index', error);
            //                 }
            //             );
            //         }
            //     } else {
            //         AlertService.error('Index body can\'t be empty');
            //     }
            // } else {
            //     AlertService.error('Index name can\'t be empty');
            // }
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

        $scope.loadTabNames = function (dsId) {
            ElasticService.clusterRequest2("/eserknife/indexmsg/getTabNamesByDs?dsId=" + dsId,
                'GET', "", {}, {},
                function (res) {
                    if (res) {
                        $scope.tabs = res.result;
                    }
                }
            );
        };

        $scope.initializeController = function() {
            $scope.initEditorIndexManager();
            $scope.loadDataSources();
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
            $('#typeTools').jqxSplitter({
                width: '100%',
                height: 710,
                theme: 'metrodark',
                panels: [{size: '50%', collapsible: false}, {collapsed: false}]
            });
        };

    }
]);

function radioHandlerNew() {
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
                + '/eserknife/indexmsg/getColInfoByTabname?dsId='+$scope.dsId+'&tabName=' + $scope.tabNameIndexManager+'&clusterName='+clusterName;
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
        height: 395,
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
*/
