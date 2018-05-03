package com.ucar.eser.admin.service.influxdbandmysql.impl;

import com.ucar.eser.admin.dao.influxdbandmysql.TransportStatDao;
import com.ucar.eser.admin.service.influxdbandmysql.TransportStatService;
import com.ucar.eser.core.bean.vo.stat.NodeTransportStatInfo;
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
public class TransportStatServiceImpl implements TransportStatService {
    @Autowired
    private TransportStatDao transportStatDao;

    @Override
    public void batchInsert(List<NodeTransportStatInfo> transportStatInfos) {
        if(InflusDbUtil.FLAG){
            if (CollectionUtils.isNotEmpty(transportStatInfos)) {
                InfluxDB influxDB = InflusDbUtil.getConnection();
                BatchPoints batchPoints = BatchPoints.database(InflusDbUtil.DATABASE)
                        .retentionPolicy("autogen").consistency(InfluxDB.ConsistencyLevel.ALL).build();
                long times = System.currentTimeMillis();
                for (NodeTransportStatInfo transportStatInfo : transportStatInfos) {
                    Point point = Point.measurement("transport").time(times, TimeUnit.MILLISECONDS)
                            .tag("host", transportStatInfo.getHost())
                            .tag("clusterName", transportStatInfo.getClustName())
                            .addField("createTime", DateUtil.formatYYYYMMddHHMMSS(transportStatInfo.getCreateTime()))
                            .addField("rxCount",transportStatInfo.getRx_count())
                            .addField("rxSize",transportStatInfo.getRx_size() == null?"":transportStatInfo.getRx_size())
                            .addField("rxSizeInBytes",transportStatInfo.getRx_size_in_bytes())
                            .addField("txCount",transportStatInfo.getTx_count())
                            .addField("txSize",transportStatInfo.getTx_size() == null ?"":transportStatInfo.getTx_size())
                            .addField("txSizeInBytes",transportStatInfo.getTx_size_in_bytes())
                            .addField("serverOpen",transportStatInfo.getServer_open())
                            .build();
                    batchPoints.point(point);
                }
                influxDB.write(batchPoints);
            }
        }else{
            transportStatDao.batchInsert(transportStatInfos);
        }
    }
}
