var kopf = angular.module('kopf', ['ngRoute', 'ntt.TreeDnD', 'ngAnimate',
    'ui.bootstrap']);

kopf.config(function ($routeProvider, $locationProvider) {
    $locationProvider.hashPrefix('!');
    $routeProvider.when('/cluster', {
        templateUrl: '/eserknife/resources/kopf/html/partials/cluster_overview.html',
        controller: 'ClusterOverviewController'
    }).when('/nodes', {
        templateUrl: '/eserknife/resources/kopf/html/partials/nodes/nodes.html',
        controller: 'NodesController'
    }).when('/rest', {
        templateUrl: '/eserknife/resources/kopf/html/partials/rest_client.html',
        controller: 'RestController'
    }).when('/query', {
        templateUrl: '/eserknife/resources/kopf/html/partials/query.html',
        controller: 'QueryController'
    }).when('/stats', {
        templateUrl: '/eserknife/resources/kopf/html/partials/stats.html',
        controller: 'StatsController'
    }).when('/newStats', {
        templateUrl: '/eserknife/resources/kopf/html/partials/new_stat.html',
        controller: 'NewStatsController'
    }).when('/slowlog', {
        templateUrl: '/eserknife/resources/kopf/html/partials/slowlog.html',
        controller: 'SlowLogController'
    }).when('/slowlogquery', {
        templateUrl: '/eserknife/resources/kopf/html/partials/slowlogquery.html',
        controller: 'SlowLogQueryController'
    }).when('/updateMapping', {
        templateUrl: '/eserknife/resources/kopf/html/partials/update_index_mapping.html',
        controller: 'UpdateMappingController'
    }).when('/createIndex', {
        templateUrl: '/eserknife/resources/kopf/html/partials/create_index.html',
        controller: 'CreateIndexController'
    }).when('/createType', {
        templateUrl: '/eserknife/resources/kopf/html/partials/create_type.html',
        controller: 'CreateTypeController'
    }).when('/importIndex', {
        templateUrl: '/eserknife/resources/kopf/html/partials/index_import.html',
        controller: 'ImportIndexController'
    }).when('/settingIndex', {
        templateUrl: '/eserknife/resources/kopf/html/partials/index_setting.html',
        controller: 'SettingIndexController'
    }).when('/indexManager', {
    templateUrl: '/eserknife/resources/kopf/html/partials/index_manager.html',
    controller: 'ManagerIndexController'
    }).when('/indexManagerNew', {
        templateUrl: '/eserknife/resources/kopf/html/partials/index_manager_new.html',
        controller: 'IndexManageController'
    }).when('/exportIndex', {
        templateUrl: '/eserknife/resources/kopf/html/partials/index_export.html',
        controller: 'ExportIndexController'
    }).when('/indexTemplate', {
    templateUrl: '/eserknife/resources/kopf/html/partials/index_templates.html',
        controller: 'IndexTemplatesController'
    }).when('/reindex', {
        templateUrl: '/eserknife/resources/kopf/html/partials/reindex.html',
        controller: 'ReIndexController'
    }).when('/analysis', {
        templateUrl: '/eserknife/resources/kopf/html/partials/analysis.html',
        controller: 'AnalysisController'
    }).when('/clientlogquery', {
        templateUrl: '/eserknife/resources/kopf/html/partials/clientlogquery.html',
        controller: 'ClientLogController'
    }).when('/aliasManager', {
        templateUrl: '/eserknife/resources/kopf/html/partials/alias_manager.html',
        controller: 'AliasController'
    }).otherwise({redirectTo: '/cluster'});
});


function readablizeBytes(bytes) {
    if (bytes > 0) {
        var s = ['b', 'KB', 'MB', 'GB', 'TB', 'PB'];
        var e = Math.floor(Math.log(bytes) / Math.log(1024));
        return (bytes / Math.pow(1024, e)).toFixed(2) + s[e];
    } else {
        return 0;
    }
}

// Gets the value of a nested property from an object if it exists.
// Otherwise returns the default_value given.
// Example: get the value of object[a][b][c][d]
// where property_path is [a,b,c,d]
function getProperty(object, propertyPath, defaultValue) {
    if (isDefined(object)) {
        if (isDefined(object[propertyPath])) {
            return object[propertyPath];
        }
        var pathParts = propertyPath.split('.'); // path as nested properties
        for (var i = 0; i < pathParts.length && isDefined(object); i++) {
            object = object[pathParts[i]];
        }
    }
    return isDefined(object) ? object : defaultValue;
}

// Checks if value is both non null and undefined
function isDefined(value) {
    return value !== null && typeof value != 'undefined';
}

// Checks if the String representation of value is a non empty string
// string.trim().length is grater than 0
function notEmpty(value) {
    return isDefined(value) && value.toString().trim().length > 0;
}

function isNumber(value) {
    var exp = /\d+/;
    return exp.test(value);
}

// Returns the given date as a String formatted as hh:MM:ss
function getTimeString(date) {
    var hh = ('0' + date.getHours()).slice(-2);
    var mm = ('0' + date.getMinutes()).slice(-2);
    var ss = ('0' + date.getSeconds()).slice(-2);
    return hh + ':' + mm + ':' + ss;
}

//return yyyy-MM-dd
function getDateString(date) {
    var yyyy = (date.getFullYear());
    var MM = ('0' + (parseInt(date.getMonth())+1) ).slice(-2);
    var dd = ('0' + date.getDate() ).slice(-2);
    return yyyy + '-' + MM + '-' + dd;
}

function getDateString2(date) {
    var yyyy = (date.getFullYear());
    var MM = ('0' + (parseInt(date.getMonth())+1) ).slice(-2);
    var dd = ('0' + date.getDate() ).slice(-2);
    var hh = ('0' + date.getHours() ).slice(-2);
    var mm = ('0' + date.getMinutes() ).slice(-2);
    var ss = ('0' + date.getSeconds() ).slice(-2);
    return yyyy + '-' + MM + '-' + dd + " " + hh + ":" + mm + ":" + ss;
}

function getDateString3(date) {
    var yyyy = (date.getFullYear());
    var MM = ('0' + (parseInt(date.getMonth())+1) ).slice(-2);
    var dd = ('0' + date.getDate() ).slice(-2);
    var hh = ('0' + date.getHours() ).slice(-2);
    var mm = ('0' + date.getMinutes() ).slice(-2);
    return yyyy + '-' + MM + '-' + dd + " " + hh + ":" + mm;
}

//return date by offset
function getDate(offset) {
    var dd = new Date();
    dd.setDate(dd.getDate()+offset);
    return dd;
}

Array.prototype.indexOf = function(val) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == val) return i;
    }
    return -1;
};

Array.prototype.remove = function(val) {
    var index = this.indexOf(val);
    if (index > -1) {
        this.splice(index, 1);
    }
};


String.format = function() {
    if (arguments.length == 0)
        return null;
    var str = arguments[0];
    for ( var i = 1; i < arguments.length; i++) {
        var re = new RegExp('\\{' + (i - 1) + '\\}', 'gm');
        str = str.replace(re, arguments[i]);
    }
    return str;
};

function showModal(title,content,isViewByJson) {
    var view = isViewByJson ? JSONTree.create(reps) : content;
    $('#that-modal-title').html("<h5>"+title+"</h5>");
    $('#that-modal-body-content').html(view);
    $('#modal_info2').modal({show: true, backdrop: true});
}
function EditableIndexSettings(settings) {
  // FIXME: 0.90/1.0 check
  this.valid_settings = [
    // blocks
    'index.blocks.read_only',
    'index.blocks.read',
    'index.blocks.write',
    'index.blocks.metadata',
    // cache
    'index.cache.filter.max_size',
    'index.cache.filter.expire',
    // index
    'index.number_of_replicas',
    'index.index_concurrency',
    'index.warmer.enabled',
    'index.refresh_interval',
    'index.term_index_divisor',
    'index.ttl.disable_purge',
    'index.fail_on_merge_failure',
    'index.gc_deletes',
    'index.codec',
    'index.compound_on_flush',
    'index.term_index_interval',
    'index.auto_expand_replicas',
    'index.recovery.initial_shards',
    'index.compound_format',
    // routing
    'index.routing.allocation.disable_allocation',
    'index.routing.allocation.disable_new_allocation',
    'index.routing.allocation.disable_replica_allocation',
    'index.routing.allocation.total_shards_per_node',
    // slowlog
    'index.search.slowlog.threshold.query.warn',
    'index.search.slowlog.threshold.query.info',
    'index.search.slowlog.threshold.query.debug',
    'index.search.slowlog.threshold.query.trace',
    'index.search.slowlog.threshold.fetch.warn',
    'index.search.slowlog.threshold.fetch.info',
    'index.search.slowlog.threshold.fetch.debug',
    'index.search.slowlog.threshold.fetch.trace',
    'index.indexing.slowlog.threshold.index.warn',
    'index.indexing.slowlog.threshold.index.info',
    'index.indexing.slowlog.threshold.index.debug',
    'index.indexing.slowlog.threshold.index.trace',
    // translog
    'index.translog.flush_threshold_ops',
    'index.translog.flush_threshold_size',
    'index.translog.flush_threshold_period',
    'index.translog.disable_flush',
    'index.translog.fs.type'
  ];
  var instance = this;
  this.valid_settings.forEach(function(setting) {
    instance[setting] = getProperty(settings, setting);
  });
}

function IndexAliases(index, aliases) {
    this.index = index;
    this.aliases = aliases;

    this.clone = function () {
        var cloned = new IndexAliases(this.index, []);
        cloned.aliases = this.aliases.map(function (alias) {
            return alias.clone();
        });
        return cloned;
    };
}

IndexAliases.diff = function (original, modified) {
    var differences = [];
    modified.forEach(function (ia) {
        var isNew = true;
        original.forEach(function (origIA) {
            if (ia.index == origIA.index) {
                isNew = false;
                ia.aliases.forEach(function (alias) {
                    var originalAliases = origIA.aliases.filter(function (originalAlias) {
                        return alias.equals(originalAlias);
                    });
                    if (originalAliases.length === 0) {
                        differences.push(alias);
                    }
                });
            }
        });
        if (isNew) {
            ia.aliases.forEach(function (alias) {
                differences.push(alias);
            });
        }
    });
    return differences;
};

function Alias(alias, index, filter, indexRouting, searchRouting) {
    this.alias = isDefined(alias) ? alias.toLowerCase() : '';
    this.index = isDefined(index) ? index.toLowerCase() : '';
    this.filter = isDefined(filter) ? filter : '';
    this.index_routing = isDefined(indexRouting) ? indexRouting : '';
    this.search_routing = isDefined(searchRouting) ? searchRouting : '';

    this.validate = function () {
        if (!notEmpty(this.alias)) {
            throw 'Alias must have a non empty name';
        }
        if (!notEmpty(this.index)) {
            throw 'Alias must have a valid index name';
        }
    };

    this.equals = function (otherAlias) {
        var equal =
            (this.alias === otherAlias.alias) &&
            (this.index === otherAlias.index) &&
            (this.filter === otherAlias.filter) &&
            (this.index_routing === otherAlias.index_routing) &&
            (this.search_routing === otherAlias.search_routing);
        return equal;
    };

    this.info = function () {
        var info = {};
        info.index = this.index;
        info.alias = this.alias;

        if (isDefined(this.filter)) {
            if (typeof this.filter == 'string' && notEmpty(this.filter)) {
                info.filter = JSON.parse(this.filter);
            } else {
                info.filter = this.filter;
            }
        }
        if (notEmpty(this.index_routing)) {
            info.index_routing = this.index_routing;
        }
        if (notEmpty(this.search_routing)) {
            info.search_routing = this.search_routing;
        }
        return info;
    };

    this.clone = function () {
        return new Alias(this.alias, this.index, this.filter, this.index_routing,
            this.search_routing);
    };
}

function BrokenCluster(health, state, nodesStats, settings, nodes) {

    this.status = health.status;
    this.initializing_shards = health.initializing_shards;
    this.active_primary_shards = health.active_primary_shards;
    this.active_shards = health.active_shards;
    this.relocating_shards = health.relocating_shards;
    this.unassigned_shards = health.unassigned_shards;
    this.number_of_nodes = health.number_of_nodes;
    this.number_of_data_nodes = health.number_of_data_nodes;
    this.timed_out = health.timed_out;
    this.shards = this.active_shards + this.relocating_shards +
        this.unassigned_shards + this.initializing_shards;
    this.fetched_at = getTimeString(new Date());

    this.name = state.cluster_name;
    this.master_node = state.master_node;

    this.settings = settings;

    var totalSize = 0;

    this.nodes = Object.keys(nodes.nodes).map(function (nodeId) {
        var nodeStats = nodesStats.nodes[nodeId];
        var nodeInfo = nodes.nodes[nodeId];
        var node = new Node(nodeId, nodeStats, nodeInfo);
        if (nodeId === state.master_node) {
            node.setCurrentMaster();
        }
        return node;
    });

    this.getNodes = function () {
        return this.nodes;
    };

    this.total_size = readablizeBytes(totalSize);
    this.total_size_in_bytes = totalSize;
    this.indices = [];
}

function CatResult(result) {
    var lines = result.split('\n');
    var header = lines[0];
    var columns = header.match(/\S+/g);
    var values = lines.slice(1, -1).map(function (line) {
        return columns.map(function (column, i) {
            var start = header.indexOf(column);
            var lastColumn = i < columns.length - 1;
            var end = lastColumn ? header.indexOf(columns[i + 1]) : undefined;
            return line.substring(start, end).trim();
        });
    });

    this.columns = columns;
    this.lines = values;
}

function Cluster(health, state, stats, nodesStats, settings, aliases, nodes,
                 main) {
    this.created_at = new Date().getTime();

    // main -> GET /
    this.clientName = main.name;

    // Cluster Health(/_cluster/health)
    this.status = health.status;
    this.initializing_shards = health.initializing_shards;
    this.active_primary_shards = health.active_primary_shards;
    this.active_shards = health.active_shards;
    this.relocating_shards = health.relocating_shards;
    this.unassigned_shards = health.unassigned_shards;
    this.number_of_nodes = health.number_of_nodes;
    this.number_of_data_nodes = health.number_of_data_nodes;
    this.timed_out = health.timed_out;
    this.shards = (this.active_shards + this.relocating_shards +
    this.unassigned_shards + this.initializing_shards);

    this.fetched_at = getTimeString(new Date());

    this.name = state.cluster_name;
    this.master_node = state.master_node;

    this.closedIndices = 0;

    this.disableAllocation = 'false';
    var persistentAllocation = getProperty(settings,
        'persistent.cluster.routing.allocation.enable', 'all');

    var transientAllocation = getProperty(settings,
        'transient.cluster.routing.allocation.enable', '');

    if (transientAllocation !== '') {
        this.disableAllocation = transientAllocation == 'all' ? 'false' : 'true';
    } else {
        if (persistentAllocation != 'all') {
            this.disableAllocation = 'true';
        }
    }

    this.settings = settings;

    this.nodes = Object.keys(nodes.nodes).map(function (nodeId) {
        var nodeStats = nodesStats.nodes[nodeId];
        var nodeInfo = nodes.nodes[nodeId];
        var node = new Node(nodeId, nodeStats, nodeInfo);
        if (nodeId === state.master_node) {
            node.setCurrentMaster();
        }
        return node;
    });

    this.getNodes = function () {
        return this.nodes;
    };

    this.number_of_nodes = this.nodes.length;

    var indicesNames = Object.keys(state.routing_table.indices);
    this.allIndicesNames = Object.keys(state.routing_table.indices);
    var specialIndices = 0;
    var closedIndices = 0;
    this.indices = indicesNames.map(function (indexName) {
        var indexStats = stats.indices[indexName];
        var indexAliases = aliases[indexName];
        var index = new Index(indexName, state, indexStats, indexAliases);
        if (index.special) {
            specialIndices++;
        }
        return index;
    });

    if (isDefined(state.blocks.indices)) {
        var indices = this.indices;
        Object.keys(state.blocks.indices).forEach(function (indexName) {
            // INDEX_CLOSED_BLOCK = new ClusterBlock(4, "index closed", ...
            if (state.blocks.indices[indexName]['4']) {
                indices.push(new Index(indexName));
                closedIndices++;
            }
        });
    }
    this.special_indices = specialIndices;
    this.closedIndices = closedIndices;
    var hasData = Object.keys(stats._all.primaries).length > 0;
    this.num_docs = hasData ? stats._all.primaries.docs.count : 0;
    this.total_size_in_bytes = hasData ? stats._all.total.store.size_in_bytes : 0;
    this.total_indices = this.indices.length;

    this.changes = null;

    this.computeChanges = function (oldCluster) {
        var nodes = this.nodes;
        var indices = this.indices;
        var changes = new ClusterChanges();
        if (isDefined(oldCluster) && this.name === oldCluster.name) {
            // checks for node differences
            oldCluster.nodes.forEach(function (node) {
                for (var i = 0; i < nodes.length; i++) {
                    if (nodes[i].equals(node)) {
                        node = null;
                        break;
                    }
                }
                if (isDefined(node)) {
                    changes.addLeavingNode(node);
                }
            });

            if (oldCluster.nodes.length != nodes.length || !changes.hasJoins()) {
                nodes.forEach(function (node) {
                    for (var i = 0; i < oldCluster.nodes.length; i++) {
                        if (oldCluster.nodes[i].equals(node)) {
                            node = null;
                            break;
                        }
                    }
                    if (isDefined(node)) {
                        changes.addJoiningNode(node);
                    }
                });
            }

            // checks for indices differences
            oldCluster.indices.forEach(function (index) {
                for (var i = 0; i < indices.length; i++) {
                    if (indices[i].equals(index)) {
                        index = null;
                        break;
                    }
                }
                if (isDefined(index)) {
                    changes.addDeletedIndex(index);
                }
            });

            var equalNumberOfIndices = oldCluster.indices.length != indices.length;
            if (equalNumberOfIndices || !changes.hasCreatedIndices()) {
                indices.forEach(function (index) {
                    for (var i = 0; i < oldCluster.indices.length; i++) {
                        if (oldCluster.indices[i].equals(index)) {
                            index = null;
                            break;
                        }
                    }
                    if (isDefined(index)) {
                        changes.addCreatedIndex(index);
                    }
                });
            }
            var docDelta = this.num_docs - oldCluster.num_docs;
            // var docRate = docDelta / ((this.created_at - old_cluster.created_at) / 1000);
            changes.setDocDelta(docDelta);
            var dataDelta = this.total_size_in_bytes - oldCluster.total_size_in_bytes;
            changes.setDataDelta(dataDelta);
        }
        this.changes = changes;
    };

    this.open_indices = function () {
        return this.indices.filter(function (index) {
            return index.state === 'open';
        });
    };

    var shards = {};
    var unassignedShards = {};

    var indicesRouting = state.routing_table.indices;
    indicesNames.forEach(function (indexName) {
        var totalShards = Object.keys(indicesRouting[indexName].shards);

        totalShards.forEach(function (shardNum) {
            indicesRouting[indexName].shards[shardNum].forEach(function (shardData) {
                if (shardData.state === 'UNASSIGNED') {
                    if (!isDefined(unassignedShards[shardData.index])) {
                        unassignedShards[shardData.index] = [];
                    }
                    unassignedShards[shardData.index].push(new Shard(shardData));
                } else {
                    var shard = new Shard(shardData);
                    var key = shard.node + '_' + shard.index;
                    if (!isDefined(shards[key])) {
                        shards[key] = [];
                    }
                    shards[key].push(shard);
                }
            });
        });
    });

    this.getShards = function (nodeId, indexName) {
        var allocated = shards[nodeId + '_' + indexName];
        return isDefined(allocated) ? allocated : [];
    };

    this.getUnassignedShards = function (indexName) {
        var unassigned = unassignedShards[indexName];
        return isDefined(unassigned) ? unassigned : [];
    };

}

function ClusterChanges() {

    this.nodeJoins = null;
    this.nodeLeaves = null;
    this.indicesCreated = null;
    this.indicesDeleted = null;

    this.docDelta = 0;
    this.dataDelta = 0;

    this.setDocDelta = function (delta) {
        this.docDelta = delta;
    };

    this.getDocDelta = function () {
        return this.docDelta;
    };

    this.absDocDelta = function () {
        return Math.abs(this.docDelta);
    };

    this.absDataDelta = function () {
        return readablizeBytes(Math.abs(this.dataDelta));
    };

    this.getDataDelta = function () {
        return this.dataDelta;
    };

    this.setDataDelta = function (delta) {
        this.dataDelta = delta;
    };

    this.hasChanges = function () {
        return (
            isDefined(this.nodeJoins) ||
            isDefined(this.nodeLeaves) ||
            isDefined(this.indicesCreated) ||
            isDefined(this.indicesDeleted)
        );
    };

    this.addJoiningNode = function (node) {
        this.changes = true;
        if (!isDefined(this.nodeJoins)) {
            this.nodeJoins = [];
        }
        this.nodeJoins.push(node);
    };

    this.addLeavingNode = function (node) {
        this.changes = true;
        if (!isDefined(this.nodeLeaves)) {
            this.nodeLeaves = [];
        }
        this.nodeLeaves.push(node);
    };

    this.hasJoins = function () {
        return isDefined(this.nodeJoins);
    };

    this.hasLeaves = function () {
        return isDefined(this.nodeLeaves);
    };

    this.hasCreatedIndices = function () {
        return isDefined(this.indicesCreated);
    };

    this.hasDeletedIndices = function () {
        return isDefined(this.indicesDeleted);
    };

    this.addCreatedIndex = function (index) {
        if (!isDefined(this.indicesCreated)) {
            this.indicesCreated = [];
        }
        this.indicesCreated.push(index);
    };

    this.addDeletedIndex = function (index) {
        if (!isDefined(this.indicesDeleted)) {
            this.indicesDeleted = [];
        }
        this.indicesDeleted.push(index);
    };

}

function ClusterHealth(health) {
    this.status = health.status;
    this.cluster_name = health.cluster_name;
    this.initializing_shards = health.initializing_shards;
    this.active_primary_shards = health.active_primary_shards;
    this.active_shards = health.active_shards;
    this.relocating_shards = health.relocating_shards;
    this.unassigned_shards = health.unassigned_shards;
    this.number_of_nodes = health.number_of_nodes;
    this.number_of_data_nodes = health.number_of_data_nodes;
    this.timed_out = health.timed_out;
    this.shards = this.active_shards + this.relocating_shards +
        this.unassigned_shards + this.initializing_shards;
    this.fetched_at = getTimeString(new Date());
}

function ClusterMapping(data) {

    this.getIndices = function () {
        return Object.keys(data);
    };

    this.getTypes = function (index) {
        var indexMapping = getProperty(data, index + '.mappings', {});
        return Object.keys(indexMapping);
    };

}

function ClusterSettings(settings) {
    // FIXME: 0.90/1.0 check
    var valid = [
        // cluster
        'cluster.blocks.read_only',
        'indices.ttl.interval',
        'indices.cache.filter.size',
        'discovery.zen.minimum_master_nodes',
        // recovery
        'indices.recovery.concurrent_streams',
        'indices.recovery.compress',
        'indices.recovery.file_chunk_size',
        'indices.recovery.translog_ops',
        'indices.recovery.translog_size',
        'indices.recovery.max_bytes_per_sec',
        // routing
        'cluster.routing.allocation.node_initial_primaries_recoveries',
        'cluster.routing.allocation.cluster_concurrent_rebalance',
        'cluster.routing.allocation.awareness.attributes',
        'cluster.routing.allocation.node_concurrent_recoveries',
        'cluster.routing.allocation.disable_allocation',
        'cluster.routing.allocation.disable_replica_allocation'
    ];
    var instance = this;
    ['persistent', 'transient'].forEach(function (type) {
        instance[type] = {};
        var currentSettings = settings[type];
        valid.forEach(function (setting) {
            instance[type][setting] = getProperty(currentSettings, setting);
        });
    });
}

function EditableIndexSettings(settings) {
    // FIXME: 0.90/1.0 check
    this.valid_settings = [
        // blocks
        'index.blocks.read_only',
        'index.blocks.read',
        'index.blocks.write',
        'index.blocks.metadata',
        // cache
        'index.cache.filter.max_size',
        'index.cache.filter.expire',
        // index
        'index.number_of_replicas',
        'index.index_concurrency',
        'index.warmer.enabled',
        'index.refresh_interval',
        'index.term_index_divisor',
        'index.ttl.disable_purge',
        'index.fail_on_merge_failure',
        'index.gc_deletes',
        'index.codec',
        'index.compound_on_flush',
        'index.term_index_interval',
        'index.auto_expand_replicas',
        'index.recovery.initial_shards',
        'index.compound_format',
        // routing
        'index.routing.allocation.disable_allocation',
        'index.routing.allocation.disable_new_allocation',
        'index.routing.allocation.disable_replica_allocation',
        'index.routing.allocation.total_shards_per_node',
        // slowlog
        'index.search.slowlog.threshold.query.warn',
        'index.search.slowlog.threshold.query.info',
        'index.search.slowlog.threshold.query.debug',
        'index.search.slowlog.threshold.query.trace',
        'index.search.slowlog.threshold.fetch.warn',
        'index.search.slowlog.threshold.fetch.info',
        'index.search.slowlog.threshold.fetch.debug',
        'index.search.slowlog.threshold.fetch.trace',
        'index.indexing.slowlog.threshold.index.warn',
        'index.indexing.slowlog.threshold.index.info',
        'index.indexing.slowlog.threshold.index.debug',
        'index.indexing.slowlog.threshold.index.trace',
        // translog
        'index.translog.flush_threshold_ops',
        'index.translog.flush_threshold_size',
        'index.translog.flush_threshold_period',
        'index.translog.disable_flush',
        'index.translog.fs.type'
    ];
    var instance = this;
    this.valid_settings.forEach(function (setting) {
        instance[setting] = getProperty(settings, setting);
    });
}


// Expects URL according to /^(https|http):\/\/(\w+):(\w+)@(.*)/i;
// Examples:
// http://localhost:9200
// http://user:password@localhost:9200
// https://localhost:9200
function ESConnection(url, withCredentials) {
    if (url.indexOf('http://') !== 0 && url.indexOf('https://') !== 0) {
        url = 'http://' + url;
    }
    var protectedUrl = /^(https|http):\/\/(\w+):(\w+)@(.*)/i;
    this.host = 'http://localhost:9200'; // default
    this.withCredentials = withCredentials;
    if (notEmpty(url)) {
        var connectionParts = protectedUrl.exec(url);
        if (isDefined(connectionParts)) {
            this.host = connectionParts[1] + '://' + connectionParts[4];
            this.username = connectionParts[2];
            this.password = connectionParts[3];
            this.auth = 'Basic ' + window.btoa(this.username + ':' + this.password);
        } else {
            var host2 = url.split("?");
            this.host = host2[0];
            this.param = host2[1];
        }
    }

}

function HotThread(header) {
    this.header = header;
    this.subHeader = undefined;
    this.stack = [];
}

function HotThreads(data) {
    this.nodes_hot_threads = data.split(':::').slice(1).map(function (data) {
        return new NodeHotThreads(data);
    });
}

function Index(indexName, clusterState, indexStats, aliases) {
    this.name = indexName;
    this.shards = null;
    this.metadata = {};
    this.state = 'close';
    this.num_of_shards = 0;
    this.num_of_replicas = 0;
    this.aliases = [];
    if (isDefined(aliases)) {
        var indexAliases = aliases.aliases;
        if (isDefined(indexAliases)) {
            this.aliases = Object.keys(aliases.aliases);
        }
    }

    if (isDefined(clusterState)) {
        var routing = getProperty(clusterState, 'routing_table.indices');
        this.state = 'open';
        if (isDefined(routing)) {
            var shards = Object.keys(routing[indexName].shards);
            this.num_of_shards = shards.length;
            var shardMap = routing[indexName].shards;
            this.num_of_replicas = shardMap[0].length - 1;
        }
    }
    this.num_docs = getProperty(indexStats, 'primaries.docs.count', 0);
    this.deleted_docs = getProperty(indexStats, 'primaries.docs.deleted', 0);
    this.size_in_bytes = getProperty(indexStats,
        'primaries.store.size_in_bytes', 0);
    this.total_size_in_bytes = getProperty(indexStats,
        'total.store.size_in_bytes', 0);

    this.unassigned = [];
    this.unhealthy = false;

    if (isDefined(clusterState) && isDefined(clusterState.routing_table)) {
        var instance = this;
        var shardsMap = clusterState.routing_table.indices[this.name].shards;
        Object.keys(shardsMap).forEach(function (shardNum) {
            shardsMap[shardNum].forEach(function (shard) {
                if (shard.state != 'STARTED') {
                    instance.unhealthy = true;
                }
            });
        });
    }

    this.special = this.name.indexOf('.') === 0 || this.name.indexOf('_') === 0;

    this.equals = function (index) {
        return index !== null && index.name == this.name;
    };

    this.closed = this.state === 'close';

    this.open = this.state === 'open';

}

