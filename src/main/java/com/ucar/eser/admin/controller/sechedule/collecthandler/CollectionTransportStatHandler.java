package com.ucar.eser.admin.controller.sechedule.collecthandler;

import com.alibaba.fastjson.JSONObject;
import com.ucar.eser.admin.service.influxdbandmysql.TransportStatService;
import com.ucar.eser.core.bean.po.ClusterInfo;
import com.ucar.eser.core.bean.vo.stat.NodeTransportStatInfo;
import com.ucar.eser.core.init.SpringInit;
import com.ucar.eser.core.jest.JestManager;
import com.ucar.eser.core.util.async.KeyCallable;
import com.ucar.eser.core.util.common.Constant;

import java.util.*;

/**
 *
 * Created by wangjiulin on 2017/11/6.
 */
public class CollectionTransportStatHandler  extends KeyCallable<Boolean> {

    private TransportStatService transportStatService = (TransportStatService) SpringInit.getApplicationContext().getBean("transportStatServiceImpl");

    private JSONObject data;

    private String clusterName;

    private Date executeTime;

    public CollectionTransportStatHandler(String key, String clusterName, JSONObject data, Date executeTime) {
        super(key);
        this.data = data;
        this.clusterName = clusterName;
        this.executeTime = executeTime;
    }

    @Override
    public Boolean execute() {
        try {
            JSONObject nodesObject = data.getJSONObject(Constant.NODES);
            Iterator<Map.Entry<String, Object>> nodeItor = nodesObject.entrySet().iterator();
            List<NodeTransportStatInfo> transportStatInfos = new ArrayList<NodeTransportStatInfo>();
            ClusterInfo clusterInfo = JestManager.CLUSTER_MAP.get(clusterName);
            while (nodeItor.hasNext()) {
                Map.Entry<String, Object> entry = nodeItor.next();
                JSONObject node = (JSONObject) entry.getValue();
                String host = node.getString(Constant.NODE_HOST);
                JSONObject transportStat = node.getJSONObject(Constant.TRANSPORT);
                NodeTransportStatInfo transportStatInfo = JSONObject.toJavaObject(transportStat, NodeTransportStatInfo.class);
                transportStatInfo.setHost(host);
                transportStatInfo.setClusterId(clusterInfo.getId());
                transportStatInfo.setClustName(clusterName);
                transportStatInfo.setCreateTime(executeTime);
                transportStatInfos.add(transportStatInfo);
            }
            transportStatService.batchInsert(transportStatInfos);
        } catch (Exception e) {
            LOGGER.error(clusterName + "线程统计信息异常(transport)", e);
        }
        return true;
    }
}
