package com.ucar.eser.core.bean.vo.formbean;


import com.ucar.eser.core.bean.po.Pager;

/**
 * Created by wangzhen on 2016/9/20.
 * 慢日志对象
 */

public class SlowLogFormBean {

    /**
     * 集群名称
     */
    private String custerName;

    /**
     * 起止时间
     */
    private String beginTime;

    /**
     * 终止时间
     */
    private String endTime;

    /**
     * 慢日志级别
     */
    private String slowLogLevel;
    /**
     * 慢日志类别
     */
    private String slowLogType;
    /**
     * 慢日志数据库
     */
    private String slowLogIndex;

    /**
     * 服务器IP
     */
    private String serverIp;
    /**
     * 记录入库时间
     */
    private String createTime;

    /**
     * 耗时
     */
    private String costTime;

    /**
     * 分页器
     */
    private Pager pager;

    public String getCostTime() {
        return costTime;
    }

    public void setCostTime(String costTime) {
        this.costTime = costTime;
    }

    public Pager getPager() {
        return pager;
    }

    public void setPager(Pager pager) {
        this.pager = pager;
    }

    public String getCusterName() {
        return custerName;
    }

    public void setCusterName(String custerName) {
        this.custerName = custerName;
    }

    public String getBeginTime() {
        return beginTime;
    }

    public void setBeginTime(String beginTime) {
        this.beginTime = beginTime;
    }

    public String getEndTime() {
        return endTime;
    }

    public void setEndTime(String endTime) {
        this.endTime = endTime;
    }

    public String getSlowLogLevel() {
        return slowLogLevel;
    }

    public void setSlowLogLevel(String slowLogLevel) {
        this.slowLogLevel = slowLogLevel;
    }

    public String getSlowLogType() {
        return slowLogType;
    }

    public void setSlowLogType(String slowLogType) {
        this.slowLogType = slowLogType;
    }

    public String getSlowLogIndex() {
        return slowLogIndex;
    }

    public void setSlowLogIndex(String slowLogIndex) {
        this.slowLogIndex = slowLogIndex;
    }

    public String getServerIp() {
        return serverIp;
    }

    public void setServerIp(String serverIp) {
        this.serverIp = serverIp;
    }

	public String getCreateTime() {
		return createTime;
	}

	public void setCreateTime(String createTime) {
		this.createTime = createTime;
	}
    
}
