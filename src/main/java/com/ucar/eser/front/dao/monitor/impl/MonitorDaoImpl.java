package com.ucar.eser.front.dao.monitor.impl;

import com.ucar.eser.core.bean.vo.stat.*;
import com.ucar.eser.core.ibatis.EserIbatisDaoImpl;
import com.ucar.eser.front.dao.monitor.MonitorDao;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;


/**
 * Created by wangjiulin on 2018/1/23.
 */
@Repository
public class MonitorDaoImpl extends EserIbatisDaoImpl implements MonitorDao{

    @Override
    public List<NodeOSStatInfo> getOsMonitorInfo(Map<String, Object> paramMap) {
        return this.queryForList("es.monitor.getOsMonitorInfo",paramMap);
    }

    @Override
    public List<NodeJVMStatInfo> getJvmMonitorInfo(Map<String, Object> paramMap) {
        return this.queryForList("es.monitor.getJvmMonitorInfo",paramMap);
    }

    @Override
    public List<NodeJVMStatInfo> getGcMointorInfo(Map<String, Object> paramMap) {
        return this.queryForList("es.monitor.getGcMonitorInfo",paramMap);
    }

    @Override
    public List<NodeIndiceStatInfo> getIndicesMonitorInfo(Map<String, Object> paramMap) {
        return this.queryForList("es.monitor.getIndicesMonitorInfo",paramMap);
    }

    @Override
    public List<NodeThreadPoolStatInfo> getThreadPoolMonitorInfo(Map<String, Object> paramMap) {
        return this.queryForList("es.monitor.getThreadPoolMonitorInfo",paramMap);
    }

    @Override
    public List<NodeTransportStatInfo> getTransportMonitorInfo(Map<String, Object> paramMap) {
        return this.queryForList("es.monitor.getTransportMonitorInfo",paramMap);
    }

    @Override
    public List<NodeHttpStatInfo> getHttpMonitorInfo(Map<String, Object> paramMap) {
        return this.queryForList("es.monitor.getHttpMonitorInfo",paramMap);
    }
}
