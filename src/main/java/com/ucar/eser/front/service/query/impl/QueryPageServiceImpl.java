package com.ucar.eser.front.service.query.impl;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.ucar.eser.core.bean.vo.query.CondsVo;
import com.ucar.eser.core.bean.vo.query.QueryVo;
import com.ucar.eser.core.jest.common.EsVoEnum;
import com.ucar.eser.core.jest.common.EsVoEnum.DSLKeyEnum;
import com.ucar.eser.core.jest.result.ParseHandler;
import com.ucar.eser.core.jest.result.impl.RetainDetailParseHandler;
import com.ucar.eser.core.jest.vo.SearchResultDetailVO;
import com.ucar.eser.core.jest.vo.SearchResultVo;
import com.ucar.eser.core.jest.vo.dsl.FieldNode;
import com.ucar.eser.core.jest.vo.dsl.KeyNode;
import com.ucar.eser.core.jest.vo.dsl.QueryContext;
import com.ucar.eser.core.jest.vo.dsl.RangeNode;
import com.ucar.eser.core.init.SpringInit;
import com.ucar.eser.core.jest.service.impl.JestServiceImpl;
import com.ucar.eser.core.util.StringUtils;
import com.ucar.eser.front.service.query.QueryPageService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class QueryPageServiceImpl implements QueryPageService {

	@Override
	public Map<String,Object> query(String clusterName, String indexName , Integer maxNum , String conds) throws Exception {

		List<CondsVo> condsVos = JSONArray.parseArray(conds, CondsVo.class);
		
		QueryVo queryVo = new QueryVo(clusterName, indexName, maxNum);
		queryVo.setConds(condsVos);
		
		JestServiceImpl jestServiceImpl = (JestServiceImpl) SpringInit.getApplicationContext().getBean("jestServiceImpl");

		String resonse =jestServiceImpl.querySearch(clusterName,packageQuery(queryVo),indexName).getJsonString();

		ParseHandler pH = new RetainDetailParseHandler();
		
		SearchResultVo resultVo = (SearchResultVo) pH.parse(JSONObject.parseObject(resonse));
		Map<String,Object> map = new HashMap<String, Object>();
		
		List<Map<String,Object>> maps = new ArrayList<Map<String,Object>>();
		
		for(SearchResultDetailVO detail : resultVo.getResults()) {
			@SuppressWarnings("unchecked")
			Map<String,Object> row = JSONObject.parseObject(detail.getResult(),Map.class);
			row.put("_id",detail.getId());
			row.put("_type",detail.getType());
			row.put("_score",detail.getScore());
			maps.add(row);
		}
		
		map.put("data", maps);
		map.put("costTime", resultVo.getOriginalData().get("took"));
		map.put("docNum", resultVo.getTotal());
		return map;
		
	}


	/**
	 * 
	 * Description: 包装查询条件
	 * Created on 2016-10-21 下午1:54:02
	 * @param queryVo
	 * @return
	 */
	public static String packageQuery(QueryVo queryVo) {
		QueryContext qc = new QueryContext();
		KeyNode bool = new KeyNode(EsVoEnum.DSLKeyEnum.BOOL);
		
		for(CondsVo cVo : queryVo.getConds()) {
			KeyNode logicNode = null;
			
			if("must".equals(cVo.getLogicOps())) {
				logicNode = new KeyNode(EsVoEnum.DSLKeyEnum.MUST);
			}else if("must not".equals(cVo.getLogicOps())) {
				logicNode = new KeyNode(DSLKeyEnum.MUST_NOT);
			}
			
			if(StringUtils.isBlank(cVo.getFieldname())) {
				continue;
			}
			
			if("match".equals(cVo.getOpsType())) {
				if(!StringUtils.isBlank(cVo.getQText())) {
					logicNode.addNode(new KeyNode(DSLKeyEnum.MATCH).addField(cVo.getFieldname(), cVo.getQText()));
				}
			}else if("range".equals(cVo.getOpsType())) {
				RangeNode rangeNode = new RangeNode();
				
				FieldNode ln = new FieldNode(cVo.getFieldname());
				
				if(!StringUtils.isBlank(cVo.getGtOps()) && !StringUtils.isBlank(cVo.getGtText())) {
					ln.addField(cVo.getGtOps() , cVo.getGtText());
				}
				
				if(!StringUtils.isBlank(cVo.getLtOps()) && !StringUtils.isBlank(cVo.getLtText())) {
					ln.addField(cVo.getLtOps() , cVo.getLtText());
				}
				
				if(ln.size() > 0) {
					logicNode.addNode(rangeNode);
					rangeNode.put(cVo.getFieldname(),ln);
				}
				
			}else if("missing".equals(cVo.getOpsType())) {
				logicNode.addNode("missing",new KeyNode().addField("field", cVo.getFieldname()));
			}
			
			if(logicNode.size() > 0) {
				bool.addNode(logicNode);
			}
		}
		if(bool.size() > 0) {
			qc.addNode(bool);
		}else{
			qc.addNode(new KeyNode(DSLKeyEnum.MATCH_ALL));
		}
		qc.setPage(0, queryVo.getMaxNum());
		return qc.toString();
	}

}
