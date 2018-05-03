package com.ucar.eser.core.bean.po;


import java.io.Serializable;


public class QueryClientCollection implements Serializable{

	private static final long serialVersionUID = 1L;
	
	private Long id;
	
	private String name;//收藏名称
	
	private String requireUrl;//请求链接
	
	private String requireMethod;//请求方式
	
	private String requireContent;//请求内容
	
	private String clusterName;//集群名称
	
	private String createTime;
	
	private String userName;//用户名
	
	private Integer state;//1有效 ，0 无效

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getRequireUrl() {
		return requireUrl;
	}

	public void setRequireUrl(String requireUrl) {
		this.requireUrl = requireUrl;
	}

	public String getRequireMethod() {
		return requireMethod;
	}

	public void setRequireMethod(String requireMethod) {
		this.requireMethod = requireMethod;
	}

	public String getRequireContent() {
		return requireContent;
	}

	public void setRequireContent(String requireContent) {
		this.requireContent = requireContent;
	}

	public String getClusterName() {
		return clusterName;
	}

	public void setClusterName(String clusterName) {
		this.clusterName = clusterName;
	}

	public String getCreateTime() {
		return createTime;
	}

	public void setCreateTime(String createTime) {
		this.createTime = createTime;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public Integer getState() {
		return state;
	}

	public void setState(Integer state) {
		this.state = state;
	}
	
}