function IndexMetadata(index, metadata) {
    var that = this;
    this.index = index;
    this.mappings = metadata.mappings;
    this.settings = metadata.settings;

    this.getTypes = function () {
        return Object.keys(this.mappings).sort(function (a, b) {
            return a.localeCompare(b);
        });
    };

    this.getAnalyzers = function () {
        var analyzers = Object.keys(getProperty(this.settings,
            'index.analysis.analyzer', {}));
        if (analyzers.length === 0) {
            Object.keys(this.settings).forEach(function (setting) {
                if (setting.indexOf('index.analysis.analyzer') === 0) {
                    var analyzer = setting.substring('index.analysis.analyzer.'.length);
                    analyzer = analyzer.substring(0, analyzer.indexOf('.'));
                    if ($.inArray(analyzer, analyzers) == -1) {
                        analyzers.push(analyzer);
                    }
                }
            });
        }
        return analyzers.sort(function (a, b) {
            return a.localeCompare(b);
        });
    };

    function isAnalyzable(type) {
        var analyzableTypes = ['float', 'double', 'byte', 'short', 'integer',
            'long', 'nested', 'object'
        ];
        return analyzableTypes.indexOf(type) == -1;
    }

    this.getFields2 = function (type) {
        var that = this;
        var res = [];
        this.getTypes().forEach(function (tt){
            if (isDefined(that.mappings[tt])) {
                var fls = that.mappings[tt].properties;
                for(var ff in fls) {
                    res.push(ff);
                }
            }
        });
        return res;
    };

    this.getFields3 = function (type) {
        var fields = [];
        if (isDefined(this.mappings[type])) {
            return this.mappings[type].properties;
        }
    };

    this.getFields = function (type) {
        var fields = [];
        if (isDefined(this.mappings[type])) {
            fields = this.getProperties('', this.mappings[type].properties);
        }
        return fields.sort(function (a, b) {
            return a.localeCompare(b);
        });
    };

    this.getProperties = function (parent, fields) {
        var prefix = parent !== '' ? parent + '.' : '';
        var validFields = [];
        for (var field in fields) {
            // multi field
            if (isDefined(fields[field].fields)) {
                var addPrefix = fields[field].path != 'just_name';
                var multiPrefix = addPrefix ? prefix + field : prefix;
                var multiProps = this.getProperties(multiPrefix, fields[field].fields);
                validFields = validFields.concat(multiProps);
            }
            // nested and object types
            var nestedType = fields[field].type == 'nested';
            var objectType = fields[field].type == 'object';
            if (nestedType || objectType || !isDefined(fields[field].type)) {
                var nestedProperties = this.getProperties(prefix + field,
                    fields[field].properties);
                validFields = validFields.concat(nestedProperties);
            }
            // normal fields
            if (isDefined(fields[field].type) && isAnalyzable(fields[field].type)) {
                validFields.push(prefix + field);
            }
        }
        return validFields;
    };
}

function IndexTemplate(name, body) {
    this.name = name;
    this.body = body;
}

function Node(nodeId, nodeStats, nodeInfo) {
    this.id = nodeId;
    this.name = nodeInfo.name;
    this.elasticVersion = nodeInfo.version;
    this.jvmVersion = nodeInfo.jvm.version;
    this.availableProcessors = nodeInfo.os.available_processors;
    this.transportAddress = nodeInfo.transport_address;
    this.host = nodeInfo.host;

    var attributes = getProperty(nodeInfo, 'attributes', {});
    var master = attributes.master === 'false' ? false : true;
    var data = attributes.data === 'false' ? false : true;
    var client = attributes.client === 'true' ? true : false;
    this.master = master && !client;
    this.data = data && !client;
    this.client = client || !master && !data;
    this.current_master = false;

    this.stats = nodeStats;
    this.uptime = nodeStats.jvm.uptime_in_millis;

    this.heap_used = readablizeBytes(getProperty(this.stats,
        'jvm.mem.heap_used_in_bytes'));

    this.heap_committed = readablizeBytes(getProperty(this.stats,
        'jvm.mem.heap_committed_in_bytes'));

    this.heap_used_percent = getProperty(this.stats, 'jvm.mem.heap_used_percent');

    this.heap_max = readablizeBytes(getProperty(this.stats,
        'jvm.mem.heap_max_in_bytes'));

    this.disk_total_in_bytes = getProperty(this.stats, 'fs.total.total_in_bytes');
    this.disk_free_in_bytes = getProperty(this.stats, 'fs.total.free_in_bytes');
    var diskUsedInBytes = (this.disk_total_in_bytes - this.disk_free_in_bytes);
    var usedRatio = (diskUsedInBytes / this.disk_total_in_bytes);
    this.disk_used_percent = Math.round(100 * usedRatio);

    this.cpu = getProperty(this.stats, 'process.cpu.percent');

    this.load_average = getProperty(this.stats, 'os.load_average');

    this.setCurrentMaster = function () {
        this.current_master = true;
    };

    this.equals = function (node) {
        return node.id === this.id;
    };

}

function NodeHotThreads(data) {
    var lines = data.split('\n');
    this.header = lines[0];
    // pre 4859ce5d79a786b58b1cd2fb131614677efd6b91
    var BackwardCompatible = lines[1].indexOf('Hot threads at') == -1;
    var HeaderLines = BackwardCompatible ? 2 : 3;
    this.subHeader = BackwardCompatible ? undefined : lines[1];
    this.node = this.header.substring(
        this.header.indexOf('[') + 1,
        this.header.indexOf(']')
    );
    var threads = [];
    var thread;
    if (lines.length > HeaderLines) {
        lines.slice(HeaderLines).forEach(function (line) {
            var blankLine = line.trim().length === 0;
            if (thread) {
                if (thread.subHeader) {
                    thread.stack.push(line);
                    if (blankLine) {
                        thread = undefined;
                    }
                } else {
                    thread.subHeader = line;
                }
            } else {
                thread = new HotThread(line);
                threads.push(thread);
            }
        });
    }
    this.threads = threads;

}

function NodeStats(id, stats) {
    this.id = id;
    this.name = stats.name;
    this.stats = stats;
}

function PercolateQuery(queryInfo) {
    this.index = queryInfo._index;
    this.id = queryInfo._id;
    this.source = queryInfo._source;
    this.filter = {};

    this.sourceAsJSON = function () {
        try {
            return JSON.stringify(this.source, undefined, 2);
        } catch (error) {

        }
    };

    this.equals = function (other) {
        return (other instanceof PercolateQuery &&
        this.index == other.index &&
        this.id == other.id &&
        this.source == other.source);
    };
}

function PercolatorsPage(from, size, total, percolators) {
    this.from = from;
    this.size = size;
    this.total = total;
    this.percolators = percolators;

    this.hasNextPage = function () {
        return from + size < total;
    };

    this.hasPreviousPage = function () {
        return from > 0;
    };

    this.firstResult = function () {
        return total > 0 ? from + 1 : 0;
    };

    this.lastResult = function () {
        return this.hasNextPage() ? from + size : total;
    };

    this.nextOffset = function () {
        return this.hasNextPage() ? from + size : from;
    };

    this.previousOffset = function () {
        return this.hasPreviousPage() ? from - size : from;
    };

    this.getPage = function () {
        return percolators;
    };

    this.total = function () {
        return total;
    };
}

function Repository(name, info) {
    this.name = name;
    this.type = info.type;
    this.settings = info.settings;

    this.asJson = function () {
        var json = {type: this.type};
        if (this.type === 'fs') {
            var fsSettings = ['location', 'chunk_size', 'max_restore_bytes_per_sec',
                'max_snapshot_bytes_per_sec', 'compress'];
            json.settings = this.getSettings(fsSettings);
        }
        if (this.type === 'url') {
            var urlSettings = ['url'];
            json.settings = this.getSettings(urlSettings);
        }
        if (this.type === 's3') {
            var s3Settings = ['region', 'bucket', 'base_path', 'access_key',
                'secret_key', 'chunk_size', 'max_retries', 'compress',
                'server_side_encryption'
            ];
            json.settings = this.getSettings(s3Settings);
        }
        if (this.type === 'hdfs') {
            var hdfsSettings = ['uri', 'path', 'load_defaults', 'conf_location',
                'concurrent_streams', 'compress', 'chunk_size'];
            json.settings = this.getSettings(hdfsSettings);
        }
        if (this.type === 'azure') {
            var azureSettings = ['container', 'base_path', 'concurrent_streams',
                'chunk_size', 'compress'];
            json.settings = this.getSettings(azureSettings);
        }
        return JSON.stringify(json);
    };

    this.validate = function () {
        if (!notEmpty(this.name)) {
            throw 'Repository name is required';
        }
        if (!notEmpty(this.type)) {
            throw 'Repository type is required';
        }
        if (this.type === 'fs') {
            var fsRequired = ['location'];
            this.validateSettings(fsRequired);
        }
        if (this.type === 'url') {
            var urlRequired = ['url'];
            this.validateSettings(urlRequired);
        }
        if (this.type === 's3') {
            var s3Required = ['bucket'];
            this.validateSettings(s3Required);
        }
        if (this.type === 'hdfs') {
            var hdfsRequired = ['path'];
            this.validateSettings(hdfsRequired);
        }
    };

    this.validateSettings = function (required) {
        var repository = this;
        required.forEach(function (setting) {
            if (!notEmpty(repository.settings[setting])) {
                var type = repository.type;
                throw(setting + ' is required for snapshot of type ' + type);
            }
        });
    };

    this.getSettings = function (availableSettings) {
        var settings = {};
        var currentSettings = this.settings;
        availableSettings.forEach(function (setting) {
            if (notEmpty(currentSettings[setting])) {
                settings[setting] = currentSettings[setting];
            }
        });
        return settings;
    };
}

function Shard(routing) {
    this.primary = routing.primary;
    this.shard = routing.shard;
    this.state = routing.state;
    this.node = routing.node;
    this.index = routing.index;
    this.id = this.node + '_' + this.shard + '_' + this.index;
}

function ShardStats(shard, index, stats) {
    this.shard = shard;
    this.index = index;
    this.stats = stats;
}

function Snapshot(info) {
    this.name = info.snapshot;
    this.indices = info.indices;
    this.state = info.state;
    this.start_time = info.start_time;
    this.start_time_in_millis = info.start_time_in_millis;
    this.end_time = info.end_time;
    this.end_time_in_millis = info.end_time_in_millis;
    this.duration_in_millis = info.duration_in_millis;
    this.failures = info.failures;
    this.shards = info.shards;
}

/** TYPES **/
function Token(token, startOffset, endOffset, position) {
    this.token = token;
    this.start_offset = startOffset;
    this.end_offset = endOffset;
    this.position = position;
}

function Version(version) {
    var checkVersion = new RegExp('(\\d)\\.(\\d)\\.(\\d)\\.*');
    var major;
    var minor;
    var patch;
    var value = version;
    var valid = false;

    if (checkVersion.test(value)) {
        valid = true;
        var parts = checkVersion.exec(version);
        major = parseInt(parts[1]);
        minor = parseInt(parts[2]);
        patch = parseInt(parts[3]);
    }

    this.isValid = function () {
        return valid;
    };

    this.getMajor = function () {
        return major;
    };

    this.getMinor = function () {
        return minor;
    };

    this.getPatch = function () {
        return patch;
    };

    this.getValue = function () {
        return value;
    };

    this.isGreater = function (other) {
        var higherMajor = major > other.getMajor();
        var higherMinor = major == other.getMajor() && minor > other.getMinor();
        var higherPatch = (
            major == other.getMajor() &&
            minor == other.getMinor() &&
            patch >= other.getPatch()
        );
        return (higherMajor || higherMinor || higherPatch);
    };

}

function Warmer(id, index, body) {
    this.id = id;
    this.index = index;
    this.source = body.source;
    this.types = body.types;
}

function AceEditor(target,actionId,copyId) {

    this.editor = window.ACE_EXT_SEARCH.init($("#"+target),$("#"+actionId),$("#"+copyId));

    this.editor.setOptions({
        fontFamily: 'Monaco, Menlo, Consolas, "Courier New", monospace',
        fontSize: '14px',
        fontWeight: '400'
    });

    // validation error
    this.error = null;

    // sets value and moves cursor to beggining
    this.setValue = function (value) {
        this.editor.update(value);
    };

    this.getValue = function (callback) {
        this.editor.getRequestsInRange(
        function(req){
            callback(req);
        });
    };

    // formats the json content
    this.format = function () {
        this.editor.autoIndent();
    };

    this.hasContent = function () {
        alert("do not call me");
        return false;
    };
}

function AliasFilter(index, alias) {

    this.index = index;
    this.alias = alias;

    this.clone = function () {
        return new AliasFilter(this.index, this.alias);
    };

    this.getSorting = function () {
        return undefined;
    };

    this.equals = function (other) {
        return (other !== null &&
        this.index == other.index &&
        this.alias == other.alias);
    };

    this.isBlank = function () {
        return !notEmpty(this.index) && !notEmpty(this.alias);
    };

    this.matches = function (indexAlias) {
        if (this.isBlank()) {
            return true;
        } else {
            var matches = true;
            if (notEmpty(this.index)) {
                matches = indexAlias.index.indexOf(this.index) != -1;
            }
            if (matches && notEmpty(this.alias)) {
                matches = false;
                var aliases = indexAlias.aliases;
                for (var i = 0; !matches && i < aliases.length; i++) {
                    var alias = aliases[i];
                    matches = alias.alias.indexOf(this.alias) != -1;
                }
            }
            return matches;
        }
    };

}

function Benchmark() {
    this.name = '';
    this.num_executor = 1;
    this.percentiles = '[10, 25, 50, 75, 90, 99]';
    this.competitors = [];

    this.addCompetitor = function (competitor) {
        this.competitors.push(competitor);
    };

    this.toJson = function () {
        var body = {};
        body.name = this.name;
        if (notEmpty(this.num_executor)) {
            body.num_executor_nodes = this.num_executor;
        }
        if (notEmpty(this.percentiles)) {
            body.percentiles = JSON.parse(this.percentiles);
        }
        if (this.competitors.length > 0) {
            body.competitors = this.competitors.map(function (c) {
                return c.toJson();
            });
        }
        if (notEmpty(this.iterations)) {
            body.iterations = this.iterations;
        }
        if (notEmpty(this.concurrency)) {
            body.concurrency = this.concurrency;
        }
        if (notEmpty(this.multiplier)) {
            body.multiplier = this.multiplier;
        }
        if (notEmpty(this.num_slowest)) {
            body.num_slowest = this.num_slowest;
        }
        return JSON.stringify(body, null, 4);
    };

}

function Competitor() {
    this.name = '';

    // override benchmark options
    this.iterations = '';
    this.concurrency = '';
    this.multiplier = '';
    this.num_slowest = '';
    this.warmup = true;
    this.requests = [];

    // defined only by competitor
    this.search_type = 'query_then_fetch';
    this.indices = '';
    this.types = '';

    // cache
    this.filter_cache = false;
    this.field_data = false;
    this.recycler_cache = false;
    this.id_cache = false;

    this.cache_fields = '';
    this.cache_keys = '';

    this.toJson = function () {
        var body = {};
        body.name = this.name;
        if (notEmpty(this.requests)) {
            body.requests = JSON.parse(this.requests);
        }
        if (notEmpty(this.iterations)) {
            if (isNumber(this.iterations)) {
                body.iterations = parseInt(this.iterations);
            } else {
                throw 'Iterations must be a valid number';
            }
        }
        if (notEmpty(this.concurrency)) {
            if (isNumber(this.concurrency)) {
                body.concurrency = parseInt(this.concurrency);
            } else {
                throw 'Concurrency must be a valid number';
            }
        }
        if (notEmpty(this.multiplier)) {
            if (isNumber(this.multiplier)) {
                body.multiplier = parseInt(this.multiplier);
            } else {
                throw 'Multiplier must be a valid number';
            }
        }
        if (notEmpty(this.num_slowest)) {
            if (isNumber(this.num_slowest)) {
                body.num_slowest = parseInt(this.num_slowest);
            } else {
                throw 'Num slowest must be a valid number';
            }
        }
        if (notEmpty(this.indices)) {
            body.indices = this.indices.split(',').map(function (index) {
                return index.trim();
            });
        }
        if (notEmpty(this.types)) {
            body.types = this.types.split(',').map(function (type) {
                return type.trim();
            });
        }

        body.search_type = this.search_type;

        body.clear_caches = {};
        body.clear_caches.filter = this.filter_cache;
        body.clear_caches.field_data = this.field_data;
        body.clear_caches.id = this.id_cache;
        body.clear_caches.recycler = this.recycler_cache;
        if (notEmpty(this.cache_fields)) {
            body.clear_caches.fields = this.cache_fields.split(',').map(
                function (field) {
                    return field.trim();
                });
        }
        if (notEmpty(this.cache_keys)) {
            body.clear_caches.filter_keys = this.cache_keys.split(',').map(
                function (key) {
                    return key.trim();
                });
        }

        return body;
    };

}

function Gist(title, url) {
    this.timestamp = getTimeString(new Date());
    this.title = title;
    this.url = url;

    this.loadFromJSON = function (json) {
        this.title = json.title;
        this.url = json.url;
        this.timestamp = json.timestamp;
        return this;
    };

}

function IndexFilter(name, closed, special, healthy, asc, timestamp) {
    this.name = name;
    this.closed = closed;
    this.special = special;
    this.healthy = healthy;
    this.sort = 'name';
    this.asc = asc;
    this.timestamp = timestamp;

    this.getSorting = function () {
        var asc = this.asc;
        switch (this.sort) {
            case 'name':
                return function (a, b) {
                    if (asc) {
                        return a.name.localeCompare(b.name);
                    } else {
                        return b.name.localeCompare(a.name);
                    }
                };
            default:
                return undefined;
        }
    };

    this.clone = function () {
        return new IndexFilter(
            this.name,
            this.closed,
            this.special,
            this.healthy,
            this.asc,
            this.timestamp
        );
    };

    this.equals = function (other) {
        return (
            other !== null &&
            this.name === other.name &&
            this.closed === other.closed &&
            this.special === other.special &&
            this.healthy === other.healthy &&
            this.asc === other.asc &&
            this.timestamp === other.timestamp
        );
    };

    this.isBlank = function () {
        return (
            !notEmpty(this.name) &&
            this.closed &&
            this.special &&
            this.healthy &&
            this.asc
        );
    };

    this.matches = function (index) {
        var matches = true;
        if (!this.special && index.special) {
            matches = false;
        }
        if (!this.closed && index.closed) {
            matches = false;
        }
        // Hide healthy == show unhealthy only
        if (!this.healthy && !index.unhealthy) {
            matches = false;
        }
        if (matches && notEmpty(this.name)) {
            try {
                var regExp = new RegExp(this.name.trim(), 'i');
                matches = regExp.test(index.name);
                if (!matches) {
                    for (var idx = 0; idx < index.aliases.length; idx++) {
                        if ((matches = regExp.test(index.aliases[idx]))) {
                            break;
                        }
                    }
                }
            }
            catch (err) { // if not valid regexp, still try normal matching
                matches = index.name.indexOf(this.name.toLowerCase()) != -1;
                if (!matches) {
                    for (var idx = 0; idx < index.aliases.length; idx++) {
                        var alias = index.aliases[idx].toLowerCase();
                        matches = true;
                        if ((matches = (alias.indexOf(this.name.toLowerCase()) != -1))) {
                            break;
                        }
                    }
                }
            }
        }
        return matches;
    };

}

function IndexTemplateFilter(name, template) {

    this.name = name;
    this.template = template;

    this.clone = function () {
        return new IndexTemplateFilter(name, template);
    };

    this.getSorting = function () {
        return function (a, b) {
            return a.name.localeCompare(b.name);
        };
    };

    this.equals = function (other) {
        return (other !== null &&
        this.name === other.name &&
        this.template === other.template);
    };

    this.isBlank = function () {
        return !notEmpty(this.name) && !notEmpty(this.template);
    };

    this.matches = function (template) {
        if (this.isBlank()) {
            return true;
        } else {
            var matches = true;
            if (notEmpty(this.name)) {
                matches = template.name.indexOf(this.name) != -1;
            }
            if (matches && notEmpty(this.template)) {
                matches = template.body.template.indexOf(this.template) != -1;
            }
            return matches;
        }
    };

}


function wjlIndexTemplateFilter(name, template,indexName) {

    this.name = name;
    this.template = template;
    this.indexName = indexName;

    this.clone = function () {
        return new wjlIndexTemplateFilter(name, template,indexName);
    };

    this.getSorting = function () {
        return function (a, b) {
            return a.name.localeCompare(b.name);
        };
    };

    this.equals = function (other) {
        return (other !== null &&
        this.name === other.name &&
        this.template === other.template &&
        this.indexName === other.indexName);
    };

    this.isBlank = function () {
        return !notEmpty(this.name) && !notEmpty(this.template) && !notEmpty(this.indexName);
    };

    this.matches = function (template) {
        if (this.isBlank()) {
            return true;
        } else {
            var matches = true;
            if (notEmpty(this.name)) {
                matches = template.name.indexOf(this.name) != -1;
            }
            if (matches && notEmpty(this.template)) {
                matches = template.body.template.indexOf(this.template) != -1;
            }
            if(matches && notEmpty(this.indexName)){
                if(template.body.template != 'demo*'){
                    matches = this.indexName.indexOf(template.body.template.split("*")[0]) != -1;
                }
            }
            return matches;
        }
    };

}

function ModalControls() {
    this.alert = null;
    this.active = false;
    this.title = '';
    this.info = '';
}

function NodeFilter(name, data, master, client, timestamp) {
    this.name = name;
    this.data = data;
    this.master = master;
    this.client = client;
    this.timestamp = timestamp;

    this.clone = function () {
        return new NodeFilter(this.name, this.data, this.master, this.client);
    };

    this.getSorting = function () {
        return undefined;
    };

    this.equals = function (other) {
        return (
            other !== null &&
            this.name == other.name &&
            this.data == other.data &&
            this.master == other.master &&
            this.client == other.client &&
            this.timestamp == other.timestamp
        );
    };

    this.isBlank = function () {
        return !notEmpty(this.name) && (this.data && this.master && this.client);
    };

    this.matches = function (node) {
        if (this.isBlank()) {
            return true;
        } else {
            return this.matchesName(node.name) && this.matchesType(node);
        }
    };

    this.matchesType = function (node) {
        return (
            node.data && this.data ||
            node.master && this.master ||
            node.client && this.client
        );
    };

    this.matchesName = function (name) {
        if (notEmpty(this.name)) {
            return name.toLowerCase().indexOf(this.name.toLowerCase()) != -1;
        } else {
            return true;
        }
    };

}

function Paginator(page, pageSize, collection, filter) {

    this.filter = filter;

    this.page = page;

    this.pageSize = pageSize;

    this.$collection = isDefined(collection) ? collection : [];

    this.nextPage = function () {
        this.page += 1;
    };

    this.previousPage = function () {
        this.page -= 1;
    };

    this.setPageSize = function (newSize) {
        this.pageSize = newSize;
    };

    this.getPageSize = function () {
        return this.pageSize;
    };

    this.getCurrentPage = function () {
        return this.page;
    };

    this.getPage = function () {
        var results = this.getResults();
        var total = results.length;

        var first = total > 0 ? ((this.page - 1) * this.pageSize) + 1 : 0;
        while (total < first) {
            this.previousPage();
            first = (this.page - 1) * this.pageSize + 1;
        }
        var lastPage = this.page * this.pageSize > total;
        var last = lastPage ? total : this.page * this.pageSize;

        var elements = total > 0 ? results.slice(first - 1, last) : [];

        var next = this.pageSize * this.page < total;
        var previous = this.page > 1;
        while (elements.length < this.pageSize) {
            elements.push(null);
        }
        return new Page(elements, total, first, last, next, previous);
    };

    this.setCollection = function (collection) {
        if (this.filter.getSorting()) {
            this.$collection = collection.sort(this.filter.getSorting());
        } else {
            this.$collection = collection;
        }
    };

    this.getResults = function () {
        var filter = this.filter;
        var collection = this.$collection;
        if (filter.isBlank()) {
            return collection;
        } else {
            var filtered = [];
            collection.forEach(function (item) {
                if (filter.matches(item)) {
                    filtered.push(item);
                }
            });
            return filtered;
        }
    };

    this.getCollection = function () {
        return this.$collection;
    };

}

function Page(elements, total, first, last, next, previous) {
    this.elements = elements;
    this.total = total;
    this.first = first;
    this.last = last;
    this.next = next;
    this.previous = previous;
}

function Request(path, method, body) {
    this.timestamp = getTimeString(new Date());
    this.path = path;
    this.method = method;
    this.body = body;

    this.clear = function () {
        this.path = '';
        this.method = '';
        this.body = '';
    };

    this.loadFromJSON = function (json) {
        if (isDefined(json.url)) {
            var url = json.url.substring(7);
            var path = url.substring(url.indexOf('/'));
            this.path = path;
        } else {
            this.path = json.path;
        }
        this.method = json.method;
        this.body = json.body;
        this.timestamp = json.timestamp;
        return this;
    };

    this.equals = function (request) {
        return (
            this.path === request.path &&
            this.method.toUpperCase() === request.method.toUpperCase() &&
            this.body === request.body
        );
    };
}

function SnapshotFilter() {

    this.clone = function () {
        return new SnapshotFilter();
    };

    this.getSorting = function () {
        return undefined;
    };

    this.equals = function (other) {
        return other !== null;
    };

    this.isBlank = function () {
        return true;
    };

    this.matches = function (snapshot) {
        return true;
    };

}

function URLAutocomplete(mappings) {

    var PATHS = [
        // Suggest
        '_suggest',
        '{index}/_suggest',
        // Multi Search
        '_msearch',
        '{index}/_msearch',
        '{index}/{type}/_msearch',
        '_msearch/template',
        '{index}/_msearch/template',
        '{index}/{type}/_msearch/template',
        // Search
        '_search',
        '{index}/_search',
        '{index}/{type}/_search',
        '_search/template',
        '{index}/_search/template',
        '{index}/{type}/_search/template',
        '_search/exists',
        '{index}/_search/exists',
        '{index}/{type}/_search/exists'
    ];

    var format = function (previousTokens, suggestedToken) {
        if (previousTokens.length > 1) {
            var prefix = previousTokens.slice(0, -1).join('/');
            if (prefix.length > 0) {
                return prefix + '/' + suggestedToken;
            } else {
                return suggestedToken;
            }
        } else {
            return suggestedToken;
        }
    };

    this.getAlternatives = function (path) {
        var pathTokens = path.split('/');
        var suggestedTokenIndex = pathTokens.length - 1;

        /**
         * Replaces the variables on suggestedPathTokens({index}, {type}...) for
         * actual values extracted from pathTokens
         * @param {Array} pathTokens tokens for the path to be suggested
         * @param {Array} suggestedPathTokens tokens for the suggested path
         * @returns {Array} a new array with the variables from suggestedPathTokens
         * replaced by the actual values from pathTokens
         */
        var replaceVariables = function (pathTokens, suggestedPathTokens) {
            var replaced = suggestedPathTokens.map(function (token, position) {
                if (position < pathTokens.length - 1 && token.indexOf('{') === 0) {
                    return pathTokens[position];
                } else {
                    return token;
                }
            });
            return replaced;
        };

        /**
         * Checks if a given path matches the definition and current state of
         * the path to be autocompleted
         *
         * @param {Array} pathTokens tokens of path to be autocompleted
         * @param {Array} suggestedPathTokens tokens of possible suggestion
         * @returns {boolean} if suggestion is valid
         */
        var isValidSuggestion = function (pathTokens, suggestedPathTokens) {
            var valid = true;
            suggestedPathTokens.forEach(function (token, index) {
                if (valid && index < pathTokens.length - 1) {
                    switch (token) {
                        case '{index}':
                            valid = mappings.getIndices().indexOf(pathTokens[index]) >= 0;
                            break;
                        case '{type}':
                            valid = mappings.getTypes(pathTokens[index - 1]).indexOf(pathTokens[index]) >= 0;
                            break;
                        default:
                            valid = pathTokens[index] === token;
                    }
                }
            });
            return valid;
        };

        var alternatives = [];

        var addIfNotPresent = function (collection, element) {
            if (collection.indexOf(element) === -1) {
                collection.push(element);
            }
        };

        PATHS.forEach(function (suggestedPath) {
            var suggestedPathTokens = suggestedPath.split('/');
            if (suggestedPathTokens.length > suggestedTokenIndex &&
                isValidSuggestion(pathTokens, suggestedPathTokens)) {
                suggestedPathTokens = replaceVariables(
                    pathTokens,
                    suggestedPathTokens
                );
                var suggestedToken = suggestedPathTokens[suggestedTokenIndex];
                switch (suggestedToken) {
                    case '{index}':
                        mappings.getIndices().forEach(function (index) {
                            addIfNotPresent(alternatives, format(pathTokens, index));
                        });
                        break;
                    case '{type}':
                        var pathIndex = pathTokens[suggestedTokenIndex - 1];
                        mappings.getTypes(pathIndex).forEach(function (type) {
                            addIfNotPresent(alternatives, format(pathTokens, type));
                        });
                        break;
                    default:
                        addIfNotPresent(alternatives, format(pathTokens, suggestedToken));
                }
            }
        });

        return alternatives.sort(function (a, b) {
            return a.localeCompare(b);
        });
    };

    return this;

}

