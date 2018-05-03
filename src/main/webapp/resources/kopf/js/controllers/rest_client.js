kopf.controller('RestController', ['$scope', '$location', '$timeout',
    'ExplainService', 'AlertService', 'AceEditorService', 'ElasticService',
    'ClipboardService','ExternalSettingsService',
    function($scope, $location, $timeout, ExplainService, AlertService,
             AceEditorService, ElasticService, ClipboardService,ExternalSettingsService) {

        ExternalSettingsService.setTheme("dark");
        $("#jqxLoaderClient").jqxLoader({ width: 100, height: 60, imagePosition: 'center' });
        $scope.request = new Request(
            decodeURIComponent($location.search().path || ''),
            decodeURIComponent($location.search().method || 'GET'),
            decodeURIComponent($location.search().body || 'POST /_search \n{\n\n}')
        );

        $scope.validation_error = null;

        $scope.history = [];

        $scope.editor = null;
        $scope.response = '';
        $scope.explanationResults = [];

        $scope.mapping = undefined;
        $scope.options = [];

        $scope.updateOptions = function(text) {
            if ($scope.mapping) {
                var autocomplete = new URLAutocomplete($scope.mapping);
                $scope.options = autocomplete.getAlternatives(text);
            }
        };

        $scope.copyAsCURLCommand = function() {
            var method = $scope.request.method;
            var host = ElasticService.getHost();
            var path = encodeURI($scope.request.path);
            var body = $scope.editor.getValue();
            var curl = 'curl -X' + method + ' \'' + host + path + '\'';
            if (['POST', 'PUT'].indexOf(method) >= 0) {
                curl += ' -d \'' + body + '\'';
            }
            ClipboardService.copy(
                curl,
                function() {
                    AlertService.info('cURL request successfully copied to clipboard');
                },
                function() {
                    AlertService.error('Error while copying request to clipboard');
                }
            );
        };

        $scope.loadHistory = function() {
            var history = [];
            var rawHistory = localStorage.getItem('kopf_request_history');
            if (isDefined(rawHistory)) {
                try {
                    JSON.parse(rawHistory).forEach(function(h) {
                        history.push(new Request().loadFromJSON(h));
                    });
                } catch (error) {
                    localStorage.setItem('kopf_request_history', null);
                }
            }
            return history;
        };

        $scope.loadFromHistory = function(request) {
            $scope.request.path = encodeURI(request.path);
            $scope.request.body = request.body;
            $scope.request.method = request.method;
            $scope.editor.setValue(request.body);
        };
        
        $scope.loadFromHistory2 = function() {
        	var request = {path:"/dd",body:"qwe",method:"dd"};
            $scope.request.path = encodeURI(request.path);
            $scope.request.body = request.body;
            $scope.request.method = request.method;
            $scope.editor.setValue(request.body);
        };

        $scope.addToHistory = function(path, method, body) {
            var request = new Request(path, method, body);
            var exists = false;
            for (var i = 0; i < $scope.history.length; i++) {
                if ($scope.history[i].equals(request)) {
                    exists = true;
                    break;
                }
            }
            if (!exists) {
                $scope.history.unshift(request);
                if ($scope.history.length > 30) {
                    $scope.history.length = 30;
                }
                var historyRaw = JSON.stringify($scope.history); // 先字符串话再存
                localStorage.setItem('kopf_request_history', historyRaw);
            }
        };

        function _handleResponse(data) {
            $scope.response = JSON.parse(data);
        }
        
        function doSendRequest(successCallback) {
            $scope.editor.getValue(function(data){
                $scope.request.path=data[0].url;
                $scope.request.body=data[0].data;
                $scope.request.method = data[0].method;
                if (notEmpty($scope.request.path)) {
                    if($scope.request.path.indexOf("?") == -1) {
                        $scope.request.path += "?pretty";
                    }else if( $scope.request.path.indexOf("pretty") ==-1){
                        $scope.request.path += "&pretty";
                    }
                    var path = encodeURI('/' + $scope.request.path);
                    //  $scope.request.body = $scope.editor.format();
                    $scope.response = '';
                    $scope.explanationResults = [];
                    if ($scope.request.body.length==0 ) {
                        $scope.request.body = '{}';
                    }
                    if ($scope.request.method == 'GET' && '{}' !== $scope.request.body) {
                        AlertService.info('You are executing a GET request with body ' +
                            'content. Maybe you meant to use POST or PUT?');
                    }
                    console.log(path);
                    console.log($scope.request.body);

                    var url = 'http://'+$location.$$host+':'+$location.$$port
                        +'/eserknife/rest/proxy?clusterName='+clusterName;
                    var params = {
                        targetMethod:$scope.request.method,
                        targetPath:path,
                        targetBody:$scope.request.body
                    };
                    $('#jqxLoaderClient').jqxLoader('open');
                    ElasticService.clusterRequest2(url,'POST', "", params, {},
                        function(response) {
                            $('#jqxLoaderClient').jqxLoader('close');
                            successCallback(response);
                            $scope.addToHistory($scope.request.path,
                                $scope.request.method, $scope.request.body);
                        },
                        function(error, status) {
                            $('#jqxLoaderClient').jqxLoader('close');
                            if (status !== 0) {
                                AlertService.error('Request was not successful');
                                _handleResponse(error);
                            } else {
                                var url = ElasticService.connection.host + path;
                                AlertService.error(url + ' is unreachable');
                            }
                        }
                    );

                } else {
                    AlertService.warn('Path is empty');
                }
            });
        }
        $scope.doClientCollections=function(){
             var name = $("#name").val();
             if(!name){
        		 AlertService.error('请输入标题名称！');
        		 return;
        	}
            $scope.editor.getValue(function(data) {
                var requireMethod=data[0].method;
                var requireUrl=encodeURI(data[0].url);
                var requireContent= data[0].data;
                var params = {name:name,requireUrl:requireUrl,requireContent:requireContent,requireMethod:requireMethod};
                var url = 'http://'+$location.$$host+':'+$location.$$port
                    +'/eserknife/queryClientCollection/save?clusterName='+clusterName;
                $('#jqxLoaderClient').jqxLoader('open');
                ElasticService.clusterRequest2(url,'POST', "", params, {},
                    function(response) {
                        if(response && response.success){
                            AlertService.success("SUCCESS");
                            $('#jqxLoaderClient').jqxLoader('close');
                            $("#myPopover_client").hide();
                            $("#name").val('');
                            db_column_handler_type_client($scope,$location,AlertService);
                        }else if(response && response.done){
                            AlertService.error("该名称已收藏！");
                            $('#jqxLoaderClient').jqxLoader('close');
                        }else{
                            AlertService.error("系统异常，请联系管理员！");
                            $('#jqxLoaderClient').jqxLoader('close');
                        }
                    },
                    function(error, status) {
                        $('#jqxLoaderClient').jqxLoader('close');
                        if (status !== 0) {
                            AlertService.error('Request was not successful');
                        } else {
                            var url = ElasticService.connection.host + path;
                            AlertService.error(url + ' is unreachable');
                        }
                    }
                );
            });

        };
        $scope.sendRequest = function() {
            doSendRequest(function(response) {
                _handleResponse(response);
            });
        };
        $scope.isExplain = function() {
            var isSearch = $scope.request.path.indexOf('_search') >= 0;
            var isExplain = $scope.request.path.indexOf('_explain') >= 0;
            return ($scope.request.method === 'GET' && (isExplain || isSearch)) ||
                ($scope.request.method === 'POST' && isSearch);
        };

        $scope.explainRequest = function() {
            if (!ExplainService.isExplainPath($scope.request.path)) {
                AlertService.info('You are executing a request ' +
                    'without _explain nor ?explain=true');
            }
            doSendRequest(function(response) {
                $scope.explanationResults =
                    ExplainService.normalizeExplainResponse(response);
                $scope.response = response;
            });
        };

        $scope.exportAsCSV = function() {
            var csv = doCSV($scope.response);
            var blob = new Blob([csv], {type:'data:text/csv;charset=utf-8;'});
            var downloadLink = angular.element('<a></a>');
            downloadLink.attr('href', window.URL.createObjectURL(blob));
            downloadLink.attr('download', 'data.csv');
            downloadLink[0].click();
        };

        $scope.formatAll = function(){
            $scope.editor.format();
        };

        $scope.initEditor = function() {
            if (!isDefined($scope.editor)) {
                $scope.editor = AceEditorService.init('rest-client-editor','editor_actions','copy_as_all_curl');
                $scope.editor.setValue($scope.request.body);
            }
        };

        $scope.initializeController = function() {
            $scope.initEditor();
            $scope.history = $scope.loadHistory();
        };

        $scope.explanationTreeConfig = {
            expandOn: {
                field: 'description',
                titleClass: 'explanation-result-description'
            },
            columnDefs: [
                {
                    field: 'value',
                    titleClass: 'explanation-result-header',
                    cellClass: 'text-right'
                }
            ]
        };
        $(".wjlstop").on("click",function(event){
	        event.stopPropagation();
        });
        $("#sc_client").on("click",function(event){
        	if($("#myPopover_client").is(":hidden")){
        		$("#mySclb_client").hide();
    	        $("#myPopover_client").show();
        	}else{
        		 $("#myPopover_client").hide();
        	}
	        event.stopPropagation();
        });
        $("#sclb_client").on("click",function(event){
        	if($("#mySclb_client").is(":hidden")){
        		$('#dbcol-grid_from_type_client').jqxGrid('clearselection');
            	$("#myPopover_client").hide();
    	        $("#mySclb_client").show();
        	}else{
        		$("#mySclb_client").hide();
        	}
	        event.stopPropagation();
        });
        $("body").on("click",function(){
        	$("#mySclb_client").hide();
	        $("#myPopover_client").hide();	
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
                $("#dbcol-grid_from_type_client").jqxGrid('addfilter', datafield, filtergroup);
                // apply the filters.
                $("#dbcol-grid_from_type_client").jqxGrid('applyfilters');
                $("#dbcol-grid_from_type_client").jqxGrid('closemenu');
           }else{
           	 $("#dbcol-grid_from_type_client").jqxGrid('removefilter', datafield);
                // apply the filters.
                $("#dbcol-grid_from_type_client").jqxGrid('applyfilters');
                $("#dbcol-grid_from_type_client").jqxGrid('closemenu');
           }
       });
        db_column_handler_type_client($scope, $location,AlertService);
    }

]);

