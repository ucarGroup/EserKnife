package com.ucar.eser.core.bean.vo.stat;

import java.util.Date;

/**
 *
 * Created by wangjiulin on 2017/12/13.
 */
public class NodeCommonStatInfo  {

    private String host;

    private String clusterName;

    private Long clusterId;

    private Long nodeCount; //总的

    private Long dataNodeCount;

    private Long indicesCount;

    private Long shardCounts;

    private Long docCounts;

    private Long storeSize;

    private String clusterStatus;

    private Date createTime;

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

    public String getClusterName() {
        return clusterName;
    }

    public void setClusterName(String clusterName) {
        this.clusterName = clusterName;
    }

    public Long getNodeCount() {
        return nodeCount;
    }

    public void setNodeCount(Long nodeCount) {
        this.nodeCount = nodeCount;
    }

    public Long getIndicesCount() {
        return indicesCount;
    }

    public void setIndicesCount(Long indicesCount) {
        this.indicesCount = indicesCount;
    }

    public Long getShardCounts() {
        return shardCounts;
    }

    public void setShardCounts(Long shardCounts) {
        this.shardCounts = shardCounts;
    }

    public Long getDocCounts() {
        return docCounts;
    }

    public void setDocCounts(Long docCounts) {
        this.docCounts = docCounts;
    }

    public Long getStoreSize() {
        return storeSize;
    }

    public void setStoreSize(Long storeSize) {
        this.storeSize = storeSize;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public Long getDataNodeCount() {
        return dataNodeCount;
    }

    public void setDataNodeCount(Long dataNodeCount) {
        this.dataNodeCount = dataNodeCount;
    }

    public String getClusterStatus() {
        return clusterStatus;
    }

    public void setClusterStatus(String clusterStatus) {
        this.clusterStatus = clusterStatus;
    }
}
