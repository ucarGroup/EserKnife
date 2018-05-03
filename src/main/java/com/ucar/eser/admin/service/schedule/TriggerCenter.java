package com.ucar.eser.admin.service.schedule;

import com.ucar.eser.core.bean.po.TriggerInfo;
import org.quartz.TriggerKey;

import java.util.List;

/**
 * trigger管理接口
 *
 * @author: wangzhen
 * @time: 2015/10/22
 */
public interface TriggerCenter {

    /**
     * 暂停trigger
     *
     */
    boolean pauseTrigger(TriggerKey triggerKey);

    /**
     * 恢复trigger
     *
     */
    boolean resumeTrigger(TriggerKey triggerKey);

    /**
     * 删除trigger(从db中删除了)
     *
     */
    boolean removeTrigger(TriggerKey triggerKey);

    /**
     * 查询某一job类型下的所有trigger
     *
     */
    List<TriggerInfo> getTriggersByJobGroup(String jobGroup);

    /**
     * 返回所有的trigger
     *
     */
    List<TriggerInfo> getAllTriggers();

    /**
     * 查询trigger，模糊匹配trigger name或trigger group
     *
     * @param queryString trigger name或trigger group的关键字
     */
    List<TriggerInfo> searchTriggerByNameOrGroup(String queryString);
}
