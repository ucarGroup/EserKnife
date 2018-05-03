package com.ucar.eser.core.ibatis;

import com.ibatis.sqlmap.client.SqlMapClient;

import javax.annotation.Resource;
import javax.sql.DataSource;

/**
 *
 * Created by wangjiulin on 2017/10/23.
 */
public class EserIbatisDaoImpl extends IbatisDaoImpl {

    public EserIbatisDaoImpl() {
        super(false);
    }

    @Resource(name = "dataSourceCarMysql")
    public void dataSourceCarMysql(DataSource dataSource) {
        this.setDataSource(dataSource);
    }

    @Resource(name = "sqlMapClientCarMysql")
    public void setSqlMapClientCarMysql(SqlMapClient sqlMapClient) {
        this.setSqlMapClient(sqlMapClient);
    }

}
