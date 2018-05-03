package com.ucar.eser.admin.dao.schedule.impl;

import com.ucar.eser.admin.dao.schedule.QuartzDao;
import com.ucar.eser.core.bean.po.TriggerInfo;
import com.ucar.eser.core.ibatis.EserIbatisDaoImpl;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class QuartzDaoImpl extends EserIbatisDaoImpl implements QuartzDao {

	@SuppressWarnings("unchecked")
	@Override
	public List<TriggerInfo> getTriggersByJobGroup(String jobGroup) {
		return super.queryForList("com.ucar.escloud.dao.sechedule.QuartzDao.getTriggersByJobGroup", jobGroup);
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<TriggerInfo> getAllTriggers() {
		return super.queryForList("com.ucar.escloud.dao.sechedule.QuartzDao.getAllTriggers");
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<TriggerInfo> searchTriggerByNameOrGroup(String queryString) {
		return super.queryForList("com.ucar.escloud.dao.sechedule.QuartzDao.searchTriggerByNameOrGroup", queryString);
	}

}
