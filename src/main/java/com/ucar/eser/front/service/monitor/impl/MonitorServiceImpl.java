package com.ucar.eser.front.service.monitor.impl;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.ucar.eser.core.bean.po.ClusterInfo;
import com.ucar.eser.core.bean.vo.stat.*;
import com.ucar.eser.core.jest.JestManager;
import com.ucar.eser.core.util.DateUtil;
import com.ucar.eser.front.dao.monitor.MonitorDao;
import com.ucar.eser.front.service.monitor.MonitorService;
import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.util.*;

/**
 * Created by wangjiulin on 2018/1/23.
 */
@Service
public class MonitorServiceImpl implements MonitorService {

    @Autowired
    private MonitorDao monitorDao;

    @Override
    public Map<String, Object> getMointorInfos(String clusterName, String dataType, String host, String startTime, String endTime, Integer timeInterval) {
        Map<String,Object> result = new HashMap<String, Object>();
        if(StringUtils.isNotBlank(dataType)){
            Map<String,Object> paramMap = initParams(clusterName, host, startTime,endTime,timeInterval);
            switch (DATE_TYPE_ENUM.getValueByName(dataType)){
                case 1:
                case 18:
                    List<NodeOSStatInfo> nodeOSStatInfos = monitorDao.getOsMonitorInfo(paramMap);
                    result = handleOsResult(nodeOSStatInfos,DATE_TYPE_ENUM.getValueByName(dataType));
                    break;
                case 2:
                case 17:
                    List<NodeJVMStatInfo> nodeJVMStatInfos = monitorDao.getJvmMonitorInfo(paramMap);
                    result  =  handleJvmResult(nodeJVMStatInfos,DATE_TYPE_ENUM.getValueByName(dataType));
                    break;
                case 3:
                    List<NodeJVMStatInfo> nodeJVMs = monitorDao.getGcMointorInfo(paramMap);
                    result = handleJvmResult(nodeJVMs,DATE_TYPE_ENUM.getValueByName(dataType));
                    break;
                case 4:
                case 5:
                case 6:
                case 7:
                case 8:
                case 9:
                case 10:
                case 11:
                case 12:
                    List<NodeIndiceStatInfo> nodeIndiceStatInfos = monitorDao.getIndicesMonitorInfo(paramMap);
                    result = handleIndicesResult(nodeIndiceStatInfos,DATE_TYPE_ENUM.getValueByName(dataType));
                    break;
                case 13:
                case 14:
                case 15:
                case 16:
                    paramMap.put("dataType",dataType);
                    List<NodeThreadPoolStatInfo> threadPoolMonitorInfos = monitorDao.getThreadPoolMonitorInfo(paramMap);
                    result = handleThreadPoolResult(threadPoolMonitorInfos);
                    break;
                case 19:
                    List<NodeHttpStatInfo> nodeHttpStatInfos = monitorDao.getHttpMonitorInfo(paramMap);
                    List<NodeTransportStatInfo> nodeTransportStatInfos = monitorDao.getTransportMonitorInfo(paramMap);
                    result = handleChanleResult(nodeHttpStatInfos,nodeTransportStatInfos);
                    break;
                case 20:
                    List<NodeTransportStatInfo> nodeTransInfos = monitorDao.getTransportMonitorInfo(paramMap);
                    result = handleTransportResult(nodeTransInfos);
                    break;
                default:
                    return result;
            }
        }
        return result;
    }

    private Map<String,Object> handleTransportResult(List<NodeTransportStatInfo> nodeTransportStatInfos) {
        Map<String,Object> map = new HashMap<String, Object>();
        if(CollectionUtils.isNotEmpty(nodeTransportStatInfos) && nodeTransportStatInfos.size()>1){
            Object[]  transportRx= new Object[nodeTransportStatInfos.size()];
            Object[]  transportTx= new Object[nodeTransportStatInfos.size()];
            for (int i = 0;i<nodeTransportStatInfos.size()-1;i++){
                NodeTransportStatInfo nodeTransportStatInfo = nodeTransportStatInfos.get(i);
                NodeTransportStatInfo nextNodeTransport = nodeTransportStatInfos.get(i+1);
                JSONArray transportTxArraySub = new JSONArray();
                transportTxArraySub.add(DateUtil.formatYYYYMMddHHMMSS(nextNodeTransport.getCreateTime()));
                //服务器停止后数据两分钟间隔没有数据  默认为 0
                Date compairDate = new Date(nodeTransportStatInfo.getCreateTime().getTime()+2*60*1000);
                if(compairDate.getTime() - nextNodeTransport.getCreateTime().getTime() >= 0){
                    transportTxArraySub.add(nextNodeTransport.getTx_size_in_bytes()-nodeTransportStatInfo.getTx_size_in_bytes());
                }else{
                    transportTxArraySub.add(0);
                }
                JSONObject transportTxJsonObject = new JSONObject();
                transportTxJsonObject.put("value",transportTxArraySub);
                transportTx[i] = transportTxJsonObject;
                JSONArray transportRxArraySub = new JSONArray();
                transportRxArraySub.add(DateUtil.formatYYYYMMddHHMMSS(nextNodeTransport.getCreateTime()));
                if(compairDate.getTime() - nextNodeTransport.getCreateTime().getTime() >= 0) {
                    transportRxArraySub.add(nextNodeTransport.getRx_size_in_bytes() - nodeTransportStatInfo.getRx_size_in_bytes());
                }else{
                    transportRxArraySub.add(0);
                }
                JSONObject transportRxJsonObject = new JSONObject();
                transportRxJsonObject.put("value",transportRxArraySub);
                transportRx[i] = transportRxJsonObject;
            }
            map.put("transportRx",transportRx);
            map.put("transportTx",transportTx);
        }
        return map;
    }