function WarmerFilter(id) {

    this.id = id;

    this.clone = function () {
        return new WarmerFilter(this.id);
    };

    this.getSorting = function () {
        return undefined;
    };

    this.equals = function (other) {
        return other !== null && this.id == other.id;
    };

    this.isBlank = function () {
        return !notEmpty(this.id);
    };

    this.matches = function (warmer) {
        if (this.isBlank()) {
            return true;
        } else {
            return warmer.id.indexOf(this.id) != -1;
        }
    };

}

var Alert = function (message, response, level, _class, icon) {
    var currentDate = new Date();
    this.message = message;
    this.response = response;
    this.level = level;
    this.class = _class;
    this.icon = icon;
    this.timestamp = getTimeString(currentDate);
    this.id = 'alert_box_' + currentDate.getTime();

    this.hasResponse = function () {
        return isDefined(this.response);
    };

    this.getResponse = function () {
        if (isDefined(this.response)) {
            return JSON.stringify(this.response, undefined, 2);
        }
    };
};

function initDate(startDateId,endDateId,date,initData,timeselect){

    if(!date) {
        date = new Date();
    }
    if(initData){
        var time = date.getTime()-initData*60*60*1000;
        var newDate = new Date();
        newDate.setTime(time);
        $('#'+startDateId).val( getDateString3(newDate) );
        $('#'+endDateId).val( getDateString3(date) );
    }else{
        var dateStr = getDateString(date);
        $('#'+startDateId).val( dateStr+" 00:00" );
        $('#'+endDateId).val( dateStr+" 23:59" );
    }

    $('#'+startDateId).datetimepicker({
        format: 'yyyy-mm-dd hh:ii',
        autoclose: true,
        todayHighlight: true
    }).on('click', function (ev) {
        $('#'+startDateId).datetimepicker('setEndDate',$('#'+endDateId).val());
    }).on('change',function(){
        if(!timeselect){
            $(".select_clustom_time" ).each(function (i) {
                $(this).css("background-color","#333");
                $(this).removeClass("selected");
            });
        }
    });
    $('#'+endDateId).datetimepicker({
        format: 'yyyy-mm-dd hh:ii',
        autoclose: true,
        todayBtn: true,
        minuteStep: 5 //可以修改
    }).on('click', function (ev) {
        $('#'+endDateId).datetimepicker('setStartDate', $('#'+startDateId).val());
    }).on('change',function(){
        if(!timeselect){
            $(".select_clustom_time" ).each(function (i) {
                $(this).css("background-color","#333");
                $(this).removeClass("selected");
            });
        }
    });
}


function repeat(s, count) {
    return new Array(count + 1).join(s);
}

function formatJson(json) {
    var i = 0,
        len  = 0,
        tab         = "    ",
        targetJson     = "",
        indentLevel = 0,
        inString    = false,
        currentChar = null;
    for (i = 0, len = json.length; i < len; i += 1) {
        currentChar = json.charAt(i);

        switch (currentChar) {
            case '{':
            case '[':
                if (!inString) {
                    targetJson += currentChar + "\n" + repeat(tab, indentLevel + 1);
                    indentLevel += 1;
                } else {
                    targetJson += currentChar;
                }
                break;
            case '}':
            case ']':
                if (!inString) {
                    indentLevel -= 1;
                    targetJson += "\n" + repeat(tab, indentLevel) + currentChar;
                } else {
                    targetJson += currentChar;
                }
                break;
            case ',':
                if (!inString) {
                    targetJson += ",\n" + repeat(tab, indentLevel);
                } else {
                    targetJson += currentChar;
                }
                break;
            case ':':
                if (!inString) {
                    targetJson += ": ";
                } else {
                    targetJson += currentChar;
                }
                break;
            case ' ':
            case "\n":
            case "\t":
                if (inString) {
                    targetJson += currentChar;
                }
                break;
            case '"':
                if (i > 0 && json.charAt(i - 1) !== '\\') {
                    inString = !inString;
                }
                targetJson += currentChar;
                break;
            default:
                targetJson += currentChar;
                break;
        }
    }

    return targetJson;
}
kopf.directive('hello', function ($timeout) {
    //return {
    //    restrict: 'A',
    //    link: function ($scope,$element,$attrs) {
    //        //alert("wo");
    //        debugger;
    //        console.log($element);
    //        //if ($scope.$last === true) {
    //        //    $timeout(function () {
    //        //        $scope.$emit('ngRepeatFinished');
    //        //    });
    //        //}
    //        //console.log("555===>>>"+document.getElementById("picturePlacenode1"));
    //
    //    },
    //    template:'<h1>wo</h1>'
    //}
    return function(scope,element,attrs) {
        if (scope.$last === true) {
            $timeout(function () {
                scope.$emit('ngRepeatFinished');
            });
        };
    };
});

(function (kopf, JSONTree) {
    'use strict';
    kopf.directive('kopfJsonTree', function ($sce) {
        var directive = {
            restrict: 'E',
            template: '<div class="json-tree" ng-bind-html="result"></div>',
            scope: {
                kopfBind: '='
            },
            link: function (scope, element, attrs, requires) {
                scope.$watch('kopfBind', function (value) {
                    var result;
                    if (value) {
                        try {
                            result = JSONTree.create(value);
                        } catch (invalidJsonError) {
                            result = invalidJsonError;
                        }
                    } else {
                        result = '';
                    }

                    scope.result = $sce.trustAsHtml(result);
                });
            }
        };
        return directive;
    });
})(kopf, JSONTree);


kopf.directive('ngPagination', ['$document', function ($document) {

    return {
        scope: {
            paginator: '=paginator',
            page: '=page',
            label: '=label'
        },
        templateUrl: '/eserknife/resources/kopf/html/partials/directives/pagination.html',
        link: function (scope, element, attrs) {
            var handler = function (event) {
                var $target = $(event.target);
                if ($target.is('input, textarea')) {
                    return;
                }
                if (event.keyCode == 39 && scope.page.next) {
                    scope.$apply(function () {
                        scope.paginator.nextPage();
                        event.preventDefault();
                    });
                }
                if (event.keyCode == 37 && scope.page.previous) {
                    scope.$apply(function () {
                        scope.paginator.previousPage();
                        event.preventDefault();
                    });
                }
            };

            $document.bind('keydown', handler);
            element.on('$destroy', function () {
                $document.unbind('keydown', handler);
            });
        }
    };
}]);



kopf.directive('ngSortBy',
    function () {

        function updateSortingIcon(scope, elem, attrs) {
            var sorts = scope.sortBy === attrs.property;
            var sortIcon = elem.find('i');
            sortIcon.removeClass('fa-sort-asc fa-sort-desc');
            if (sorts) {
                if (scope.reverse) {
                    sortIcon.addClass('fa-sort-desc');
                } else {
                    sortIcon.addClass('fa-sort-asc');
                }
            }
        }

        function link(scope, elem, attrs) {
            scope.$watch(
                function () {
                    return scope.sortBy;
                },
                function () {
                    updateSortingIcon(scope, elem, attrs);
                });

            scope.$watch(
                function () {
                    return scope.reverse;
                },
                function () {
                    updateSortingIcon(scope, elem, attrs);
                }
            );
        }

        return {
            link: link,
            template: function (elem, attrs) {
                return '<a href="" target="_self" ng-click=setSortBy(\'' +
                    attrs.property + '\')>' + attrs.text +
                    '<i class="fa fa-fw fa-sort-asc"></i></a>';
            }
        };
    }
);


kopf.directive('ngStaticInclude', function () {
    return {
        templateUrl: function (elem, attr) {
            return './resources/kopf/html/partials/' + attr.file + '.html';
        }
    };
});


kopf.filter('bytes', function () {

    var UNITS = ['b', 'KB', 'MB', 'GB', 'TB', 'PB'];

    function stringify(bytes) {
        if (bytes > 0) {
            var e = Math.floor(Math.log(bytes) / Math.log(1024));
            return (bytes / Math.pow(1024, e)).toFixed(2) + UNITS[e];
        } else {
            return 0 + UNITS[0];
        }
    }

    return function (bytes) {
        return stringify(bytes);
    };

});

kopf.filter('startsWith', function () {

    function strStartsWith(str, prefix) {
        return (str + '').indexOf(prefix) === 0;
    }

    return function (elements, prefix) {
        var filtered = [];
        angular.forEach(elements, function (element) {
            if (strStartsWith(element, prefix)) {
                filtered.push(element);
            }
        });

        return filtered;
    };
});

kopf.filter('timeInterval', function () {

    var UNITS = ['yr', 'mo', 'd', 'h', 'min'];

    var UNIT_MEASURE = {
        yr: 31536000000,
        mo: 2678400000,
        wk: 604800000,
        d: 86400000,
        h: 3600000,
        min: 60000
    };

    function stringify(seconds) {

        var result = 'less than a minute';

        for (var idx = 0; idx < UNITS.length; idx++) {
            var amount = Math.floor(seconds / UNIT_MEASURE[UNITS[idx]]);
            if (amount) {
                result = amount + UNITS[idx] + '.';
                break;
            }
        }

        return result;
    }

    return function (seconds) {
        return stringify(seconds);
    };

});


kopf.filter('to_trusted', ['$sce', function ($sce) {
    return function (text) {
        return $sce.trustAsHtml(text);
    };
}]);
kopf.factory('AppState', function () {

        this.properties = {};
        this.setProperty = function (controller, property,val){
            this.getProperty(controller, property,val);
            this.properties[controller][property] = val;
        };
        this.getProperty = function (controller, property, defaultValue) {
            if (this.properties[controller] === undefined) {
                this.properties[controller] = {};
            }
            if (this.properties[controller][property] === undefined) {
                this.properties[controller][property] = defaultValue;
            }
            return this.properties[controller][property];
        };

        return this;

    });

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

kopf.factory('ExternalSettingsService', ['DebugService',
    function (DebugService) {

        var KEY = 'kopfSettings';

        var ES_ROOT_PATH = 'elasticsearch_root_path';

        var WITH_CREDENTIALS = 'with_credentials';

        var REFRESH_RATE = 'refresh_rate';

        var THEME = 'theme';

        var UPDATABLE_SETTINGS = [REFRESH_RATE, THEME];

        this.settings = null;

        this.getSettings = function () {
            if (!isDefined(this.settings)) {
                this.settings = this.fetchSettings();
                var localSettings = this.loadLocalSettings();
                this.updateSettings(localSettings);
            }
            return this.settings;
        };

        this.fetchSettings = function () {
            return {
                "elasticsearch_root_path": "",
                "with_credentials": false,
                "theme": "dark",
                "refresh_rate": 5000
            }
        };

        this.getElasticsearchRootPath = function () {
            return this.getSettings()[ES_ROOT_PATH];
        };

        this.withCredentials = function () {
            return this.getSettings()[WITH_CREDENTIALS];
        };

        this.getRefreshRate = function () {
            return this.getSettings()[REFRESH_RATE];
        };

        this.setRefreshRate = function (rate) {
            this.getSettings()[REFRESH_RATE] = rate;
            this.saveSettings();
        };

        this.getTheme = function () {
            return this.getSettings()[THEME];
        };

        this.setTheme = function (theme) {
            this.getSettings()[THEME] = theme;
            this.saveSettings();
        };

        this.saveSettings = function () {
            var settings = {};
            for (var setting in this.settings) {
                if (UPDATABLE_SETTINGS.indexOf(setting) >= 0) {
                    settings[setting] = this.settings[setting];
                }
            }
            localStorage.setItem(KEY, JSON.stringify(settings));
        };

        this.loadLocalSettings = function () {
            var settings = {};
            try {
                var content = localStorage.getItem(KEY);
                if (content) {
                    settings = JSON.parse(content);
                }
            } catch (error) {
                DebugService.debug('Error while loading settings from local storage');
            }
            return settings;
        };

        this.updateSettings = function (settings) {
            if (settings) {
                for (var setting in settings) {
                    if (UPDATABLE_SETTINGS.indexOf(setting) >= 0) {
                        this.settings[setting] = settings[setting];
                    }
                }
            }
        };

        return this;

    }]);

kopf.factory('ConfirmDialogService', function () {
    this.header = 'Default Header';
    this.body = 'Default Body';

    this.confirm = function () {
        // when created, does nothing
    };

    this.close = function () {
        // when created, does nothing
    };

    this.open = function (header, body, action, confirmCallback, closeCallback) {
        this.header = header;
        this.body = body;
        this.action = action;
        this.confirm = confirmCallback; //重写
        this.close = closeCallback;
    };

    return this;
});


kopf.factory('ConfirmDialogService2', function () {
    this.header = 'Default Header';
    this.body = 'Default Body';


    this.open = function (header, body, action, confirmCallback, closeCallback) {
        document.getElementById("my_dialog_service.header").innerHTML = header;
        document.getElementById("my_dialog_service.body").innerHTML = body;
        document.getElementById("my_dialog_service.action").innerHTML = action;
        //为什么jquery取不到dom
        //$("#my_dialog_service.header").html(header);
        //$("#my_dialog_service.body").html(body);
        //$("#my_dialog_service.action").html(action);

        if(confirmCallback) {
            $("#myconfirm").unbind('click');
            $('#myconfirm').click(confirmCallback);
        }
        if(closeCallback){
            $("#closeMyConfirm").unbind('click');
            $("#closeMyConfirm").click(closeCallback);
        }
        $("#confirm_dialog2").show();
    };

    return this;
});



kopf.factory('AceEditorService', function () {

    this.init = function (name,actionId,copyId) {
        return new AceEditor(name,actionId,copyId);
    };

    return this;
});

kopf.factory('AlertService', function () {
    this.maxAlerts = 3;

    this.alerts = [];

    // removes ALL alerts
    this.clear = function () {
        this.alerts.length = 0;
    };

    // remove a particular alert message
    this.remove = function (id) {
        $('#' + id).fadeTo(1000, 0).slideUp(200, function () {
            $(this).remove();
        });
        this.alerts = this.alerts.filter(function (a) {
            return id != a.id;
        });
    };

    // creates an error alert
    this.error = function (msg, resp, timeout) {
        timeout = isDefined(timeout) ? timeout : 7500;
        var alert = new Alert(msg, resp, 'error', 'alert-danger', 'fa fa-warning');
        return this.addAlertCanNotRemove(alert, timeout);
    };

    // creates an info alert
    this.info = function (msg, resp, timeout) {
        timeout = isDefined(timeout) ? timeout : 2500;
        var alert = new Alert(msg, resp, 'info', 'alert-info', 'fa fa-info');
        return this.addAlert(alert, timeout);
    };

    // creates success alert
    this.success = function (msg, resp, timeout) {
        timeout = isDefined(timeout) ? timeout : 2500;
        var alert = new Alert(msg, resp, 'success', 'alert-success', 'fa fa-check');
        return this.addAlert(alert, timeout);
    };

    // creates a warn alert
    this.warn = function (msg, resp, timeout) {
        timeout = isDefined(timeout) ? timeout : 5000;
        var alert = new Alert(msg, resp, 'warn', 'alert-warning', 'fa fa-info');
        return this.addAlert(alert, timeout);
    };

    this.addAlert = function (alert, timeout) {
        this.alerts.unshift(alert);
        var service = this;
         setTimeout(function () {
             service.remove(alert.id);
         }, timeout);
        if (this.alerts.length >= this.maxAlerts) {
            this.alerts.length = 3;
        }
        return alert.id;
    };

    this.addAlertCanNotRemove = function (alert, timeout) {
        this.alerts.unshift(alert);
        var service = this;
        /*setTimeout(function () {
            service.remove(alert.id);
        }, timeout);*/
        if (this.alerts.length >= this.maxAlerts) {
            this.alerts.length = 3;
        }
        return alert.id;
    };

    return this;
});

kopf.factory('ClipboardService', ['AlertService', '$document', '$window',
    function (AlertService, $document, $window) {
        var textarea = angular.element($document[0].createElement('textarea'));
        textarea.css({
            position: 'absolute',
            left: '-9999px',
            top: (
                $window.pageYOffset || $document[0].documentElement.scrollTop
            ) + 'px'
        });
        textarea.attr({readonly: ''});
        angular.element($document[0].body).append(textarea);

        this.copy = function (value, success, failure) {
            try {
                textarea.val(value);
                textarea.select();
                $document[0].execCommand('copy');
                success();
            } catch (error) {
                failure();
            }
        };

        return this;
    }]);

kopf.factory('DebugService', ['$filter', function ($filter) {

    var MaxMessages = 1000;

    var messages = [];

    var updatedAt = 0;

    var addMessage = function (message) {
        var date = new Date();
        messages.push($filter('date')(date, '[yyyy-MM-dd HH:mm:ss] ') + message);
        if (messages.length > MaxMessages) {
            messages.shift();
        }
        updatedAt = date.getTime();
    };

    this.debug = function (message, data) {
        addMessage(message);
        if (data) {
            addMessage(JSON.stringify(data));
        }
    };

    this.getUpdatedAt = function () {
        return updatedAt;
    };

    this.getMessages = function () {
        return messages;
    };

    return this;

}]);

kopf.factory('ExplainService', ['$TreeDnDConvert',
    function ($TreeDnDConvert) {
        function containsString(value, searched) {
            return value.indexOf(searched) >= 0;
        }

        this.isExplainPath = function (path) {
            return path &&
                (containsString(path, '_explain') ||
                containsString(path, '?explain') ||
                containsString(path, 'explain=true'));
        };
        /**
         * Normalize Get document by id and Document search responses.
         * Build explanation tree for TreeDnd directive.
         */
        this.normalizeExplainResponse = function (response) {
            var lHits;
            if (response.hits) {
                // Explain query
                lHits = response.hits.hits;
                // Remove hits from main response
                delete response.hits.hits;
            } else {
                // Explain document
                lHits = [response];
            }
            lHits.forEach(function (lHit) {
                // Sometimes ._explanation, .sometimes explanation, let's normalize it
                if (lHit.explanation) {
                    var lExplanation = lHit.explanation;
                    delete response.explanation;
                    response._explanation = lExplanation;
                }
                lHit.documentId = lHit._index + '/' + lHit._type + '/' + lHit._id;
                if (lHit._explanation) {
                    if (!lHit._score) {
                        lHit._score = lHit._explanation.value;
                    }
                    lHit.explanationTreeData =
                        $TreeDnDConvert.tree2tree([lHit._explanation], 'details');
                }
            });
            return lHits;
        };

        return this;
    }]);

kopf.factory('HostHistoryService', function () {

    this.getHostHistory = function () {
        var history = localStorage.getItem('kopfHostHistory');
        history = isDefined(history) ? history : '[]';
        return JSON.parse(history);
    };

    this.addToHistory = function (connection) {
        var host = connection.host.toLowerCase();
        var username = connection.username;
        var password = connection.password;
        if (username && password) {
            host = host.replace(/^(https|http):\/\//gi, function addAuth(prefix) {
                return prefix + username + ':' + password + '@';
            });
        }
        var entry = {host: host};
        var history = this.getHostHistory();
        for (var i = 0; i < history.length; i++) {
            if (history[i].host === host) {
                history.splice(i, 1);
                break;
            }
        }
        history.splice(0, 0, entry);
        if (history.length > 10) {
            history.length = 10;
        }
        localStorage.setItem('kopfHostHistory', JSON.stringify(history));
    };

    this.clearHistory = function () {
        localStorage.removeItem('kopfHostHistory');
    };

    return this;

});

kopf.factory('DebugService', ['$filter', function ($filter) {

    var MaxMessages = 1000;

    var messages = [];

    var updatedAt = 0;

    var addMessage = function (message) {
        var date = new Date();
        messages.push($filter('date')(date, '[yyyy-MM-dd HH:mm:ss] ') + message);
        if (messages.length > MaxMessages) {
            messages.shift();
        }
        updatedAt = date.getTime();
    };

    this.debug = function (message, data) {
        addMessage(message);
        if (data) {
            addMessage(JSON.stringify(data));
        }
    };

    this.getUpdatedAt = function () {
        return updatedAt;
    };

    this.getMessages = function () {
        return messages;
    };

    return this;

}]);

kopf.factory('PageService', ['ElasticService', 'DebugService', '$rootScope',
    '$document', function(ElasticService, DebugService, $rootScope, $document) {

        var instance = this;

        this.clusterStatus = undefined;
        this.clusterName = undefined;

        this.link = $document[0].querySelector('link[rel~=\'icon\']');

        if (this.link) {
            var faviconUrl = this.link.href;
            var img = $document[0].createElement('img');
            img.src = faviconUrl;
        }

        $rootScope.$watch(
            function() {
                return ElasticService.cluster;
            },
            function(cluster, oldValue) {
                instance.setFavIconColor(cluster ? cluster.status : undefined);
                instance.setPageTitle(cluster ? cluster.name : undefined);
            }
        );

        /**
         * Updates page title if name is different than clusterName
         *
         * @param {string} name - cluster name
         */
        this.setPageTitle = function(name) {
            if (name !== this.clusterName) {
                if (name) {
                    $rootScope.title = 'EserKnife[' + name + ']';
                } else {
                    $rootScope.title = 'EserKnife - no connection';
                }
                this.clusterName = name;
            }
        };

        this.setFavIconColor = function(status) {
            if (this.link && this.clusterStatus !== status) {
                this.clusterStatus = status;
                try {
                    var colors = {green: '#468847', yellow: '#c09853', red: '#B94A48'};
                    var color = status ? colors[status] : '#333';
                    var canvas = $document[0].createElement('canvas');
                    canvas.width = 32;
                    canvas.height = 32;
                    var context = canvas.getContext('2d');
                    context.drawImage(img, 0, 0);
                    context.globalCompositeOperation = 'source-in';
                    context.fillStyle = color;
                    context.fillRect(0, 0, 32, 32);
                    context.fill();
                    this.link.type = 'image/x-icon';
                    var imgUrl = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MTMwNDE0RDQ0OTFBMTFFODgzOThFNEREOERDRTI0QUMiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MTMwNDE0RDU0OTFBMTFFODgzOThFNEREOERDRTI0QUMiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDoxMzA0MTREMjQ5MUExMUU4ODM5OEU0REQ4RENFMjRBQyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDoxMzA0MTREMzQ5MUExMUU4ODM5OEU0REQ4RENFMjRBQyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pq/eOk8AAAOSSURBVHjaxJdbSBRhFMfP3NakIumuWLahRSQlSmRZkGT2EN0fkozoqehCD9VLEV0guhAZBUIPiVQP9VBUlCCu5EtBsOU1sqRCMTRFK9u1dd2dnf5nmgEbHGd3XfLID1G++b7/nG/O/zufUHx5I5kxHB6mnIwc/XdrVyspkkKWyAXFYA1YCKYDHvQb9IAWUAc8oJuiCDmKMbzIdrALrAeizZh0kAf2gV7wGDwyxNiG6LD4ZuAFt8GGKMabMRscADXgAZgXdQZEQaRgODjFH/SXuyTXXhp/cObWgZPJruRKnt9WgCAINBAYSCvIKqjMz8wvpgSFQMIcVVMrPC2elB+DP65LojS6AKib3DPQcyfPnVu0bP4yCqvhEZPoCuMSIAkSZ1XwfvaW9fn6RAi4ZrcFt0RBKAqGghQYDujVMDI0TYtLAKc9pIYookU4G5fwr0/gqVXAbrBntAm4HL1fvFTT4iFZksx8xLAFEA+++/tJkvTavgJegn5TQDI4a5tC7FnXz26qa63TxQgU31a4ZBcZH+FicAEcNAWcAIvGNAxRpknKJGRAjluAJUrBedHYhlL6/zEV7GcB2SCTJiZ28ttv5W12Gqnxj6bFXQnC6CWcyhlYHdUM2l8RCQ5ZNk61MYNrODt9KR0pOkyiKMa2gqhQ5/dOet7wnNSIas2ExgKmOU3CD2bMyqCsuVkxv6IiK9TQ3kBVjVV6Bq0VJEd7wrE7+of8xgRaDLWfRD48N9Zp6AMznAzkVdsrevL2CUwpNh9g48HJqtuw9SQ0BXSCBU6T9Pn6qbGjSU9pLAK4avh5NjC7DLwBax1PNNgxZyKBTqjr45w8o4mLfhbwGnydIAG1LCAAqiZgcW42ys0v4xz7MphpNzocCdNQaIiUiDKub8CluMzna8F7U8A3UAYu2hlRWkoqFS4pjKshMZsSNRKh+o56CoVDvXDEY9aOiPu0TaBgNCvmC8vy+cvjfnOuol8BHx29d5RN7SL6xI9WAcNGS/YC7bMb/HMzGk9TagpgN4UdV+DPG3ZteTucblvNO89D9IBZKtwrURHBNrpnue8nyUnHnS4mzdXN1VsGhwbvQtCKBK2vBkKBmyX5Jcdw2XG+G6L3+4BcrYGA0/jzVDQNyxjRxs0ntuAFb6m1pxAd6vQMWGVUSE+MC7PFHwIr+bsaz+3Ya3AV7AB8n3eDFKOd55cIgUG2VtAEHhp1rjpN/keAAQCZyRgCrf7aowAAAABJRU5ErkJggg==";
                    //  this.link.href = canvas.toDataURL();
                    this.link.href = imgUrl;
                } catch (exception) {
                    DebugService.debug('Error while changing favicon', exception);
                }
            }
        };

        return this;

    }]);
kopf.controller('AlertsController', ['$scope', 'AlertService',
  function($scope, AlertService) {

    $scope.alerts = [];

    $scope.$watch(
        function() {
          return AlertService.alerts;
        },
        function(newValue, oldValue) {
          $scope.alerts = AlertService.alerts;
        }
    );

    $scope.remove = function(id) {
      AlertService.remove(id);
    };

  }

]);

