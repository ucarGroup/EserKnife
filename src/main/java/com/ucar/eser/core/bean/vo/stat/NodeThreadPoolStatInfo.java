package com.ucar.eser.core.bean.vo.stat;


import java.io.Serializable;
import java.util.Date;


/**
 * 
 * Description: 结点线程池统计信息
 * All Rights Reserved.
 * Created on 2016-9-21 下午3:56:57
 * @author  孔增（kongzeng@zuche.com）
 */
public class NodeThreadPoolStatInfo implements Serializable {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = -245333980769435122L;
	
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
	 * 线程池类型
	 */
	private String threadType;
	/**
	 * 线程数
	 */
	private Integer threads;
	/**
	 * 任务队列数
	 */
	private Integer queue;
	/**
	 * 活跃线程数
	 */
    private Integer active;
    /**
     * 拒绝请求数
     */
    private Long rejected;
    /**
     * 拒绝请求数（与上一个点的差值）
     */
    private Integer intervalRejected = 0;
    /**
     * 最大线程数
     */
    private Integer largest;
    /**
     * 任务完成数
     */
    private Long completed;
    /**
     * 任务完成数（与上一个点的差值）
     */
    private Integer intervalCompleted = 0;
    /**
     * 打点信息获取时间
     */
    private Date createTime;
    /**
     * 服务端收集时间
     */
    private Date serverCollectTime;
    
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
	
	public String getThreadType() {
		return threadType;
	}
	
	public void setThreadType(String threadType) {
		this.threadType = threadType;
	}
	
	public Integer getThreads() {
		return threads;
	}
	
	public void setThreads(Integer threads) {
		this.threads = threads;
	}
	
	public Integer getQueue() {
		return queue;
	}
	
	public void setQueue(Integer queue) {
		this.queue = queue;
	}
	
	public Integer getActive() {
		return active;
	}
	
	public void setActive(Integer active) {
		this.active = active;
	}
	
	public Long getRejected() {
		return rejected;
	}
	
	public void setRejected(Long rejected) {
		this.rejected = rejected;
	}
	
	public Integer getLargest() {
		return largest;
	}
	
	public void setLargest(Integer largest) {
		this.largest = largest;
	}
	
	public Long getCompleted() {
		return completed;
	}
	
	public void setCompleted(Long completed) {
		this.completed = completed;
	}

	public Integer getIntervalRejected() {
		return intervalRejected;
	}

	public void setIntervalRejected(Integer intervalRejected) {
		this.intervalRejected = intervalRejected;
	}

	public Integer getIntervalCompleted() {
		return intervalCompleted;
	}

	public void setIntervalCompleted(Integer intervalCompleted) {
		this.intervalCompleted = intervalCompleted;
	}

	public Date getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
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

	public Date getServerCollectTime() {
		return serverCollectTime;
	}

	public void setServerCollectTime(Date serverCollectTime) {
		this.serverCollectTime = serverCollectTime;
	}
	
}
