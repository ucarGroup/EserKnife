kopf.controller('SlowLogQueryController', ['$scope', '$location',
    'ExternalSettingsService', 'ElasticService','AppState','$http',
    function ($scope, $location, ExternalSettingsService, ElasticService,
              AppState,$http) {

        ExternalSettingsService.setTheme("dark");

        $scope.indexNames = [];

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
                        $("#index-combobox").jqxComboBox('addItem', eachIndex.name );
                    });
                    return;
                }
            },
            true
        );

        $scope.logs = [];
        var startTimeId = 'startTime4SlowlogQuery';
        var endTimeId = 'endTime4SlowlogQuery';
        initDate(startTimeId,endTimeId);

        $scope.hits = 0;
        $scope.showCount = false;

        $("#cost-combobox").jqxComboBox({
            height:34,
            width:120,
            dropDownHeight:100,
            theme: 'metrodark',
            searchMode: 'contains',
            placeHolder:'选择耗时',
            source: [{label:'1s以内',value:1},{label:'1到3s',value:2},{label:'3s及以上',value:3}]
        });

        var nodeIps = [];
        nodeIpsInPage.forEach(function (eachNode) {
            nodeIps.push(eachNode.ip);
        });
        $("#node-combobox").jqxComboBox({
            height:34,
            width:120,
            dropDownHeight:150,
            theme: 'metrodark',
            searchMode: 'contains',
            placeHolder:'选择节点',
            source: nodeIps
        });

        $("#grade-combobox").jqxComboBox({
            height:34,
            width:120,
            dropDownHeight:120,
            theme: 'metrodark',
            searchMode: 'contains',
            placeHolder:'选择级别',
            source: ['WARN','INFO','DEBUG','TRACE']
        });

        $("#index-combobox").jqxComboBox({
            height:34,
            width:200,
            theme: 'metrodark',
            searchMode: 'contains',
            autoComplete: true,
            placeHolder:'选择索引',
            source: $scope.indexNames
        });

        var dataurl = 'http://'+$location.$$host+':'+$location.$$port
                +'/escloud/slowlog/getSlowLogList3?clusterName='+clusterName
                +'&beginTime='+getTime(startTimeId)+'&endTime='+getTime(endTimeId)
                +'&costTime=&serverIp=&grade=&indexName=';

        var source = {
            datatype: "json",
            datafields: [
                { name: 'slowLogTime4View', type: 'string' },
                { name: 'serverIp', type: 'string' },
                { name: 'slowLogLevel', type: 'string' },
                { name: 'slowLogIndex', type: 'string' },
                { name: 'slowLogType', type: 'string' },
                { name: 'slowLogUseTime', type: 'string' },
                { name: 'slowLogSource', type: 'string' }
            ],
            url: dataurl,
            beforeprocessing : function(data) {
                if (data != null && data.slowLogInfos != null) {
                    source.totalrecords = data.totalCount;
                    source.records = data.slowLogInfos;
                }
            }
            /*sortdatafield: 'slowLogTime',
            sortorder: 'desc',
            filter: function(){
                // Update the grid and send a request to the server.
                $("#slowlog-grid").jqxGrid('updatebounddata', 'filter');
            },
            sort: function(){
                // Update the grid and send a request to the server.
                $("#slowlog-grid").jqxGrid('updatebounddata', 'sort');
            },
            */

        };

        var cellclass = function (row, columnfield, value) {
            return "enter";
        }

        $("#jqxLoader").jqxLoader({ isModal: true, width: 100, height: 60, imagePosition: 'top' , autoOpen: true});
        var dataAdapter = new $.jqx.dataAdapter(source,{loadComplete: function () { $('#jqxLoader').jqxLoader('close'); }});


        $("#slowlog-grid").jqxGrid({
            width: '100%',
            source: dataAdapter,
            pageable: true,
            autorowheight: true,
            autoheight: true,
            altrows: true,
            pagesizeoptions: [10,20,50],
            virtualmode : true,
            rendergridrows : function() {
                return source.records;
            },
            theme: 'metrodark',
            showdefaultloadelement: false,
            autoshowloadelement: false,
            pagesize: 10,
            selectionmode: "none",
            localization: getLocalization('zh'),
            columns: [
                {text: '时间', datafield: 'slowLogTime4View', width: '10%',cellsalign: 'right', align: 'right'},
                {text: '毫秒数', datafield: 'slowLogUseTime', width: '5%',cellsalign: 'right', align: 'right'},
                {text: '节点', datafield: 'serverIp', width: '10%',cellsalign: 'right', align: 'right'},
                {text: '索引', datafield: 'slowLogIndex', width: '13%',cellsalign: 'right', align: 'right',cellclassname:'enter'},
                {text: '类型', datafield: 'slowLogType', width: '12%',cellsalign: 'right', align: 'right',cellclassname:'enter'},
                {text: '级别', datafield: 'slowLogLevel', cellsformat: 'D', width: '5%',cellsalign: 'right', align: 'right' },
                {text: '内容', datafield: 'slowLogSource', width: '45%' ,cellsalign: 'left', align: 'left',cellclassname:'enter'}
            ]
        });

        $scope.queryLog = function (){
            $('#jqxLoader').jqxLoader('open');
            $('#slowlog-grid').jqxGrid('gotopage', 0);
            source.url = 'http://'+$location.$$host+':'+$location.$$port
                +'/escloud/slowlog/getSlowLogList3?clusterName='+clusterName
                +'&beginTime='+getTime(startTimeId)+'&endTime='+getTime(endTimeId)
                +'&costTime='+$("#cost-combobox").val()+'&serverIp='+$("#node-combobox").val()
                +'&grade='+$("#grade-combobox").val()+'&indexName='+$("#index-combobox").val();

            $('#slowlog-grid').jqxGrid('clearselection');
            $('#slowlog-grid').jqxGrid('updatebounddata');
        }

        document.onkeydown = function(e){
            var ev = document.all ? window.event : e;
            if(ev.keyCode==13) {
                $scope.queryLog();
            }
        }
    }


]);

function getTime(timeId){
    return $("#"+timeId).val().replace(" ","_");
}