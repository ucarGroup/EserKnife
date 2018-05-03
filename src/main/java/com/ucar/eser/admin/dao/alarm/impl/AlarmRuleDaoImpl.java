package com.ucar.eser.admin.dao.alarm.impl;

import com.ucar.eser.admin.dao.alarm.AlarmRuleDao;
import com.ucar.eser.core.bean.vo.alarm.AlarmResult;
import com.ucar.eser.core.bean.vo.alarm.AlarmRule;
import com.ucar.eser.core.ibatis.EserIbatisDaoImpl;
import com.ucar.eser.core.util.common.AlarmConstant;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository
public class AlarmRuleDaoImpl extends EserIbatisDaoImpl implements AlarmRuleDao {
	
	private final static String NAME_SPACE = "com.ucar.eser.admin.dao.alarm.AlarmRuleDao.";

	@SuppressWarnings("unchecked")
	@Override
	public List<AlarmRule> getList() {
		return super.queryForList(NAME_SPACE+"getList");
	}

	@Override
	public AlarmRule getAlarmRuleById(Long id) {
		return (AlarmRule) super.queryForObject(NAME_SPACE+"getAlarmRuleById", id);
	}

	@Override
	public void addAlarmRule(AlarmRule AlarmRule) {
       super.insert(NAME_SPACE+"addAlarmRule", AlarmRule);
	}

	@Override
	public void updateAlarmRule(AlarmRule AlarmRule) {
		super.update(NAME_SPACE+"updateAlarmRule", AlarmRule);
	}

	@Override
	public void deleteAlarmRuleById(Long id) {
		super.update(NAME_SPACE+"deleteAlarmRuleById", id);
	}

	@Override
	public int checkExist(AlarmRule AlarmRule) {
		return (Integer) super.queryForObject(NAME_SPACE+"checkExist", AlarmRule);
	}

	@Override
	public List<AlarmResult> getResult(Map<String, Object> paramMap) {
		String key = (String) paramMap.get("key");
		String latitude = (String) paramMap.get("latitude");
		if(StringUtils.isNotBlank(latitude) && AlarmConstant.AlarmLatitudeEnum.THREAD_QUEUE.getName().equals(latitude)){
			return super.queryForList(NAME_SPACE+"queue",paramMap);
		}else{
			return super.queryForList(NAME_SPACE+key,paramMap);
		}
	}

	@Override
	public AlarmRule getAlarmRuleByClusterName(String clusterName) {
		Map<String, Object> paramMap = new HashMap<String, Object>();
		paramMap.put("clusterName",clusterName);
		return (AlarmRule) this.queryForObject(NAME_SPACE+"getAlarmRuleByClusterName",paramMap);
	}

}
