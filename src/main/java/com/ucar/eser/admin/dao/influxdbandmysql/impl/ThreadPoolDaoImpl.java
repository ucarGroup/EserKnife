package com.ucar.eser.admin.dao.influxdbandmysql.impl;

import com.ucar.eser.admin.dao.influxdbandmysql.ThreadPoolDao;
import com.ucar.eser.core.bean.vo.stat.NodeThreadPoolStatInfo;
import com.ucar.eser.core.ibatis.EserIbatisDaoImpl;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by wangjiulin on 2017/11/6.
 */
@Repository
public class ThreadPoolDaoImpl extends EserIbatisDaoImpl implements ThreadPoolDao {
    @Override
    public void batchInsert(List<NodeThreadPoolStatInfo> nodeThreadPoolStatInfos) {
        this.batchInsert("es.thread.pool.log.batchInsert",nodeThreadPoolStatInfos);
    }

    @Override
    public List<NodeThreadPoolStatInfo> getNodeThreadPoolStatInfos(NodeThreadPoolStatInfo nodeThreadPoolStatInfo) {
        return this.queryForList("es.thread.pool.log.getNodeThreadPoolStatInfos",nodeThreadPoolStatInfo);
    }
}
