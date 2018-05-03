package com.ucar.eser.core.bean.po;


import java.io.Serializable;
import java.util.Date;


public class UserLog implements Serializable{

	private static final long serialVersionUID = 1L;
	
	private Long id;
	
	private String userName;
	
	private String userRequire;
	
	private String remark;
	
	private Date operateTime;
	
	private String clusterName;
	
	private String requirePath;
	
	private String searchUserName;
	
	private String searchRemark;
	
	private String startDateTime;
	
	private String endDateTime;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}


	public String getUserRequire() {
		return userRequire;
	}

	public void setUserRequire(String userRequire) {
		this.userRequire = userRequire;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	public Date getOperateTime() {
		return operateTime;
	}

	public void setOperateTime(Date operateTime) {
		this.operateTime = operateTime;
	}

	public String getClusterName() {
		return clusterName;
	}

	public void setClusterName(String clusterName) {
		this.clusterName = clusterName;
	}

	public String getRequirePath() {
		return requirePath;
	}

	public void setRequirePath(String requirePath) {
		this.requirePath = requirePath;
	}

	public String getSearchUserName() {
		return searchUserName;
	}

	public void setSearchUserName(String searchUserName) {
		this.searchUserName = searchUserName;
	}

	public String getSearchRemark() {
		return searchRemark;
	}

	public void setSearchRemark(String searchRemark) {
		this.searchRemark = searchRemark;
	}

	public String getStartDateTime() {
		return startDateTime;
	}

	public void setStartDateTime(String startDateTime) {
		this.startDateTime = startDateTime;
	}

	public String getEndDateTime() {
		return endDateTime;
	}

	public void setEndDateTime(String endDateTime) {
		this.endDateTime = endDateTime;
	}
	
}
