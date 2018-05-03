package com.ucar.eser.admin.service.influxdbandmysql;

import com.ucar.eser.core.bean.vo.stat.NodeIndiceStatInfo;

import java.util.List;

/**
 *
 * Created by wangjiulin on 2017/12/13.
 */
public interface IndiceService {

    void batchInsert(List<NodeIndiceStatInfo> statInfos);
}
