package com.ucar.eser.front.service.bookmarks.impl;

import com.ucar.eser.core.bean.po.QueryCollectionInfo;
import com.ucar.eser.core.bean.po.QueryCollectionSubInfo;
import com.ucar.eser.front.dao.bookmarks.QuerCollectDao;
import com.ucar.eser.front.service.bookmarks.QuerCollectionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.CollectionUtils;

import java.util.List;

@Service
public class QuerCollectionServiceImpl implements QuerCollectionService {

	@Autowired
	private QuerCollectDao querCollectDao;
	
	@Override
	public List<QueryCollectionInfo> getQueryCollectionInfos(QueryCollectionInfo queryInfo) {
		return querCollectDao.getQueryCollectionInfos(queryInfo);
	}

	@Override
	@Transactional(rollbackFor=Throwable.class, readOnly=false)
	public void insertQueryInfo(QueryCollectionInfo queryCollectionInfo,
			List<QueryCollectionSubInfo> querCollectionSubInfos) {
		Long id = querCollectDao.insertQueryCollectionInfo(queryCollectionInfo);
		if(!CollectionUtils.isEmpty(querCollectionSubInfos)){
			for (QueryCollectionSubInfo queryCollectionSubInfo : querCollectionSubInfos) {
				queryCollectionSubInfo.setQcId(id);
			}
		}
		querCollectDao.InsertQueryCollectionSubs(querCollectionSubInfos);
	}

	@Override
	public QueryCollectionInfo getDetailBySome(
			QueryCollectionInfo queryCollectionInfo) {
		return querCollectDao.getDetailBySome(queryCollectionInfo);
	}

	@Override
	public void updateCollectionInfo(QueryCollectionInfo queryCollectionInfo) {
		querCollectDao.updateCollectionInfo(queryCollectionInfo);
	}

}
