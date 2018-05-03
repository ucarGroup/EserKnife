package com.ucar.eser.front.controller.monitor;

import com.google.common.base.Throwables;
import com.google.common.collect.Maps;
import com.ucar.eser.core.bean.po.ClusterInfo;
import com.ucar.eser.core.jest.JestManager;
import com.ucar.eser.front.service.monitor.MonitorService;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;
import java.util.Map;

/**
 *
 * Created by wangjiulin on 2018/1/22.
 */
@Controller
@RequestMapping("/monitor/")
public class MonitorController {

    private static final Logger LOG = LoggerFactory.getLogger(MonitorController.class);

    @Autowired
    private MonitorService monitorService;

    @RequestMapping(value = "/getHosts")
    @ResponseBody
    public Object getHosts(@RequestParam("clusterName") String clusterName){
        Map<String, Object> map = Maps.newHashMap();
        try {
            if(StringUtils.isNotBlank(clusterName)){
                ClusterInfo clusterInfo = JestManager.CLUSTER_MAP.get(clusterName);
                if(clusterInfo != null){
                    map.put("ips",clusterInfo.getHosts().split(","));
                }
            }else{
                map.put("ips",null);
            }
            map.put("success",true);
        } catch (Exception e) {
            e.printStackTrace();
            map.put("errMsg", ":\n"+ Throwables.getStackTraceAsString(e));
        }
        return map;
    }

    @RequestMapping(value = "/getMonitorInfo")
    @ResponseBody
    public Object getMonitorInfo(@RequestParam("clusterName") String clusterName,
                                 @RequestParam("host") String host,
                                 @RequestParam("startTime") String startTime,
                                 @RequestParam("endTime") String endTime,
                                 @RequestParam("dataType") String dataType){
        Map<String, Object> map =new HashMap<String, Object>();
        try {
            map = monitorService.getMointorInfos(clusterName,dataType,host,startTime,endTime,null);
            map.put("success",true);
        }catch (Exception e){
            LOG.error("获取监控信息出错:",e);
            map.put("errMsg", ":\n"+ Throwables.getStackTraceAsString(e));
        }
        return map;
    }

}
