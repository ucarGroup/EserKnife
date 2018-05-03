package com.ucar.eser.admin.controller.sechedule.collecthandler;

import com.alibaba.fastjson.JSONObject;
import com.ucar.eser.admin.service.influxdbandmysql.HttpStatService;
import com.ucar.eser.core.bean.po.ClusterInfo;
import com.ucar.eser.core.bean.vo.stat.NodeHttpStatInfo;
import com.ucar.eser.core.init.SpringInit;
import com.ucar.eser.core.jest.JestManager;
import com.ucar.eser.core.util.async.KeyCallable;
import com.ucar.eser.core.util.common.Constant;

import java.util.*;

/**
 *
 * Created by wangjiulin on 2017/11/6.
 */
public class CollectionHttpStatHandler extends KeyCallable<Boolean> {

    private HttpStatService httpStatService = (HttpStatService) SpringInit.getApplicationContext().getBean("httpStatServiceImpl");

    private JSONObject data;

    private String clusterName;

    private Date executeTime;

    public CollectionHttpStatHandler(String key, String clusterName, JSONObject data, Date executeTime) {
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
            List<NodeHttpStatInfo> httpStatInfos = new ArrayList<NodeHttpStatInfo>();
            ClusterInfo clusterInfo = JestManager.CLUSTER_MAP.get(clusterName);
            while(nodeItor.hasNext()) {
                Map.Entry<String,Object> entry = nodeItor.next();
                JSONObject node = (JSONObject) entry.getValue();
                String host = node.getString(Constant.NODE_HOST);
                JSONObject  httpstat= node.getJSONObject(Constant.HTTP);
                NodeHttpStatInfo httpStatInfo = JSONObject.toJavaObject(httpstat, NodeHttpStatInfo.class);
                httpStatInfo.setHost(host);
                httpStatInfo.setClustName(clusterName);
                httpStatInfo.setClusterId(clusterInfo.getId());
                httpStatInfo.setCreateTime(executeTime);
                httpStatInfos.add(httpStatInfo);
            }
            httpStatService.batchInsert(httpStatInfos);
        } catch (Exception e) {
            LOGGER.error(clusterName+"线程统计信息异常(httpstat)", e);
        }
        return true;
    }
}
