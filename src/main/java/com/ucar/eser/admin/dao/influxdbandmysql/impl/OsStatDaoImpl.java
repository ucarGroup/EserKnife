package com.ucar.eser.admin.dao.influxdbandmysql.impl;

import com.ucar.eser.admin.dao.influxdbandmysql.OsStatDao;
import com.ucar.eser.core.bean.vo.stat.NodeOSStatInfo;
import com.ucar.eser.core.ibatis.EserIbatisDaoImpl;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by wangjiulin on 2017/11/8.
 */
@Repository
public class OsStatDaoImpl extends EserIbatisDaoImpl implements OsStatDao {

    @Override
    public void batchInsert(List<NodeOSStatInfo> statInfos) {
        this.batchInsert("es.os.log.batchInsert",statInfos);
    }
}
