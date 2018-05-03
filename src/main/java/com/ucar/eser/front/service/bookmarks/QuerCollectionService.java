package com.ucar.eser.front.service.bookmarks;

import com.ucar.eser.core.bean.po.QueryCollectionInfo;
import com.ucar.eser.core.bean.po.QueryCollectionSubInfo;

import java.util.List;


public interface QuerCollectionService {

	/**
	 * 获取查询收藏 的 具体信息
	 * @description 
	 * @author wangjiulin
	 * @param queryInfo 
	 * @return
	 * @date 下午6:14:09
	 */
	List<QueryCollectionInfo> getQueryCollectionInfos(QueryCollectionInfo queryInfo);
	
	/**
	 * 查询收藏收集数据
	 * @description 
	 * @author wangjiulin
	 * @param queryCollectionInfo
	 * @param
	 * @date 下午6:18:32
	 */
	void insertQueryInfo(QueryCollectionInfo queryCollectionInfo, List<QueryCollectionSubInfo> querCollectionSubInfos);
	
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
	 * @param state
	 * @date 下午4:27:01
	 */
	void updateCollectionInfo(QueryCollectionInfo queryCollectionInfo);

}
