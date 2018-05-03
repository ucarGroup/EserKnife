
DROP TABLE IF EXISTS `es_alarm_rule`;

CREATE TABLE `es_alarm_rule` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键',
  `cluster_id` bigint(20) DEFAULT NULL COMMENT '集群信息id',
  `rule_name` varchar(50) DEFAULT NULL COMMENT '规则名称',
  `latitude` varchar(20) NOT NULL COMMENT '监控一级指标',
  `latitude_sub` varchar(20) DEFAULT NULL COMMENT '监控二级指标',
  `threshold` int(11) DEFAULT NULL COMMENT '阀值',
  `frequency` varchar(20) DEFAULT NULL COMMENT '分钟',
  `frequency_count` int(11) DEFAULT NULL COMMENT '次数',
  `alarm_interval` int(11) DEFAULT NULL COMMENT '报警间隔（分钟为单位）',
  `extend` varchar(200) DEFAULT NULL COMMENT '扩展内容',
  `alarm_way` smallint(6) DEFAULT '1' COMMENT '报警方式（1邮件 2 短信 3邮件+短信）',
  `enable` smallint(6) DEFAULT '0' COMMENT '是否启用(0禁用 1 启动)',
  `type` smallint(6) DEFAULT '1' COMMENT '报警类型（1指标 2幅度）',
  `send_user_ids` varchar(50) DEFAULT NULL COMMENT '发送人员id',
  `operate_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '操作时间',
  `operate_user` varchar(20) DEFAULT NULL COMMENT '操作人',
  `remark` varchar(500) DEFAULT NULL COMMENT '备注',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='报警规则配置表';

/*Table structure for table `es_cluster_info` */

DROP TABLE IF EXISTS `es_cluster_info`;

CREATE TABLE `es_cluster_info` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `product_line` varchar(20) NOT NULL COMMENT '产品线',
  `cluster_name` varchar(100) NOT NULL COMMENT '集群名称',
  `cluster_describe` varchar(50) DEFAULT NULL,
  `hosts` varchar(100) NOT NULL COMMENT '集群ip',
  `http_port` int(11) NOT NULL COMMENT 'http端口',
  `tcp_port` int(11) NOT NULL COMMENT 'tcp端口',
  `monitor_role_name` varchar(100) DEFAULT NULL COMMENT '监控角色名称',
  `monitor_role_pwd` varchar(100) DEFAULT NULL COMMENT '监控角色密码',
  `admin_role_name` varchar(100) DEFAULT NULL COMMENT '管理员角色名称',
  `admin_role_pwd` varchar(100) DEFAULT NULL COMMENT '管理员角色密码',
  `operate_time` datetime DEFAULT NULL COMMENT '操作时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uni` (`cluster_name`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8 COMMENT='集群信息';

/*Table structure for table `es_common_log` */

DROP TABLE IF EXISTS `es_common_log`;

CREATE TABLE `es_common_log` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键',
  `cluster_id` bigint(20) DEFAULT NULL COMMENT '集群id',
  `cluster_status` varchar(20) DEFAULT NULL COMMENT '集群状态',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `data_node_count` bigint(20) DEFAULT NULL COMMENT 'data节点数量',
  `doc_count` bigint(20) DEFAULT NULL COMMENT '文档数量',
  `indice_count` bigint(20) DEFAULT NULL COMMENT '索引数量',
  `node_count` bigint(20) DEFAULT NULL COMMENT '节点数量',
  `shard_count` bigint(20) DEFAULT NULL COMMENT '分片数量',
  `store_size` bigint(20) DEFAULT NULL COMMENT '存储数量',
  PRIMARY KEY (`id`),
  KEY `idx_cluster_id` (`cluster_id`)
) ENGINE=InnoDB AUTO_INCREMENT=848120 DEFAULT CHARSET=utf8 COMMENT='通用数据收集信息表';

/*Table structure for table `es_custom_token_lib` */

DROP TABLE IF EXISTS `es_custom_token_lib`;

