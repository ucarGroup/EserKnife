package com.ucar.eser.front.controller.indexmsg;

import com.ucar.eser.core.bean.vo.datasource.TableColAndTyInfo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;


public class DatabaseUtil {
    private final static Logger LOGGER = LoggerFactory.getLogger(DatabaseUtil.class);

    private static final String DRIVER = "com.mysql.jdbc.Driver";
    private static final String SQL = "SELECT * FROM ";

    static {
        try {
            Class.forName(DRIVER);
        } catch (ClassNotFoundException e) {
            LOGGER.error("can not load jdbc driver", e);
        }
    }

    /**
     * 获取数据库连接
     *
     */
    public static Connection getConnection(String url,String userName,String password) {
        Connection conn = null;
        try {
            conn = DriverManager.getConnection(url, userName, password);
        } catch (SQLException e) {
            LOGGER.error("get connection failure", e);
        }
        return conn;
    }

    /**
     * 关闭数据库连接
     * @param conn 参数
     */
    public static void closeConnection(Connection conn) {
        if(conn != null) {
            try {
                conn.close();
            } catch (SQLException e) {
                LOGGER.error("close connection failure", e);
            }
        }
    }

    /**
     * 获取数据库下的所有表名
     */
    public static List<String> getTableNames(String url,String userName,String password) {
        List<String> tableNames = new ArrayList<String>();
        Connection conn = getConnection(url,userName,password);
        ResultSet rs = null;
        try {
            //获取数据库的元数据
            DatabaseMetaData db = conn.getMetaData();
            //从元数据中获取到所有的表名
            rs = db.getTables(null, null, null, new String[] { "TABLE" });
            while(rs.next()) {
                tableNames.add(rs.getString(3));
            }
        } catch (SQLException e) {
            LOGGER.error("getTableNames failure", e);
        } finally {
            try {
                if (rs != null) {
                    rs.close();
                }
                closeConnection(conn);
            } catch (SQLException e) {
                LOGGER.error("close ResultSet failure", e);
            }
        }
        return tableNames;
    }

    /**
     * 获取表中所有字段名称
     * @param tableName 表名
     */
    public static List<String> getColumnNames(String tableName,String url,String userName,String password) {
        List<String> columnNames = new ArrayList<String>();
        //与数据库的连接
        Connection conn = getConnection(url,userName,password);
        PreparedStatement pStemt = null;
        String tableSql = SQL + tableName;
        try {
            pStemt = conn.prepareStatement(tableSql);
            //结果集元数据
            ResultSetMetaData rsmd = pStemt.getMetaData();
            //表列数
            int size = rsmd.getColumnCount();
            for (int i = 0; i < size; i++) {
                columnNames.add(rsmd.getColumnName(i + 1));
            }
        } catch (SQLException e) {
            LOGGER.error("getColumnNames failure", e);
        } finally {
            if (pStemt != null) {
                try {
                    pStemt.close();
                    closeConnection(conn);
                } catch (SQLException e) {
                    LOGGER.error("getColumnNames close pstem and connection failure", e.getMessage());
                }
            }
        }
        return columnNames;
    }


    /**
     * 获取表中所有字段名称 和 类型名称
     * @param tableName 表名
     */
    public static List<TableColAndTyInfo> getColumnNamesAndTypes(String tableName, String url, String userName, String password) {
        List<TableColAndTyInfo> tableColAndTyInfos = new ArrayList<TableColAndTyInfo>();
        //与数据库的连接
        Connection conn = getConnection(url,userName,password);
        PreparedStatement pStemt = null;
        String tableSql = SQL + tableName;
        try {
            pStemt = conn.prepareStatement(tableSql);
            //结果集元数据
            ResultSetMetaData rsmd = pStemt.getMetaData();
            //表列数
            int size = rsmd.getColumnCount();
            for (int i = 0; i < size; i++) {
                TableColAndTyInfo tableColAndTyInfo = new TableColAndTyInfo();
                tableColAndTyInfo.setColumnName(rsmd.getColumnName(i + 1));
                tableColAndTyInfo.setColumnType(rsmd.getColumnTypeName(i+1));
                tableColAndTyInfos.add(tableColAndTyInfo);
            }
        } catch (SQLException e) {
            LOGGER.error("getColumnNamesAndTypes failure", e);
        } finally {
            if (pStemt != null) {
                try {
                    pStemt.close();
                    closeConnection(conn);
                } catch (SQLException e) {
                    LOGGER.error("getColumnNamesAndTypes close pstem and connection failure", e.getStackTrace());
                }
            }
        }
        return tableColAndTyInfos;
    }


    /**
     * 获取表中所有字段类型
     * @param tableName 表名
     */
    public static List<String> getColumnTypes(String tableName,String url,String userName,String password) {
        List<String> columnTypes = new ArrayList<String>();
        //与数据库的连接
        Connection conn = getConnection(url,userName,password);
        PreparedStatement pStemt = null;
        String tableSql = SQL + tableName;
        try {
            pStemt = conn.prepareStatement(tableSql);
            //结果集元数据
            ResultSetMetaData rsmd = pStemt.getMetaData();
            //表列数
            int size = rsmd.getColumnCount();
            for (int i = 0; i < size; i++) {
                columnTypes.add(rsmd.getColumnTypeName(i + 1));
            }
        } catch (SQLException e) {
            LOGGER.error("getColumnTypes failure", e);
        } finally {
            if (pStemt != null) {
                try {
                    pStemt.close();
                    closeConnection(conn);
                } catch (SQLException e) {
                    LOGGER.error("getColumnTypes close pstem and connection failure", e);
                }
            }
        }
        return columnTypes;
    }
}