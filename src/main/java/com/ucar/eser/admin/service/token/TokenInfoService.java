package com.ucar.eser.admin.service.token;


import com.ucar.eser.core.bean.vo.token.TokenInfo;

import java.util.List;

public interface TokenInfoService {
	
	List<TokenInfo> getList();
	
	TokenInfo getTokenInfoById(Long id);

    TokenInfo getTokenInfoByName(String name);

    void addTokenInfo(TokenInfo TokenInfo);
	
	void updateTokenInfo(TokenInfo TokenInfo);
	
	void deleteTokenInfoById(Long id);
	
	boolean checkExist(TokenInfo TokenInfo);
	
}
