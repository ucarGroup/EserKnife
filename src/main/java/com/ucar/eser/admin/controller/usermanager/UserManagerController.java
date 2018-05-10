package com.ucar.eser.admin.controller.usermanager;


import com.ucar.eser.admin.service.user.UserInfoService;
import com.ucar.eser.core.bean.po.UserInfo;
import com.ucar.eser.core.util.ConfigUtil;
import com.ucar.eser.core.jest.common.EsCloudVoEnum;
import com.ucar.eser.core.util.EncryptUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 
 * Description: 用户管理控制器
 * All Rights Reserved.
 * Created on 2016-9-19 上午11:35:42
 */
@Controller
@RequestMapping("/user/manager/")
public class UserManagerController {
	
	private static final Logger LOG = LoggerFactory.getLogger(UserManagerController.class);
	
	@Autowired
	private UserInfoService userInfoService;

	@RequestMapping("getUserList")
	public String getUserList(Model model) {
		
		List<UserInfo> userList = userInfoService.getList();
		
		model.addAttribute("userList", userList);
		
		model.addAttribute("productLineList", EsCloudVoEnum.ProductLineEnum.values());
		
		return "/jsp/user/userInfoList.jsp";
	}
	
	
	
	@RequestMapping(value = "addUserInfo")
    public @ResponseBody Map<String,Object> addUserInfo(UserInfo userInfo) {
    	Map<String,Object> map = new HashMap<String, Object>();
    	try {
    		if(userInfoService.checkExist(userInfo)) {
    			map.put("success", false);
    			map.put("msg", "此用户名或邮箱已存在！");
    			return map;
    		}
			userInfo.setUserPwd(EncryptUtil.md5EncodeHex("000000"));
			userInfoService.addUserInfo(userInfo);
			map.put("success", true);
			map.put("msg", "保存成功！");
		} catch (Exception e) {
			map.put("success", false);
			map.put("msg", "保存失败！");
			LOG.error("创建失败",e);
		}
        return map;
    }
	
	@RequestMapping(value = "applyUserInfo")
    public @ResponseBody Map<String,Object> applyUserInfo(UserInfo userInfo) {
    	Map<String,Object> map = new HashMap<String, Object>();
    	try {
    		if(userInfoService.checkExist(userInfo)) {
    			map.put("success", false);
    			map.put("msg", "此用户名或邮箱已存在！");
    			return map;
    		}
    		if (ConfigUtil.I.envType() == 3) { //生产环境
    			userInfo.setState(1);
			} else {//非生产环境
				userInfo.setState(2);
			}
			userInfo.setUserPwd(EncryptUtil.md5EncodeHex(userInfo.getUserPwd()));
			userInfoService.addUserInfo(userInfo);
			map.put("success", true);
			if (ConfigUtil.I.envType() == 3) { //生产环境
				map.put("msg", "保存成功，请联系管理员（王久林、王唯）开通权限！");
			} else {//非生产环境
				map.put("msg", "保存成功，重新登录即可使用！");
			}
		} catch (Exception e) {
			map.put("success", false);
			map.put("msg", "保存失败！");
			LOG.error("创建失败",e);
		}
        return map;
    }
	
	@RequestMapping("getUserInfo")
	public @ResponseBody Map<String,Object> getUserInfo(Long id) {
		Map<String,Object> map = new HashMap<String,Object>();
		try {
			UserInfo UserInfo = userInfoService.getUserInfoById(id);
			map.put("code", 1);
			map.put("data", UserInfo);
		} catch (Exception e) {
			map.put("code", "获取详情失败！");
			LOG.error("获取集群详情失败",e);
		}
		return map;
	}
	
	@RequestMapping(value = "updateUserState")
    public @ResponseBody Map<String,Object> updateUserState(UserInfo userInfo) {
    	Map<String,Object> map = new HashMap<String, Object>();
    	try {
    		UserInfo userInfoParam = userInfoService.getUserInfoById(userInfo.getId());
    		if(userInfoParam != null){
    	  		userInfoParam.setState(2);
    			userInfoService.updateUserInfo(userInfoParam);
    			map.put("success", true);
    			map.put("msg", "审核用户通过！");
    		}else{
    			map.put("success", false);
    			map.put("msg", "审核用户失败,该用户已不存在！");
    		}
		} catch (Exception e) {
			map.put("success", false);
			map.put("msg", "审核用户失败！");
			LOG.error("审核用户失败",e);
		}
        return map;
    }
	
	@RequestMapping(value = "updateUserInfo")
    public @ResponseBody Map<String,Object> updateUserInfo(UserInfo userInfo) {
    	Map<String,Object> map = new HashMap<String, Object>();
    	try {
    		if(userInfoService.checkExist(userInfo)) {
    			map.put("success", false);
    			map.put("msg", "此用户名或邮箱已存在！");
    			return map;
    		}
			userInfoService.updateUserInfo(userInfo);
			map.put("success", true);
			map.put("msg", "修改成功！");
		} catch (Exception e) {
			map.put("success", false);
			map.put("msg", "修改失败！");
			LOG.error("修改失败",e);
		}
        return map;
    }
	
	
	@RequestMapping(value = "deleteUserInfo")
    public @ResponseBody Map<String,Object> deleteUserInfo(Long id) {
    	Map<String,Object> map = new HashMap<String, Object>();
    	try {
			userInfoService.deleteUserInfoById(id);
			map.put("success", true);
			map.put("msg", "删除成功！");
		} catch (Exception e) {
			map.put("success", false);
			map.put("msg", "删除失败！");
			LOG.error("删除失败",e);
		}
        return map;
    }
}
