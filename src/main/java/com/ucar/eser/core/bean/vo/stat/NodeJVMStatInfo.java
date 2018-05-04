package com.ucar.eser.core.bean.vo.stat;


import java.io.Serializable;
import java.util.Date;


/**
 * 
 * Description: 节点jvm信息统计vo
 * All Rights Reserved.
 * Created on 2016-11-14 上午11:18:35
 */

public class NodeJVMStatInfo implements Serializable {
	
	private static final long serialVersionUID = -7201393187269237L;
	
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
	 * 老生代已使用堆内存
	 */
	private long oldMemUsed;
	/**
	 * 老生代最大堆内存
	 */
	private long oldMemMax;
	/**
	 * 新生代内存最大可用值
	 */
	private long youngMemMax;
	/**
	 * 新生代内存已使用大小
	 */
	private long youngMemUsed;
	/**
	 * 老年代垃圾回收总次数
	 */
	private Long oldCollectionCount;
	/**
	 * 老年代垃圾回收总耗时
	 */
	private Long oldCollectionTime;

	private Long youngCollectionCount;

	private Long yongCollectionTime;

	private Long bufferPoolsDirectTotalCapacity;

	private Long bufferPoolsDirectCount;

	private Long bufferPoolsDirectUsed;

	private Long bufferPoolsMappedTotalCapacity;

	private Long bufferPoolsMappedCount;

	private Long bufferPoolsMappedUserd;

	private Long intervalOldCollectionCount;
	
	private Long intervalOldCollectionTime;

	private Long intervalYoungCollectionCount;

	private Long intervalYoungCollectionTime;

	private Long threadsCount;

	private Long threadsPeakCount;

	private Long heapUsedInBytes;

	private Long heapUsedPercent;

	private Long heapCommittedInBytes;

	private Long heapMaxInBytes;

	private Long nonHeapUsedInBytes;

	private Long nonHeapCommittedInBytes;

	private Date createTime;
	
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

