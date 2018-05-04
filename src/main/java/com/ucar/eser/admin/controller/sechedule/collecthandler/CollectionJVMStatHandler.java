package com.ucar.eser.admin.controller.sechedule.collecthandler;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.ucar.eser.admin.service.influxdbandmysql.JvmService;
import com.ucar.eser.core.bean.po.ClusterInfo;
import com.ucar.eser.core.bean.vo.stat.NodeJVMStatInfo;
import com.ucar.eser.core.init.SpringInit;
import com.ucar.eser.core.jest.JestManager;
import com.ucar.eser.core.util.DateUtil;
import com.ucar.eser.core.util.InflusDbUtil;
import com.ucar.eser.core.util.JsonUtil;
import com.ucar.eser.core.util.async.KeyCallable;
import com.ucar.eser.core.util.common.Constant;
import org.apache.commons.collections.CollectionUtils;
import org.influxdb.dto.QueryResult;

import java.util.*;
import java.util.Map.Entry;

/**
 * 
 * Description: 收集jvm信息执行器
 * All Rights Reserved.
 * Created on 2016-9-26 下午12:04:13
 */
public class CollectionJVMStatHandler extends KeyCallable<Boolean> {

	private JvmService jvmService = (JvmService) SpringInit.getApplicationContext().getBean("jvmServiceImpl");
	
	private JSONObject data;
	
	private String clusterName;
	
	private Date executeTime;

	public CollectionJVMStatHandler(String key, String clusterName, JSONObject data, Date executeTime) {
		super(key);
		this.data = data;
		this.clusterName = clusterName;
		this.executeTime = executeTime;
	}

	@Override
	public Boolean execute() {
		try {
			JSONObject nodesObject = data.getJSONObject(Constant.NODES);
			Iterator<Entry<String,Object>> nodeItor = nodesObject.entrySet().iterator();
			List<NodeJVMStatInfo> list = new ArrayList<NodeJVMStatInfo>();
			ClusterInfo clusterInfo = JestManager.CLUSTER_MAP.get(clusterName);
			while(nodeItor.hasNext()) {
				Entry<String,Object> entry = nodeItor.next();
				JSONObject node = (JSONObject) entry.getValue();
				String host = node.getString(Constant.NODE_HOST);
				Date serverCollectTime = executeTime;
				Long timestamp = node.getLong(Constant.TIMESTAMP);
				if(timestamp != null) {
					serverCollectTime = new Date(timestamp);
				}
				NodeJVMStatInfo statInfo = new NodeJVMStatInfo();
			    JSONObject jvmObj = node.getJSONObject(Constant.JVM_NAME);
			    JSONObject mem = jvmObj.getJSONObject(Constant.JVM_MEM);
				statInfo.setHeapUsedInBytes(mem.getLong(Constant.HEAP_USED_IN_BYTES));
				statInfo.setHeapUsedPercent(mem.getLong(Constant.HEAP_USED_PERCENT));
				statInfo.setHeapMaxInBytes(mem.getLong(Constant.HEAP_MAX_IN_BYTES));
				statInfo.setHeapCommittedInBytes(mem.getLong(Constant.HEAP_COMMITTED_IN_BYTES));
				statInfo.setNonHeapUsedInBytes(mem.getLong(Constant.NON_HEAP_USED_IN_BYTES));
				statInfo.setNonHeapCommittedInBytes(mem.getLong(Constant.NON_HEAP_COMMITTED_IN_BYTES));

				JSONObject threads = jvmObj.getJSONObject(Constant.THREADS);
				statInfo.setThreadsCount(threads.getLong(Constant.THREADS_COUNT));
				statInfo.setThreadsPeakCount(threads.getLong(Constant.THREADS_PEAK_COUNT));

			    JSONObject oldObject = (JSONObject) JsonUtil.getValueByPath(mem, Constant.HEAP_OLD);
				statInfo.setOldMemUsed(oldObject != null ? oldObject.getLongValue(Constant.POOLS_MEM_USED) : 0);
			    statInfo.setOldMemMax(oldObject != null ? oldObject.getLongValue(Constant.POOLS_MEM_MAX) : 0);

			    JSONObject youngObject = (JSONObject) JsonUtil.getValueByPath(mem, Constant.HEAP_YOUNG);
			    statInfo.setYoungMemMax(youngObject != null ? youngObject.getLongValue(Constant.POOLS_MEM_MAX) : 0);
			    statInfo.setYoungMemUsed(youngObject != null ? youngObject.getLongValue(Constant.POOLS_MEM_USED) : 0);

			    JSONObject old = (JSONObject) JsonUtil.getValueByPath(jvmObj, Constant.COLLECTORS_OLD);
				statInfo.setOldCollectionCount(old != null ? old.getLongValue(Constant.COLLECTION_COUNT) : 0);
				statInfo.setOldCollectionTime(old != null ? old.getLongValue(Constant.COLLECTION_TIME) : 0);

				JSONObject young = (JSONObject) JsonUtil.getValueByPath(jvmObj, Constant.COLLECTORS_YOUNG);
				statInfo.setYoungCollectionCount(young != null ? young.getLongValue(Constant.COLLECTION_COUNT) : 0);
				statInfo.setYongCollectionTime(young != null ? young.getLongValue(Constant.COLLECTION_TIME) : 0);

				JSONObject direct = (JSONObject) JsonUtil.getValueByPath(jvmObj, Constant.BUFFER_POOLS_DIRECT);
				statInfo.setBufferPoolsDirectTotalCapacity(direct != null ? direct.getLongValue(Constant.BUFFER_POOLS_SUB_TOTAL) : 0);
				statInfo.setBufferPoolsDirectCount(direct != null ? direct.getLongValue(Constant.BUFFER_POOLS_SUB_COUNT) : 0);
				statInfo.setBufferPoolsDirectUsed(direct != null ? direct.getLongValue(Constant.BUFFER_POOLS_SUB_USED) : 0);

				JSONObject mapped = (JSONObject) JsonUtil.getValueByPath(jvmObj, Constant.BUFFER_POOLS_MAPPED);
				statInfo.setBufferPoolsMappedTotalCapacity(mapped != null ? mapped.getLongValue(Constant.BUFFER_POOLS_SUB_TOTAL) : 0);
				statInfo.setBufferPoolsMappedCount(mapped != null ? mapped.getLongValue(Constant.BUFFER_POOLS_SUB_COUNT) : 0);
				statInfo.setBufferPoolsMappedUserd(mapped != null ? mapped.getLongValue(Constant.BUFFER_POOLS_SUB_USED) : 0);

				NodeJVMStatInfo lastInfo;
				if(InflusDbUtil.FLAG){
					lastInfo = getLastStatInfoFromDB(host);
				}else{
					lastInfo = getLastStatInfoFromMysql(host,clusterInfo.getId(),executeTime);
				}
				if(lastInfo == null) {
	    			statInfo.setIntervalOldCollectionCount(0L);
	    			statInfo.setIntervalOldCollectionTime(0L);
					statInfo.setIntervalYoungCollectionCount(0L);
					statInfo.setIntervalYoungCollectionTime(0L);
	    		}else {
	    			//es服务端重启后所有统计值将会清零，会造成上一个点的统计值大于当前值，目前采取的措施是，默认启动后的第一个点统计值为当前汇总值
	    			if(lastInfo.getOldCollectionCount() == null || lastInfo.getOldCollectionTime() == null) {
	    				statInfo.setIntervalOldCollectionCount(0L);
		    			statInfo.setIntervalOldCollectionTime(0L);
						statInfo.setIntervalYoungCollectionCount(0L);
						statInfo.setIntervalYoungCollectionTime(0L);
	    			}else {
	    				Long intervalTotal = statInfo.getOldCollectionCount() - lastInfo.getOldCollectionCount();
	    				Long intervalTime = statInfo.getOldCollectionTime() - lastInfo.getOldCollectionTime();
						Long intervalYoungTotal = statInfo.getYoungCollectionCount() - lastInfo.getYoungCollectionCount();
						Long intervalYoungTime = statInfo.getYongCollectionTime() - lastInfo.getYongCollectionTime();
	    				if(intervalTotal < 0 || intervalTime < 0) {
	    					intervalTotal = statInfo.getOldCollectionCount();
	    					intervalTime = statInfo.getOldCollectionTime();
	    				}
						if(intervalYoungTotal <0||intervalYoungTime<0){
							intervalYoungTotal = statInfo.getYoungCollectionCount();
							intervalYoungTime = statInfo.getYongCollectionTime();
						}
	    				statInfo.setIntervalOldCollectionCount(intervalTotal);
	    				statInfo.setIntervalOldCollectionTime(intervalTime);
						statInfo.setIntervalYoungCollectionCount(intervalYoungTotal);
						statInfo.setIntervalYoungCollectionTime(intervalYoungTime);
	    			}
	    		}
			    statInfo.setClusterName(clusterName);
			    statInfo.setHost(host);
			    statInfo.setCollectTime(serverCollectTime);
			    statInfo.setExecuteTime(executeTime);
				statInfo.setCreateTime(executeTime);
				statInfo.setClusterId(clusterInfo.getId());
			    list.add(statInfo);
			}
			jvmService.batchInsert(list);
		} catch (Exception e) {
			LOGGER.error(clusterName+"统计信息异常(jvm)", e);
		}
		return true;
	}

