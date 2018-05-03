package com.ucar.eser.core.bean.po;


import java.io.Serializable;

/**
 * Created by wangzhen on 2016/9/25.
 */
public class SlowLogStat implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 6323495227859128014L;
	
	private long id;
    private String custerName;
    private String slowLogIndex;
    private String slowLogType;
    private String serverIp;
    private Float slowLogAvgTime;
    private Float slowLogMaxTime;
    private String collectTime;
    private int count;

    public long getId() {
        return id;
    }

    public void setId(long id) {

        this.id = id;
    }

    public String getCusterName() {
        return custerName;
    }

    public void setCusterName(String custerName) {
        this.custerName = custerName;
    }

    public String getSlowLogIndex() {
        return slowLogIndex;
    }

    public void setSlowLogIndex(String slowLogIndex) {
        this.slowLogIndex = slowLogIndex;
    }

    public String getSlowLogType() {
        return slowLogType;
    }

    public void setSlowLogType(String slowLogType) {
        this.slowLogType = slowLogType;
    }

    public String getServerIp() {
        return serverIp;
    }

    public void setServerIp(String serverIp) {
        this.serverIp = serverIp;
    }

    public Float getSlowLogAvgTime() {
        return slowLogAvgTime;
    }

    public void setSlowLogAvgTime(Float slowLogAvgTime) {
        this.slowLogAvgTime = slowLogAvgTime;
    }

    public Float getSlowLogMaxTime() {
        return slowLogMaxTime;
    }

    public void setSlowLogMaxTime(Float slowLogMaxTime) {
        this.slowLogMaxTime = slowLogMaxTime;
    }

    public String getCollectTime() {
        return collectTime;
    }

    public void setCollectTime(String collectTime) {
        this.collectTime = collectTime;
    }

    public int getCount() {
        return count;
    }

    public void setCount(int count) {
        this.count = count;
    }
}
