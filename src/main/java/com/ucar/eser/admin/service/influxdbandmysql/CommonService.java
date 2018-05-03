package com.ucar.eser.admin.service.influxdbandmysql;

import com.ucar.eser.core.bean.vo.stat.NodeCommonStatInfo;

import java.util.List;

/**
 *
 * Created by wangjiulin on 2017/12/13.
 */
public interface CommonService {
    void batchInsert(List<NodeCommonStatInfo> nodeCommonStatInfos);

    NodeCommonStatInfo getLastByParams(NodeCommonStatInfo nodeCommonStatInfo);
}
