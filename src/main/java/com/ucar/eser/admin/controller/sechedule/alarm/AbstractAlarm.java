package com.ucar.eser.admin.controller.sechedule.alarm;



import com.alibaba.fastjson.JSONObject;
import com.ucar.eser.admin.service.alarm.AlarmRuleService;
import com.ucar.eser.core.bean.vo.alarm.AlarmParameterVo;
import com.ucar.eser.core.bean.vo.alarm.AlarmResult;
import com.ucar.eser.core.bean.vo.alarm.AlarmRule;
import com.ucar.eser.core.init.SpringInit;
import com.ucar.eser.core.util.ConfigUtil;
import com.ucar.eser.core.util.InflusDbUtil;
import com.ucar.eser.core.util.async.KeyCallable;
import com.ucar.eser.core.util.common.AlarmConstant;
import com.ucar.eser.core.util.message.MailClient;
import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.influxdb.dto.QueryResult;
import org.influxdb.impl.TimeUtil;

import java.text.MessageFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


/**
 * 
 * Description: 报警工具类
 * All Rights Reserved.
 */
public abstract class AbstractAlarm extends KeyCallable<Boolean> {

	private AlarmRuleService alarmRuleService = (AlarmRuleService) SpringInit.getApplicationContext().getBean("alarmRuleServiceImpl");

	private String clusterName;

	protected JSONObject data;

	protected List<AlarmRule> ruleList;

	private static Map<String,Object> alramMap=new HashMap<String,Object>();

	private Integer alarmInterval;

	private Integer maxAlarmInterval;

    public AbstractAlarm(String clusterName, JSONObject data, List<AlarmRule> list, String key) {
		super(key);
		this.clusterName = clusterName;
		this.data = data;
		this.ruleList = list;
		alarmInterval = 2*60*1000;
		maxAlarmInterval = 12*60*60*1000;
	}