kopf.controller('AliasController', ['$scope', '$location', '$timeout',
    'AlertService', 'ElasticService','AceEditorService','AppState',
function($scope, $location, $timeout, AlertService, ElasticService,AceEditorService,AppState) {

    $scope.toolsFlag = 0; //1 新建  2 迁移 3 移除
    $scope.aliasEditor = undefined;
    $scope.createIndexName = "";
    $scope.fromAliasIndexName="";
    $scope.fromAliasName="";
    $scope.toAliasName="";
    $scope.aliasName = undefined;
    $scope.indexAliasNames = [];
    $scope.paginator = new Paginator(1, 10, [], new AliasFilter('', ''));
    $scope.page = $scope.paginator.getPage();

    $scope.createDefaultJson = 'POST /_aliases\n' +
        '{\n' +
        '  "actions": [\n' +
        '    {\n' +
        '      "add": {\n' +
        '        "index": "",\n' +
        '        "alias": ""\n' +
        '      }\n' +
        '    }\n' +
        '  ]\n' +
        '}';

    $scope.mvDefaultJson = 'POST /_aliases\n' +
        '{\n' +
        '  "actions": [\n' +
        '    {\n' +
        '      "remove": {\n' +
        '        "index": "",\n' +
        '        "alias": ""\n' +
        '      }\n' +
        '    },\n' +
        '    {\n' +
        '      "add": {\n' +
        '        "index": "",\n' +
        '        "alias": ""\n' +
        '      }\n' +
        '    }\n' +
        '  ]\n' +
        '}';

    $scope.delDefaultJson = 'POST /_aliases\n' +
        '{\n' +
        '  "actions": [\n' +
        '    {\n' +
        '      "remove": {\n' +
        '        "index": "",\n' +
        '        "alias": ""\n' +
        '      }\n' +
        '    }\n' +
        '  ]\n' +
        '}';

    $scope.$watch('paginator', function (filter, previous) {
        $scope.page = $scope.paginator.getPage();
    }, true);

    $scope.viewDetails = function (alias) {
        $scope.details = alias;
    };

    $scope.loadAliases = function () {
        ElasticService.fetchAliases(
            function (indexAliases) {
                $scope.original = indexAliases.map(function (ia) {
                    return ia.clone();
                });
                $scope.originalAlias = indexAliases.map(function (ia) {
                    return ia.clone();
                });
                $scope.paginator.setCollection(indexAliases);
                $scope.page = $scope.paginator.getPage();
            },
            function (error) {
                AlertService.error('Error while fetching aliases', error);
            }
        );
    };

    $scope.removeIndexAlias = function (index, alias) {
        var indexPosition = 0;
        var collection = $scope.paginator.getCollection();
        for (; indexPosition < collection.length; indexPosition++) {
            if (index == collection[indexPosition].index) {
                break;
            }
        }
        var indexAliases = collection[indexPosition];
        var size = indexAliases.aliases.length;
        for (var aliasPosition = 0; aliasPosition < size; aliasPosition++) {
            if (alias == indexAliases.aliases[aliasPosition].alias) {
                indexAliases.aliases.splice(aliasPosition, 1);
                if (indexAliases.aliases.length === 0) {
                    collection.splice(indexPosition, 1);
                }
                break;
            }
        }
        $scope.paginator.setCollection(collection);
        $scope.page = $scope.paginator.getPage();
        $scope.aliasEditor.getValue(function(data) {
            var actions ;
            if(data && data.length > 0){
                var body=data[0].data;
                if(body){
                    actions = JSON.parse(body).actions;
                }
            }
           var removeJson = $.parseJSON('{\n' +
                '      "remove": {\n' +
                '        "index": "' + index + '",\n' +
                '        "alias": "' + alias + '"\n' +
                '      }\n' +
                '    }\n');
            if(actions){
                for(var i= 0;i<actions.length;i++){
                    var action =actions[i];
                    if(!action.remove.index || !action.remove.alias){
                        actions.remove(action);
                    }
                }
            }
            if(actions){
                actions.push(removeJson);
            }else{
                actions[0] = removeJson;
            }
            var str = formatJson('{\n"actions":\n'+JSON.stringify(actions)+'\n}');

            $scope.aliasEditor.setValue('POST /_aliases\n'+str);
        });
    };

    $scope.initEditorAliasManager = function () {
        if (!angular.isDefined($scope.setMapEditor)) {
            $scope.aliasEditor = AceEditorService.init('alias-editor','editor_alias_actions','copy_as_alias_curl');
            $scope.aliasEditor.setValue($scope.createDefaultJson);
        }
    };

    $scope.splitterHandlerAliasManager = function () {
        $('#aliasTools').jqxSplitter({
            width: '100%',
            height: 710,
            theme: 'metrodark',
            panels: [{size: '50%', collapsible: false}, {collapsed: false}]
        });
    };

    $scope.initAliasHandle = function () {
        $scope.$watch(
            function () {
                return ElasticService.cluster;
            },
            function (filter, previous) {
                if (!ElasticService.cluster) return;
                if ($scope.indexAliasNames.length == 0) {
                    var indexNames = ElasticService.getAllIndicesNames();
                    $scope.indexAliasNames= indexNames;
                    $("#alias-index-combobox").jqxComboBox({source:indexNames});
                    $("#to_alias-index-combobox").jqxComboBox({source:indexNames});
                    return;
                }
            },
            true
        );
        var selectedIndex = AppState.getProperty("CreateAliasManager", "selectedIndex", "");
        $scope.aliasIndex = selectedIndex != "" ? selectedIndex : "";
        AppState.setProperty("CreateAliasManager", "selectedIndex", "");
    };

    $scope.indexComboboxHandlerAliasManager = function () {
        $("#alias-index-combobox").jqxComboBox({
            height: 30,
            width: '100%',
            theme: 'metrodark',
            searchMode: 'contains',
            autoComplete: true,
            placeHolder: '选择索引',
            source: $scope.indexAliasNames
        });
        $("#to_alias-index-combobox").jqxComboBox({
            height: 30,
            width: 300,
            theme: 'metrodark',
            searchMode: 'contains',
            autoComplete: true,
            placeHolder: '选择索引',
            source: $scope.indexAliasNames
        });
        $("#alias-index-combobox").on('change', function (event) {
            if (event.args) {
                var item = event.args.item;
                var value = item.value;
                if (isDefined(value)) {
                    $("#aliasName").val("");
                    $scope.createIndexName = value;
                    var new_val = 'POST /_aliases\n' +
                        '{\n' +
                        '  "actions": [\n' +
                        '    {\n' +
                        '      "add": {\n' +
                        '        "index": "' + value + '",\n' +
                        '        "alias": ""\n' +
                        '      }\n' +
                        '    }\n' +
                        '  ]\n' +
                        '}';
                    $scope.aliasEditor.setValue(new_val);
                }
            }
        });

        $("#to_alias-index-combobox").on('change', function (event) {
            if (event.args) {
                var item = event.args.item;
                var value = item.value;
                if (isDefined(value)) {
                    $scope.toAliasName = value;
                    $scope.aliasEditor.setValue('POST /_aliases\n' +
                        '{\n' +
                        '  "actions": [\n' +
                        '    {\n' +
                        '      "remove": {\n' +
                        '        "index": "' + $scope.fromAliasIndexName + '",\n' +
                        '        "alias": "' + $scope.fromAliasName + '"\n' +
                        '      }\n' +
                        '    },\n' +
                        '    {\n' +
                        '      "add": {\n' +
                        '        "index": "' + $scope.toAliasName + '",\n' +
                        '        "alias": "' + $scope.fromAliasName + '"\n' +
                        '      }\n' +
                        '    }\n' +
                        '  ]\n' +
                        '}');
                }
            }
        });
    };

    $scope.$watch("aliasName", function (current, previous) {
        if (isDefined(current)) {
            var newVal = 'POST /_aliases\n' +
                '{\n' +
                '  "actions": [\n' +
                '    {\n' +
                '      "add": {\n' +
                '        "index": "' + $scope.createIndexName + '",\n' +
                '        "alias": "' + current + '"\n' +
                '      }\n' +
                '    }\n' +
                '  ]\n' +
                '}';
            $scope.aliasEditor.setValue(newVal);
        }
    });



    $scope.$watch("fromAliasIndexName", function (current, previous) {
        if (isDefined(current)) {
            if($scope.originalAlias){
                $scope.fromAliasName="";
                for(var i= 0;i<$scope.originalAlias.length;i++){
                    if(current == $scope.originalAlias[i].index){
                        $scope.allAlias =  $scope.originalAlias[i];
                    }
                }
                if($scope.fromAliasIndexName){
                    $scope.aliasEditor.setValue('POST /_aliases\n' +
                        '{\n' +
                        '  "actions": [\n' +
                        '    {\n' +
                        '      "remove": {\n' +
                        '        "index": "' + $scope.fromAliasIndexName + '",\n' +
                        '        "alias": "' + $scope.fromAliasName + '"\n' +
                        '      }\n' +
                        '    },\n' +
                        '    {\n' +
                        '      "add": {\n' +
                        '        "index": "' + $scope.toAliasName + '",\n' +
                        '        "alias": "' + $scope.fromAliasName + '"\n' +
                        '      }\n' +
                        '    }\n' +
                        '  ]\n' +
                        '}');
                }
            }
        }
    });
    $scope.$watch("fromAliasName", function (current, previous) {
        if (isDefined(current)　&& current) {
            if($scope.fromAliasName){
                $scope.aliasEditor.setValue('POST /_aliases\n' +
                    '{\n' +
                    '  "actions": [\n' +
                    '    {\n' +
                    '      "remove": {\n' +
                    '        "index": "' + $scope.fromAliasIndexName + '",\n' +
                    '        "alias": "' + $scope.fromAliasName + '"\n' +
                    '      }\n' +
                    '    },\n' +
                    '    {\n' +
                    '      "add": {\n' +
                    '        "index": "' + $scope.toAliasName + '",\n' +
                    '        "alias": "' + $scope.fromAliasName + '"\n' +
                    '      }\n' +
                    '    }\n' +
                    '  ]\n' +
                    '}');
            }
        }
    });



    $scope.createAliasManager=function(){
        $scope.aliasEditor.getValue(function(data) {
            var method = data[0].method;
            var url = data[0].url;
            var body = data[0].data;
            if(body){
                if (!isDefined($scope.aliasEditor.error)) {
                    var params={"clusterName":clusterName,"data":body,"url":url,"method":method};
                    ElasticService.clusterRequest2("/eserknife/aliasManager/createAll" +
                        "", 'POST', {}, params, {},
                        function (res) {
                            if (res && res.acknowledged) {
                                $scope.clearData();
                                $scope.loadAliases();
                                AlertService.success('操作成功');
                            }else{
                                AlertService.error('操作失败',res);
                            }
                        });
                }
            }
        });

    };


    $scope.radioHandlerAliasManager = function() {
        $("#jqxRadioCreateAliasManager").jqxRadioButton({height: 25, theme: 'metrodark', checked: true});
        $("#jqxRadioMvAliasManager").jqxRadioButton({height: 25, theme: 'metrodark'});
        $("#jqxRadioDeleteAliasManager").jqxRadioButton({height: 25, theme: 'metrodark'});

        $("#jqxRadioCreateAliasManager").on('change', function (event) {
            if (event.args.checked) {
                $("#create_alias_manager").show();
                $("#mv_alias_manager").hide();
                $("#delete_alias_manager").hide();
                $scope.clearData();
                $scope.aliasEditor.setValue($scope.createDefaultJson);
            }
        });

        $("#jqxRadioMvAliasManager").on('change', function (event) {
            if (event.args.checked) {
                $scope.loadAliases();
                $("#create_alias_manager").hide();
                $("#mv_alias_manager").show();
                $("#delete_alias_manager").hide();
                $scope.clearData();
                $scope.aliasEditor.setValue($scope.mvDefaultJson);
            }
        });
        $("#jqxRadioDeleteAliasManager").on('change', function (event) {
            if (event.args.checked) {
                $scope.loadAliases();
                $("#create_alias_manager").hide();
                $("#mv_alias_manager").hide();
                $("#delete_alias_manager").show();
                $scope.clearData();
                $scope.aliasEditor.setValue($scope.delDefaultJson);
            }
        });
    }

    $scope.clearData = function(){
        $scope.fromAliasName="";
        $scope.fromAliasIndexName = "";
        $scope.allAlias=[];
        $("#alias-index-combobox").val("");
        $("#aliasName").val("");
        $("#to_alias-index-combobox").val("");
        $scope.aliasEditor.setValue();
    };

    $scope.initializeController = function () {
        $scope.initEditorAliasManager();
        $scope.indexComboboxHandlerAliasManager();
        var indexNames = ElasticService.getAllIndicesNames();
        if(indexNames && indexNames.length > 1000){
            setTimeout(function() {
                $scope.initAliasHandle();
            },10);
        }else{
            $scope.initAliasHandle();
        }
        $scope.splitterHandlerAliasManager();
        $scope.radioHandlerAliasManager();
        $scope.loadAliases();
    };
  }
]);

kopf.controller('AnalysisController', ['$scope', '$location', '$timeout',
  'AlertService', 'ElasticService',
  function($scope, $location, $timeout, AlertService, ElasticService) {

    $scope.indices = null;

    // by index
    $scope.field_index = null;
    $scope.field_index_metadata = null;
    $scope.field_type = '';
    $scope.field_field = '';
    $scope.field_text = '';
    $scope.field_tokens = [];

    // By analyzer
    $scope.analyzer_index = '';
    $scope.analyzer_index_metadata = null;
    $scope.analyzer_analyzer = '';
    $scope.analyzer_text = '';
    $scope.analyzer_tokens = [];
    $scope.analyzerName = undefined;

    $scope.$watch(
        function() {
          return ElasticService.cluster;
        },
        function(filter, previous) {
          $scope.indices = ElasticService.getOpenIndices();
        },
        true
    );

    $scope.$watch('field_field',function(current,previous){
      var val = '';
      $scope.analyzerName=val;
      if (isDefined(current)) {
        if(current){
          var indexVal=$scope.field_index_metadata.mappings[$scope.field_type].properties[current].index;
          var typeVal = $scope.field_index_metadata.mappings[$scope.field_type].properties[current].type;
          var analyzerVal =$scope.field_index_metadata.mappings[$scope.field_type].properties[current].analyzer;
          if(typeVal && typeVal == 'string'){
            if(indexVal){
              $scope.analyzerName=indexVal;
            }else if(analyzerVal){
              $scope.analyzerName=analyzerVal;
            }else{
              $scope.analyzerName='默认分词';
            }
          }else{
            $scope.analyzerName='只有string类型支持分词，该类型没有分词';
          }
        }
      }
    });

    $scope.$watch('field_index', function(current, previous) {
      if (isDefined(current)) {
        $scope.loadIndexTypes(current.name);
      }
    });

    $scope.loadIndexTypes = function(index) {
      $scope.field_type = '';
      $scope.field_field = '';
      if (notEmpty(index)) {
        ElasticService.getIndexMetadata(index,
            function(metadata) {
              $scope.field_index_metadata = metadata;
            },
            function(error) {
              $scope.field_index = '';
              AlertService.error('Error loading index types', error);
            }
        );
      }
    };


    $scope.$watch('analyzer_index', function(current, previous) {
      if (isDefined(current)) {
        $scope.loadIndexAnalyzers(current.name);
      }
    });

    $scope.loadIndexAnalyzers = function(index) {
      $scope.analyzer_analyzer = '';
      if (notEmpty(index)) {
        ElasticService.getIndexMetadata(index,
            function(metadata) {
              $scope.analyzer_index_metadata = metadata;
            },
            function(error) {
              $scope.analyzer_index = '';
              AlertService.error('Error loading index analyzers', error);
            }
        );
      }
    };

    $scope.analyzeByField = function() {
      if ($scope.field_field.length > 0 && $scope.field_text.length > 0) {
        $scope.field_tokens = null;
        ElasticService.analyzeByField($scope.field_index.name,
            $scope.field_field, $scope.field_text,
            function(response) {
              $scope.field_tokens = response;
            },
            function(error) {
              $scope.field_tokens = null;
              AlertService.error('Error analyzing text by field', error);
            }
        );
      }
    };

/*    $scope.analyzeByAnalyzer = function() {
      if (notEmpty($scope.analyzer_analyzer) &&
          notEmpty($scope.analyzer_text)) {
        $scope.analyzer_tokens = null;
        ElasticService.analyzeByAnalyzer($scope.analyzer_index.name,
            $scope.analyzer_analyzer, $scope.analyzer_text,
            function(response) {
              $scope.analyzer_tokens = response;
            },
            function(error) {
              $scope.analyzer_tokens = null;
              AlertService.error('Error analyzing text by analyzer', error);
            }
        );
      }
    };*/

    $scope.initializeController = function() {
      $scope.indices = ElasticService.getOpenIndices();
    };

  }
]);

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
kopf.controller('ClusterOverviewController', ['$scope', '$window','ExternalSettingsService',
        'ConfirmDialogService', 'AlertService', 'ElasticService', 'AppState','$location',
        function ($scope, $window, ExternalSettingsService,ConfirmDialogService, AlertService, ElasticService,
                  AppState,$location) {
            ExternalSettingsService.setTheme("dark");

            $scope.cluster = undefined;

            $scope.isAdmin=isAdmin;
            $scope.isProd=isProd;

            $scope.nodes = [];

            $scope.relocatingShard = undefined;

            $scope.expandedView = false;

            $($window).resize(function () {
                $scope.$apply(function () {
                    $scope.index_paginator.setPageSize($scope.getPageSize());
                });
            });

            $scope.getPageSize = function () {
                return Math.max(Math.round($window.innerWidth / 280), 1);
            };

            $scope.index_filter = AppState.getProperty(
                'ClusterOverview',
                'index_filter',
                new IndexFilter('', true, false, true, true, 0)
            );

            $scope.index_paginator = AppState.getProperty(
                'ClusterOverview',
                'index_paginator',
                new Paginator(1, $scope.getPageSize(), [], $scope.index_filter)
            );

            $scope.page = $scope.index_paginator.getPage();

            $scope.node_filter = AppState.getProperty(
                'ClusterOverview',
                'node_filter',
                new NodeFilter('', true, false, false, 0)
            );

            $scope.$watch(
                function () {
                    return ElasticService.cluster;
                },
                function (newValue, oldValue) {
                    $scope.cluster = ElasticService.cluster;
                    $scope.setIndices(ElasticService.getIndices());
                    $scope.setNodes(ElasticService.getNodes());
                    if ($scope.cluster &&
                        $scope.cluster.unassigned_shards === 0 &&
                        $scope.cluster.relocating_shards === 0 &&
                        $scope.cluster.initializing_shards === 0) {
                        // since control is only exposed when shards are moving
                        $scope.index_filter.healthy = true;
                    }
                }
            );

            $scope.$watch('node_filter',
                function (filter, previous) {
                    $scope.setNodes(ElasticService.getNodes());
                },
                true);

            $scope.$watch('index_paginator', function (filter, previous) {
                $scope.setIndices(ElasticService.getIndices());
            }, true);

            $scope.selectShardRelocation = function (shard) {
                $scope.relocatingShard = shard;
            };

            $scope.setNodes = function (nodes) {
                $scope.nodes = nodes.filter(function (node) {
                    return $scope.node_filter.matches(node);
                });
            };

            $scope.setIndices = function (indices) {
                $scope.index_paginator.setCollection(indices);
                $scope.page = $scope.index_paginator.getPage();
            };

            $scope.optimizeIndex = function (index) {
                ElasticService.optimizeIndex(index,
                    function (response) {
                        AlertService.success('Index was successfully optimized', response);
                    },
                    function (error) {
                        AlertService.error('Error while optimizing index', error);
                    }
                );
            };

            $scope.promptOptimizeIndex = function (index) {
                ConfirmDialogService.open(
                    'are you sure you want to optimize index ' + index + '?',
                    'Optimizing an index is a resource intensive operation and ' +
                    'should be done with caution. Usually, you will only want to ' +
                    'optimize an index when it will no longer receive updates',
                    'Optimize',
                    function () {
                        $scope.optimizeIndex(index);
                    }
                );
            };

            $scope.deleteIndex = function (index) {
                ElasticService.deleteIndex(index,
                    function (response) {
                        ElasticService.refresh();
                    },
                    function (error) {
                        AlertService.error('Error while deleting index', error);
                    }
                );
            };

            $scope.promptDeleteIndex = function (index) {
                ConfirmDialogService.open(
                    'are you sure you want to delete index ' + index + '?',
                    'Deleting an index cannot be undone and all data for this ' +
                    'index will be lost',
                    'Delete',
                    function () {
                        $scope.deleteIndex(index);
                    }
                );
            };

            $scope.clearCache = function (index) {
                ElasticService.clearCache(index,
                    function (response) {
                        AlertService.success('Index cache was cleared', response);
                        ElasticService.refresh();
                    },
                    function (error) {
                        AlertService.error('Error while clearing index cache', error);
                    }
                );
            };

            $scope.promptClearCache = function (index) {
                ConfirmDialogService.open(
                    'are you sure you want to clear the cache for ' + index + '?',
                    'This will clear all caches for this index.',
                    'Clear',
                    function () {
                        $scope.clearCache(index);
                    }
                );
            };

            $scope.refreshIndex = function (index) {
                ElasticService.refreshIndex(index,
                    function (response) {
                        AlertService.success('Index was successfully refreshed', response);
                    },
                    function (error) {
                        AlertService.error('Error while refreshing index', error);
                    }
                );
            };

            $scope.promptRefreshIndex = function (index) {
                ConfirmDialogService.open(
                    'are you sure you want to refresh index ' + index + '?',
                    'Refreshing an index makes all operations performed since the ' +
                    'last refresh available for search.',
                    'Refresh',
                    function () {
                        $scope.refreshIndex(index);
                    }
                );
            };

            $scope.enableAllocation = function () {
                ElasticService.enableShardAllocation(
                    function (response) {
                        AlertService.success('Shard allocation was enabled', response);
                        ElasticService.refresh();
                    },
                    function (error) {
                        AlertService.error('Error while enabling shard allocation', error);
                    }
                );
            };

            $scope.disableAllocation = function () {
                ElasticService.disableShardAllocation(
                    function (response) {
                        AlertService.success('Shard allocation was disabled', response);
                        ElasticService.refresh();
                    },
                    function (error) {
                        AlertService.error('Error while disabling shard allocation', error);
                    }
                );
            };

            $scope.promptCloseIndex = function (index) {
                ConfirmDialogService.open(
                    'are you sure you want to close index ' + index + '?',
                    'Closing an index will remove all it\'s allocated shards from ' +
                    'the cluster.  Both searches and updates will no longer be ' +
                    'accepted for the index. A closed index can be reopened.',
                    'Close index',
                    function () {
                        ElasticService.closeIndex(index);
                    }
                );
            };

            $scope.promptOpenIndex = function (index) {
                ConfirmDialogService.open(
                    'are you sure you want to open index ' + index + '?',
                    'Opening an index will trigger the recovery process. ' +
                    'This process could take sometime depending on the index size.',
                    'Open index',
                    function () {
                        ElasticService.openIndex(index);
                    }
                );
            };

            $scope.promptCloseIndices = function () {
                var indices = $scope.index_paginator.getResults().map(function (index) {
                    return index.name;
                });
                ConfirmDialogService.open(
                    'are you sure you want to close all selected indices?',
                    'Closing an index will remove all it\'s allocated shards from ' +
                    'the cluster.  Both searches and updates will no longer be ' +
                    'accepted for the index. A closed index can be reopened.\n\n' +
                    'Selected indices:\n' + indices.join('\n'),
                    'Close index',
                    function () {
                        ElasticService.closeIndex(indices.join(','));
                    }
                );
            };

            $scope.promptOpenIndices = function () {
                var indices = $scope.index_paginator.getResults().map(function (index) {
                    return index.name;
                });
                ConfirmDialogService.open(
                    'are you sure you want to open all selected indices?',
                    'Opening an index will trigger the recovery process. ' +
                    'This process could take sometime depending on the index size.\n\n' +
                    'Selected indices:\n' + indices.join('\n'),
                    'Open index',
                    function () {
                        ElasticService.openIndex(indices.join(','));
                    }
                );
            };

            $scope.promptRefreshIndices = function () {
                var indices = $scope.index_paginator.getResults().map(function (index) {
                    return index.name;
                });
                ConfirmDialogService.open(
                    'are you sure you want to refresh all selected indices?',
                    'Refreshing an index makes all operations performed since the ' +
                    'last refresh available for search.\n\n' +
                    'Selected indices:\n' + indices.join('\n'),
                    'Refresh',
                    function () {
                        $scope.refreshIndex(indices.join(','));
                    }
                );
            };

            $scope.promptClearCaches = function () {
                var indices = $scope.index_paginator.getResults().map(function (index) {
                    return index.name;
                });
                ConfirmDialogService.open(
                    'are you sure you want to clear the cache for all selected indices?',
                    'This will clear all caches for this index.\n\n' +
                    'Selected indices:\n' + indices.join('\n'),
                    'Clear',
                    function () {
                        $scope.clearCache(indices.join(','));
                    }
                );
            };

            $scope.promptDeleteIndices = function () {
                var indices = $scope.index_paginator.getResults().map(function (index) {
                    return index.name;
                });
                ConfirmDialogService.open(
                    'are you sure you want to delete all selected indices?',
                    'Deleting an index cannot be undone and all data for this ' +
                    'index will be lost.\n\n' +
                    'Selected indices:\n' + indices.join('\n'),
                    'Delete',
                    function () {
                        $scope.deleteIndex(indices.join(','));
                    }
                );
            };

            $scope.promptOptimizeIndices = function () {
                var indices = $scope.index_paginator.getResults().map(function (index) {
                    return index.name;
                });
                ConfirmDialogService.open(
                    'are you sure you want to optimize all selected indices?',
                    'Optimizing an index is a resource intensive operation and ' +
                    'should be done with caution. Usually, you will only want to ' +
                    'optimize an index when it will no longer receive updates.\n\n' +
                    'Selected indices:\n' + indices.join('\n'),
                    'Optimize',
                    function () {
                        $scope.optimizeIndex(indices.join(','));
                    }
                );
            };

            $scope.showIndexSettings = function (index) {
                ElasticService.getIndexMetadata(index,
                    function (metadata) {
                        for(key in metadata.settings.index){
                            if(key == 'creation_date'){
                                var dd = metadata.settings.index[key];
                                var realdd = new Date(parseInt(dd));
                                metadata.settings.index[key] = getDateString2(realdd);
                            }
                        }
                        $scope.displayInfo('settings for ' + index, metadata.settings);
                    },
                    function (error) {
                        AlertService.error('Error while loading index settings', error);
                    }
                );
            };

            $scope.showIndexMappings = function (index) {
                ElasticService.getIndexMetadata(index,
                    function (metadata) {
                        $scope.displayInfo('mappings for ' + index, metadata.mappings);
                    },
                    function (error) {
                        AlertService.error('Error while loading index mappings', error);
                    }
                );
            };

            $scope.deleteIndex = function(index) {
                ElasticService.deleteIndex(index,
                    function(response) {
                        ElasticService.refresh();
                    },
                    function(error) {
                        AlertService.error('Error while deleting index', error);
                    }
                );
            };

            $scope.promptDeleteIndex = function(index) {
                ConfirmDialogService.open(
                    '确定要删除索引 ' + index + '?',
                    '这个索引所有的数据将被删除,你确定吗?',
                    '删除',
                    function() {
                        $scope.deleteIndex(index);
                    }
                );
            };

            $scope.go2AddType = function (index) {
                AppState.setProperty("CreateType","selectedIndex",index);
                window.location.href = ("#!createType");
            };

            $scope.go2AddCols = function (index) {
                AppState.setProperty("ClusterOverview","selectedIndex",index);
                window.location.href = ("#!updateMapping");
            };

            $scope.go2AddIndex = function (index) {
                AppState.setProperty("CreateIndex","selectedIndex",index);
                window.location.href = ("#!createIndex");
            };

            $scope.reviseSettingA = function (index) {debugger;
                window.location.href = ("#!settingIndex?index="+index);
            };

            $scope.showNodeStats = function (nodeId) {
                ElasticService.getNodeStats(nodeId,
                    function (nodeStats) {
                        $scope.displayInfo('节点 ' + nodeStats.name, nodeStats.stats);
                    },
                    function (error) {
                        AlertService.error('Error while loading node stats', error);
                    }
                );
            };

            $scope.showShardStats = function (shard, index, nodeId) {
                ElasticService.getShardStats(shard, index, nodeId,
                    function (stats) {
                        $scope.displayInfo('stats for shard ' + shard, stats.stats);
                    },
                    function (error) {
                        AlertService.error('Error while loading shard stats', error);
                    }
                );
            };

            $scope.relocateShard = function (shard, index, fromNode, toNode) {
                ElasticService.relocateShard(shard, index, fromNode, toNode,
                    function (response) {
                        ElasticService.refresh();
                        $scope.relocatingShard = undefined;
                        AlertService.success('Relocation successfully executed', response);
                    },
                    function (error) {
                        $scope.relocatingShard = undefined;
                        AlertService.error('Error while moving shard', error);
                    }
                );
            };

            /**
             * Prompts confirmation dialog for relocating currently selected shard
             * to the given node
             * @param {string} toNode - target node id
             */
            $scope.promptRelocateShard = function (toNode) {
                var shard = $scope.relocatingShard.shard;
                var index = $scope.relocatingShard.index;
                var fromNode = $scope.relocatingShard.node;
                ConfirmDialogService.open(
                    'are you sure you want relocate the shard?',
                    'Once the relocation finishes, the cluster will try to ' +
                    'rebalance itself to an even state',
                    'Relocate',
                    function () {
                        $scope.relocateShard(shard, index, fromNode, toNode);
                    }
                );
            };

            /**
             * Evaluates if relocation target box should be displayed for the cell
             * corresponding to the given index and node
             *
             * @param {Index} index - index
             * @param {Node} node - target node
             * @returns {boolean}
             */
            $scope.canReceiveShard = function (index, node) {
                var shard = $scope.relocatingShard;
                if (shard && index) { // in case num indices < num columns
                    if (shard.node !== node.id && shard.index === index.name) {
                        var shards = $scope.cluster.getShards(node.id, index.name);
                        var sameShard = function (s) {
                            return s.shard === shard.shard;
                        };
                        if (shards.filter(sameShard).length === 0) {
                            return true;
                        }
                    }
                }
                return false;
            };

        }
    ]);

