package com.ucar.eser.admin.service.alarm.impl;

import com.ucar.eser.admin.dao.alarm.AlarmRuleDao;
import com.ucar.eser.admin.dao.user.UserInfoDao;
import com.ucar.eser.admin.service.alarm.AlarmRuleService;
import com.ucar.eser.core.bean.po.UserInfo;
import com.ucar.eser.core.bean.vo.alarm.AlarmResult;
import com.ucar.eser.core.bean.vo.alarm.AlarmRule;
import com.ucar.eser.core.init.SpringInit;
import org.apache.commons.collections.CollectionUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class AlarmRuleServiceImpl implements AlarmRuleService {
	
	@Autowired
	private AlarmRuleDao alarmRuleDao;

	@Autowired
	private UserInfoDao userInfoDao;

	@Override
	public List<AlarmRule> getList() {
		return alarmRuleDao.getList();
	}

	@Override
	public AlarmRule getAlarmRuleById(Long id) {
		return alarmRuleDao.getAlarmRuleById(id);
	}
	
	@Override
	public void addAlarmRule(AlarmRule AlarmRule) {
       alarmRuleDao.addAlarmRule(AlarmRule);
	}

	@Override
	public void updateAlarmRule(AlarmRule AlarmRule) {
		alarmRuleDao.updateAlarmRule(AlarmRule);
	}

	@Override
	public void deleteAlarmRuleById(Long id) {
		alarmRuleDao.deleteAlarmRuleById(id);
	}

	@Override
	public boolean checkExist(AlarmRule AlarmRule) {
		return alarmRuleDao.checkExist(AlarmRule) > 0;
	}

	@Override
	public List<AlarmResult> getResult(Map<String, Object> paramMap) {
		return alarmRuleDao.getResult(paramMap);
	}

	@Override
	public String getAddr(String userNameId) {
		String addr = null;
		try {
			String[] idsStr = userNameId.split(",");
			List<Long> ids = new ArrayList<Long>();
			for (String anIdsStr : idsStr) {
				ids.add(Long.valueOf(anIdsStr));
			}
			List<UserInfo> userInfos = userInfoDao.getListByIds(ids);
			if(CollectionUtils.isNotEmpty(userInfos)){
				StringBuilder sb = new StringBuilder();
				for (UserInfo userInfo:userInfos){
					sb.append(userInfo.getUserEmail());
					sb.append(";");
				}
				addr = sb.toString().substring(0,sb.length()-1);
			}
		}catch (Exception e){
			addr = null;
		}
		return addr;
	}

	@Override
	public AlarmRule getAlarmRuleByClusterName(String clusterName) {
		return alarmRuleDao.getAlarmRuleByClusterName(clusterName);
	}


	/**
     *
     * Description: 获取所有报警规则
     * Created on 2016-12-7 上午11:07:32
     */
    public static Map<String,AlarmRule> getAlarmRuleRule() {
    	AlarmRuleService alarmRuleService = (AlarmRuleService) SpringInit.getApplicationContext().getBean("alarmRuleServiceImpl");
    	Map<String,AlarmRule> map = new HashMap<String, AlarmRule>();
    	List<AlarmRule> list = alarmRuleService.getList();
        if (list == null) {
            return map;
        }
    	for(AlarmRule alarmRule:list) {
    		map.put(alarmRule.getLatitude(), alarmRule);
    	}

    	return map;
    }


	public static Map<String,AlarmRule> getAlarmRule() {
		AlarmRuleService alarmRuleService = (AlarmRuleService) SpringInit.getApplicationContext().getBean("alarmRuleServiceImpl");
		Map<String,AlarmRule> map = new HashMap<String, AlarmRule>();
		List<AlarmRule> list = alarmRuleService.getList();
		if (list == null) {
			return map;
		}
		for(AlarmRule alarmRule:list) {
			map.put(alarmRule.getClusterName()+""+alarmRule.getLatitude()+""+alarmRule.getLatitudeSub(), alarmRule);
		}

		return map;
	}
}
