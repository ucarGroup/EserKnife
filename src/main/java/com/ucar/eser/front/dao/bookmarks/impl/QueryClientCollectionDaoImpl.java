package com.ucar.eser.front.dao.bookmarks.impl;


import com.ucar.eser.core.bean.po.QueryClientCollection;
import com.ucar.eser.core.ibatis.EserIbatisDaoImpl;
import com.ucar.eser.front.dao.bookmarks.QueryClientCollectionDao;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class QueryClientCollectionDaoImpl extends EserIbatisDaoImpl implements QueryClientCollectionDao {

	@Override
	public List<QueryClientCollection> getQueryCollectionInfos(
			QueryClientCollection queryClientCollection) {
		return super.queryForList("escloud.clientCollection.getQueryCollectionInfos",queryClientCollection);
	}

	@Override
	public void insertQueryClientInfo(
			QueryClientCollection queryClientCollection) {
		super.insert("escloud.clientCollection.insertQueryClientInfo", queryClientCollection);
	}

	@Override
	public QueryClientCollection getDetailBySome(
			QueryClientCollection queryClientCollection) {
		return (QueryClientCollection) super.queryForObject("escloud.clientCollection.getDetailBySome", queryClientCollection);
	}

	@Override
	public void updateCollectionClientInfo(
			QueryClientCollection queryClientCollection) {
		super.update("escloud.clientCollection.updateCollectionClientInfo", queryClientCollection);
	}

}
