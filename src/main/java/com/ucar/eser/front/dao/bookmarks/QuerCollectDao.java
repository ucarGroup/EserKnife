package com.ucar.eser.front.dao.bookmarks;


import com.ucar.eser.core.bean.po.QueryCollectionInfo;
import com.ucar.eser.core.bean.po.QueryCollectionSubInfo;

import java.util.List;

public interface QuerCollectDao {
	/**
	 * @description  获取查询收藏 的 具体信息
	 * @author wangjiulin
	 * @return
	 * @date 下午6:14:09
	 */
	List<QueryCollectionInfo> getQueryCollectionInfos(QueryCollectionInfo queryInfo);
	
	/**
	 * 
	 * @description 收集主查询信息
	 * @author wangjiulin
	 * @param queryCollectionInfo
	 * @return
	 * @date 下午6:27:47
	 */
	Long insertQueryCollectionInfo(QueryCollectionInfo queryCollectionInfo);
	
	/**
	 * 
	 * @description 收集子信息
	 * @author wangjiulin
	 * @param queryCollectionSubInfos
	 * @date 下午6:27:53
	 */
	void InsertQueryCollectionSubs(List<QueryCollectionSubInfo> queryCollectionSubInfos);
	
	/**
	 * 
	 * @description 通过条件查询具体信息
	 * @author wangjiulin
	 * @param queryCollectionInfo
	 * @return
	 * @date 下午1:53:12
	 */
	QueryCollectionInfo getDetailBySome(QueryCollectionInfo queryCollectionInfo);
	/**
	 * 
	 * @description 逻辑删除操作
	 * @author wangjiulin
	 * @param
	 * @date 下午4:27:01
	 */
	void updateCollectionInfo(QueryCollectionInfo queryCollectionInfo);
}
