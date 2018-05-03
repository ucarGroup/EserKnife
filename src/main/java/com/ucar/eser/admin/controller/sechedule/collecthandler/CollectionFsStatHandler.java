package com.ucar.eser.admin.controller.sechedule.collecthandler;

import com.alibaba.fastjson.JSONObject;
import com.ucar.eser.admin.service.influxdbandmysql.FsStatService;
import com.ucar.eser.core.bean.po.ClusterInfo;
import com.ucar.eser.core.bean.vo.stat.NodeFsStatInfo;
import com.ucar.eser.core.init.SpringInit;
import com.ucar.eser.core.jest.JestManager;
import com.ucar.eser.core.util.async.KeyCallable;
import com.ucar.eser.core.util.common.Constant;

import java.util.*;

/**
 *
 * Created by wangjiulin on 2018/3/27.
 */
public class CollectionFsStatHandler extends KeyCallable<Boolean> {

    private FsStatService fsStatService = (FsStatService) SpringInit.getApplicationContext().getBean("fsStatServiceImpl");

    private JSONObject data;

    private String clusterName;

    private Date executeTime;

    public CollectionFsStatHandler(String key, String clusterName, JSONObject data, Date date) {
        super(key);
        this.data = data;
        this.clusterName = clusterName;
        this.executeTime = date;
    }

    @Override
    public Boolean execute() {
        try {
            JSONObject nodesObject = data.getJSONObject(Constant.NODES);
            Iterator<Map.Entry<String,Object>> nodeItor = nodesObject.entrySet().iterator();
            List<NodeFsStatInfo> nodeFsStatInfos = new ArrayList<NodeFsStatInfo>();
            ClusterInfo clusterInfo = JestManager.CLUSTER_MAP.get(clusterName);
            while(nodeItor.hasNext()) {
                Map.Entry<String,Object> entry = nodeItor.next();
                JSONObject node = (JSONObject) entry.getValue();
                String host = node.getString(Constant.NODE_HOST);

                NodeFsStatInfo nodeFsStatInfo = new NodeFsStatInfo();
                nodeFsStatInfo.setHost(host);
                nodeFsStatInfo.setClusterName(clusterName);
                nodeFsStatInfo.setClusterId(clusterInfo.getId());
                nodeFsStatInfo.setCreateTime(executeTime);

                JSONObject fsData= node.getJSONObject(Constant.FS);
                JSONObject fsTotalData= fsData.getJSONObject(Constant.FS_TOTAL);
                nodeFsStatInfo.setTotalInBytes(fsTotalData.getLongValue(Constant.FS_TOTAL_IN_BYTES));
                nodeFsStatInfo.setFreeInBytes(fsTotalData.getLongValue(Constant.FS_FREE_IN_BYTES));
                nodeFsStatInfo.setAvailableInBytes(fsTotalData.getLongValue(Constant.FS_AVAILABLE_IN_BYTES));
                nodeFsStatInfos.add(nodeFsStatInfo);
            }
            fsStatService.batchInsert(nodeFsStatInfos);
    }catch (Exception e){
        LOGGER.error(clusterName+"统计信息异常(fs)", e);
        return false;
    }
        return true;
    }
}
