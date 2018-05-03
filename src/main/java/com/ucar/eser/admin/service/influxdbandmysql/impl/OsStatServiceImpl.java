package com.ucar.eser.admin.service.influxdbandmysql.impl;

import com.ucar.eser.admin.dao.influxdbandmysql.OsStatDao;
import com.ucar.eser.admin.service.influxdbandmysql.OsStatService;
import com.ucar.eser.core.bean.vo.stat.NodeOSStatInfo;
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
 * Created by wangjiulin on 2017/11/8.
 */
@Service
public class OsStatServiceImpl implements OsStatService {
    @Autowired
    private OsStatDao osStatDao;

    @Override
    public void batchInsert(List<NodeOSStatInfo> statInfos) {
        if(InflusDbUtil.FLAG){
            if(CollectionUtils.isNotEmpty(statInfos)){
                InfluxDB influxDB = InflusDbUtil.getConnection();
                BatchPoints batchPoints = BatchPoints
                        .database(InflusDbUtil.DATABASE)
                        .retentionPolicy("autogen")
                        .consistency(InfluxDB.ConsistencyLevel.ALL)
                        .build();
                long times = System.currentTimeMillis();
                for (NodeOSStatInfo nodeOSStatInfo : statInfos){
                    Point point = Point.measurement("os")
                            .time(times, TimeUnit.MILLISECONDS)
                            .tag("host",nodeOSStatInfo.getHost())
                            .tag("clusterName",nodeOSStatInfo.getClusterName())
                            .addField("cpuPercent",nodeOSStatInfo.getCpuPercent())
                            .addField("loadAverage",nodeOSStatInfo.getLoadAverage())
                            .addField("memTotal",nodeOSStatInfo.getMemTotal())
                            .addField("memUsed",nodeOSStatInfo.getMemUsed())
                            .addField("memFree",nodeOSStatInfo.getMemFree())
                            .addField("memFreePercent",nodeOSStatInfo.getMemFreePercent())
                            .addField("memUsedPercent",nodeOSStatInfo.getMemUsedPercent())
                            .addField("swapTotal",nodeOSStatInfo.getSwapTotal())
                            .addField("swapUsed",nodeOSStatInfo.getSwapUsed())
                            .addField("swapFree",nodeOSStatInfo.getSwapFree())
                            .addField("createTime", DateUtil.formatYYYYMMddHHMMSS(nodeOSStatInfo.getCreateTime()))
                            .build();
                    batchPoints.point(point);
                }
                influxDB.write(batchPoints);
            }
        }else{
            osStatDao.batchInsert(statInfos);
        }
    }
}
