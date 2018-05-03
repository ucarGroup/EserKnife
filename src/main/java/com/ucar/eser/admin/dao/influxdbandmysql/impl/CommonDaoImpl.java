package com.ucar.eser.admin.dao.influxdbandmysql.impl;

import com.ucar.eser.admin.dao.influxdbandmysql.CommonDao;
import com.ucar.eser.core.bean.vo.stat.NodeCommonStatInfo;
import com.ucar.eser.core.ibatis.EserIbatisDaoImpl;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by wangjiulin on 2017/12/13.
 */
@Repository
public class CommonDaoImpl extends EserIbatisDaoImpl implements CommonDao {
    @Override
    public void batchInsert(List<NodeCommonStatInfo> nodeCommonStatInfos) {
        super.batchInsert("es.common.log.batchInsert",nodeCommonStatInfos);
    }

    @Override
    public NodeCommonStatInfo getLastByParams(NodeCommonStatInfo nodeCommonStatInfo) {
        return (NodeCommonStatInfo) this.queryForObject("es.common.log.getLastByParams",nodeCommonStatInfo);
    }
}
