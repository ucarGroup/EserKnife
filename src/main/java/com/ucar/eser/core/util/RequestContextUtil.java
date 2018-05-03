package com.ucar.eser.core.util;



import com.ucar.eser.admin.service.user.UserInfoService;
import com.ucar.eser.core.bean.po.CustomUser;
import com.ucar.eser.core.bean.po.UserInfo;
import com.ucar.eser.core.init.SpringInit;
import com.ucar.eser.core.util.common.Constant;

import javax.servlet.http.HttpSession;

public class RequestContextUtil {
    
	/**
	 * 
	 * Description:获取当前用户信息 
	 * Created on 2016-9-20 下午1:31:54
	 * @author  孔增（kongzeng@zuche.com）
	 * @return
	 */
	public static CustomUser getCustomUser() {
	    HttpSession session = RequestContext.getSession();
        if(session == null){
            return null;
        }

        Object user = session.getAttribute(Constant.CUSTOM_USER_SESSION_NAME);
        if(user != null){
            return (CustomUser)user;
        }
        return null;
	}
	
	/**
	 * 
	 * Description: 获取当前用户所属权限
	 * Created on 2016-9-20 下午1:32:39
	 * @author  孔增（kongzeng@zuche.com）
	 * @return
	 */
	public static String getProductLine() {
		CustomUser user = getCustomUser();
		if(user == null) {
			return null;
		}
		return  user.getProductLine();
	}
	
	/**
	 * 
	 * Description:获取当前用户名 
	 * Created on 2016-9-20 下午1:31:54
	 * @author  孔增（kongzeng@zuche.com）
	 * @return
	 */
	public static String getCustomUserName() {
		CustomUser user = getCustomUser();
		if(user == null) {
			return null;
		}
		return  user.getUserName();
	}
	
	/**
	 * 
	 * Description: 依赖数据库拼装CustomUser
	 * Created on 2016-9-20 下午1:50:25
	 * @author  孔增（kongzeng@zuche.com）
	 * @param userName
	 * @return
	 */
	public static CustomUser getUserInfoByUserName(String userName) {
		CustomUser user = new CustomUser();
		user.setUserName(userName);
		
		if(Constant.ADMIN.equals(userName)) {
			user.setAdmin(true);
			return user;
		}
		
		UserInfoService userInfoService = (UserInfoService) SpringInit.getApplicationContext().getBean("userInfoServiceImpl");
		UserInfo userInfo = userInfoService.getUserInfoByUserName(userName);
		if(userInfo!= null && userInfo.getState() ==1){//判断是不是审核通过 
			user.setState(1);
			userInfo = null;
		}
		if(userInfo != null) {
			user.setAdmin(userInfo.getRole() == 1);
			 if(!user.isAdmin()) {
				 user.setProductLine(userInfo.getProductLine());
				 user.setEsAccout(userInfo.getEsAccount());
				 user.setEsPwd(userInfo.getEsPwd());
			 }
		}else {
			user.setAdmin(false);
		}
		return user;
	}
}
