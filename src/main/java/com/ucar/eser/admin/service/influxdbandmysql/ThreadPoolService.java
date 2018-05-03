package com.ucar.eser.admin.service.influxdbandmysql;

import com.ucar.eser.core.bean.vo.stat.NodeThreadPoolStatInfo;

import java.util.List;

/**
 *
 * Created by wangjiulin on 2017/11/6.
 */
public interface ThreadPoolService {

    void batchInsert(List<NodeThreadPoolStatInfo> nodeThreadPoolStatInfos);

    List<NodeThreadPoolStatInfo> getNodeThreadPoolStatInfos(NodeThreadPoolStatInfo nodeThreadPoolStatInfo);
}
