package com.ucar.eser.admin.dao.token.impl;

import com.ucar.eser.admin.dao.token.TokenInfoDao;
import com.ucar.eser.core.bean.vo.token.TokenInfo;
import com.ucar.eser.core.ibatis.EserIbatisDaoImpl;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class TokenInfoDaoImpl extends EserIbatisDaoImpl implements TokenInfoDao {
	
	private final static String NAME_SPACE = "com.ucar.escloud.dao.token.TokenInfoDao.";

	@SuppressWarnings("unchecked")
	@Override
	public List<TokenInfo> getList() {
		return super.queryForList(NAME_SPACE+"getList");
	}

	@Override
	public TokenInfo getTokenInfoById(Long id) {
		return (TokenInfo) super.queryForObject(NAME_SPACE+"getTokenInfoById", id);
	}

    @Override
    public TokenInfo getTokenInfoByName(String name) {
        return (TokenInfo) super.queryForObject(NAME_SPACE+"getTokenInfoByName", name);
    }

	@Override
	public void addTokenInfo(TokenInfo TokenInfo) {
       super.insert(NAME_SPACE+"addTokenInfo", TokenInfo);
	}

    @Override
	public void updateTokenInfo(TokenInfo TokenInfo) {
		super.update(NAME_SPACE+"updateTokenInfo", TokenInfo);
	}

	@Override
	public void deleteTokenInfoById(Long id) {
		super.update(NAME_SPACE+"deleteTokenInfoById", id);
	}

	@Override
	public int checkExist(TokenInfo TokenInfo) {
		return (Integer) super.queryForObject(NAME_SPACE+"checkExist", TokenInfo);
	}

}
