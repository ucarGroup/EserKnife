package com.ucar.eser.admin.service.datasource.impl;

import com.ucar.eser.admin.dao.datasource.DataSourceDao;
import com.ucar.eser.admin.service.datasource.DataSourceService;
import com.ucar.eser.core.bean.po.DataSourceInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 *
 * Created by wangjiulin on 2018/3/7.
 */
@Service
public class DataSourceServiceImpl implements DataSourceService {

    @Autowired
    private DataSourceDao dataSourceDao;

    @Override
    public List<DataSourceInfo> getList() {
        return dataSourceDao.getList();
    }

    @Override
    public DataSourceInfo getDataSourceInfo(Long id) {
        return dataSourceDao.getDataSourceInfo(id);
    }

    @Override
    public Boolean checkExists(DataSourceInfo dataSourceInfo) {
        Integer count = dataSourceDao.checkExists(dataSourceInfo);
        return count != null && count > 0;
    }

    @Override
    public void insertInfo(DataSourceInfo dataSourceInfo) {
        dataSourceDao.insertInfo(dataSourceInfo);
    }

    @Override
    public void updateInfo(DataSourceInfo dataSourceInfo) {
        dataSourceDao.updateInfo(dataSourceInfo);
    }

    @Override
    public void deleteInfo(Long id) {
        dataSourceDao.deleteInfo(id);
    }
}
