package com.ucar.eser.admin.controller.sechedule.alarm;

import com.alibaba.fastjson.JSONObject;
import com.ucar.eser.core.bean.vo.alarm.AlarmParameterVo;
import com.ucar.eser.core.bean.vo.alarm.AlarmRule;
import com.ucar.eser.core.util.common.Constant;

import java.util.List;
import java.util.Map.Entry;

/**
 * 
 * Description: 集群节点指标报警
 * All Rights Reserved.
 */
public class ClusterNodeAlarm extends AbstractAlarm {
	
	private String ALARM_TITLE;
	
	private JSONObject data;

	private String clusterName;

	public ClusterNodeAlarm(String key, String clusterName, JSONObject data, List<AlarmRule> list) {
		super(clusterName,data,list,key);
		this.data = data;
		this.clusterName = clusterName;
		ALARM_TITLE = "es集群节点指标报警";
	}

	@Override
	public Boolean execute() {
		try {
			checkNode();
			return true;
		} catch (Exception e) {
			LOGGER.error(clusterName+",节点检查异常", e);
		}
		return false;
	}
	
	
    private void checkNode() throws Exception {
    	//从服务端获取集群健康信息
    	if(data == null) {
    		return;
    	}
    	//解析服务端返回的结果
		JSONObject nodesObject = data.getJSONObject(Constant.NODES);
		for (Entry<String, Object> entry : nodesObject.entrySet()) {
			JSONObject node = (JSONObject) entry.getValue();
			String host = node.getString(Constant.NODE_HOST);
			AlarmParameterVo alarmParameterVo = new AlarmParameterVo(host, null, null, null, null, ALARM_TITLE);
			alarmCheck(alarmParameterVo);
		}
    }
}
