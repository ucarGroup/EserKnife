package com.ucar.eser.admin.service.influxdbandmysql;

import com.ucar.eser.core.bean.vo.stat.NodeFsStatInfo;

import java.util.List;

/**
 *
 * Created by wangjiulin on 2018/3/27.
 */
public interface FsStatService {

    void batchInsert(List<NodeFsStatInfo> fsStatInfos);
}
