package com.ucar.eser.admin.service.token.impl;

import com.ucar.eser.admin.dao.token.TokenInfoDao;
import com.ucar.eser.admin.service.token.TokenInfoService;
import com.ucar.eser.core.bean.vo.token.TokenInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TokenInfoServiceImpl implements TokenInfoService {
	
	@Autowired
	private TokenInfoDao tokenInfoDao;

	@Override
	public List<TokenInfo> getList() {
		return tokenInfoDao.getList();
	}

	@Override
	public TokenInfo getTokenInfoById(Long id) {
		return tokenInfoDao.getTokenInfoById(id);
	}

    @Override
    public TokenInfo getTokenInfoByName(String name) {
        return tokenInfoDao.getTokenInfoByName(name);
    }
	
	@Override
	public void addTokenInfo(TokenInfo TokenInfo) {
       tokenInfoDao.addTokenInfo(TokenInfo);
	}

	@Override
	public void updateTokenInfo(TokenInfo TokenInfo) {
		tokenInfoDao.updateTokenInfo(TokenInfo);
	}

	@Override
	public void deleteTokenInfoById(Long id) {
		tokenInfoDao.deleteTokenInfoById(id);
	}

	@Override
	public boolean checkExist(TokenInfo TokenInfo) {
		return tokenInfoDao.checkExist(TokenInfo) > 0;
	}
	
	

}
