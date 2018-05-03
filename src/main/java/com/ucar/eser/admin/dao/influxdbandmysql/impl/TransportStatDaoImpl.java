package com.ucar.eser.admin.dao.influxdbandmysql.impl;

import com.ucar.eser.admin.dao.influxdbandmysql.TransportStatDao;
import com.ucar.eser.core.bean.vo.stat.NodeTransportStatInfo;
import com.ucar.eser.core.ibatis.EserIbatisDaoImpl;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by wangjiulin on 2017/11/6.
 */
@Repository
public class TransportStatDaoImpl extends EserIbatisDaoImpl implements TransportStatDao {
    @Override
    public void batchInsert(List<NodeTransportStatInfo> transportStatInfos) {
        this.batchInsert("es.transport.log.batchInsert",transportStatInfos);
    }
}
