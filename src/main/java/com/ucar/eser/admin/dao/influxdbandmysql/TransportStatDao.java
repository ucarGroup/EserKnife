package com.ucar.eser.admin.dao.influxdbandmysql;

import com.ucar.eser.core.bean.vo.stat.NodeTransportStatInfo;

import java.util.List;

/**
 * Created by wangjiulin on 2017/11/6.
 */
public interface TransportStatDao {

    void batchInsert(List<NodeTransportStatInfo> transportStatInfos);
}
