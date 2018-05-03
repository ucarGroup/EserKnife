kopf.controller('QueryController', ['$scope', '$location','$timeout',
    'ExternalSettingsService', 'ElasticService', 'ConfirmDialogService2','AlertService',
    'HostHistoryService',
    function ($scope, $location,$timeout, ExternalSettingsService, ElasticService,ConfirmDialogService2,
              AlertService, HostHistoryService) {
        ExternalSettingsService.setTheme("dark");
        
        $scope.conditions = [{id:0,view:true,isReady:false},{id:1,view:false,isReady:false},{id:2,view:false,isReady:false}];

        $scope.fls = {};
        $scope.curIndex = "";
        $scope.resultMaxNum = "20";
        $scope.opsType= "match";
        $scope.results = [];
        $scope.logicOps = "must";
        $scope.hasResult = false;
        $scope.costTime = 0;
        $scope.docNum = 0;
        $scope.isAdmin=isAdmin;
        $scope.isProd = isProd;

        $scope.$watch(
            function() {
                return ElasticService.cluster;
            },
            function(filter, previous) {
                if(!ElasticService.cluster) return;
                if($scope.indices == undefined)
                {
                    $scope.indices = ElasticService.getIndices();
                    return;
                }

                var changes = ElasticService.cluster.changes;
                if (changes && changes.hasChanges()) {
                    $scope.indices = ElasticService.getIndices();
                }
            },
            true
        );
        
        $scope.doCollections=function(){
        	var conditions = buildConds();
        	var name = $("#name").val();
        	if(!name){
        		 AlertService.error('请输入标题名称！');
        		 return;
        	}
        	 var params = {name:name,indexName:$scope.curIndex,maxNum:$scope.resultMaxNum,queryConditions:conditions};
             var url = 'http://'+$location.$$host+':'+$location.$$port
                 +'/eserknife/queryCollection/save?clusterName='+clusterName;
             $('#jqxLoader').jqxLoader('open');
             ElasticService.clusterRequest2(url,'POST', "", params, {},
                 function(response) {
	            	 if(response && response.success){
	            		 AlertService.success("SUCCESS");
	                     $('#jqxLoader').jqxLoader('close');
	                     $("#myPopover").hide();
	                     $("#name").val('');
	                     db_column_handler_type_query($scope,$location,AlertService);
	            	 }else if(response && response.done){
	            		 AlertService.error("该名称已收藏！");
	            		 $('#jqxLoader').jqxLoader('close');
	            	 }else{
	            		 AlertService.error("系统异常，请联系管理员！");
	            		 $('#jqxLoader').jqxLoader('close');
	            	 }
                 },
                 function(error, status) {
                     $('#jqxLoader').jqxLoader('close');
                     if (status !== 0) {
                         AlertService.error('Request was not successful');
                     } else {
                         var url = ElasticService.connection.host + path;
                         AlertService.error(url + ' is unreachable');
                     }
                 }
             );
        };
        
        $scope.sendRequest = function (){
            var conditions = buildConds();
            var params = {indexName:$scope.curIndex,maxNum:$scope.resultMaxNum,conds:conditions};
            if(!validate(params)) return;
            //post 2 server
            //console.log(params);
            params.conds = JSON.stringify(conditions);
            var url = 'http://'+$location.$$host+':'+$location.$$port
                +'/eserknife/query/proxy?clusterName='+clusterName;

            $('#jqxLoader').jqxLoader('open');
            ElasticService.clusterRequest2(url,'POST', "", params, {},
                function(response) {
                    $('#jqxLoader').jqxLoader('close');
                    showResult(response);
                },
                function(error, status) {
                    $('#jqxLoader').jqxLoader('close');
                    if (status !== 0) {
                        AlertService.error('Request was not successful');
                    } else {
                        var url = ElasticService.connection.host + path;
                        AlertService.error(url + ' is unreachable');
                    }
                }
            );
        };

        $scope.export = function (){
            var conditions = buildConds();
            var params = {indexName:$scope.curIndex,maxNum:$scope.resultMaxNum,conds:conditions};
            if(!validate(params)) return;
            //post 2 server
            //console.log(params);
            params.conds = JSON.stringify(conditions);
            var url = 'http://'+$location.$$host+':'+$location.$$port
                +'/eserknife/query/exportOrDelete?clusterName='+clusterName;

            $("#submit4Deldoc").click();
            ConfirmDialogService2.open(
                '删除文档',
                '确认按照当前查询条件 <span style="font-size: 20px;color: #fb4e0b">删除</span> 索引 <span style="font-size: 20px;color: #be386a"> '
                + $scope.curIndex + '</span> 下的文档吗?',
                '删除',
                function () {
                    delDoc();
                }
            );

            var delDoc = function(){

                $('#jqxLoader').jqxLoader('open');
                ElasticService.clusterRequest2(url,'POST', "", params, {},
                    function(response) {
                        $('#jqxLoader').jqxLoader('close');
                        //showResult(response);
                        AlertService.info(response);
                    },
                    function(error, status) {
                        $('#jqxLoader').jqxLoader('close');
                        if (status !== 0) {
                            AlertService.error('Request was not successful');
                        } else {
                            var url = ElasticService.connection.host + path;
                            AlertService.error(url + ' is unreachable');
                        }
                    }
                );
            }

        };


        var showResult = function(response){

            if(response && response.data && !response.err) {
                $scope.results = response.data;
                $scope.costTime = response.costTime;
                $scope.docNum = response.docNum;
                $scope.hasResult = true;

                var conds = buildConds();
                for(var k = 0;k < $scope.results.length;k++) {
                    var eachRes = $scope.results[k];
                    for(each in eachRes) {

                        eachRes[each] = highLight(each,eachRes[each]);
                    }
                }

                function highLight(targetField,targetFieldValue){
                    //targetField in conds,highLight
                    for(var j = 0;j<conds.length;j++) {
                        if(conds[j]['fieldName'] == targetField) {

                            //match replace
                            if(conds[j].opsType == 'match') {
                                var qText = conds[j].qText;
                                var colored = '<span style="color: yellow">' + qText + '</span>';
                                var highLightValue = targetFieldValue.replace(qText, colored);
                                return highLightValue;
                            }else if(conds[j].opsType == 'range') {
                                return '<span style="color: #fbd972">' + targetFieldValue + '</span>';
                            }
                        }
                    }
                    return '<span>'+targetFieldValue+'</span>';
                }
            }else {
                console.log("to handle err by code");
            }
        };

        var validate = function (params) {
            if($scope.curIndex == ""){
                $("#index-combobox").jqxComboBox('focus');
                return false;
            }
            for (var i = 0; i < params.conds.length; i++) {
                var eachCond = params.conds[i];
                //如果列名和查询文本没有填,忽略
                if(eachCond.opsType == 'match' && !notEmpty(eachCond.fieldName) && !notEmpty(eachCond.qText)){
                    continue;
                }
                if(eachCond.opsType == 'range' && !notEmpty(eachCond.fieldName) && (!notEmpty(eachCond.gtText) && !notEmpty(eachCond.ltText)) ){
                    continue;
                }
                if(eachCond.opsType == 'range' && notEmpty(eachCond.fieldName) && (notEmpty(eachCond.gtText) || notEmpty(eachCond.ltText)) ){
                    continue;
                }
                if(eachCond.opsType == 'missing' && !notEmpty(eachCond.fieldName)){
                    continue;
                }

                //检查 & focus
                if(eachCond.fieldName == undefined || eachCond.fieldName == "") {
                    //$("#field"+eachCond.cid).focus();
                    $("#field"+eachCond.cid).jqxComboBox('focus');
                    return false;
                }
                if(eachCond.opsType == 'match'){
                    if(eachCond.qText == undefined || eachCond.qText == "") {
                        $("#qtext"+eachCond.cid).focus();
                        return false;
                    }
                }else if(eachCond.opsType == 'range'){
                    if(eachCond.gtText == undefined ||  eachCond.gtText == "") {
                        $("#qtext4Gt"+eachCond.cid).focus();
                        return false;
                    }
                    if(eachCond.ltText == undefined || eachCond.ltText == "") {
                        $("#qtext4Lt"+eachCond.cid).focus();
                        return false;
                    }
                }
            }
            return true;
        };
        var buildConds = function (){
            var condArr = [];
            for(var i = 0; i < $scope.conditions.length ; i++){
                if($scope.conditions[i].view){
                    var cid = $scope.conditions[i].id;
                    var logicOps = $("#logicOps"+cid).val();
                    //var fieldName = $("#field"+cid).val();
                    var fieldName = $("#field"+cid).jqxComboBox('val');
                    var opsType = $("#ops"+cid).val();
                    var qtext = $("#qtext"+cid).val();
                    var gtops = $("#gtops"+cid).val();
                    var qtext4Gt = $("#qtext4Gt"+cid).val();
                    var ltops = $("#ltops"+cid).val();
                    var qtext4Lt = $("#qtext4Lt"+cid).val();

                    if(opsType == 'match' && !notEmpty(fieldName) && !notEmpty(qtext)){
                        continue;
                    }
                    if(opsType == 'range' && !notEmpty(fieldName) && (notEmpty(qtext4Gt) || notEmpty(qtext4Lt)) ){
                        continue;
                    }
                    if(opsType == 'missing' && !notEmpty(fieldName)){
                        continue;
                    }

                    if(opsType == 'match'){
                        condArr.push(new QueryCondition(cid,logicOps,fieldName,opsType,qtext));
                    }else if(opsType == 'range'){
                        condArr.push(new QueryCondition(cid,logicOps,fieldName,opsType,'',gtops,qtext4Gt,ltops,qtext4Lt));
                    }else{
                        condArr.push(new QueryCondition(cid,logicOps,fieldName,opsType));
                    }
                }
                //console.log("id = " + $scope.conditions[i].id + ",view = " + $scope.conditions[i].view);
            }
            return condArr;
        };


        $scope.showNextCond = function (cond){
            for(var i = 0; i < $scope.conditions.length ; i++){
                if($scope.conditions[i].view == false){
                    $scope.conditions[i].view = true;
                    //同步当前索引的字段列表i
                    //$scope.renderCombo(i);
                    break;
                }
            }
        };

        $scope.hideCurCond = function (cond){
            //console.log(cond.id);
            var onlyOneLeft = 0;
            for(var i = 0; i < $scope.conditions.length ; i++){
                if($scope.conditions[i].view == true){
                    onlyOneLeft ++;
                    //break;
                }
            }
            if(onlyOneLeft<=1){
                return;
            }

            //reset cur
            $scope.conditions[cond.id].view = false;
            $("#logicOps"+cond.id).get(0).selectedIndex = 0;
            //$("#field"+cond.id).get(0).selectedIndex = 0;
            $("#field"+cond.id).jqxComboBox('clearSelection');
            $("#ops"+cond.id).get(0).selectedIndex = 0;
            $("#qtext"+cond.id).val('');

            $("#match"+cond.id).removeClass("hide").addClass("show");
            $("#range"+cond.id).removeClass("show").addClass("hide");
            $("#qtext4Gt"+cond.id).val('');
            $("#qtext4Lt"+cond.id).val('');
            $("#ltops"+cond.id).get(0).selectedIndex = 0;
            $("#gtops"+cond.id).get(0).selectedIndex = 0;

        };

        $scope.change = function(cond,obj) {
            if(obj.opsType == "match") {
                $("#match"+cond.id).removeClass("hide").addClass("show");
                $("#range"+cond.id).removeClass("show").addClass("hide");
            }else if(obj.opsType == "range"){
                $("#match"+cond.id).removeClass("show").addClass("hide");
                $("#range"+cond.id).removeClass("hide").addClass("show");
            }else{
                $("#match"+cond.id).removeClass("show").addClass("hide");
                $("#range"+cond.id).removeClass("show").addClass("hide");
            }
        };

        $scope.changeLogicOps = function(cond,obj) {
            if(obj.logicOps == "must" || obj.logicOps == "must not") { //当前选must或者mustnot
                for(var i = 0; i < $scope.conditions.length ; i++) {
                    if (cond.id != $scope.conditions[i].id
                                && "should" == $("#logicOps"+$scope.conditions[i].id).val()) {//邻居是显示状态,且为should,那么改成must & 把should选项隐藏
                        $("#logicOps"+$scope.conditions[i].id).get(0).selectedIndex = 0;
                        $("#must"+$scope.conditions[i].id).removeClass("hide").addClass("show");
                        $("#mustnot"+$scope.conditions[i].id).removeClass("hide").addClass("show");

                        $("#should"+$scope.conditions[i].id).removeClass("show").addClass("hide");
                    }
                }
            }else if(obj.logicOps == "should"){ //当前选should
                for(var i = 0; i < $scope.conditions.length ; i++) {
                    if (cond.id != $scope.conditions[i].id) { //邻居是显示状态,那么一律改成should & 把must/mustnot隐藏
                        $("#logicOps"+$scope.conditions[i].id).get(0).selectedIndex = 2;
                        $("#must"+$scope.conditions[i].id).removeClass("show").addClass("hide");
                        $("#mustnot"+$scope.conditions[i].id).removeClass("show").addClass("hide");
                        $("#should"+$scope.conditions[i].id).removeClass("hide").addClass("show");

                    }
                }
            }
        };

        $scope.indexNames = [];

        /**
         * 初始化索引combobox的数据
         */
        $scope.getQueryIndexNames = function(){
            $scope.$watch(
                function() {
                    return ElasticService.cluster;
                },
                function(filter, previous) {
                    if(!ElasticService.cluster) return;
                    if($scope.indexNames.length == 0){
                        var indexNames = ElasticService.getAllIndicesNames();
                        $scope.indexNames = indexNames;
                        $("#index-combobox").jqxComboBox({source:indexNames});
                        /*ElasticService.getIndices().forEach(function (eachIndex) {
                         $scope.indexNames.push(eachIndex.name);
                         $("#index-combobox").jqxComboBox('addItem', eachIndex.name );
                         });*/
                        return;
                    }
                },
                true
            );
        }
        setTimeout(function() {
            $scope.getQueryIndexNames();
        },10);

        $("#index-combobox").jqxComboBox({
            height:30,
            width:'100%',
            theme: 'metrodark',
            searchMode: 'contains',
            autoComplete: true,
            placeHolder:'选择索引',
            source: $scope.indexNames
        });

        /**
         * 索引选择框发生变化,级联更新列combobox的数据
         */
        $("#index-combobox").on('change', function (event)
        {
            if (event.args) {
                var item = event.args.item;
                var value = item.value;
                if (isDefined(value)) {
                    $scope.curIndex = value;
                    source.url = "http://"+$location.$$host+':'+$location.$$port+'/eserknife/query/getFieldInfos?clusterName='+clusterName
                        +'&queryString=&indexName='+$scope.curIndex;
                    dataAdapter.dataBind();  // 刷新绑定的数据
                }
            }
        });

        var source =
        {
            datatype: "json",
            datafields: [
                { name: 'fName' },
                { name: 'fValue' }
            ],
            url: "http://"+$location.$$host+':'+$location.$$port+'/eserknife/query/getFieldInfos?clusterName='+clusterName
                    +'&indexName=&queryString='
        };
        var dataAdapter = new $.jqx.dataAdapter(source);
        /**
         * 当页面的循环指令执行完毕后,初始化列的combobox
         */
        $scope.$on('ngRepeatFinished', function (ngRepeatFinishedEvent) {
            for(var i = 0; i < $scope.conditions.length ; i++){

                $("#field"+i).jqxComboBox({
                    height:30,
                    width:'100%',
                    theme: 'metrodark',
                    //autoDropDownHeight:true,
                    autoItemsHeight:true,
                    searchMode: 'contains',
                    placeHolder:'选择字段',
                    autoComplete: true,
                    //remoteAutoComplete: true,
                    source: dataAdapter,
                    displayMember: "fName",
                    valueMember: "fName"
                });
                
                $("#field"+i).on('bindingComplete', function (event) {
                	var curindex = event.currentTarget.id.substring(5);
                	$scope.conditions[curindex].isReady = true;
                });
            }
        });

        $("#jqxLoader").jqxLoader({ isModal: true, width: 100, height: 60, imagePosition: 'top' });

        document.onkeydown = function(e){
            var ev = document.all ? window.event : e;
            if(ev.keyCode==13) {
                $scope.sendRequest();
            }
        };

        $(".wjlstop").on("click",function(event){
	        event.stopPropagation();
        });
        $("#sc").on("click",function(event){
        	if($("#myPopover").is(":hidden")){
        		$("#mySclb").hide();
    	        $("#myPopover").show();
    	        event.stopPropagation();
        	}else{
    	        $("#myPopover").hide();
        	}
        });
        $("#sclb").on("click",function(event){
        	if($("#mySclb").is(":hidden")){
        		$('#dbcol-grid_from_type_query').jqxGrid('clearselection');
            	$("#myPopover").hide();
    	        $("#mySclb").show();
    	        event.stopPropagation();
        	}else{
        		 $("#mySclb").hide();
        	}
        	
        });
        $("body").on("click",function(){
        	$("#myPopover").hide();
	        $("#mySclb").hide();
        });
        
        $("#filterName").on("keyup",function(){
             var filtergroup = new $.jqx.filter();
             var filter_or_operator = 1;
             var filtervalue = $("#filterName").val();
	       	 var filtercondition = 'contains';
	         var datafield="name";
	         var filter1 = filtergroup.createfilter('stringfilter', filtervalue, filtercondition);            
	         filtergroup.addfilter(filter_or_operator, filter1);
            if(filtervalue){
                 // add the filters.
                 $("#dbcol-grid_from_type_query").jqxGrid('addfilter', datafield, filtergroup);
                 // apply the filters.
                 $("#dbcol-grid_from_type_query").jqxGrid('applyfilters');
                 $("#dbcol-grid_from_type_query").jqxGrid('closemenu');
            }else{
            	 $("#dbcol-grid_from_type_query").jqxGrid('removefilter', datafield);
                 // apply the filters.
                 $("#dbcol-grid_from_type_query").jqxGrid('applyfilters');
                 $("#dbcol-grid_from_type_query").jqxGrid('closemenu');
            }
        });
        db_column_handler_type_query($scope, $location,AlertService);

        styleFix();
    }
]);

