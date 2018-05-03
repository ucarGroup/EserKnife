package com.ucar.eser.admin.dao.influxdbandmysql;

import com.ucar.eser.core.bean.vo.stat.NodeFsStatInfo;

import java.util.List;

/**
 * Created by wangjiulin on 2018/3/27.
 */
public interface FsStatDao {
    void batchInsert(List<NodeFsStatInfo> fsStatInfos);
}
