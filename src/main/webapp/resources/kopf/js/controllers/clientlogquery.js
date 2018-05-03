kopf.controller('ClientLogController', ['$scope', '$location',
    'ExternalSettingsService', 'ElasticService','AppState','$http',
    function ($scope, $location, ExternalSettingsService, ElasticService,
              AppState,$http) {

        ExternalSettingsService.setTheme("dark");

        $scope.indexNames = [];
        $scope.costTime = "";

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
                        $("#index-combobox-clientlog").jqxComboBox('addItem', eachIndex.name );
                    });
                    return;
                }
            },
            true
        );

        $scope.logs = [];
        var startTimeId = 'startTime4ClientlogQuery';
        var endTimeId = 'endTime4ClientlogQuery';
        initDate(startTimeId,endTimeId);

        $scope.hits = 0;
        $scope.showCount = false;

        //$("#cost-combobox-clientlog").jqxComboBox({
        //    height:34,
        //    width:120,
        //    dropDownHeight:100,
        //    theme: 'metrodark',
        //    searchMode: 'contains',
        //    placeHolder:'选择耗时',
        //    source: [{label:'1s以内',value:1},{label:'1到3s',value:2},{label:'3s及以上',value:3}]
        //});

        var nodeIps = [];
        nodeIpsInPage.forEach(function (eachNode) {
            nodeIps.push(eachNode.ip);
        });
        //$("#node-combobox-clientlog").jqxComboBox({
        //    height:34,
        //    width:120,
        //    dropDownHeight:150,
        //    theme: 'metrodark',
        //    searchMode: 'contains',
        //    placeHolder:'选择节点',
        //    source: nodeIps
        //});

        $("#index-combobox-clientlog").jqxComboBox({
            height:34,
            width:200,
            theme: 'metrodark',
            searchMode: 'contains',
            autoComplete: true,
            placeHolder:'选择索引',
            source: $scope.indexNames
        });

        var dataurl = 'http://'+$location.$$host+':'+$location.$$port
                +'/escloud/slowlog/getClientLogList?clusterName='+clusterName
                +'&beginTime='+getTime(startTimeId)+'&endTime='+getTime(endTimeId)
                +'&costTime=&indexName='+null;

        var source = {
            datatype: "json",
            datafields: [
                { name: 'clientLogViewTime', type: 'string' },
                { name: 'costTime', type: 'string' },
                { name: 'serverTime', type: 'string' },
                { name: 'parseTime', type: 'string' },
                { name: 'respRecordNum', type: 'string' },
                { name: 'respRecordBytes', type: 'string' },
                { name: 'interfaceName', type: 'string' },
                { name: 'source', type: 'string' },
                { name: 'indexName', type: 'string' },
                { name: 'ops', type: 'string' },
                { name: 'serverIp', type: 'string' },
                { name: 'type', type: 'string' },
                { name: 'reqParam', type: 'string' }
            ],
            url: dataurl,
            beforeprocessing : function(data) {
                if (data != null && data.clientLogInfos != null) {
                    source.totalrecords = data.totalCount;
                    for(var i= 0;i < data.clientLogInfos.length;i++){
                        data.clientLogInfos[i].ops = '<a style="cursor: pointer;" onClick="showDetail('+data.clientLogInfos[i].id+')">详情</a>';
                    }
                    source.records = data.clientLogInfos;
                }
            }
        };

        var cellclass = function (row, columnfield, value) {
            return "enter";
        }

        $("#jqxLoader-clientlog").jqxLoader({ isModal: true, width: 100, height: 60, imagePosition: 'top' , autoOpen: true});
        var dataAdapter = new $.jqx.dataAdapter(source,{loadComplete: function () { $('#jqxLoader-clientlog').jqxLoader('close'); }});


        $("#slowlog-grid-clientlog").jqxGrid({
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
                {text: '操作时间', datafield: 'clientLogViewTime', width: '12%',cellsalign: 'right', align: 'right'},
                {text: '总耗时(ms)', datafield: 'costTime', width: '9%',cellsalign: 'right', align: 'right'},
                {text: '服务耗时(ms)', datafield: 'serverTime', width: '9%',cellsalign: 'right', align: 'right'},
                {text: '解析耗时(ms)', datafield: 'parseTime', width: '9%',cellsalign: 'right', align: 'right'},
                {text: '响应条数', datafield: 'respRecordNum', width: '9%' ,cellsalign: 'right', align: 'right',cellclassname:'center'},
                {text: '响应大小', datafield: 'respRecordBytes', width: '9%' ,cellsalign: 'right', align: 'right',cellclassname:'center'},
                {text: '接口名', datafield: 'interfaceName', width: '10%',cellsalign: 'right', align: 'right',cellclassname:'center'},
                {text: '来源', datafield: 'source', width: '8%',cellsalign: 'right', align: 'right',cellclassname:'center'},
                {text: '索引名', datafield: 'indexName', width: '17%',cellsalign: 'right', align: 'right',cellclassname:'center'},
                {text: '操作', datafield: 'ops', width: '8%',cellsalign: 'center', align: 'center',cellclassname:'center'}
            ]
        });

        $scope.showDetail2 = function (){
            console.log("woca");
        }

        $scope.queryLog = function (){
            $('#jqxLoader-clientlog').jqxLoader('open');
            $('#slowlog-grid-clientlog').jqxGrid('gotopage', 0);
            source.url = 'http://'+$location.$$host+':'+$location.$$port
                +'/escloud/slowlog/getClientLogList?clusterName='+clusterName
                +'&beginTime='+getTime(startTimeId)+'&endTime='+getTime(endTimeId)
                +'&costTime='+$scope.costTime
                +'&indexName='+$("#index-combobox-clientlog").val();

            $('#slowlog-grid-clientlog').jqxGrid('clearselection');
            $('#slowlog-grid-clientlog').jqxGrid('updatebounddata');
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

function showDetail(id){
    var logUrl = '/escloud/slowlog/getClientLogByRowInfo?clientLogId='+id;

    $.ajax({
        url: logUrl,
        cache: false
    })
    .done(function( reps ) {
        $('#that-modal-title').html("<h5>操作日志详情</h5>");
        $('#that-modal-body-content').html(JSONTree.create(reps));
        $('#modal_info2').modal({show: true, backdrop: true});
    });
}