package com.ucar.eser.admin.dao.clusterManager;


import com.ucar.eser.core.bean.po.ClusterInfo;

import java.util.List;

public interface ClusterInfoDao {
	
	List<ClusterInfo> getList(String productLine);
	
	ClusterInfo getClusterInfoById(Long id);
	
	void addClusterInfo(ClusterInfo clusterInfo);
	
	void updateClusterInfo(ClusterInfo clusterInfo);
	
	void deleteClusterInfoById(Long id);
	
	int checkExist(ClusterInfo clusterInfo);
}