	public  void alarmCheck(AlarmParameterVo alarmParameterVo) {
		try {
			if(CollectionUtils.isEmpty(ruleList)) {
				return;
			}
			if(InflusDbUtil.FLAG){
				Long nowDate = System.currentTimeMillis();
				for(AlarmRule alarmRule : ruleList){
					String sql = null;
					String starTime=TimeUtil.toInfluxDBTimeFormat(nowDate-60 * 1000);
					if(alarmRule.getFrequency() != null){
						starTime =TimeUtil.toInfluxDBTimeFormat(nowDate-Integer.valueOf(alarmRule.getFrequency())*60*1000);
					}
					String endTime = TimeUtil.toInfluxDBTimeFormat(nowDate);
					if(alarmRule.getLatitude().equals(AlarmConstant.AlarmLatitudeEnum.JVM.getName())){
						if(alarmRule.getLatitudeSub().equals(AlarmConstant.AlarmLatitudeSubSplitEnum.JVM_OLD_MEM_USED.getName())){
							sql = "select oldMemUsed/oldMemMax*100 as result  from jvm " +
									"where clusterName = "+ clusterName+" and host = '"+alarmParameterVo.getHost()+"' and time >='"+starTime+"' and time <= '"+endTime+"'";
							alarmParameterVo.setPattern(AlarmConstant.JVM_OLD_ALARM_TEMPLATE);
						}else if(alarmRule.getLatitudeSub().equals(AlarmConstant.AlarmLatitudeSubSplitEnum.JVM_YONG_MEM_USED.getName())){
							sql = "select youngMemUsed/youngMemMax*100 as result  from jvm " +
									"where clusterName = "+ clusterName+"and host = '"+alarmParameterVo.getHost()+"' and time >='"+starTime+"' and time <= '"+endTime+"'";
							alarmParameterVo.setPattern(AlarmConstant.JVM_YONG_ALARM_TEMPLATE);
						}
					}else if(alarmRule.getLatitude().equals(AlarmConstant.AlarmLatitudeEnum.CPU.getName())){
						if(alarmRule.getLatitudeSub().equals(AlarmConstant.AlarmLatitudeSubSplitEnum.CPU_LOAD_AVERAGE.getName())){
							sql = "select loadAverage as result from os " +
									"where clusterName = "+ clusterName+" and host = '"+alarmParameterVo.getHost()+"' and time >='"+starTime+"' and time <= '"+endTime+"'";
							alarmParameterVo.setPattern(AlarmConstant.LOAD_ALARM_TEMPLATE);
						}else if(alarmRule.getLatitudeSub().equals(AlarmConstant.AlarmLatitudeSubSplitEnum.CPU_MEM_USED.getName())){
							sql = "select  memUsedPercent as result  from os " +
									"where clusterName = "+ clusterName+" and host = '"+alarmParameterVo.getHost()+"' and time >='"+starTime+"' and time <= '"+endTime+"'";
							alarmParameterVo.setPattern(AlarmConstant.CPU_ALARM_TEMPLATE);
						}
					}else if(alarmRule.getLatitude().equals(AlarmConstant.AlarmLatitudeEnum.THREAD_QUEUE.getName())){
						// 目前只考虑 bulk
						sql = "select queue from thread_pool where threadType='"+alarmRule.getLatitudeSub()+"' " +
								"and clusterName = "+ clusterName+" and host = '"+alarmParameterVo.getHost()+"' and time >='"+starTime+"' and time <= '"+endTime+"'";
						alarmParameterVo.setPattern(AlarmConstant.THREAD_QUEUE_TEMPLATE);
					}
					ruleDetailOne(alarmParameterVo, alarmRule, sql,clusterName,alarmRule.getLatitudeSub());
				}
			}else{
				Date endDate = new Date();
				for(AlarmRule alarmRule : ruleList){
					Date starDate= new Date(endDate.getTime()-60*1000);
					if(alarmRule.getFrequency() != null){
						starDate =new Date(endDate.getTime()-Integer.valueOf(alarmRule.getFrequency())*60*1000);
					}
					if(alarmRule.getLatitude().equals(AlarmConstant.AlarmLatitudeEnum.JVM.getName())){
						if(alarmRule.getLatitudeSub().equals(AlarmConstant.AlarmLatitudeSubSplitEnum.JVM_OLD_MEM_USED.getName())){
							alarmParameterVo.setPattern(AlarmConstant.JVM_OLD_ALARM_TEMPLATE);
						}else if(alarmRule.getLatitudeSub().equals(AlarmConstant.AlarmLatitudeSubSplitEnum.JVM_YONG_MEM_USED.getName())){
							alarmParameterVo.setPattern(AlarmConstant.JVM_YONG_ALARM_TEMPLATE);
						}
					}else if(alarmRule.getLatitude().equals(AlarmConstant.AlarmLatitudeEnum.CPU.getName())){
						if(alarmRule.getLatitudeSub().equals(AlarmConstant.AlarmLatitudeSubSplitEnum.CPU_LOAD_AVERAGE.getName())){
							alarmParameterVo.setPattern(AlarmConstant.LOAD_ALARM_TEMPLATE);
						}else if(alarmRule.getLatitudeSub().equals(AlarmConstant.AlarmLatitudeSubSplitEnum.CPU_MEM_USED.getName())){
							alarmParameterVo.setPattern(AlarmConstant.CPU_ALARM_TEMPLATE);
						}
					}else if(alarmRule.getLatitude().equals(AlarmConstant.AlarmLatitudeEnum.THREAD_QUEUE.getName())){
						alarmParameterVo.setPattern(AlarmConstant.THREAD_QUEUE_TEMPLATE.replace("key",alarmRule.getLatitudeSub()));
					}else if(alarmRule.getLatitude().equals(AlarmConstant.AlarmLatitudeEnum.DISK.getName())){
						if(alarmRule.getLatitudeSub().equals(AlarmConstant.AlarmLatitudeSubSplitEnum.DISK_FREE.getName())){
							alarmParameterVo.setPattern(AlarmConstant.DISK_FREE_TEMPLATE);
						}else if(alarmRule.getLatitudeSub().equals(AlarmConstant.AlarmLatitudeSubSplitEnum.DISK_USED.getName())){
							alarmParameterVo.setPattern(AlarmConstant.DISK_USED_TEMPLATE);
						}
					}
					ruleDetailTwo(alarmParameterVo,alarmRule,clusterName,alarmRule.getLatitudeSub(),starDate,endDate);
				}
			}

		} catch (NumberFormatException e) {
			LOGGER.error(alarmParameterVo.getHost()+","+alarmParameterVo.getLatitude()+",报警逻辑判断异常", e);	
		}
	}

