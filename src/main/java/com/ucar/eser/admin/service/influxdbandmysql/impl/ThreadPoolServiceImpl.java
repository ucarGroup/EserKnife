package com.ucar.eser.admin.service.influxdbandmysql.impl;

import com.ucar.eser.admin.dao.influxdbandmysql.ThreadPoolDao;
import com.ucar.eser.admin.service.influxdbandmysql.ThreadPoolService;
import com.ucar.eser.core.bean.vo.stat.NodeThreadPoolStatInfo;
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
 * Created by wangjiulin on 2017/11/6.
 */
@Service
public class ThreadPoolServiceImpl implements ThreadPoolService {
    @Autowired
    private ThreadPoolDao threadPoolDao;

    @Override
    public void batchInsert(List<NodeThreadPoolStatInfo> nodeThreadPoolStatInfos) {
        if(InflusDbUtil.FLAG){
            if (CollectionUtils.isNotEmpty(nodeThreadPoolStatInfos)) {
                InfluxDB influxDB = InflusDbUtil.getConnection();
                BatchPoints batchPoints = BatchPoints.database(InflusDbUtil.DATABASE)
                        .retentionPolicy("autogen").consistency(InfluxDB.ConsistencyLevel.ALL).build();
                long times = System.currentTimeMillis();
                for (NodeThreadPoolStatInfo threadPoolStatInfo : nodeThreadPoolStatInfos) {
                    Point point = Point.measurement("thread_pool").time(times, TimeUnit.MILLISECONDS)
                            .tag("threadType",threadPoolStatInfo.getThreadType())
                            .tag("host", threadPoolStatInfo.getHost())
                            .tag("clusterName", threadPoolStatInfo.getClusterName())
                            .addField("createTime", DateUtil.formatYYYYMMddHHMMSS(threadPoolStatInfo.getCreateTime()))
                            .addField("largest",threadPoolStatInfo.getLargest())
                            .addField("completed",threadPoolStatInfo.getCompleted())
                            .addField("active",threadPoolStatInfo.getActive())
                            .addField("rejected",threadPoolStatInfo.getRejected())
                            .addField("threads",threadPoolStatInfo.getThreads())
                            .addField("queue",threadPoolStatInfo.getQueue())
                            .addField("intervalCompleted",threadPoolStatInfo.getIntervalCompleted())
                            .addField("intervalRejected",threadPoolStatInfo.getIntervalRejected())
                            .build();
                    batchPoints.point(point);
                }
                influxDB.write(batchPoints);
            }
        }else{
            threadPoolDao.batchInsert(nodeThreadPoolStatInfos);
        }
    }

    @Override
    public List<NodeThreadPoolStatInfo> getNodeThreadPoolStatInfos(NodeThreadPoolStatInfo nodeThreadPoolStatInfo) {
        return null;
    }
}
