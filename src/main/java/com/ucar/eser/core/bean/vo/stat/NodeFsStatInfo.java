package com.ucar.eser.core.bean.vo.stat;

import java.util.Date;

/**
 *
 * Created by wangjiulin on 2018/3/27.
 */
public class NodeFsStatInfo {

    private Long id;
    /**
     * 所属集群名称
     */
    private String clusterName;

    private Long clusterId;

    private String host;

    private Long totalInBytes;

    private Long freeInBytes;

    private Long availableInBytes;

    private Date createTime;

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

    public Long getClusterId() {
        return clusterId;
    }

    public void setClusterId(Long clusterId) {
        this.clusterId = clusterId;
    }

    public String getHost() {
        return host;
    }

    public void setHost(String host) {
        this.host = host;
    }

    public Long getTotalInBytes() {
        return totalInBytes;
    }

    public void setTotalInBytes(Long totalInBytes) {
        this.totalInBytes = totalInBytes;
    }

    public Long getFreeInBytes() {
        return freeInBytes;
    }

    public void setFreeInBytes(Long freeInBytes) {
        this.freeInBytes = freeInBytes;
    }

    public Long getAvailableInBytes() {
        return availableInBytes;
    }

    public void setAvailableInBytes(Long availableInBytes) {
        this.availableInBytes = availableInBytes;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }
}
