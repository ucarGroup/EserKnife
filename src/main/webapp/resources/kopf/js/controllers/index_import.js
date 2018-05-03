kopf.controller('ImportIndexController', ['$scope', '$location','$timeout',
    'ExternalSettingsService', 'ElasticService', 'AlertService',
    'AceEditorService','ConfirmDialogService','AppState',
    function ($scope, $location,$timeout, ExternalSettingsService, ElasticService,
              AlertService, AceEditorService,ConfirmDialogService,AppState) {

        ExternalSettingsService.setTheme("dark");
        $scope.indexNames = [];
        $scope.cluster_addr = "";
        $scope.cluster_port = "9200";
        $scope.cluster_userpass = "";
        $scope.showIndexPanel = false;
        $scope.selectedIndics = [];

        $scope.source = {
            datatype: "json",
            datafields: [
                { name: 'index_name', type: 'string' },
                { name: 'shard_num', type: 'string' },
                { name: 'replica_num', type: 'string' }
            ],
            localdata:[]
        };

        var dataAdapter = new $.jqx.dataAdapter($scope.source);

        $("#remote-index-grid").jqxGrid({
            width: '100%',
            height:350,
            source: dataAdapter,
            filterable: true,
            theme: 'metrodark',
            selectionmode: "checkbox",
            columns: [
                {text: '列名', datafield: 'index_name',cellsalign: 'left', align: 'left',cellclassname:'enter'},
                {text: '分片数', datafield: 'shard_num',width:'10%'},
                {text: '副本数', datafield: 'replica_num',width:'10%'}
            ]
        });

        $('#remote-index-grid').on('rowunselect', function (event)
        {
            $scope.selectedIndics.remove(event.args.row);
        });

        $('#remote-index-grid').on('rowselect', function (event)
        {
            $scope.selectedIndics.push(event.args.row);
        });

        $('#indicesForm').jqxValidator({
            rules: [
                { input: '#cluster_addr', message: '集群地址必填!', action: 'keyup, blur',position:'bottom', rule: 'required' },
                { input: '#cluster_port', message: '端口必填!', action: 'keyup, blur',position:'bottom', rule: 'required' }
            ]
        });

        $scope.loadIndex = function (){
            if(!$('#indicesForm').jqxValidator('validate')) return;
            var target = "/eserknife/indexmsg/getIndexList?clusterName="+clusterName
                +"&clusterAddr="+$scope.cluster_addr+":"+$scope.cluster_port+"&userpass="+$scope.cluster_userpass;
            ElasticService.clusterRequest3(target,
                'GET',
                {},
                function(res){
                    console.log(res.length + "," + $scope.selectedIndics);
                    $scope.showIndexPanel = true;
                    $scope.source.localdata = res;
                    $scope.selectedIndics = [];
                    $('#remote-index-grid').jqxGrid('clearselection');
                    $('#remote-index-grid').jqxGrid('updatebounddata');
                }
            );
        }

        $scope.importIndex = function (){

            if($scope.selectedIndics.length == 0) {
                AlertService.warn("先选择索引名,可多选");
                return;
            }
            var indicesVal = JSON.stringify($scope.selectedIndics);
            console.log("indicesVal = "+indicesVal);
            ElasticService.clusterRequest3("/eserknife/indexmsg/importIndex",
                'POST',
                {
                    indices:indicesVal,
                    clusterName:clusterName,
                    clusterAddr:$scope.cluster_addr+":"+$scope.cluster_port,
                    userpass:$scope.cluster_userpass
                },
                function(res){
                    AlertService.success(res);
                    $scope.loadIndex();
                }
            );
        }
    }]
);




