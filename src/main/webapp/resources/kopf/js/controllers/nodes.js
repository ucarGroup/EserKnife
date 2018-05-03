kopf.controller('NodesController', ['$scope','$location', 'ConfirmDialogService',
  'AlertService', 'ElasticService', 'AppState',
  function($scope, $location,ConfirmDialogService, AlertService, ElasticService,
           AppState) {

    $scope.sortBy = 'name';
    $scope.reverse = false;

    $scope.setSortBy = function(field) {
      if ($scope.sortBy === field) {
        $scope.reverse = !$scope.reverse;
      }
      $scope.sortBy = field;
    };

    $scope.filter = AppState.getProperty(
        'NodesController',
        'filter',
        new NodeFilter('', true, true, true, 0)
    );

    $scope.nodes = [];

    $scope.$watch('filter',
        function(newValue, oldValue) {
          $scope.refresh();
        },
        true);

    $scope.$watch(
        function() {
          return ElasticService.cluster;
        },
        function(newValue, oldValue) {
          $scope.refresh();
        }
    );

    $scope.refresh = function() {
      var nodes = ElasticService.getNodes();
      var allNodes= nodeIpsInPage;
      var indexs=ElasticService.getIndices();
      var map = new Object(); 
	  for ( var int = 0; int < nodes.length; int++) {
	    	var myNode = nodes[int];
	    	var count = 0;
	    	for ( var int2 = 0; int2 < indexs.length; int2++) {
	    		var index = indexs[int2];
	    		var shards = ElasticService.cluster.getShards(myNode.id, index.name);
	    		if(shards){
	    			count += shards.length;
	    		}
			}
	    	myNode.shardCount=count;
	    	map[myNode.host] = myNode;
		}
	  var myNodes = new Array();
	  for ( var int3 = 0; int3 < allNodes.length; int3++) {
		var node = map[allNodes[int3].ip];
		if(node){
			myNodes[int3]= node;
		}else{
			myNodes[int3] = new Object();
			myNodes[int3].state="0";
			myNodes[int3].host=allNodes[int3].ip;
		}
	  }
        $scope.myNodes = myNodes.filter(function(node) {
        return $scope.filter.matches(node);
      });
    };

    $scope.showNodeStats = function(nodeId) {
      ElasticService.getNodeStats(nodeId,
          function(nodeStats) {
            $scope.displayInfo('stats for ' + nodeStats.name, nodeStats.stats);
          },
          function(error) {
            AlertService.error('Error while loading node stats', error);
          }
      );
    };
    
    $scope.dotask=function(nodeIp,nodeState,flag){
    	if(!nodeState && flag=='start'){
    		 AlertService.error('当前状态不能启动！');
    		 return;
    	}
    	if(nodeState && flag=='stop'){
   		 AlertService.error('当前状态不能停止！');
   		 return;
    	}
    	 var params = {nodeIp:nodeIp,flag:flag,nodeState:nodeState};
         var url = 'http://'+$location.$$host+':'+$location.$$port
             +'/escloud/nodesmng/startOrStop';
         $('#jqxLoader').jqxLoader('open');
         ElasticService.clusterRequest2(url,'POST', "", params, {},
             function(response) {
        	 	 $('#jqxLoader').jqxLoader('close');
            	 if(response && response.success){
            		 AlertService.success("SUCCESS");
            		 $scope.refresh();
            	 }else{
            		 AlertService.error("系统异常，请联系管理员！");
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

  }

]);
