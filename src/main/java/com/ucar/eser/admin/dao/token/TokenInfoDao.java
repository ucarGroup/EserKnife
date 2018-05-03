package com.ucar.eser.admin.dao.token;


import com.ucar.eser.core.bean.vo.token.TokenInfo;

import java.util.List;

public interface TokenInfoDao {
	
	List<TokenInfo> getList();

    TokenInfo getTokenInfoById(Long id);
	
	void addTokenInfo(TokenInfo tokenInfo);

    TokenInfo getTokenInfoByName(String name);
	
	void updateTokenInfo(TokenInfo tokenInfo);
	
	void deleteTokenInfoById(Long id);
	
	int checkExist(TokenInfo tokenInfo);
	
}