	public Date getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}

	public Long getClusterId() {
		return clusterId;
	}

	public void setClusterId(Long clusterId) {
		this.clusterId = clusterId;
	}

	public void setIntervalOldCollectionCount(Long intervalOldCollectionCount) {
		this.intervalOldCollectionCount = intervalOldCollectionCount;
	}

	public void setIntervalOldCollectionTime(Long intervalOldCollectionTime) {
		this.intervalOldCollectionTime = intervalOldCollectionTime;
	}

	public Long getIntervalOldCollectionCount() {
		return intervalOldCollectionCount;
	}

	public Long getIntervalOldCollectionTime() {
		return intervalOldCollectionTime;
	}

	public Long getThreadsCount() {
		return threadsCount;
	}

	public Long getThreadsPeakCount() {
		return threadsPeakCount;
	}

	public Long getHeapUsedPercent() {
		return heapUsedPercent;
	}

	public void setThreadsCount(Long threadsCount) {
		this.threadsCount = threadsCount;
	}

	public void setThreadsPeakCount(Long threadsPeakCount) {
		this.threadsPeakCount = threadsPeakCount;
	}

	public void setHeapUsedPercent(Long heapUsedPercent) {
		this.heapUsedPercent = heapUsedPercent;
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

	public long getOldMemUsed() {
		return oldMemUsed;
	}

	public void setOldMemUsed(long oldMemUsed) {
		this.oldMemUsed = oldMemUsed;
	}

	public long getOldMemMax() {
		return oldMemMax;
	}

	public void setOldMemMax(long oldMemMax) {
		this.oldMemMax = oldMemMax;
	}
	
	public long getYoungMemMax() {
		return youngMemMax;
	}

	public void setYoungMemMax(long youngMemMax) {
		this.youngMemMax = youngMemMax;
	}

	public long getYoungMemUsed() {
		return youngMemUsed;
	}

	public void setYoungMemUsed(long youngMemUsed) {
		this.youngMemUsed = youngMemUsed;
	}

	public Long getOldCollectionCount() {
		return oldCollectionCount;
	}

	public void setOldCollectionCount(Long oldCollectionCount) {
		this.oldCollectionCount = oldCollectionCount;
	}

	public Long getOldCollectionTime() {
		return oldCollectionTime;
	}

	public void setOldCollectionTime(Long oldCollectionTime) {
		this.oldCollectionTime = oldCollectionTime;
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

	public static long getSerialVersionUID() {
		return serialVersionUID;
	}

	public Long getYoungCollectionCount() {
		return youngCollectionCount;
	}

	public void setYoungCollectionCount(Long youngCollectionCount) {
		this.youngCollectionCount = youngCollectionCount;
	}

	public Long getYongCollectionTime() {
		return yongCollectionTime;
	}

	public void setYongCollectionTime(Long yongCollectionTime) {
		this.yongCollectionTime = yongCollectionTime;
	}

	public Long getBufferPoolsDirectTotalCapacity() {
		return bufferPoolsDirectTotalCapacity;
	}

	public void setBufferPoolsDirectTotalCapacity(Long bufferPoolsDirectTotalCapacity) {
		this.bufferPoolsDirectTotalCapacity = bufferPoolsDirectTotalCapacity;
	}

	public Long getBufferPoolsDirectCount() {
		return bufferPoolsDirectCount;
	}

	public void setBufferPoolsDirectCount(Long bufferPoolsDirectCount) {
		this.bufferPoolsDirectCount = bufferPoolsDirectCount;
	}

	public Long getBufferPoolsDirectUsed() {
		return bufferPoolsDirectUsed;
	}

	public void setBufferPoolsDirectUsed(Long bufferPoolsDirectUsed) {
		this.bufferPoolsDirectUsed = bufferPoolsDirectUsed;
	}

	public Long getBufferPoolsMappedTotalCapacity() {
		return bufferPoolsMappedTotalCapacity;
	}

	public void setBufferPoolsMappedTotalCapacity(Long bufferPoolsMappedTotalCapacity) {
		this.bufferPoolsMappedTotalCapacity = bufferPoolsMappedTotalCapacity;
	}

	public Long getBufferPoolsMappedCount() {
		return bufferPoolsMappedCount;
	}

	public void setBufferPoolsMappedCount(Long bufferPoolsMappedCount) {
		this.bufferPoolsMappedCount = bufferPoolsMappedCount;
	}

	public Long getBufferPoolsMappedUserd() {
		return bufferPoolsMappedUserd;
	}

	public void setBufferPoolsMappedUserd(Long bufferPoolsMappedUserd) {
		this.bufferPoolsMappedUserd = bufferPoolsMappedUserd;
	}

	public Long getHeapUsedInBytes() {
		return heapUsedInBytes;
	}

	public void setHeapUsedInBytes(Long heapUsedInBytes) {
		this.heapUsedInBytes = heapUsedInBytes;
	}

	public Long getHeapCommittedInBytes() {
		return heapCommittedInBytes;
	}

	public void setHeapCommittedInBytes(Long heapCommittedInBytes) {
		this.heapCommittedInBytes = heapCommittedInBytes;
	}

	public Long getHeapMaxInBytes() {
		return heapMaxInBytes;
	}

	public void setHeapMaxInBytes(Long heapMaxInBytes) {
		this.heapMaxInBytes = heapMaxInBytes;
	}

	public Long getNonHeapUsedInBytes() {
		return nonHeapUsedInBytes;
	}

	public void setNonHeapUsedInBytes(Long nonHeapUsedInBytes) {
		this.nonHeapUsedInBytes = nonHeapUsedInBytes;
	}

	public Long getNonHeapCommittedInBytes() {
		return nonHeapCommittedInBytes;
	}

	public void setNonHeapCommittedInBytes(Long nonHeapCommittedInBytes) {
		this.nonHeapCommittedInBytes = nonHeapCommittedInBytes;
	}

	public Long getIntervalYoungCollectionTime() {
		return intervalYoungCollectionTime;
	}

	public void setIntervalYoungCollectionTime(Long intervalYoungCollectionTime) {
		this.intervalYoungCollectionTime = intervalYoungCollectionTime;
	}

	public Long getIntervalYoungCollectionCount() {
		return intervalYoungCollectionCount;
	}

	public void setIntervalYoungCollectionCount(Long intervalYoungCollectionCount) {
		this.intervalYoungCollectionCount = intervalYoungCollectionCount;
	}
}
