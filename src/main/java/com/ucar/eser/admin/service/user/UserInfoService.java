package com.ucar.eser.admin.service.user;


import com.ucar.eser.core.bean.po.UserInfo;

import java.util.List;

public interface UserInfoService {
	
	List<UserInfo> getList();
	
	UserInfo getUserInfoById(Long id);
	
	UserInfo getUserInfoByUserName(String userName);
	
	void addUserInfo(UserInfo userInfo);
	
	void updateUserInfo(UserInfo userInfo);
	
	void deleteUserInfoById(Long id);
	
	boolean checkExist(UserInfo userInfo);
	
}
