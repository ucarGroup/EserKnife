package com.ucar.eser.admin.dao.influxdbandmysql.impl;

import com.ucar.eser.admin.dao.influxdbandmysql.FsStatDao;
import com.ucar.eser.core.bean.vo.stat.NodeFsStatInfo;
import com.ucar.eser.core.ibatis.EserIbatisDaoImpl;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by wangjiulin on 2018/3/27.
 */
@Repository
public class FsStatDaoImpl extends EserIbatisDaoImpl implements FsStatDao {
    @Override
    public void batchInsert(List<NodeFsStatInfo> fsStatInfos) {
        this.batchInsert("es.fs.log.batchInsert",fsStatInfos);
    }
}
