package com.ucar.eser.core.util;

import com.alibaba.druid.sql.ast.SQLName;
import com.alibaba.druid.sql.ast.statement.SQLAlterTableItem;
import com.alibaba.druid.sql.ast.statement.SQLColumnDefinition;
import com.alibaba.druid.sql.ast.statement.SQLCreateTableStatement;
import com.alibaba.druid.sql.ast.statement.SQLTableElement;
import com.alibaba.druid.sql.dialect.mysql.ast.statement.MySqlAlterTableAddColumn;
import com.alibaba.druid.sql.dialect.mysql.ast.statement.MySqlAlterTableStatement;
import com.alibaba.druid.sql.dialect.mysql.ast.statement.MySqlSQLColumnDefinition;
import com.alibaba.druid.sql.parser.SQLParserUtils;
import com.alibaba.druid.sql.parser.SQLStatementParser;
import com.google.common.collect.Lists;
import com.google.common.collect.Maps;
import org.apache.commons.lang3.StringUtils;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author forest
 * @create 2017-03-08 17:30
 */
public class SqlParseUtil {


    public static Map<String, Object> parseTnameAndColsFromSql(String sql,int versionFirst) {
        HashMap<String, Object> results = Maps.newHashMap();
        ArrayList<Object> cols = Lists.newArrayList();
        if (StringUtils.isBlank(sql)) {
            return results;
        }

        SQLStatementParser parser = null;
        if (sql.trim().toLowerCase().startsWith("create")) {
            parser = SQLParserUtils.createSQLStatementParser(sql, "mysql");
            SQLCreateTableStatement sqlCreateTableStatement = parser.parseCreateTable();
            SQLName sqlName = sqlCreateTableStatement.getName();
            String simpleName = sqlName.getSimpleName().replace("`","");
            results.put("tableName", simpleName);
            results.put("cols", cols);
            List<SQLTableElement> tableElementList = sqlCreateTableStatement.getTableElementList();
            for (SQLTableElement sqlTableElement : tableElementList) {
                if (sqlTableElement instanceof MySqlSQLColumnDefinition) {
                    HashMap<String, String> colums = Maps.newHashMap();

                    MySqlSQLColumnDefinition mysqlColumn = (MySqlSQLColumnDefinition)sqlTableElement;
                    colums.put("colname",mysqlColumn.getName().getSimpleName().replace("`",""));
                    if(versionFirst >= 5 ){
                        colums.put("coltype","keyword");
                    }else{
                        colums.put("coltype",mysqlColumn.getDataType().getName());
                    }
                    cols.add(colums);
                }
            }
        }else if(sql.trim().toLowerCase().startsWith("alter")){
            parser = SQLParserUtils.createSQLStatementParser(sql, "mysql");
            MySqlAlterTableStatement sqlStatement = (MySqlAlterTableStatement) parser.parseAlter();
            results.put("tableName", sqlStatement.getName().getSimpleName().replace("`",""));
            results.put("cols", cols);
            List<SQLAlterTableItem> items = sqlStatement.getItems();
            for (SQLAlterTableItem item : items) {
                if (item instanceof MySqlAlterTableAddColumn) {
                    List<SQLColumnDefinition> columns = ((MySqlAlterTableAddColumn) item).getColumns();
                    for (SQLColumnDefinition column : columns) {
                        HashMap<String, String> colums = Maps.newHashMap();

                        colums.put("colname",column.getName().getSimpleName().replace("`",""));
                        if(versionFirst >= 5 ){
                            colums.put("coltype","keyword");
                        }else{
                            colums.put("coltype",column.getDataType().getName());
                        }
                        cols.add(colums);

                    }
                }
            }
        }else{
            throw new RuntimeException("只解析create 或者 alter 开头的sql");
        }
        return results;
    }

}