kopf.controller('ClusterStatsController', ['$scope', 'ElasticService',
        function ($scope, ElasticService) {

            $scope.cluster = undefined;

            $scope.$watch(
                function () {
                    return ElasticService.cluster;
                },
                function (newValue, oldValue) {
                    $scope.cluster = ElasticService.cluster;
                }
            );

        }
    ]);





kopf.controller('ConfirmDialogController', ['$scope', 'ConfirmDialogService',
    function ($scope, ConfirmDialogService) {

        $scope.dialog_service = ConfirmDialogService;

        $scope.close = function () {
            $scope.dialog_service.close();
        };

        $scope.confirm = function () {
            $scope.dialog_service.confirm();
        };

    }
]);




kopf.controller('IndexManageController', ['$scope', '$location',
    'ExternalSettingsService', 'ElasticService', 'AlertService',
    'AceEditorService','HostHistoryService','AppState','$http',
    function ($scope, $location, ExternalSettingsService, ElasticService,
              AlertService, AceEditorService,HostHistoryService,AppState,$http) {

        ExternalSettingsService.setTheme("dark");
        var TemplateBase = JSON.stringify(
            {
                settings: {},
                mappings: {},
                aliases: {}
            },
            undefined,
            2
        );
        $scope.alias="";
        $scope.tabs=[];
        $scope.selectedColArr = [];
        $scope.field_type = "example";
        $scope.ds_names = [{name:"test1"}];
        $scope.dsId = '';
        $scope.tabNameIndexManager = "";
        $scope.sqlColArr = [];
        $scope.editor = undefined;
        $scope.setMapEditor = undefined;
        $scope.paginator = new Paginator(1, 10, [],
            new wjlIndexTemplateFilter('', '',''));

        $scope.index = new IndexTemplate('', {});

        $scope.$watch('paginator', function(filter, previous) {
            $scope.index.name = $scope.paginator.filter.indexName;
            $scope.page = $scope.paginator.getPage();
        }, true);

        $scope.initEditorIndexManager = function() {
            if (!angular.isDefined($scope.editor)) {
                $scope.editor = AceEditorService.init('type-settings-editor');
                $scope.editor.setValue(TemplateBase);
            }
            if(!angular.isDefined($scope.setMapEditor)){
                $scope.setMapEditor = AceEditorService.init('type-mappings-editor');
                $scope.setMapEditor.setValue(TemplateBase);
            }
        };

        $scope.generate = function () {
            if ($scope.tabName == '') {
                AlertService.warn("选择表名");
                $('#tabNameIndexManager').focus();
                return;
            }
            if ($scope.selectedColArr.length == 0) {
                AlertService.warn("点击表格中的行选择列名,可多选");
                return;
            }
            $scope.setMapEditor.setValue('{"mappings":{"' + $scope.field_type + '":{"dynamic": "strict","properties": {' + $scope.selectedColArr.join(",") + '}}}}');
            $scope.setMapEditor.format();
        }

        $scope.clear = function () {
            $('#dbcol-gridIndexManager').jqxGrid('clearselection');
            $scope.selectedColArr = [];
        }

        $scope.generateSqlArea = function () {
            var all_ddls = $('#sqlAreaIndexManager').jqxTextArea('val');

            ElasticService.clusterRequest3("/eserknife/indexmsg/parseSql",
                'POST',{
                    sql:all_ddls,
                    clusterName:clusterName
                },
                function (res) {
                    if (res) {
                        for(var i = 0; i < res.cols.length ; i++){
                            var eachProp = $scope.buildProperties(res.tableName, res.cols[i].colname, res.cols[i].coltype);
                            $scope.sqlColArr.push(eachProp);
                        }
                        $scope.setMapEditor.setValue('{"mappings":{"' + $scope.field_type + '":{"dynamic": "strict","properties": {' + $scope.sqlColArr.join(",") + '}}}}');
                        $scope.setMapEditor.format();
                    }
                }
            );
        }

        $scope.clearSqlArea = function () {
            $scope.sqlColArr = [];
            $('#sqlAreaIndexManager').jqxTextArea('val', '');
            $scope.editor.setValue('{}');
        }

        $scope.sqlType2EsType = function (colType) {
            if (colType.toLowerCase().indexOf("bigint") != -1) {
                return "long";
            } else if (colType.toLowerCase().indexOf("tinyint") != -1 || colType.toLowerCase().indexOf("smallint") != -1) {
                return "integer";
            } else if (colType.toLowerCase().indexOf("int") != -1) {
                return "integer";
            } else if (colType.toLowerCase().indexOf("varchar") != -1 || colType.toLowerCase().indexOf("char") != -1 || colType.toLowerCase() == 'text') {
                return "string";
            } else if (colType.toLowerCase().indexOf("decimal") != -1 || colType.toLowerCase().indexOf("double") != -1) {
                return "double";
            } else if (colType.toLowerCase().indexOf("datetime") != -1 || colType.toLowerCase().indexOf("timestamp") != -1 || colType.toLowerCase().indexOf("date") != -1) {
                return "date";
            } else {
                return "不支持的类型";
            }
        }

        $scope.buildProperties = function (tabName, colName, colType) {
            var esType = $scope.sqlType2EsType(colType);
            var col = tabName + "|" + colName;
            if (esType == 'string') {
                return '"' + col + '": {"type": "string","index": "not_analyzed"}';
            } else if (esType == 'date') {
                return '"' + col + '": {"type": "date","format": "yyyy-MM-dd HH:mm:ss"}';
            } else if (esType == 'integer' || esType == 'long' || esType == 'double' || esType == 'byte') {
                return '"' + col + '": {"type": "' + esType + '"}';
            } else {
                return "不支持的类型";
            }
        }

        $scope.loadTemplates = function() {
            ElasticService.getIndexTemplates(
                function(templates) {
                    $scope.paginator.setCollection(templates);
                    $scope.page = $scope.paginator.getPage();
                },
                function(error) {
                    AlertService.error('Error while loading templates', error);
                }
            );
        };

        $scope.sqlAreaHandlerNew = function ($scope) {
            var quotes = [];
            quotes.push('alter table 表名 add column 列名 varchar(30);');
            quotes.push('alter table 表名 add column 列名 int(11);');

            $('#sqlAreaIndexManager').jqxTextArea({
                theme: "metrodark", height: 440, width: '100%', minLength: 1, source: quotes,
                placeHolder: '将 CREATE 或 ALTER SQL语句粘贴到这里'
            });

            $scope.showHelp = function () {
                $scope.showHelpText = !$scope.showHelpText;
            }
        };

        $scope.createIndex = function(id){
            var checkValue = $("#enableTools").val();
            var value = null;
            var mappings = null;
            var body = $scope.editor.getValue();
            var settings = JSON.parse(body).settings;
            var aliases = JSON.parse(body).aliases;
            var firstMappings = JSON.parse(body).mappings;
            var editorBody = $scope.setMapEditor.getValue();
            var secondMappings = JSON.parse(editorBody).mappings;
            if ($scope.index.name) {
                if(!isDefined($scope.setMapEditor.error) && checkValue){
                    if(JSON.stringify(secondMappings) && JSON.stringify(secondMappings) != "{}" && id == "buttonTwo") {
                        mappings = secondMappings;
                    }else{
                        mappings = firstMappings;
                    }
                    value = '{"settings":' + JSON.stringify(settings) + ',"mappings":' + JSON.stringify(mappings) + ',"aliases":' + JSON.stringify(aliases) + '}';
                    $scope.editor.setValue(value);
                }else{
                    if(JSON.stringify(secondMappings) && JSON.stringify(secondMappings) != "{}"){
                        mappings = secondMappings;
                    }else{
                        mappings = firstMappings;
                    }
                }
                if(!checkValue){
                    var shardNum =$('#shard_num_new').val();
                    var repliNum = $('#replica_num_new').val();
                    var aliasName = $('#alias').val();
                    if(!shardNum){
                        shardNum = 5;
                    }
                    if(!repliNum){
                        repliNum = 1;
                    }
                    if(aliasName && aliasName.length > 0){
                        aliasName = '{"'+aliasName+'":{}}';
                    }else{
                        aliasName="{}";
                    }
                    value = '{"settings":{"index":{"number_of_shards":"'+shardNum+'","number_of_replicas":"'+repliNum+'"}},"mappings":' + JSON.stringify(mappings) + ',"aliases":'+aliasName+'}';
                    $scope.editor.setValue(value);
                }
                if ($scope.editor.hasContent()) {
                    $scope.editor.format();
                    if (!isDefined($scope.editor.error)) {
                        $scope.index.body = $scope.editor.getValue();
                        ElasticService.createIndex($scope.index,
                            function(response) {
                                if(response.exist){
                                    AlertService.success(
                                        'Index has existed',
                                        response
                                    );
                                }else if(response.success){
                                    AlertService.success(
                                        'Index successfully created',
                                        response
                                    );
                                }else{
                                    AlertService.error('Error while creating index', response);
                                }
                            },
                            function(error) {
                                AlertService.error('Error while creating index', error);
                            }
                        );
                    }
                } else {
                    AlertService.error('Index body can\'t be empty');
                }
            } else {
                AlertService.error('Index name can\'t be empty');
            }
        };



        $scope.loadIndexTemplate = function(template) {
            var settings = JSON.stringify(template.body.settings);
            var mappings = JSON.stringify(template.body.mappings);
            var aliases = JSON.stringify(template.body.aliases);
            var body = '{"settings":'+settings+',"mappings":'+mappings+',"aliases":'+aliases+'}';
            $scope.editor.setValue(body);
            $scope.editor.format();
        };

        $('#jqxTabsIndexManager').on('selected', function (event)
        {
            var selectedTab = event.args.item;
            var body = $scope.editor.getValue();
            if(selectedTab == 1 ){
                $('#indexName').val($scope.index.name);
                var mappings = JSON.parse(body).mappings;
                var value = '{"mappings":'+JSON.stringify(mappings)+'}';
                $scope.setMapEditor.setValue(value);
                $scope.setMapEditor.format();
                $('#typeTools').jqxSplitter('expand');
            }
            if(selectedTab == 0 ){
                var editorBody = $scope.setMapEditor.getValue();
                var mappings = JSON.parse(editorBody).mappings;
                if(JSON.stringify(mappings) && JSON.stringify(mappings) != "{}"){
                    var settings = JSON.parse(body).settings;
                    var aliases = JSON.parse(body).aliases;
                    var value = '{"settings":'+JSON.stringify(settings)+',"mappings":'+JSON.stringify(mappings)+',"aliases":'+JSON.stringify(aliases)+'}';
                    $scope.editor.setValue(value);
                    $scope.editor.format();
                }
            }
        });

        $scope.goNext= function(){
            $('#jqxTabsIndexManager').jqxTabs('select', 1);
        };

        $scope.goBack= function(){
            $('#jqxTabsIndexManager').jqxTabs('select', 0);
        };


        $scope.loadDataSources = function(){
            ElasticService.clusterRequest2("/eserknife/indexmsg/getDataSource",
                'GET', "", {}, {},
                function (res) {
                    if (res) {
                        $scope.ds_names = res.result;
                    }
                }
            );
        }

        $scope.loadTabNames = function (ds) {
            ElasticService.clusterRequest2("/eserknife/indexmsg/getTabNamesByDs?dsId=" + $scope.dsId,
                'GET', "", {}, {},
                function (res) {
                    if (res) {
                        $scope.tabs = res.result;
                    }
                }
            );
        };

        $scope.initializeController = function() {
            $('#jqxTabsIndexManager').jqxTabs({ width: '100%', height:660, position: 'top',theme: "metrodark",toggleMode:'none'});
            $scope.loadTemplates();
            $scope.loadDataSources();
            $scope.initEditorIndexManager();
            radioHandlerNew();
            $scope.sqlAreaHandlerNew($scope);
            db_table_handlerNew($scope, $location, ElasticService);
            db_column_handlerNew($scope, $location);
            $scope.splitterHandlerNew();
            $("#indexTempleTool").hide();
            $("#rowTwo").hide();
            $("#firstEditor").hide();
        };

        $scope.splitterHandlerNew = function() {
            $("#enableTools").jqxCheckBox({checked: false, theme: 'metrodark'});
            $("#enableTools").on('change', function (event) {
                if (event.args.checked) {
                    $('.rowOne').hide();
                    $('#rowTwo').show();
                    var body = $scope.editor.getValue();
                    var editorBody = $scope.setMapEditor.getValue();
                    var mappings = JSON.parse(editorBody).mappings;
                    var settings = JSON.parse(body).settings;
                    var aliases = JSON.parse(body).aliases;
                    var value = '{"settings":'+JSON.stringify(settings)+',"mappings":'+JSON.stringify(mappings)+',"aliases":'+JSON.stringify(aliases)+'}';
                    $scope.editor.setValue(value);
                    $scope.editor.format();
                    $('#indexTempleTool').show();
                    $("#firstEditor").show();
                } else {
                    $('.rowOne').show();
                    $('#rowTwo').hide();
                    $('#indexTempleTool').hide();
                    $("#firstEditor").hide();
                }
            });
            $('#typeTools').jqxSplitter({
                width: '100%',
                height: 650,
                theme: 'metrodark',
                panels: [{size: '50%', collapsible: false}, {collapsed: true}]
            });
        };

    }
]);

function radioHandlerNew() {
    $('#typeTools').on('expanded',
        function (event) {
            $("#jqxRadioSqlIndexManager").jqxRadioButton({height: 25, theme: 'metrodark', checked: true});
            $("#jqxRadioDBIndexManager").jqxRadioButton({height: 25, theme: 'metrodark'});
            $("#jqxRadioSqlIndexManager").on('change', function (event) {
                if (event.args.checked) {
                    $("#sql_viewIndexManager").show();
                    $("#col_viewIndexManager").hide();
                }
            });

            $("#jqxRadioDBIndexManager").on('change', function (event) {
                if (event.args.checked) {
                    $("#col_viewIndexManager").show();
                    $("#sql_viewIndexManager").hide();
                }
            });
        }
    );
};

function db_table_handlerNew($scope, $location, ElasticService) {
    $scope.$watch('dsnameIndexManager', function (current, previous) {
        if (isDefined(current)) {
            $scope.dsId = current;
            $scope.loadTabNames(current);
        }
    });

    $scope.$watch('tabNameIndexManager', function (current, previous) {
        if (isDefined(current)) {
            $scope.source.url = 'http://' + $location.$$host + ':' + $location.$$port
                + '/eserknife/indexmsg/getColInfoByTabname?dsId='
                +$scope.dsId+'&tabName=' + $scope.tabNameIndexManager+'&clusterName='+clusterName;
            $('#dbcol-gridIndexManager').jqxGrid('clearselection');
            $('#dbcol-gridIndexManager').jqxGrid('updatebounddata');
        }
    });

}
function db_column_handlerNew($scope, $location) {
    $scope.dataurl = 'http://' + $location.$$host + ':' + $location.$$port
        + '/eserknife/indexmsg/getColInfoByTabname?dsId='+$scope.dsId+'&tabName=' + $scope.tabNameIndexManager+'&clusterName='+clusterName;

    $scope.source = {
        datatype: "json",
        datafields: [
            {name: 'db_colname', type: 'string'},
            {name: 'db_colname_def', type: 'string'}
        ],
        url: $scope.dataurl,
        beforeprocessing: function (data) {
            if (data != null && data.dbColNames != null) {
                $scope.source.records = data.dbColNames;
            }
        }
    };

    var dataAdapter = new $.jqx.dataAdapter($scope.source);

    $("#dbcol-gridIndexManager").jqxGrid({
        width: '100%',
        height: 250,
        source: dataAdapter,
        showfilterrow: true,
        filterable: true,
        theme: 'metrodark',
        selectionmode: "multiplerows",
        columns: [
            {
                text: '列名',
                datafield: 'db_colname',
                columntype: 'textbox',
                filtercondition: 'contains',
                width: '100%',
                cellsalign: 'left',
                align: 'left',
                cellclassname: 'enter'
            },
            {text: '定义', datafield: 'db_colname_def', hidden: true}
        ]
    });

    $('#dbcol-gridIndexManager').on('rowunselect', function (event) {
        var tabName = $scope.tabNameIndexManager;
        var colName = event.args.row.db_colname;
        var colType = event.args.row.db_colname_def;
        $scope.selectedColArr.remove($scope.buildProperties(tabName, colName, colType));
    });

    $('#dbcol-gridIndexManager').on('rowselect', function (event) {
        var tabName = $scope.tabNameIndexManager;
        var colName = event.args.row.db_colname;
        var colType = event.args.row.db_colname_def;
        $scope.selectedColArr.push($scope.buildProperties(tabName, colName, colType));
    });
}

/*
kopf.controller('IndexManageController', ['$scope', '$location',
    'ExternalSettingsService', 'ElasticService', 'AlertService',
    'AceEditorService','HostHistoryService','AppState','$http',
    function ($scope, $location, ExternalSettingsService, ElasticService,
              AlertService, AceEditorService,HostHistoryService,AppState,$http) {

        ExternalSettingsService.setTheme("dark");
        var TemplateBase = "POST XXX\r\t"+JSON.stringify(
            {
                settings: {
                    number_of_shards : 5,
                    number_of_replicas : 1
                }
            },
            undefined,
            2
        );
        $scope.alias="";
        $scope.tabs=[];
        $scope.selectedColArr = [];
        $scope.field_type = "example";
        $scope.ds_names = [{name:"test1"}];
        $scope.dsId = "";
        $scope.tabNameIndexManager = "";
        $scope.sqlColArr = [];
        $scope.setMapEditor = undefined;
        $scope.index = new IndexTemplate('', {});

        $scope.initEditorIndexManager = function() {
            if(!angular.isDefined($scope.setMapEditor)){
                $scope.setMapEditor = AceEditorService.init('type-map-editor','type_map_editor_actions','type_map_copy_as_curl');
                $scope.setMapEditor.setValue(TemplateBase);
            }
        };

        $scope.generate = function () {
            if ($scope.tabName == '') {
                AlertService.warn("选择表名");
                $('#tabNameIndexManager').focus();
                return;
            }
            if ($scope.selectedColArr.length == 0) {
                AlertService.warn("点击表格中的行选择列名,可多选");
                return;
            }
            var body = $scope.setMapEditor.getValue();
            var settings = JSON.parse(body).settings;
            var aliases = JSON.parse(body).aliases;
            if(aliases){
                $scope.setMapEditor.setValue('{"settings":' + JSON.stringify(settings) + ',"mappings":{"' + $scope.field_type + '":{"dynamic": "strict","properties": {' + $scope.selectedColArr.join(",") + '}}},"aliases":'+JSON.stringify(aliases)+'}');
            }else{
                $scope.setMapEditor.setValue('{"settings":' + JSON.stringify(settings) + ',"mappings":{"' + $scope.field_type + '":{"dynamic": "strict","properties": {' + $scope.selectedColArr.join(",") + '}}}}');
            }
            $scope.setMapEditor.format();
        }

        $scope.clear = function () {
            $('#dbcol-gridIndexManager').jqxGrid('clearselection');
            $scope.selectedColArr = [];
        }

        $scope.generateSqlArea = function () {
            var all_ddls = $('#sqlAreaIndexManager').jqxTextArea('val');

            ElasticService.clusterRequest3("/eserknife/indexmsg/parseSql",
                'POST',{
                    sql:all_ddls,
                    clusterName:clusterName
                },
                function (res) {
                    if (res) {
                        for(var i = 0; i < res.cols.length ; i++){
                            var eachProp = $scope.buildProperties(res.tableName, res.cols[i].colname, res.cols[i].coltype);
                            $scope.sqlColArr.push(eachProp);
                        }
                        var body = $scope.setMapEditor.getValue();
                        var settings = JSON.parse(body).settings;
                        var aliases = JSON.parse(body).aliases;
                        if(aliases){
                            $scope.setMapEditor.setValue('{"settings":' + JSON.stringify(settings) + ',"mappings":{"' + $scope.field_type + '":{"dynamic": "strict","properties": {' + $scope.sqlColArr.join(",") + '}}},"aliases":'+JSON.stringify(aliases)+'}');
                        }else{
                            $scope.setMapEditor.setValue('{"settings":' + JSON.stringify(settings) + ',"mappings":{"' + $scope.field_type + '":{"dynamic": "strict","properties": {' + $scope.sqlColArr.join(",") + '}}}}');
                        }
                        $scope.setMapEditor.format();
                    }
                }
            );
        }

        $scope.clearSqlArea = function () {
            $scope.sqlColArr = [];
            $('#sqlAreaIndexManager').jqxTextArea('val', '');
        }

        $scope.sqlType2EsType = function (colType) {
            if (colType.toLowerCase().indexOf("bigint") != -1) {
                return "long";
            } else if (colType.toLowerCase().indexOf("keyword") != -1) {
                return "keyword";
            } else if (colType.toLowerCase().indexOf("tinyint") != -1 || colType.toLowerCase().indexOf("smallint") != -1) {
                return "integer";
            } else if (colType.toLowerCase().indexOf("int") != -1) {
                return "integer";
            } else if (colType.toLowerCase().indexOf("varchar") != -1 || colType.toLowerCase().indexOf("char") != -1 || colType.toLowerCase() == 'text') {
                return "string";
            } else if (colType.toLowerCase().indexOf("decimal") != -1 || colType.toLowerCase().indexOf("double") != -1) {
                return "double";
            } else if (colType.toLowerCase().indexOf("datetime") != -1 || colType.toLowerCase().indexOf("timestamp") != -1 || colType.toLowerCase().indexOf("date") != -1) {
                return "date";
            } else {
                return "不支持的类型";
            }
        }

        $scope.buildProperties = function (tabName, colName, colType) {
            var esType = $scope.sqlType2EsType(colType);
            var col = tabName + "|" + colName;
            if (esType == 'string') {
                return '"' + col + '": {"type": "string","index": "not_analyzed"}';
            } else if(esType =='keyword'){
                return '"' + col + '": {"type": "keyword"}';
            }else if (esType == 'date') {
                return '"' + col + '": {"type": "date","format": "yyyy-MM-dd HH:mm:ss"}';
            } else if (esType == 'integer' || esType == 'long' || esType == 'double' || esType == 'byte') {
                return '"' + col + '": {"type": "' + esType + '"}';
            } else {
                return "不支持的类型";
            }
        }


        $scope.sqlAreaHandlerNew = function ($scope) {
            var quotes = [];
            quotes.push('alter table 表名 add column 列名 varchar(30);');
            quotes.push('alter table 表名 add column 列名 int(11);');

            $('#sqlAreaIndexManager').jqxTextArea({
                theme: "metrodark", height: 467, width: '100%', minLength: 1, source: quotes,
                placeHolder: '将 CREATE 或 ALTER SQL语句粘贴到这里'
            });

            $scope.showHelp = function () {
                $scope.showHelpText = !$scope.showHelpText;
            }
        };

        // $scope.$watch('alias', function (current, previous) {
        //     var body = $scope.setMapEditor.getValue();
        //     var settings = JSON.parse(body).settings;
        //     var mappings = JSON.parse(body).mappings;
        //     if (isDefined(current)) {
        //         if ('' == current) {
        //             $scope.setMapEditor.setValue('{"settings":' + JSON.stringify(settings) + ',"mappings":'+JSON.stringify(mappings)+'}');
        //             $scope.setMapEditor.format();
        //             return;
        //         }
        //         $scope.setMapEditor.setValue('{"settings":' + JSON.stringify(settings) + ',"mappings":'+JSON.stringify(mappings)+',"aliases":{"'+current+'":{}}}');
        //         $scope.setMapEditor.format();
        //     }
        // });

        $scope.format = function(){alert(1);
            $scope.setMapEditor.format();
        };

        $scope.createIndex = function(){
            $scope.setMapEditor.getValue(function(data){

                alert(data);
            });




            // if ($scope.index.name) {
            //     if ($scope.setMapEditor.hasContent()) {
            //         $scope.setMapEditor.format();
            //         if (!isDefined($scope.setMapEditor.error)) {
            //             $scope.index.body = $scope.setMapEditor.getValue();
            //             ElasticService.createIndex($scope.index,
            //                 function(response) {
            //                     if(response.exist){
            //                         AlertService.success(
            //                             'Index has existed',
            //                             response
            //                         );
            //                     }else if(response.success){
            //                         AlertService.success(
            //                             'Index successfully created',
            //                             response
            //                         );
            //                     }else{
            //                         AlertService.error('Error while creating index', response);
            //                     }
            //                 },
            //                 function(error) {
            //                     AlertService.error('Error while creating index', error);
            //                 }
            //             );
            //         }
            //     } else {
            //         AlertService.error('Index body can\'t be empty');
            //     }
            // } else {
            //     AlertService.error('Index name can\'t be empty');
            // }
        };


        $scope.loadDataSources = function(){
            ElasticService.clusterRequest2("/eserknife/indexmsg/getDataSource",
                'GET', "", {}, {},
                function (res) {
                    if (res) {
                        $scope.ds_names = res.result;
                    }
                }
            );
        }

        $scope.loadTabNames = function (dsId) {
            ElasticService.clusterRequest2("/eserknife/indexmsg/getTabNamesByDs?dsId=" + dsId,
                'GET', "", {}, {},
                function (res) {
                    if (res) {
                        $scope.tabs = res.result;
                    }
                }
            );
        };

        $scope.initializeController = function() {
            $scope.initEditorIndexManager();
            $scope.loadDataSources();
            radioHandlerNew();
            $scope.sqlAreaHandlerNew($scope);
            db_table_handlerNew($scope, $location, ElasticService);
            db_column_handlerNew($scope, $location);
            $scope.splitterHandlerNew();
            $("#indexTempleTool").hide();
            $("#rowTwo").hide();
            $("#firstEditor").hide();
        };

        $scope.splitterHandlerNew = function() {
            $('#typeTools').jqxSplitter({
                width: '100%',
                height: 710,
                theme: 'metrodark',
                panels: [{size: '50%', collapsible: false}, {collapsed: false}]
            });
        };

    }
]);

function radioHandlerNew() {
    $("#jqxRadioSqlIndexManager").jqxRadioButton({height: 25, theme: 'metrodark', checked: true});
    $("#jqxRadioDBIndexManager").jqxRadioButton({height: 25, theme: 'metrodark'});
    $("#jqxRadioSqlIndexManager").on('change', function (event) {
        if (event.args.checked) {
            $("#sql_viewIndexManager").show();
            $("#col_viewIndexManager").hide();
        }
    });

    $("#jqxRadioDBIndexManager").on('change', function (event) {
        if (event.args.checked) {
            $("#col_viewIndexManager").show();
            $("#sql_viewIndexManager").hide();
        }
    });
};

function db_table_handlerNew($scope, $location, ElasticService) {

    $scope.$watch('dsnameIndexManager', function (current, previous) {
        if (isDefined(current)) {
            $scope.dsId = current;
            $scope.loadTabNames(current);
        }
    });

    $scope.$watch('tabNameIndexManager', function (current, previous) {
        if (isDefined(current)) {
            $scope.source.url = 'http://' + $location.$$host + ':' + $location.$$port
                + '/eserknife/indexmsg/getColInfoByTabname?dsId='+$scope.dsId+'&tabName=' + $scope.tabNameIndexManager+'&clusterName='+clusterName;
            $('#dbcol-gridIndexManager').jqxGrid('clearselection');
            $('#dbcol-gridIndexManager').jqxGrid('updatebounddata');
        }
    });

}

function db_column_handlerNew($scope, $location) {
    $scope.dataurl = 'http://' + $location.$$host + ':' + $location.$$port
        + '/eserknife/indexmsg/getColInfoByTabname?dsId='+$scope.dsId+'&tabName=' + $scope.tabNameIndexManager+'&clusterName='+clusterName;

    $scope.source = {
        datatype: "json",
        datafields: [
            {name: 'db_colname', type: 'string'},
            {name: 'db_colname_def', type: 'string'}
        ],
        url: $scope.dataurl,
        beforeprocessing: function (data) {
            if (data != null && data.dbColNames != null) {
                $scope.source.records = data.dbColNames;
            }
        }
    };

    var dataAdapter = new $.jqx.dataAdapter($scope.source);

    $("#dbcol-gridIndexManager").jqxGrid({
        width: '100%',
        height: 395,
        source: dataAdapter,
        showfilterrow: true,
        filterable: true,
        theme: 'metrodark',
        selectionmode: "multiplerows",
        columns: [
            {
                text: '列名',
                datafield: 'db_colname',
                columntype: 'textbox',
                filtercondition: 'contains',
                width: '100%',
                cellsalign: 'left',
                align: 'left',
                cellclassname: 'enter'
            },
            {text: '定义', datafield: 'db_colname_def', hidden: true}
        ]
    });

    $('#dbcol-gridIndexManager').on('rowunselect', function (event) {
        var tabName = $scope.tabNameIndexManager;
        var colName = event.args.row.db_colname;
        var colType = event.args.row.db_colname_def;
        $scope.selectedColArr.remove($scope.buildProperties(tabName, colName, colType));
    });

    $('#dbcol-gridIndexManager').on('rowselect', function (event) {
        var tabName = $scope.tabNameIndexManager;
        var colName = event.args.row.db_colname;
        var colType = event.args.row.db_colname_def;
        $scope.selectedColArr.push($scope.buildProperties(tabName, colName, colType));
    });
}
*/

