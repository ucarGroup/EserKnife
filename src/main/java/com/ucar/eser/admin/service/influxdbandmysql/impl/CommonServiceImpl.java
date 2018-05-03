package com.ucar.eser.admin.service.influxdbandmysql.impl;

import com.ucar.eser.admin.dao.influxdbandmysql.CommonDao;
import com.ucar.eser.admin.service.influxdbandmysql.CommonService;
import com.ucar.eser.core.bean.vo.stat.NodeCommonStatInfo;
import com.ucar.eser.core.util.DateUtil;
import com.ucar.eser.core.util.InflusDbUtil;
import org.apache.commons.collections.CollectionUtils;
import org.influxdb.InfluxDB;
import org.influxdb.dto.BatchPoints;
import org.influxdb.dto.Point;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.concurrent.TimeUnit;

/**
 *
 * Created by wangjiulin on 2017/12/13.
 */
@Service
public class CommonServiceImpl implements CommonService {

    @Autowired
    private CommonDao commonDAO;

   @Override
    public void batchInsert(List<NodeCommonStatInfo> nodeCommonStatInfos) {
        if(InflusDbUtil.FLAG){
            if (CollectionUtils.isNotEmpty(nodeCommonStatInfos)) {
                InfluxDB influxDB = InflusDbUtil.getConnection();
                BatchPoints batchPoints = BatchPoints.database(InflusDbUtil.DATABASE)
                        .retentionPolicy("autogen").consistency(InfluxDB.ConsistencyLevel.ALL).build();
                long times = System.currentTimeMillis();
                for (NodeCommonStatInfo nodeCommonStatInfo : nodeCommonStatInfos) {
                    Point point = Point.measurement("common").time(times, TimeUnit.MILLISECONDS)
                            .tag("clusterName", nodeCommonStatInfo.getClusterName())
                            .addField("createTime", DateUtil.formatYYYYMMddHHMMSS(nodeCommonStatInfo.getCreateTime()))
                            .addField("nodeCount", nodeCommonStatInfo.getNodeCount())
                            .addField("dataNodeCount",nodeCommonStatInfo.getDataNodeCount())
                            .addField("docCount", nodeCommonStatInfo.getDocCounts())
                            .addField("storeSize", nodeCommonStatInfo.getStoreSize())
                            .addField("indiceCount", nodeCommonStatInfo.getIndicesCount())
                            .addField("shardCount", nodeCommonStatInfo.getShardCounts())
                            .addField("clusterStatus", nodeCommonStatInfo.getClusterStatus())
                            .build();
                    batchPoints.point(point);
                }
                influxDB.write(batchPoints);
            }
        }else{
            commonDAO.batchInsert(nodeCommonStatInfos);
        }
    }

    @Override
    public NodeCommonStatInfo getLastByParams(NodeCommonStatInfo nodeCommonStatInfo) {
        return commonDAO.getLastByParams(nodeCommonStatInfo);
    }
}
