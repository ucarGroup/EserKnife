package com.ucar.eser.front.controller.bookmarks;

import com.google.common.collect.Lists;
import com.ucar.eser.core.bean.po.CustomUser;
import com.ucar.eser.core.bean.po.QueryClientCollection;
import com.ucar.eser.core.util.RequestContextUtil;
import com.ucar.eser.front.service.bookmarks.QueryClientCollectionService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/queryClientCollection")
public class QueryClientCollectionController {
	
	private static final Logger LOGGER = LoggerFactory.getLogger(QueryClientCollectionController.class);
	
	@Autowired
	private QueryClientCollectionService queryClientCollectionService;

	@RequestMapping("/getList")
	public @ResponseBody Object getList(HttpServletRequest request){
		QueryClientCollection queryInfo = new QueryClientCollection();
		Map<String, Object> resultMap=new HashMap<String, Object>();
		try {
			queryInfo.setClusterName(request.getParameter("clusterName"));
			CustomUser customUser =  RequestContextUtil.getCustomUser();
			queryInfo.setUserName(customUser != null ? customUser.getUserName() : null);
			List<QueryClientCollection> queryCollectionInfos = queryClientCollectionService.getQueryCollectionInfos(queryInfo);
			 List<Map<String,Object>> dbColNames = Lists.newArrayList();
			 if(!CollectionUtils.isEmpty(queryCollectionInfos)){
				 for(QueryClientCollection queryCollectionInfo : queryCollectionInfos){
					 Map<String, Object> params = new HashMap<String, Object>();
					 params.put("name", queryCollectionInfo.getName());
					 params.put("id", queryCollectionInfo.getId());
					 dbColNames.add(params);
				 }
			 }
			 resultMap.put("dbColNames", dbColNames);
		} catch (Exception e) {
			LOGGER.error("getQueryClientCollectionInfos error", e);
		}
		
		return resultMap;
	}
	
	@RequestMapping("/getDetailByName")
	public @ResponseBody Object getDetailByName(HttpServletRequest request){
		String name = request.getParameter("name");
		String clusterName=request.getParameter("clusterName");
		Map<String, Object> map = new HashMap<String, Object>();
		try {
			QueryClientCollection qc = new QueryClientCollection();
			initQueryClientCollectionInfo(qc, null, null,null, clusterName, name);
			QueryClientCollection quCoInfo = queryClientCollectionService.getDetailBySome(qc);
			map.put("data", quCoInfo);
		} catch (Exception e) {
			LOGGER.error("getCollectionClientDetail  error", e);
		}

		return map;
	}
	
	@RequestMapping("updateState")
	public @ResponseBody Object updateState(HttpServletRequest request){
		Map<String, Object> resultMap=new HashMap<String, Object>();
		String id = request.getParameter("id");
		String clusterName = request.getParameter("clusterName");
		try {
			QueryClientCollection params = new QueryClientCollection();
			params.setId(Long.valueOf(id));
			QueryClientCollection queryClientCollection = queryClientCollectionService.getDetailBySome(params);
			CustomUser customUser = RequestContextUtil.getCustomUser();
			if(queryClientCollection != null && clusterName.equals(queryClientCollection.getClusterName())
					&& customUser!= null && customUser.getUserName().equals(queryClientCollection.getUserName())){//验证是本人操作
				queryClientCollection.setState(0);
				queryClientCollectionService.updateCollectionClientInfo(queryClientCollection);//状态制成无效
				resultMap.put("success", true);
			}else{
				resultMap.put("checkError", true);
			}
		} catch (Exception e) {
			LOGGER.error("updateClientState error", e);
		}
		return resultMap;
	}
	
	@RequestMapping("/save")
	public @ResponseBody Object saveCollectionInfos(HttpServletRequest request){
		Map<String, Object> resultMap=new HashMap<String, Object>();
		String name = request.getParameter("name");
		String requireUrl =request.getParameter("requireUrl");
		String requireMethod = request.getParameter("requireMethod");
		String requireContent = request.getParameter("requireContent");
		String clusterName = request.getParameter("clusterName");
		try {
			QueryClientCollection qc = new QueryClientCollection();
			initQueryClientCollectionInfo(qc,requireUrl,requireMethod,requireContent,clusterName,name);
			//验证该名字是否已经保存过
			QueryClientCollection checkQc = queryClientCollectionService.getDetailBySome(qc);
			if(checkQc != null){//已存在过
				resultMap.put("done", true);
			}else{
				queryClientCollectionService.insertQueryClientInfo(qc);
				resultMap.put("success", true);
			}
		} catch (Exception e) {
			LOGGER.error("saveClientCollection error", e);
		}
		return resultMap;
	}
	
	private void initQueryClientCollectionInfo(QueryClientCollection qc,
			String requireUrl, String requireMethod, String requireContent,
			String clusterName, String name) {
		CustomUser customUser =  RequestContextUtil.getCustomUser();
		qc.setName(name);
		qc.setRequireContent(requireContent);
		qc.setRequireMethod(requireMethod);
		qc.setRequireUrl(requireUrl);
		qc.setClusterName(clusterName);
		qc.setUserName(customUser != null ? customUser.getUserName() : null);
	}



}
