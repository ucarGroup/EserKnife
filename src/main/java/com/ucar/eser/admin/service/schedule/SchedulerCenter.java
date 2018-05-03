package com.ucar.eser.admin.service.schedule;

import com.ucar.eser.core.bean.po.TriggerInfo;
import org.quartz.JobKey;
import org.quartz.Trigger;
import org.quartz.TriggerKey;

import java.util.List;
import java.util.Map;

/**
 * 控制job、trigger和scheduler的基类
 */
public interface SchedulerCenter {

    Trigger getTrigger(TriggerKey triggerKey);

    /**
     * @return
     */
    boolean unscheduleJob(TriggerKey triggerKey);

    /**
     * 根据cron部署Job
     *
     */
    boolean deployJobByCron(JobKey jobKey, TriggerKey triggerKey, Map<String, Object> dataMap, String cron, boolean replace);

    /**
     * 根据延迟执行的Job
     */
    boolean deployJobByDelay(JobKey jobKey, TriggerKey triggerKey, Map<String, Object> dataMap, int delaySeconds, boolean replace);

    /**
     * 获取所有trigger
     */
    List<TriggerInfo> getAllTriggers();

    /**
     * 模糊查询trigger
     */
    List<TriggerInfo> getTriggersByNameOrGroup(String query);

    /**
     * 暂定trigger
     *
     */
    boolean pauseTrigger(TriggerKey triggerKey);

    /**
     * 恢复trigger
     *
     */
    boolean resumeTrigger(TriggerKey triggerKey);

}
