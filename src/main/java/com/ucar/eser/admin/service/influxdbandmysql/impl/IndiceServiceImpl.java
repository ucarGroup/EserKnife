package com.ucar.eser.admin.service.influxdbandmysql.impl;

import com.ucar.eser.admin.dao.influxdbandmysql.IndiceDao;
import com.ucar.eser.admin.service.influxdbandmysql.IndiceService;
import com.ucar.eser.core.bean.vo.stat.NodeIndiceStatInfo;
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
public class IndiceServiceImpl implements IndiceService {

    @Autowired
    private IndiceDao indiceDao;
    @Override
    public void batchInsert(List<NodeIndiceStatInfo> statInfos) {
        if(InflusDbUtil.FLAG){
            if(CollectionUtils.isNotEmpty(statInfos)){
                InfluxDB influxDB = InflusDbUtil.getConnection();
                BatchPoints batchPoints = BatchPoints
                        .database(InflusDbUtil.DATABASE)
                        .retentionPolicy("autogen")
                        .consistency(InfluxDB.ConsistencyLevel.ALL)
                        .build();
                long times = System.currentTimeMillis();
                for (NodeIndiceStatInfo nodeIndiceStatInfo : statInfos){
                    Point point = Point.measurement("indices")
                            .time(times, TimeUnit.MILLISECONDS)
                            .tag("host",nodeIndiceStatInfo.getHost())
                            .tag("clusterName",nodeIndiceStatInfo.getClusterName())
                            .addField("fielddataEvictions",nodeIndiceStatInfo.getFielddataEvictions())
                            .addField("fielddataMemorySizeInBytes",nodeIndiceStatInfo.getFielddataMemorySizeInBytes())
                            .addField("searchFetchTimeInMillis",nodeIndiceStatInfo.getSearchFetchTimeInMillis())
                            .addField("searchFetchTotal",nodeIndiceStatInfo.getSearchFetchTotal())
                            .addField("searchQueryTimeInMillis",nodeIndiceStatInfo.getSearchQueryTimeInMillis())
                            .addField("searchQueryTotal",nodeIndiceStatInfo.getSearchQueryTotal())
                            .addField("getMissingTimeInMillis",nodeIndiceStatInfo.getGetMissingTimeInMillis())
                            .addField("getMissingTotal",nodeIndiceStatInfo.getGetMissingTotal())
                            .addField("getExistsTimeInMillis", nodeIndiceStatInfo.getGetExistsTimeInMillis())
                            .addField("getExistsTotal", nodeIndiceStatInfo.getGetMissingTotal())
                            .addField("getTimeInMillis", nodeIndiceStatInfo.getGetTimeInMillis())
                            .addField("getTotal",nodeIndiceStatInfo.getGetTotal())
                            .addField("indexingDeleteTimeInMillis",nodeIndiceStatInfo.getIndexingDeleteTimeInMillis())
                            .addField("indexingDeleteTotal",nodeIndiceStatInfo.getIndexingDeleteTotal())
                            .addField("indexingIndexTimeInMillis",nodeIndiceStatInfo.getIndexingIndexTimeInMillis())
                            .addField("indexingIndexTotal",nodeIndiceStatInfo.getIndexingIndexTotal())
                            .addField("segmentsCount",nodeIndiceStatInfo.getSegmentsCount())
                            .addField("storeSizeInBytes",nodeIndiceStatInfo.getStoreSizeInBytes())
                            .addField("docsCount",nodeIndiceStatInfo.getDocsCount())
                            .addField("createTime", DateUtil.formatYYYYMMddHHMMSS(nodeIndiceStatInfo.getCreateTime()))
                            .build();
                    batchPoints.point(point);
                }
                influxDB.write(batchPoints);
            }
        }else{
            indiceDao.batchInsert(statInfos);
        }
    }
}
