package com.ucar.eser.admin.service.influxdbandmysql.impl;

import com.ucar.eser.admin.dao.influxdbandmysql.JvmDao;
import com.ucar.eser.core.util.InflusDbUtil;
import com.ucar.eser.admin.service.influxdbandmysql.JvmService;
import com.ucar.eser.core.bean.vo.stat.NodeJVMStatInfo;
import com.ucar.eser.core.util.DateUtil;
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
 * Created by wangjiulin on 2017/11/6.
 */
@Service
public class JvmServiceImpl implements JvmService {

    @Autowired
    private JvmDao jvmDao;

    @Override
    public void batchInsert(List<NodeJVMStatInfo> statInfos) {
        if(InflusDbUtil.FLAG){
            if(CollectionUtils.isNotEmpty(statInfos)){
                InfluxDB influxDB = InflusDbUtil.getConnection();
                BatchPoints batchPoints = BatchPoints
                        .database(InflusDbUtil.DATABASE)
                        .retentionPolicy("autogen")
                        .consistency(InfluxDB.ConsistencyLevel.ALL)
                        .build();
                long times = System.currentTimeMillis();
                for (NodeJVMStatInfo nodeJVMStatInfo : statInfos){
                    Point point = Point.measurement("jvm")
                            .time(times, TimeUnit.MILLISECONDS)
                            .tag("host",nodeJVMStatInfo.getHost())
                            .tag("clusterName",nodeJVMStatInfo.getClusterName())
                            .addField("threadsCount",nodeJVMStatInfo.getThreadsCount())
                            .addField("threadsPeakCount",nodeJVMStatInfo.getThreadsPeakCount())
                            .addField("heapUsedInBytes",nodeJVMStatInfo.getHeapUsedInBytes())
                            .addField("heapUsedPercent",nodeJVMStatInfo.getHeapUsedPercent())
                            .addField("heapCommittedInBytes",nodeJVMStatInfo.getHeapCommittedInBytes())
                            .addField("heapMaxInBytes",nodeJVMStatInfo.getHeapMaxInBytes())
                            .addField("nonHeapUsedInBytes",nodeJVMStatInfo.getNonHeapUsedInBytes())
                            .addField("nonHeapCommittedInBytes",nodeJVMStatInfo.getNonHeapCommittedInBytes())
                            .addField("oldMemUsed", nodeJVMStatInfo.getOldMemUsed())
                            .addField("oldMemMax", nodeJVMStatInfo.getOldMemMax())
                            .addField("youngMemMax", nodeJVMStatInfo.getYoungMemMax())
                            .addField("youngMemUsed",nodeJVMStatInfo.getYoungMemUsed())
                            .addField("oldCollectionCount",nodeJVMStatInfo.getOldCollectionCount())
                            .addField("oldCollectionTime",nodeJVMStatInfo.getOldCollectionTime())
                            .addField("youngCollectionCount",nodeJVMStatInfo.getYoungCollectionCount())
                            .addField("youngCollectionTime",nodeJVMStatInfo.getYongCollectionTime())
                            .addField("intervalOldCollectionCount",nodeJVMStatInfo.getIntervalOldCollectionCount())
                            .addField("intervalOldCollectionTime",nodeJVMStatInfo.getIntervalOldCollectionTime())
                            .addField("bufferPoolsDirectTotalCapacity",nodeJVMStatInfo.getBufferPoolsDirectTotalCapacity())
                            .addField("bufferPoolsDirectCount",nodeJVMStatInfo.getBufferPoolsDirectCount())
                            .addField("bufferPoolsDirectUsed",nodeJVMStatInfo.getBufferPoolsDirectUsed())
                            .addField("bufferPoolsMappedTotalCapacity",nodeJVMStatInfo.getBufferPoolsMappedTotalCapacity())
                            .addField("bufferPoolsMappedCount",nodeJVMStatInfo.getBufferPoolsMappedCount())
                            .addField("bufferPoolsMappedUserd",nodeJVMStatInfo.getBufferPoolsMappedUserd())
                            .addField("collectTime", DateUtil.formatYYYYMMddHHMMSS(nodeJVMStatInfo.getCollectTime()))
                            .addField("executeTime",DateUtil.formatYYYYMMddHHMMSS(nodeJVMStatInfo.getExecuteTime()))
                            .build();
                    batchPoints.point(point);
                }
                influxDB.write(batchPoints);
            }
        }else{
            jvmDao.batchInsert(statInfos);
        }
    }

    @Override
    public NodeJVMStatInfo getLastByParams(NodeJVMStatInfo nodeJVMStatInfo) {
        return jvmDao.getLastByParams(nodeJVMStatInfo);
    }
}
