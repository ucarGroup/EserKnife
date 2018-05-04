package com.ucar.eser.admin.controller.clustermanager;


import com.ucar.eser.admin.service.clusterManager.ClusterInfoService;
import com.ucar.eser.core.bean.po.ClusterInfo;
import com.ucar.eser.core.jest.common.EsCloudVoEnum;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 
 * Description: es集群管理控制器
 * All Rights Reserved.
 * Created on 2016-9-13 下午2:34:59
 */
@Controller
@RequestMapping("/clusterInfo/")
public class ClusterInfoController {
	
	private static final Logger LOG = LoggerFactory.getLogger(ClusterInfoController.class);
	

	@Autowired
	private ClusterInfoService clusterInfoService;
	
	@RequestMapping(value = "getList")
    public String getClusterInfoList(Model model) {
        List<ClusterInfo> clusterInfoList = clusterInfoService.getList(null);
        model.addAttribute("aaData", clusterInfoList);
        model.addAttribute("productLineList", EsCloudVoEnum.ProductLineEnum.values());
        return "/jsp/clusterInfo/clusterInfoList.jsp";
    }
	
	
	@RequestMapping(value = "addClusterInfo")
    public @ResponseBody Map<String,Object> addClusterInfo(ClusterInfo clusterInfo) {
    	Map<String,Object> map = new HashMap<String, Object>();
    	try {
    		
    		if(clusterInfoService.checkExist(clusterInfo)) {
    			map.put("success", false);
    			map.put("msg", "此集群名已存在！");
    			return map;
    		}
			clusterInfoService.addClusterInfo(clusterInfo);
			map.put("success", true);
			map.put("msg", "保存成功！");
		} catch (Exception e) {
			map.put("success", false);
			map.put("msg", "保存失败！");
			LOG.error("创建失败",e);
		}
        return map;
    }
	
	@RequestMapping("getClusterInfo")
	public @ResponseBody Map<String,Object> getClusterInfo(Long id) {
		Map<String,Object> map = new HashMap<String,Object>();
		try {
			ClusterInfo clusterInfo = clusterInfoService.getClusterInfoById(id);
			if(clusterInfo != null) {
				clusterInfo.setOldClusterName(clusterInfo.getClusterName());
			}
			map.put("code", 1);
			map.put("data", clusterInfo);
		} catch (Exception e) {
			map.put("code", "获取详情失败！");
			LOG.error("获取集群详情失败",e);
		}
		return map;
	}
	
	
	@RequestMapping(value = "updateClusterInfo")
    public @ResponseBody Map<String,Object> updateClusterInfo(ClusterInfo clusterInfo) {
    	Map<String,Object> map = new HashMap<String, Object>();
    	try {
    		
    		if(clusterInfoService.checkExist(clusterInfo)) {
    			map.put("success", false);
    			map.put("msg", "此集群名已存在！");
    			return map;
    		}
			clusterInfoService.updateClusterInfo(clusterInfo);
			map.put("success", true);
			map.put("msg", "修改成功！");
		} catch (Exception e) {
			map.put("success", false);
			map.put("msg", "修改失败！");
			LOG.error("修改失败",e);
		}
        return map;
    }
	
	
	@RequestMapping(value = "deleteClusterInfo")
    public @ResponseBody Map<String,Object> deleteClusterInfo(Long id) {
    	Map<String,Object> map = new HashMap<String, Object>();
    	try {
			clusterInfoService.deleteClusterInfoById(id);
			map.put("success", true);
			map.put("msg", "删除成功！");
		} catch (Exception e) {
			map.put("success", false);
			map.put("msg", "删除失败！");
			LOG.error("删除失败",e);
		}
        return map;
    }

}
