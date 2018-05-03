package com.ucar.eser.admin.dao.influxdbandmysql;

import com.ucar.eser.core.bean.vo.stat.NodeCommonStatInfo;

import java.util.List;

/**
 * Created by wangjiulin on 2017/12/13.
 */
public interface CommonDao {
    void batchInsert(List<NodeCommonStatInfo> nodeCommonStatInfos);

    NodeCommonStatInfo getLastByParams(NodeCommonStatInfo nodeCommonStatInfo);
}
