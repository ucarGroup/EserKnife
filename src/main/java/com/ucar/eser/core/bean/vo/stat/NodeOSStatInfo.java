package com.ucar.eser.core.bean.vo.stat;


import com.fasterxml.jackson.annotation.JsonIgnore;

import java.io.Serializable;
import java.util.Date;


/**
 * 
 * Description: 节点os信息统计vo
 * All Rights Reserved.
 * Created on 2016-11-14 上午11:18:35
 * @author  孔增（kongzeng@zuche.com）
 */
public class NodeOSStatInfo implements Serializable {

	private static final long serialVersionUID = -223554406630437609L;
	
	private Long id;
	/**
	 * 所属集群名称
	 */
	private String clusterName;

	private Long clusterId;
    /**
     * 所属结点ip
     */
	private String host;
	
	/**
	 * cpu使用率
	 */
	private Long cpuPercent;
	/**
	 * 负载
	 */
	private Double loadAverage;
	/**
	 * 总内存
	 */
	private long memTotal;
	/**
	 * 已使用内存
	 */
	private long memUsed;

	private long memFree;

	private long memFreePercent;

	private long memUsedPercent;
	/**
	 * 总swap大小
	 */
	private long swapTotal;
	/**
	 * 已使用swap大小
	 */
	private long swapUsed;

	private long swapFree;
    /**
     * 服务端收集时间
     */
    private Date createTime;

	private String startTime;

	private String endTime;

	public Long getClusterId() {
		return clusterId;
	}

	public void setClusterId(Long clusterId) {
		this.clusterId = clusterId;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getClusterName() {
		return clusterName;
	}

	public void setClusterName(String clusterName) {
		this.clusterName = clusterName;
	}

	public String getHost() {
		return host;
	}

	public void setHost(String host) {
		this.host = host;
	}

	public Long getCpuPercent() {
		return cpuPercent;
	}

	public void setCpuPercent(Long cpuPercent) {
		this.cpuPercent = cpuPercent;
	}

	public Double getLoadAverage() {
		return loadAverage;
	}

	public void setLoadAverage(Double loadAverage) {
		this.loadAverage = loadAverage;
	}

	public long getMemTotal() {
		return memTotal;
	}

	public void setMemTotal(long memTotal) {
		this.memTotal = memTotal;
	}

	public long getMemUsed() {
		return memUsed;
	}

	public void setMemUsed(long memUsed) {
		this.memUsed = memUsed;
	}

	public long getSwapTotal() {
		return swapTotal;
	}

	public void setSwapTotal(long swapTotal) {
		this.swapTotal = swapTotal;
	}

	public long getSwapUsed() {
		return swapUsed;
	}

	public void setSwapUsed(long swapUsed) {
		this.swapUsed = swapUsed;
	}

	public Date getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}

	public long getMemFree() {
		return memFree;
	}

	public void setMemFree(long memFree) {
		this.memFree = memFree;
	}

	public long getMemFreePercent() {
		return memFreePercent;
	}

	public void setMemFreePercent(long memFreePercent) {
		this.memFreePercent = memFreePercent;
	}

	public long getMemUsedPercent() {
		return memUsedPercent;
	}

	public void setMemUsedPercent(long memUsedPercent) {
		this.memUsedPercent = memUsedPercent;
	}

	public long getSwapFree() {
		return swapFree;
	}

	public void setSwapFree(long swapFree) {
		this.swapFree = swapFree;
	}

	public String getStartTime() {
		return startTime;
	}

	public void setStartTime(String startTime) {
		this.startTime = startTime;
	}

	public String getEndTime() {
		return endTime;
	}

	public void setEndTime(String endTime) {
		this.endTime = endTime;
	}
}
