package com.ucar.eser.admin.service.clusterManager;


import com.ucar.eser.core.bean.po.ClusterInfo;

import java.util.List;

public interface ClusterInfoService {
	
	List<ClusterInfo> getList(String productLine);
	
	ClusterInfo getClusterInfoById(Long id);
	
	void addClusterInfo(ClusterInfo clusterInfo);
	
	void updateClusterInfo(ClusterInfo clusterInfo);
	
	void deleteClusterInfoById(Long id);
	
	boolean checkExist(ClusterInfo clusterInfo);
}