    private Map<String,Object> handleChanleResult(List<NodeHttpStatInfo> nodeHttpStatInfos, List<NodeTransportStatInfo> nodeTransportStatInfos) {
        Map<String,Object> map = new HashMap<String, Object>();
        if(CollectionUtils.isNotEmpty(nodeHttpStatInfos)){
            Object[]  http = new Object[nodeHttpStatInfos.size()];
            for (int i = 0;i<nodeHttpStatInfos.size();i++){
                NodeHttpStatInfo nodeHttpStatInfo = nodeHttpStatInfos.get(i);
                JSONArray httpArraySub = new JSONArray();
                httpArraySub.add(DateUtil.formatYYYYMMddHHMMSS(nodeHttpStatInfo.getCreateTime()));
                httpArraySub.add(nodeHttpStatInfo.getCurrent_open());
                JSONObject httpJsonObject = new JSONObject();
                httpJsonObject.put("value",httpArraySub);
                http[i] = httpJsonObject;
            }
            map.put("channelsHttp",http);
        }
        if(CollectionUtils.isNotEmpty(nodeTransportStatInfos)){
            Object[]  transport= new Object[nodeTransportStatInfos.size()];
            for (int i = 0;i<nodeTransportStatInfos.size();i++){
                NodeTransportStatInfo nodeTransportStatInfo = nodeTransportStatInfos.get(i);
                JSONArray transportArraySub = new JSONArray();
                transportArraySub.add(DateUtil.formatYYYYMMddHHMMSS(nodeTransportStatInfo.getCreateTime()));
                transportArraySub.add(nodeTransportStatInfo.getServer_open());
                JSONObject transportJsonObject = new JSONObject();
                transportJsonObject.put("value",transportArraySub);
                transport[i] = transportJsonObject;
            }
            map.put("channelsTransport",transport);
        }
        return map;
    }

    private Map<String,Object> handleThreadPoolResult(List<NodeThreadPoolStatInfo> threadPoolStatInfos) {
        Map<String,Object> map = new HashMap<String, Object>();
        if(CollectionUtils.isNotEmpty(threadPoolStatInfos)){
            Object[]  queue = new Object[threadPoolStatInfos.size()];
            Object[]  peak= new Object[threadPoolStatInfos.size()];
            Object[]  count= new Object[threadPoolStatInfos.size()];
                for (int i = 0;i < threadPoolStatInfos.size();i++){
                    NodeThreadPoolStatInfo nodeThreadPoolStatInfo = threadPoolStatInfos.get(i);
                    JSONArray queryArraySub = new JSONArray();
                    queryArraySub.add(DateUtil.formatYYYYMMddHHMMSS(nodeThreadPoolStatInfo.getCreateTime()));
                    queryArraySub.add(nodeThreadPoolStatInfo.getQueue());
                    JSONObject queryJsonObject = new JSONObject();
                    queryJsonObject.put("value",queryArraySub);
                    queue[i] = queryJsonObject;
                    JSONArray peakArraySub = new JSONArray();
                    peakArraySub.add(DateUtil.formatYYYYMMddHHMMSS(nodeThreadPoolStatInfo.getCreateTime()));
                    peakArraySub.add(nodeThreadPoolStatInfo.getLargest());
                    JSONObject peakJsonObject = new JSONObject();
                    peakJsonObject.put("value",peakArraySub);
                    peak[i] = peakJsonObject;
                    JSONArray countArraySub = new JSONArray();
                    countArraySub.add(DateUtil.formatYYYYMMddHHMMSS(nodeThreadPoolStatInfo.getCreateTime()));
                    countArraySub.add(nodeThreadPoolStatInfo.getActive());
                    JSONObject countJsonObject = new JSONObject();
                    countJsonObject.put("value",countArraySub);
                    count[i] = countJsonObject;
                }
                map.put("queue",queue);
                map.put("peak",peak);
                map.put("count",count);
            }
        return map;
    }

