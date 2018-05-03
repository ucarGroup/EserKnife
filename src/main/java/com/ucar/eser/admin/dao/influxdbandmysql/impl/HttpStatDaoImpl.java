package com.ucar.eser.admin.dao.influxdbandmysql.impl;

import com.ucar.eser.admin.dao.influxdbandmysql.HttpStatDao;
import com.ucar.eser.core.bean.vo.stat.NodeHttpStatInfo;
import com.ucar.eser.core.ibatis.EserIbatisDaoImpl;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by wangjiulin on 2017/11/6.
 */
@Repository
public class HttpStatDaoImpl extends EserIbatisDaoImpl implements HttpStatDao {
    @Override
    public void batchInsert(List<NodeHttpStatInfo> nodeHttpStatInfos) {
        super.batchInsert("es.http.log.batchInsert",nodeHttpStatInfos);
    }
}
