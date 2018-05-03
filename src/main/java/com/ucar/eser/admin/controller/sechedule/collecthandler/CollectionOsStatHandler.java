package com.ucar.eser.admin.controller.sechedule.collecthandler;

import com.alibaba.fastjson.JSONObject;
import com.ucar.eser.admin.service.influxdbandmysql.OsStatService;
import com.ucar.eser.core.bean.po.ClusterInfo;
import com.ucar.eser.core.bean.vo.stat.NodeOSStatInfo;
import com.ucar.eser.core.init.SpringInit;
import com.ucar.eser.core.jest.JestManager;
import com.ucar.eser.core.util.JsonUtil;
import com.ucar.eser.core.util.async.KeyCallable;
import com.ucar.eser.core.util.common.Constant;

import java.util.*;

/**
 *
 * Created by wangjiulin on 2017/11/8.
 */
public class CollectionOsStatHandler  extends KeyCallable<Boolean>{

    private OsStatService osStatService = (OsStatService) SpringInit.getApplicationContext().getBean("osStatServiceImpl");

    private JSONObject data;

    private String clusterName;

    private Date executeTime;

    public CollectionOsStatHandler(String key, String clusterName, JSONObject data, Date executeTime) {
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
            List<NodeOSStatInfo> nodeOSStatInfos = new ArrayList<NodeOSStatInfo>();
            ClusterInfo clusterInfo = JestManager.CLUSTER_MAP.get(clusterName);
            while(nodeItor.hasNext()) {
                Map.Entry<String,Object> entry = nodeItor.next();
                JSONObject node = (JSONObject) entry.getValue();
                String host = node.getString(Constant.NODE_HOST);

                NodeOSStatInfo nodeOSStatInfo = new NodeOSStatInfo();
                nodeOSStatInfo.setHost(host);
                nodeOSStatInfo.setClusterName(clusterName);
                nodeOSStatInfo.setClusterId(clusterInfo.getId());
                nodeOSStatInfo.setCreateTime(executeTime);

                JSONObject cpuData= node.getJSONObject(Constant.OS);
                nodeOSStatInfo.setCpuPercent(cpuData.getLongValue(Constant.OS_CPU_PERCENT));
                nodeOSStatInfo.setLoadAverage(cpuData.getDoubleValue(Constant.OS_LOAD));

                JSONObject cpuMem= (JSONObject) JsonUtil.getValueByPath(cpuData,Constant.OS_MEM);
                nodeOSStatInfo.setMemTotal(cpuMem != null ? cpuMem.getLongValue(Constant.OS_TOTAL) : 0);
                nodeOSStatInfo.setMemUsed(cpuMem != null ? cpuMem.getLongValue(Constant.OS_USED) : 0);
                nodeOSStatInfo.setMemFree(cpuMem != null ? cpuMem.getLongValue(Constant.OS_FREE) : 0);
                nodeOSStatInfo.setMemFreePercent(cpuMem != null ? cpuMem.getLongValue(Constant.OS_MEM_FREE_PERCENT) : 0);
                nodeOSStatInfo.setMemUsedPercent(cpuMem != null ? cpuMem.getLongValue(Constant.OS_MEM_USED_PERCENT) : 0);

                JSONObject cpuSwap= (JSONObject) JsonUtil.getValueByPath(cpuData,Constant.OS_SWAP);
                nodeOSStatInfo.setSwapTotal(cpuSwap != null ? cpuSwap.getLongValue(Constant.OS_TOTAL) : 0);
                nodeOSStatInfo.setSwapUsed(cpuSwap != null ? cpuSwap.getLongValue(Constant.OS_USED) : 0);
                nodeOSStatInfo.setSwapFree(cpuSwap != null ? cpuSwap.getLongValue(Constant.OS_FREE) : 0);

                nodeOSStatInfos.add(nodeOSStatInfo);
            }
            osStatService.batchInsert(nodeOSStatInfos);
        }catch (Exception e){
            LOGGER.error(clusterName+"统计信息异常(os)", e);
        }
        return true;
    }
}
