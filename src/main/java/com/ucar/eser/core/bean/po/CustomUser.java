package com.ucar.eser.core.bean.po;


import com.ucar.eser.core.bean.User;

/**
 * 
 * Description: user对象扩展
 * All Rights Reserved.
 * Created on 2016-9-20 上午11:51:42
 * @author  孔增（kongzeng@zuche.com）
 */
public class CustomUser extends User {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = -3051103813278367093L;
    /**
     * 用户所属产品线
     */
	private String productLine;
	/**
	 * es访问账户
	 */
	private String esAccout;
	/**
	 * es访问密码
	 */
	private String esPwd;

	/**
	 * 用户审核状态
	 */
	private Integer state;

    public CustomUser(){}

    public CustomUser(boolean isAdmin){
        this.setAdmin(true);
    }
	public String getProductLine() {
		return productLine;
	}

	public void setProductLine(String productLine) {
		this.productLine = productLine;
	}

	public String getEsAccout() {
		return esAccout;
	}

	public void setEsAccout(String esAccout) {
		this.esAccout = esAccout;
	}

	public String getEsPwd() {
		return esPwd;
	}

	public void setEsPwd(String esPwd) {
		this.esPwd = esPwd;
	}
	
	
	public boolean getAdmin() {
		return isAdmin();
	}

	public Integer getState() {
		return state;
	}

	public void setState(Integer state) {
		this.state = state;
	}

}
