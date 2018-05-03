package com.ucar.eser.core.util.common;

import java.util.HashMap;
import java.util.Map;

public class RequestMap {
	
	private static Map<String, Object> map;
	static{
		map = new HashMap<String, Object>();
		map.put("/escloud/indexmsg/addNewType", "添加类型");
		map.put("/escloud/indexmsg/addNewCols", "添加字段");
		map.put("/escloud/indexmsg/settingIndex", "修改设置");
		map.put("/escloud/query/proxy", "查询");
		map.put("/escloud/indexmsg/addNewIndex", "创建索引");
		map.put("/escloud/indexmsg/getIndexList", "拉取集群索引");
		map.put("/escloud/rest/proxy", "客户端工具");
		map.put("/escloud/indexmsg/delIndex", "删除索引");
		map.put("/escloud/indexmsg/importIndex", "导入至本地集群");
	}
	
	public static Map<String, Object> getMap(){
		return map;
	}
}
