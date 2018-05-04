package com.ucar.eser.core.bean.vo.alarm;


import java.io.Serializable;
import java.util.Date;


/**
 * 
 * Description: 报警规则 All Rights Reserved. Created on 2016-12-6 下午5:19:41
 * 
 */
public class AlarmRule implements Serializable{

	private static final long serialVersionUID = -4262318802999872765L;
	/**
	 * 主键
	 */
	private Long id;

	private Long clusterId;

	private String clusterName;

	private String userNameId;

	private String latitudeSub;

	private String ruleName;
	/**
	 * 报警纬度
	 */
	private String latitude;
	/**
	 * 阀值
	 */
	private Integer threshold;
	/**
	 * 频率
	 */
	private String frequency;

	private Integer frequencyCount;
	/**
	 * 报警间隔（分钟为单位）
	 */
	private Integer alarmInterval;
	/**
	 * 扩展配置
	 */
	private String extend;
	/**
	 * 报警方式
	 */
	private Integer alarmWay;
	/**
	 * 是否开启此报警
	 */
	private Integer enable;
	/**
	 * 操作时间
	 */
	private Date operateTime;
	/**
	 * 操作人
	 */
	private String operateUser;
	/**
	 * 备注
	 */
	private String remark;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getLatitude() {
		return latitude;
	}

	public void setLatitude(String latitude) {
		this.latitude = latitude;
	}

	public Integer getThreshold() {
		return threshold;
	}

	public void setThreshold(Integer threshold) {
		this.threshold = threshold;
	}

	public String getFrequency() {
		return frequency;
	}

	public void setFrequency(String frequency) {
		this.frequency = frequency;
	}

	public Integer getAlarmInterval() {
		return alarmInterval;
	}

	public void setAlarmInterval(Integer alarmInterval) {
		this.alarmInterval = alarmInterval;
	}

	public String getExtend() {
		return extend;
	}

	public void setExtend(String extend) {
		this.extend = extend;
	}

	public Integer getAlarmWay() {
		return alarmWay;
	}

	public void setAlarmWay(Integer alarmWay) {
		this.alarmWay = alarmWay;
	}

	public Integer getEnable() {
		return enable;
	}

	public void setEnable(Integer enable) {
		this.enable = enable;
	}

	public Date getOperateTime() {
		return operateTime;
	}

	public void setOperateTime(Date operateTime) {
		this.operateTime = operateTime;
	}

	public String getOperateUser() {
		return operateUser;
	}

	public void setOperateUser(String operateUser) {
		this.operateUser = operateUser;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	public Long getClusterId() {
		return clusterId;
	}

	public void setClusterId(Long clusterId) {
		this.clusterId = clusterId;
	}

	public String getUserNameId() {
		return userNameId;
	}

	public void setUserNameId(String userNameId) {
		this.userNameId = userNameId;
	}

	public String getLatitudeSub() {
		return latitudeSub;
	}

	public void setLatitudeSub(String latitudeSub) {
		this.latitudeSub = latitudeSub;
	}

	public String getRuleName() {
		return ruleName;
	}

	public void setRuleName(String ruleName) {
		this.ruleName = ruleName;
	}

	public String getClusterName() {
		return clusterName;
	}

	public void setClusterName(String clusterName) {
		this.clusterName = clusterName;
	}

	public Integer getFrequencyCount() {
		return frequencyCount;
	}

	public void setFrequencyCount(Integer frequencyCount) {
		this.frequencyCount = frequencyCount;
	}
}
