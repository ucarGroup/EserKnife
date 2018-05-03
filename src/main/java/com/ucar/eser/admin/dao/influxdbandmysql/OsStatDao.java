package com.ucar.eser.admin.dao.influxdbandmysql;

import com.ucar.eser.core.bean.vo.stat.NodeOSStatInfo;

import java.util.List;

/**
 * Created by wangjiulin on 2017/11/8.
 */
public interface OsStatDao {

    void batchInsert(List<NodeOSStatInfo> statInfos);

}