    private Map<String,Object> handleIndicesResult(List<NodeIndiceStatInfo> nodeIndiceStatInfos, Integer flag) {
        Map<String,Object> map = new HashMap<String, Object>();
        if(CollectionUtils.isNotEmpty(nodeIndiceStatInfos) && nodeIndiceStatInfos.size()>=2){
            List<NodeIndiceStatInfo> newList = new ArrayList<NodeIndiceStatInfo>();
            getNewList(nodeIndiceStatInfos, newList);
            switch (flag){
                case 4 :
                    Object[] segmentCounts = new Object[nodeIndiceStatInfos.size()];
                    for (int i = 0;i < nodeIndiceStatInfos.size();i++){
                        NodeIndiceStatInfo nodeIndiceStatInfo = nodeIndiceStatInfos.get(i);
                        JSONArray segmentArraySub = new JSONArray();
                        segmentArraySub.add(DateUtil.formatYYYYMMddHHMMSS(nodeIndiceStatInfo.getCreateTime()));
                        segmentArraySub.add(nodeIndiceStatInfo.getSegmentsCount());
                        JSONObject segmentJsonObject = new JSONObject();
                        segmentJsonObject.put("value",segmentArraySub);
                        segmentCounts[i] = segmentJsonObject;
                    }
                    map.put("segmentCounts",segmentCounts);
                    break;
                case 5 :
                    Object[] queryCounts = new Object[newList.size()];
                    Object[]  fetchCounts= new Object[newList.size()];
                    for (int i = 0;i < newList.size();i++){
                        NodeIndiceStatInfo nodeIndiceStatInfo = newList.get(i);
                        JSONArray queryArraySub = new JSONArray();
                        queryArraySub.add(DateUtil.formatYYYYMMddHHMMSS(nodeIndiceStatInfo.getCreateTime()));
                        queryArraySub.add(nodeIndiceStatInfo.getSearchQueryTotal());
                        JSONObject queryJsonObject = new JSONObject();
                        queryJsonObject.put("value",queryArraySub);
                        queryCounts[i] = queryJsonObject;
                        JSONArray fetchArraySub = new JSONArray();
                        fetchArraySub.add(DateUtil.formatYYYYMMddHHMMSS(nodeIndiceStatInfo.getCreateTime()));
                        fetchArraySub.add(nodeIndiceStatInfo.getSearchFetchTotal());
                        JSONObject fetchJsonObject = new JSONObject();
                        fetchJsonObject.put("value",fetchArraySub);
                        fetchCounts[i] = fetchJsonObject;
                    }
                    map.put("queryCounts",queryCounts);
                    map.put("fetchCounts",fetchCounts);
                    break;
                case 6 :
                    Object[] queryTime = new Object[newList.size()];
                    Object[]  fetchTime= new Object[newList.size()];
                    for (int i = 0;i < newList.size();i++){
                        NodeIndiceStatInfo nodeIndiceStatInfo = newList.get(i);
                        JSONArray queryTimeArraySub = new JSONArray();
                        queryTimeArraySub.add(DateUtil.formatYYYYMMddHHMMSS(nodeIndiceStatInfo.getCreateTime()));
                        queryTimeArraySub.add(nodeIndiceStatInfo.getSearchQueryTimeInMillis());
                        JSONObject queryTimeJsonObject = new JSONObject();
                        queryTimeJsonObject.put("value",queryTimeArraySub);
                        queryTime[i] = queryTimeJsonObject;
                        JSONArray fetchTimeArraySub = new JSONArray();
                        fetchTimeArraySub.add(DateUtil.formatYYYYMMddHHMMSS(nodeIndiceStatInfo.getCreateTime()));
                        fetchTimeArraySub.add(nodeIndiceStatInfo.getSearchFetchTimeInMillis());
                        JSONObject fetchTimeJsonObject = new JSONObject();
                        fetchTimeJsonObject.put("value",fetchTimeArraySub);
                        fetchTime[i] = fetchTimeJsonObject;
                    }
                    map.put("queryTime",queryTime);
                    map.put("fetchTime",fetchTime);
                    break;
                case 7 :
                    Object[] indiceDelete = new Object[newList.size()];
                    Object[]  indiceIndex= new Object[newList.size()];
                    for (int i = 0;i < newList.size();i++){
                        NodeIndiceStatInfo nodeIndiceStatInfo = newList.get(i);
                        JSONArray indiceDeleteArraySub = new JSONArray();
                        indiceDeleteArraySub.add(DateUtil.formatYYYYMMddHHMMSS(nodeIndiceStatInfo.getCreateTime()));
                        indiceDeleteArraySub.add(nodeIndiceStatInfo.getIndexingDeleteTotal());
                        JSONObject indiceDeleteJsonObject = new JSONObject();
                        indiceDeleteJsonObject.put("value",indiceDeleteArraySub);
                        indiceDelete[i] = indiceDeleteJsonObject;
                        JSONArray indiceIndexArraySub = new JSONArray();
                        indiceIndexArraySub.add(DateUtil.formatYYYYMMddHHMMSS(nodeIndiceStatInfo.getCreateTime()));
                        indiceIndexArraySub.add(nodeIndiceStatInfo.getIndexingIndexTotal());
                        JSONObject indiceIndexJsonObject = new JSONObject();
                        indiceIndexJsonObject.put("value",indiceIndexArraySub);
                        indiceIndex[i] = indiceIndexJsonObject;
                    }
                    map.put("indiceDelete",indiceDelete);
                    map.put("indiceIndex",indiceIndex);
                    break;
                case 8 :
                    Object[] deleteTime = new Object[newList.size()];
                    Object[]  indexTime= new Object[newList.size()];
                    for (int i = 0;i < newList.size();i++){
                        NodeIndiceStatInfo nodeIndiceStatInfo = newList.get(i);
                        JSONArray deleteTimeArraySub = new JSONArray();
                        deleteTimeArraySub.add(DateUtil.formatYYYYMMddHHMMSS(nodeIndiceStatInfo.getCreateTime()));
                        deleteTimeArraySub.add(nodeIndiceStatInfo.getIndexingDeleteTimeInMillis());
                        JSONObject deleteTimeJsonObject = new JSONObject();
                        deleteTimeJsonObject.put("value",deleteTimeArraySub);
                        deleteTime[i] = deleteTimeJsonObject;
                        JSONArray indexTimeArraySub = new JSONArray();
                        indexTimeArraySub.add(DateUtil.formatYYYYMMddHHMMSS(nodeIndiceStatInfo.getCreateTime()));
                        indexTimeArraySub.add(nodeIndiceStatInfo.getIndexingIndexTimeInMillis());
                        JSONObject indexTimeJsonObject = new JSONObject();
                        indexTimeJsonObject.put("value",indexTimeArraySub);
                        indexTime[i] = indexTimeJsonObject;
                    }
                    map.put("deleteTime",deleteTime);
                    map.put("indexTime",indexTime);
                    break;
                case 9 :
                    break;
                case 10 :
                    break;
                case 11 :
                    Object[] getCounts = new Object[newList.size()];
                    Object[]  missingCounts= new Object[newList.size()];
                    Object[]  existsCounts= new Object[newList.size()];
                    for (int i = 0;i < newList.size();i++){
                        NodeIndiceStatInfo nodeIndiceStatInfo = newList.get(i);
                        JSONArray getArraySub = new JSONArray();
                        getArraySub.add(DateUtil.formatYYYYMMddHHMMSS(nodeIndiceStatInfo.getCreateTime()));
                        getArraySub.add(nodeIndiceStatInfo.getGetTotal());
                        JSONObject getJsonObject = new JSONObject();
                        getJsonObject.put("value",getArraySub);
                        getCounts[i] = getJsonObject;
                        JSONArray missingArraySub = new JSONArray();
                        missingArraySub.add(DateUtil.formatYYYYMMddHHMMSS(nodeIndiceStatInfo.getCreateTime()));
                        missingArraySub.add(nodeIndiceStatInfo.getGetMissingTotal());
                        JSONObject missingJsonObject = new JSONObject();
                        missingJsonObject.put("value",missingArraySub);
                        missingCounts[i] = missingJsonObject;
                        JSONArray existsArraySub = new JSONArray();
                        existsArraySub.add(DateUtil.formatYYYYMMddHHMMSS(nodeIndiceStatInfo.getCreateTime()));
                        existsArraySub.add(nodeIndiceStatInfo.getGetExistsTotal());
                        JSONObject existsJsonObject = new JSONObject();
                        existsJsonObject.put("value",existsArraySub);
                        existsCounts[i] = existsJsonObject;
                    }
                    map.put("getCounts",getCounts);
                    map.put("missingCounts",missingCounts);
                    map.put("existsCounts",existsCounts);
                    break;
                case 12 :
                    Object[] getTimes = new Object[newList.size()];
                    Object[]  missingTimes= new Object[newList.size()];
                    Object[]  existsTimes= new Object[newList.size()];
                    for (int i = 0;i < newList.size();i++){
                        NodeIndiceStatInfo nodeIndiceStatInfo = newList.get(i);
                        JSONArray getTimeArraySub = new JSONArray();
                        getTimeArraySub.add(DateUtil.formatYYYYMMddHHMMSS(nodeIndiceStatInfo.getCreateTime()));
                        getTimeArraySub.add(nodeIndiceStatInfo.getGetTimeInMillis());
                        JSONObject getTimeJsonObject = new JSONObject();
                        getTimeJsonObject.put("value",getTimeArraySub);
                        getTimes[i] = getTimeJsonObject;
                        JSONArray missingTimeArraySub = new JSONArray();
                        missingTimeArraySub.add(DateUtil.formatYYYYMMddHHMMSS(nodeIndiceStatInfo.getCreateTime()));
                        missingTimeArraySub.add(nodeIndiceStatInfo.getGetMissingTimeInMillis());
                        JSONObject missingTimeJsonObject = new JSONObject();
                        missingTimeJsonObject.put("value",missingTimeArraySub);
                        missingTimes[i] = missingTimeJsonObject;
                        JSONArray existsTimeArraySub = new JSONArray();
                        existsTimeArraySub.add(DateUtil.formatYYYYMMddHHMMSS(nodeIndiceStatInfo.getCreateTime()));
                        existsTimeArraySub.add(nodeIndiceStatInfo.getGetExistsTimeInMillis());
                        JSONObject existsTimeJsonObject = new JSONObject();
                        existsTimeJsonObject.put("value",existsTimeArraySub);
                        existsTimes[i] = existsTimeJsonObject;
                    }
                    map.put("getTimes",getTimes);
                    map.put("missingTimes",missingTimes);
                    map.put("existsTimes",existsTimes);
                    break;
                default:
                    break;
            }
        }
        return map;
    }

