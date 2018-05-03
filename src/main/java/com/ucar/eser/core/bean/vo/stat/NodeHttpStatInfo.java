package com.ucar.eser.core.bean.vo.stat;

import java.util.Date;

/**
 *
 * Created by wangjiulin on 2017/11/6.
 */
public class NodeHttpStatInfo {

    private String clustName;

    private Long clusterId;

    private String host;

    private Date createTime;

    private Long  total_opened;
    private Long  current_open;


    public Long getClusterId() {
        return clusterId;
    }

    public void setClusterId(Long clusterId) {
        this.clusterId = clusterId;
    }

    public String getClustName() {
        return clustName;
    }

    public void setClustName(String clustName) {
        this.clustName = clustName;
    }

    public String getHost() {
        return host;
    }

    public void setHost(String host) {
        this.host = host;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public Long getTotal_opened() {
        return total_opened;
    }

    public void setTotal_opened(Long total_opened) {
        this.total_opened = total_opened;
    }

    public Long getCurrent_open() {
        return current_open;
    }

    public void setCurrent_open(Long current_open) {
        this.current_open = current_open;
    }
}