kopf.controller('CreateTypeController', ['$scope', '$location','$timeout',
    'ExternalSettingsService', 'ElasticService', 'AlertService',
    'AceEditorService','ConfirmDialogService','ConfirmDialogService2','AppState',
    function ($scope, $location,$timeout, ExternalSettingsService, ElasticService,
              AlertService, AceEditorService,ConfirmDialogService,ConfirmDialogService2,AppState) {

        ExternalSettingsService.setTheme("dark");
        $scope.indexNames = [];
        $scope.field_types = "";
        $scope.ds_names = [{name:"test1"}];
        $scope.dsId ='';
        $scope.tabs=[];
        $scope.tabName = "";
        $scope.opsjs = '';
        $scope.selectedColArr = [];
        $scope.selectDemoArr = [];
        $scope.sqlColArr = [];
        $scope.showHelpText = true;
        $scope.field_type = "";

        setTimeout(function(){
            initHandle_type($scope, ElasticService,AppState);
            splitterHandler_type();
            loadDataSources($scope,ElasticService);
            indexComboboxHandler_type($scope, $timeout);
            editorHandler_type($scope, AceEditorService);
            typeHandler_type($scope, ElasticService, AlertService);
            radioHandler_type();
            sqlAreaHandler_type($scope);
            db_table_handler_type($scope, $location, ElasticService);
            db_column_handler_type($scope, $location);
            demo_handler_type($scope, $location,AlertService);
            submitActionHandler_type($scope, ElasticService, AlertService, ConfirmDialogService2);
            toolActionHandler_type($scope, AlertService,ElasticService);
        },10);
    }]
);
function initHandle_type($scope, ElasticService,AppState) {
    $scope.$watch(
        function () {
            return ElasticService.cluster;
        },
        function (filter, previous) {
            if (!ElasticService.cluster) return;
            if ($scope.indexNames.length == 0) {
                ElasticService.getIndices().forEach(function (eachIndex) {
                    $scope.indexNames.push(eachIndex.name);
                    $("#type-index-combobox").jqxComboBox('addItem', eachIndex.name);
                });
                return;
            }
        },
        true
    );

    //处理参数传递
    var selectedIndex = AppState.getProperty("CreateType","selectedIndex","");
    $scope.field_index = selectedIndex != "" ? selectedIndex : "";
    AppState.setProperty("CreateType","selectedIndex","");
}
function indexComboboxHandler_type($scope, $timeout) {
    $("#type-index-combobox").jqxComboBox({
        height:30,
        width:'100%',
        theme: 'metrodark',
        searchMode: 'contains',
        autoComplete: true,
        placeHolder:'选择索引',
        source: $scope.indexNames
    });

    $timeout(function () {
        if ($scope.field_index && $scope.field_index != "") {
            $("#type-index-combobox").val($scope.field_index);
        }
    },1000);

}
function typeHandler_type($scope, ElasticService, AlertService) {

    $scope.$watch('field_type', function(current, previous) {
        if (isDefined(current)) {

            var content = $.trim($scope.editor.getValue());
            //如果是初始值,直接赋值
            if ( '' == current) {
                //return;
            }
            var mappingJson = "";
            var propJson = getJsonNode($.parseJSON(content),"properties");

            if("" == propJson){
                mappingJson = '{"'+current+'":{"dynamic": "strict","properties": {}}}';
            }else{  //已经有值,部分更新json
                mappingJson = '{"'+current+'":{"dynamic": "strict","properties": '+JSON.stringify(propJson)+'}}';
            }

            $scope.editor.setValue(mappingJson);
            $scope.editor.format();
        }
    });
}
function  loadDataSources($scope,ElasticService){
    ElasticService.clusterRequest2("/eserknife/indexmsg/getDataSource",
        'GET', "", {}, {},
        function (res) {
            if (res) {
                $scope.ds_names = res.result;
            }
        }
    );
}
function db_table_handler_type($scope, $location, ElasticService) {
    $scope.$watch('dsname', function (current, previous) {
        if (isDefined(current)) {
            $scope.dsId = current;
            $scope.loadTabNames(current);
        }
    });

    $scope.$watch('tabName', function (current, previous) {
        if (isDefined(current)) {
            $scope.source.url = 'http://' + $location.$$host + ':' + $location.$$port
                + '/eserknife/indexmsg/getColInfoByTabname?dsId='+$scope.dsId+'&tabName=' + $scope.tabName+'&clusterName='+clusterName;
            $('#dbcol-grid_from_type').jqxGrid('clearselection');
            $('#dbcol-grid_from_type').jqxGrid('updatebounddata');
        }
    });



    $scope.loadTabNames = function (ds) {

        ElasticService.clusterRequest2("/eserknife/indexmsg/getTabNamesByDs?dsId=" + $scope.dsId,
            'GET', "", {}, {},
            function (res) {
                if (res) {
                    $scope.tabs = res.result;
                }
            }
        );
    };
}

function demo_handler_type($scope, $location,AlertService){
    $scope.demoClickCount = 0;
    $scope.generateDemo = function () {
        if ($scope.selectDemoArr.length == 0) {
            AlertService.warn("点击表格中的行选择,可多选");
            return;
        }
        var body = JSON.parse($scope.editor.getValue());
        var subBody = body[$scope.field_type];
        var properties = subBody['properties'];
        var newData =JSON.parse('{'+$scope.selectDemoArr.join(",")+'}');
        var data = $.extend(newData,properties);
        $scope.editor.setValue('{"' + $scope.field_type + '":{"dynamic": "strict","properties": ' + JSON.stringify(data) + '}}');
        $scope.editor.format();
        $('#demo-grid_from_type').jqxGrid('clearselection');
        $scope.selectedDemoArr = [];
        $scope.demoClickCount++;
    }
    $scope.clearDemo = function () {
        $('#demo-grid_from_type').jqxGrid('clearselection');
        $scope.selectedDemoArr = [];
    };
    $scope.demoUrl = 'http://' + $location.$$host + ':' + $location.$$port
        + '/eserknife/indexmsg/getDemoData';
    $scope.demoSource = {
        datatype: "json",
        url: $scope.demoUrl,
        beforeprocessing: function (data) {
            if (data != null && data.dbColNames != null) {
                $scope.demoSource.records = data.dbColNames;
            }
        }
    };
    var dataAdapter = new $.jqx.dataAdapter($scope.demoSource);
    $("#demo-grid_from_type").jqxGrid({
        width: '100%',
        height: 250,
        source: dataAdapter,
        showfilterrow: false,
        filterable: false,
        theme: 'metrodark',
        selectionmode: "multiplerows",
        columns: [
            {text: '类型', datafield: 'demo_type'},
            {text: '描述', datafield: 'demo_remark'}
        ]
    });

    $('#demo-grid_from_type').on('rowunselect', function (event) {
        var type = event.args.row.demo_type;
        if(type){
            $scope.selectDemoArr.remove($scope.newBuildProperties( $scope.demoClickCount,type));
        }
    });

    $('#demo-grid_from_type').on('rowselect', function (event) {
        var type = event.args.row.demo_type;
        if(type){
            $scope.selectDemoArr.push($scope.newBuildProperties( $scope.demoClickCount,type));
        }
    });

}
function db_column_handler_type($scope, $location) {
    $scope.dataurl = 'http://' + $location.$$host + ':' + $location.$$port
        + '/eserknife/indexmsg/getColInfoByTabname?dsId='+$scope.dsId+'&tabName=' + $scope.tabName+'&clusterName='+clusterName;

    $scope.source = {
        datatype: "json",
        datafields: [
            {name: 'db_colname', type: 'string'},
            {name: 'db_colname_def', type: 'string'}
        ],
        url: $scope.dataurl,
        beforeprocessing: function (data) {
            if (data != null && data.dbColNames != null) {
                $scope.source.records = data.dbColNames;
            }
        }
    };

    var dataAdapter = new $.jqx.dataAdapter($scope.source);

    $("#dbcol-grid_from_type").jqxGrid({
        width: '100%',
        height: 250,
        source: dataAdapter,
        showfilterrow: true,
        filterable: true,
        theme: 'metrodark',
        selectionmode: "multiplerows",
        columns: [
            {
                text: '列名',
                datafield: 'db_colname',
                columntype: 'textbox',
                filtercondition: 'contains',
                width: '100%',
                cellsalign: 'left',
                align: 'left',
                cellclassname: 'enter'
            },
            {text: '定义', datafield: 'db_colname_def', hidden: true}
        ]
    });

    $('#dbcol-grid_from_type').on('rowunselect', function (event) {
        var tabName = $scope.tabName;
        var colName = event.args.row.db_colname;
        var colType = event.args.row.db_colname_def;
        $scope.selectedColArr.remove($scope.buildProperties(tabName, colName, colType));
    });

    $('#dbcol-grid_from_type').on('rowselect', function (event) {
        var tabName = $scope.tabName;
        var colName = event.args.row.db_colname;
        var colType = event.args.row.db_colname_def;
        $scope.selectedColArr.push($scope.buildProperties(tabName, colName, colType));
    });
}
function toolActionHandler_type($scope, AlertService,ElasticService) {
    $scope.generate = function () {
        if ($scope.tabName == '') {
            AlertService.warn("选择表名");
            $('#tabName').focus();
            return;
        }
        if ($scope.selectedColArr.length == 0) {
            AlertService.warn("点击表格中的行选择列名,可多选");
            return;
        }
        $scope.editor.setValue('{"' + $scope.field_type + '":{"dynamic": "strict","properties": {' + $scope.selectedColArr.join(",") + '}}}');
        $scope.editor.format();
    }

    $scope.clear = function () {
        $('#dbcol-grid_from_type').jqxGrid('clearselection');
        $scope.selectedColArr = [];
    }

    $scope.generateSqlArea = function () {
        var all_ddls = $('#sqlArea_from_type').jqxTextArea('val');

        ElasticService.clusterRequest3("/eserknife/indexmsg/parseSql",
            'POST',{
                sql:all_ddls,
                clusterName:clusterName
            },
            function (res) {
                if (res) {
                    for(var i = 0; i < res.cols.length ; i++){
                        var eachProp = $scope.buildProperties(res.tableName, res.cols[i].colname, res.cols[i].coltype);
                        $scope.sqlColArr.push(eachProp);
                    }
                    $scope.editor.setValue('{"' + $scope.field_type + '":{"dynamic": "strict","properties": {' + $scope.sqlColArr.join(",") + '}}}');
                    $scope.editor.format();
                }
            }
        );
    }

    $scope.clearSqlArea = function () {
        $scope.sqlColArr = [];
        $('#sqlArea_from_type').jqxTextArea('val', '');
        $scope.editor.setValue('{}');
    }

    $scope.buildProperties = function (tabName, colName, colType) {
        var esType = $scope.sqlType2EsType(colType);
        var col = tabName + "|" + colName;
        if (esType == 'string') {
            return '"' + col + '": {"type": "string","index": "not_analyzed"}';
        } else if (esType == 'date') {
            return '"' + col + '": {"type": "date","format": "yyyy-MM-dd HH:mm:ss"}';
        } else if (esType == 'integer' || esType == 'long' || esType == 'double' || esType == 'byte') {
            return '"' + col + '": {"type": "' + esType + '"}';
        } else {
            return "不支持的类型";
        }
    }

    $scope.newBuildProperties = function (count,colType) {
        var esType = colType;
        var col = '字段名称'+count+'|'+colType;
        if (esType == 'string') {
            return '"' + col + '": {"type": "string","index": "not_analyzed"}';
        } else if (esType == 'date') {
            return '"' + col + '": {"type": "date","format": "yyyy-MM-dd HH:mm:ss"}';
        } else if (esType == 'integer' || esType == 'long' || esType == 'double' || esType == 'byte') {
            return '"' + col + '": {"type": "' + esType + '"}';
        } else {
            return "不支持的类型";
        }
    }

    $scope.sqlType2EsType = function (colType) {
        if (colType.toLowerCase().indexOf("bigint") != -1) {
            return "long";
        } else if (colType.toLowerCase().indexOf("tinyint") != -1 || colType.toLowerCase().indexOf("smallint") != -1) {
            return "integer";
        } else if (colType.toLowerCase().indexOf("int") != -1) {
            return "integer";
        } else if (colType.toLowerCase().indexOf("varchar") != -1 || colType.toLowerCase().indexOf("char") != -1 || colType.toLowerCase() == 'text') {
            return "string";
        } else if (colType.toLowerCase().indexOf("decimal") != -1 || colType.toLowerCase().indexOf("double") != -1) {
            return "double";
        } else if (colType.toLowerCase().indexOf("datetime") != -1 || colType.toLowerCase().indexOf("timestamp") != -1 || colType.toLowerCase().indexOf("date") != -1) {
            return "date";
        } else {
            return "不支持的类型";
        }
    }
}
function submitActionHandler_type($scope, ElasticService, AlertService, ConfirmDialogService2) {
    $scope.updateIndex = function () {
        var params = {
            clusterName:clusterName,
            indexName:$("#type-index-combobox").val(),
            typeName:$scope.field_type,
            newColsJson:$scope.submitJsonBody
        };
        ElasticService.clusterRequest2("/eserknife/indexmsg/addNewType",
            'POST',
            "",
            params,
            {},
            function(res){
                if(!res){
                    AlertService.error("服务端响应对象为空!");
                    return;
                }
                if(res.code){
                    AlertService.success(res.sucMsg);
                    $scope.field_type = '';
                    $("#type-index-combobox").val('');
                    $scope.editor.setValue('{}');

                    //工具区域
                    $scope.clear();
                    $scope.clearSqlArea();
                    $scope.tabName = '';
                    $('#dbcol-grid_from_type').jqxGrid('clear');

                }else{
                    AlertService.error(res.errMsg);
                }
            },
            function(res){
                AlertService.error(res);
            }
        );
    }
    var reg = new RegExp("^[a-zA-Z]([0-9a-zA-Z_]+)$");
    $scope.promptUpdateIndex = function () {

        if($.trim($scope.field_type).length == 0) {
            AlertService.warn('类型名不能为空');
            $("#field_type").focus();
            return;
        }

        if(!reg.test($.trim($scope.field_type))) {
            AlertService.warn("类型名要求字母开头,可以包含字母下划线数字");
            $("#field_type").focus();
            return;
        }

        if($.trim($("#type-index-combobox").val()).length == 0) {
            AlertService.warn('索引名不能为空');
            $("#type-index-combobox").jqxComboBox('focus');
            return;
        }

        var content = $.trim($scope.editor.getValue());
        if(content.length == 0 || content.length == '{}') {
            AlertService.warn('请填入字段定义json串');
            return;
        }

        try{
            var json4Content = $.parseJSON(content);
            //debugger;

            if(!json4Content[$scope.field_type].properties){
                AlertService.warn('字段定义必须包含properties属性');
                return;
            }
            if($.isEmptyObject(json4Content[$scope.field_type].properties)){
                AlertService.warn('字段定义properties属性不能空,可以直接编辑或者通过辅助区自动产生');
                return;
            }
            $scope.submitJsonBody = JSON.stringify(json4Content[$scope.field_type])

        }catch (e){
            AlertService.warn('字段定义必须是合法的json串');
            return;
        }

        $("#submitA_from_type").click();

        ConfirmDialogService2.open(
            '修改索引',
            '确认在索引<span style="font-size: 20px;color: #be386a"> ' + $("#type-index-combobox").val()
            + '</span> 里添加一个新类型,取名 <span style="font-size: 20px;color: #B73766">' + $scope.field_type + ' </span>吗?',
            '修改',
            function () {
                $scope.updateIndex();
            }
        );
    };
}
function sqlAreaHandler_type($scope) {
    var quotes = [];
    quotes.push('alter table 表名 add column 列名 varchar(30);');
    quotes.push('alter table 表名 add column 列名 int(11);');

    $('#sqlArea_from_type').jqxTextArea({
        theme: "metrodark", height: 460, width: '100%', minLength: 1, source: quotes,
        placeHolder: '将 CREATE 或 ALTER SQL语句粘贴到这里'
    });

    $scope.showHelp = function () {
        $scope.showHelpText = !$scope.showHelpText;
    }
}
function editorHandler_type($scope, AceEditorService) {
    if (!isDefined($scope.editor)) {
        $scope.editor = AceEditorService.init('type-settings-editor');
        $scope.editor.setValue('{}');
    }
}
function radioHandler_type() {
    $('#mainSplitter_from_type').on('expanded',
        function (event) {
            $("#jqxRadioSql_from_type").jqxRadioButton({height: 25, theme: 'metrodark', checked: true});
            $("#jqxRadioDB_from_type").jqxRadioButton({height: 25, theme: 'metrodark'});
            $("#jqxRadioDemo_from_type").jqxRadioButton({height: 25, theme: 'metrodark'});

            $("#jqxRadioSql_from_type").on('change', function (event) {
                if (event.args.checked) {
                    $("#sql_view_from_type").show();
                    $("#col_view_from_type").hide();
                    $("#demo_view_from_type").hide();
                }
            });

            $("#jqxRadioDB_from_type").on('change', function (event) {
                if (event.args.checked) {
                    $("#col_view_from_type").show();
                    $("#sql_view_from_type").hide();
                    $("#demo_view_from_type").hide();
                }
            });

            $("#jqxRadioDemo_from_type").on('change', function (event) {
                if (event.args.checked) {
                    $("#demo_view_from_type").show();
                    $("#col_view_from_type").hide();
                    $("#sql_view_from_type").hide();
                }
            });
        }
    );
}
function splitterHandler_type() {
    $("#enablehover_from_type").jqxCheckBox({checked: false, theme: 'metrodark'});
    $("#enablehover_from_type").on('change', function (event) {
        if (event.args.checked) {
            $('#mainSplitter_from_type').jqxSplitter('expand');
        } else {
            $('#mainSplitter_from_type').jqxSplitter('collapse');
        }
    });
    $('#mainSplitter_from_type').jqxSplitter({
        width: '100%',
        height: 650,
        theme: 'metrodark',
        panels: [{size: 750, collapsible: false}, {collapsed: true}]
    });
}
function getJsonNode(jsonContent,nodeName){
    var xContent = jsonContent;
    for(each in xContent) {
        if(nodeName == each) {
            return xContent[nodeName];
        }

        if ($.type(xContent[each]) === "object") {
            return getJsonNode(xContent[each],nodeName);
        }
    }
    return "";
}





kopf.controller('DebugController', ['$scope', 'DebugService',
    function($scope, DebugService) {

        $scope.messages = [];

        $scope.visible = false;

        $scope.$watch(
            function() {
                return $scope.visible ? DebugService.getUpdatedAt() : 0;
            },
            function(newValue, oldValue) {
                $scope.messages = $scope.visible ? DebugService.getMessages() : [];
            }
        );

    }

]);

kopf.controller('GlobalController', ['$scope', '$location', '$sce', '$window',
    'AlertService', 'ExternalSettingsService','AppState','ElasticService','PageService',
    function ($scope, $location, $sce, $window, AlertService,
              ExternalSettingsService,AppState,ElasticService,PageService) {

        $scope.version = '2.0.1';
        ElasticService.connect();
        ElasticService.refresh();
        $scope.modal = new ModalControls();

        $scope.getTheme = function () {
            return ExternalSettingsService.getTheme();
        };

        $scope.readParameter = function (name) {
            var regExp = new RegExp('[\\?&]' + name + '=([^&#]*)');
            var results = regExp.exec($window.location.href);
            return isDefined(results) ? results[1] : null;
        };

        $scope.displayInfo = function (title, info) {
            $scope.modal.title = title;
            $scope.modal.info = $sce.trustAsHtml(JSONTree.create(info));
            $('#modal_info').modal({show: true, backdrop: true});
        };

        $scope.displayInfo2 = function (title, info) {
            //$scope.modal.title = title;
            //$scope.modal.info = "<h1>hello</h1>";
            $('#modal_info').modal({show: true, backdrop: true});
        };

    }
]);
kopf.controller('ExportIndexController', ['$scope', '$location','$timeout',
    'ExternalSettingsService', 'ElasticService', 'AlertService',
    'AceEditorService','ConfirmDialogService','AppState',
    function ($scope, $location,$timeout, ExternalSettingsService, ElasticService,
              AlertService, AceEditorService,ConfirmDialogService,AppState) {

        ExternalSettingsService.setTheme("dark");
        $scope.indexNames = []; //现有索引名列表
        $scope.selectedndexNames = ""; //当前选中的索引名

        //$timeout(function () {
        //    if ($scope.field_index && $scope.field_index != "") {
        //        $("#export-index-combobox").jqxComboBox('selectItem', $scope.field_index);
        //    }
        //},100);

        /**
         * 初始化索引combobox的数据
         */
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
                        $("#export-index-combobox").jqxComboBox('addItem', eachIndex.name );
                    });
                    return;
                }
            },
            true
        );

        $("#export-index-combobox").jqxComboBox({
            height:30,
            width:'100%',
            theme: 'metrodark',
            searchMode: 'contains',
            autoComplete: true,
            placeHolder:'选择目标索引',
            source: $scope.indexNames
        });

        $("#export-index-combobox").on('change', function (event) {
            if (event.args) {
                var item = event.args.item;
                var index = item.value;
                if (isDefined(index)) {
                    ElasticService.getIndexMetadata(index,
                        function (metadata) {
                            console.log(metadata.getTypes());
                            console.log(metadata.getFields());
                            $scope.rebuildTree(metadata);
                            //debugger;
                        },
                        function (error) {
                            AlertService.error('Error while loading index mappings', error);
                        }
                    );
                }
            }
        });

        $scope.rebuildTree = function (metadata){
            var tree = [];
            metadata.getTypes().forEach(function (typename) {
                var typeRow = { "eleId": typename+'_meta0', "eleName": typename, "colType": "", "parentId": 0 };
                tree.push(typeRow);

                var props = metadata.mappings[typename].properties;
                for(each in props) {
                    //console.log(each+","+props[each]["type"]);

                    var parentId = typename+'_meta0';
                    var colRow = { "eleId": each, "eleName": each, "colType": props[each]["type"], "parentId":parentId};
                    tree.push(colRow);
                }
            });
            console.log(tree);
            return tree;
        }



        var metadata = [
            { "eleId": 'all_order_meta0', "eleName": "all_order", "colType": "", "parentId": 0 },
            { "eleId": 'passage_name', "eleName": "passage_name", "colType": "string", "parentId": 'all_order_meta0'},
            { "eleId": 'gender', "eleName": "gender", "colType": "date", "parentId": 'all_order_meta0'},
            { "eleId": 'birthday', "eleName": "birthday", "colType": "long", "parentId": 'all_order_meta0'}
        ];

        var source =
        {
            dataType: "json",
            dataFields: [
                { name: 'eleId', type: 'string' },
                { name: 'eleName', type: 'string' },
                { name: 'colType', type: 'string' },
                { name: 'parentId', type: 'string' }
            ],
            hierarchy:
            {
                keyDataField: { name: 'eleId' },
                parentDataField: { name: 'parentId' }
            },
            id: 'eleId',
            localData: metadata
        };

        var dataAdapter = new $.jqx.dataAdapter(source);

        $("#index_define_table").jqxTreeGrid(
        {
            width: '100%',
            height:400,
            checkboxes: true,
            hierarchicalCheckboxes: true,
            source: dataAdapter,
            columnsResize: true,
            sortable: true,
            theme: 'metrodark',
            ready: function () {
                $("#index_define_table").jqxTreeGrid('expandRow', 'all_order_meta0');
                $("#index_define_table").jqxTreeGrid('checkRow', 'all_order_meta0');
            },
            columns: [
                { text: '名称', dataField: 'eleName', width: '70%' },
                { text: '类型', dataField: 'colType', width: '30%' }
            ]
        });

        $('#index_define_table').on('rowCheck',function (event){
            // event args.
            var args = event.args;
            // row data.
            var row = args.row;
            // row key.
            var key = args.key;
            console.log(row);
        });

        $('#index_define_table').on('rowUncheck',function (event){
            // event args.
            var args = event.args;
            // row data.
            var row = args.row;
            // row key.
            var key = args.key;
            console.log(row);
        });




        $scope.exportIndex = function (){
        }

        $scope.initializeController = function() {

        }
    }]
);





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





