package com.ucar.eser.admin.service.schedule.impl;

import com.google.common.util.concurrent.AtomicLongMap;
import com.ucar.eser.admin.dao.schedule.QuartzDao;
import com.ucar.eser.admin.service.schedule.SchedulerCenter;
import com.ucar.eser.core.bean.po.TriggerInfo;
import org.quartz.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import java.util.Date;
import java.util.List;
import java.util.Map;

import static org.quartz.SimpleScheduleBuilder.simpleSchedule;

/**
 * 根据scheduler控制job、trigger和scheduler的执行和状态
 * Created by wangzhen on 2015/10/22
 */
@Service
public class SchedulerCenterImpl implements SchedulerCenter {
    private Logger LOGGER = LoggerFactory.getLogger(this.getClass());

    // 注入预定义的scheduler
    @Autowired
    private Scheduler clusterScheduler;

    //维护app下所有trigger启动时间,key为triggerGroup名称，确保应用级别唯一
    private AtomicLongMap<String> appLongMap = AtomicLongMap.create();
    @Autowired
    private QuartzDao quartzDao;

    /**
     * 删除trigger
     *
     * @param triggerKey
     * @return
     */
    @Override
    public boolean unscheduleJob(TriggerKey triggerKey) {
        boolean opResult = true;
        try {
            opResult = clusterScheduler.checkExists(triggerKey);
            if (opResult) {
                opResult = clusterScheduler.unscheduleJob(triggerKey);
            }
        } catch (SchedulerException e) {
            LOGGER.error(e.getMessage(), e);
            opResult = false;
        }
        return opResult;
    }

    @Override
    public Trigger getTrigger(TriggerKey triggerKey) {
        Trigger trigger = null;
        try {
            trigger = clusterScheduler.getTrigger(triggerKey);
        } catch (SchedulerException e) {
            LOGGER.error(e.getMessage(), e);
        }
        return trigger;
    }

    @Override
    public boolean deployJobByCron(JobKey jobKey, TriggerKey triggerKey, Map<String, Object> dataMap, String cron, boolean replace) {
        Assert.isTrue(jobKey != null);
        Assert.isTrue(triggerKey != null);
        Assert.isTrue(CronExpression.isValidExpression(cron), "invalid cron = " + cron);
        try {
            JobDetail jobDetail = clusterScheduler.getJobDetail(jobKey);
            if (jobDetail == null) {
                LOGGER.error("JobKey {}:{} is not exist", jobKey.getName(), jobKey.getGroup());
                return false;
            }
            fireCronTrigger(triggerKey, jobDetail, cron, replace, dataMap);
        } catch (Exception e) {
            LOGGER.error(e.getMessage(), e);
            return false;
        }

        return true;
    }

    @Override
    public boolean deployJobByDelay(JobKey jobKey, TriggerKey triggerKey, Map<String, Object> dataMap, int delaySeconds, boolean replace) {
        Assert.isTrue(jobKey != null);
        Assert.isTrue(triggerKey != null);
        Assert.isTrue(delaySeconds > 0);
        try {
            JobDetail jobDetail = clusterScheduler.getJobDetail(jobKey);
            if (jobDetail == null) {
                LOGGER.error("JobKey {}:{} is not exist", jobKey.getName(), jobKey.getGroup());
                return false;
            }
            fireSimpleTrigger(triggerKey, jobDetail, replace, dataMap, delaySeconds);
        } catch (Exception e) {
            LOGGER.error(e.getMessage(), e);
            return false;
        }

        return true;
    }

