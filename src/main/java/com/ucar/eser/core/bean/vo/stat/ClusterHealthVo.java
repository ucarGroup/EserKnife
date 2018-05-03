package com.ucar.eser.core.bean.vo.stat;

import java.io.Serializable;

/**
 * 
 * Description: 集群健康度信息
 * All Rights Reserved.
 * Created on 2016-10-19 下午6:42:11
 * @author  孔增（kongzeng@zuche.com）
 */
public class ClusterHealthVo implements Serializable{

	private static final long serialVersionUID = -5540875626734211545L;
	//健康状态
	private String status;
	//请求是否超时
	private boolean time_out;
	//重新迁移的分片数
	private Integer relocating_shards;
	//正在初始化的分片数
	private Integer initializing_shards;
	//未分配分片数
	private Integer unassigned_shards;
	//检测时间
	private long checkTime = System.currentTimeMillis();
	//报警次数
	private int alarmNum = 1;
	
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public void setAlarmNum(int alarmNum) {
		this.alarmNum = alarmNum;
	}
	public boolean isTime_out() {
		return time_out;
	}
	public void setTime_out(boolean time_out) {
		this.time_out = time_out;
	}
	public Integer getRelocating_shards() {
		return relocating_shards;
	}
	public void setRelocating_shards(Integer relocating_shards) {
		this.relocating_shards = relocating_shards;
	}
	public Integer getInitializing_shards() {
		return initializing_shards;
	}
	public void setInitializing_shards(Integer initializing_shards) {
		this.initializing_shards = initializing_shards;
	}
	public long getCheckTime() {
		return checkTime;
	}
	public void setCheckTime(long checkTime) {
		this.checkTime = checkTime;
	}
	public Integer getAlarmNum() {
		return alarmNum;
	}
	public void setAlarmNum(Integer alarmNum) {
		this.alarmNum = alarmNum;
	}
	public Integer getUnassigned_shards() {
		return unassigned_shards;
	}
	public void setUnassigned_shards(Integer unassigned_shards) {
		this.unassigned_shards = unassigned_shards;
	}
	
}
