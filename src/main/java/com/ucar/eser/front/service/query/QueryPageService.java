package com.ucar.eser.front.service.query;

import java.util.Map;


/**
 * 
 * Description: 
 * All Rights Reserved.
 * Created on 2016-10-21 下午2:19:30
 * @author  孔增（kongzeng@zuche.com）
 */
public interface QueryPageService {
	
	Map<String,Object> query(String clusterName, String indexName, Integer maxNum, String conds) throws Exception;
   
}