    private boolean fireSimpleTrigger(TriggerKey triggerKey, JobDetail jobDetail, boolean replace, Map<String, Object> dataMap, int delaySeconds) {
        try {
            boolean isExists = clusterScheduler.checkExists(triggerKey);
            if (isExists) {
                if (replace) {
                    LOGGER.warn("replace trigger={}:{} ", triggerKey.getName(), triggerKey.getGroup());
                    clusterScheduler.unscheduleJob(triggerKey);
                } else {
                    LOGGER.info("exist trigger={}:{} ", triggerKey.getName(), triggerKey.getGroup());
                    return false;
                }
            }
            Date startAtDate = new Date(System.currentTimeMillis() + delaySeconds * 1000);
            Trigger trigger = TriggerBuilder.newTrigger()
                    .withIdentity(triggerKey)
                    .forJob(jobDetail)
                    .withSchedule(simpleSchedule()
                                    .withIntervalInSeconds(1)
                                    .withRepeatCount(0)
                    )
                    .startAt(startAtDate)
                    .build();
            if (dataMap != null && dataMap.size() > 0) {
                trigger.getJobDataMap().putAll(dataMap);
            }
            clusterScheduler.scheduleJob(trigger);
        } catch (SchedulerException e) {
            LOGGER.error(e.getMessage(), e);
            return false;
        }
        return true;
    }

    private boolean fireCronTrigger(TriggerKey triggerKey, JobDetail jobDetail, String cron, boolean replace, Map<String, Object> dataMap) {
        try {
            boolean isExists = clusterScheduler.checkExists(triggerKey);
            if (isExists) {
                if (replace) {
                    LOGGER.warn("replace trigger={}:{} ", triggerKey.getName(), triggerKey.getGroup());
                    clusterScheduler.unscheduleJob(triggerKey);
                } else {
                    LOGGER.info("exist trigger={}:{} ", triggerKey.getName(), triggerKey.getGroup());
                    return false;
                }
            }
            long appLong = appLongMap.get(triggerKey.getGroup());
            if (appLong == 0L || appLong < System.currentTimeMillis()) {
                synchronized (appLongMap) {
                    appLong = appLongMap.get(triggerKey.getGroup());
                    if (appLong == 0L || appLong < System.currentTimeMillis()) {
                        //启动时间往后延续2分钟.
                        appLong = System.currentTimeMillis();
                        appLong = appLong + 2 * 60 * 1000;
                        appLongMap.put(triggerKey.getGroup(), appLong);
                    }
                }
            }
            Date startDate = new Date(appLongMap.get(triggerKey.getGroup()));
            Trigger trigger = TriggerBuilder.newTrigger()
                    .withIdentity(triggerKey)
                    .forJob(jobDetail)
                    .withSchedule(CronScheduleBuilder.cronSchedule(cron))
                    .startAt(startDate)
                    .build();
            if (dataMap != null && dataMap.size() > 0) {
                trigger.getJobDataMap().putAll(dataMap);
            }
            clusterScheduler.scheduleJob(trigger);
        } catch (SchedulerException e) {
            LOGGER.error(e.getMessage(), e);
            return false;
        }
        return true;
    }

    @Override
    public List<TriggerInfo> getAllTriggers() {
        return quartzDao.getAllTriggers();
    }

    @Override
    public List<TriggerInfo> getTriggersByNameOrGroup(String query) {
        return quartzDao.searchTriggerByNameOrGroup(query);
    }

    @Override
    public boolean pauseTrigger(TriggerKey triggerKey) {
        try {
            boolean exists = clusterScheduler.checkExists(triggerKey);
            if (exists) {
                clusterScheduler.pauseTrigger(triggerKey);
                return true;
            }
            LOGGER.error("triggerKey={} not exists", triggerKey);
            return false;
        } catch (Exception e) {
            LOGGER.error(e.getMessage(), e);
            return false;
        }
    }

    @Override
    public boolean resumeTrigger(TriggerKey triggerKey) {
        try {
            boolean exists = clusterScheduler.checkExists(triggerKey);
            if (exists) {
                clusterScheduler.resumeTrigger(triggerKey);
                return true;
            }
            LOGGER.error("triggerKey={} not exists", triggerKey);
            return false;
        } catch (Exception e) {
            LOGGER.error(e.getMessage(), e);
            return false;
        }
    }
    
}
