package com.ucar.eser.core.bean.vo.stat;

import java.io.Serializable;
import java.util.Date;

/**
 * 
 * Description: 命令统计信息
 * All Rights Reserved.
 * Created on 2016-10-25 下午2:59:15
 * @author  孔增（kongzeng@zuche.com）
 */
public class CommandStatInfo implements Serializable {
	
	
	/**
	 * 
	 */
	private static final long serialVersionUID = -4415895996363136940L;
	
	private Long id;
	/**
	 * 所属集群名称
	 */
	private String clusterName;
	/**
	 * 命令名称
	 */
	private String commandName;
	/**
	 * 服务端启动后执行总数
	 */
	private Long total;
    /**
     * 与上一打点执行命令差值
     */
    private Integer intervalTotal = 0;
    /**
     * 服务端启动后执行命令总耗时
     */
    private Long time;
    /**
     *  与上一打点执行耗时差值
     */
    private Integer intervalTime = 0;
    /**
     * 服务端收集时间
     */
    private Date collectTime;
    /**
     * 自动任务执行时间
     */
    private Date executeTime;
    
    private String startTime;
    
    private String endTime;

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
	public String getCommandName() {
		return commandName;
	}

	public void setCommandName(String commandName) {
		this.commandName = commandName;
	}

	public Long getTotal() {
		return total;
	}

	public void setTotal(Long total) {
		this.total = total;
	}

	public Integer getIntervalTotal() {
		return intervalTotal;
	}

	public void setIntervalTotal(Integer intervalTotal) {
		this.intervalTotal = intervalTotal;
	}

	public Long getTime() {
		return time;
	}

	public void setTime(Long time) {
		this.time = time;
	}

	public Integer getIntervalTime() {
		return intervalTime;
	}

	public void setIntervalTime(Integer intervalTime) {
		this.intervalTime = intervalTime;
	}

	public Date getCollectTime() {
		return collectTime;
	}

	public void setCollectTime(Date collectTime) {
		this.collectTime = collectTime;
	}

	public Date getExecuteTime() {
		return executeTime;
	}

	public void setExecuteTime(Date executeTime) {
		this.executeTime = executeTime;
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
