package com.ucar.eser.core.bean.po;


import com.ucar.eser.core.util.DateUtil;

import java.util.Date;

/**
 * Created by wangzhen on 2016/9/20.
 * 慢日志对象
 */
public class SlowLogInfo {

    private long id;

    /**
     * 集群名称
     */
    private String custerName;

    /**
     * 时间
     */
    private String collectTime;
    /**
     * 慢日志时间
     */
    private Date slowLogTime;
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
     * 慢日志消耗时间
     */
    private String slowLogUseTime;
    /**
     * 慢日志类别
     */
    private String slowLogCategory;
    /**
     * 慢日志统计
     */
    private String slowLogStats;
    /**
     * 慢日志搜索类型
     */
    private String slowLogSearchType;
    /**
     * 慢日志请求记录
     */
    private String slowLogSource;
    /**
     * 扩展请求记录
     */
    private String slowLogExtendSource;

    private String serverIp;

    private Date createTime;

    private String slowLogTime4View;

    public String getSlowLogTime4View() {
        return slowLogTime4View;
    }

//    public void setSlowLogTime4View(String slowLogTime4View) {
//        this.slowLogTime4View = slowLogTime == null ? "" : DateUtil.formatYYYYMMddHHMMSS(slowLogTime);
//    }

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

    public String getCollectTime() {
        return collectTime;
    }

    public void setCollectTime(String collectTime) {
        this.collectTime = collectTime;
    }

    public Date getSlowLogTime() {
        return slowLogTime;
    }

    public void setSlowLogTime(Date slowLogTime) {
        this.slowLogTime4View = slowLogTime == null ? "" : DateUtil.formatYYYYMMddHHMMSS(slowLogTime);
        this.slowLogTime = slowLogTime;
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

    public String getSlowLogUseTime() {
        return slowLogUseTime;
    }

    public void setSlowLogUseTime(String slowLogUseTime) {
        if (slowLogUseTime == null) {
            this.slowLogUseTime = "";
        }
        this.slowLogUseTime = slowLogUseTime.indexOf("ms") == -1 ? slowLogUseTime : slowLogUseTime.replace("ms","");
    }

    public String getSlowLogCategory() {
        return slowLogCategory;
    }

    public void setSlowLogCategory(String slowLogCategory) {
        this.slowLogCategory = slowLogCategory;
    }

    public String getSlowLogStats() {
        return slowLogStats;
    }

    public void setSlowLogStats(String slowLogStats) {
        this.slowLogStats = slowLogStats;
    }

    public String getSlowLogSearchType() {
        return slowLogSearchType;
    }

    public void setSlowLogSearchType(String slowLogSearchType) {
        this.slowLogSearchType = slowLogSearchType;
    }

    public String getSlowLogSource() {
        return slowLogSource;
    }

    public void setSlowLogSource(String slowLogSource) {
        this.slowLogSource = slowLogSource;
    }

    public String getSlowLogExtendSource() {
        return slowLogExtendSource;
    }

    public void setSlowLogExtendSource(String slowLogExtendSource) {
        this.slowLogExtendSource = slowLogExtendSource;
    }

    public String getServerIp() {
        return serverIp;
    }

    public void setServerIp(String serverIp) {
        this.serverIp = serverIp;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

	@Override
	public boolean equals(Object obj) {
		
		if(obj == null) {
			return false;
		}
		
		if(!(obj instanceof SlowLogInfo)) {
			return false;
		}
		
		SlowLogInfo old = (SlowLogInfo)obj;
		
		if(!this.getKey().equals(old.getKey())) {
			return false;
		}
		
		if(slowLogTime == null && old.getSlowLogTime() == null) {
			return true;
		}
		
		if(slowLogTime == null || old.getSlowLogTime() == null) {
			return false;
		}
		
		long oldMilTime = old.getSlowLogTime().getTime();
		
		long milTime = slowLogTime.getTime();
		
		if(oldMilTime > milTime - 500 &&  oldMilTime < milTime + 500) {
			return true;
		}
		
		return false;
	}
	
	@Override
	public int hashCode() {
		return 0;
	}

	public String getKey() {
		String split = "|";
		return slowLogSource+split+serverIp+split+custerName+split+slowLogIndex+split+slowLogType;
	}
    
}
