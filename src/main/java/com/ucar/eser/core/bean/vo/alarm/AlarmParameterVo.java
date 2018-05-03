package com.ucar.eser.core.bean.vo.alarm;



/**
 * 
 * Description: 用于报警方法之间参数传递 All Rights Reserved. Created on 2016-12-7 下午5:06:36
 * 
 * @author 孔增（kongzeng@zuche.com）
 */
public class AlarmParameterVo {
	/**
	 * 节点ip
	 */
	private String host;
	/**
	 * 报警纬度当前指标
	 */
	private Float curData;
	/**
	 * 报警纬度
	 */
	private String latitude;
	/**
	 * 报警（异常）点缓存后缀
	 */
	private String alarmSuffix;
	/**
	 * 报警短信发送标志后缀
	 */
	private String sendAlarmSuffix;
	/**
	 * 报警标题
	 */
	private String alarmTitle;
	/**
	 * 报警模版
	 */
	private String pattern;
	/**
	 * 报警信息参数
	 */
	private Object [] arguments;

	public AlarmParameterVo() {}
	
	public AlarmParameterVo(String host,Float curData,String latitude,String alarmSuffix,String sendAlarmSuffix,String alarmTitle) {
		this.host = host;
		this.curData = curData;
		this.latitude = latitude;
		this.alarmSuffix = alarmSuffix;
		this.sendAlarmSuffix = sendAlarmSuffix;
		this.alarmTitle = alarmTitle;
	}

	public String getHost() {
		return host;
	}

	public void setHost(String host) {
		this.host = host;
	}

	public Float getCurData() {
		return curData;
	}

	public void setCurData(Float curData) {
		this.curData = curData;
	}

	public String getLatitude() {
		return latitude;
	}

	public void setLatitude(String latitude) {
		this.latitude = latitude;
	}

	public String getAlarmSuffix() {
		return alarmSuffix;
	}

	public void setAlarmSuffix(String alarmSuffix) {
		this.alarmSuffix = alarmSuffix;
	}

	public String getSendAlarmSuffix() {
		return sendAlarmSuffix;
	}

	public void setSendAlarmSuffix(String sendAlarmSuffix) {
		this.sendAlarmSuffix = sendAlarmSuffix;
	}

	public String getAlarmTitle() {
		return alarmTitle;
	}

	public void setAlarmTitle(String alarmTitle) {
		this.alarmTitle = alarmTitle;
	}

	public String getPattern() {
		return pattern;
	}

	public void setPattern(String pattern) {
		this.pattern = pattern;
	}

	public Object[] getArguments() {
		return arguments;
	}

	public void setArguments(Object[] arguments) {
		this.arguments = arguments;
	}
	
	public void setArgument(Object ...arguments) {
		this.arguments = arguments;
	}

}
