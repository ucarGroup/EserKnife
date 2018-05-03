package com.ucar.eser.admin.dao.clusterManager.impl;

import com.ucar.eser.admin.dao.clusterManager.ClusterInfoDao;
import com.ucar.eser.core.bean.po.ClusterInfo;
import com.ucar.eser.core.ibatis.EserIbatisDaoImpl;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class ClusterInfoDaoImpl extends EserIbatisDaoImpl implements ClusterInfoDao {
	
	private final static String NAME_SPACE = "com.ucar.escloud.dao.clusterManager.clusterInfoDao.";

	@SuppressWarnings("unchecked")
	@Override
	public List<ClusterInfo> getList(String productLine) {
		return super.queryForList(NAME_SPACE+"getList", productLine);
	}

	@Override
	public ClusterInfo getClusterInfoById(Long id) {
		return (ClusterInfo) super.queryForObject(NAME_SPACE+"getClusterInfoById", id);
	}

	@Override
	public void addClusterInfo(ClusterInfo clusterInfo) {
       super.insert(NAME_SPACE+"addClusterInfo", clusterInfo);
	}

	@Override
	public void updateClusterInfo(ClusterInfo clusterInfo) {
		super.update(NAME_SPACE+"updateClusterInfo", clusterInfo);
	}

	@Override
	public void deleteClusterInfoById(Long id) {
		super.update(NAME_SPACE+"deleteClusterInfoById", id);
	}

	@Override
	public int checkExist(ClusterInfo clusterInfo) {
		return (Integer) super.queryForObject(NAME_SPACE+"checkExist", clusterInfo);
	}

}
