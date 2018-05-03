package com.ucar.eser.core.jest;

import com.ucar.eser.admin.service.clusterManager.ClusterInfoService;
import com.ucar.eser.core.bean.po.ClusterInfo;
import com.ucar.eser.core.bean.po.CustomUser;
import com.ucar.eser.core.jest.vo.Cluster;
import com.ucar.eser.core.jest.vo.EsClusterDetail;
import com.ucar.eser.core.jest.vo.EsConfigDetailVo;
import com.ucar.eser.core.init.SpringInit;
import com.ucar.eser.core.jest.common.Match;
import com.ucar.eser.core.jest.service.impl.JestServiceImpl;
import com.ucar.eser.core.util.ClusterUtil;
import com.ucar.eser.core.util.RequestContext;
import com.ucar.eser.core.util.common.Constant;
import com.ucar.eser.core.util.exception.BusinessRuntimeException;
import io.searchbox.client.JestClient;
import io.searchbox.client.JestClientFactory;
import io.searchbox.client.config.HttpClientConfig;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.TimeUnit;

/**
 *
 * Created by wangjiulin on 2017/10/26.
 */
public class JestManager {

    private static final Logger LOGGER = LoggerFactory.getLogger(JestManager.class);

    private static Map<String,EsClusterDetail> MC_MAP = new ConcurrentHashMap<String,EsClusterDetail>();

    public static volatile Map<String, ClusterInfo> CLUSTER_MAP = new HashMap<String, ClusterInfo> ();

    public static volatile List<ClusterInfo> CLUSTER_LIST = new ArrayList<ClusterInfo>();

    public static volatile Map<String,JestClient> JEST_MAP = new HashMap<String, JestClient>();

    static{
        loadCluster();
    }


    public static JestClient getJestClient(String clustName){
        EsClusterDetail esCluster = MC_MAP.get(clustName);
        StringBuilder key = new StringBuilder().append(clustName);
        if(StringUtils.isNotBlank(esCluster.getUserName())) {
            CustomUser customUser = (CustomUser) RequestContext.getSessionAttribute(Constant.CUSTOM_USER_SESSION_NAME);
            ClusterInfo clusterInfo = CLUSTER_MAP.get(clustName);
            if(customUser != null){
                if(customUser.isAdmin() && clusterInfo != null){
                   key.append(clusterInfo.getAdminRoleName());
                }else{
                    if(customUser.getEsAccout() != null && customUser.getEsPwd() != null){
                        key.append(customUser.getEsAccout());
                    }else{
                        key.append(clusterInfo != null ? clusterInfo.getMonitorRoleName() : null);
                    }
                }
            }else{
                key.append(clusterInfo.getMonitorRoleName());
            }
        }
        if(JEST_MAP.get(key.toString()) != null){
            return JEST_MAP.get(key.toString());
        }else{
            return initJestClient(clustName,esCluster);
        }

    }

    /**
     * 获取JestClient对象
     */
    public static JestClient initJestClient(String clustName,EsClusterDetail esCluster) {
        JestClientFactory factory = new JestClientFactory();
        StringBuilder key = new StringBuilder().append(clustName);
        try {
            if(esCluster != null && esCluster.getClusterList()!= null && esCluster.getClusterList().size() > 0){
                List<Cluster> clusters = esCluster.getClusterList();
                List<String> notes = new LinkedList<String>();
                for (Cluster cluster : clusters){
                    notes.add("http://"+cluster.getHost()+":"+cluster.getHttpPort());
                }
                HttpClientConfig.Builder httpClientConfig = new HttpClientConfig
                        .Builder(notes)
                        .connTimeout(1500)
                        .readTimeout(15000)
                        .multiThreaded(true)
                        .discoveryEnabled(true)
                        .discoveryFrequency(15000L, TimeUnit.MILLISECONDS);
                if(StringUtils.isNotBlank(esCluster.getUserName())){
                    CustomUser customUser = (CustomUser) RequestContext.getSessionAttribute(Constant.CUSTOM_USER_SESSION_NAME);
                    ClusterInfo clusterInfo = CLUSTER_MAP.get(clustName);
                    if(customUser != null){
                        if(customUser.isAdmin() && clusterInfo != null){
                            httpClientConfig.defaultCredentials(clusterInfo.getAdminRoleName(),
                                    clusterInfo.getAdminRolePwd());
                            key.append(clusterInfo.getAdminRoleName());
                        }else if (StringUtils.isNotBlank(customUser.getEsAccout()) && StringUtils.isNotBlank(customUser.getEsPwd())) {
                            httpClientConfig.defaultCredentials(customUser.getEsAccout(),
                                    customUser.getEsPwd());
                            key.append(customUser.getEsAccout());
                        } else {
                            httpClientConfig.defaultCredentials(clusterInfo != null ? clusterInfo.getMonitorRoleName() : "",
                                    clusterInfo != null ? clusterInfo.getMonitorRolePwd() : null);
                            key.append(clusterInfo != null ? clusterInfo.getMonitorRoleName() : null);
                        }
                    }else{
                        httpClientConfig.defaultCredentials(clusterInfo.getMonitorRoleName(),
                                clusterInfo.getMonitorRolePwd());
                        key.append(clusterInfo.getMonitorRoleName());
                    }
                }
                factory.setHttpClientConfig(httpClientConfig.build());
            }
        }catch (Exception e){
            e.printStackTrace();
            LOGGER.error("初始化jestclient实例失败:",e);
        }
        JestClient jestClient = factory.getObject();
        JEST_MAP.put(key.toString(),jestClient);
        return  jestClient;
    }

