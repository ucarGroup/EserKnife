kopf.factory('ElasticService', ['$http', '$q', '$timeout', '$location',
        'ExternalSettingsService', 'DebugService', 'AlertService',
        function ($http, $q, $timeout, $location, ExternalSettingsService,
                  DebugService, AlertService) {

            var instance = this;

            this.connection = undefined;

            this.connected = false;

            this.cluster = undefined;

            this.autoRefreshStarted = false;

            this.brokenCluster = false;

            this.encodeURIComponent = function (text) {
                return encodeURIComponent(text);
            };

            var encode = function (text) {
                return instance.encodeURIComponent(text);
            };

            /**
             * Resets service state
             */
            this.reset = function () {
                this.connection = undefined;
                this.connected = false;
                this.cluster = undefined;
            };

            this.getIndices = function () {
                return this.cluster ? this.cluster.indices : [];
            };

            this.getAllIndicesNames = function(){
                return this.cluster ? this.cluster.allIndicesNames : [];
            };

            this.getNodes = function () {
                return this.cluster ? this.cluster.getNodes() : [];
            };

            this.getOpenIndices = function() {
                return this.cluster ? this.cluster.open_indices() : [];
            };

            function analyze(index, body, success, error) {
                var buildTokens = function(response) {
                    var tokens = response.tokens.map(function(t) {
                        return new Token(t.token, t.start_offset, t.end_offset, t.position);
                    });
                    success(tokens);
                };
                var path = '/' + encode(index) + '/_analyze';
                var params={"data":body};
                instance.clusterRequest('POST', path, params, body, buildTokens, error);
            }

            this.analyzeByField = function(index, field, text, success, error) {
                analyze(index, {text: text, field: field}, success, error);
            };

            this.isConnected = function () {
                return this.connected;
            };

            this.alertClusterChanges = function () {
                if (isDefined(this.cluster)) {
                    var changes = this.cluster.changes;
                    if (changes.hasChanges()) {
                        if (changes.hasJoins()) {
                            var joins = changes.nodeJoins.map(function (node) {
                                return node.name + '[' + node.transportAddress + ']';
                            });
                            AlertService.info('检测到集群中有'+joins.length + ' 新节点加入',
                                joins);
                        }
                        if (changes.hasLeaves()) {
                            var leaves = changes.nodeLeaves.map(function (node) {
                                return node.name + '[' + node.transportAddress + ']';
                            });
                            AlertService.warn('检测到集群中有'+changes.nodeLeaves.length +
                                ' 个节点下线', leaves);
                        }
                        if (changes.hasCreatedIndices()) {
                            var created = changes.indicesCreated.map(function (index) {
                                return index.name;
                            });
                            AlertService.info('检测到集群新创建了' + changes.indicesCreated.length +
                                ' 个索引: [' + created.join(',') + ']');
                        }
                        if (changes.hasDeletedIndices()) {
                            var deleted = changes.indicesDeleted.map(function (index) {
                                return index.name;
                            });
                            AlertService.info('检测到集群删除了' + changes.indicesDeleted.length +
                                ' 索引: [' + deleted.join(',') + ']');
                        }
                    }
                }
            };

            /**
             * Connects to Elasticsearch instance and triggers auto polling of cluster
             * state
             *
             * @param {string} host - Elasticsearch url
             */
            this.connect = function () {
                this.reset();
                this.clusterRequest('GET', '/', {}, {},
                    function (data) {
                        if (data) {
                            instance.setVersion(data.version.number);
                            instance.nodeIps = data.nodeIps;
                            instance.connected = true;
                            if (!instance.autoRefreshStarted) {
                                instance.autoRefreshStarted = true;
                                instance.autoRefreshCluster();
                            } else {
                                instance.refresh();
                            }
                        }
                    },
                    function (data) {
                        if (data.status == 503) {
                            DebugService.debug('No active master, switching to basic mode');
                            instance.setVersion(data.version.number);
                            instance.connected = true;
                            instance.setBrokenCluster(true);
                            AlertService.error('No active master, switching to basic mode');
                            if (!instance.autoRefreshStarted) {
                                instance.autoRefreshStarted = true;
                                instance.autoRefreshCluster();
                            }
                        } else {
                            AlertService.error(
                                'Error connecting to [' + instance.connection.host + ']',data
                            );
                        }
                    }
                );
            };

            this.setVersion = function (version) {
                this.version = new Version(version);
                if (!this.version.isValid()) {
                    DebugService.debug('Invalid Elasticsearch version[' + version + ']');
                    throw 'Invalid Elasticsearch version[' + version + ']';
                }
            };

            this.getHost = function () {
                return this.isConnected() ? $location.$$host : '';
            };

            /**
             * Enables shard allocation
             *
             * @callback success - invoked on success
             * @callback error - invoked on error
             */
            this.enableShardAllocation = function (success, error) {
                var body = {
                    transient: {
                        'cluster.routing.allocation.enable': 'all'
                    }
                };
                this.clusterRequest('PUT', '/_cluster/settings', {}, body, success,
                    error);
            };

            this.getIndexMetadata = function (name, success, error) {
                var transformed = function (response) {
                    success(new IndexMetadata(name, response.metadata.indices[name]));
                };
                var path = '/_cluster/state/metadata/' + encode(name) + '?human';
                this.clusterRequest('GET', path, {}, {}, transformed, error);
            };

            this.getNodeStats = function (nodeId, success, error) {
                var transformed = function (response) {
                    success(new NodeStats(name, response.nodes[nodeId]));
                };
                var path = '/_nodes/' + encode(nodeId) + '/stats?human';
                this.clusterRequest('GET', path, {}, {}, transformed, error);
            };


            this.createIndex = function(template, success, error) {
                var url = "/eserknife/indexmsg/addNewIndex";
                var indexName = template.name;
                var body = template.body;
                var params={"clusterName":clusterName,"indexName":indexName,"settings":body};
                this.clusterRequest2(url,'PUT', {}, params, {}, success, error);
            };

            this.deleteIndexTemplate = function(name, success, error) {
                var path = '/_template/' + encode(name);
                this.clusterRequest('DELETE', path, {}, {}, success, error);
            };


            this.createIndexTemplate = function(template, success, error) {
                var path = '/_template/' + encode(template.name);
                var body = template.body;
                var params={"data":body};
                this.clusterRequest('PUT', path, params, {}, success, error);
            };

            this.getIndexTemplates = function(success, error) {
                var path = '/_template';
                var parseTemplates = function(response) {

                    var templates = Object.keys(response).map(function(name) {
                        return new IndexTemplate(name, response[name]);
                    });
                    success(templates);
                };
                this.clusterRequest('GET', path, {}, {}, parseTemplates, error);
            };

            /**
             * Fetches shard information both from index/_stats and index/_recovery
             * @param {string} shard - shard number
             * @param {string} index - index
             * @param {string} nodeId - node id
             * @callback success
             * @callback error
             */
            this.getShardStats = function (shard, index, nodeId, success, error) {
                var host = $location.$$host;
                var params = {};
                //this.addAuth(params);
                $q.all([
                    $http.get(
                        'http://'+$location.$$host+':'+$location.$$port+'/eserknife/stats/shards?indexName='+index+'&clusterName='+clusterName,
                        params
                    )
                    /* $http.get(
                        'http://'+$location.$$host+':'+$location.$$port+'/eserknife/_stats?level=shards&human',
                        params
                    ),
                    $http.get(
                        'http://'+$location.$$host+':'+$location.$$port+'/eserknife/_recovery?active_only=true&human',
                        params
                    )*/
                ]).then(
                    function (responses) {
                        try {
                            var indexStats = JSON.parse(responses[0].data);
                            var shardsStats = indexStats.indices[index].shards[shard];
                            shardsStats = shardsStats ? shardsStats : [];
                            var shardStats = shardsStats.filter(
                                function (stats) {
                                    return stats.routing.node === nodeId;
                                }
                            );
                            if (shardStats.length == 1) { // shard is started
                                success(new ShardStats(shard, index, shardStats[0]));
                            } else { // non started shard
                                var indexRecovery = responses[1].data;
                                var shardRecoveries = indexRecovery[index].shards.filter(
                                    function (recovery) {
                                        return recovery.target.id === nodeId &&
                                            recovery.id == shard;
                                    });
                                success(new ShardStats(shard, index, shardRecoveries[0]));
                            }
                        } catch (exception) {
                            DebugService.debug('Error parsing output:', exception);
                            DebugService.debug('REST APIs output:', responses);
                            error(exception);
                        }
                    },
                    function (response) {
                        DebugService.debug('Error requesting shard stats data:', response);
                        error(response);
                    }
                );
            };

            this.clusterRequest = function (method, path, params, data, success, error) {

                var url = 'http://'+$location.$$host+':'+$location.$$port+'/eserknife/esproxy?method='+method+'&clusterName='+clusterName+'&target=' + btoa(path);
                var config = {method: method, url: url, data: data, params: params};
                $http(config).success(function (data, status, headers, config) {
                    try {
                        if(path == "/_template"){
                            var a = {"demo":{"template":"*","settings":{"index":{"number_of_shards":"5","number_of_replicas":"0"}},"mappings":{},"aliases":{},"order":0}};
                            success( $.extend({},a,data));
                        }else{
                            success(data);
                        }
                    } catch (exception) {
                        DebugService.debug('Error parsing REST API data:', exception);
                        DebugService.debug('REST API output:', data);
                        error(exception);
                    }
                }).error(function (data, status, headers, config) {
                    DebugService.debug('Error executing request:', config);
                    DebugService.debug('REST API output:', data);
                    error(data);
                });
            };

            this.clusterRequest2 = function (url,method, path, params, data, success, error) {
                var config = {method: method, url: url, data: data, params: params};
                $http(config).success(function (data, status, headers, config) {
                    try {
                        success(data);
                    } catch (exception) {
                        console.error(exception);
                    }
                }).error(function (data, status, headers, config) {
                    error(data);
                });
            };

            this.clusterRequest3 = function (url,method,params,success) {
                var config = {method: method, url: url, params: params};
                $http(config).success(function (data, status, headers, config) {
                    try {
                        if(!data){
                            AlertService.error("服务端响应对象为空!");
                            return;
                        }
                        if(data.code){
                            success(data.sucMsg);
                        }else{
                            AlertService.error(data.errMsg);
                        }
                    } catch (exception) {
                        console.error(exception);
                        AlertService.error(data.errMsg);
                    }
                }).error(function (data, status, headers, config) {
                    error(data);
                    AlertService.error(data.errMsg);
                });
            };

            this.fetchAliases = function(success, error) {
                var createAliases = function(response) {
                    var indices = Object.keys(response);
                    var allAliases = [];
                    indices.forEach(function(index) {
                        var indexAliases = response[index].aliases;
                        if (indexAliases && Object.keys(indexAliases).length > 0) {
                            var aliases = Object.keys(indexAliases).map(function(alias) {
                                var info = indexAliases[alias];
                                return new Alias(alias, index, info.filter, info.index_routing,
                                    info.search_routing);
                            });
                            allAliases.push(new IndexAliases(index, aliases));
                        }
                    });
                    success(allAliases);
                };
                this.clusterRequest('GET', '/_aliases', {}, {}, createAliases, error);
            };

            this.getClusterDetail = function (success, error) {
                var baseUrl = 'http://'+$location.$$host+':'+$location.$$port+'/eserknife/esproxy?method=GET&clusterName='+clusterName+'&target=';
                var params = {};
                //this.addAuth(params);
                $q.all([
                    $http.get(baseUrl + btoa('/_cluster/state/master_node,routing_table,blocks/'), params),
                    $http.get(baseUrl + btoa('/_stats/docs,store'), params),
                    $http.get(baseUrl + btoa('/_nodes/stats/jvm,fs,os,process'), params),
                    $http.get(baseUrl + btoa('/_cluster/settings'), params),
                    $http.get(baseUrl + btoa('/_aliases'), params),
                    $http.get(baseUrl + btoa('/_cluster/health'), params),
                    $http.get(baseUrl + btoa('/_nodes/_all/os,jvm'), params),
                    $http.get(baseUrl, params)
                ]).then(
                    function (responses) {
                        try {
                            var state = responses[0].data;
                            var indexStats = responses[1].data;
                            var nodesStats = responses[2].data;
                            var settings = responses[3].data;
                            var aliases = responses[4].data;
                            var health = responses[5].data;
                            var nodes = responses[6].data;
                            var main = responses[7].data;
                            var cluster = new Cluster(health, state, indexStats, nodesStats,
                                settings, aliases, nodes, main);
                            success(cluster);
                        } catch (exception) {
                            DebugService.debug('Error parsing cluster data:', exception);
                            DebugService.debug('REST APIs output:', responses);
                            error(exception);
                        }
                    },
                    function (response) {
                        DebugService.debug('Error requesting cluster data:', response);
                        console('---> '+response);
                        error(response);
                    }
                );
            };

            this.refresh = function () {
                if (this.isConnected()) {
                    var threshold = (ExternalSettingsService.getRefreshRate() * 0.75);
                    $timeout(function () {
                        var start = new Date().getTime();
                        instance.getClusterDetail(
                            function (cluster) {
                                var end = new Date().getTime();
                                var took = end - start;
                                if (took >= threshold) {
                                 /*   AlertService.warn('Loading cluster information is taking ' +
                                        'too long. Try increasing the refresh interval');*/
                                }
                                cluster.computeChanges(instance.cluster);
                                instance.cluster = cluster;
                                instance.alertClusterChanges();
                            },
                            function (response) {
                                if (response.status === 503) {
                                    var message = 'No active master, switching to basic mode';
                                    DebugService.debug(message);
                                    AlertService.error(message);
                                    instance.setBrokenCluster(true);
                                } else {
                                    //AlertService.error('Error loading cluster data', response);
                                    instance.cluster = undefined;
                                }
                            }
                        );

                    }, 100);
                } else {
                    this.cluster = undefined;
                }
            };

            /**
             * Sets the cluster state as broken and refreshes cluster state.
             * If cluster is broken, redirect view to nodes view
             * @param {Boolean} broken - indicates if cluster is broken
             */
            this.setBrokenCluster = function (broken) {
                instance.brokenCluster = broken;
                if (broken) {
                    $location.path('nodes');
                }
                instance.refresh();
            };

            this.autoRefreshCluster = function () {
                this.refresh();
                var nextRefresh = function () {
                    instance.autoRefreshCluster();
                };
                $timeout(nextRefresh, ExternalSettingsService.getRefreshRate());
            };

            this.deleteIndex = function(index, success, error) {
                var path = encode(index);
                this.clusterRequest2('/eserknife/indexmsg/delIndex?clusterName='+clusterName+'&indexName='+ path ,'GET', {}, {}, {}, success, error);
            };

            /**
             * Updates index settings
             *
             * @param {string} name - index name
             * @param {Object} settings - index settings
             * @callback success - invoked on success
             * @callback error - invoked on error
             */
            this.updateIndexSettings = function(name, settings, success, error) {
                var path = '/' + encode(name) + '/_settings';
                this.clusterRequest('PUT', path, {}, settings, success, error);
            };

            /**
             * Updates the cluster settings
             *
             * @param {Object} settings - new cluster settings
             * @callback success - invoked on success
             * @callback error - invoked on error
             */
            this.updateClusterSettings = function(settings, success, error) {
                var path = '/_cluster/settings';
                this.clusterRequest('PUT', path, {}, settings, success, error);
            };

            return this;

        }]);
