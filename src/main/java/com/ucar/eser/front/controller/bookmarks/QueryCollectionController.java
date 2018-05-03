
package com.ucar.eser.front.controller.bookmarks;

import com.alibaba.fastjson.JSONObject;
import com.google.common.collect.Lists;
import com.ucar.eser.core.bean.po.CustomUser;
import com.ucar.eser.core.bean.po.QueryCollectionInfo;
import com.ucar.eser.core.bean.po.QueryCollectionSubInfo;
import com.ucar.eser.core.util.RequestContextUtil;
import com.ucar.eser.core.util.StringUtils;
import com.ucar.eser.front.service.bookmarks.QuerCollectionService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/queryCollection")
public class QueryCollectionController {
	
	private static final Logger LOGGER = LoggerFactory.getLogger(QueryCollectionController.class);
	
	@Autowired
	private QuerCollectionService querCollectionService;

	@RequestMapping("/getList")
	public @ResponseBody Object getList(HttpServletRequest request){
		QueryCollectionInfo queryInfo = new QueryCollectionInfo();
		queryInfo.setClusterName(request.getParameter("clusterName"));
		Map<String, Object> resultMap=new HashMap<String, Object>();
		try {
			CustomUser customUser =  RequestContextUtil.getCustomUser();
			queryInfo.setUserName(customUser != null ? customUser.getUserName() : null);
			List<QueryCollectionInfo> queryCollectionInfos = querCollectionService.getQueryCollectionInfos(queryInfo);
			 List<Map<String,Object>> dbColNames = Lists.newArrayList();
			 if(!CollectionUtils.isEmpty(queryCollectionInfos)){
				 for(QueryCollectionInfo queryCollectionInfo : queryCollectionInfos){
					 Map<String, Object> params = new HashMap<String, Object>();
					 params.put("name", queryCollectionInfo.getName());
					 params.put("id", queryCollectionInfo.getId());
					 dbColNames.add(params);
				 }
			 }
			 resultMap.put("dbColNames", dbColNames);
		} catch (Exception e) {
			LOGGER.error("getQueryCollectionInfos ERROR", e);
		}
		return resultMap;
	}
	
	@RequestMapping("/getDetailByName")
	public @ResponseBody Object getDetailByName(HttpServletRequest request){
		String name = request.getParameter("name");
		String clusterName=request.getParameter("clusterName");
		Map<String, Object> map = new HashMap<String, Object>();
		try {
			QueryCollectionInfo qc = new QueryCollectionInfo();
			initQueryCollectionInfo(qc, null, null, clusterName, name);
			QueryCollectionInfo quCoInfo = querCollectionService.getDetailBySome(qc);
			map.put("data", quCoInfo);
		} catch (Exception e) {
			LOGGER.error("DETALI ERROR:", e);
		}
		return map;
	}
	
	@RequestMapping("updateState")
	public @ResponseBody Object updateState(HttpServletRequest request){
		Map<String, Object> resultMap=new HashMap<String, Object>();
		String id = request.getParameter("id");
		String clusterName = request.getParameter("clusterName");
		try {
			QueryCollectionInfo params = new QueryCollectionInfo();
			params.setId(Long.valueOf(id));
			QueryCollectionInfo queryCollectionInfo = querCollectionService.getDetailBySome(params);
			CustomUser customUser =RequestContextUtil.getCustomUser();
			if(queryCollectionInfo != null && clusterName.equals(queryCollectionInfo.getClusterName())
				 && customUser != null && customUser.getUserName().equals(queryCollectionInfo.getUserName())){//验证是本人操作
				queryCollectionInfo.setState(0);
				querCollectionService.updateCollectionInfo(queryCollectionInfo);//状态制成无效
				resultMap.put("success", true);
			}else{
				resultMap.put("checkError", true);
			}
		} catch (Exception e) {
			LOGGER.error("SATATE ERROR:", e);
		}
	
		return resultMap;
	}
	
	@RequestMapping("/save")
	public @ResponseBody Object saveCollectionInfos(HttpServletRequest request){
		Map<String, Object> resultMap=new HashMap<String, Object>();
		String name = request.getParameter("name");
		String indexName =request.getParameter("indexName");
		String maxNum = request.getParameter("maxNum");
		String clusterName = request.getParameter("clusterName");
		String[] queryConditions = request.getParameterValues("queryConditions");
		QueryCollectionInfo qc = new QueryCollectionInfo();
		try {
			initQueryCollectionInfo(qc,indexName,maxNum,clusterName,name);
			//验证该名字是否已经保存过
			QueryCollectionInfo checkQc = querCollectionService.getDetailBySome(qc);
			if(checkQc != null){//已存在过
				resultMap.put("done", true);
			}else{
				List<QueryCollectionSubInfo> queryCollectionSubInfos = null;
				if(queryConditions != null && queryConditions.length >0){
					queryCollectionSubInfos = new ArrayList<QueryCollectionSubInfo>();
					getQueryCollections(queryCollectionSubInfos,queryConditions);
				}
				querCollectionService.insertQueryInfo(qc, queryCollectionSubInfos);
				resultMap.put("success", true);
			}
		} catch (Exception e) {
			LOGGER.error("SAVE ERROR", e);
		}
		return resultMap;
	}
	
	/**
	 * 
	 *  wangjiulin 作者
	 * @param qc 参数
	 * @param indexName 参数
	 * @param maxNum 参数
	 * @param clusterName 参数
	 *  下午2:27:30 时间
	 */
	private void initQueryCollectionInfo(QueryCollectionInfo qc,
			String indexName, String maxNum, String clusterName,String name) {
		CustomUser customUser =  RequestContextUtil.getCustomUser();
		qc.setIndex(indexName);
		qc.setName(name);
		if(!StringUtils.isBlank(maxNum)){
			qc.setCount(Integer.valueOf(maxNum));
		}
		qc.setClusterName(clusterName);
		qc.setUserName(customUser != null ? customUser.getUserName() : null);
	}

	private void getQueryCollections(List<QueryCollectionSubInfo> queryCollectionSubInfos,String[] queryConditions) {
		for (String str : queryConditions) {
			JSONObject json = JSONObject.parseObject(str);
			QueryCollectionSubInfo qcs = new QueryCollectionSubInfo();
			qcs.setLogicVal(json.getString("fieldName"));
			qcs.setLogicCondition(json.getString("logicOps"));
			qcs.setCondition(json.getString("opsType"));
			qcs.setConVal(json.getString("qText"));
			qcs.setConGt(json.getString("gtOps"));
			qcs.setConLt(json.getString("ltOps"));
			qcs.setConGtTime(json.getString("gtText"));
			qcs.setConLtTime(json.getString("ltText"));
			qcs.setLevel(json.getInteger("cid"));
			queryCollectionSubInfos.add(qcs);
		}
	}

}
