package com.ucar.eser.core.bean.po;

/**
 * Created by wangjiulin on 2018/3/7.
 */
public class DataSourceInfo {

    private Long  id;

    private String dataSourceName;

    private String dataSourceUrl;

    private String dataSourceUserName;

    private String dataSourceUserPwd;

    private String productLine;

    private String createTime;

    private String updateTime;

    private String createUser;

    private String updateUser;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDataSourceName() {
        return dataSourceName;
    }

    public void setDataSourceName(String dataSourceName) {
        this.dataSourceName = dataSourceName;
    }

    public String getDataSourceUrl() {
        return dataSourceUrl;
    }

    public void setDataSourceUrl(String dataSourceUrl) {
        this.dataSourceUrl = dataSourceUrl;
    }

    public String getDataSourceUserName() {
        return dataSourceUserName;
    }

    public void setDataSourceUserName(String dataSourceUserName) {
        this.dataSourceUserName = dataSourceUserName;
    }

    public String getDataSourceUserPwd() {
        return dataSourceUserPwd;
    }

    public void setDataSourceUserPwd(String dataSourceUserPwd) {
        this.dataSourceUserPwd = dataSourceUserPwd;
    }

    public String getProductLine() {
        return productLine;
    }

    public void setProductLine(String productLine) {
        this.productLine = productLine;
    }

    public String getCreateTime() {
        return createTime;
    }

    public void setCreateTime(String createTime) {
        this.createTime = createTime;
    }

    public String getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(String updateTime) {
        this.updateTime = updateTime;
    }

    public String getCreateUser() {
        return createUser;
    }

    public void setCreateUser(String createUser) {
        this.createUser = createUser;
    }

    public String getUpdateUser() {
        return updateUser;
    }

    public void setUpdateUser(String updateUser) {
        this.updateUser = updateUser;
    }
}
