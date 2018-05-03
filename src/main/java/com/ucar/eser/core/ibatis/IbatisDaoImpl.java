package com.ucar.eser.core.ibatis;

import com.ibatis.sqlmap.client.SqlMapClient;
import com.ibatis.sqlmap.client.SqlMapExecutor;
import com.ucar.eser.core.util.exception.FrameworkRuntimeException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.support.DaoSupport;
import org.springframework.orm.ibatis.SqlMapClientCallback;
import org.springframework.orm.ibatis.SqlMapClientTemplate;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.List;

/**
 *
 * Created by wangjiulin on 2017/10/20.
 */
public class IbatisDaoImpl extends DaoSupport implements IbatisDao {

    private static final Logger LOGGER = LoggerFactory.getLogger(IbatisDaoImpl.class);

    private SqlMapClientTemplate sqlMapClientTemplate;


    public void setSqlMapClient(SqlMapClient sqlMapClient) {
        this.sqlMapClientTemplate.setSqlMapClient(sqlMapClient);
    }

    public IbatisDaoImpl(boolean isProxy) {
        this.sqlMapClientTemplate = new SqlMapClientTemplate();
    }

    public final void setSqlMapClientTemplate(SqlMapClientTemplate sqlMapClientTemplate) {
        if (sqlMapClientTemplate == null) {
            throw new IllegalArgumentException("Cannot set sqlMapClientTemplate to null");
        } else {
            this.sqlMapClientTemplate = sqlMapClientTemplate;
        }
    }

    public void setDataSource(DataSource dataSource) {
        this.sqlMapClientTemplate.setDataSource(dataSource);
    }

    public final DataSource getDataSource() {
        return this.sqlMapClientTemplate != null ? this.sqlMapClientTemplate.getDataSource() : null;
    }

    protected SqlMapClientTemplate getSqlMapClientTemplate() {
        return this.sqlMapClientTemplate;
    }

    public int deleteObject(String statementName, Object obj) {
        int i = this.getSqlMapClientTemplate().delete(statementName, obj);
        return i;
    }

    public Object insert(String statementName, Object obj) {
        Object object = this.getSqlMapClientTemplate().insert(statementName, obj);
        return object;
    }

    public int update(String statementName, Object obj) {
        return this.getSqlMapClientTemplate().update(statementName, obj);
    }

    public List queryForList(String statementSql) {
        return this.getSqlMapClientTemplate().queryForList(statementSql);
    }

    public List queryForList(String statementSql, Object obj) {
        return this.getSqlMapClientTemplate().queryForList(statementSql, obj);
    }

    public List queryForList(String statementSql, Object obj, int start, int end) {
        return this.getSqlMapClientTemplate().queryForList(statementSql, obj, start, end);
    }

    public Object queryForObject(String statementSql) {
        return this.getSqlMapClientTemplate().queryForObject(statementSql);
    }

    public Object queryForObject(String statmentSql, Object obj) {
        return this.getSqlMapClientTemplate().queryForObject(statmentSql, obj);
    }

    public Integer batchInsert(final String statementName, final List list) {
        Integer result = Integer.valueOf(0);

        try {
            if (list != null) {
                result = (Integer) this.getSqlMapClientTemplate().execute(new SqlMapClientCallback() {
                    public Object doInSqlMapClient(SqlMapExecutor executor) throws SQLException {

                        executor.startBatch();

                        try {
                            int e = 0;

                            for (int n = list.size(); e < n; ++e) {
                                executor.insert(statementName, list.get(e));
                                if ((e + 1) % 10000 == 0) {
                                    executor.executeBatch();
                                    executor.startBatch();
                                }
                            }

                            executor.executeBatch();
                            return Integer.valueOf(list.size());
                        } catch (SQLException var5) {
                            executor.executeBatch();
                            throw var5;
                        }
                    }
                });
            }

            return result;
        } catch (Exception var5) {
            LOGGER.error("批量插入数据异常", var5);
            throw new FrameworkRuntimeException(var5);
        }
    }

    public Integer batchUpdate(final String statementName, final List list) {
        Integer result = Integer.valueOf(0);

        try {
            if (list != null) {
                result = (Integer) this.getSqlMapClientTemplate().execute(new SqlMapClientCallback() {
                    public Object doInSqlMapClient(SqlMapExecutor executor) throws SQLException {

                        executor.startBatch();
                        int i = 0;

                        for (int n = list.size(); i < n; ++i) {
                            executor.update(statementName, list.get(i));
                            if ((i + 1) % 10000 == 0) {
                                executor.executeBatch();
                                executor.startBatch();
                            }
                        }

                        executor.executeBatch();
                        return Integer.valueOf(list.size());
                    }
                });
            }

            return result;
        } catch (Exception var5) {
            LOGGER.error("批量更新数据异常", var5);
            throw new FrameworkRuntimeException(var5);
        }
    }

    public Integer batchDelete(final String statementName, final List list) {
        Integer result = Integer.valueOf(0);

        try {
            if (list != null) {
                result = (Integer) this.getSqlMapClientTemplate().execute(new SqlMapClientCallback() {
                    public Object doInSqlMapClient(SqlMapExecutor executor) throws SQLException {
                        executor.startBatch();
                        int i = 0;

                        for (int n = list.size(); i < n; ++i) {
                            executor.delete(statementName, list.get(i));
                            if (i % 10000 == 0) {
                                executor.executeBatch();
                                executor.startBatch();
                            }
                        }

                        executor.executeBatch();
                        return Integer.valueOf(list.size());
                    }
                });
            }

            return result;
        } catch (Exception var5) {
            LOGGER.error("批量删除数据异常", var5);
            throw new FrameworkRuntimeException(var5);
        }
    }



    public Connection getConnection() throws SQLException {
        return this.getSqlMapClientTemplate().getDataSource().getConnection();
    }

    public List queryForList(String statementSql, boolean isDBProxy) {
        return this.getSqlMapClientTemplate().queryForList(statementSql, isDBProxy);
    }

    public List queryForList(String statementSql, Object obj, boolean isDBProxy) {
        return this.getSqlMapClientTemplate().queryForList(statementSql, obj);
    }

    public List queryForList(String statementSql, Object obj, int start, int end, boolean isDBProxy) {
        return this.getSqlMapClientTemplate().queryForList(statementSql, obj, start, end);
    }

    public Object queryForObject(String statementSql, boolean isDBProxy) {
        return this.getSqlMapClientTemplate().queryForObject(statementSql, isDBProxy);
    }

    public Object queryForObject(String statmentSql, Object obj, boolean isDBProxy) {
        return this.getSqlMapClientTemplate().queryForObject(statmentSql, obj, isDBProxy);
    }

    @Override
    protected void checkDaoConfig() throws IllegalArgumentException {

    }
}
