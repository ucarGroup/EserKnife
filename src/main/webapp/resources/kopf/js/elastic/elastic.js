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