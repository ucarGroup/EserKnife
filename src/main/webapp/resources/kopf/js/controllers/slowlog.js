kopf.controller('SlowLogController', ['$scope', '$location',
    'ExternalSettingsService', 'ElasticService', 'AlertService',
    'HostHistoryService','AppState','$http',
    function ($scope, $location, ExternalSettingsService, ElasticService,
              AlertService, HostHistoryService,AppState,$http) {

        ExternalSettingsService.setTheme("dark");
        $scope.nodeStats = nodeIpsInPage;
        var startTimeId = 'startTime4Slowlog';
        var endTimeId = 'endTime4Slowlog';
        initDate(startTimeId,endTimeId);

        $scope.drawStatPic = function(nodeStat){
            var domId = "slowLogPlace"+nodeStat.id;
            var width = Math.floor($("#curRow").width()) ;
            var height = Math.floor(width*1/4);
            $("#"+domId).width(width);
            $("#"+domId).height(height);

            var dom = document.getElementById(domId);
            var myChart = echarts.init(dom,'dark');

            myChart.setOption(nodeStat, true);
        }

        $scope.statTarget = "listener";

        $scope.redrawStatPic = function (type){ //页面初始化的时候调用一次

            if(!type) type = $scope.statTarget;

            var buildInfo = function (info) {
                return {
                    ip:info.serverIp,
                    id:info.id,
                    title: {
                        text: info.serverIp
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data:['平均时间','最大时间','慢日志次数']
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: info.collectTime
                    },
                    yAxis:[
                        {
                            type: 'value',
                            name: '单位(ms)',
                        },
                        {
                            name: '执行次数(个)',
                            type: 'value'
                        }
                    ],
                    series: [
                        {
                            name: '平均时间',
                            type: 'line',
                            smooth: true,
                            data: info.slowLogAvgTime
                        },
                        {
                            name: '最大时间',
                            type: 'line',
                            smooth: true,
                            data: info.slowLogMaxTime
                        },
                        {
                            name: '慢日志次数',
                            type: 'line',
                            yAxisIndex:1,
                            smooth: true,
                            data: info.slowLogCount
                        }]
                };
            }

            var doDraw = function (response) {
                //构造nodes,把 data & title & label xy
                //画图
                var xinfo = buildInfo(response.nodeInfo);

                $scope.drawStatPic(xinfo);
            };

            for (var i = 0;i < nodeIpsInPage.length ; i++){
                var url = 'http://'+$location.$$host+':'+$location.$$port
                    +'/escloud/slowlog/getSlowLogChart?clusterName='+clusterName+'&slowLogIndex=&slowLogType=&serverIp='+nodeIpsInPage[i]["ip"]+'&beginTime='+$("#startTime4Slowlog").val()+'&endTime='+$("#endTime4Slowlog").val();
                ElasticService.clusterRequest2(url,'GET', "", {}, {}, doDraw, {});
            }

        }

        $scope.redrawStatPic("listener");

    }
]);
