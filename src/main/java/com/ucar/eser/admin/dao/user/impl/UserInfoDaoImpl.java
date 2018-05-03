package com.ucar.eser.admin.dao.user.impl;

import com.ucar.eser.admin.dao.user.UserInfoDao;
import com.ucar.eser.core.bean.po.UserInfo;
import com.ucar.eser.core.ibatis.EserIbatisDaoImpl;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class UserInfoDaoImpl extends EserIbatisDaoImpl implements UserInfoDao {
	
	private final static String NAME_SPACE = "com.ucar.escloud.dao.user.userInfoDao.";

	@SuppressWarnings("unchecked")
	@Override
	public List<UserInfo> getList() {
		return super.queryForList(NAME_SPACE+"getList");
	}

	@Override
	public UserInfo getUserInfoById(Long id) {
		return (UserInfo) super.queryForObject(NAME_SPACE+"getUserInfoById", id);
	}
	
	@Override
	public UserInfo getUserInfoByUserName(String userName) {
		return (UserInfo) super.queryForObject(NAME_SPACE+"getUserInfoByUserName", userName);
	}

	@Override
	public void addUserInfo(UserInfo userInfo) {
       super.insert(NAME_SPACE+"addUserInfo", userInfo);
	}

	@Override
	public void updateUserInfo(UserInfo userInfo) {
		super.update(NAME_SPACE+"updateUserInfo", userInfo);
	}

	@Override
	public void deleteUserInfoById(Long id) {
		super.update(NAME_SPACE+"deleteUserInfoById", id);
	}

	@Override
	public int checkExist(UserInfo userInfo) {
		return (Integer) super.queryForObject(NAME_SPACE+"checkExist", userInfo);
	}

	@Override
	public List<UserInfo> getListByIds(List<Long> ids) {
		return super.queryForList(NAME_SPACE+"getListByIds",ids);
	}

}
