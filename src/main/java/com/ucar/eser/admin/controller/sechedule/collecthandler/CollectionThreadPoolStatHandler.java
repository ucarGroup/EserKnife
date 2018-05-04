package com.ucar.eser.admin.controller.sechedule.collecthandler;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.ucar.eser.admin.service.influxdbandmysql.ThreadPoolService;
import com.ucar.eser.core.bean.po.ClusterInfo;
import com.ucar.eser.core.bean.vo.stat.NodeThreadPoolStatInfo;
import com.ucar.eser.core.init.SpringInit;
import com.ucar.eser.core.jest.JestManager;
import com.ucar.eser.core.util.DateUtil;
import com.ucar.eser.core.util.InflusDbUtil;
import com.ucar.eser.core.util.async.KeyCallable;
import com.ucar.eser.core.util.common.Constant;
import org.apache.commons.collections.CollectionUtils;
import org.influxdb.dto.QueryResult;
import org.influxdb.impl.TimeUtil;

import java.util.*;
import java.util.Map.Entry;

/**
 * 
 * Description: 收集线程池信息执行器
 * All Rights Reserved.
 * Created on 2016-9-26 下午12:04:13
 */
public class CollectionThreadPoolStatHandler extends KeyCallable<Boolean> {
	

	private ThreadPoolService threadPoolService = (ThreadPoolService) SpringInit.getApplicationContext().getBean("threadPoolServiceImpl");
	
	private JSONObject data;
	
	private String clusterName;
	
	private Date executeTime;

