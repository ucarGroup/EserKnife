package com.ucar.eser.core.bean.vo.query;


import java.io.Serializable;


/**
 * @author forest
 * @create 2017-04-19 15:21
 */
public class ClientLog implements Serializable{

	private static final long serialVersionUID = 1L;
	
	private Long id;

	/** 操作时间 */
    private String clientLogViewTime;

    /** 总耗时 */
    private String costTime;

    /** 服务耗时 */
    private String serverTime;

    /** 解析耗时 */
    private String parseTime;

    /** 响应条数 */
    private String respRecordNum;

    /** 响应大小 */
    private String respRecordBytes;

    /** 接口名 */
    private String interfaceName;

    /** 来源 */
    private String source;

    /** 索引名 */
    private String indexName;

    /** 客户端地址 */
    private String clientIp;

    /** 操作人 */
    private String opsName;

    /** 操作人地址 */
    private String opsIp;

    /** 类型名 */
    private String typeName;

    /** 输入参数 */
    private String param;
    
    private String rowKey;

    public String getClientLogViewTime() {
        return clientLogViewTime;
    }

    public void setClientLogViewTime(String clientLogViewTime) {
        this.clientLogViewTime = clientLogViewTime;
    }

    public String getCostTime() {
        return costTime;
    }

    public void setCostTime(String costTime) {
        this.costTime = costTime;
    }

    public String getServerTime() {
        return serverTime;
    }

    public void setServerTime(String serverTime) {
        this.serverTime = serverTime;
    }

    public String getParseTime() {
        return parseTime;
    }

    public void setParseTime(String parseTime) {
        this.parseTime = parseTime;
    }

    public String getRespRecordNum() {
        return respRecordNum;
    }

    public void setRespRecordNum(String respRecordNum) {
        this.respRecordNum = respRecordNum;
    }

    public String getRespRecordBytes() {
        return respRecordBytes;
    }

    public void setRespRecordBytes(String respRecordBytes) {
        this.respRecordBytes = respRecordBytes;
    }

    public String getInterfaceName() {
        return interfaceName;
    }

    public void setInterfaceName(String interfaceName) {
        this.interfaceName = interfaceName;
    }

    public String getSource() {
        return source;
    }

    public void setSource(String source) {
        this.source = source;
    }

    public String getIndexName() {
        return indexName;
    }

    public void setIndexName(String indexName) {
        this.indexName = indexName;
    }

    public String getClientIp() {
        return clientIp;
    }

    public void setClientIp(String clientIp) {
        this.clientIp = clientIp;
    }

    public String getOpsName() {
        return opsName;
    }

    public void setOpsName(String opsName) {
        this.opsName = opsName;
    }

    public String getOpsIp() {
        return opsIp;
    }

    public void setOpsIp(String opsIp) {
        this.opsIp = opsIp;
    }

    public String getTypeName() {
        return typeName;
    }

    public void setTypeName(String typeName) {
        this.typeName = typeName;
    }

    public String getParam() {
        return param;
    }

    public void setParam(String param) {
        this.param = param;
    }

	public String getRowKey() {
		return rowKey;
	}

	public void setRowKey(String rowKey) {
		this.rowKey = rowKey;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}
    
}