	private void ruleDetailTwo(AlarmParameterVo alarmParameterVo, AlarmRule alarmRule,
							   String clusterName, String latitudeSub,Date startDate,Date endDate) {
		Map<String,Object> paramMap = new HashMap<String, Object>();
		paramMap.put("host",alarmParameterVo.getHost());
		paramMap.put("startDate",startDate);
		paramMap.put("endDate",endDate);
		paramMap.put("key",latitudeSub);
		paramMap.put("latitude",alarmRule.getLatitude());
		Integer count = 0;
		Double maxValue = 0D;
		List<AlarmResult> resultList = alarmRuleService.getResult(paramMap);
		if( CollectionUtils.isNotEmpty(resultList)){
			for (AlarmResult object : resultList){
				Double value = object.getResult();
				if(value >= alarmRule.getThreshold()){
					count ++;
					if(value >maxValue){ //获取数值里面最大的那个
						maxValue = value;
					}
				}
			}
			alarmHandle(alarmParameterVo, alarmRule, clusterName, latitudeSub, count, maxValue);
		}
	}


	private void ruleDetailOne(AlarmParameterVo alarmParameterVo, AlarmRule alarmRule,
							   String sql,String clusterName,String latitudeSub) {
		Integer count = 0;
		Double maxValue = 0D;
		QueryResult result = InflusDbUtil.query(sql);
		if( CollectionUtils.isNotEmpty(result.getResults().get(0).getSeries())){
			List<List<Object>> values = result.getResults().get(0).getSeries().get(0).getValues();
			for (List<Object> object : values){
				Double value = (Double) object.get(1);
				if(value >= alarmRule.getThreshold()){
					count ++;
					//获取数值里面最大的那个
					if(value >maxValue){
						maxValue = value;
					}
				}
			}
			alarmHandle(alarmParameterVo, alarmRule, clusterName, latitudeSub, count, maxValue);
		}
	}

	private void alarmHandle(AlarmParameterVo alarmParameterVo, AlarmRule alarmRule, String clusterName, String latitudeSub, Integer count, Double maxValue) {
		alarmParameterVo.setArgument(alarmParameterVo.getHost(),maxValue);
		Boolean isCan =false;
		Integer alarmCount = (Integer) alramMap.get(clusterName+alarmParameterVo.getHost()+latitudeSub+"count");
		Long firstTime = (Long) alramMap.get(clusterName+alarmParameterVo.getHost()+latitudeSub+"time");
		Long time = null;
		if(alarmCount != null && firstTime != null){
            time= System.currentTimeMillis()-firstTime;
            if(time > (2*alarmCount*alarmCount-alarmCount)*alarmInterval ){
                isCan=true;
            }
        }else{
            isCan=true;
        }
		Boolean sendMsgFlag = false;
		if(alarmRule.getFrequencyCount() == null && count >= 1 && isCan ){
			String addr = getAddrs(alarmRule);
            MailClient.sendMessage(addr,buildMessage(alarmParameterVo),alarmParameterVo.getAlarmTitle(),alarmRule.getAlarmWay());
            sendMsgFlag = true;
        }else if(alarmRule.getFrequencyCount() != null && count >= alarmRule.getFrequencyCount() && isCan){
			String addr = getAddrs(alarmRule);
            MailClient.sendMessage(addr,buildMessage(alarmParameterVo),alarmParameterVo.getAlarmTitle(),alarmRule.getAlarmWay());
            sendMsgFlag = true;
        }
		if(sendMsgFlag){
            if(alarmCount != null){
                alramMap.put(clusterName+alarmParameterVo.getHost()+latitudeSub+"count",++alarmCount);
            }else{
                alramMap.put(clusterName+alarmParameterVo.getHost()+latitudeSub+"count",1);
            }
            if(firstTime == null){
                alramMap.put(clusterName+alarmParameterVo.getHost()+latitudeSub+"time",System.currentTimeMillis());
            }
        }
		if(time != null && time > maxAlarmInterval){
            alramMap.put(clusterName+alarmParameterVo.getHost()+latitudeSub+"count",null);
            alramMap.put(clusterName+alarmParameterVo.getHost()+latitudeSub+"time",null);
        }
	}

	private String getAddrs(AlarmRule alarmRule) {
		String addr = null;
		if(StringUtils.isNotBlank(alarmRule.getUserNameId())){
			addr = alarmRuleService.getAddr(alarmRule.getUserNameId());
		}
		return addr;
	}


	private String buildMessage(AlarmParameterVo alarmParameterVo) {
		MessageFormat format = new MessageFormat(alarmParameterVo.getPattern());
		return getHeader() + format.format(alarmParameterVo.getArguments());
	}


	private String getHeader() {
		return String.format("【ESER】%s,【集群:%s】", ConfigUtil.I.envTypeName(), clusterName);
	}
}