	public CollectionThreadPoolStatHandler(String key, String clusterName, JSONObject data, Date executeTime) {
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
			List<NodeThreadPoolStatInfo> statList = new ArrayList<NodeThreadPoolStatInfo>();
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
			    JSONObject threadPool = node.getJSONObject(Constant.THREAD_POOL);
			    Iterator<Entry<String,Object>> threadPoolItor = threadPool.entrySet().iterator();
				Map<String,NodeThreadPoolStatInfo> lastThread;
				if(InflusDbUtil.FLAG){
					lastThread= getLastStatInfoFromInfluxDb(host);
				}else{
					NodeThreadPoolStatInfo param = new NodeThreadPoolStatInfo();
					param.setHost(host);
					param.setCreateTime(DateUtil.getDiffTime(executeTime, Calendar.MINUTE, -2));
					lastThread= getLastStatInfoFromMysql(param);
				}
			    while(threadPoolItor.hasNext()) {
			    	Entry<String,Object> threadEntry = threadPoolItor.next();
			    	String threadType = threadEntry.getKey();
			    	NodeThreadPoolStatInfo lastInfo = lastThread.get(threadType);
			    	NodeThreadPoolStatInfo statInfo = JSONObject.parseObject(threadEntry.getValue().toString(), NodeThreadPoolStatInfo.class);
			    	statInfo.setHost(host);
					statInfo.setClusterId(clusterInfo.getId());
			    	statInfo.setClusterName(clusterName);
			    	statInfo.setThreadType(threadType);
			    	statInfo.setServerCollectTime(serverCollectTime);
			    	statInfo.setCreateTime(executeTime);
			    	if(lastInfo == null) {
			    		statInfo.setIntervalCompleted(0);
			    		statInfo.setIntervalRejected(0);
			    	}else {
			    		//es服务端重启后所有统计值将会清零，会造成上一个点的统计值大于当前值，目前采取的措施是，默认启动后的第一个点统计值为当前汇总值
			    		if(lastInfo.getCompleted() == null) {
			    			statInfo.setIntervalCompleted(0);
			    		}else {
			    			Long intervalCompleted = statInfo.getCompleted() - lastInfo.getCompleted();
			    			if(intervalCompleted < 0) {
			    				intervalCompleted = statInfo.getCompleted();
			    			}
			    			statInfo.setIntervalCompleted(intervalCompleted.intValue());
			    		}
			            if(lastInfo.getRejected() == null) {
			            	statInfo.setIntervalRejected(0);
			    		}else {
			    			Long intervalRejected = statInfo.getRejected() - lastInfo.getRejected();
			    			if(intervalRejected < 0) {
			    				intervalRejected = statInfo.getRejected();
			    			}
			    			statInfo.setIntervalRejected(intervalRejected.intValue());
			    		}
			    	}
					statList.add(statInfo);
			    }
			}
			threadPoolService.batchInsert(statList);
		} catch (Exception e) {
			LOGGER.error(clusterName+"线程统计信息异常(threadpool)", e);
		}
		return true;
	}


	private Map<String,NodeThreadPoolStatInfo> getLastStatInfoFromMysql(NodeThreadPoolStatInfo param){
		Map<String,NodeThreadPoolStatInfo> lastThread = new HashMap<String,NodeThreadPoolStatInfo>();
		List<NodeThreadPoolStatInfo> nodeThreadPoolStatInfos = threadPoolService.getNodeThreadPoolStatInfos(param);
		if(CollectionUtils.isNotEmpty(nodeThreadPoolStatInfos)){
			for (NodeThreadPoolStatInfo nodeThreadPoolStatInfo : nodeThreadPoolStatInfos) {
				lastThread.put(nodeThreadPoolStatInfo.getThreadType(), nodeThreadPoolStatInfo);
			}
		}
		return lastThread;
	}

	
	private Map<String,NodeThreadPoolStatInfo> getLastStatInfoFromInfluxDb(String host) {
		Map<String,NodeThreadPoolStatInfo> lastThread = new HashMap<String,NodeThreadPoolStatInfo>();
		try {
			NodeThreadPoolStatInfo statInfo = new NodeThreadPoolStatInfo();
			statInfo.setClusterName(clusterName);
			statInfo.setHost(host);
			String query="select active, clusterName, completed, host, intervalCompleted, " +
					"intervalRejected, largest, queue, rejected, threadType, threads from thread_pool WHERE time >= '"+
					TimeUtil.toInfluxDBTimeFormat(DateUtil.getDiffTime(executeTime, Calendar.MINUTE, -1).getTime())+"' and " +
					"host ='"+host+"' and clusterName = '"+clusterName+"' order by time ";
			QueryResult queryResult = InflusDbUtil.query(query);
			List<QueryResult.Result> results = queryResult.getResults();
			query(lastThread, results);
		} catch (Exception e) {
			LOGGER.error(host+":从数据库中获取上一条失败！(threadpool)",e);
		}
		return lastThread;
	}

	private void query(Map<String, NodeThreadPoolStatInfo> lastThread, List<QueryResult.Result> results) {
		Map<String,Map<String,Object>> mm = new HashMap<String, Map<String, Object>>();
		Map<String,Object> map = new HashMap<String, Object>();
		List<QueryResult.Series> series;
		List<String> columns;
		List<List<Object>> valus;
		if(CollectionUtils.isNotEmpty(results)){
            for (QueryResult.Result result : results) {
                series = result.getSeries();
                if(CollectionUtils.isNotEmpty(series)){
                    for (QueryResult.Series serie: series) {
                        columns=serie.getColumns();
                        valus = serie.getValues();
                        if(CollectionUtils.isNotEmpty(columns) && CollectionUtils.isNotEmpty(valus)){
                            for (List<Object> valu: valus) {
                                if(CollectionUtils.isNotEmpty(valu)){
                                    for (Integer i = 0;i<valu.size();i++){
                                        if(!columns.get(i).equals("time")){//过滤time字段
                                                map.put(columns.get(i),valu.get(i));
                                        }
                                    }
                                    mm.put((String) map.get("threadType"),map);
                                }
                            }
                        }
                    }
                }
            }
            if(mm.size() > 0){
                Iterator<Entry<String, Map<String, Object>>> mmIte = mm.entrySet().iterator();
                NodeThreadPoolStatInfo threadPoolStatInfo;
                while (mmIte.hasNext()) {
                    Entry<String, Map<String, Object>> re = mmIte.next();
                    JSON json = (JSON) JSONObject.toJSON(re.getValue());
                    threadPoolStatInfo = JSONObject.toJavaObject(json,NodeThreadPoolStatInfo.class);
                    lastThread.put(re.getKey(),threadPoolStatInfo);
                }
            }
        }
	}

}
