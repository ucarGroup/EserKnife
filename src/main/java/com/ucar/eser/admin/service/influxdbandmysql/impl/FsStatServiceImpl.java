package com.ucar.eser.admin.service.influxdbandmysql.impl;

import com.ucar.eser.admin.dao.influxdbandmysql.FsStatDao;
import com.ucar.eser.admin.service.influxdbandmysql.FsStatService;
import com.ucar.eser.core.bean.vo.stat.NodeFsStatInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 *
 * Created by wangjiulin on 2018/3/27.
 */
@Service
public class FsStatServiceImpl implements FsStatService {

    @Autowired
    private FsStatDao fsStatDao;

    @Override
    public void batchInsert(List<NodeFsStatInfo> fsStatInfos) {
        fsStatDao.batchInsert(fsStatInfos);
    }
}
