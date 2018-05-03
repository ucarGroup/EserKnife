package com.ucar.eser.core.ibatis;

import java.sql.Connection;
import java.sql.SQLException;
import java.util.List;

public interface IbatisDao {
    int update(String var1, Object var2);

    Object insert(String var1, Object var2);

    int deleteObject(String var1, Object var2);

    Integer batchInsert(String var1, List var2);

    Integer batchUpdate(String var1, List var2);

    Integer batchDelete(String var1, List var2);

    List queryForList(String var1);

    List queryForList(String var1, Object var2);

    List queryForList(String var1, Object var2, int var3, int var4);

    Object queryForObject(String var1);

    Object queryForObject(String var1, Object var2);

    Connection getConnection() throws SQLException;

    List queryForList(String var1, boolean var2);

    List queryForList(String var1, Object var2, boolean var3);

    List queryForList(String var1, Object var2, int var3, int var4, boolean var5);

    Object queryForObject(String var1, boolean var2);

    Object queryForObject(String var1, Object var2, boolean var3);

}
