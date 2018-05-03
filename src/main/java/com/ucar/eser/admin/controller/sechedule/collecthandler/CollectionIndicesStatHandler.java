package com.ucar.eser.admin.controller.sechedule.collecthandler;

import com.alibaba.fastjson.JSONObject;
import com.ucar.eser.admin.service.influxdbandmysql.IndiceService;
import com.ucar.eser.core.bean.po.ClusterInfo;
import com.ucar.eser.core.bean.vo.stat.NodeIndiceStatInfo;
import com.ucar.eser.core.init.SpringInit;
import com.ucar.eser.core.jest.JestManager;
import com.ucar.eser.core.util.async.KeyCallable;
import com.ucar.eser.core.util.common.Constant;

import java.util.*;

/**
 *
 * Created by wangjiulin on 2017/11/6.
 */
public class CollectionIndicesStatHandler extends KeyCallable<Boolean> {

    private IndiceService indiceService =  (IndiceService) SpringInit.getApplicationContext().getBean("indiceServiceImpl");

    private JSONObject data;

    private String clusterName;

    private Date executeTime;

    public CollectionIndicesStatHandler(String key, String clusterName, JSONObject data, Date executeTime) {
        super(key);
        this.data = data;
        this.clusterName = clusterName;
        this.executeTime = executeTime;
    }

    @Override
    public Boolean execute() {
        try {
            JSONObject nodesObject = data.getJSONObject(Constant.NODES);
            Iterator<Map.Entry<String,Object>> nodeItor = nodesObject.entrySet().iterator();
            List<NodeIndiceStatInfo> indiceStatInfos = new ArrayList<NodeIndiceStatInfo>();
            ClusterInfo clusterInfo = JestManager.CLUSTER_MAP.get(clusterName);
            while(nodeItor.hasNext()) {
                Map.Entry<String,Object> entry = nodeItor.next();
                JSONObject node = (JSONObject) entry.getValue();
                String host = node.getString(Constant.NODE_HOST);
                JSONObject  indiceNode= node.getJSONObject(Constant.INDICES);
                NodeIndiceStatInfo nodeIndiceStatInfo = new NodeIndiceStatInfo();
                nodeIndiceStatInfo.setClusterId(clusterInfo.getId());

                JSONObject docs = indiceNode.getJSONObject(Constant.DOCS);
                nodeIndiceStatInfo.setDocsCount(docs.getLong(Constant.COUNT));

                JSONObject field = indiceNode.getJSONObject(Constant.FIELDDATA);
                nodeIndiceStatInfo.setFielddataEvictions(field.getLong(Constant.EVICTIONS));
                nodeIndiceStatInfo.setFielddataMemorySizeInBytes(field.getLong(Constant.MEMORY_SIZE_IN_BYTES));

                JSONObject get = indiceNode.getJSONObject(Constant.GET);
                nodeIndiceStatInfo.setGetExistsTimeInMillis(get.getLong(Constant.EXISTS_TIME_IN_MILLIS));
                nodeIndiceStatInfo.setGetExistsTotal(get.getLong(Constant.EXISTS_TOTAL));
                nodeIndiceStatInfo.setGetMissingTimeInMillis(get.getLong(Constant.MISSING_TIME_IN_MILLIS));
                nodeIndiceStatInfo.setGetMissingTotal(get.getLong(Constant.MISSING_TOTAL));
                nodeIndiceStatInfo.setGetTimeInMillis(get.getLong(Constant.TIME_IN_MILLIS));
                nodeIndiceStatInfo.setGetTotal(get.getLong(Constant.TOTAL));

                JSONObject search = indiceNode.getJSONObject(Constant.SEARCH);
                nodeIndiceStatInfo.setSearchFetchTimeInMillis(search.getLong(Constant.FETCH_TIME_IN_MILLIS));
                nodeIndiceStatInfo.setSearchFetchTotal(search.getLong(Constant.FETCH_TOTAL));
                nodeIndiceStatInfo.setSearchQueryTimeInMillis(search.getLong(Constant.QUERY_TIME_IN_MILLIS));
                nodeIndiceStatInfo.setSearchQueryTotal(search.getLong(Constant.QUERY_TOTAL));

                JSONObject indicing = indiceNode.getJSONObject(Constant.INDEXING);
                nodeIndiceStatInfo.setIndexingDeleteTimeInMillis(indicing.getLong(Constant.DELETE_TIME_IN_MILLIS));
                nodeIndiceStatInfo.setIndexingDeleteTotal(indicing.getLong(Constant.DELETE_TOTAL));
                nodeIndiceStatInfo.setIndexingIndexTimeInMillis(indicing.getLong(Constant.INDEX_TIME_IN_MILLIS));
                nodeIndiceStatInfo.setIndexingIndexTotal(indicing.getLong(Constant.INDEX_TOTAL));

                JSONObject segments = indiceNode.getJSONObject(Constant.SEGMENTS);
                nodeIndiceStatInfo.setSegmentsCount(segments.getLong(Constant.COUNT));

                JSONObject store = indiceNode.getJSONObject(Constant.STORE);
                nodeIndiceStatInfo.setStoreSizeInBytes(store.getLong(Constant.SIZE_IN_BYTES));

                nodeIndiceStatInfo.setHost(host);
                nodeIndiceStatInfo.setClusterName(clusterName);
                nodeIndiceStatInfo.setCreateTime(executeTime);
                indiceStatInfos.add(nodeIndiceStatInfo);
            }
            indiceService.batchInsert(indiceStatInfos);
        } catch (Exception e) {
            LOGGER.error(clusterName+"线程统计信息异常(indicestat)", e);
        }
        return true;
    }
}
