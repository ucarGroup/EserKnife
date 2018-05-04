package com.ucar.eser.core.util;


import com.ucar.eser.core.bean.po.ClusterInfo;
import com.ucar.eser.core.jest.JestManager;
import com.ucar.eser.core.jest.vo.EsConfigDetailVo;

import java.util.ArrayList;
import java.util.List;

public class ClusterUtil {

	public static EsConfigDetailVo clusterInfo2ESConfigVo(ClusterInfo clusterInfo) {
		EsConfigDetailVo configVo = new EsConfigDetailVo();
		configVo.setClusterName(clusterInfo.getClusterName());
		configVo.setHosts(clusterInfo.getHosts());
		configVo.setHttp_port(clusterInfo.getHttpPort());
		configVo.setTcp_port(clusterInfo.getTcpPort());
		configVo.setUser(clusterInfo.getMonitorRoleName());
		configVo.setPass(clusterInfo.getMonitorRolePwd());
		return configVo;
	}
	
	/**
	 * 
	 * Description: 将集群信息添加到es集群管理中
	 * Created on 2016-9-18 下午1:31:32
	 * @param clusterInfo
	 */
	public static void addClusterToMonitor(ClusterInfo clusterInfo) {
		List<EsConfigDetailVo> list = new ArrayList<EsConfigDetailVo>();
		list.add(clusterInfo2ESConfigVo(clusterInfo));
		JestManager.addESConfigs(list);
	}
}