    private void getNewList(List<NodeIndiceStatInfo> nodeIndiceStatInfos, List<NodeIndiceStatInfo> newList) {
        for (int i = 0;i<nodeIndiceStatInfos.size();i++){
            NodeIndiceStatInfo nodeIndiceStatInfo = new NodeIndiceStatInfo();
            int next = i+1;
            if(next < nodeIndiceStatInfos.size()){
                NodeIndiceStatInfo firstNodeIndiceStatInfo = nodeIndiceStatInfos.get(i);
                NodeIndiceStatInfo secondNodeIndiceStatInfo = nodeIndiceStatInfos.get(next);
                Date compairDate = new Date(firstNodeIndiceStatInfo.getCreateTime().getTime()+2*60*1000);
                if(compairDate.getTime() - secondNodeIndiceStatInfo.getCreateTime().getTime() >= 0){
                    Long searchQueryCount = secondNodeIndiceStatInfo.getSearchQueryTotal() - firstNodeIndiceStatInfo.getSearchQueryTotal();
                    nodeIndiceStatInfo.setSearchQueryTotal(searchQueryCount > 0 ?searchQueryCount:0);

                    Long searchFetchCount = secondNodeIndiceStatInfo.getSearchFetchTotal() - firstNodeIndiceStatInfo.getSearchFetchTotal();
                    nodeIndiceStatInfo.setSearchFetchTotal(searchFetchCount > 0 ?searchFetchCount:0);

                    Long queryTime = secondNodeIndiceStatInfo.getSearchQueryTimeInMillis() - firstNodeIndiceStatInfo.getSearchQueryTimeInMillis();
                    nodeIndiceStatInfo.setSearchQueryTimeInMillis(queryTime >0?queryTime:0);

                    Long fetchTime = secondNodeIndiceStatInfo.getSearchFetchTimeInMillis() - firstNodeIndiceStatInfo.getSearchFetchTimeInMillis();
                    nodeIndiceStatInfo.setSearchFetchTimeInMillis(fetchTime >0?fetchTime:0);

                    Long indiceDelete = secondNodeIndiceStatInfo.getIndexingDeleteTotal() - firstNodeIndiceStatInfo.getIndexingDeleteTotal();
                    nodeIndiceStatInfo.setIndexingDeleteTotal(indiceDelete >0?indiceDelete:0);

                    Long indiceIndex = secondNodeIndiceStatInfo.getIndexingIndexTotal() - firstNodeIndiceStatInfo.getIndexingIndexTotal();
                    nodeIndiceStatInfo.setIndexingIndexTotal(indiceIndex >0?indiceIndex:0);

                    Long deleteTime = secondNodeIndiceStatInfo.getIndexingDeleteTimeInMillis() - firstNodeIndiceStatInfo.getIndexingDeleteTimeInMillis();
                    nodeIndiceStatInfo.setIndexingDeleteTimeInMillis(deleteTime >0?deleteTime:0);

                    Long indexTime = secondNodeIndiceStatInfo.getIndexingIndexTimeInMillis() - firstNodeIndiceStatInfo.getIndexingIndexTimeInMillis();
                    nodeIndiceStatInfo.setIndexingIndexTimeInMillis(indexTime >0?indexTime:0);

                    Long getCount = secondNodeIndiceStatInfo.getGetTotal() - firstNodeIndiceStatInfo.getGetTotal();
                    nodeIndiceStatInfo.setGetTotal(getCount >0?getCount:0);

                    Long missingCount = secondNodeIndiceStatInfo.getGetMissingTotal() - firstNodeIndiceStatInfo.getGetMissingTotal();
                    nodeIndiceStatInfo.setGetMissingTotal(missingCount >0?missingCount:0);

                    Long existsCount = secondNodeIndiceStatInfo.getGetExistsTotal() - firstNodeIndiceStatInfo.getGetExistsTotal();
                    nodeIndiceStatInfo.setGetExistsTotal(existsCount >0?existsCount:0);

                    Long getTime = secondNodeIndiceStatInfo.getGetTimeInMillis() - firstNodeIndiceStatInfo.getGetTimeInMillis();
                    nodeIndiceStatInfo.setGetTimeInMillis(getTime >0?getTime:0);

                    Long misstinTime = secondNodeIndiceStatInfo.getGetMissingTimeInMillis() - firstNodeIndiceStatInfo.getGetMissingTimeInMillis();
                    nodeIndiceStatInfo.setGetMissingTimeInMillis(misstinTime >0?misstinTime:0);

                    Long exsitsTime = secondNodeIndiceStatInfo.getGetExistsTimeInMillis() - firstNodeIndiceStatInfo.getGetExistsTimeInMillis();
                    nodeIndiceStatInfo.setGetExistsTimeInMillis(exsitsTime >0?exsitsTime:0);
                }else{
                    nodeIndiceStatInfo.setSearchQueryTotal(0L);

                    nodeIndiceStatInfo.setSearchFetchTotal(0L);

                    nodeIndiceStatInfo.setSearchQueryTimeInMillis(0L);

                    nodeIndiceStatInfo.setSearchFetchTimeInMillis(0L);

                    nodeIndiceStatInfo.setIndexingDeleteTotal(0L);

                    nodeIndiceStatInfo.setIndexingIndexTotal(0L);

                    nodeIndiceStatInfo.setIndexingDeleteTimeInMillis(0L);

                    nodeIndiceStatInfo.setIndexingIndexTimeInMillis(0L);

                    nodeIndiceStatInfo.setGetTotal(0L);

                    nodeIndiceStatInfo.setGetMissingTotal(0L);

                    nodeIndiceStatInfo.setGetExistsTotal(0L);

                    nodeIndiceStatInfo.setGetTimeInMillis(0L);

                    nodeIndiceStatInfo.setGetMissingTimeInMillis(0L);

                    nodeIndiceStatInfo.setGetExistsTimeInMillis(0L);
                }
                nodeIndiceStatInfo.setCreateTime(secondNodeIndiceStatInfo.getCreateTime());
                newList.add(nodeIndiceStatInfo);
            }
        }
    }