kopf.controller('ManagerIndexController', ['$scope', '$location',
    'ExternalSettingsService', 'ElasticService', 'AlertService',
    'AceEditorService','ConfirmDialogService2','HostHistoryService','AppState','$http',
    function ($scope, $location, ExternalSettingsService, ElasticService,
              AlertService, AceEditorService,ConfirmDialogService2,HostHistoryService,AppState,$http) {

        ExternalSettingsService.setTheme("dark");
        $scope.selectJqxTabFlag = 0; // 0 创建，1 修改，2 删除，3 重建
        $scope.sqlColArr = [];
        $scope.selectedColArr = [];
        $scope.selectedColArrUpdate=[];
        $scope.sqlColArrUpadate = [];
        $scope.indexManagerAllNames = [];
        $scope.toolsMappings = [];
        $scope.managerEditor=undefined;
        $scope.re_field_types ="";
        $scope.re_field_type = "";
        $scope.re_field_new_index="";
        $scope.dsUpdateId="";
        $scope.shardCount = 5;
        $scope.replicasCount = 1;
        $scope.typeName = "";
        $scope.aliasName = "";
        $scope.indexName = "";
        $scope.updateTabName="";
        $scope.updateTypeName="";
        $scope.checkFlag = false;
        $scope.indexInitLoadFlag = false;

        $scope.initManagerIndex = function() {
            if(!angular.isDefined($scope.managerEditor)){
                $scope.managerEditor = AceEditorService.init('manager-editor','type_map_editor_actions','type_map_copy_as_curl');
            }
        };

        $scope.generate = function (strFlag) {
            if(strFlag && strFlag =="create"){
                if ($scope.tabName == '') {
                    AlertService.warn("选择表名");
                    $('#tabNameIndexManager').focus();
                    return;
                }
                if ($scope.selectedColArr.length == 0) {
                    AlertService.warn("点击表格中的行选择列名,可多选");
                    return;
                }
                initCreateData($scope);
            }else{
                initUpdateData($scope);
            }
        }

        $scope.clear = function (strFlag) {
            if(strFlag && strFlag =="create"){
                $('#dbcol-gridIndexManager').jqxGrid('clearselection');
                $scope.selectedColArr = [];
                initCreateData($scope);
            }else{
                $('#update_dbcol-gridIndexManager').jqxGrid('clearselection');
                $scope.selectedColArrUpdate = [];
                initUpdateData($scope);
            }
        }

        $scope.generateSqlArea = function (strFlag) {
            var all_ddls = "";
            if(strFlag && strFlag =="create"){
                all_ddls = $('#sqlAreaIndexManager').jqxTextArea('val');
            }else if(strFlag && strFlag =="update"){
                all_ddls = $('#update_sqlAreaIndexManager').jqxTextArea('val');
            }else{
                return;
            }

            ElasticService.clusterRequest3("/eserknife/indexmsg/parseSql",
                'POST',{
                    sql:all_ddls,
                    clusterName:clusterName
                },
                function (res) {
                    if (res && res.cols) {
                        for(var i = 0; i < res.cols.length ; i++){
                            var eachProp = $scope.buildProperties(res.tableName, res.cols[i].colname, res.cols[i].coltype);
                            if(strFlag && strFlag =="create"){
                                $scope.sqlColArr.push(eachProp);
                            }else{
                                $scope.sqlColArrUpadate.push(eachProp);
                            }
                        }
                        if(strFlag && strFlag =="create"){
                            initCreateData($scope);
                        }else{
                            initUpdateData($scope);
                        }
                    }
                }
            );
        }

        $scope.clearSqlArea = function (strFlag) {
            if(strFlag && strFlag=="create"){
                $scope.sqlColArr = [];
                $('#sqlAreaIndexManager').jqxTextArea('val', '');
                initCreateData($scope);
            }else{
                $scope.sqlColArrUpadate = [];
                $('#update_sqlAreaIndexManager').jqxTextArea('val', '');
                initUpdateData($scope);
            }
        }

        $scope.sqlType2EsType = function (colType) {
            if (colType.toLowerCase().indexOf("bigint") != -1) {
                return "long";
            } else if (colType.toLowerCase().indexOf("keyword") != -1) {
                return "keyword";
            } else if (colType.toLowerCase().indexOf("tinyint") != -1 || colType.toLowerCase().indexOf("smallint") != -1) {
                return "integer";
            } else if (colType.toLowerCase().indexOf("int") != -1) {
                return "integer";
            } else if (colType.toLowerCase().indexOf("varchar") != -1 || colType.toLowerCase().indexOf("char") != -1 || colType.toLowerCase() == 'text') {
                return "string";
            } else if (colType.toLowerCase().indexOf("decimal") != -1 || colType.toLowerCase().indexOf("double") != -1) {
                return "double";
            } else if (colType.toLowerCase().indexOf("datetime") != -1 || colType.toLowerCase().indexOf("timestamp") != -1 || colType.toLowerCase().indexOf("date") != -1) {
                return "date";
            } else {
                return "不支持的类型";
            }
        }

        $scope.buildProperties = function (tabName, colName, colType) {
            var esType = $scope.sqlType2EsType(colType);
            var col = tabName + "|" + colName;
            if (esType == 'string') {
                return '"' + col + '": {"type": "string","index": "not_analyzed"}';
            } else if(esType =='keyword'){
                return '"' + col + '": {"type": "keyword"}';
            }else if (esType == 'date') {
                return '"' + col + '": {"type": "date","format": "yyyy-MM-dd HH:mm:ss"}';
            } else if (esType == 'integer' || esType == 'long' || esType == 'double' || esType == 'byte') {
                return '"' + col + '": {"type": "' + esType + '"}';
            } else {
                return "不支持的类型";
            }
        }


        $scope.sqlAreaHandlerNew = function ($scope) {
            var quotes = [];
            quotes.push('alter table 表名 add column 列名 varchar(30);');
            quotes.push('alter table 表名 add column 列名 int(11);');

            $('#sqlAreaIndexManager').jqxTextArea({
                theme: "metrodark", height: 200, width: '100%', minLength: 1, source: quotes,
                placeHolder: '将 CREATE 或 ALTER SQL语句粘贴到这里'
            });
            $('#update_sqlAreaIndexManager').jqxTextArea({
                theme: "metrodark", height: 200, width: '100%', minLength: 1, source: quotes,
                placeHolder: '将 CREATE 或 ALTER SQL语句粘贴到这里'
            });

            $scope.showHelp = function () {
                $scope.showHelpText = !$scope.showHelpText;
            }
        };

        $scope.format = function(){
            $scope.managerEditor.format();
        };




        $scope.createIndexManager = function(){
            ConfirmDialogService2.open(
                '操作',
                '确认按照当前条件 <span style="font-size: 20px;color: #fb4e0b">执行</span> 对索引的操作吗?',
                '执行',
                function () {
                    $scope.execute();
                },
                function(){
                    $("#confirm_dialog2").hide();
                }
            );
        };

        $scope.execute = function(){
            $scope.managerEditor.getValue(function(data) {
                var method = data[0].method;
                var url = data[0].url;
                var body = data[0].data;
                if(body){
                    if (!isDefined($scope.managerEditor.error)) {
                        var params={"clusterName":clusterName,"data":body,"url":url,"method":method};
                        ElasticService.clusterRequest2("/eserknife/indexmsg/indexManager" +
                            "", 'POST', {}, params, {},
                            function (res) {
                                $("#confirm_dialog2").hide();
                                if($scope.selectJqxTabFlag ===3){
                                    if(res.total > 0 ){
                                        AlertService.success("重建索引成功！");
                                    }else{
                                        AlertService.warn("原索引字段无数据，重建无意义！");
                                    }
                                }else {
                                    if (res && res.acknowledged) {
                                        $scope.re_field_types ="";
                                        $scope.re_field_type = "";
                                        $scope.re_field_new_index="";
                                        $scope.dsUpdateId="";
                                        $scope.shardCount = 5;
                                        $scope.replicasCount = 1;
                                        $scope.typeName = "";
                                        $scope.aliasName = "";
                                        $scope.indexName = "";
                                        $scope.updateTabName="";
                                        $scope.updateTypeName="";
                                        $("#update-manager-index-com-box").jqxComboBox('clear');
                                        $("#del-manager-index-com-box").jqxComboBox('clear');
                                        $("#re-manager-index-com-box").jqxComboBox('clear');
                                        $scope.indexManagerAllNames=[];
                                        AlertService.success('操作成功',res);
                                    }else{
                                        AlertService.error('操作失败',res);
                                    }
                                }
                            });
                    }
                }
            });
        }

        $scope.loadDataSources = function(){
            ElasticService.clusterRequest2("/eserknife/indexmsg/getDataSource",
                'GET', "", {}, {},
                function (res) {
                    if (res) {
                        $scope.ds_names = res.result;
                        $scope.update_ds_names = res.result;
                    }
                }
            );
        }

        $scope.loadTabNames = function (dsId) {
            ElasticService.clusterRequest2("/eserknife/indexmsg/getTabNamesByDs?dsId=" + dsId,
                'GET', "", {}, {},
                function (res) {
                    if (res) {
                        $scope.tabs = res.result;
                        $scope.updateTabs = res.result;
                    }
                }
            );
        };

        $scope.splitterHandlerNew = function() {
            $('#typeTools').jqxSplitter({
                width: '100%',
                height: 700,
                theme: 'metrodark',
                panels: [{size: '50%', collapsible: false}, {collapsed: false}]
            });
        };


        $scope.getIndexDatas = function() {
            $scope.$watch(
                function () {
                    return ElasticService.cluster;
                },
                function (filter, previous) {
                    if (!ElasticService.cluster) return;
                    if ($scope.indexManagerAllNames.length == 0) {
                        var indexNames = ElasticService.getAllIndicesNames();
                        $scope.indexManagerAllNames= indexNames;
                        $("#update-manager-index-com-box").jqxComboBox({source:indexNames});
                        $("#del-manager-index-com-box").jqxComboBox({source:indexNames});
                        $("#re-manager-index-com-box").jqxComboBox({source:indexNames});
                        return;
                   }
                },
                true
            );
            $("#update-manager-index-com-box").jqxComboBox({
                height:30,
                width:300,
                theme: 'metrodark',
                searchMode: 'contains',
                autoComplete: true,
                placeHolder:'选择索引',
                source: $scope.indexManagerAllNames
            });

            $("#del-manager-index-com-box").jqxComboBox({
                height:30,
                width:300,
                theme: 'metrodark',
                searchMode: 'contains',
                autoComplete: true,
                placeHolder:'选择索引',
                source: $scope.indexManagerAllNames
            });

            $("#re-manager-index-com-box").jqxComboBox({
                height:30,
                width:300,
                theme: 'metrodark',
                searchMode: 'contains',
                autoComplete: true,
                placeHolder:'选择索引',
                source: $scope.indexManagerAllNames
            });

            /**
             * 索引选择框发生变化,级联更新数据
             */
            $("#re-manager-index-com-box").on('change', function (event) {
                if (event.args) {
                    var item = event.args.item;
                    var value = item.value;
                    if (isDefined(value)) {
                        $scope.loadReManagerIndexTypes(value);
                        $scope.re_field_manager_index = value;
                    }
                }
            });

            $("#update-manager-index-com-box").on('change', function (event) {
                if (event.args) {
                    var item = event.args.item;
                    var value = item.value;
                    if (isDefined(value)) {
                        $scope.loadReManagerIndexUpdateTypes(value);
                        $scope.update_field_index = value;
                    }
                }
            });

            $("#newTypeCheck").on('change', function (event) {
                if ($("#newTypeCheck").is(':checked')) {
                    $("#update_field_type").hide();
                    $("#updateTypeName").show();
                    $scope.checkFlag = true;
                    initUpdateData($scope);
                }else{
                    $("#updateTypeName").hide();
                    $("#update_field_type").show();
                    $scope.checkFlag = false;
                    initUpdateData($scope);
                }
            });

        };

        $('#indexManagerJqxTabs').on('selected', function (event){
            $scope.selectJqxTabFlag = event.args.item;
            if( $scope.selectJqxTabFlag === 1){
                $("#jqxRadioUpdateToolsManager").jqxRadioButton({height: 25, theme: 'metrodark', checked: true});
                $("#jqxRadioUpdateSqlIndexManager").jqxRadioButton({height: 25, theme: 'metrodark'});
                $("#jqxRadioUpdateDBIndexManager").jqxRadioButton({height: 25, theme: 'metrodark'});
                loadUpdateEvent($scope);
                initUpdateData($scope);
            }else if( $scope.selectJqxTabFlag === 0){
                $("#jqxRadioToolsManager").jqxRadioButton({height: 25, theme: 'metrodark', checked: true});
                $("#jqxRadioSqlIndexManager").jqxRadioButton({height: 25, theme: 'metrodark'});
                $("#jqxRadioDBIndexManager").jqxRadioButton({height: 25, theme: 'metrodark'});
                loadCreateEvent($scope);
                initCreateData($scope);
            }else if($scope.selectJqxTabFlag === 2){
                initDelData($scope);
            }else if($scope.selectJqxTabFlag === 3){
                initReData($scope);
            }
        });


        $('#del-manager-index-com-box').on('change',function(event){
            var args = event.args;
            $scope.delValue= args.item.value;
            initDelData($scope);
        });

        $scope.loadReManagerIndexTypes = function (index) {
            $scope.re_field_type = '';
            if (notEmpty(index)) {
                ElasticService.getIndexMetadata(index,
                    function (metadata) {
                        $scope.re_field_index_metadata = metadata;
                        $scope.re_field_types = metadata.getTypes();
                        $scope.re_field_type = $scope.re_field_types[0];
                        initReData($scope);
                    },
                    function (error) {
                        $scope.re_field_manager_index = '';
                        AlertService.error('Error loading index types', error);
                    }
                );
            }
        };

        $scope.loadReManagerIndexUpdateTypes = function (index) {
            $scope.update_field_type = '';
            if (notEmpty(index)) {
                ElasticService.getIndexMetadata(index,
                    function (metadata) {
                        $scope.update_field_index_metadata = metadata;
                        $scope.update_field_types = metadata.getTypes();
                        $scope.update_field_type = $scope.update_field_types[0];
                        initUpdateData($scope);
                    },
                    function (error) {
                        $scope.update_field_index = '';
                        AlertService.error('Error loading index types', error);
                    }
                );
            }
        };


        $scope.$watch('re_field_type', function (current, previous) {
            if (isDefined(current)) {
                if ('' == current) {
                    return;
                }
                initReData($scope);
            }
        });

        $scope.$watch('re_field_new_index', function (current, previous) {
            if (isDefined(current)) {
                if ('' == current) {
                    return;
                }
                initReData($scope);
            }
        });


        $scope.$watch('indexName', function (current, previous) {
            if (isDefined(current)) {
                initCreateData($scope);
            }
        });

        $scope.$watch('typeName', function (current, previous) {
            if (isDefined(current)) {
                initCreateData($scope);
            }
        });
        $scope.$watch('shardCount', function (current, previous) {
            if (isDefined(current)) {
                initCreateData($scope);
            }
        });
        $scope.$watch('replicasCount', function (current, previous) {
            if (isDefined(current)) {
                initCreateData($scope);
            }
        });
        $scope.$watch('aliasName', function (current, previous) {
            if (isDefined(current)) {
                initCreateData($scope);
            }
        });

        $scope.$watch('update_field_type', function (current, previous) {
            if (isDefined(current)) {
                if(!$scope.checkFlag){
                    initUpdateData($scope);
                }
            }
        });

        $scope.$watch('updateTypeName', function (current, previous) {
            if (isDefined(current)) {
                if($scope.checkFlag){
                    initUpdateData($scope);
                }
            }
        });

        $scope.initializeController = function() {
            $('#indexManagerJqxTabs').jqxTabs({ height: '100%', position: 'top',theme: "metrodark"});
            setTimeout(function(){
                $scope.getIndexDatas();
            },10);
            $scope.initManagerIndex();
            $scope.loadDataSources();
            radioHandlerNew($scope);
            $scope.sqlAreaHandlerNew($scope);
            db_table_handlerNew($scope, $location);
            db_column_handlerNew($scope, $location);
            db_table_handler_update($scope, $location);
            db_column_handler_update($scope, $location);
            $scope.splitterHandlerNew();
        };
    }
]);

function radioHandlerNew($scope) {
    $("#jqxRadioSqlIndexManager").jqxRadioButton({height: 25, theme: 'metrodark'});
    $("#jqxRadioDBIndexManager").jqxRadioButton({height: 25, theme: 'metrodark'});
    $("#jqxRadioToolsManager").jqxRadioButton({height: 25, theme: 'metrodark', checked: true});
    loadCreateEvent($scope);
};

function loadCreateEvent($scope){
    $("#jqxRadioToolsManager").on('change', function (event) {
        if (event.args.checked) {
            $("#tools_index_manager").show();
            $("#sql_viewIndexManager").hide();
            $("#col_viewIndexManager").hide();
            $scope.radioFlag = 0;
        }
    });
    $("#jqxRadioSqlIndexManager").on('change', function (event) {
        if (event.args.checked) {
            $("#tools_index_manager").hide();
            $("#sql_viewIndexManager").show();
            $("#col_viewIndexManager").hide();
            $scope.radioFlag = 1;
        }
    });
    $("#jqxRadioDBIndexManager").on('change', function (event) {
        if (event.args.checked) {
            $("#tools_index_manager").hide();
            $("#col_viewIndexManager").show();
            $("#sql_viewIndexManager").hide();
            $scope.radioFlag = 2;
        }
    });
    $("#noAnalysisTools").on('click', function (event) {
        addMapping($scope,"noAnalysis");
    });
    $("#analysisTools").on('click', function (event) {
        addMapping($scope,"analysis");
    });
    $("#dateTools").on('click', function (event) {
        addMapping($scope,"date");
    });
    $("#intTools").on('click', function (event) {
        addMapping($scope,"int");
    });
    $("#longTools").on('click', function (event) {
        addMapping($scope,"long");
    });
}

function loadUpdateEvent($scope){
    $("#jqxRadioUpdateToolsManager").on('change', function (event) {
        if (event.args.checked) {
            $("#update_tools_index_manager").show();
            $("#update_sql_viewIndexManager").hide();
            $("#update_col_viewIndexManager").hide();
            $scope.radioUpdateFlag = 1;
        }
    });

    $("#jqxRadioUpdateSqlIndexManager").on('change', function (event) {
        if (event.args.checked) {
            $("#update_tools_index_manager").hide();
            $("#update_sql_viewIndexManager").show();
            $("#update_col_viewIndexManager").hide();
            $scope.radioUpdateFlag = 1;
        }
    });

    $("#jqxRadioUpdateDBIndexManager").on('change', function (event) {
        if (event.args.checked) {
            $("#update_tools_index_manager").hide();
            $("#update_col_viewIndexManager").show();
            $("#update_sql_viewIndexManager").hide()
            $scope.radioUpdateFlag = 2;
        }
    });

    $("#noAnalysisUpdateTools").on('click', function (event) {
        addMapping($scope,"noAnalysis");
    });
    $("#analysisUpdateTools").on('click', function (event) {
        addMapping($scope,"analysis");
    });
    $("#dateUpdateTools").on('click', function (event) {
        addMapping($scope,"date");
    });
    $("#intUpdateTools").on('click', function (event) {
        addMapping($scope,"int");
    });
    $("#longUpdateTools").on('click', function (event) {
        addMapping($scope,"long");
    });

}

function db_table_handlerNew($scope, $location) {
    $scope.$watch('dsnameIndexManager', function (current, previous) {
        if (isDefined(current)) {
            $scope.dsId = current;
            $scope.loadTabNames(current);
        }
    });
    $scope.$watch('tabNameIndexManager', function (current, previous) {
        if (isDefined(current)) {
            $scope.source.url = 'http://' + $location.$$host + ':' + $location.$$port
                + '/eserknife/indexmsg/getColInfoByTabname?dsId='+$scope.dsId+'&tabName=' + $scope.tabNameIndexManager+'&clusterName='+clusterName;
            $('#dbcol-gridIndexManager').jqxGrid('clearselection');
            $('#dbcol-gridIndexManager').jqxGrid('updatebounddata');
        }
    });
}

function db_table_handler_update($scope, $location) {
    $scope.$watch('updateDsnameIndexManager', function (current, previous) {
        if (isDefined(current)) {
            $scope.dsUpdateId = current;
            $scope.loadTabNames(current);
        }
    });
    $scope.$watch('updateTabName', function (current, previous) {
        if (isDefined(current)) {
            $scope.updateSource.url = 'http://' + $location.$$host + ':' + $location.$$port
                + '/eserknife/indexmsg/getColInfoByTabname?dsId='+$scope.dsUpdateId+'&tabName='
                + $scope.updateTabName+'&clusterName='+clusterName;

            $('#update_dbcol-gridIndexManager').jqxGrid('clearselection');
            $('#update_dbcol-gridIndexManager').jqxGrid('updatebounddata');
        }
    });

}


function db_column_handler_update($scope, $location) {
    $scope.updateUrl = 'http://' + $location.$$host + ':' + $location.$$port
        + '/eserknife/indexmsg/getColInfoByTabname?dsId='+(isDefined($scope.dsUpdateId)?$scope.dsUpdateId:"")+
        '&tabName=' + (isDefined($scope.updateTabName)?$scope.updateTabName:"")+'&clusterName='+clusterName;
    $scope.updateSource = {
        datatype: "json",
        datafields: [
            {name: 'db_colname', type: 'string'},
            {name: 'db_colname_def', type: 'string'}
        ],
        url: $scope.updateUrl,
        beforeprocessing: function (data) {
            if (data != null && data.dbColNames != null) {
                $scope.updateSource.records = data.dbColNames;
            }
        }
    };
    var dataAdapter = new $.jqx.dataAdapter($scope.updateSource);
    $("#update_dbcol-gridIndexManager").jqxGrid({
        width: '100%',
        height: 360,
        source: dataAdapter,
        showfilterrow: true,
        filterable: true,
        theme: 'metrodark',
        selectionmode: "multiplerows",
        columns: [
            {
                text: '列名',
                datafield: 'db_colname',
                columntype: 'textbox',
                filtercondition: 'contains',
                width: '100%',
                cellsalign: 'left',
                align: 'left',
                cellclassname: 'enter'
            },
            {text: '定义', datafield: 'db_colname_def', hidden: true}
        ]
    });


    $('#update_dbcol-gridIndexManager').on('rowunselect', function (event) {
        var tabName = $scope.updateTabName;
        var colName = event.args.row.db_colname;
        var colType = event.args.row.db_colname_def;
        $scope.selectedColArrUpdate.remove($scope.buildProperties(tabName, colName, colType));
    });

    $('#update_dbcol-gridIndexManager').on('rowselect', function (event) {
        var tabName = $scope.updateTabName;
        var colName = event.args.row.db_colname;
        var colType = event.args.row.db_colname_def;
        $scope.selectedColArrUpdate.push($scope.buildProperties(tabName, colName, colType));
    });
}

function db_column_handlerNew($scope, $location) {
    $scope.dataurl = 'http://' + $location.$$host + ':' + $location.$$port
        + '/eserknife/indexmsg/getColInfoByTabname?dsId='+(isDefined($scope.dsId)?$scope.dsId:"")+
    '&tabName=' + (isDefined($scope.tabNameIndexManager)?$scope.tabNameIndexManager:"")+'&clusterName='+clusterName;
    $scope.source = {
        datatype: "json",
        datafields: [
            {name: 'db_colname', type: 'string'},
            {name: 'db_colname_def', type: 'string'}
        ],
        url: $scope.dataurl,
        beforeprocessing: function (data) {
            if (data != null && data.dbColNames != null) {
                $scope.source.records = data.dbColNames;
            }
        }
    };

    var dataAdapter = new $.jqx.dataAdapter($scope.source);

    $("#dbcol-gridIndexManager").jqxGrid({
        width: '100%',
        height: 250,
        source: dataAdapter,
        showfilterrow: true,
        filterable: true,
        theme: 'metrodark',
        selectionmode: "multiplerows",
        columns: [
            {
                text: '列名',
                datafield: 'db_colname',
                columntype: 'textbox',
                filtercondition: 'contains',
                width: '100%',
                cellsalign: 'left',
                align: 'left',
                cellclassname: 'enter'
            },
            {text: '定义', datafield: 'db_colname_def', hidden: true}
        ]
    });

    $('#dbcol-gridIndexManager').on('rowunselect', function (event) {
        var tabName = $scope.tabNameIndexManager;
        var colName = event.args.row.db_colname;
        var colType = event.args.row.db_colname_def;
        $scope.selectedColArr.remove($scope.buildProperties(tabName, colName, colType));
    });

    $('#dbcol-gridIndexManager').on('rowselect', function (event) {
        var tabName = $scope.tabNameIndexManager;
        var colName = event.args.row.db_colname;
        var colType = event.args.row.db_colname_def;
        $scope.selectedColArr.push($scope.buildProperties(tabName, colName, colType));
    });

}

function initReData($scope){
    var str = 'POST /_reindex\n' +
        '{\n' +
        '  "source":  {\n' +
        '     "index": "' +  (isDefined($scope.re_field_manager_index)?$scope.re_field_manager_index:"") + '",\n' +
        '     "type": "' +   (isDefined($scope.re_field_type)?$scope.re_field_type:"") + '"\n' +
        '    },\n' +
        '  "dest": {\n' +
        '     "index": "' + (isDefined($scope.re_field_new_index)?$scope.re_field_new_index:"") +'"\n' +
        '    }\n' +
        '}';
    $scope.managerEditor.setValue(str);
}

function initCreateData($scope){
    var mappingDatas =  $scope.sqlColArr.join(",")
    if($scope.radioFlag === 2){
        mappingDatas=  $scope.selectedColArr.join(",")
    }
    var str = '{\n' +
        '  "settings":  {\n' +
        '     "number_of_shards": "' +  $scope.shardCount + '",\n' +
        '     "number_of_replicas": "' +   $scope.replicasCount + '"\n' +
        '    }';
    if($scope.typeName || mappingDatas){
        str +=',\n' +
            '  "mappings": {\n' +
            '     "'+$scope.typeName+'": {\n' +
            '           "properties" : {\n'+
                            mappingDatas +
            '            }\n' +
            '        }\n' +
            '    }';
    }
    if($scope.aliasName){
        str +=',\n' +
            '  "aliases": {\n' +
            '     "'+$scope.aliasName+'": {\n' +
            '        }\n' +
            '    }';
    }
    str +='\n}';
    $scope.managerEditor.setValue('PUT '+$scope.indexName+'\n' +formatJson(str));
}

function initUpdateData($scope){
    var mappingDatas =  $scope.sqlColArrUpadate.join(",")
    if($scope.radioUpdateFlag === 2){
        mappingDatas=  $scope.selectedColArrUpdate.join(",")
    }
    var str='{\n' +
        '      "properties" : {\n'+
                    mappingDatas +
        '      }\n' +
        '}';
    var typeName =(isDefined($scope.update_field_type)?$scope.update_field_type:"");
    if($scope.checkFlag){
        typeName =  $scope.updateTypeName;
    }
    $scope.managerEditor.setValue('PUT '+(isDefined($scope.update_field_index)?$scope.update_field_index:"")
            +'/_mapping/'+typeName+'\n' +formatJson(str));
}

function initDelData($scope){
    $scope.managerEditor.setValue('DELETE /'+(isDefined($scope.delValue)?$scope.delValue:""));
}

function getItemOtherName(str){
    var s=null;
    if(str == "noAnalysis"){
        s= "NOANALYSISCOL";
    }else if(str=="analysis"){
        s= "ANALYSISCOL";
    }else if(str=="date"){
        s= "DATECOL";
    }else if(str=="int"){
        s= "INTCOL";
    }else if(str=="long"){
        s= "LONGCOL";
    }
    return s;
}

function addMapping($scope,str){
    $scope.managerEditor.getValue(function(data) {
        var jsonStr;
        var body = data[0].data;
        var properties;
        var mm =[];
        var flag = false;
        if(body){
            if($scope.selectJqxTabFlag ===0){//新建
                var mappings =  JSON.parse(body).mappings;
                if(mappings){
                    for(var item in mappings){
                        properties = mappings[item].properties;
                        break;
                    }
                }
            }else if($scope.selectJqxTabFlag ===1) {//修改
                properties = JSON.parse(body).properties;
            }
            if(properties){
                for(var item in properties){
                    mm.push('"'+item+'":'+ JSON.stringify(properties[item]));
                    if(getItemOtherName(str) == item){
                        flag = true;
                    }
                }
            }
        }
        if(!flag){
            if(str == "noAnalysis"){
                if(versionFirst >=5){
                    jsonStr= '"NOANALYSISCOL": {"type": "text","index": "not_analyzed"}';
                }else{
                    jsonStr= '"NOANALYSISCOL": {"type": "string","index": "not_analyzed"}';
                }
            }else if(str=="analysis"){
                if(versionFirst >=5){
                    jsonStr= '"ANALYSISCOL": {"type": "text","index": "analyzed"}';
                }else{
                    jsonStr= '"ANALYSISCOL": {"type": "string","index": "analyzed"}';
                }
            }else if(str=="date"){
                jsonStr= '"DATECOL": {"type": "date","format": "yyyy-MM-dd HH:mm:ss"}';
            }else if(str=="int"){
                jsonStr= '"INTCOL": {"type": "integer"}';
            }else if(str=="long"){
                jsonStr= '"LONGCOL": {"type": "long"}';
            }
            mm.push(jsonStr);
        }else{
            return;
        }
        if($scope.selectJqxTabFlag ===0){//新建
            upDateCreateData($scope,mm.join(","));
        }else if($scope.selectJqxTabFlag ===1){//修改
            reLoadUpdateData($scope,mm.join(","));
        }
    });

}


function upDateCreateData($scope,mappingDatas){
    var str = '{\n' +
        '  "settings":  {\n' +
        '     "number_of_shards": "' +  $scope.shardCount + '",\n' +
        '     "number_of_replicas": "' +   $scope.replicasCount + '"\n' +
        '    }';
    if($scope.typeName || mappingDatas){
        str +=',\n' +
            '  "mappings": {\n' +
            '     "'+$scope.typeName+'": {\n' +
            '           "properties" : {\n'+
            mappingDatas +
            '            }\n' +
            '        }\n' +
            '    }';
    }
    if($scope.aliasName){
        str +=',\n' +
            '  "aliases": {\n' +
            '     "'+$scope.aliasName+'": {\n' +
            '        }\n' +
            '    }';
    }
    str +='\n}';
    $scope.managerEditor.setValue('PUT '+$scope.indexName+'\n' +formatJson(str));
}

function reLoadUpdateData($scope,mappingDatas){
    var str='{\n' +
        '      "properties" : {\n'+
                    mappingDatas +
        '      }\n' +
        '}';
    var typeName =(isDefined($scope.update_field_type)?$scope.update_field_type:"");
    if($scope.checkFlag){
        typeName =  $scope.updateTypeName;
    }
    $scope.managerEditor.setValue(' PUT '+(isDefined($scope.update_field_index)?$scope.update_field_index:"")
        +'/_mapping/'+typeName+'\n' +formatJson(str));
}

