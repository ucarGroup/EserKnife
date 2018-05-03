package com.ucar.eser.core.bean.po;


import java.util.Date;


/**
 * 
 * Description: 数据源映射实体类
 * All Rights Reserved.
 * Created on 2017-3-10 下午4:29:12
 * @author  孔增（kongzeng@zuche.com）
 */
public class DataSourceMapping {
	/**
	 * 主键
	 */
	private Long id;
	/**
	 * 数据源在本系统的名称
	 */
	private String localName;
	/**
	 * 数据源在数据交换平台的名称
	 */
	private String dataExchangeName;
	/**
	 * 描述
	 */
	private String remark;
	/**
	 * 操作人
	 */
	private String operator;
	/**
	 * 操作时间
	 */
	private Date operateTime;
	
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getLocalName() {
		return localName;
	}
	public void setLocalName(String localName) {
		this.localName = localName;
	}
	public String getDataExchangeName() {
		return dataExchangeName;
	}
	public void setDataExchangeName(String dataExchangeName) {
		this.dataExchangeName = dataExchangeName;
	}
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}
	public String getOperator() {
		return operator;
	}
	public void setOperator(String operator) {
		this.operator = operator;
	}
	public Date getOperateTime() {
		return operateTime;
	}
	public void setOperateTime(Date operateTime) {
		this.operateTime = operateTime;
	}
	
}
