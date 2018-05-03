package com.ucar.eser.admin.dao.influxdbandmysql;

import com.ucar.eser.core.bean.vo.stat.NodeIndiceStatInfo;

import java.util.List;

/**
 * Created by wangjiulin on 2017/12/13.
 */
public interface IndiceDao {

    void batchInsert(List<NodeIndiceStatInfo> statInfos);
}
