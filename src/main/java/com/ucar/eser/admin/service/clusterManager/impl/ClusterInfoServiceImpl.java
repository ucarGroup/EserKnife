package com.ucar.eser.admin.service.clusterManager.impl;

import com.ucar.eser.admin.dao.clusterManager.ClusterInfoDao;
import com.ucar.eser.admin.service.clusterManager.ClusterInfoService;
import com.ucar.eser.admin.service.schedule.SchedulerCenter;
import com.ucar.eser.core.bean.po.ClusterInfo;
import com.ucar.eser.core.jest.JestManager;
import com.ucar.eser.core.util.RequestContextUtil;
import com.ucar.eser.core.util.ScheduleUtil;
import com.ucar.eser.core.util.common.Constant;
import com.ucar.eser.core.util.exception.BusinessRuntimeException;
import org.quartz.JobKey;
import org.quartz.TriggerKey;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ClusterInfoServiceImpl implements ClusterInfoService {

	@Autowired
	private SchedulerCenter schedulerCenter;

	@Autowired
	private ClusterInfoDao clusterInfoDao;

	@Override
	public List<ClusterInfo> getList(String productLine) {
		if(productLine == null && RequestContextUtil.getCustomUser() != null && !RequestContextUtil.getCustomUser().isAdmin()) {
			return new ArrayList<ClusterInfo>();
		}
		if(productLine == null) {
			return clusterInfoDao.getList(null);
		}
		String [] pA = productLine.split(",");
		List<ClusterInfo> list = new ArrayList<ClusterInfo>();
		for(String p : pA) {
			list.addAll(clusterInfoDao.getList(p));
		}
		return list;
	}

	@Override
	public ClusterInfo getClusterInfoById(Long id) {
		return clusterInfoDao.getClusterInfoById(id);
	}

	@Override
	@Transactional(rollbackFor=Throwable.class, readOnly=false)
	public void addClusterInfo(ClusterInfo clusterInfo) {
       clusterInfoDao.addClusterInfo(clusterInfo);
		JestManager.loadCluster();
      boolean result = this.deployClusterCollection(clusterInfo.getClusterName(), clusterInfo.getId(),null);
	   if(!result) {
		   throw new BusinessRuntimeException("启动自动任务失败");
	   }
	}

	@Override
	public void updateClusterInfo(ClusterInfo clusterInfo) {
		clusterInfoDao.updateClusterInfo(clusterInfo);
		JestManager.loadCluster();
		boolean result = this.deployClusterCollection(clusterInfo.getClusterName(), clusterInfo.getId(),clusterInfo.getOldClusterName());
	    if(!result) {
		   throw new BusinessRuntimeException("启动自动任务失败");
	    }
	}

	@Override
	@Transactional(rollbackFor=Throwable.class, readOnly=false)
	public void deleteClusterInfoById(Long id) {
		ClusterInfo clusterInfo = clusterInfoDao.getClusterInfoById(id);
		clusterInfoDao.deleteClusterInfoById(id);
		JestManager.loadCluster();
		boolean result = this.removeClusterCollection(clusterInfo.getClusterName());
	    if(!result) {
		   throw new BusinessRuntimeException("启动自动任务失败");
	    }
	}

	@Override
	public boolean checkExist(ClusterInfo clusterInfo) {
		return clusterInfoDao.checkExist(clusterInfo) > 0;
	}

	private boolean deployClusterCollection(String clusterName, Long id, String oldClusterName) {

		if(clusterName.equals(oldClusterName)) {
			return true;
		}

		if(oldClusterName != null) {
			TriggerKey triggerKey = TriggerKey.triggerKey(oldClusterName+"Trigger", oldClusterName);
			schedulerCenter.unscheduleJob(triggerKey);
		}

		Map<String, Object> dataMap = new HashMap<String, Object>();
		dataMap.put(Constant.CLUSTER_ID, id);
		dataMap.put(Constant.CLUSTER_NAME, clusterName);

		JobKey jobKey = JobKey.jobKey(Constant.CLUSTER_JOB_NAME, Constant.CLUSTER_GROUP_NAME);
		TriggerKey triggerKey = TriggerKey.triggerKey(clusterName+"Trigger", clusterName);
		return schedulerCenter.deployJobByCron(jobKey, triggerKey, dataMap, ScheduleUtil.getMinuteCronByAppId(id), true);
	}

	private boolean removeClusterCollection(String clusterName) {
		TriggerKey triggerKey = TriggerKey.triggerKey(clusterName+"Trigger", clusterName);
		return schedulerCenter.unscheduleJob(triggerKey);
	}
	
}
