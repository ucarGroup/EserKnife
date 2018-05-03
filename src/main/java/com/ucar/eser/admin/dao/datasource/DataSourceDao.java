package com.ucar.eser.admin.dao.datasource;

import com.ucar.eser.core.bean.po.DataSourceInfo;

import java.util.List;

/**
 * Created by wangjiulin on 2018/3/7.
 */
public interface DataSourceDao {

    List<DataSourceInfo> getList();

    DataSourceInfo getDataSourceInfo(Long id);

    Integer checkExists(DataSourceInfo dataSourceInfo);

    void insertInfo(DataSourceInfo dataSourceInfo);

    void updateInfo(DataSourceInfo dataSourceInfo);

    void deleteInfo(Long id);
}
