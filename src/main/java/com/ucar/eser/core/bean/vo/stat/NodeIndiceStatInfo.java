package com.ucar.eser.core.bean.vo.stat;

import java.io.Serializable;
import java.util.Date;

/**
 *
 * Created by wangjiulin on 2017/12/13.
 */
public class NodeIndiceStatInfo implements Serializable{

    private String host;

    private String clusterName;

    private Long clusterId;

    private Long docsCount;

    private Long storeSizeInBytes;

    private Long segmentsCount;

    private Long indexingIndexTotal;

    private Long indexingIndexTimeInMillis;

    private Long indexingDeleteTotal;

    private Long indexingDeleteTimeInMillis;

    private Long getTotal;

    private Long getTimeInMillis;

    private Long getExistsTotal;

    private Long getExistsTimeInMillis;

    private Long getMissingTotal;

    private Long getMissingTimeInMillis;

    private Long searchQueryTotal;

    private Long searchQueryTimeInMillis;

    private Long searchFetchTotal;

    private Long searchFetchTimeInMillis;

    private Long fielddataMemorySizeInBytes;

    private Long fielddataEvictions;

    private Date createTime;

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

    public Long getClusterId() {
        return clusterId;
    }

    public void setClusterId(Long clusterId) {
        this.clusterId = clusterId;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public Long getDocsCount() {
        return docsCount;
    }

    public void setDocsCount(Long docsCount) {
        this.docsCount = docsCount;
    }

    public Long getStoreSizeInBytes() {
        return storeSizeInBytes;
    }

    public void setStoreSizeInBytes(Long storeSizeInBytes) {
        this.storeSizeInBytes = storeSizeInBytes;
    }

    public Long getSegmentsCount() {
        return segmentsCount;
    }

    public void setSegmentsCount(Long segmentsCount) {
        this.segmentsCount = segmentsCount;
    }

    public Long getIndexingIndexTotal() {
        return indexingIndexTotal;
    }

    public void setIndexingIndexTotal(Long indexingIndexTotal) {
        this.indexingIndexTotal = indexingIndexTotal;
    }

    public Long getIndexingIndexTimeInMillis() {
        return indexingIndexTimeInMillis;
    }

    public void setIndexingIndexTimeInMillis(Long indexingIndexTimeInMillis) {
        this.indexingIndexTimeInMillis = indexingIndexTimeInMillis;
    }

    public Long getIndexingDeleteTotal() {
        return indexingDeleteTotal;
    }

    public void setIndexingDeleteTotal(Long indexingDeleteTotal) {
        this.indexingDeleteTotal = indexingDeleteTotal;
    }

    public Long getIndexingDeleteTimeInMillis() {
        return indexingDeleteTimeInMillis;
    }

    public void setIndexingDeleteTimeInMillis(Long indexingDeleteTimeInMillis) {
        this.indexingDeleteTimeInMillis = indexingDeleteTimeInMillis;
    }

    public Long getGetTotal() {
        return getTotal;
    }

    public void setGetTotal(Long getTotal) {
        this.getTotal = getTotal;
    }

    public Long getGetTimeInMillis() {
        return getTimeInMillis;
    }

    public void setGetTimeInMillis(Long getTimeInMillis) {
        this.getTimeInMillis = getTimeInMillis;
    }

    public Long getGetExistsTotal() {
        return getExistsTotal;
    }

    public void setGetExistsTotal(Long getExistsTotal) {
        this.getExistsTotal = getExistsTotal;
    }

    public Long getGetExistsTimeInMillis() {
        return getExistsTimeInMillis;
    }

    public void setGetExistsTimeInMillis(Long getExistsTimeInMillis) {
        this.getExistsTimeInMillis = getExistsTimeInMillis;
    }

    public Long getGetMissingTotal() {
        return getMissingTotal;
    }

    public void setGetMissingTotal(Long getMissingTotal) {
        this.getMissingTotal = getMissingTotal;
    }

    public Long getGetMissingTimeInMillis() {
        return getMissingTimeInMillis;
    }

    public void setGetMissingTimeInMillis(Long getMissingTimeInMillis) {
        this.getMissingTimeInMillis = getMissingTimeInMillis;
    }

    public Long getSearchQueryTotal() {
        return searchQueryTotal;
    }

    public void setSearchQueryTotal(Long searchQueryTotal) {
        this.searchQueryTotal = searchQueryTotal;
    }

    public Long getSearchQueryTimeInMillis() {
        return searchQueryTimeInMillis;
    }

    public void setSearchQueryTimeInMillis(Long searchQueryTimeInMillis) {
        this.searchQueryTimeInMillis = searchQueryTimeInMillis;
    }

    public Long getSearchFetchTotal() {
        return searchFetchTotal;
    }

    public void setSearchFetchTotal(Long searchFetchTotal) {
        this.searchFetchTotal = searchFetchTotal;
    }

    public Long getSearchFetchTimeInMillis() {
        return searchFetchTimeInMillis;
    }

    public void setSearchFetchTimeInMillis(Long searchFetchTimeInMillis) {
        this.searchFetchTimeInMillis = searchFetchTimeInMillis;
    }

    public Long getFielddataMemorySizeInBytes() {
        return fielddataMemorySizeInBytes;
    }

    public void setFielddataMemorySizeInBytes(Long fielddataMemorySizeInBytes) {
        this.fielddataMemorySizeInBytes = fielddataMemorySizeInBytes;
    }

    public Long getFielddataEvictions() {
        return fielddataEvictions;
    }

    public void setFielddataEvictions(Long fielddataEvictions) {
        this.fielddataEvictions = fielddataEvictions;
    }

}