	private NodeJVMStatInfo getLastStatInfoFromMysql(String host, Long id,Date time) {
		NodeJVMStatInfo paramInfo = new NodeJVMStatInfo();
		paramInfo.setClusterId(id);
		paramInfo.setHost(host);
		paramInfo.setCreateTime(DateUtil.getDiffTime(time, Calendar.MINUTE, -2));
		return jvmService.getLastByParams(paramInfo);
	}


	private NodeJVMStatInfo getLastStatInfoFromDB(String host) {
		NodeJVMStatInfo statInfo = new NodeJVMStatInfo();
		try {
			String qstr = "select host,clusterName,oldMemUsed,oldMemMax,youngMemMax,youngMemUsed," +
					"oldCollectionCount,oldCollectionTime from jvm where host='"+host+"' and clusterName='"+clusterName+"'" +
					" order by time desc limit 1";
			QueryResult result = InflusDbUtil.query(qstr);
			Map<String,Object> map = new HashMap<String, Object>();
			if(result != null){
				List<QueryResult.Result> results = result.getResults();
				if(CollectionUtils.isNotEmpty(results)){
					for (QueryResult.Result res : results){
							List<String> columns = res.getSeries().get(0).getColumns();
							List<List<Object>> values = res.getSeries().get(0).getValues();
							if(CollectionUtils.isNotEmpty(values)){
								for (List<Object> value:values) {
									for (int i =0;i<value.size();i++){
										map.put(columns.get(i),value.get(i));
									}
								}
							}
					}
				}
			}
			if(map.size() > 0){
				JSON json = (JSON) JSONObject.toJSON(map);
				statInfo = JSONObject.toJavaObject(json,NodeJVMStatInfo.class);
			}
		} catch (Exception e) {
			LOGGER.error(host+":从数据库中获取上一条失败(jvm)！",e);
			return null;
		}
		return statInfo;
	}
}
