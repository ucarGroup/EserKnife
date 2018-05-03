package com.ucar.eser.admin.dao.influxdbandmysql.impl;

import com.ucar.eser.admin.dao.influxdbandmysql.IndiceDao;
import com.ucar.eser.core.bean.vo.stat.NodeIndiceStatInfo;
import com.ucar.eser.core.ibatis.EserIbatisDaoImpl;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by wangjiulin on 2017/12/13.
 */
@Repository
public class IndiceDaoImpl extends EserIbatisDaoImpl implements IndiceDao {

    @Override
    public void batchInsert(List<NodeIndiceStatInfo> statInfos) {
        super.batchInsert("es.indices.log.batchInsert",statInfos);
    }
}
