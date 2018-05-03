package com.ucar.eser.core.bean.po;


import com.ucar.eser.core.util.EncryptUtil;

/**
 * 
 * Description: 集群信息
 * All Rights Reserved.
 * Created on 2016-9-13 下午4:59:46
 * @author  孔增（kongzeng@zuche.com）
 */
public class ClusterInfo {
	
	private Long id;
	/**
	 * 产品线
	 */
	public String productLine;
	/**
	 * 集群名称
	 */
	public String clusterName;
	
	/**
	 * 集群描述
	 */
	public String clusterDescribe;
	/**
	 * 原集群名称
	 */
	public String oldClusterName;
	/**
	 * 集群ips
	 */
	public String hosts;
	
	public int httpPort = 9200;
	
	public int tcpPort = 9300;
	
	public String monitorRoleName;
	
	public String monitorRolePwd;
	
	public String monitorRolePwdCiphertext;
	
	public String adminRoleName;
	
	public String adminRolePwd;
	
	public String adminRolePwdCiphertext;
	
	public String operateTime;
	

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getProductLine() {
		return productLine;
	}

	public void setProductLine(String productLine) {
		this.productLine = productLine;
	}

	public String getClusterName() {
		return clusterName;
	}

	public void setClusterName(String clusterName) {
		this.clusterName = clusterName;
	}

	public String getOldClusterName() {
		return oldClusterName;
	}

	public void setOldClusterName(String oldClusterName) {
		this.oldClusterName = oldClusterName;
	}

	public String getHosts() {
		return hosts;
	}

	public void setHosts(String hosts) {
		this.hosts = hosts;
	}

	public int getHttpPort() {
		return httpPort;
	}

	public void setHttpPort(int httpPort) {
		this.httpPort = httpPort;
	}

	public int getTcpPort() {
		return tcpPort;
	}

	public void setTcpPort(int tcpPort) {
		this.tcpPort = tcpPort;
	}

	public String getMonitorRoleName() {
		return monitorRoleName;
	}

	public void setMonitorRoleName(String monitorRoleName) {
		this.monitorRoleName = monitorRoleName;
	}

	public String getMonitorRolePwd() {
		return monitorRolePwd;
	}

	public void setMonitorRolePwd(String monitorRolePwd) {
		this.monitorRolePwd = monitorRolePwd;
	}

	public String getAdminRoleName() {
		return adminRoleName;
	}

	public void setAdminRoleName(String adminRoleName) {
		this.adminRoleName = adminRoleName;
	}

	public String getAdminRolePwd() {
		return adminRolePwd;
	}

	public void setAdminRolePwd(String adminRolePwd) {
		this.adminRolePwd = adminRolePwd;
	}

	public String getOperateTime() {
		return operateTime;
	}

	public void setOperateTime(String operateTime) {
		this.operateTime = operateTime;
	}

	public String getMonitorRolePwdCiphertext() {
		monitorRolePwdCiphertext = EncryptUtil.encoding(monitorRolePwd);
		return monitorRolePwdCiphertext;
	}

	public void setMonitorRolePwdCiphertext(String monitorRolePwdCiphertext) {
		this.monitorRolePwdCiphertext = monitorRolePwdCiphertext;
	    this.monitorRolePwd = EncryptUtil.decoding(monitorRolePwdCiphertext);
	}

	public String getAdminRolePwdCiphertext() {
		adminRolePwdCiphertext = EncryptUtil.encoding(adminRolePwd);
		return adminRolePwdCiphertext;
	}

	public void setAdminRolePwdCiphertext(String adminRolePwdCiphertext) {
		this.adminRolePwdCiphertext = adminRolePwdCiphertext;
		this.adminRolePwd = EncryptUtil.encoding(adminRolePwdCiphertext);
	}

	public String getClusterDescribe() {
		return clusterDescribe;
	}

	public void setClusterDescribe(String clusterDescribe) {
		this.clusterDescribe = clusterDescribe;
	}
	
	
}
