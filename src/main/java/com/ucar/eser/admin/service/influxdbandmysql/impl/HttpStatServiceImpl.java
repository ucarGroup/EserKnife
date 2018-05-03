package com.ucar.eser.admin.service.influxdbandmysql.impl;

import com.ucar.eser.admin.dao.influxdbandmysql.HttpStatDao;
import com.ucar.eser.admin.service.influxdbandmysql.HttpStatService;
import com.ucar.eser.core.bean.vo.stat.NodeHttpStatInfo;
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
public class HttpStatServiceImpl implements HttpStatService {

    @Autowired
    private HttpStatDao httpStatDao;

    @Override
    public void batchInsert(List<NodeHttpStatInfo> nodeHttpStatInfos) {
        if(InflusDbUtil.FLAG){
            if (CollectionUtils.isNotEmpty(nodeHttpStatInfos)) {
                InfluxDB influxDB = InflusDbUtil.getConnection();
                BatchPoints batchPoints = BatchPoints.database(InflusDbUtil.DATABASE)
                        .retentionPolicy("autogen").consistency(InfluxDB.ConsistencyLevel.ALL).build();
                long times = System.currentTimeMillis();
                for (NodeHttpStatInfo nodeHttpStatInfo : nodeHttpStatInfos) {
                    Point point = Point.measurement("http").time(times, TimeUnit.MILLISECONDS)
                            .tag("host", nodeHttpStatInfo.getHost())
                            .tag("clusterName", nodeHttpStatInfo.getClustName())
                            .addField("createTime", DateUtil.formatYYYYMMddHHMMSS(nodeHttpStatInfo.getCreateTime()))
                            .addField("totalOpened", nodeHttpStatInfo.getTotal_opened())
                            .addField("currentOpen", nodeHttpStatInfo.getCurrent_open())
                            .build();
                    batchPoints.point(point);
                }
                influxDB.write(batchPoints);
            }
        }else{
            httpStatDao.batchInsert(nodeHttpStatInfos);
        }
    }
}
