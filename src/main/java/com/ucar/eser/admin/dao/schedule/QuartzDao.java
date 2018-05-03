package com.ucar.eser.admin.dao.schedule;



import com.ucar.eser.core.bean.po.TriggerInfo;

import java.util.List;

/**
 * Created by wangzhen on 2015/10/21
 */
public interface QuartzDao {

     List<TriggerInfo> getTriggersByJobGroup(String jobGroup);

     List<TriggerInfo> getAllTriggers();

     List<TriggerInfo> searchTriggerByNameOrGroup(String queryString);
}
