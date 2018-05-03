package com.ucar.eser.admin.dao.alarm;


import com.ucar.eser.core.bean.vo.alarm.AlarmResult;
import com.ucar.eser.core.bean.vo.alarm.AlarmRule;

import java.util.List;
import java.util.Map;

public interface AlarmRuleDao {
	
	List<AlarmRule> getList();
	
	AlarmRule getAlarmRuleById(Long id);
	
	void addAlarmRule(AlarmRule AlarmRule);
	
	void updateAlarmRule(AlarmRule AlarmRule);
	
	void deleteAlarmRuleById(Long id);
	
	int checkExist(AlarmRule AlarmRule);

	List<AlarmResult> getResult(Map<String,Object> paramMap);

	AlarmRule getAlarmRuleByClusterName(String clusterName);
	
}
