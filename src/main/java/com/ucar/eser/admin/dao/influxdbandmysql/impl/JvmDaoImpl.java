package com.ucar.eser.admin.dao.influxdbandmysql.impl;

import com.ucar.eser.admin.dao.influxdbandmysql.JvmDao;
import com.ucar.eser.core.bean.vo.stat.NodeJVMStatInfo;
import com.ucar.eser.core.ibatis.EserIbatisDaoImpl;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by wangjiulin on 2017/11/6.
 */
@Repository
public class JvmDaoImpl extends EserIbatisDaoImpl implements JvmDao {
    @Override
    public void batchInsert(List<NodeJVMStatInfo> statInfos) {
        this.batchInsert("es.jvm.log.batchInsert",statInfos);
    }

    @Override
    public NodeJVMStatInfo getLastByParams(NodeJVMStatInfo nodeJVMStatInfo) {
        return (NodeJVMStatInfo) this.queryForObject("es.jvm.log.getLastByParams",nodeJVMStatInfo);
    }
}