kopf.controller('SettingIndexController', ['$scope', '$location',
    'ExternalSettingsService', 'ElasticService', 'AlertService',
    'AceEditorService','HostHistoryService','AppState','$http',
    function ($scope, $location, ExternalSettingsService, ElasticService,
              AlertService,AceEditorService, HostHistoryService,AppState,$http) {

        ExternalSettingsService.setTheme("dark");

        $scope.index = null;
        $scope.settings = null;
        $scope.editable_settings = null;

        $scope.saveReplicas = function (){
            var newSettings = {};
            newSettings['index.number_of_replicas'] = $scope.editable_settings['index.number_of_replicas'];
            $scope.saveSetting(newSettings,$scope.index,'[number_of_replicas]');
        }

        $scope.saverRefreshInterval = function (){
            var newSettings = {};
            newSettings['index.refresh_interval'] = $scope.editable_settings['index.refresh_interval'];
            $scope.saveSetting(newSettings,$scope.$scope.index,'[index.refresh_interval]');
        }

        $scope.saveAllocation = function (){
            var newSettings = {};
            var toggled = $("#disable_allocationBtn").jqxToggleButton('toggled');
            newSettings['index.routing.allocation.disable_allocation'] = !toggled;
            $scope.saveSetting(newSettings,$scope.index,'[index.routing.allocation.disable_allocation]');
        }

        $scope.saveSetting = function saveSetting(newSettings,index,settingName) {
            var settingStr = btoa(JSON.stringify(newSettings)); // angular post nested json 报403,先对其base64处理
            ElasticService.clusterRequest3("/eserknife/indexmsg/settingIndex",
                'POST',
                {
                    settings: settingStr,
                    indexName: index,
                    clusterName: clusterName
                },
                function (res) {
                    AlertService.success(res+settingName);
                }
            );
        }

        function applySetting2Page() {
            var disable_allocation_state = $scope.editable_settings['index.routing.allocation.disable_allocation'];
            if (!!!disable_allocation_state || disable_allocation_state == 'false') {//没配置 或者 false,表示允许分配
                $('#disable_allocationBtn').jqxSwitchButton('check');
            }else if(disable_allocation_state == 'true'){
                $('#disable_allocationBtn').jqxSwitchButton('uncheck');
            }else{
                alert("出错了");
            }
        }

        $scope.initializeController = function() {
            $('#jqxTabs').jqxTabs({ width: 1000, height: 300, position: 'top',theme: "metrodark"});
            $('#disable_allocationBtn').jqxSwitchButton({
                height: 20,
                width: 80,
                onLabel:'<span style="font-size: 11px">开</span>',
                offLabel:'<span style="font-size: 11px">关</span>',
                thumbSize:'40%',
                checked: true,
                theme: "ui-sunny" });
            var index = $location.search().index;
            ElasticService.getIndexMetadata(index,
                function(metadata) {
                    $scope.index = index;
                    $scope.settings = metadata.settings;
                    $scope.editable_settings = new EditableIndexSettings(
                        $scope.settings
                    );
                    applySetting2Page();
                },
                function(error) {
                    AlertService.error('Error while loading index settings for [' +
                        index + ']',
                        error);
                }
            );
        };
    }
]);

kopf.controller('IndexTemplatesController', ['$scope', 'ConfirmDialogService',
  'AlertService', 'AceEditorService', 'ElasticService',
  function($scope, ConfirmDialogService, AlertService, AceEditorService,
           ElasticService) {

    var TemplateBase = JSON.stringify(
        {
          template: '匹配索引正则（比如index*）',
          settings: {},
          mappings: {},
          aliases: {}
        },
        undefined,
        2
    );

    $scope.editor = undefined;

    $scope.paginator = new Paginator(1, 10, [],
        new IndexTemplateFilter('', ''));

    $scope.template = new IndexTemplate('', {});

    $scope.$watch('paginator', function(filter, previous) {
      $scope.page = $scope.paginator.getPage();
    }, true);

    $scope.initEditor = function() {
      if (!angular.isDefined($scope.editor)) {
        $scope.editor = AceEditorService.init('index-template-editor');
        $scope.editor.setValue(TemplateBase);
      }
    };

    $scope.loadTemplates = function() {
      ElasticService.getIndexTemplates(
          function(templates) {
            $scope.paginator.setCollection(templates);
            $scope.page = $scope.paginator.getPage();
          },
          function(error) {
            AlertService.error('Error while loading templates', error);
          }
      );
    };

    $scope.createIndexTemplate = function() {
      if ($scope.template.name) {
        if ($scope.editor.hasContent()) {
          $scope.editor.format();
          if (!isDefined($scope.editor.error)) {
            $scope.template.body = $scope.editor.getValue();
            ElasticService.createIndexTemplate($scope.template,
                function(response) {
                  $scope.loadTemplates();
                  AlertService.success(
                      'Template successfully created',
                      response
                  );
                },
                function(error) {
                  AlertService.error('Error while creating template', error);
                }
            );
          }
        } else {
          AlertService.error('Template body can\'t be empty');
        }
      } else {
        AlertService.error('Template name can\'t be empty');
      }
    };

    $scope.deleteIndexTemplate = function(template) {
      ConfirmDialogService.open(
          'are you sure you want to delete template ' + template.name + '?',
          template.body,
          'Delete',
          function() {
            ElasticService.deleteIndexTemplate(template.name,
                function(response) {
                  AlertService.success('Template successfully deleted',
                      response);
                  $scope.loadTemplates();
                },
                function(error) {
                  AlertService.error('Error while deleting template', error);
                }
            );
          }
      );
    };

    $scope.loadIndexTemplate = function(template) {
      $scope.template.name = template.name;
      $scope.editor.setValue(JSON.stringify(template.body, undefined, 2));
    };

    $scope.initializeController = function() {
      $scope.loadTemplates();
      $scope.initEditor();
    };
  }
]);

kopf.controller('NavbarController', ['$scope', '$location',
    'ExternalSettingsService', 'ElasticService', 'AlertService',
    'HostHistoryService',
    function ($scope, $location, ExternalSettingsService, ElasticService,
              AlertService, HostHistoryService) {

        $scope.new_refresh = '' + ExternalSettingsService.getRefreshRate();
        $scope.theme = ExternalSettingsService.getTheme();
        $scope.new_host = '';
        $scope.current_host = ElasticService.getHost();
        $scope.host_history = HostHistoryService.getHostHistory();

        $scope.clusterStatus = undefined;
        $scope.clusterName = undefined;
        $scope.clusterName4Escloud = clusterName;
        $scope.fetchedAt = undefined;
        $scope.isAdmin = isAdmin;
        $scope.isProd = isProd;
        $scope.fingurePrint = username + " @ "+clusterDescribe+"/"+clusterName;

        $scope.$watch(
            function () {
                return ElasticService.getHost();
            },
            function (newValue, oldValue) {
                $scope.current_host = ElasticService.getHost();
            }
        );

        $scope.$watch(
            function () {
                return ElasticService.cluster;
            },
            function (newValue, oldValue) {
                if (isDefined(ElasticService.cluster)) {
                    $scope.clusterStatus = ElasticService.cluster.status;
                    $scope.clusterName = ElasticService.cluster.name;
                    $scope.fetchedAt = ElasticService.cluster.fetched_at;
                    $scope.clientName = ElasticService.cluster.clientName;
                } else {
                    $scope.clusterStatus = undefined;
                    $scope.clusterName = undefined;
                    $scope.fetchedAt = undefined;
                    $scope.clientName = undefined;
                }
            }
        );

        $scope.handleConnectToHost = function (event) {
            if (event.keyCode == 13 && notEmpty($scope.new_host)) {
                $scope.connectToHost($scope.new_host);
            }
        };

        $scope.connectToHost = function (host) {
            try {
                ElasticService.connect(host);
                HostHistoryService.addToHistory(ElasticService.connection);
                $scope.host_history = HostHistoryService.getHostHistory();
            } catch (error) {
                AlertService.error('Error while connecting to new target host', error);
            } finally {
                $scope.current_host = ElasticService.connection.host;
                ElasticService.refresh();
            }
        };

        $scope.changeRefresh = function () {
            ExternalSettingsService.setRefreshRate($scope.new_refresh);
        };

        $scope.changeTheme = function () {
            ExternalSettingsService.setTheme($scope.theme);
        };

    }
]);


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

kopf.controller('ReIndexController', ['$scope', '$location','$timeout',
    'ExternalSettingsService', 'ElasticService', 'AlertService',
    'AceEditorService','ConfirmDialogService','ConfirmDialogService2','AppState',
    function ($scope, $location,$timeout, ExternalSettingsService, ElasticService,
              AlertService, AceEditorService,ConfirmDialogService,ConfirmDialogService2,AppState) {

        ExternalSettingsService.setTheme("dark");
        $scope.indexNames = [];
        $scope.field_types = "";
        $scope.field_type = "";
        $scope.field_new_index = "";

        setTimeout(function(){

            initHandle($scope, ElasticService,AppState);
            indexComboboxHandler($scope, $timeout);
            typeHandler($scope, ElasticService, AlertService);
            editorHandler($scope, AceEditorService);
            submitActionHandler($scope, ElasticService, AlertService, ConfirmDialogService2);
        },10);
    }]
);
function initHandle($scope, ElasticService,AppState) {
    $scope.$watch(
        function () {
            return ElasticService.cluster;
        },
        function (filter, previous) {
            if (!ElasticService.cluster) return;
            if ($scope.indexNames.length == 0) {
                ElasticService.getIndices().forEach(function (eachIndex) {
                    $scope.indexNames.push(eachIndex.name);
                    $("#re-index-combobox").jqxComboBox('addItem', eachIndex.name);
                });
                return;
            }
        },
        true
    );
    //处理参数传递
    var selectedIndex = AppState.getProperty("ClusterOverview","selectedIndex","");
    $scope.field_index = selectedIndex != "" ? selectedIndex : "";
    AppState.setProperty("ClusterOverview","selectedIndex","");
}
function indexComboboxHandler($scope, $timeout) {
    $("#re-index-combobox").jqxComboBox({
        height: 30,
        width: '100%',
        theme: 'metrodark',
        searchMode: 'contains',
        autoComplete: true, //筛选结果的显示效果
        placeHolder: '选择索引',
        source: $scope.indexNames
    });

    /**
     * 索引选择框发生变化,级联更新数据
     */
    $("#re-index-combobox").on('change', function (event) {
        if (event.args) {
            var item = event.args.item;
            var value = item.value;
            if (isDefined(value)) {
                $scope.loadIndexTypes(value);
                $scope.field_index = value;
            }
        }
    });
    $timeout(function () {
        if ($scope.field_index && $scope.field_index != "") {
            $("#re-index-combobox").val($scope.field_index);
        }
    },1000);
}
function typeHandler($scope, ElasticService, AlertService) {

    $scope.$watch('field_new_index', function (current, previous) {
        if (isDefined(current)) {
            if ('' == current) {
                $scope.editor.setValue("{}");
                return;
            }
            var mappingJson = '{"source": {"index": "'+$scope.field_index+'","type": "'+$scope.field_type+'"},"dest": {"index": "'+$scope.field_new_index+'"}}';
            $scope.editor.setValue(mappingJson);
            $scope.editor.format();
        }
    });

    $scope.loadIndexTypes = function (index) {
        $scope.field_type = '';
        $scope.field_field = '';
        if (notEmpty(index)) {
            ElasticService.getIndexMetadata(index,
                function (metadata) {
                    $scope.field_index_metadata = metadata;
                    $scope.field_types = metadata.getTypes();
                    $scope.field_type = $scope.field_types[0];
                },
                function (error) {
                    $scope.field_index = '';
                    AlertService.error('Error loading index types', error);
                }
            );
        }
    };
}

function submitActionHandler($scope, ElasticService, AlertService, ConfirmDialogService2) {
    $scope.reIndex = function () {
        var params = {
            clusterName: clusterName,
            newColsJson: $scope.editor.getValue()
        };
        ElasticService.clusterRequest2("/eserknife/indexmsg/reindex",
            'POST',
            "",
            params,
            {},
            function (res) {
                if (!res) {
                    AlertService.error("服务端响应对象为空!");
                    return;
                }
                if(res.total > 0 ){
                    AlertService.success("重建索引成功！");
                    $scope.field_type = '';
                    $scope.field_new_index = '';
                    $("#re-index-combobox").val('');
                    $scope.editor.setValue('{}');
                }else{
                    AlertService.warn("原索引字段无数据，重建无意义！");
                }
            },
            function (res) {
                AlertService.error("重建索引失败！");
            }
        );
    }

    $scope.promptUpdateIndex = function () {
        if ($.trim($scope.field_index).length == 0) {
            AlertService.warn('索引名不能为空');
            return;
        }
        if ($.trim($scope.field_new_index).length == 0) {
            AlertService.warn('重建索引名不能为空');
            return;
        }
        $("#submitA").click();
        ConfirmDialogService2.open(
            '重建索引',
            '确认按照索引  <span style="font-size: 20px;color: #be386a">' + $scope.field_index
            + '</span>,  类型  <span style="font-size: 20px;color: #B73766">' + $scope.field_type + '</span>  重建索引吗?',
            '重建',
            function () {
                $scope.reIndex();
            }
        );
    };
}

function editorHandler($scope, AceEditorService) {
    if (!isDefined($scope.editor)) {
        $scope.editor = AceEditorService.init('index-settings-editor');
        $scope.editor.setValue('{}');
    }
}


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
kopf.controller('UpdateMappingController', ['$scope', '$location','$timeout',
    'ExternalSettingsService', 'ElasticService', 'AlertService',
    'AceEditorService','ConfirmDialogService','ConfirmDialogService2','AppState',
    function ($scope, $location,$timeout, ExternalSettingsService, ElasticService,
              AlertService, AceEditorService,ConfirmDialogService,ConfirmDialogService2,AppState) {

        ExternalSettingsService.setTheme("dark");
        $scope.indexNames = [];

        $scope.field_types = "";
        $scope.field_type = "";
        $scope.ds_names = [{name:"test1"}];
        $scope.dsId = '';

        $scope.tabs=[];
        $scope.tabName = "";

        $scope.opsjs = '';
        $scope.selectedColArr = [];
        $scope.sqlColArr = [];
        $scope.showHelpText = true;


        setTimeout(function(){

            initUpdataMapHandle($scope, ElasticService,AppState);

            loadDataSources($scope, ElasticService);
            indexUpdateMapComboboxHandler($scope, $timeout);
            typeHandler($scope, ElasticService, AlertService);
            editorHandler($scope, AceEditorService);

            radioHandler();

            sqlAreaHandler($scope);

            db_table_handler($scope, $location, ElasticService);
            db_column_handler($scope, $location);

            submitActionHandler($scope, ElasticService, AlertService, ConfirmDialogService2);
            toolActionHandler($scope, AlertService,ElasticService);

            splitterHandler();






        },10);
    }]
);
function initUpdataMapHandle($scope, ElasticService,AppState) {
    $scope.$watch(
        function () {
            return ElasticService.cluster;
        },
        function (filter, previous) {
            if (!ElasticService.cluster) return;
            if ($scope.indexNames.length == 0) {
                ElasticService.getIndices().forEach(function (eachIndex) {
                    $scope.indexNames.push(eachIndex.name);
                    $("#update-index-combobox").jqxComboBox('addItem', eachIndex.name);
                });
                return;
            }
        },
        true
    );

    //处理参数传递
    var selectedIndex = AppState.getProperty("ClusterOverview","selectedIndex","");
    $scope.field_index = selectedIndex != "" ? selectedIndex : "";
    console.log("1>>>"+$scope.field_index);
    AppState.setProperty("ClusterOverview","selectedIndex","");



}
function indexUpdateMapComboboxHandler($scope, $timeout) {
    $("#update-index-combobox").jqxComboBox({
        height: 30,
        width: '100%',
        theme: 'metrodark',
        searchMode: 'contains',
        autoComplete: true, //筛选结果的显示效果
        placeHolder: '选择索引',
        source: $scope.indexNames
    });

    /**
     * 索引选择框发生变化,级联更新数据
     */
    $("#update-index-combobox").on('change', function (event) {
        if (event.args) {
            var item = event.args.item;
            var value = item.value;
            if (isDefined(value)) {
                $scope.loadIndexTypes(value);
                $scope.field_index = value;
                $scope.ops_head = "PUT  /" + $scope.field_index + "/" + $scope.field_type + "/_mapping";
            }
        }
    });

    $timeout(function () {
        if ($scope.field_index && $scope.field_index != "") {
            $("#update-index-combobox").val($scope.field_index);
        }
    },1000);
}

function loadDataSources($scope,ElasticService){
    ElasticService.clusterRequest2("/eserknife/indexmsg/getDataSource",
        'GET', "", {}, {},
        function (res) {
            if (res) {
                $scope.ds_names = res.result;
            }
        }
    );
}

function typeHandler($scope, ElasticService, AlertService) {
    $scope.$watch('field_type', function (current, previous) {
        if (isDefined(current)) {

            $scope.ops_head = "PUT  /" + $scope.field_index + "/" + $scope.field_type + "/_mapping";

            var content = $.trim($scope.editor.getValue());
            //如果是初始值,直接赋值
            if ('' == current) {
                return;
            }
            var mappingJson = '{"' + current + '":{"dynamic": "strict","properties": {}}}';
            $scope.editor.setValue(mappingJson);
            $scope.editor.format();
        }
    });

    $scope.loadIndexTypes = function (index) {
        $scope.field_type = '';
        $scope.field_field = '';
        if (notEmpty(index)) {
            ElasticService.getIndexMetadata(index,
                function (metadata) {
                    $scope.field_index_metadata = metadata;
                    $scope.field_types = metadata.getTypes();
                    $scope.field_type = $scope.field_types[0];
                },
                function (error) {
                    $scope.field_index = '';
                    AlertService.error('Error loading index types', error);
                }
            );
        }
    };
}
function db_table_handler($scope, $location, ElasticService) {
    $scope.$watch('dsname', function (current, previous) {
        if (isDefined(current)) {
            $scope.dsId = current;
            $scope.loadTabNames(current);
        }
    });



    $scope.$watch('tabName', function (current, previous) {
        if (isDefined(current)) {
            $scope.source.url = 'http://' + $location.$$host + ':' + $location.$$port
                + '/eserknife/indexmsg/getColInfoByTabname?dsId='+$scope.dsId+'&tabName=' + $scope.tabName+'&clusterName='+clusterName;
            $('#dbcol-grid').jqxGrid('clearselection');
            $('#dbcol-grid').jqxGrid('updatebounddata');
        }
    });


    $scope.loadTabNames = function (ds) {

        ElasticService.clusterRequest2("/eserknife/indexmsg/getTabNamesByDs?dsId=" + $scope.dsId,
            'GET', "", {}, {},
            function (res) {
                if (res) {
                    $scope.tabs = res.result;
                }
            }
        );
    };
}
function db_column_handler($scope, $location) {
    $scope.dataurl = 'http://' + $location.$$host + ':' + $location.$$port
        + '/eserknife/indexmsg/getColInfoByTabname?dsId='+$scope.dsId+'&tabName=' + $scope.tabName+'&clusterName='+clusterName;

    $scope.source = {
        datatype: "json",
        datafields: [
            {name: 'db_colname', type: 'string'},
            {name: 'db_colname_def', type: 'string'}
        ],
        url: $scope.dataurl,
        beforeprocessing: function (data) {
            if (data != null && data.dbColNames != null) {
                $scope.source.records = data.dbColNames;
            }
        }
    };

    var dataAdapter = new $.jqx.dataAdapter($scope.source);

    $("#dbcol-grid").jqxGrid({
        width: '100%',
        height: 250,
        source: dataAdapter,
        showfilterrow: true,
        filterable: true,
        theme: 'metrodark',
        selectionmode: "multiplerows",
        columns: [
            {
                text: '列名',
                datafield: 'db_colname',
                columntype: 'textbox',
                filtercondition: 'contains',
                width: '100%',
                cellsalign: 'left',
                align: 'left',
                cellclassname: 'enter'
            },
            {text: '定义', datafield: 'db_colname_def', hidden: true}
        ]
    });

    $('#dbcol-grid').on('rowunselect', function (event) {
        var tabName = $scope.tabName;
        var colName = event.args.row.db_colname;
        var colType = event.args.row.db_colname_def;
        $scope.selectedColArr.remove($scope.buildProperties(tabName, colName, colType));
    });

    $('#dbcol-grid').on('rowselect', function (event) {
        var tabName = $scope.tabName;
        var colName = event.args.row.db_colname;
        var colType = event.args.row.db_colname_def;
        $scope.selectedColArr.push($scope.buildProperties(tabName, colName, colType));
    });
}
function toolActionHandler($scope, AlertService,ElasticService) {
    $scope.generate = function () {
        if ($scope.tabName == '') {
            AlertService.warn("选择表名");
            $('#tabName').focus();
            return;
        }
        if ($scope.selectedColArr.length == 0) {
            AlertService.warn("点击表格中的行选择列名,可多选");
            return;
        }
        $scope.editor.setValue('{"' + $scope.field_type + '":{"dynamic": "strict","properties": {' + $scope.selectedColArr.join(",") + '}}}');
        $scope.editor.format();
    }

    $scope.clear = function () {
        $('#dbcol-grid').jqxGrid('clearselection');
        $scope.selectedColArr = [];
    }

    $scope.generateSqlArea = function () {
        var all_ddls = $('#sqlArea').jqxTextArea('val');

        ElasticService.clusterRequest3("/eserknife/indexmsg/parseSql",
            'POST',{
                sql:all_ddls,
                clusterName:clusterName
            },
            function (res) {
                if (res) {
                    for(var i = 0; i < res.cols.length ; i++){
                        var eachProp = $scope.buildProperties(res.tableName, res.cols[i].colname, res.cols[i].coltype);
                        $scope.sqlColArr.push(eachProp);
                    }
                    $scope.editor.setValue('{"' + $scope.field_type + '":{"dynamic": "strict","properties": {' + $scope.sqlColArr.join(",") + '}}}');
                    $scope.editor.format();
                }
            }
        );
    }

    $scope.clearSqlArea = function () {
        $scope.sqlColArr = [];
        $('#sqlArea').jqxTextArea('val', '');
        $scope.editor.setValue('{}');
    }

    $scope.buildProperties = function (tabName, colName, colType) {
        var esType = $scope.sqlType2EsType(colType);
        var col = tabName + "|" + colName;
        if (esType == 'string') {
            return '"' + col + '": {"type": "string","index": "not_analyzed"}';
        } else if (esType == 'date') {
            return '"' + col + '": {"type": "date","format": "yyyy-MM-dd HH:mm:ss"}';
        } else if (esType == 'integer' || esType == 'long' || esType == 'double' || esType == 'byte') {
            return '"' + col + '": {"type": "' + esType + '"}';
        } else {
            return "不支持的类型";
        }
    }

    $scope.sqlType2EsType = function (colType) {
        if (colType.toLowerCase().indexOf("bigint") != -1) {
            return "long";
        } else if (colType.toLowerCase().indexOf("tinyint") != -1 || colType.toLowerCase().indexOf("smallint") != -1) {
            return "integer";
        } else if (colType.toLowerCase().indexOf("int") != -1) {
            return "integer";
        } else if (colType.toLowerCase().indexOf("varchar") != -1 || colType.toLowerCase().indexOf("char") != -1 || colType == 'text') {
            return "string";
        } else if (colType.toLowerCase().indexOf("decimal") != -1 || colType.toLowerCase().indexOf("double") != -1) {
            return "double";
        } else if (colType.toLowerCase().indexOf("datetime") != -1 || colType.toLowerCase().indexOf("timestamp") != -1 || colType.toLowerCase().indexOf("date") != -1) {
            return "date";
        } else {
            return "不支持的类型";
        }
    }
}
function submitActionHandler($scope, ElasticService, AlertService, ConfirmDialogService2) {
    $scope.updateIndex = function () {
        var params = {
            clusterName: clusterName,
            indexName: $scope.field_index,
            typeName: $scope.field_type,
            newColsJson: $scope.submitJsonBody
        };
        ElasticService.clusterRequest2("/eserknife/indexmsg/addNewCols",
            'POST',
            "",
            params,
            {},
            function (res) {
                if (!res) {
                    AlertService.error("服务端响应对象为空!");
                    return;
                }
                if (res.code) {
                    AlertService.success(res.sucMsg);

                    $scope.field_type = '';
                    $("#update-index-combobox").val('');
                    $scope.editor.setValue('{}');

                    //工具区域
                    $scope.clear();
                    $scope.clearSqlArea();
                    $scope.tabName = '';
                    $('#dbcol-grid').jqxGrid('clear');

                } else {
                    AlertService.error(res.errMsg);
                }
            },
            function (res) {
                AlertService.error(res);
            }
        );
    }

    $scope.promptUpdateIndex = function () {

        if ($.trim($scope.field_index).length == 0) {
            AlertService.warn('索引名不能为空');
            return;
        }

        var content = $.trim($scope.editor.getValue());
        if (content.length == 0 || content.length == '{}') {
            AlertService.warn('请填入字段定义json串');
            return;
        }

        try {
            var json4Content = $.parseJSON(content);
            if (!json4Content[$scope.field_type].properties) {
                AlertService.warn('字段定义必须包含properties属性');
                return;
            }
            if ($.isEmptyObject(json4Content[$scope.field_type].properties)) {
                AlertService.warn('字段定义properties属性不能空,可以直接编辑或者通过辅助区自动产生');
                return;
            }
            $scope.submitJsonBody = JSON.stringify(json4Content[$scope.field_type])
        } catch (e) {
            AlertService.warn('字段定义必须是合法的json串');
            return;
        }

        $("#submitA").click();

        ConfirmDialogService2.open(
            '修改索引',
            '确认在索引  <span style="font-size: 20px;color: #be386a">' + $scope.field_index
            + '</span>,  类型  <span style="font-size: 20px;color: #B73766">' + $scope.field_type + '</span>  下添加新字段吗?',
            '修改',
            function () {
                $scope.updateIndex();
            }
        );
    };
}
function sqlAreaHandler($scope) {
    var quotes = [];
    quotes.push('alter table 表名 add column 列名 varchar(30);');
    quotes.push('alter table 表名 add column 列名 int(11);');

    $('#sqlArea').jqxTextArea({
        theme: "metrodark", height: 460, width: '100%', minLength: 1, source: quotes,
        placeHolder: '将 CREATE 或 ALTER SQL语句粘贴到这里'
    });

    $scope.showHelp = function () {
        $scope.showHelpText = !$scope.showHelpText;
    }
}
function editorHandler($scope, AceEditorService) {
    if (!isDefined($scope.editor)) {
        $scope.editor = AceEditorService.init('index-settings-editor');
        $scope.editor.setValue('{}');
    }
}
function radioHandler() {

    $('#mainSplitter').on('expanded',
        function (event) {
            $("#jqxRadioSql").jqxRadioButton({height: 25, theme: 'metrodark', checked: true});
            $("#jqxRadioDB").jqxRadioButton({height: 25, theme: 'metrodark'});
            $("#jqxRadioSql").on('change', function (event) {
                if (event.args.checked) {
                    $("#sql_view").show();
                    $("#col_view").hide();
                }
            });

            $("#jqxRadioDB").on('change', function (event) {
                if (event.args.checked) {
                    $("#col_view").show();
                    $("#sql_view").hide();
                }
            });
        }
    );
}
function splitterHandler() {
    $("#enablehover").jqxCheckBox({checked: false, theme: 'metrodark'});
    $("#enablehover").on('change', function (event) {
        //$("#jqxgrid").jqxGrid('enablehover', event.args.checked);
        if (event.args.checked) {
            $('#mainSplitter').jqxSplitter('expand');
        } else {
            $('#mainSplitter').jqxSplitter('collapse');
        }
    });
    $('#mainSplitter').jqxSplitter({
        width: '100%',
        height: 650,
        theme: 'metrodark',
        panels: [{size: 750, collapsible: false}, {collapsed: true}]
    });


}






window.onload = function() {
    $( "#index_manager_li" ).mouseover(function() {
        $(this).addClass("open");
    }).mouseout(function() {
        $(this).removeClass("open");
    });

    $( "#other_li" ).mouseover(function() {
        $(this).addClass("open");
    }).mouseout(function() {
        $(this).removeClass("open");
    });
    $( "#monitor_ul" ).mouseover(function() {
        $(this).addClass("open");
    }).mouseout(function() {
        $(this).removeClass("open");
    });
    $( "#index_ul" ).mouseover(function() {
        $(this).addClass("open");
    }).mouseout(function() {
        $(this).removeClass("open");
    });
    $( "#other_ul" ).mouseover(function() {
        $(this).addClass("open");
    }).mouseout(function() {
        $(this).removeClass("open");
    });
    $( "#alias_ul" ).mouseover(function() {
        $(this).addClass("open");
    }).mouseout(function() {
        $(this).removeClass("open");
    });
};

