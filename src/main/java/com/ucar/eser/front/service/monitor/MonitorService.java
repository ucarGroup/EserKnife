package com.ucar.eser.front.service.monitor;

import java.util.Map;

/**
 * Created by wangjiulin on 2018/1/23.
 */
public interface MonitorService {

    Map<String,Object> getMointorInfos(String clusterName, String dataType, String host, String startTime, String endTime, Integer timeInterval);

}