function QueryCondition(cid,logicOps,fieldName,opsType,qText,gtOps,gtText,ltOps,ltText){
    this.cid = cid;
    this.logicOps = logicOps;
    this.fieldName = fieldName;
    this.opsType = opsType;
    this.qText = qText;
    this.gtOps = gtOps;
    this.gtText = gtText;
    this.ltOps = ltOps;
    this.ltText = ltText;
}

function db_column_handler_type_query($scope, $location,AlertService) {
    $scope.dataurl = 'http://' + $location.$$host + ':' + $location.$$port
        + '/eserknife/queryCollection/getList?clusterName='+clusterName;
    $scope.source = {
        datatype: "json",
        datafields: [
            {name: 'name', type: 'string'},
            {name: 'action', type: 'string'}
        ],
        url: $scope.dataurl,
        beforeprocessing: function (data) {
            if (data != null && data.dbColNames != null) {
                for(var i= 0;i < data.dbColNames.length;i++){
                	data.dbColNames[i].action = '<a style="cursor: pointer;" data="('+data.dbColNames[i].id+')">清除</a>';
                }
                $scope.source.records = data.dbColNames;
            }
        }
    };

    var dataAdapter = new $.jqx.dataAdapter($scope.source);
    $("#dbcol-grid_from_type_query").jqxGrid({
        width: '99%',
        height: 250,
        source: dataAdapter,
        filterable: false,
        theme: 'metrodark',
        selectionmode: "multiplecellsextended",
        autoshowfiltericon: true,
        columnmenuopening: function (menu, datafield, height) {
            var column = $("#dbcol-grid_from_type_query").jqxGrid('getcolumn', datafield);
            if (column.filtertype === "custom") {
                menu.height(155);
                setTimeout(function () {
                    menu.find('input').focus();
                }, 25);
            }
            else menu.height(height);
        },
        columns: [
            {
                text: '标题',
                datafield: 'name',
                width: '80%',
                columntype: 'custom',
                createfilterpanel: function (datafield, filterPanel) {
                    buildFilterPanel(filterPanel, datafield);
                }
            },
            {text: '操作', datafield: 'action', columntype: 'temple', hidden: false}
        ],
    });
    $('#dbcol-grid_from_type_query').unbind('cellclick');
    $('#dbcol-grid_from_type_query').bind('cellclick', function (event) {
    	$scope.conditions[0].isReady = false;
    	$scope.conditions[1].isReady = false;
    	$scope.conditions[2].isReady = false;
        var colName = event.args.value+"";
        if(colName.indexOf("清除") > 0){
        	var id =event.args.value.substr(event.args.value.indexOf("(")+1,event.args.value.indexOf(")")-event.args.value.indexOf("(")-1);
	       	 var url = 'http://' + $location.$$host + ':' + $location.$$port
	         + '/eserknife/queryCollection/updateState?id='+id+'&clusterName='+clusterName;
	         $.ajax({
	             url: url,
	             cache: false
	         }).done(function( reps ) {
	        	 if(reps && reps.success){
	        		AlertService.success("SUCCESS");
	        		var rowId = $('#dbcol-grid_from_type_query').jqxGrid('getrowid', event.args.rowindex);
	             	$('#dbcol-grid_from_type_query').jqxGrid('deleterow', rowId);
	        	 }else if(reps && reps.checkError){
	        		 AlertService.error("非本人操作");
	        	 }else{
	        		 AlertService.error("系统异常，请联系管理员！");
	        	 }
	         });
        	return;
        }else{
        	 var url = 'http://' + $location.$$host + ':' + $location.$$port
             + '/eserknife/queryCollection/getDetailByName?name='+colName+'&clusterName='+clusterName;
             $.ajax({
                 url: url,
                 cache: false
             }).done(function( reps ) {
             	if(reps.data != null){
             		$("#index-combobox").val(reps.data.index);
             		$scope.resultMaxNum=reps.data.count+"";
             		var qucos = reps.data.queryCollectionSubInfos;
             		if(qucos != null && qucos.length > 0){
             			var interval = setInterval(function() { 
             				if($scope.conditions[0].isReady && $scope.conditions[1].isReady && $scope.conditions[2].isReady){
             					for ( var int = 0; int < $scope.conditions.length; int++) {
                     				if(int != 0){
                     					$("#rowHide"+int).click();
                     				}
             					}
             					for (var i=0;i<qucos.length;i++) {
             						if(i!=0){
             							$("#rowShow"+(i-1)).click();
             						}
             					}	
             					for (var i=0;i<qucos.length;i++) {
             						var cid = $scope.conditions[i].id;
                                     $("#logicOps"+cid).val(qucos[i].logicCondition);
                                     $("#field"+cid).val(qucos[i].logicVal);
                                     $("#ops"+cid).val(qucos[i].condition);
                                     $("#qtext"+cid).val(qucos[i].conVal);
                                     $("#gtops"+cid).val(qucos[i].conGt);
                                     $("#qtext4Gt"+cid).val(qucos[i].conGtTime);
                                     $("#ltops"+cid).val(qucos[i].conLt);
                                     $("#qtext4Lt"+cid).val(qucos[i].conLtTime);
                                     var opsType = qucos[i].condition;
                                     if(opsType== "match") {
                                         $("#match"+cid).removeClass("hide").addClass("show");
                                         $("#range"+cid).removeClass("show").addClass("hide");
                                     }else if(opsType == "range"){
                                         $("#match"+cid).removeClass("show").addClass("hide");
                                         $("#range"+cid).removeClass("hide").addClass("show");
                                     }else{
                                         $("#match"+cid).removeClass("show").addClass("hide");
                                         $("#range"+cid).removeClass("show").addClass("hide");
                                     }
             					}
             					clearInterval(interval);
             			    	$scope.conditions[0].isReady = false;
             			    	$scope.conditions[1].isReady = false;
             			    	$scope.conditions[2].isReady = false;
             				}
             			}, 200); 
             			
             		}else{
             			for ( var int = 0; int < $scope.conditions.length; int++) {
             				if(int != 0){
             					$("#rowHide"+int).click();
             				}
     					}
             				var cid = $scope.conditions[0].id;
                             $("#logicOps"+cid).val('must');
                             $("#field"+cid).val('');
                             $("#ops"+cid).val("match");
                             $("#qtext"+cid).val('');
                             $("#gtops"+cid).val('');
                             $("#qtext4Gt"+cid).val('');
                             $("#ltops"+cid).val('');
                             $("#qtext4Lt"+cid).val('');
                             var opsType = "match";
                             if(opsType== "match") {
                                 $("#match"+cid).removeClass("hide").addClass("show");
                                 $("#range"+cid).removeClass("show").addClass("hide");
                             }else if(opsType == "range"){
                                 $("#match"+cid).removeClass("show").addClass("hide");
                                 $("#range"+cid).removeClass("hide").addClass("show");
                             }else{
                                 $("#match"+cid).removeClass("show").addClass("hide");
                                 $("#range"+cid).removeClass("show").addClass("hide");
                             }
             		}
             	}
             });
             $("#mySclb").hide();
             $('#dbcol-grid_from_type_query').jqxGrid('clearselection');
        }
    });
}

function styleFix(){
    var isMac = (navigator.platform == "Mac68K") || (navigator.platform == "MacPPC")
        || (navigator.platform == "Macintosh") || (navigator.platform == "MacIntel");
    if(isMac) {
        $("#myPopover").css("margin-left",-143);
        $("#mySclb").css("margin-left",-184);
    }
}
