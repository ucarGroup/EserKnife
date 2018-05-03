package com.ucar.eser.admin.dao.user;


import com.ucar.eser.core.bean.po.UserInfo;

import java.util.List;

public interface UserInfoDao {
	
	List<UserInfo> getList();
	
	UserInfo getUserInfoById(Long id);
	
	UserInfo getUserInfoByUserName(String userName);
	
	void addUserInfo(UserInfo userInfo);
	
	void updateUserInfo(UserInfo userInfo);
	
	void deleteUserInfoById(Long id);
	
	int checkExist(UserInfo userInfo);

	List<UserInfo> getListByIds(List<Long> ids);
}
