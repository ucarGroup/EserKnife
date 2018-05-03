kopf.controller('ExportIndexController', ['$scope', '$location','$timeout',
    'ExternalSettingsService', 'ElasticService', 'AlertService',
    'AceEditorService','ConfirmDialogService','AppState',
    function ($scope, $location,$timeout, ExternalSettingsService, ElasticService,
              AlertService, AceEditorService,ConfirmDialogService,AppState) {

        ExternalSettingsService.setTheme("dark");
        $scope.indexNames = []; //现有索引名列表
        $scope.selectedndexNames = ""; //当前选中的索引名

        //$timeout(function () {
        //    if ($scope.field_index && $scope.field_index != "") {
        //        $("#export-index-combobox").jqxComboBox('selectItem', $scope.field_index);
        //    }
        //},100);

        /**
         * 初始化索引combobox的数据
         */
        $scope.$watch(
            function() {
                return ElasticService.cluster;
            },
            function(filter, previous) {
                if(!ElasticService.cluster) return;
                if($scope.indexNames.length == 0)
                {
                    ElasticService.getIndices().forEach(function (eachIndex) {
                        $scope.indexNames.push(eachIndex.name);
                        $("#export-index-combobox").jqxComboBox('addItem', eachIndex.name );
                    });
                    return;
                }
            },
            true
        );

        $("#export-index-combobox").jqxComboBox({
            height:30,
            width:'100%',
            theme: 'metrodark',
            searchMode: 'contains',
            autoComplete: true,
            placeHolder:'选择目标索引',
            source: $scope.indexNames
        });

        $("#export-index-combobox").on('change', function (event) {
            if (event.args) {
                var item = event.args.item;
                var index = item.value;
                if (isDefined(index)) {
                    ElasticService.getIndexMetadata(index,
                        function (metadata) {
                            console.log(metadata.getTypes());
                            console.log(metadata.getFields());
                            $scope.rebuildTree(metadata);
                            //debugger;
                        },
                        function (error) {
                            AlertService.error('Error while loading index mappings', error);
                        }
                    );
                }
            }
        });

        $scope.rebuildTree = function (metadata){
            var tree = [];
            metadata.getTypes().forEach(function (typename) {
                var typeRow = { "eleId": typename+'_meta0', "eleName": typename, "colType": "", "parentId": 0 };
                tree.push(typeRow);

                var props = metadata.mappings[typename].properties;
                for(each in props) {
                    //console.log(each+","+props[each]["type"]);

                    var parentId = typename+'_meta0';
                    var colRow = { "eleId": each, "eleName": each, "colType": props[each]["type"], "parentId":parentId};
                    tree.push(colRow);
                }
            });
            console.log(tree);
            return tree;
        }



        var metadata = [
            { "eleId": 'all_order_meta0', "eleName": "all_order", "colType": "", "parentId": 0 },
            { "eleId": 'passage_name', "eleName": "passage_name", "colType": "string", "parentId": 'all_order_meta0'},
            { "eleId": 'gender', "eleName": "gender", "colType": "date", "parentId": 'all_order_meta0'},
            { "eleId": 'birthday', "eleName": "birthday", "colType": "long", "parentId": 'all_order_meta0'}
        ];

        var source =
        {
            dataType: "json",
            dataFields: [
                { name: 'eleId', type: 'string' },
                { name: 'eleName', type: 'string' },
                { name: 'colType', type: 'string' },
                { name: 'parentId', type: 'string' }
            ],
            hierarchy:
            {
                keyDataField: { name: 'eleId' },
                parentDataField: { name: 'parentId' }
            },
            id: 'eleId',
            localData: metadata
        };

        var dataAdapter = new $.jqx.dataAdapter(source);

        $("#index_define_table").jqxTreeGrid(
        {
            width: '100%',
            height:400,
            checkboxes: true,
            hierarchicalCheckboxes: true,
            source: dataAdapter,
            columnsResize: true,
            sortable: true,
            theme: 'metrodark',
            ready: function () {
                $("#index_define_table").jqxTreeGrid('expandRow', 'all_order_meta0');
                $("#index_define_table").jqxTreeGrid('checkRow', 'all_order_meta0');
            },
            columns: [
                { text: '名称', dataField: 'eleName', width: '70%' },
                { text: '类型', dataField: 'colType', width: '30%' }
            ]
        });

        $('#index_define_table').on('rowCheck',function (event){
            // event args.
            var args = event.args;
            // row data.
            var row = args.row;
            // row key.
            var key = args.key;
            console.log(row);
        });

        $('#index_define_table').on('rowUncheck',function (event){
            // event args.
            var args = event.args;
            // row data.
            var row = args.row;
            // row key.
            var key = args.key;
            console.log(row);
        });




        $scope.exportIndex = function (){
        }

        $scope.initializeController = function() {

        }
    }]
);