CREATE TABLE `es_custom_token_lib` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `name` varchar(50) NOT NULL COMMENT '名称',
  `update_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '更新时间',
  `content` text COMMENT '词库',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='自定义分词库表';

/*Table structure for table `es_data_source_info` */

DROP TABLE IF EXISTS `es_data_source_info`;

CREATE TABLE `es_data_source_info` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键',
  `data_source_name` varchar(50) NOT NULL COMMENT '数据源名称',
  `data_source_url` varchar(200) NOT NULL COMMENT '数据源链接',
  `data_source_user_name` varchar(50) NOT NULL COMMENT '数据源用户名',
  `data_source_user_pwd` varchar(50) NOT NULL COMMENT '数据源密码',
  `product_line` varchar(100) DEFAULT NULL COMMENT '产品线',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `update_time` datetime DEFAULT NULL COMMENT '修改时间',
  `create_user` varchar(50) DEFAULT NULL COMMENT '创建人',
  `update_user` varchar(50) DEFAULT NULL COMMENT '修改人',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='数据源信息';

/*Table structure for table `es_fs_log` */

DROP TABLE IF EXISTS `es_fs_log`;

CREATE TABLE `es_fs_log` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键',
  `cluster_id` bigint(20) DEFAULT NULL COMMENT '集群id',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `host` varchar(20) DEFAULT NULL COMMENT '主机ip',
  `total_in_bytes` bigint(20) DEFAULT NULL COMMENT '总容量',
  `free_in_bytes` bigint(20) DEFAULT NULL COMMENT '空闲容量',
  `available_in_bytes` bigint(20) DEFAULT NULL COMMENT '已用容量',
  PRIMARY KEY (`id`),
  KEY `idx_cluster_id` (`cluster_id`),
  KEY `idx_host` (`host`)
) ENGINE=InnoDB AUTO_INCREMENT=1947822 DEFAULT CHARSET=utf8 COMMENT='fs收集信息表';

/*Table structure for table `es_http_log` */

DROP TABLE IF EXISTS `es_http_log`;

CREATE TABLE `es_http_log` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键',
  `cluster_id` bigint(20) DEFAULT NULL COMMENT '集群id',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `current_open` bigint(20) DEFAULT NULL COMMENT '当前打开量',
  `host` varchar(20) DEFAULT NULL COMMENT '主机ip',
  `total_opened` bigint(20) DEFAULT NULL COMMENT '总打开数量',
  PRIMARY KEY (`id`),
  KEY `idx_cluster_id` (`cluster_id`),
  KEY `idx_host` (`host`)
) ENGINE=InnoDB AUTO_INCREMENT=4102813 DEFAULT CHARSET=utf8 COMMENT='http收集信息表';

/*Table structure for table `es_indices_log` */

DROP TABLE IF EXISTS `es_indices_log`;

CREATE TABLE `es_indices_log` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键',
  `cluster_id` bigint(20) DEFAULT NULL COMMENT '集群id',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `host` varchar(20) DEFAULT NULL COMMENT '主机ip',
  `docs_count` bigint(20) DEFAULT NULL COMMENT '文本数量',
  `store_size_in_bytes` bigint(20) DEFAULT NULL COMMENT '存储量',
  `segments_count` bigint(20) DEFAULT NULL COMMENT '分段数量',
  `indexing_index_total` bigint(20) DEFAULT NULL COMMENT '总索引',
  `indexing_index_time_in_millis` bigint(20) DEFAULT NULL COMMENT '索引时间',
  `indexing_delete_total` bigint(20) DEFAULT NULL COMMENT '总删除索引',
  `indexing_delete_time_in_millis` bigint(20) DEFAULT NULL COMMENT '删除索引时间',
  `get_total` bigint(20) DEFAULT NULL COMMENT 'get总数',
  `get_time_in_millis` bigint(20) DEFAULT NULL COMMENT 'get时间',
  `get_exists_total` bigint(20) DEFAULT NULL COMMENT 'exists总数',
  `get_exists_time_in_millis` bigint(20) DEFAULT NULL COMMENT 'exists时间',
  `get_missing_total` bigint(20) DEFAULT NULL COMMENT 'missing总数',
  `get_missing_time_in_millis` bigint(20) DEFAULT NULL COMMENT 'missing时间',
  `search_query_total` bigint(20) DEFAULT NULL COMMENT 'quert总数',
  `search_query_time_in_millis` bigint(20) DEFAULT NULL COMMENT 'query时间',
  `search_fetch_total` bigint(20) DEFAULT NULL COMMENT 'fetch总数',
  `search_fetch_time_in_millis` bigint(20) DEFAULT NULL COMMENT 'fetch 时间',
  `field_data_memory_size_in_bytes` bigint(20) DEFAULT NULL COMMENT 'field数据内存大小',
  `field_data_evictions` bigint(20) DEFAULT NULL COMMENT 'field数据evictions',
  PRIMARY KEY (`id`),
  KEY `idx_cluster_id` (`cluster_id`),
  KEY `idx_host` (`host`)
) ENGINE=InnoDB AUTO_INCREMENT=4102917 DEFAULT CHARSET=utf8 COMMENT='indices 收集信息表';

/*Table structure for table `es_jvm_log` */

DROP TABLE IF EXISTS `es_jvm_log`;

CREATE TABLE `es_jvm_log` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键',
  `cluster_id` bigint(20) DEFAULT NULL COMMENT '集群id',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `host` varchar(20) DEFAULT NULL COMMENT '主机ip',
  `threads_count` bigint(20) DEFAULT NULL COMMENT '线程数',
  `threads_peak_count` bigint(20) DEFAULT NULL COMMENT '线程的最大数量',
  `heap_used_in_bytes` bigint(20) DEFAULT NULL COMMENT '字节中使用的堆',
  `heap_used_percent` bigint(20) DEFAULT NULL COMMENT '堆的利用率',
  `heap_committed_in_bytes` bigint(20) DEFAULT NULL COMMENT '以字节形式提交的堆',
  `heap_max_in_bytes` bigint(20) DEFAULT NULL COMMENT '最大字节数',
  `non_heap_used_in_bytes` bigint(20) DEFAULT NULL COMMENT 'non heap used',
  `non_heap_committed_in_bytes` bigint(20) DEFAULT NULL COMMENT 'noe heap committed',
  `old_mem_used` bigint(20) DEFAULT NULL COMMENT '老年代内存使用大小',
  `old_mem_max` bigint(20) DEFAULT NULL COMMENT '老年代最大堆内存',
  `young_mem_max` bigint(20) DEFAULT NULL COMMENT '新生代内存大小',
  `young_mem_used` bigint(20) DEFAULT NULL COMMENT '新生代内存使用',
  `old_collection_count` bigint(20) DEFAULT NULL COMMENT '自es服务端启动后垃圾回收总次数',
  `old_collection_time` bigint(20) DEFAULT NULL COMMENT '自es服务端启动后垃圾回收总耗时',
  `young_collection_count` bigint(20) DEFAULT NULL COMMENT '自es服务端启动后垃圾回收总次数 新生代',
  `young_collection_time` bigint(20) DEFAULT NULL COMMENT '自es服务端启动后垃圾回收总耗时 新生代',
  `interval_old_collection_count` bigint(20) DEFAULT NULL COMMENT '间隔时间内垃圾回收次数',
  `interval_old_collection_time` bigint(20) DEFAULT NULL COMMENT '间隔时间内垃圾回收耗时',
  `interval_young_collection_count` bigint(20) DEFAULT NULL,
  `buffer_pools_direct_total_capacity` bigint(20) DEFAULT NULL COMMENT '缓冲池总容量',
  `buffer_pools_direct_count` bigint(20) DEFAULT NULL COMMENT '缓冲池计数',
  `buffer_pools_direct_used` bigint(20) DEFAULT NULL COMMENT '缓冲池使用',
  `buffer_pools_mapped_total_capacity` bigint(20) DEFAULT NULL COMMENT 'mapp总容量的缓冲池',
  `buffer_pools_mapped_count` bigint(20) DEFAULT NULL COMMENT 'mapped缓冲池计数',
  `buffer_pools_mapped_userd` bigint(20) DEFAULT NULL COMMENT 'mapped缓冲池使用',
  `interval_young_collection_time` bigint(20) DEFAULT NULL COMMENT '间隔时间内垃圾回收耗时新生代',
  PRIMARY KEY (`id`),
  KEY `idx_cluster_id` (`cluster_id`),
  KEY `idx_host` (`host`),
  KEY `idx_create_time` (`create_time`)
) ENGINE=InnoDB AUTO_INCREMENT=4102771 DEFAULT CHARSET=utf8 COMMENT='jvm 收集信息表';

/*Table structure for table `es_os_log` */

DROP TABLE IF EXISTS `es_os_log`;

CREATE TABLE `es_os_log` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键',
  `cluster_id` bigint(20) DEFAULT NULL COMMENT '集群id',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `host` varchar(20) DEFAULT NULL COMMENT '主机ip',
  `cpu_percent` bigint(20) DEFAULT NULL COMMENT 'cpu 使用占比',
  `load_average` double DEFAULT NULL COMMENT '负载',
  `mem_free` bigint(20) DEFAULT NULL COMMENT '内存剩余空间',
  `mem_free_percent` bigint(20) DEFAULT NULL COMMENT '内存剩余空间占比',
  `mem_total` bigint(20) DEFAULT NULL COMMENT '内存总空间',
  `mem_used` bigint(20) DEFAULT NULL COMMENT '内存使用大小',
  `mem_used_percent` bigint(20) DEFAULT NULL COMMENT '内存使用占比',
  `swap_free` bigint(20) DEFAULT NULL COMMENT 'swap空间',
  `swap_total` bigint(20) DEFAULT NULL COMMENT 'swap总量',
  `swap_used` bigint(20) DEFAULT NULL COMMENT 'swap已使用量',
  PRIMARY KEY (`id`),
  KEY `idx_cluster_id` (`cluster_id`),
  KEY `idx_host` (`host`)
) ENGINE=InnoDB AUTO_INCREMENT=4102747 DEFAULT CHARSET=utf8 COMMENT='os收集信息表';

/*Table structure for table `es_qrtz_blob_triggers` */

DROP TABLE IF EXISTS `es_qrtz_blob_triggers`;

CREATE TABLE `es_qrtz_blob_triggers` (
  `SCHED_NAME` varchar(120) NOT NULL COMMENT '调度名',
  `TRIGGER_NAME` varchar(200) NOT NULL COMMENT '触发器名',
  `TRIGGER_GROUP` varchar(200) NOT NULL COMMENT '触发器组名',
  `BLOB_DATA` blob COMMENT 'data',
  PRIMARY KEY (`SCHED_NAME`,`TRIGGER_NAME`,`TRIGGER_GROUP`),
  KEY `SCHED_NAME` (`SCHED_NAME`,`TRIGGER_NAME`,`TRIGGER_GROUP`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Trigger 作为 Blob 类型存储(用于 Quartz 用户用 JDBC 创建他们自己定制的 Trigger 类型';

/*Table structure for table `es_qrtz_calendars` */

DROP TABLE IF EXISTS `es_qrtz_calendars`;

CREATE TABLE `es_qrtz_calendars` (
  `SCHED_NAME` varchar(120) NOT NULL COMMENT 'scheduler名称',
  `CALENDAR_NAME` varchar(200) NOT NULL COMMENT 'calendar名称',
  `CALENDAR` blob NOT NULL COMMENT 'calendar信息',
  PRIMARY KEY (`SCHED_NAME`,`CALENDAR_NAME`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='以 Blob 类型存储 Quartz 的 Calendar 信息';

/*Table structure for table `es_qrtz_cron_triggers` */

DROP TABLE IF EXISTS `es_qrtz_cron_triggers`;

CREATE TABLE `es_qrtz_cron_triggers` (
  `SCHED_NAME` varchar(120) NOT NULL COMMENT 'scheduler名称',
  `TRIGGER_NAME` varchar(200) NOT NULL COMMENT 'trigger名',
  `TRIGGER_GROUP` varchar(200) NOT NULL COMMENT 'trigger组',
  `CRON_EXPRESSION` varchar(120) NOT NULL COMMENT 'cron表达式',
  `TIME_ZONE_ID` varchar(80) DEFAULT NULL COMMENT '时区',
  PRIMARY KEY (`SCHED_NAME`,`TRIGGER_NAME`,`TRIGGER_GROUP`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='存储 Cron Trigger，包括 Cron 表达式和时区信息';

/*Table structure for table `es_qrtz_fired_triggers` */

DROP TABLE IF EXISTS `es_qrtz_fired_triggers`;

CREATE TABLE `es_qrtz_fired_triggers` (
  `SCHED_NAME` varchar(120) NOT NULL COMMENT '调度名',
  `ENTRY_ID` varchar(95) NOT NULL COMMENT '条目id',
  `TRIGGER_NAME` varchar(200) NOT NULL COMMENT '出触发器名',
  `TRIGGER_GROUP` varchar(200) NOT NULL COMMENT '触发器组名',
  `INSTANCE_NAME` varchar(200) NOT NULL COMMENT '实例名',
  `FIRED_TIME` bigint(13) NOT NULL COMMENT '执行时间',
  `SCHED_TIME` bigint(13) NOT NULL COMMENT '调度时间',
  `PRIORITY` int(11) NOT NULL COMMENT '优先级',
  `STATE` varchar(16) NOT NULL COMMENT '状态',
  `JOB_NAME` varchar(200) DEFAULT NULL COMMENT 'job名',
  `JOB_GROUP` varchar(200) DEFAULT NULL COMMENT 'job组',
  `IS_NONCONCURRENT` varchar(1) DEFAULT NULL COMMENT '是否非并行执行',
  `REQUESTS_RECOVERY` varchar(1) DEFAULT NULL COMMENT '是否持久化',
  PRIMARY KEY (`SCHED_NAME`,`ENTRY_ID`),
  KEY `IDX_QRTZ_FT_TRIG_INST_NAME` (`SCHED_NAME`,`INSTANCE_NAME`),
  KEY `IDX_QRTZ_FT_INST_JOB_REQ_RCVRY` (`SCHED_NAME`,`INSTANCE_NAME`,`REQUESTS_RECOVERY`),
  KEY `IDX_QRTZ_FT_J_G` (`SCHED_NAME`,`JOB_NAME`,`JOB_GROUP`),
  KEY `IDX_QRTZ_FT_JG` (`SCHED_NAME`,`JOB_GROUP`),
  KEY `IDX_QRTZ_FT_T_G` (`SCHED_NAME`,`TRIGGER_NAME`,`TRIGGER_GROUP`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='存储已触发的 Trigger相关的状态信息，以及关联 Job 的执行信息';

/*Table structure for table `es_qrtz_job_details` */

DROP TABLE IF EXISTS `es_qrtz_job_details`;

CREATE TABLE `es_qrtz_job_details` (
  `SCHED_NAME` varchar(120) NOT NULL COMMENT '调度名',
  `JOB_NAME` varchar(200) NOT NULL COMMENT 'job名',
  `JOB_GROUP` varchar(200) NOT NULL COMMENT 'job组名',
  `DESCRIPTION` varchar(250) DEFAULT NULL COMMENT '描述',
  `JOB_CLASS_NAME` varchar(250) NOT NULL COMMENT 'job类名',
  `IS_DURABLE` varchar(1) NOT NULL COMMENT '是否持久化，0不持久化，1持久化',
  `IS_NONCONCURRENT` varchar(1) NOT NULL COMMENT '是否非并发，0非并发，1并发',
  `IS_UPDATE_DATA` varchar(1) NOT NULL COMMENT '是否更新数据',
  `REQUESTS_RECOVERY` varchar(1) NOT NULL COMMENT '是否可恢复，0不恢复，1恢复',
  `JOB_DATA` blob COMMENT 'job数据',
  PRIMARY KEY (`SCHED_NAME`,`JOB_NAME`,`JOB_GROUP`),
  KEY `IDX_QRTZ_J_REQ_RECOVERY` (`SCHED_NAME`,`REQUESTS_RECOVERY`),
  KEY `IDX_QRTZ_J_GRP` (`SCHED_NAME`,`JOB_GROUP`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='存储每一个已配置的 Job 的详细信息';

/*Table structure for table `es_qrtz_locks` */

DROP TABLE IF EXISTS `es_qrtz_locks`;

CREATE TABLE `es_qrtz_locks` (
  `SCHED_NAME` varchar(120) NOT NULL COMMENT '调度名',
  `LOCK_NAME` varchar(40) NOT NULL COMMENT '锁名',
  PRIMARY KEY (`SCHED_NAME`,`LOCK_NAME`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='存储程序的悲观锁的信息(假如使用了悲观锁)';

/*Table structure for table `es_qrtz_paused_trigger_grps` */

DROP TABLE IF EXISTS `es_qrtz_paused_trigger_grps`;

CREATE TABLE `es_qrtz_paused_trigger_grps` (
  `SCHED_NAME` varchar(120) NOT NULL COMMENT '调度名',
  `TRIGGER_GROUP` varchar(200) NOT NULL COMMENT '触发器组',
  PRIMARY KEY (`SCHED_NAME`,`TRIGGER_GROUP`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='存储已暂停的 Trigger 组的信息';

/*Table structure for table `es_qrtz_scheduler_state` */

DROP TABLE IF EXISTS `es_qrtz_scheduler_state`;

CREATE TABLE `es_qrtz_scheduler_state` (
  `SCHED_NAME` varchar(120) NOT NULL COMMENT '调度名',
  `INSTANCE_NAME` varchar(200) NOT NULL COMMENT '执行quartz实例的主机名',
  `LAST_CHECKIN_TIME` bigint(13) NOT NULL COMMENT '实例将状态报告给集群中的其它实例的上一次时间',
  `CHECKIN_INTERVAL` bigint(13) NOT NULL COMMENT '实例间状态报告的时间频率',
  PRIMARY KEY (`SCHED_NAME`,`INSTANCE_NAME`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='存储少量的有关 Scheduler 的状态信息';

/*Table structure for table `es_qrtz_simple_triggers` */

DROP TABLE IF EXISTS `es_qrtz_simple_triggers`;

CREATE TABLE `es_qrtz_simple_triggers` (
  `SCHED_NAME` varchar(120) NOT NULL COMMENT '调度名',
  `TRIGGER_NAME` varchar(200) NOT NULL COMMENT '触发器名',
  `TRIGGER_GROUP` varchar(200) NOT NULL COMMENT '触发器组',
  `REPEAT_COUNT` bigint(7) NOT NULL COMMENT '重复次数',
  `REPEAT_INTERVAL` bigint(12) NOT NULL COMMENT '重复间隔',
  `TIMES_TRIGGERED` bigint(10) NOT NULL COMMENT '已触发次数',
  PRIMARY KEY (`SCHED_NAME`,`TRIGGER_NAME`,`TRIGGER_GROUP`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='存储简单的 Trigger，包括重复次数，间隔，以及已触的次数';

/*Table structure for table `es_qrtz_simprop_triggers` */

DROP TABLE IF EXISTS `es_qrtz_simprop_triggers`;

CREATE TABLE `es_qrtz_simprop_triggers` (
  `SCHED_NAME` varchar(120) NOT NULL COMMENT '调度名',
  `TRIGGER_NAME` varchar(200) NOT NULL COMMENT '触发器名',
  `TRIGGER_GROUP` varchar(200) NOT NULL COMMENT '触发器组',
  `STR_PROP_1` varchar(512) DEFAULT NULL COMMENT 'str参数1',
  `STR_PROP_2` varchar(512) DEFAULT NULL COMMENT 'str参数2',
  `STR_PROP_3` varchar(512) DEFAULT NULL COMMENT 'str参数3',
  `INT_PROP_1` int(11) DEFAULT NULL COMMENT 'int参数1',
  `INT_PROP_2` int(11) DEFAULT NULL COMMENT 'int参数2',
  `LONG_PROP_1` bigint(20) DEFAULT NULL COMMENT 'long参数1',
  `LONG_PROP_2` bigint(20) DEFAULT NULL COMMENT 'long参数2',
  `DEC_PROP_1` decimal(13,4) DEFAULT NULL COMMENT 'decimal参数1',
  `DEC_PROP_2` decimal(13,4) DEFAULT NULL COMMENT 'decimal参数2',
  `BOOL_PROP_1` varchar(1) DEFAULT NULL COMMENT 'bool参数1',
  `BOOL_PROP_2` varchar(1) DEFAULT NULL COMMENT 'bool参数2',
  PRIMARY KEY (`SCHED_NAME`,`TRIGGER_NAME`,`TRIGGER_GROUP`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Table structure for table `es_qrtz_triggers` */

DROP TABLE IF EXISTS `es_qrtz_triggers`;

CREATE TABLE `es_qrtz_triggers` (
  `SCHED_NAME` varchar(120) NOT NULL COMMENT '调度名',
  `TRIGGER_NAME` varchar(200) NOT NULL COMMENT '触发器名',
  `TRIGGER_GROUP` varchar(200) NOT NULL COMMENT '触发器组',
  `JOB_NAME` varchar(200) NOT NULL COMMENT 'job名',
  `JOB_GROUP` varchar(200) NOT NULL COMMENT 'job组',
  `DESCRIPTION` varchar(250) DEFAULT NULL COMMENT '描述',
  `NEXT_FIRE_TIME` bigint(13) DEFAULT NULL COMMENT '下次执行时间',
  `PREV_FIRE_TIME` bigint(13) DEFAULT NULL COMMENT '上次执行时间',
  `PRIORITY` int(11) DEFAULT NULL COMMENT '优先级',
  `TRIGGER_STATE` varchar(16) NOT NULL COMMENT '触发器状态',
  `TRIGGER_TYPE` varchar(8) NOT NULL COMMENT '触发器类型',
  `START_TIME` bigint(13) NOT NULL COMMENT '开始时间',
  `END_TIME` bigint(13) DEFAULT NULL COMMENT '结束时间',
  `CALENDAR_NAME` varchar(200) DEFAULT NULL COMMENT 'calendar名',
  `MISFIRE_INSTR` smallint(2) DEFAULT NULL COMMENT 'misfire',
  `JOB_DATA` blob COMMENT 'job数据',
  PRIMARY KEY (`SCHED_NAME`,`TRIGGER_NAME`,`TRIGGER_GROUP`),
  KEY `IDX_QRTZ_T_J` (`SCHED_NAME`,`JOB_NAME`,`JOB_GROUP`),
  KEY `IDX_QRTZ_T_JG` (`SCHED_NAME`,`JOB_GROUP`),
  KEY `IDX_QRTZ_T_C` (`SCHED_NAME`,`CALENDAR_NAME`),
  KEY `IDX_QRTZ_T_STATE` (`SCHED_NAME`,`TRIGGER_STATE`),
  KEY `IDX_QRTZ_T_N_STATE` (`SCHED_NAME`,`TRIGGER_NAME`,`TRIGGER_GROUP`,`TRIGGER_STATE`),
  KEY `IDX_QRTZ_T_N_G_STATE` (`SCHED_NAME`,`TRIGGER_GROUP`,`TRIGGER_STATE`),
  KEY `IDX_QRTZ_T_NEXT_FIRE_TIME` (`SCHED_NAME`,`NEXT_FIRE_TIME`),
  KEY `IDX_QRTZ_T_NFT_ST` (`SCHED_NAME`,`TRIGGER_STATE`,`NEXT_FIRE_TIME`),
  KEY `IDX_QRTZ_T_NFT_MISFIRE` (`SCHED_NAME`,`MISFIRE_INSTR`,`NEXT_FIRE_TIME`),
  KEY `IDX_QRTZ_T_NFT_ST_MISFIRE` (`SCHED_NAME`,`MISFIRE_INSTR`,`NEXT_FIRE_TIME`,`TRIGGER_STATE`),
  KEY `IDX_QRTZ_T_NFT_ST_MISFIRE_GRP` (`SCHED_NAME`,`MISFIRE_INSTR`,`NEXT_FIRE_TIME`,`TRIGGER_GROUP`,`TRIGGER_STATE`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='存储已配置的 Trigger 的信息';

/*Table structure for table `es_query_client_collection` */

DROP TABLE IF EXISTS `es_query_client_collection`;

CREATE TABLE `es_query_client_collection` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT 'id',
  `name` varchar(50) DEFAULT NULL COMMENT '收藏名称',
  `cluster_name` varchar(50) DEFAULT NULL COMMENT '集群名称',
  `require_url` varchar(256) DEFAULT NULL COMMENT '请求链接',
  `require_method` varchar(20) DEFAULT NULL COMMENT '请求方式',
  `require_content` text COMMENT '请求内容',
  `user_name` varchar(100) DEFAULT NULL COMMENT '用户名',
  `state` tinyint(10) DEFAULT '1' COMMENT '状态 1有效 0无效',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COMMENT='客户端工具收藏表';

/*Table structure for table `es_query_collection` */

DROP TABLE IF EXISTS `es_query_collection`;

CREATE TABLE `es_query_collection` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT 'id',
  `name` varchar(50) DEFAULT NULL COMMENT '收藏名称',
  `cluster_name` varchar(50) DEFAULT NULL COMMENT '集群名称',
  `index` varchar(100) DEFAULT NULL COMMENT '索引',
  `count` int(11) DEFAULT NULL COMMENT '条数',
  `user_name` varchar(100) DEFAULT NULL COMMENT '用户名',
  `state` tinyint(10) DEFAULT '1' COMMENT '状态 1有效 0无效',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='收藏主表';

/*Table structure for table `es_query_collection_subs` */

DROP TABLE IF EXISTS `es_query_collection_subs`;

CREATE TABLE `es_query_collection_subs` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT 'id',
  `qc_id` bigint(20) NOT NULL COMMENT 'query_collection 的id',
  `logic_condition` varchar(20) DEFAULT NULL COMMENT '与或非逻辑条件',
  `logic_val` varchar(100) DEFAULT NULL COMMENT '选择字段',
  `condition` varchar(20) DEFAULT NULL COMMENT '条件',
  `con_val` varchar(100) DEFAULT NULL COMMENT '文本条件',
  `con_gt` varchar(20) DEFAULT NULL COMMENT '大于 或 大于等于',
  `con_lt` varchar(20) DEFAULT NULL COMMENT '小于',
  `con_gt_time` varchar(20) DEFAULT NULL COMMENT '大于的时间点',
  `con_lt_time` varchar(20) DEFAULT NULL COMMENT '小于的时间点',
  `level` int(11) DEFAULT NULL COMMENT '排序',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='收藏条件子表';

/*Table structure for table `es_thread_pool_log` */

DROP TABLE IF EXISTS `es_thread_pool_log`;

CREATE TABLE `es_thread_pool_log` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键',
  `cluster_id` bigint(20) DEFAULT NULL COMMENT '集群id',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `host` varchar(20) DEFAULT NULL COMMENT '主机ip',
  `thread_type` varchar(20) DEFAULT NULL COMMENT '线程类型',
  `active` int(11) DEFAULT NULL COMMENT '活跃数量',
  `completed` bigint(20) DEFAULT NULL COMMENT '完成数量',
  `interval_completed` int(11) DEFAULT NULL COMMENT '区间完成数量',
  `intervalRejected` int(11) DEFAULT NULL COMMENT '区间拒绝数量',
  `largest` int(11) DEFAULT NULL COMMENT '大量',
  `queue` int(11) DEFAULT NULL COMMENT '队列数量',
  `rejected` bigint(20) DEFAULT NULL COMMENT '拒绝数量',
  `threads` int(11) DEFAULT NULL COMMENT '线程数量',
  PRIMARY KEY (`id`),
  KEY `idx_cluster_id` (`cluster_id`),
  KEY `idx_host` (`host`)
) ENGINE=InnoDB AUTO_INCREMENT=62684007 DEFAULT CHARSET=utf8 COMMENT='thread_pool收集信息表';

/*Table structure for table `es_transport_log` */

DROP TABLE IF EXISTS `es_transport_log`;

CREATE TABLE `es_transport_log` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键',
  `cluster_id` bigint(20) DEFAULT NULL COMMENT '集群id',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `host` varchar(20) DEFAULT NULL COMMENT '主机ip',
  `rx_count` bigint(20) DEFAULT NULL COMMENT 'rx数量',
  `rx_size` varchar(20) DEFAULT NULL COMMENT 'rx大小',
  `server_open` bigint(20) DEFAULT NULL COMMENT '服务打开数量',
  `rx_size_in_bytes` bigint(20) DEFAULT NULL COMMENT 'rx 按照 byte字节 大小',
  `tx_count` bigint(20) DEFAULT NULL COMMENT 'tx数量',
  `tx_size` varchar(20) DEFAULT NULL COMMENT 'tx大小',
  `tx_size_in_bytes` bigint(20) DEFAULT NULL COMMENT 'tx用byte 大小',
  PRIMARY KEY (`id`),
  KEY `idx_cluster_id` (`cluster_id`),
  KEY `idx_host` (`host`)
) ENGINE=InnoDB AUTO_INCREMENT=4102789 DEFAULT CHARSET=utf8 COMMENT='transport 收集信息表';

/*Table structure for table `es_user_info` */

DROP TABLE IF EXISTS `es_user_info`;

CREATE TABLE `es_user_info` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键',
  `user_name` varchar(100) NOT NULL COMMENT '用户名',
  `user_email` varchar(50) NOT NULL COMMENT '邮箱',
  `user_pwd` varchar(50) DEFAULT NULL COMMENT '密码',
  `product_line` varchar(100) DEFAULT NULL COMMENT '所属产品线',
  `es_account` varchar(100) DEFAULT NULL COMMENT 'es账户',
  `es_pwd` varchar(100) DEFAULT NULL COMMENT 'es账户密码',
  `role` tinyint(4) NOT NULL COMMENT '角色',
  `state` tinyint(4) DEFAULT NULL COMMENT '状态',
  `operate_time` datetime DEFAULT NULL COMMENT '操作时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=165 DEFAULT CHARSET=utf8 COMMENT='用户管理';

