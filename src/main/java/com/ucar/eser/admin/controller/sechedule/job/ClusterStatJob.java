package com.ucar.eser.admin.controller.sechedule.job;


import com.alibaba.fastjson.JSONObject;
import com.ucar.eser.admin.controller.sechedule.alarm.ClusterNodeAlarm;
import com.ucar.eser.admin.controller.sechedule.collecthandler.*;
import com.ucar.eser.admin.service.alarm.AlarmRuleService;
import com.ucar.eser.admin.service.schedule.EsBaseCenterJob;
import com.ucar.eser.core.bean.vo.alarm.AlarmRule;
import com.ucar.eser.core.init.SpringInit;
import com.ucar.eser.core.jest.JestManager;
import com.ucar.eser.core.util.async.AsyncService;
import com.ucar.eser.core.util.common.Constant;
import io.searchbox.client.JestResult;
import io.searchbox.cluster.NodesStats;
import org.apache.commons.collections.CollectionUtils;
import org.quartz.JobDataMap;
import org.quartz.JobExecutionContext;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * 
 * Description: 集群节点纬度统计Job
 * All Rights Reserved.
 */
public class ClusterStatJob extends EsBaseCenterJob {
	
    private static final long serialVersionUID = 2626836144949582163L;

    private AsyncService asyncService = (AsyncService) SpringInit.getApplicationContext().getBean("asyncServiceImpl");

    private AlarmRuleService alarmRuleService = (AlarmRuleService) SpringInit.getApplicationContext().getBean("alarmRuleServiceImpl");
    
    /**
     * 定时收集集群信息
     *
     */
    @Override
    public void action(JobExecutionContext context) {
        try {
            JobDataMap dataMap = context.getMergedJobDataMap();
            Date date = context.getTrigger().getPreviousFireTime();
        	String clusterName = dataMap.getString(Constant.CLUSTER_NAME);
        	LOGGER.info("开始统计"+clusterName+"的信息！");
            NodesStats nodesStats= new NodesStats.Builder().withJvm().withOs().withIndices()
                    .withHttp().withTransport().withThreadPool().withFs().build();
            JestResult result = JestManager.getJestClient(clusterName).execute(nodesStats);
        	JSONObject json = JSONObject.parseObject(result.getJsonString());
        	if(json == null) {
                return;
        	}
            asyncService.submitFuture(new CollectionCommonStatHandler(JobKey.buildFutureKey(clusterName, Constant.INDICES, date), clusterName, json, date));
            asyncService.submitFuture(new CollectionIndicesStatHandler(JobKey.buildFutureKey(clusterName, Constant.INDICES, date), clusterName, json, date));
            asyncService.submitFuture(new CollectionHttpStatHandler(JobKey.buildFutureKey(clusterName, Constant.HTTP, date), clusterName, json, date));
        	asyncService.submitFuture(new CollectionJVMStatHandler(JobKey.buildFutureKey(clusterName, Constant.JVM_NAME, date), clusterName, json, date));
            asyncService.submitFuture(new CollectionTransportStatHandler(JobKey.buildFutureKey(clusterName, Constant.TRANSPORT, date), clusterName, json, date));
            asyncService.submitFuture(new CollectionThreadPoolStatHandler(JobKey.buildFutureKey(clusterName, Constant.THREAD_POOL, date), clusterName, json, date));
            asyncService.submitFuture(new CollectionOsStatHandler(JobKey.buildFutureKey(clusterName, Constant.OS, date), clusterName, json, date));
            asyncService.submitFuture(new CollectionFsStatHandler(JobKey.buildFutureKey(clusterName, Constant.FS, date), clusterName, json, date));

            //报警处理
            List<AlarmRule> all = alarmRuleService.getList();
            List<AlarmRule> alarmFilterRule = new ArrayList<AlarmRule>();
            if(CollectionUtils.isEmpty(all)) {
                return;
            }else{
               for(AlarmRule alarmRule:all){
                   if(clusterName.equals(alarmRule.getClusterName()) && alarmRule.getEnable() > 0){
                       alarmFilterRule.add(alarmRule);
                   }
               }
            }
            asyncService.submitFuture(new ClusterNodeAlarm(JobKey.buildFutureKey(clusterName, Constant.NODE_ALARM, date),clusterName,json,alarmFilterRule));
        }catch (Exception e) {
            LOGGER.error("定时获取集群统计异常", e.getStackTrace());
        }
    }
}

