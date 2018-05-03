package com.ucar.eser.admin.service.influxdbandmysql;

import com.ucar.eser.core.bean.vo.stat.NodeOSStatInfo;

import java.util.List;

/**
 *
 * Created by wangjiulin on 2017/11/8.
 */
public interface OsStatService {

    void batchInsert(List<NodeOSStatInfo> statInfos);

}