    private Map<String,Object> handleJvmResult(List<NodeJVMStatInfo> nodeJVMStatInfos,Integer flag) {
        Map<String,Object> map = new HashMap<String, Object>();
        if(CollectionUtils.isNotEmpty(nodeJVMStatInfos)){
            switch(flag){
                case 2:
                    Object[] heapUsed = new Object[nodeJVMStatInfos.size()];
                    Object[] heapCommited = new Object[nodeJVMStatInfos.size()];
                    for (int i = 0;i < nodeJVMStatInfos.size();i++) {
                        NodeJVMStatInfo nodeJvmStatInfo = nodeJVMStatInfos.get(i);
                        JSONArray heapUsedArraySub = new JSONArray();
                        heapUsedArraySub.add(DateUtil.formatYYYYMMddHHMMSS(nodeJvmStatInfo.getCreateTime()));
                        heapUsedArraySub.add(nodeJvmStatInfo.getHeapUsedInBytes());
                        JSONObject heapUsedJsonObject = new JSONObject();
                        heapUsedJsonObject.put("value", heapUsedArraySub);
                        heapUsed[i] = heapUsedJsonObject;
                        JSONArray heapCommitedArraySub = new JSONArray();
                        heapCommitedArraySub.add(DateUtil.formatYYYYMMddHHMMSS(nodeJvmStatInfo.getCreateTime()));
                        heapCommitedArraySub.add(nodeJvmStatInfo.getHeapCommittedInBytes());
                        JSONObject heapCommitedJsonObject = new JSONObject();
                        heapCommitedJsonObject.put("value", heapCommitedArraySub);
                        heapCommited[i] = heapCommitedJsonObject;
                    }
                    map.put("heapUsed",heapUsed);
                    map.put("heapCommited",heapCommited);
                    break;
                case 3:
                    Object[] intervalYoung = new Object[nodeJVMStatInfos.size()];
                    Object[] intervalOld = new Object[nodeJVMStatInfos.size()];
                    for (int i = 0;i < nodeJVMStatInfos.size();i++) {
                        NodeJVMStatInfo nodeJvmStatInfo = nodeJVMStatInfos.get(i);
                        JSONArray youngArraySub = new JSONArray();
                        youngArraySub.add(DateUtil.formatYYYYMMddHHMMSS(nodeJvmStatInfo.getCreateTime()));
                        youngArraySub.add(nodeJvmStatInfo.getIntervalYoungCollectionCount());
                        JSONObject yongJsonObject = new JSONObject();
                        yongJsonObject.put("value",youngArraySub);
                        intervalYoung[i] = yongJsonObject;
                        JSONArray oldArraySub = new JSONArray();
                        oldArraySub.add(DateUtil.formatYYYYMMddHHMMSS(nodeJvmStatInfo.getCreateTime()));
                        oldArraySub.add(nodeJvmStatInfo.getIntervalOldCollectionCount());
                        JSONObject oldJsonObject = new JSONObject();
                        oldJsonObject.put("value",oldArraySub);
                        intervalOld[i] = oldJsonObject;
                    }
                    map.put("young",intervalYoung);
                    map.put("old",intervalOld);
                    break;
                case 17:
                    Object[] threadPeak = new Object[nodeJVMStatInfos.size()];
                    Object[] threadCount = new Object[nodeJVMStatInfos.size()];
                    for (int i = 0;i < nodeJVMStatInfos.size();i++) {
                        NodeJVMStatInfo nodeJvmStatInfo = nodeJVMStatInfos.get(i);
                        JSONArray peakArraySub = new JSONArray();
                        peakArraySub.add(DateUtil.formatYYYYMMddHHMMSS(nodeJvmStatInfo.getCreateTime()));
                        peakArraySub.add(nodeJvmStatInfo.getThreadsPeakCount());
                        JSONObject peakJsonObject = new JSONObject();
                        peakJsonObject.put("value",peakArraySub);
                        threadPeak[i] = peakJsonObject;
                        JSONArray countArraySub = new JSONArray();
                        countArraySub.add(DateUtil.formatYYYYMMddHHMMSS(nodeJvmStatInfo.getCreateTime()));
                        countArraySub.add(nodeJvmStatInfo.getThreadsCount());
                        JSONObject countJsonObject = new JSONObject();
                        countJsonObject.put("value",countArraySub);
                        threadCount[i] = countJsonObject;
                    }
                    map.put("threadPeak",threadPeak);
                    map.put("threadCount",threadCount);
                    break;
                default:
                    break;
            }
        }
        return map;
    }

