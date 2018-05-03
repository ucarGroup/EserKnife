package com.ucar.eser.front.controller.index;

import com.alibaba.fastjson.JSON;
import com.google.common.collect.Maps;
import com.ucar.eser.admin.service.clusterManager.ClusterInfoService;
import com.ucar.eser.core.bean.User;
import com.ucar.eser.core.bean.po.ClusterInfo;
import com.ucar.eser.core.bean.po.CustomUser;
import com.ucar.eser.core.jest.JestManager;
import com.ucar.eser.core.jest.common.EsCloudVoEnum;
import com.ucar.eser.core.jest.service.JestService;
import com.ucar.eser.core.util.ConfigUtil;
import com.ucar.eser.core.util.RequestContext;
import com.ucar.eser.core.util.RequestContextUtil;
import com.ucar.eser.core.util.common.Constant;
import com.ucar.eser.front.controller.indexmsg.IndexMsgController;
import io.searchbox.client.JestResult;
import org.apache.commons.codec.binary.Base64;
import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


/**
 *
 * Created by forest on 2016/8/5.
 */
@Controller
@RequestMapping("/")
public class EsProxyServerController {

    private static final Logger LOG = LoggerFactory.getLogger(EsProxyServerController.class);

    @Autowired
    JestService jestService;

    @Autowired
    ClusterInfoService clusterInfoService;


    /**
     * 前台系统入口
     * 判断登录用户获取产品线,根据产品线获取集群,如果有多个集群,先进列表页,反之,直接进集群页
     */
    @RequestMapping(value = "/frontRouter")
    public String frontRouter(Model model) {

        List<ClusterInfo> clusterInfos = clusterInfoService.getList(RequestContextUtil.getProductLine());

        if (clusterInfos != null && clusterInfos.size()>0) {
            if (clusterInfos.size() > 1) { //列表页
                Map<String,List<ClusterInfo>> resultMap = new HashMap<String, List<ClusterInfo>>();
                for (ClusterInfo clusterInfo : clusterInfos) {
                    List<ClusterInfo> cls = resultMap.get(clusterInfo.getProductLine());
                    if (CollectionUtils.isNotEmpty(cls)) {
                        cls.add(clusterInfo);
                    } else {
                        cls = new ArrayList<ClusterInfo>();
                        cls.add(clusterInfo);
                    }
                    resultMap.put(clusterInfo.getProductLine(), cls);
                }
                model.addAttribute("resultMap",resultMap);
                model.addAttribute("clusterInfos",clusterInfos);
                return "/jsp/clusterInfo/clusters4front.jsp";
            } else {
                //集群页
                return "/front?clusterId="+clusterInfos.get(0).getId();
            }
        }else{
        	User user = (User) RequestContext.getSessionAttribute(Constant.USER_SESSION_NAME);
        	model.addAttribute("userName", user != null ? user.getUserName() : null);
            model.addAttribute("userPwd", user != null ? user.getUserPwd() : null);
            model.addAttribute("userEmail", (user != null ? user.getUserName() : null) +"@***.com");
        	model.addAttribute("productLineList", EsCloudVoEnum.ProductLineEnum.values());
            return "/noRegister.jsp";
        }
    }

    /**
     * 跳转到集群页
     * @param clusterId 集群id
     * @param model model
     */
    @RequestMapping(value = "/front")
    public String front(@RequestParam("clusterId") String clusterId,Model model) {

        ClusterInfo clusterInfo = clusterInfoService.getClusterInfoById(Long.valueOf(clusterId));
        if(clusterInfo != null) {
        	model.addAttribute("nodeInfos", JSON.toJSONString(getNodeInfos4View(clusterInfo)));
        	CustomUser customUser = RequestContextUtil.getCustomUser();
        	model.addAttribute("clusterName",clusterInfo.getClusterName());
            model.addAttribute("clusterDescribe", clusterInfo.getClusterDescribe());
        	model.addAttribute("username", customUser != null ? customUser.getUserName() : null);
            model.addAttribute("isAdmin", customUser != null && customUser.getAdmin());
            model.addAttribute("isProd", ConfigUtil.I.envType());
            int versionFirst = new IndexMsgController().getVersionFirst(clusterInfo.getClusterName());
            model.addAttribute("versionFirst", versionFirst);
        }
        return "/jsp/index/frontIndex.jsp";
    }