function db_column_handler_type_client($scope, $location,AlertService) {
    $scope.dataurl = 'http://' + $location.$$host + ':' + $location.$$port
        + '/eserknife/queryClientCollection/getList?clusterName='+clusterName;
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
    $("#dbcol-grid_from_type_client").jqxGrid({
        width: '99%',
        height: 250,
        source: dataAdapter,
        filterable: false,
        theme: 'metrodark',
        selectionmode: "multiplecellsextended",
        autoshowfiltericon: true,
        columnmenuopening: function (menu, datafield, height) {
            var column = $("#dbcol-grid_from_type_client").jqxGrid('getcolumn', datafield);
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
    $('#dbcol-grid_from_type_client').unbind('cellclick');
    $('#dbcol-grid_from_type_client').bind('cellclick', function (event) {
        var colName = event.args.value+"";
        if(colName.indexOf("清除") > 0){
        	var id =event.args.value.substr(event.args.value.indexOf("(")+1,event.args.value.indexOf(")")-event.args.value.indexOf("(")-1);
	       	 var url = 'http://' + $location.$$host + ':' + $location.$$port
	         + '/eserknife/queryClientCollection/updateState?id='+id+'&clusterName='+clusterName;
	         $.ajax({
	             url: url,
	             cache: false
	         }).done(function( reps ) {
	        	 if(reps && reps.success){
	        		AlertService.success("SUCCESS");
	        		var rowId = $('#dbcol-grid_from_type_client').jqxGrid('getrowid', event.args.rowindex);
	             	$('#dbcol-grid_from_type_client').jqxGrid('deleterow', rowId);
	        	 }else if(reps && reps.checkError){
	        		 AlertService.error("非本人操作");
	        	 }else{
	        		 AlertService.error("系统异常，请联系管理员！");
	        	 }
	         });
        	return;
        }else{
        	 var url = 'http://' + $location.$$host + ':' + $location.$$port
             + '/eserknife/queryClientCollection/getDetailByName?name='+colName+'&clusterName='+clusterName;
             $.ajax({
                 url: url,
                 cache: false
             }).done(function( reps ) {
             	if(reps.data != null){
             	  $scope.request.path = encodeURI(reps.data.requireUrl);
                  $scope.request.body = reps.data.requireContent;
                  $scope.request.method = reps.data.requireMethod
                  var resultBody = $scope.request.method+" "+ $scope.request.path +"\r" +  $scope.request.body;
                  $scope.editor.setValue(resultBody);
                  $scope.$apply();
             	}
             });
             $('#dbcol-grid_from_type_client').jqxGrid('clearselection');
             $("#mySclb_client").hide();
        }
    });
}