    private Map<String,Object> handleOsResult(List<NodeOSStatInfo> nodeOSStatInfos,Integer flag) {
        Map<String,Object> map = new HashMap<String, Object>();
            if(CollectionUtils.isNotEmpty(nodeOSStatInfos)){
                switch (flag){
                    case 1:
                        Object[] cpuArray = new Object[nodeOSStatInfos.size()];
                        Object[] memArray = new Object[nodeOSStatInfos.size()];
                        for (int i = 0;i < nodeOSStatInfos.size();i++){
                            NodeOSStatInfo nodeOSStatInfo = nodeOSStatInfos.get(i);
                            JSONArray cpuArraySub = new JSONArray();
                            cpuArraySub.add(DateUtil.formatYYYYMMddHHMMSS(nodeOSStatInfo.getCreateTime()));
                            cpuArraySub.add(nodeOSStatInfo.getCpuPercent());
                            JSONObject cpuJsonObject = new JSONObject();
                            cpuJsonObject.put("value",cpuArraySub);
                            cpuArray[i] = cpuJsonObject;
                            JSONArray memArraySub = new JSONArray();
                            memArraySub.add(DateUtil.formatYYYYMMddHHMMSS(nodeOSStatInfo.getCreateTime()));
                            memArraySub.add(nodeOSStatInfo.getMemUsedPercent());
                            JSONObject memJsonObject = new JSONObject();
                            memJsonObject.put("value",memArraySub);
                            memArray[i] = memJsonObject;
                        }
                        map.put("cpuArray",cpuArray);
                        map.put("memArray",memArray);
                        break;
                    case 18:
                        Object[] memFreeArray = new Object[nodeOSStatInfos.size()];
                        Object[] memUsedArray = new Object[nodeOSStatInfos.size()];
                        for (int i = 0;i < nodeOSStatInfos.size();i++){
                            NodeOSStatInfo nodeOSStatInfo = nodeOSStatInfos.get(i);
                            JSONArray memFreeArraySub = new JSONArray();
                            memFreeArraySub.add(DateUtil.formatYYYYMMddHHMMSS(nodeOSStatInfo.getCreateTime()));
                            memFreeArraySub.add(nodeOSStatInfo.getMemFree());
                            JSONObject memFreeJsonObject = new JSONObject();
                            memFreeJsonObject.put("value",memFreeArraySub);
                            memFreeArray[i] = memFreeJsonObject;
                            JSONArray memUsedArraySub = new JSONArray();
                            memUsedArraySub.add(DateUtil.formatYYYYMMddHHMMSS(nodeOSStatInfo.getCreateTime()));
                            memUsedArraySub.add(nodeOSStatInfo.getMemUsed());
                            JSONObject memUsedJsonObject = new JSONObject();
                            memUsedJsonObject.put("value",memUsedArraySub);
                            memUsedArray[i] = memUsedJsonObject;
                        }
                        map.put("memFreeArray",memFreeArray);
                        map.put("memUsedArray",memUsedArray);
                        break;
                    default:
                        break;
                }
            }
        return map;
    }