    /**
     * 返回版本信息
     */
    @RequestMapping(value = "/es")
    @ResponseBody
    public Object es() {

        Map<String, Object> map = Maps.newHashMap();
        Map<String, Object> version = Maps.newHashMap();
        version.put("number", "2.3.2");
        map.put("version", version);
        return map;
    }


    /**
     * 代理所有前台发来的esapi请求
     * @param target 链接
     * @param clusterName 集群名称
     */
    @RequestMapping(value = "/esproxy")
    @ResponseBody
    public Object esproxy(@RequestParam("method") String method,
                          @RequestParam("target") String target,
                          @RequestParam("clusterName") String clusterName, HttpServletRequest request) {

        String execute = null;
        String realTarget = null;
        try {
            if (StringUtils.isBlank(method)) {
                method = "GET";
            }
            realTarget = new String(Base64.decodeBase64(target.getBytes("UTF-8")),"UTF-8");
            if(realTarget.equals("") || realTarget.equals("/") || realTarget.contains("/_template") || realTarget.contains("/_analyze")){
                String body =request.getParameter("data");
                JestResult result = (JestResult) jestService.httpProxy(clusterName,realTarget,method,body);
                if(result != null){
                    execute = result.getJsonString();
                }
            }else{
                execute  = JestManager.exucute(clusterName,realTarget);
            }
            return  JSON.parse(execute);
        } catch (Exception e) {
            LOG.error("代理请求 {} 集群 URL[{}] 求报错{}",clusterName, realTarget , e);
            return e.getMessage();
        }
    }

    private List<NodeInfo> getNodeInfos4View(ClusterInfo clusterInfo) {

        List<NodeInfo> nodeViews = new ArrayList<NodeInfo>();
        String hosts = clusterInfo.getHosts();
        if (StringUtils.isBlank(hosts)) {
            return nodeViews;
        }

        String[] hostArr = hosts.split(",");
        for (int i = 0; i < hosts.split(",").length; i++) {
            NodeInfo nodeInfo = new NodeInfo();
            nodeInfo.setIp(hostArr[i]);
            nodeViews.add(nodeInfo);
        }
        return nodeViews;
    }


    public static class NodeBaseInfo{
        private String ip;
        private String id;
        private String[] time;

        public String getIp() {
            return ip;
        }

        public void setIp(String ip) {
            this.ip = ip;
            this.id = ip.replace(".","");
        }

        public String getId() {
            return id;
        }

        public void setId(String id) {
            this.id = id;
        }

        public String[] getTime() {
            return time;
        }

        public void setTime(String[] time) {
            this.time = time;
        }
    }





    public static class NodeInfo extends NodeBaseInfo{
        private int[] rejectedThreadCount;
        private int[] queueThreadCount;
        private int[] activeThreadCount;
        private int[] largestThreadCount;
        private int[] completedThreadCount;

        public int[] getRejectedThreadCount() {
            return rejectedThreadCount;
        }

        public void setRejectedThreadCount(int[] rejectedThreadCount) {
            this.rejectedThreadCount = rejectedThreadCount;
        }

        public int[] getQueueThreadCount() {
            return queueThreadCount;
        }

        public void setQueueThreadCount(int[] queueThreadCount) {
            this.queueThreadCount = queueThreadCount;
        }

        public int[] getActiveThreadCount() {
            return activeThreadCount;
        }

        public void setActiveThreadCount(int[] activeThreadCount) {
            this.activeThreadCount = activeThreadCount;
        }

        public int[] getLargestThreadCount() {
            return largestThreadCount;
        }

        public void setLargestThreadCount(int[] largestThreadCount) {
            this.largestThreadCount = largestThreadCount;
        }

        public int[] getCompletedThreadCount() {
            return completedThreadCount;
        }

        public void setCompletedThreadCount(int[] completedThreadCount) {
            this.completedThreadCount = completedThreadCount;
        }
    }
}
