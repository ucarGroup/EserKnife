package com.ucar.eser.front.dao.bookmarks.impl;

import com.ucar.eser.core.bean.po.QueryCollectionInfo;
import com.ucar.eser.core.bean.po.QueryCollectionSubInfo;
import com.ucar.eser.core.ibatis.EserIbatisDaoImpl;
import com.ucar.eser.front.dao.bookmarks.QuerCollectDao;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class QuerCollectDaoImpl extends EserIbatisDaoImpl implements QuerCollectDao {

	@Override
	public List<QueryCollectionInfo> getQueryCollectionInfos(QueryCollectionInfo queryInfo) {
		return super.queryForList("escloud.querycollection.getQueryCollectionInfos",queryInfo);
	}

	@Override
	public Long insertQueryCollectionInfo(
			QueryCollectionInfo queryCollectionInfo) {
		return (Long) super.insert("escloud.querycollection.addQueryCollectionInfo", queryCollectionInfo);
	}

	@Override
	public void InsertQueryCollectionSubs(
			List<QueryCollectionSubInfo> queryCollectionSubInfos) {
		super.batchInsert("escloud.querycollection.addQueryCollectionSubInfo", queryCollectionSubInfos);
	}

	@Override
	public QueryCollectionInfo getDetailBySome(
			QueryCollectionInfo queryCollectionInfo) {
		return (QueryCollectionInfo) super.queryForObject("escloud.querycollection.getDetailBySome", queryCollectionInfo);
	}

	@Override
	public void updateCollectionInfo(QueryCollectionInfo queryCollectionInfo) {
		super.update("escloud.querycollection.updateCollectionInfo", queryCollectionInfo);
	}

}
