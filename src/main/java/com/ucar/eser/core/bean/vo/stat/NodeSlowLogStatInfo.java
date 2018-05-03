package com.ucar.eser.core.bean.vo.stat;


import java.io.Serializable;

/**
 * Created by wangzhen on 2016/9/27.
 * 慢日志趋势图返回值信息
 */
public class NodeSlowLogStatInfo implements Serializable {

    /**
     *
     */
    private static final long serialVersionUID = -245333980769435121L;

    private String custerName;
    private String slowLogIndex;
    private String slowLogType;
    private String serverIp;
    private String id;
    private float[] slowLogAvgTime = new float[0];
    private float[] slowLogMaxTime = new float[0];
    private int[] slowLogCount = new int[0];
    private String[] collectTime= new String[0];

    public String getCusterName() {
        return custerName;
    }

    public void setCusterName(String custerName) {
        this.custerName = custerName;
    }

    public float[] getSlowLogAvgTime() {
        return slowLogAvgTime;
    }

    public void setSlowLogAvgTime(float[] slowLogAvgTime) {
        this.slowLogAvgTime = slowLogAvgTime;
    }

    public float[] getSlowLogMaxTime() {
        return slowLogMaxTime;
    }

    public void setSlowLogMaxTime(float[] slowLogMaxTime) {
        this.slowLogMaxTime = slowLogMaxTime;
    }

    public int[] getSlowLogCount() {
        return slowLogCount;
    }

    public void setSlowLogCount(int[] slowLogCount) {
        this.slowLogCount = slowLogCount;
    }

    public String[] getCollectTime() {
        return collectTime;
    }

    public void setCollectTime(String[] collectTime) {
        this.collectTime = collectTime;
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
        this.id = this.serverIp.replace(".", "");
    }

    public String getId() {
        return this.id;
    }
}
