package com.ucar.eser.front.service.bookmarks.impl;

import com.ucar.eser.core.bean.po.QueryClientCollection;
import com.ucar.eser.front.dao.bookmarks.QueryClientCollectionDao;
import com.ucar.eser.front.service.bookmarks.QueryClientCollectionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class QueryClientCollectionImpl implements QueryClientCollectionService {
	
	@Autowired
	private QueryClientCollectionDao queryClientCollectionDao;

	@Override
	public List<QueryClientCollection> getQueryCollectionInfos(
			QueryClientCollection queryClientCollection) {
		return queryClientCollectionDao.getQueryCollectionInfos(queryClientCollection);
	}

	@Override
	public void insertQueryClientInfo(
			QueryClientCollection queryClientCollection) {
		queryClientCollectionDao.insertQueryClientInfo(queryClientCollection);
	}

	@Override
	public QueryClientCollection getDetailBySome(
			QueryClientCollection queryClientCollection) {
		return queryClientCollectionDao.getDetailBySome(queryClientCollection);
	}

	@Override
	public void updateCollectionClientInfo(
			QueryClientCollection queryClientCollection) {
		queryClientCollectionDao.updateCollectionClientInfo(queryClientCollection);
	}

}