    private Map<String,Object> initParams(String clusterName, String host, String sTime, String eTime, Integer timeInterval) {
        Map<String,Object> paramMap = new HashMap<String, Object>();
        Date startTime = null;
        Date endTime = null;
        if(timeInterval != null){
            endTime = new Date();
            startTime = new Date(endTime.getTime()-timeInterval*60*1000);
        }else{
            try {
                startTime = DateUtil.parse(sTime,"yyyy-MM-dd HH:mm");
                endTime = DateUtil.parse(eTime,"yyyy-MM-dd HH:mm");
            } catch (ParseException e) {
                e.printStackTrace();
            }
        }
        ClusterInfo clusterInfo = JestManager.CLUSTER_MAP.get(clusterName);
        paramMap.put("clusterId",clusterInfo.getId());
        paramMap.put("host",host);
        paramMap.put("startTime",startTime);
        paramMap.put("endTime",endTime);
        return paramMap;
    }


    private enum DATE_TYPE_ENUM{

        OS_DATA_TYPE("resouceUsed",1),

        HEAP_MEM_TYPE("heapMem",2),

        GC_TYPE("GC",3),

        INDICES_SEGMENTS_TYPE("indicesSegments",4),

        SEARCH_REQUESTS_PER_SECOND("search_requests_per_second",5),

