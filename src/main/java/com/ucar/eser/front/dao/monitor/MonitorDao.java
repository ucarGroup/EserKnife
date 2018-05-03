package com.ucar.eser.front.dao.monitor;

import com.ucar.eser.core.bean.vo.stat.*;

import java.util.List;
import java.util.Map;

/**
 * Created by wangjiulin on 2018/1/23.
 */
public interface MonitorDao {

    List<NodeOSStatInfo> getOsMonitorInfo(Map<String,Object> paramMap);

    List<NodeJVMStatInfo> getJvmMonitorInfo(Map<String,Object> paramMap);

    List<NodeJVMStatInfo> getGcMointorInfo(Map<String,Object> paramMap);

    List<NodeIndiceStatInfo> getIndicesMonitorInfo(Map<String,Object> paramMap);

    List<NodeThreadPoolStatInfo> getThreadPoolMonitorInfo(Map<String,Object> paramMap);

    List<NodeTransportStatInfo> getTransportMonitorInfo(Map<String,Object> paramMap);

    List<NodeHttpStatInfo> getHttpMonitorInfo(Map<String,Object> paramMap);

}
