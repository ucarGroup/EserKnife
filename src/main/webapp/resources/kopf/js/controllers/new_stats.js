kopf.controller('NewStatsController', ['$scope', '$location',
    'ExternalSettingsService', 'ElasticService', 'AlertService',
    'HostHistoryService','AppState','$http',
function ($scope, $location, ExternalSettingsService, ElasticService,AlertService,$http) {

    ExternalSettingsService.setTheme("dark");

    var m = new Map();

    var type = new Map();

    var labelMap =new Map();
    labelMap.set("资源使用占比","resouceUsed");
    labelMap.set("堆内存","heapMem");
    labelMap.set("垃圾回收","GC");
    labelMap.set("索引段","indicesSegments");

    labelMap.set("每分钟搜索次数","search_requests_per_second");
    labelMap.set("每分钟搜索耗时","search_time_per_second");
    labelMap.set("每分钟索引次数","indexing_requests_per_second");
    labelMap.set("每分钟索引耗时","indexing_time_per_second");
    labelMap.set("每分钟Get次数","get_requests_per_second");
    labelMap.set("每分钟Get耗时","get_time_per_second");


    labelMap.set("search","search");
    labelMap.set("index","index");
    labelMap.set("bulk","bulk");
    labelMap.set("refresh","refresh");
    labelMap.set("JVM线程池","threads");
    labelMap.set("系统内存","mem");
    labelMap.set("通道连接","channels");
    labelMap.set("通道流量","transport_size");


    $scope.allEcharts = "";

    $scope.selectIp = "";
    var startTimeId = 'startTime4Stat';
    var endTimeId = 'endTime4Stat';

    initDate(startTimeId,endTimeId,null,1,1);

    $scope.setStorageValue = function () {
        var items = $('#jqxTreeCookie').jqxTree('getCheckedItems');
        if(items && items.length > 0) {
            var storageValue = '';
            for (var i = 0; i < items.length; i++) {
                var item = items[i];
                if (item.value) {
                    storageValue += labelMap.get(item.label);
                    if (i != (items.length - 1)) {
                        storageValue += ","
                    }
                }
            }
            if (typeof(Storage) !== "undefined") {
                localStorage.setItem("storageValue",storageValue);
            }else{
                AlertService.warn( "抱歉！您的浏览器不支持 Web Storage ...");
            }
        }
    }

    $scope.configCheckBox = function () {
        $("#dropDownButton").jqxDropDownButton({ width: 25, height: 25,theme:"metrodark",rtl:true});
        $("#jqxTreeCookie").jqxTree({ allowDrag: false, allowDrop: false,source: source,hasThreeStates: true,
            checkboxes: true,width: 345, height: 600,theme:"metrodark"});
        $('#jqxTreeCookie').on('checkChange',function (event){
            $scope.setStorageValue();
        });
        if(typeof(Storage) !== "undefined"){
            var storageValue = localStorage.getItem("storageValue");
            if(storageValue){
                var storageValues = storageValue.split(",");
                for(var i = 0;i<storageValues.length;i++){
                    $("#jqxTreeCookie").jqxTree('checkItem', $("#"+storageValues[i]+'CheckBox')[0], true);
                }
            }else{
                $('#jqxTreeCookie').jqxTree('checkAll');
                $scope.setStorageValue();
            }
        }else{
            $('#jqxTreeCookie').jqxTree('checkAll');
            $scope.setStorageValue();
        }

    };
   document.onkeyup = function(event) {
        if (event.keyCode == "13") {
            var root = document.getElementById("statEchart");
            if(root){
                $scope.showStatPic();
            }
        }
    };

    $(".select_clustom_time").click(function () {
        $(".select_clustom_time" ).each(function (i) {
            $(this).removeClass("select");
        });
        $(this).addClass("select");
        initDate(startTimeId,endTimeId,null,$(this).attr("data"),1);
        if($scope.selectIp && $scope.selectIp.length > 1){
            $scope.showStatPic();
        }
    });

    $($(".select_clustom_time")[0]).addClass("select");

    $scope.loadHost = function () {
        ElasticService.clusterRequest2("/eserknife/monitor/getHosts?clusterName="+clusterName,
            'GET', "", {}, {},
            function (res) {
                if (res.success) {
                    $scope.ips = res.ips;
                    setTimeout(function(){
                        $( ".clusterNode" ).each(function (i) {
                            if(i === 0){
                                $(this).addClass("select");
                                $scope.selectIp =this.innerText;
                            }
                        });

                        $(".clusterNode").click(function () {
                            $( ".clusterNode" ).each(function (i) {
                                $(this).removeClass("select");
                            });
                            $(this).addClass("select");
                            $scope.selectIp =this.innerText;
                            $scope.showStatPic();
                        })
                    },100);
                }else{
                    AlertService.error(res.errMsg);
                }
            }
        );
    };

    $scope.drawEchart=function(res,dataType){
        var root = document.getElementById("statEchart");
        if(root){
            var subDom = document.getElementById(dataType);
            var my_Echarts= echarts.init(subDom,'dark');
            m.set(dataType,my_Echarts);
            my_Echarts.setOption($scope.buildInfo(res,dataType));
        }
    };

    $scope.monitorInfo = function (dataType) {
        var host =  $scope.selectIp ;
        var root = document.getElementById("statEchart");
        if(host && root){
            var startTime =$('#startTime4Stat').val();
            var endTime= $('#endTime4Stat').val();
            $('#'+dataType).empty();
            $('#'+dataType).append('<div id="'+dataType+'tt"></div>');
            $('#'+dataType+'tt').jqxLoader({theme:"metrodark", text:'',width: 40, height: 35, imagePosition: 'top', autoOpen: true });
            ElasticService.clusterRequest2("/eserknife/monitor/getMonitorInfo",
                'POST', "",
                {
                    "clusterName":clusterName,
                    "host":host,
                    "dataType":dataType,
                    "startTime":startTime,
                    "endTime":endTime
                },
                {},
                function (res) {
                    if (res.success) {
                        $scope.drawEchart(res,dataType);
                       if(document.getElementById(dataType+'tt')) {
                           $('#'+dataType+'tt').jqxLoader('close');
                       }
                    }else{
                        AlertService.error(res.errMsg);
                    }
                }
            )
        }
    };

    $scope.drawEchartBigOrSmall=function(dataType){
        var root = document.getElementById("statEchart");
        if(root){
            var bigType = type.get(dataType+"_big");
            var old_Echart= m.get(dataType);
            var old_option = old_Echart.getOption();
            if(!bigType){
                $('#'+dataType).css("width", '92.5%');
                type.set(dataType+"_big",true);
                    old_option.dataZoom =  [{
                        show : true,
                        realtime : true,
                        start : 0,
                        end : 100
                    },{
                        type: 'inside',
                        realtime: true,
                        start : 0,
                        end : 100
                    }];
            }else{
                $('#'+dataType).css("width", '45%');
                type.set(dataType+"_big",false);
                old_option.dataZoom =  [];
            }
            var subDom = document.getElementById(dataType);
            var my_Echarts= echarts.init(subDom,'dark');
                my_Echarts.setOption(old_option);

        }
    };

    $scope.showStatPic = function(){
        if($scope.selectIp){
            var root = document.getElementById("statEchart");
            if(root) {
                var items = $('#jqxTreeCookie').jqxTree('getCheckedItems');
                if(items && items.length > 0){
                    var sb = '';
                    for(var i = 0 ;i<items.length;i++){
                        var item = items[i];
                        if(item.value){
                            sb+= item.value+":"+ labelMap.get(item.label);
                            if(i != (items.length-1)){
                                sb+=","
                            }
                        }

                    }
                    $scope.allEcharts = sb;
                }else{
                    $scope.allEcharts = "";
                    $("#statEchart").empty();
                    return false;
                }
                $("#statEchart").empty();
                var echarts = $scope.allEcharts.split(",");
                for(var i = 0 ;i<echarts.length;i++){
                    var gn = echarts[i].split(":");
                    var groupRootFlag = document.getElementById(gn[0]);
                    if(!groupRootFlag){
                        var element = $("#"+gn[0]+"Group")[0];
                        var item = $('#jqxTreeCookie').jqxTree('getItem', element);
                        $("#statEchart").append('<h3 style="color:#8293d2;margin-bottom: 5px;margin-left: 30px;font-size: 20px">'+item.label+'</h3> <div class="row"  id="'+gn[0]+'"></div>');
                    }
                    $("#"+gn[0]).append("<div id='"+gn[1]+"' style='position:relative;float:left;margin: 5px 5px 5px 45px;width:45%;height:15%;background-color: #333;'></div>")
                }
                $scope.initFlag = 1;
            }
            setTimeout(function () {
                for(var i = 0 ;i<echarts.length;i++) {
                    var gn = echarts[i].split(":");
                    $scope.monitorInfo(gn[1]);
                }
            }, 500);
        }
    };

    $scope.initializeController = function() {
        $scope.loadHost();
        $scope.configCheckBox();
        setTimeout(function(){
            $scope.showStatPic();
        },200);

    }

    $scope.buildInfo = function (info,dataType){
        if(dataType == 'resouceUsed'){
            return {
                title: {
                    text: '资源使用占比（%）',
                    textStyle:{
                        fontSize:15
                    }
                },
                legend:{
                    data:['cpu','mem'],
                    orient: 'horizontal',
                    x: 'center',
                    y: 'top',
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        animation: false
                    }
                },
                toolbox: {
                    show : true,
                    feature : {
                        myButtons:{
                            show:true,
                            title:'缩放',
                            icon:'image://http://'+$location.$$host+':'+$location.$$port+'/eserknife/resources/kopf/imgs/more.png',
                            option:{},
                            onclick:function(data) {
                                $scope.drawEchartBigOrSmall('resouceUsed');
                            }
                        },
                    }
                },
                grid: {
                    left: 50,
                    right: 50,
                    height: '52%'
                },
                xAxis: {
                    type: 'time',
                    splitLine: {
                        show: false
                    }
                },
                yAxis: {
                    type: 'value',
                    boundaryGap: [0, '100%'],
                    max: 100
                },
                series: [{
                    name: 'cpu',
                    type: 'line',
                    showSymbol: false,
                    hoverAnimation: false,
                    data: info.cpuArray,
                    smooth: true
                },{
                    name: 'mem',
                    type: 'line',
                    showSymbol: false,
                    hoverAnimation: false,
                    data: info.memArray,
                    smooth: true
                }]
            };
        }else if(dataType == 'heapMem'){
            return {
                title: {
                    text: '堆内存',
                    textStyle:{
                        fontSize:15
                    }
                },
                legend:{
                    data:['heapUsed','heapCommited'],
                    orient: 'horizontal',
                    x: 'center',
                    y: 'top',
                },
                toolbox: {
                    show : true,
                    feature : {
                        myButtons:{
                            show:true,
                            title:'缩放',
                            icon:'image://http://'+$location.$$host+':'+$location.$$port+'/eserknife/resources/kopf/imgs/more.png',
                            option:{},
                            onclick:function(data) {
                                $scope.drawEchartBigOrSmall('heapMem');
                            }
                        },
                    }
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        animation: false
                    },
                    formatter: function (params) {
                        var param1 = params[0];
                        var name1 =param1.seriesName;
                        var d1 = param1.value[1]/1024/1024/1024;
                        var param2 = params[1];
                        var name2 =param2.seriesName;
                        var d2 = param2.value[1]/1024/1024/1024;
                        var time = param2.value[0];
                        return time+"<br>"+name1+":"+d1.toFixed(2)+ "gb"+"<br>"+name2+":"+d2.toFixed(2)+"gb";
                    }
                },
                grid: {
                    left: 70,
                    right: 50,
                    height: '52%'
                },
                xAxis: {
                    type: 'time',
                    splitLine: {
                        show: false
                    }
                },
                yAxis: {
                    type: 'value',
                    boundaryGap: [0, '100%'],
                    axisLabel : {
                        formatter: function (value,index) {
                            var d = value/1024/1024/1024;
                            return d.toFixed(2)+ "gb";
                        }
                    }
                },
                series: [{
                    name: 'heapUsed',
                    type: 'line',
                    stack: '总量',
                    areaStyle: {normal: {}},
                    showSymbol: false,
                    hoverAnimation: false,
                    data: info.heapUsed,
                    smooth: true
                },{
                    name: 'heapCommited',
                    type: 'line',
                    stack: '总量',
                    areaStyle: {normal: {}},
                    showSymbol: false,
                    hoverAnimation: false,
                    data: info.heapCommited,
                    smooth: true
                }]
            };
        }else if(dataType == "GC"){
            return {
                title: {
                    text: '垃圾回收',
                    textStyle:{
                        fontSize:15
                    }
                },
                legend:{
                    data:['Old gen count','Young gen count'],
                    orient: 'horizontal',
                    x: 'center',
                    y: 'top',
                },
                toolbox: {
                    show : true,
                    feature : {
                        myButtons:{
                            show:true,
                            title:'缩放',
                            icon:'image://http://'+$location.$$host+':'+$location.$$port+'/eserknife/resources/kopf/imgs/more.png',
                            option:{},
                            onclick:function(data) {
                                $scope.drawEchartBigOrSmall('GC');
                            }
                        },
                    }
                },
                grid: {
                    left: 50,
                    right: 50,
                    height: '52%'
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        animation: false
                    }
                },
                xAxis: {
                    type: 'time',
                    splitLine: {
                        show: false
                    },
                },
                yAxis: {
                    type: 'value',
                    boundaryGap: [0, '100%']
                },
                series: [{
                    name: 'Old gen count',
                    type: 'line',
                    showSymbol: false,
                    hoverAnimation: false,
                    data: info.old,
                    smooth: true
                },{
                    name: 'Young gen count',
                    type: 'line',
                    showSymbol: false,
                    hoverAnimation: false,
                    data: info.young,
                    smooth: true
                }]
            };
        }else if(dataType == "indicesSegments"){
            return {
                title: {
                    text: '索引段',
                    textStyle:{
                        fontSize:15
                    }
                },
                grid: {
                    left: 50,
                    right: 50,
                    height: '52%'
                },
                legend:{
                    data:['Segments count'],
                    orient: 'horizontal',
                    x: 'center',
                    y: 'top',
                },
                toolbox: {
                    show : true,
                    feature : {
                        myButtons:{
                            show:true,
                            title:'缩放',
                            icon:'image://http://'+$location.$$host+':'+$location.$$port+'/eserknife/resources/kopf/imgs/more.png',
                            option:{},
                            onclick:function(data) {
                                $scope.drawEchartBigOrSmall('indicesSegments');
                            }
                        },
                    }
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        animation: false
                    }
                },
                xAxis: {
                    type: 'time',
                    splitLine: {
                        show: false
                    },
                },
                yAxis: {
                    type: 'value',
                    boundaryGap: [0, '100%']
                },
                series: [{
                    name: 'Segments count',
                    type: 'line',
                    showSymbol: false,
                    hoverAnimation: false,
                    data: info.segmentCounts,
                    smooth: true
                }]
            };
        }else if(dataType =="search_requests_per_second"){
            return {
                title: {
                    text: '每分钟搜索次数',
                    textStyle:{
                        fontSize:15
                    }
                },
                grid: {
                    left: 50,
                    right: 50,
                    height: '52%'
                },
                legend:{
                    data:['Query','Fetch'],
                    orient: 'horizontal',
                    x: 'center',
                    y: 'top',
                },
                toolbox: {
                    show : true,
                    feature : {
                        myButtons:{
                            show:true,
                            title:'缩放',
                            icon:'image://http://'+$location.$$host+':'+$location.$$port+'/eserknife/resources/kopf/imgs/more.png',
                            option:{},
                            onclick:function(data) {
                                $scope.drawEchartBigOrSmall('search_requests_per_second');
                            }
                        },
                    }
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        animation: false
                    }
                },
                xAxis: {
                    type: 'time',
                    splitLine: {
                        show: false
                    },
                },
                yAxis: {
                    type: 'value',
                    boundaryGap: [0, '100%']
                },
                series: [{
                    name: 'Query',
                    type: 'line',
                    showSymbol: false,
                    hoverAnimation: false,
                    data: info.queryCounts,
                    smooth: true
                },{
                    name: 'Fetch',
                    type: 'line',
                    showSymbol: false,
                    hoverAnimation: false,
                    data: info.fetchCounts,
                    smooth: true
                }]
            };
        }else if(dataType =="search_time_per_second"){
            return {
                title: {
                    text: '每分钟搜索耗时',
                    textStyle:{
                        fontSize:15
                    }
                },
                grid: {
                    left: 50,
                    right: 50,
                    height: '52%'
                },
                legend:{
                    data:['Query','Fetch'],
                    orient: 'horizontal',
                    x: 'center',
                    y: 'top',
                },
                toolbox: {
                    show : true,
                    feature : {
                        myButtons:{
                            show:true,
                            title:'缩放',
                            icon:'image://http://'+$location.$$host+':'+$location.$$port+'/eserknife/resources/kopf/imgs/more.png',
                            option:{},
                            onclick:function(data) {
                                $scope.drawEchartBigOrSmall('search_time_per_second');
                            }
                        },
                    }
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        animation: false
                    }
                },
                xAxis: {
                    type: 'time',
                    splitLine: {
                        show: false
                    },
                },
                yAxis: {
                    type: 'value',
                    boundaryGap: [0, '100%']
                },
                series: [{
                    name: 'Query',
                    type: 'line',
                    showSymbol: false,
                    hoverAnimation: false,
                    data: info.queryTime,
                    smooth: true
                },{
                    name: 'Fetch',
                    type: 'line',
                    showSymbol: false,
                    hoverAnimation: false,
                    data: info.fetchTime,
                    smooth: true
                }]
            };
        }else if(dataType =="indexing_requests_per_second"){
            return {
                title: {
                    text: '每分钟索引次数',
                    textStyle:{
                        fontSize:15
                    }
                },
                grid: {
                    left: 50,
                    right: 50,
                    height: '52%'
                },
                legend:{
                    data:['Delete','Index'],
                    orient: 'horizontal',
                    x: 'center',
                    y: 'top',
                },
                toolbox: {
                    show : true,
                    feature : {
                        myButtons:{
                            show:true,
                            title:'缩放',
                            icon:'image://http://'+$location.$$host+':'+$location.$$port+'/eserknife/resources/kopf/imgs/more.png',
                            option:{},
                            onclick:function(data) {
                                $scope.drawEchartBigOrSmall('indexing_requests_per_second');
                            }
                        },
                    }
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        animation: false
                    }
                },
                xAxis: {
                    type: 'time',
                    splitLine: {
                        show: false
                    },
                },
                yAxis: {
                    type: 'value',
                    boundaryGap: [0, '100%']
                },
                series: [{
                    name: 'Delete',
                    type: 'line',
                    showSymbol: false,
                    hoverAnimation: false,
                    data: info.indiceDelete,
                    smooth: true
                },{
                    name: 'Index',
                    type: 'line',
                    showSymbol: false,
                    hoverAnimation: false,
                    data: info.indiceIndex,
                    smooth: true
                }]
            };
        }else if(dataType =="indexing_time_per_second"){
            return {
                title: {
                    text: '每分钟索引耗时',
                    textStyle:{
                        fontSize:15
                    }
                },
                grid: {
                    left: 50,
                    right: 50,
                    height: '52%'
                },
                legend:{
                    data:['Delete','Index'],
                    orient: 'horizontal',
                    x: 'center',
                    y: 'top',
                },
                toolbox: {
                    show : true,
                    feature : {
                        myButtons:{
                            show:true,
                            title:'缩放',
                            icon:'image://http://'+$location.$$host+':'+$location.$$port+'/eserknife/resources/kopf/imgs/more.png',
                            option:{},
                            onclick:function(data) {
                                $scope.drawEchartBigOrSmall('indexing_time_per_second');
                            }
                        },
                    }
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        animation: false
                    }
                },
                xAxis: {
                    type: 'time',
                    splitLine: {
                        show: false
                    },
                },
                yAxis: {
                    type: 'value',
                    boundaryGap: [0, '100%']
                },
                series: [{
                    name: 'Delete',
                    type: 'line',
                    showSymbol: false,
                    hoverAnimation: false,
                    data: info.deleteTime,
                    smooth: true
                },{
                    name: 'Index',
                    type: 'line',
                    showSymbol: false,
                    hoverAnimation: false,
                    data: info.indexTime,
                    smooth: true
                }]
            };
        }else if(dataType =="get_requests_per_second"){
            return {
                title: {
                    text: '每分钟Get次数',
                    textStyle:{
                        fontSize:15
                    }
                },
                grid: {
                    left: 50,
                    right: 50,
                    height: '52%'
                },
                legend:{
                    data:['Get','Exists','Missing'],
                    orient: 'horizontal',
                    x: 'center',
                    y: 'top',
                },
                toolbox: {
                    show : true,
                    feature : {
                        myButtons:{
                            show:true,
                            title:'缩放',
                            icon:'image://http://'+$location.$$host+':'+$location.$$port+'/eserknife/resources/kopf/imgs/more.png',
                            option:{},
                            onclick:function(data) {
                                $scope.drawEchartBigOrSmall('get_requests_per_second');
                            }
                        },
                    }
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        animation: false
                    }
                },
                xAxis: {
                    type: 'time',
                    splitLine: {
                        show: false
                    },
                },
                yAxis: {
                    type: 'value',
                    boundaryGap: [0, '100%']
                },
                series: [{
                    name: 'Get',
                    type: 'line',
                    showSymbol: false,
                    hoverAnimation: false,
                    data: info.getCounts,
                    smooth: true
                },{
                    name: 'Exists',
                    type: 'line',
                    showSymbol: false,
                    hoverAnimation: false,
                    data: info.existsCounts,
                    smooth: true
                },{
                    name: 'Missing',
                    type: 'line',
                    showSymbol: false,
                    hoverAnimation: false,
                    data: info.missingCounts,
                    smooth: true
                }]
            };
        }else if(dataType =="get_time_per_second"){
            return {
                title: {
                    text: '每分钟Get耗时',
                    textStyle:{
                        fontSize:15
                    }
                },
                grid: {
                    left: 50,
                    right: 50,
                    height: '52%'
                },
                legend:{
                    data:['Get','Exists','Missing'],
                    orient: 'horizontal',
                    x: 'center',
                    y: 'top',
                },
                toolbox: {
                    show : true,
                    feature : {
                        myButtons:{
                            show:true,
                            title:'缩放',
                            icon:'image://http://'+$location.$$host+':'+$location.$$port+'/eserknife/resources/kopf/imgs/more.png',
                            option:{},
                            onclick:function(data) {
                                $scope.drawEchartBigOrSmall('get_time_per_second');
                            }
                        },
                    }
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        animation: false
                    }
                },
                xAxis: {
                    type: 'time',
                    splitLine: {
                        show: false
                    },
                },
                yAxis: {
                    type: 'value',
                    boundaryGap: [0, '100%']
                },
                series: [{
                    name: 'Get',
                    type: 'line',
                    showSymbol: false,
                    hoverAnimation: false,
                    data: info.getTimes,
                    smooth: true
                },{
                    name: 'Exists',
                    type: 'line',
                    showSymbol: false,
                    hoverAnimation: false,
                    data: info.existsTimes,
                    smooth: true
                },{
                    name: 'Missing',
                    type: 'line',
                    showSymbol: false,
                    hoverAnimation: false,
                    data: info.missingTimes,
                    smooth: true
                }]
            };
        }else if(dataType == "search" || dataType == "index" || dataType == "bulk" || dataType == "refresh" ){
            return {
                title: {
                    text: dataType,
                    textStyle:{
                        fontSize:15
                    }
                },
                grid: {
                    left: 50,
                    right: 50,
                    height: '52%'
                },
                legend:{
                    data:['Queue','Peak','Count'],
                    orient: 'horizontal',
                    x: 'center',
                    y: 'top',
                },
                toolbox: {
                    show : true,
                    feature : {
                        myButtons:{
                            show:true,
                            title:'缩放',
                            icon:'image://http://'+$location.$$host+':'+$location.$$port+'/eserknife/resources/kopf/imgs/more.png',
                            option:{},
                            onclick:function(data) {
                                $scope.drawEchartBigOrSmall(data.option.title[0].text);
                            }
                        },
                    }
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        animation: false
                    }
                },
                xAxis: {
                    type: 'time',
                    splitLine: {
                        show: false
                    },
                },
                yAxis: {
                    type: 'value',
                    boundaryGap: [0, '100%']
                },
                series: [{
                    name: 'Queue',
                    type: 'line',
                    showSymbol: false,
                    hoverAnimation: false,
                    data: info.queue,
                    smooth: true
                },{
                    name: 'Peak',
                    type: 'line',
                    showSymbol: false,
                    hoverAnimation: false,
                    data: info.peak,
                    smooth: true
                },{
                    name: 'Count',
                    type: 'line',
                    showSymbol: false,
                    hoverAnimation: false,
                    data: info.count,
                    smooth: true
                }]
            };
        }else if(dataType == "threads"){
            return {
                title: {
                    text: 'JVM线程池',
                    textStyle:{
                        fontSize:15
                    }
                },
                grid: {
                    left: 50,
                    right: 50,
                    height: '52%'
                },
                legend:{
                    data:['Peak','Count'],
                    orient: 'horizontal',
                    x: 'center',
                    y: 'top',
                },
               /* legend:{
                    type: 'scroll'
                },*/
                toolbox: {
                    show : true,
                    feature : {
                        myButtons:{
                            show:true,
                            title:'缩放',
                            icon:'image://http://'+$location.$$host+':'+$location.$$port+'/eserknife/resources/kopf/imgs/more.png',
                            option:{},
                            onclick:function(data) {
                                $scope.drawEchartBigOrSmall('threads');
                            }
                        },
                    }
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        animation: false
                    }
                },
                xAxis: {
                    type: 'time',
                    splitLine: {
                        show: false
                    },
                },
                yAxis: {
                    type: 'value',
                    boundaryGap: [0, '100%']
                },
                series: [{
                    name: 'Peak',
                    type: 'line',
                    showSymbol: false,
                    hoverAnimation: false,
                    data: info.threadPeak,
                    smooth: true
                },{
                    name: 'Count',
                    type: 'line',
                    showSymbol: false,
                    hoverAnimation: false,
                    data: info.threadCount,
                    smooth: true
                }]
            };
        }else if(dataType =="mem"){
            return {
                title: {
                    text: '系统内存',
                    textStyle:{
                        fontSize:15
                    }
                },
                grid: {
                    left: 50,
                    right: 50,
                    height: '52%'
                },
                legend:{
                    data:['Free','Used'],
                    orient: 'horizontal',
                    x: 'center',
                    y: 'top',
                },
                toolbox: {
                    show : true,
                    feature : {
                        myButtons:{
                            show:true,
                            title:'缩放',
                            icon:'image://http://'+$location.$$host+':'+$location.$$port+'/eserknife/resources/kopf/imgs/more.png',
                            option:{},
                            onclick:function(data) {
                                $scope.drawEchartBigOrSmall('mem');
                            }
                        },
                    }
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        animation: false
                    },
                    formatter: function (params) {
                        var param1 = params[0];
                        var name1 =param1.seriesName;
                        var d1 = param1.value[1]/1024/1024/1024;
                        var param2 = params[1];
                        var name2 =param2.seriesName;
                        var d2 = param2.value[1]/1024/1024/1024;
                        var time = param2.value[0];
                        return time+"<br>"+name1+":"+d1.toFixed(1)+ "gb"+"<br>"+name2+":"+d2.toFixed(1)+"gb";
                    }
                },
                xAxis: {
                    type: 'time',
                    splitLine: {
                        show: false
                    },
                },
                yAxis: {
                    type: 'value',
                    boundaryGap: [0, '100%'],
                    axisLabel : {
                        formatter: function (value,index) {
                            var d = value/1024/1024/1024;
                            return d.toFixed(0)+ "gb";
                        }
                    }
                },
                series: [{
                    name: 'Free',
                    type: 'line',
                    showSymbol: false,
                    hoverAnimation: false,
                    data: info.memFreeArray,
                    smooth: true
                },{
                    name: 'Used',
                    type: 'line',
                    showSymbol: false,
                    hoverAnimation: false,
                    data: info.memUsedArray,
                    smooth: true
                }]
            };
        }else if(dataType == "channels"){
            return {
                title: {
                    text: '通道连接',
                    textStyle:{
                        fontSize:15
                    }
                },
                grid: {
                    left: 50,
                    right: 50,
                    height: '52%'
                },
                legend:{
                    data:['Transport','Http'],
                    orient: 'horizontal',
                    x: 'center',
                    y: 'top',
                },
                toolbox: {
                    show : true,
                    feature : {
                        myButtons:{
                            show:true,
                            title:'缩放',
                            icon:'image://http://'+$location.$$host+':'+$location.$$port+'/eserknife/resources/kopf/imgs/more.png',
                            option:{},
                            onclick:function(data) {
                                $scope.drawEchartBigOrSmall('channels');
                            }
                        },
                    }
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        animation: false
                    }
                },
                xAxis: {
                    type: 'time',
                    splitLine: {
                        show: false
                    },
                },
                yAxis: {
                    type: 'value',
                    boundaryGap: [0, '100%']
                },
                series: [{
                    name: 'Transport',
                    type: 'line',
                    showSymbol: false,
                    hoverAnimation: false,
                    data: info.channelsTransport,
                    smooth: true
                },{
                    name: 'Http',
                    type: 'line',
                    showSymbol: false,
                    hoverAnimation: false,
                    data: info.channelsHttp,
                    smooth: true
                }]
            };
        }else if(dataType=="transport_size"){
            return {
                title: {
                    text: "通道流量",
                    textStyle:{
                        fontSize:15
                    }
                },
                grid: {
                    left: 70,
                    right: 50,
                    height: '52%'
                },
                legend:{
                    data:['Rx','Tx'],
                    orient: 'horizontal',
                    x: 'center',
                    y: 'top',
                },
                toolbox: {
                    show : true,
                    feature : {
                        myButtons:{
                            show:true,
                            title:'缩放',
                            icon:'image://http://'+$location.$$host+':'+$location.$$port+'/eserknife/resources/kopf/imgs/more.png',
                            option:{},
                            onclick:function(data) {
                                $scope.drawEchartBigOrSmall('transport_size');
                            }
                        },
                    }
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        animation: false
                    },
                    formatter: function (params) {
                        var param1 = params[0];
                        var name1 =param1.seriesName;
                        var d1 = param1.value[1]/1024/60;
                        var param2 = params[1];
                        var name2 =param2.seriesName;
                        var d2 = param2.value[1]/1024/60;
                        var time = param2.value[0];
                        return time+"<br>"+name1+":"+d1.toFixed(1)+ "kb"+"<br>"+name2+":"+d2.toFixed(1)+"kb";
                    }
                },
                xAxis: {
                    type: 'time',
                    splitLine: {
                        show: false
                    },
                },
                yAxis: {
                    type: 'value',
                    boundaryGap: [0, '100%'],
                    axisLabel : {
                        formatter: function (value,index) {
                            var d = value/1024/60;
                            return d.toFixed(1)+ "kb";
                        }
                    }
                },
                series: [{
                    name: 'Rx',
                    type: 'line',
                    showSymbol: false,
                    hoverAnimation: false,
                    data: info.transportRx,
                    smooth: true
                },{
                    name: 'Tx',
                    type: 'line',
                    showSymbol: false,
                    hoverAnimation: false,
                    data: info.transportTx,
                    smooth: true
                }]
            };
        }else{
            return {
                title: {
                    text: 'TODO',
                    textStyle:{
                        fontSize:15
                    }
                },
                grid: {
                    left: 50,
                    right: 50,
                    height: '52%'
                },
                toolbox: {
                    show : true,
                    feature : {
                        mark : {show: true},
                        dataView : {readOnly:false},
                        magicType : {show: true, type: ['line', 'bar', 'stack', 'tiled']},
                        restore : {show: true},
                        saveAsImage : {show: true}
                    }
                },
                legend:{
                    type: 'scroll'
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        animation: false
                    }
                },
                xAxis: {
                    type: 'time',
                    splitLine: {
                        show: false
                    },
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                    name: 'cpu',
                    type: 'line',
                    showSymbol: false,
                    hoverAnimation: false,
                    data: info.cpuArray,
                    smooth: true
                },{
                    name: 'mem',
                    type: 'line',
                    showSymbol: false,
                    hoverAnimation: false,
                    data: info.memArray,
                    smooth: true
                }]
            };
        }
    }

 }
]);