        SEARCH_TIME_PER_SECOND("search_time_per_second",6),

        INDEXING_REQUESTS_PER_SECOND("indexing_requests_per_second",7),

        INDEXING_TIME_PER_SECOND("indexing_time_per_second",8),

        CACHE_SIZE("cache_size",9),

        CACHE_EVICTIONS("cache_evictions",10),

        GET_REQUESTS_PER_SECOND("get_requests_per_second",11),

        GET_TIME_PER_SECOND("get_time_per_second",12),

        SEARCH("search",13),

        INDEX("index",14),

        BULK("bulk",15),

        REFRESH("refresh",16),

        THREADS("threads",17),

        MEM("mem",18),

        CHANNELS("channels",19),

        TRANSPORT_SIZE("transport_size",20);

        private String name;

        private Integer value;

        DATE_TYPE_ENUM(String name,Integer value) {
            this.name = name;
            this.value=value;
        }
        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public Integer getValue() {
            return value;
        }

        public void setValue(Integer value) {
            this.value = value;
        }

        public static Integer getValueByName(String name){
            Integer value =null;
            for(DATE_TYPE_ENUM date_type_enum:DATE_TYPE_ENUM.values()){
                if(date_type_enum.getName().equals(name)){
                    value = date_type_enum.getValue();
                    break;
                }
            }
            return value;
        }
    }

}