    public static String exucute (String clusterName,String realTarget){
        String result = null;
        try{
            JestServiceImpl jestServiceImpl = (JestServiceImpl) SpringInit.getApplicationContext().getBean("jestServiceImpl");
            if(StringUtils.isNotBlank(realTarget)){
                if(StringUtils.isNotBlank(Match.clusterMatch(realTarget))){
                    result = jestServiceImpl.clusterStats(clusterName,Match.clusterMatch(realTarget)).getJsonString();
                }else if(StringUtils.isNotBlank(Match.nodeStatsMatch(realTarget))){
                    result = jestServiceImpl.nodesStats(clusterName,Match.nodeStatsMatch(realTarget)).getJsonString();
                }else if(realTarget.equals("/_nodes/_all/os,jvm")){
                    result = jestServiceImpl.getNoteSomInfo(clusterName,1).getJsonString();
                }else if(realTarget.equals("/_cluster/health")){
                    result = jestServiceImpl.health(clusterName).getJsonString();
                }else if(realTarget.equals("/_aliases")){
                    result = jestServiceImpl.getAliases(clusterName).getJsonString();
                }else if(realTarget.equals("/_cluster/settings")){
                    result = jestServiceImpl.getSetting(clusterName).getJsonString();
                }else if(realTarget.equals("/_nodes/stats/jvm,fs,os,process")){
                    result =jestServiceImpl.nodesStats(clusterName,1).getJsonString();
                }else if(realTarget.equals("/_stats/docs,store")){
                    result=jestServiceImpl.httpProxy(clusterName,realTarget,"GET",null).getJsonString();
                }else if(realTarget.equals("/_cluster/state/master_node,routing_table,blocks/")){
                    result=jestServiceImpl.getClusterState(clusterName).getJsonString();
                }
            }
        }catch (Exception e){
            LOGGER.error("请求报错:",e);
        }
        return result;
    }

    private static List<EsConfigDetailVo> checkESConfig(List<EsConfigDetailVo> list) {
        Set<String> set = new HashSet<String>();
        List<EsConfigDetailVo> newList = new ArrayList<EsConfigDetailVo>();
        for(EsConfigDetailVo config : list) {
            if(config.getIsUsed()) {
                if(!set.add(config.getClusterName())) {
                    throw new BusinessRuntimeException("es config check fail");
                }
                newList.add(config);
            }
        }
        return newList;
    }

    public synchronized static void addESConfigs(List<EsConfigDetailVo> list) {
        if(list == null || list.size() == 0) {
            return;
        }
        for(EsConfigDetailVo ev : checkESConfig(list)) {
            MC_MAP.put(ev.getClusterName(), new EsClusterDetail(ev));
        }
    }

    public synchronized static void addESClusterMap( Map<String, ClusterInfo> temMap) {
        if(temMap == null || temMap.size() == 0) {
            return;
        }
        Iterator<String> iter = temMap.keySet().iterator();
        String key;
        while (iter.hasNext()) {
            key = iter.next();
            CLUSTER_MAP.put(key,temMap.get(key));
        }
    }

    public static synchronized void loadCluster() {
        ClusterInfoService clusterInfoService = (ClusterInfoService) SpringInit.getApplicationContext().getBean("clusterInfoServiceImpl");
        List<ClusterInfo> clusters = clusterInfoService.getList(null);
        List<EsConfigDetailVo> list = new ArrayList<EsConfigDetailVo>();
        Map<String, ClusterInfo> temMap = new HashMap<String, ClusterInfo>();
        for(ClusterInfo clusterInfo : clusters) {
            temMap.put(clusterInfo.getClusterName(), clusterInfo);
            list.add(ClusterUtil.clusterInfo2ESConfigVo(clusterInfo));
        }
        JestManager.addESConfigs(list);
        JestManager.addESClusterMap(temMap);
        CLUSTER_LIST = clusters;
        LOGGER.info("load cluster success");
    }

}
