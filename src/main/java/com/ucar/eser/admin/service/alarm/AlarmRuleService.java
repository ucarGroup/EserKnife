package com.ucar.eser.admin.service.alarm;


import com.ucar.eser.core.bean.vo.alarm.AlarmResult;
import com.ucar.eser.core.bean.vo.alarm.AlarmRule;

import java.util.List;
import java.util.Map;

public interface AlarmRuleService {
	
	List<AlarmRule> getList();
	
	AlarmRule getAlarmRuleById(Long id);
	
	void addAlarmRule(AlarmRule AlarmRule);
	
	void updateAlarmRule(AlarmRule AlarmRule);
	
	void deleteAlarmRuleById(Long id);
	
	boolean checkExist(AlarmRule AlarmRule);

	List<AlarmResult> getResult(Map<String,Object> paramMap);

	String getAddr(String userNameId);

	AlarmRule getAlarmRuleByClusterName(String clusterName);
}
