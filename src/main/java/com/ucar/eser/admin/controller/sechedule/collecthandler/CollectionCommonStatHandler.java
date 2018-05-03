package com.ucar.eser.admin.controller.sechedule.collecthandler;

import com.alibaba.fastjson.JSONObject;
import com.ucar.eser.admin.controller.sechedule.alarm.HealthAlarm;
import com.ucar.eser.admin.controller.sechedule.job.JobKey;
import com.ucar.eser.admin.service.influxdbandmysql.CommonService;
import com.ucar.eser.core.bean.po.ClusterInfo;
import com.ucar.eser.core.bean.vo.stat.NodeCommonStatInfo;
import com.ucar.eser.core.init.SpringInit;
import com.ucar.eser.core.jest.JestManager;
import com.ucar.eser.core.jest.service.JestService;
import com.ucar.eser.core.util.InflusDbUtil;
import com.ucar.eser.core.util.async.AsyncService;
import com.ucar.eser.core.util.async.KeyCallable;
import com.ucar.eser.core.util.common.Constant;
import io.searchbox.client.JestResult;
import org.influxdb.InfluxDB;
import org.influxdb.dto.Query;
import org.influxdb.dto.QueryResult;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 *
 * Created by wangjiulin on 2017/11/6.
 */
public class CollectionCommonStatHandler extends KeyCallable<Boolean> {

    private AsyncService asyncService = (AsyncService) SpringInit.getApplicationContext().getBean("asyncServiceImpl");

    private CommonService commonService = (CommonService) SpringInit.getApplicationContext().getBean("commonServiceImpl");

    private JestService jestService = (JestService) SpringInit.getApplicationContext().getBean("jestServiceImpl");

    protected JSONObject data;

    private String clusterName;

    private Date executeTime;

    public CollectionCommonStatHandler(String key, String clusterName, JSONObject data, Date executeTime) {
        super(key);
        this.data = data;
        this.clusterName = clusterName;
        this.executeTime = executeTime;
    }

    @Override
    public Boolean execute() {
        try {

            List<NodeCommonStatInfo> nodeCommonStatInfos = new ArrayList<NodeCommonStatInfo>();
            NodeCommonStatInfo nodeCommonStatInfo = new NodeCommonStatInfo();

            ClusterInfo clusterInfo = JestManager.CLUSTER_MAP.get(clusterName);
            nodeCommonStatInfo.setClusterId(clusterInfo.getId());

            JestResult healthInfo = (JestResult) jestService.httpProxy(clusterName,"/_cluster/health","GET",null);
            JSONObject healthObject = JSONObject.parseObject(healthInfo.getJsonString());


            JestResult clusterStatInfo = (JestResult) jestService.httpProxy(clusterName,"/_cluster/stats","GET",null);
            JSONObject clusterObject = JSONObject.parseObject(clusterStatInfo.getJsonString());


            nodeCommonStatInfo.setClusterStatus(healthObject.getString(Constant.STATUS));
            nodeCommonStatInfo.setNodeCount(healthObject.getLong(Constant.NUMBER_OF_NODES));
            nodeCommonStatInfo.setDataNodeCount(healthObject.getLong(Constant.NUMBER_OF_DATA_NODES));

            JSONObject indicesObject = clusterObject.getJSONObject(Constant.INDICES);
            nodeCommonStatInfo.setIndicesCount(indicesObject.getLong(Constant.COUNT));

            nodeCommonStatInfo.setShardCounts(healthObject.getLong(Constant.ACTIVE_SHARDS));

            JSONObject docObject = indicesObject.getJSONObject(Constant.DOCS);
            nodeCommonStatInfo.setDocCounts(docObject.getLong(Constant.COUNT));

            JSONObject storeObject = indicesObject.getJSONObject(Constant.STORE);
            nodeCommonStatInfo.setStoreSize(storeObject.getLong(Constant.SIZE_IN_BYTES));
            nodeCommonStatInfo.setClusterName(clusterName);
            nodeCommonStatInfo.setCreateTime(executeTime);
            nodeCommonStatInfos.add(nodeCommonStatInfo);
            QueryResult queryResult = null;
            NodeCommonStatInfo nodeCommonStatInfosParam = null;
            if(InflusDbUtil.FLAG){
                InfluxDB influxDB = InflusDbUtil.getConnection();
                Query query = new Query("SELECT last(clusterStatus) as clusterStatus,last(createTime) as createTime FROM common where clusterName = '"+clusterName+"'",InflusDbUtil.DATABASE);
                queryResult = influxDB.query(query);
            }else{
                nodeCommonStatInfosParam = commonService.getLastByParams(nodeCommonStatInfo);
            }
            commonService.batchInsert(nodeCommonStatInfos);
            asyncService.submitFuture(new HealthAlarm(JobKey.buildFutureKey(clusterName, Constant.INDICES, executeTime), clusterName,healthInfo.getJsonString(), queryResult,nodeCommonStatInfosParam));
        } catch (Exception e) {
            LOGGER.error(clusterName+"线程统计信息异常(commonStat)", e);
        }
        return true;
    }

}
