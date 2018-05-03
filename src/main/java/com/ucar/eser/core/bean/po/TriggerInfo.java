package com.ucar.eser.core.bean.po;


import com.ucar.eser.core.util.DateUtils;

import java.util.Date;


/**
 * Created by wangzhen on 2015/10/21 15:15.
 * trigger状态表
 */
public class TriggerInfo {
    private String schedName;
    private String triggerName;
    private String triggerGroup;
    private String jobName;
    private String jobGroup;
    private String description;
    private long nextFireTime;
    private long prevFireTime;
    private int priority;
    private String triggerState;
    private String triggerType;
    private long startTime;
    private long endTime;
    private String calendarName;
    private short misfireInstr;
    private String cron;

    public String getSchedName() {
        return schedName;
    }

    public void setSchedName(String schedName) {
        this.schedName = schedName;
    }

    public String getTriggerName() {
        return triggerName;
    }

    public void setTriggerName(String triggerName) {
        this.triggerName = triggerName;
    }

    public String getTriggerGroup() {
        return triggerGroup;
    }

    public void setTriggerGroup(String triggerGroup) {
        this.triggerGroup = triggerGroup;
    }

    public String getJobName() {
        return jobName;
    }

    public void setJobName(String jobName) {
        this.jobName = jobName;
    }

    public String getJobGroup() {
        return jobGroup;
    }

    public void setJobGroup(String jobGroup) {
        this.jobGroup = jobGroup;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public long getNextFireTime() {
        return nextFireTime;
    }

    public void setNextFireTime(long nextFireTime) {
        this.nextFireTime = nextFireTime;
    }

    public long getPrevFireTime() {
        return prevFireTime;
    }

    public void setPrevFireTime(long prevFireTime) {
        this.prevFireTime = prevFireTime;
    }

    public int getPriority() {
        return priority;
    }

    public void setPriority(int priority) {
        this.priority = priority;
    }

    public String getTriggerState() {
        return triggerState;
    }

    public void setTriggerState(String triggerState) {
        this.triggerState = triggerState;
    }

    public String getTriggerType() {
        return triggerType;
    }

    public void setTriggerType(String triggerType) {
        this.triggerType = triggerType;
    }

    public long getStartTime() {
        return startTime;
    }

    public void setStartTime(long startTime) {
        this.startTime = startTime;
    }

    public long getEndTime() {
        return endTime;
    }

    public void setEndTime(long endTime) {
        this.endTime = endTime;
    }

    public String getCalendarName() {
        return calendarName;
    }

    public void setCalendarName(String calendarName) {
        this.calendarName = calendarName;
    }

    public short getMisfireInstr() {
        return misfireInstr;
    }

    public void setMisfireInstr(short misfireInstr) {
        this.misfireInstr = misfireInstr;
    }

    public String getCron() {
        return cron;
    }

    public void setCron(String cron) {
        this.cron = cron;
    }


    public String getNextFireDate() {
        if (nextFireTime > 0) {
            return DateUtils.formatDate(new Date(nextFireTime), DateUtils.LONG_FORMAT);
        }
        return "";
    }

    public String getPrevFireDate() {
        if (prevFireTime > 0) {
            return DateUtils.formatDate(new Date(prevFireTime), DateUtils.LONG_FORMAT);
        }
        return "";
    }

    public String getStartDate() {
        if (startTime > 0) {
            return DateUtils.formatDate(new Date(startTime),DateUtils.LONG_FORMAT);
        }
        return "";
    }

    public String getEndDate() {
        if (endTime > 0) {
            return DateUtils.formatDate(new Date(endTime),DateUtils.LONG_FORMAT);
        }
        return "";
    }

    @Override
    public String toString() {
        return "TriggerInfo{" +
                "schedName='" + schedName + '\'' +
                ", triggerName='" + triggerName + '\'' +
                ", triggerGroup='" + triggerGroup + '\'' +
                ", jobName='" + jobName + '\'' +
                ", jobGroup='" + jobGroup + '\'' +
                ", description='" + description + '\'' +
                ", nextFireTime='" + nextFireTime + '\'' +
                ", prevFireTime='" + prevFireTime + '\'' +
                ", priority=" + priority +
                ", triggerState='" + triggerState + '\'' +
                ", triggerType='" + triggerType + '\'' +
                ", startTime=" + startTime +
                ", endTime=" + endTime +
                ", calendarName='" + calendarName + '\'' +
                ", misfireInstr=" + misfireInstr +
                ", cron=" + cron +
                '}';
    }

}
