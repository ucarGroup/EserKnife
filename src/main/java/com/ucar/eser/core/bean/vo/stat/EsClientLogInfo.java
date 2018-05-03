package com.ucar.eser.core.bean.vo.stat;


import com.ucar.eser.core.bean.po.Pager;

import java.util.Date;

/**
 *
 * Created by user on 2017/4/17.
 */
public class EsClientLogInfo {
    /**
     * 主键id
     */
    private Long id;
    /**
     * 集群名称
     */
    private String clusterName;
    /**
     * 服务端ip
     */
    private String host;
    /**
     * 索引名称
     */
    private String indexName;
    /**
     * 执行总耗时
     */
    private Integer executeTime;
    /**
     *解析耗时
     */
    private Integer parseTime;
    /**
     *服务端耗时
     */
    private Integer serverTime;
    /**
     *返回结果条数
     */
    private Integer resultNum;
    /**
     * 相应体大小
     */
    private Integer responseSize;
    /**
     * 求情参数大小
     */
    private Integer requestSize;
    /**
     *hbase行键
     */
    private String rowKey;
    /**
     * 客户端项目名
     */
    private String projectName;
    /**
     *客户端ip
     */
    private String clientIp;
    /**
     *方法名
     */
    private String methodName;
    /**
     * 执行时间
     */
    private Date operateTime;

    private String operateTimeStr;
    /**
     *日志插入时间
     */
    private Date createTime;
    /**
     * 是否为有效日志
     */
    private  boolean isValid = true;

    private String beginTime;
    
    private String endTime;
    
    private String costTime;
    
    /**
     * 分页器
     */
    private Pager pager;
    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getClusterName() {
        return clusterName;
    }

    public void setClusterName(String clusterName) {
        this.clusterName = clusterName;
    }

    public String getHost() {
        return host;
    }

    public void setHost(String host) {
        this.host = host;
    }

    public String getIndexName() {
        return indexName;
    }

    public void setIndexName(String indexName) {
        this.indexName = indexName;
    }

    public Integer getExecuteTime() {
        return executeTime;
    }

    public void setExecuteTime(Integer executeTime) {
        this.executeTime = executeTime;
    }

    public Integer getParseTime() {
        return parseTime;
    }

    public void setParseTime(Integer parseTime) {
        this.parseTime = parseTime;
    }

    public Integer getServerTime() {
        return serverTime;
    }

    public void setServerTime(Integer serverTime) {
        this.serverTime = serverTime;
    }

    public Integer getResultNum() {
        return resultNum;
    }

    public void setResultNum(Integer resultNum) {
        this.resultNum = resultNum;
    }

    public Integer getResponseSize() {
        return responseSize;
    }

    public void setResponseSize(Integer responseSize) {
        this.responseSize = responseSize;
    }

    public Integer getRequestSize() {
        return requestSize;
    }

    public void setRequestSize(Integer requestSize) {
        this.requestSize = requestSize;
    }

    public String getRowKey() {
        return rowKey;
    }

    public void setRowKey(String rowKey) {
        this.rowKey = rowKey;
    }

    public String getProjectName() {
        return projectName;
    }

    public void setProjectName(String projectName) {
        this.projectName = projectName;
    }

    public String getClientIp() {
        return clientIp;
    }

    public void setClientIp(String clientIp) {
        this.clientIp = clientIp;
    }

    public String getMethodName() {
        return methodName;
    }

    public void setMethodName(String methodName) {
        this.methodName = methodName;
    }

    public Date getOperateTime() {
        return operateTime;
    }

    public void setOperateTime(Date operateTime) {
        this.operateTime = operateTime;
    }

    public String getOperateTimeStr() {
        return operateTimeStr;
    }

    public void setOperateTimeStr(String operateTimeStr) {
        this.operateTimeStr = operateTimeStr;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public boolean isValid() {
        return isValid;
    }

    public void setValid(boolean valid) {
        isValid = valid;
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
    
}
