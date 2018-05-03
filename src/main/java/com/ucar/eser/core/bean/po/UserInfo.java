package com.ucar.eser.core.bean.po;


import com.ucar.eser.core.util.EncryptUtil;

public class UserInfo {
	
	private Long id;
	
	private String userName;

	private String userEmail;

	private String userPwd;

	private String productLine;
	
	private String esAccount;
	
	private String esPwd;
	
	private String esPwdCiphertext;
	
	private String operateTime;
	/**
	 * 1 超级管理员   2 普通用户
	 */
	private Integer role = 2;
	/**
	 * 状态 1 待审核 2 审核通过
	 */
	private Integer state = 2 ;
	

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

	public String getProductLine() {
		return productLine;
	}

	public void setProductLine(String productLine) {
		this.productLine = productLine;
	}

	public String getEsAccount() {
		return esAccount;
	}

	public void setEsAccount(String esAccount) {
		this.esAccount = esAccount;
	}

	public String getEsPwd() {
		return esPwd;
	}

	public void setEsPwd(String esPwd) {
		this.esPwd = esPwd;
	}

	public String getOperateTime() {
		return operateTime;
	}

	public void setOperateTime(String operateTime) {
		this.operateTime = operateTime;
	}
	
	public Integer getRole() {
		return role;
	}

	public void setRole(Integer role) {
		this.role = role;
	}
	
	public Integer getState() {
		return state;
	}

	public void setState(Integer state) {
		this.state = state;
	}

	public String getEsPwdCiphertext() {
		esPwdCiphertext = EncryptUtil.encoding(esPwd);
		return esPwdCiphertext;
	}

	public void setEsPwdCiphertext(String esPwdCiphertext) {
		this.esPwdCiphertext = esPwdCiphertext;
		this.esPwd = EncryptUtil.decoding(esPwdCiphertext);
	}

	public String getUserPwd() {
		return userPwd;
	}

	public void setUserPwd(String userPwd) {
		this.userPwd = userPwd;
	}

	public String getUserEmail() {
		return userEmail;
	}

	public void setUserEmail(String userEmail) {
		this.userEmail = userEmail;
	}
}
