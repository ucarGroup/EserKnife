package com.ucar.eser.admin.service.user.impl;


import com.ucar.eser.admin.dao.user.UserInfoDao;
import com.ucar.eser.admin.service.user.UserInfoService;
import com.ucar.eser.core.bean.po.UserInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserInfoServiceImpl implements UserInfoService {
	
	@Autowired
	private UserInfoDao userInfoDao;

	@Override
	public List<UserInfo> getList() {
		return userInfoDao.getList();
	}

	@Override
	public UserInfo getUserInfoById(Long id) {
		return userInfoDao.getUserInfoById(id);
	}
	
	@Override
	public UserInfo getUserInfoByUserName(String userName) {
		return userInfoDao.getUserInfoByUserName(userName);
	}

	@Override
	public void addUserInfo(UserInfo userInfo) {
       userInfoDao.addUserInfo(userInfo);
	}

	@Override
	public void updateUserInfo(UserInfo userInfo) {
		userInfoDao.updateUserInfo(userInfo);
	}

	@Override
	public void deleteUserInfoById(Long id) {
		userInfoDao.deleteUserInfoById(id);
	}

	@Override
	public boolean checkExist(UserInfo userInfo) {
		return userInfoDao.checkExist(userInfo) > 0;
	}

}
