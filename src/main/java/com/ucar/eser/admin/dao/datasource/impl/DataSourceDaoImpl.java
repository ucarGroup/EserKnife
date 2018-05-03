package com.ucar.eser.admin.dao.datasource.impl;

import com.ucar.eser.admin.dao.datasource.DataSourceDao;
import com.ucar.eser.core.bean.po.DataSourceInfo;
import com.ucar.eser.core.ibatis.EserIbatisDaoImpl;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by wangjiulin on 2018/3/7.
 */
@Repository
public class DataSourceDaoImpl extends EserIbatisDaoImpl implements DataSourceDao {

    private final static String NAMESPACE = "data.source.info.";
    @Override
    public List<DataSourceInfo> getList() {
        return this.queryForList(NAMESPACE+"getList");
    }

    @Override
    public DataSourceInfo getDataSourceInfo(Long id) {
        return (DataSourceInfo) this.queryForObject(NAMESPACE+"getDataSourceInfo",id);
    }

    @Override
    public Integer checkExists(DataSourceInfo dataSourceInfo) {
        return (Integer) this.queryForObject(NAMESPACE+"checkExists",dataSourceInfo);
    }

    @Override
    public void insertInfo(DataSourceInfo dataSourceInfo) {
        this.insert(NAMESPACE+"insertInfo",dataSourceInfo);
    }

    @Override
    public void updateInfo(DataSourceInfo dataSourceInfo) {
        this.update(NAMESPACE+"updateInfo",dataSourceInfo);
    }

    @Override
    public void deleteInfo(Long id) {
        this.deleteObject(NAMESPACE+"deleteInfo",id);
    }
}
