package com.ucar.eser.core.bean.vo.stat;


import com.ucar.eser.core.util.DateUtils;

import java.util.Date;


public class DeleteStatDataVo {

	private String tableName;
	
	private String columnName = "collect_time";
	
	private String deleteTime;
	
	private int days = 30;
	
	public DeleteStatDataVo() {}
	
	public DeleteStatDataVo(String tableName) {
		this.tableName = tableName;
	}
	
	public DeleteStatDataVo(String tableName, int days) {
		this.tableName = tableName;
		this.days = days;
	}
	
	
	public DeleteStatDataVo(String tableName, int days, String columnName) {
		this.tableName = tableName;
		this.days = days;
		this.columnName = columnName;
	}
	

	public String getTableName() {
		return tableName;
	}

	public void setTableName(String tableName) {
		this.tableName = tableName;
	}

	public String getColumnName() {
		return columnName;
	}

	public void setColumnName(String columnName) {
		this.columnName = columnName;
	}

	public String getDeleteTime() {
		return deleteTime;
	}
	
	public void setDeleteTime(String deleteTime) {
		this.deleteTime = deleteTime;
	}

	public int getDays() {
		return days;
	}

	public void setDays(int days) {
		this.days = days;
	}
	
	public String getDTime() {
		return DateUtils.formatDate(DateUtils.dateAdd(new Date(), "d", -days),DateUtils.NORMAL_FORMAT);
	}
	
	
}
