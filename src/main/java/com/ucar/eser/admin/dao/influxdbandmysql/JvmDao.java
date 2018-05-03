package com.ucar.eser.admin.dao.influxdbandmysql;

import com.ucar.eser.core.bean.vo.stat.NodeJVMStatInfo;

import java.util.List;

/**
 * Created by wangjiulin on 2017/11/6.
 */
public interface JvmDao {

    void batchInsert(List<NodeJVMStatInfo> statInfos);

    NodeJVMStatInfo getLastByParams(NodeJVMStatInfo nodeJVMStatInfo);
}
