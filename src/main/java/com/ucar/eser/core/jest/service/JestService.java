package com.ucar.eser.core.jest.service;

import com.ucar.eser.core.jest.vo.SearchResultDetailVO;
import io.searchbox.client.JestResult;

import java.util.List;

/**
 * ES操作 抽象方法 基本包含所有基本操作
 */
public interface JestService {

    JestResult addType(String clustName,String indexName,String typeName,String json);

    JestResult delIndex(String clustName,String indexName);

    JestResult settingUpdate(String clustName,String indexName,String json);

    Object httpProxy(String clustName,String url,String methodName,String queryParam) throws Exception;

    JestResult deleteBulk(String clustName,String indexName,String Type,List<SearchResultDetailVO> results);

    JestResult searchScroll(String clustName,String scroll,String scrollId);
    /**
     * @param clustName 集群名称
     * @param indexName 索引名称
     */
    JestResult getMapping(String clustName,String indexName);
    /**
     *
     * @param clustName 集群名称
     * @param query  条件
     * @param indexName 索引名称
     */
    JestResult querySearch(String clustName,String query,String indexName);
    /**
     *
     * @param clustName 集群名称
     * @param nodeId 节点id
     */
    JestResult nodesStats(String clustName,String nodeId);

    /**
     *
     * @param clustName 集群名称
     * @param name name
     */
    JestResult clusterStats(String clustName,String name);

    /**
     *
     * @param clusterName 集群名称
     */
    JestResult getClusterState(String clusterName);
    /**
     *
     * @param clustName /stat
     */
    JestResult getStats(String clustName);

    JestResult getStatsDocsAndStore(String clustName);
    /**
     *
     * @param clustName /cluster/setting
     */
    JestResult getSetting (String clustName);

    /**
     *
     * @param clustName 集群名称
     */
    JestResult getAliases(String clustName);

    /**
     *
     * @param clustName 集群名称
     * @param flag 1:/_nodes/_all/os,jvm
     */
    JestResult getNoteSomInfo(String clustName,Integer flag);

    /**
     * 查看集群健康信息
     * @param clustName 集群名称
     */
    JestResult health(String clustName);

    /**
     * 节点状态
     */
    JestResult nodesStats(String clustName,Integer flag);

}

