package com.ucar.eser.admin.controller.sechedule.alarm;

import com.alibaba.fastjson.JSONObject;
import com.ucar.eser.admin.service.alarm.AlarmRuleService;
import com.ucar.eser.core.bean.vo.alarm.AlarmRule;
import com.ucar.eser.core.bean.vo.stat.ClusterHealthVo;
import com.ucar.eser.core.bean.vo.stat.NodeCommonStatInfo;
import com.ucar.eser.core.init.SpringInit;
import com.ucar.eser.core.util.ConfigUtil;
import com.ucar.eser.core.util.DateUtil;
import com.ucar.eser.core.util.InflusDbUtil;
import com.ucar.eser.core.util.async.KeyCallable;
import com.ucar.eser.core.util.message.MailClient;
import org.influxdb.dto.QueryResult;

import java.util.HashMap;
import java.util.Map;

/**
 *
 * Description: 集群健康检测报警
 * All Rights Reserved.
 */
public class HealthAlarm extends KeyCallable<Boolean> {

	private AlarmRuleService alarmRuleService = (AlarmRuleService) SpringInit.getApplicationContext().getBean("alarmRuleServiceImpl");

	private String ALARM_TITLE;

	private static Map<String,Object> alarmContinueMap;

	private QueryResult oldData;

	private String newData;

	private String clusterName;

	private NodeCommonStatInfo nodeCommonStatInfo;


	private Integer redAlarmInterval;

	private Integer yellowAlarmInterval;

	public HealthAlarm(String key, String clusterName, String newResult, QueryResult oldResult,NodeCommonStatInfo nodeCommonStatInfo) {
		super(key);
		this.newData = newResult;
		this.oldData = oldResult;
		this.clusterName = clusterName;
		this.nodeCommonStatInfo = nodeCommonStatInfo;
		ALARM_TITLE = "es集群健康报警";
		redAlarmInterval = 1*60*1000;
		yellowAlarmInterval = 5*60*1000;
	}

	@Override
	public Boolean execute() {
		try {
			checkClusterHealth();
			return true;
		} catch (Exception e) {
			LOGGER.error(clusterName+",健康检查异常", e);
		}
		return false;
	}
	
	
	 /**
     * 
     * Description: 检查集群健康度
     */
    private void checkClusterHealth() throws Exception {
    	//从服务端获取集群健康信息
    	if(newData == null) {
    		return;
    	}
		AlarmRule alarmRule = alarmRuleService.getAlarmRuleByClusterName(clusterName);
		if(alarmRule == null) {
			return;
		}
    	//解析服务端返回的结果
    	ClusterHealthVo healthVo = JSONObject.parseObject(newData, ClusterHealthVo.class);
		String title = String.format("【ESER】%s,【集群:%s】", ConfigUtil.I.envTypeName(), clusterName);
		String healthState = healthVo.getStatus();
		//解析influxdb数据库数据
		String oldHealthState =null;
		if(InflusDbUtil.FLAG){
			Map<String,Object> statMap = InflusDbUtil.query(oldData,0,0,1);
			if(statMap != null){
				oldHealthState = (String) statMap.get("result");
			}
		}else{
			oldHealthState= nodeCommonStatInfo.getClusterStatus();
		}
		if("green".equals(healthState)) {
			if(oldHealthState != null && !oldHealthState.equals("green")) {
				String content = title+"恢复正常";
				MailClient.sendMessage(null,content,ALARM_TITLE);
			}
			if(alarmContinueMap != null){
				alarmContinueMap.put("yellowcount"+clusterName,null);
				alarmContinueMap.put("yellowcheckTime"+clusterName,null);
				alarmContinueMap.put("redcount"+clusterName,null);
				alarmContinueMap.put("redcheckTime"+clusterName,null);
			}
			return;
		}
		Integer count = 1;
		if( alarmContinueMap != null && alarmContinueMap.get(healthState+"count"+clusterName) != null){
			count += (Integer) alarmContinueMap.get(healthState+"count"+clusterName);
		}else{
			alarmContinueMap = new HashMap<String, Object>();
		}
		StringBuilder alarmMsg = new StringBuilder(title+"当前状态为："+healthVo.getStatus() +"，此为第"+count+"次报警");
		//若前后两次状态一致，则进行持续时间检测
		Map<String,Object> timeMap = new HashMap<String, Object>();
		if(InflusDbUtil.FLAG){
			timeMap =InflusDbUtil.query(oldData,0,0,2);
		}else{
			timeMap.put("result", DateUtil.formatYYYYMMddHHMMSS(nodeCommonStatInfo.getCreateTime()));
		}
		if(oldHealthState != null && healthState.equals(oldHealthState)) {
			String oldCheckTimeStr = checkTimeInit(healthState, timeMap);
			Long oldCheckTime = DateUtil.parse(oldCheckTimeStr,"yyyy-MM-dd HH:mm:ss").getTime();
			long diff = healthVo.getCheckTime() - oldCheckTime;

			//若为第一次变为异常状态，则直接报警，否则只在持续一定时间再次报警
			if("yellow".equals(healthState)){
				if(2*diff/yellowAlarmInterval < count*(count - 1)) {
					return;
				}
			}else if("red".equals(healthState)){
				if(2*diff/redAlarmInterval < count*(count - 1)) {
					return;
				}
			}
			String str = ",此状态已持续"+diff+"毫秒";
			alarmMsg.append(str);
			alarmContinueMap.put(healthState+"count"+clusterName,count);
		}else{
			alarmContinueMap.put(healthState+"count"+clusterName,count);
			checkTimeInit(healthState, timeMap);
		}
		alarmMsg.append("<br>");
		alarmMsg.append("正在初始化的分片数：");
		alarmMsg.append(healthVo.getInitializing_shards());
		alarmMsg.append("，正在重新迁移的分片数：");
		alarmMsg.append(healthVo.getRelocating_shards());
		alarmMsg.append("，未分配的分片数：");
		alarmMsg.append(healthVo.getUnassigned_shards());

		MailClient.sendMessage(null,alarmMsg.toString(),ALARM_TITLE,ConfigUtil.I.envType());
	}

	private String checkTimeInit(String healthState, Map<String, Object> timeMap) {
		String oldCheckTimeStr;
		if(alarmContinueMap.get(healthState+"checkTime"+clusterName) != null ){
            oldCheckTimeStr = (String) alarmContinueMap.get(healthState+"checkTime"+clusterName);
        }else{
            oldCheckTimeStr= (String) timeMap.get("result");
            alarmContinueMap.put(healthState+"checkTime"+clusterName,oldCheckTimeStr);
        }
		return oldCheckTimeStr;
	}

}

