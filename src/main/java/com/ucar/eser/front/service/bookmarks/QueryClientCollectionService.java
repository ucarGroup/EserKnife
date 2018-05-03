package com.ucar.eser.front.service.bookmarks;


import com.ucar.eser.core.bean.po.QueryClientCollection;

import java.util.List;

public interface QueryClientCollectionService {
	
	/**
	 * 获取查询收藏 的信息
	 * @description 
	 * @author wangjiulin
	 * @param queryClientCollection 
	 * @return
	 * @date 下午6:14:09
	 */
	List<QueryClientCollection> getQueryCollectionInfos(QueryClientCollection queryClientCollection);
	
	/**
	 * 收藏收集数据
	 * @description 
	 * @author wangjiulin
	 * @param queryClientCollection
	 * @date 下午6:18:32
	 */
	void insertQueryClientInfo(QueryClientCollection queryClientCollection);
	
	/**
	 * 
	 * @description 通过条件查询具体信息
	 * @author wangjiulin
	 * @param queryClientCollection
	 * @return
	 * @date 下午1:53:12
	 */
	QueryClientCollection getDetailBySome(QueryClientCollection queryClientCollection);
	
	/**
	 * 
	 * @description 逻辑删除操作
	 * @author wangjiulin
	 * @param
	 * @date 下午4:27:01
	 */
	void updateCollectionClientInfo(QueryClientCollection queryClientCollection);

}
