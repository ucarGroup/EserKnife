kopf.controller('StatsController', ['$scope', '$location',
    'ExternalSettingsService', 'ElasticService', 'AlertService',
    'HostHistoryService','AppState','$http',
    function ($scope, $location, ExternalSettingsService, ElasticService,$http) {

        ExternalSettingsService.setTheme("dark");

        $('#jqxTree').jqxTree({ height: '500px', width: '100%',theme: 'metrodark'});

        $scope.clusterName = clusterName;
        $scope.nodeStats = nodeIpsInPage;
        var startTimeId = 'startTime4Stat';
        var endTimeId = 'endTime4Stat';
        initDate(startTimeId,endTimeId);

        $scope.$on('ngRepeatFinished', function (ngRepeatFinishedEvent) {
            //var loadedNodeStats = ngRepeatFinishedEvent.currentScope.nodeStats;
            //console.log($scope.nn);
            //for (each in loadedNodeStats){
            //    $scope.drawStatPic(loadedNodeStats[each]);
            //}
        });

        $scope.drawStatPic = function(nodeStat){
            var domId = "picturePlace"+nodeStat.id;
            var width = Math.floor($("#curRow").width()) ;
            var height = Math.floor(width*1/4);
            $("#"+domId).width(width);
            $("#"+domId).height(height);

            var dom = document.getElementById(domId);
            var myChart = echarts.init(dom,'dark');

            myChart.setOption(nodeStat, true);
        }


        $scope.redrawStatPic = function (type){ //页面初始化的时候调用一次

            if(!type) type = $scope.statTarget;

            var doDraw = function (response) {
                //构造nodes,把 data & title & label xy
                //画图
                var xinfo = buildInfo(response.nodeInfo,$scope.statTarget);
                xinfo.ip=response.nodeInfo.ip;
                xinfo.id=response.nodeInfo.id;
                $scope.drawStatPic(xinfo);
            };

            for (var i = 0;i < nodeIpsInPage.length ; i++){
                var url = 'http://'+$location.$$host+':'+$location.$$port
                    + '/escloud/getStatByNodeId?clusterName='+clusterName
                    + '&nodeIp='+nodeIpsInPage[i]["ip"]+'&type='
                    + $scope.statTarget+'&startTime='
                    + $("#"+startTimeId).val()+'&endTime='+$("#"+endTimeId).val();
                ElasticService.clusterRequest2(url,'GET', "", {}, {}, doDraw, {});
            }
        }

        $scope.menu = {'线程池':{status:'extended'},'节点命令':{status:'collapse'},'JVM':{status:'collapse'},'OS':{status:'collapse'}};
        $('#jqxTree').on('itemClick',function (event)
        {
            var args = event.args;
            var item = $('#jqxTree').jqxTree('getItem', args.element);
            var label = item.label;
            var itemId = item.id;
            //debugger;
            //console.log(label);
            if(label === '线程池' || label === '节点命令' || label === 'JVM' || label === 'OS') {
                if($scope.menu[label].status == 'extended') {
                    $('#jqxTree').jqxTree('collapseItem', args.element);
                    $scope.menu[label].status = 'collapse';
                }else if($scope.menu[label].status == 'collapse'){
                    $('#jqxTree').jqxTree('expandItem', args.element);
                    $scope.menu[label].status = 'extended';
                }
                return;
            }
            $scope.statTarget = itemId;
            $scope.redrawStatPic(itemId);
        });

        $('#jqxTree').jqxTree('selectItem', $("#listener")[0]);
        $scope.statTarget = "listener";
        $scope.redrawStatPic("listener");

    }
]);

var buildInfo = function (info,target) {

    if(target.slice(-3) == 'Cmd') {
        return {
            title: {
                text: info.ip
            },
            tooltip : {
                trigger: 'axis'
            },
            legend: {
                data:['平均耗时','执行次数']
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: info.time
            },
            yAxis: [
                {
                    name: '平均耗时(ms)',
                    type: 'value'
                },
                {
                    name: '执行次数(个)',
                    //inverse: true,
                    //nameLocation: 'start',
                    type: 'value'
                }
            ],
            series: [
                {
                    name: '平均耗时',
                    type: 'line',
                    smooth: true,
                    data: info.avgCostTime
                },
                {
                    name: '执行次数',
                    yAxisIndex:1,
                    type: 'line',
                    smooth: true,
                    data: info.execTime
                }
            ]
        };
    }else if(target.slice(-3) == 'Gen' || target == 'memoryOS' || target == 'swapOS'){
        return {
            title: {
                text: info.ip
            },
            tooltip : {
                trigger: 'axis'
            },
            legend: {
                data:['已用内存','最大内存']
            },
            xAxis : [
                {
                    type : 'category',
                    boundaryGap : false,
                    data : info.time
                }
            ],
            yAxis : [
                {
                    name: '单位(M)',
                    type: 'value'
                }
            ],
            series : [
                {
                    name:'已用内存',
                    type:'line',
                    //stack: '总量',
                    areaStyle: {normal: {}},
                    data:info.usedSize
                },
                {
                    name:'最大内存',
                    type:'line',
                    //stack: '总量',
                    //areaStyle: {normal: {}},  //
                    data:info.maxSize
                }
            ]
        };
    }else if(target == 'cpuOS'){
        return {
            title: {
                text: info.ip
            },
            tooltip : {
                trigger: 'axis'
            },
            legend: {
                data:['cpu 使用率']
            },
            xAxis : [
                {
                    type : 'category',
                    boundaryGap : false,
                    data : info.time
                }
            ],
            yAxis : [
                {
                    name: '百分比(%)',
                    type: 'value'
                }
            ],
            series : [
                {
                    name:'使用率',
                    type:'line',
                    areaStyle: {normal: {}},
                    data:info.cpuRate
                }
            ]
        };
    }else if(target == 'loadOS'){
        return {
            title: {
                text: info.ip
            },
            tooltip : {
                trigger: 'axis'
            },
            legend: {
                data:['系统负载']
            },
            xAxis : [
                {
                    type : 'category',
                    boundaryGap : false,
                    data : info.time
                }
            ],
            yAxis : [
                {
                    name: '负载',
                    type: 'value'
                }
            ],
            series : [
                {
                    name:'负载值',
                    type:'line',
                    areaStyle: {normal: {}},
                    data:info.load
                }
            ]
        };
    }else{
        return {
            title: {
                text: info.ip
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data:['队列中','已拒绝','已完成','最大值','活跃中']
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: info.time
            },
            yAxis: [
                {
                    name: '线程数(个)',
                    type: 'value'
                }
            ],
            series: [
                {
                    name: '队列中',
                    type: 'line',
                    smooth: true,
                    data: info.queueThreadCount
                },
                {
                    name: '已拒绝',
                    type: 'line',
                    smooth: true,
                    data: info.rejectedThreadCount
                },
                {
                    name: '已完成',
                    type: 'line',
                    smooth: true,
                    data: info.completedThreadCount
                },
                {
                    name: '最大值',
                    type: 'line',
                    smooth: true,
                    data: info.largestThreadCount
                },
                {
                    name: '活跃中',
                    type: 'line',
                    smooth: true,
                    data: info.activeThreadCount
                }]
        };
    }
}