package com.ucar.eser.admin.controller.index;

import com.ucar.eser.core.bean.User;
import com.ucar.eser.core.bean.po.CustomUser;
import com.ucar.eser.core.jest.common.EsCloudVoEnum;
import com.ucar.eser.core.util.RequestContext;
import com.ucar.eser.core.util.RequestContextUtil;
import com.ucar.eser.core.util.common.AuthorityManager;
import com.ucar.eser.core.util.common.Constant;
import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;

/**
 * 用户登录
 */
@Controller
@RequestMapping("/user")
public class LoginController {


	protected Logger LOGGER = LoggerFactory.getLogger(this.getClass());

	@RequestMapping(value = "/doRegist")
	public String doRegist(Model model) {
		model.addAttribute("productLineList", EsCloudVoEnum.ProductLineEnum.values());
		return "/noRegister.jsp";
	}

	/**
	 * 跳到登录页
	 */
	@RequestMapping(value = "/login")
    public ModelAndView login() {
        return new ModelAndView("/ucar/admin/login.jsp");
    }
	
	/**
	 * 登录
	 */
	@RequestMapping(value = "/" +
			"doLogin")
    public @ResponseBody Map<String,Object> loginValidate(String username, String password, Integer emailType) {
		Map<String, Object> retMap = new HashMap<String, Object>();
		retMap.put("result",false);
		try{
			if(StringUtils.isEmpty(username)){
				retMap.put("msg","用户名不能为空");
			}else if(StringUtils.isEmpty(password)){
				retMap.put("msg","密码不能为空");
			}else if ((StringUtils.equals(Constant.ADMIN, username) && StringUtils.equals(Constant.PWD, password)) ||
					AuthorityManager.passportCheck(username, password, emailType)
					|| AuthorityManager.dbCheck(username, password)) {
				saveSession(username,password);
				CustomUser customUser = RequestContextUtil.getCustomUser();
				if(customUser != null){
					retMap.put("isAdmin",customUser.isAdmin());
					retMap.put("result",true);
					if(customUser.getState() !=null && customUser.getState() == 1){
						retMap.put("state", customUser.getState());
						retMap.put("msg","管理员正在审批中，如果情况紧急请联系管理员");
					}else{
						RequestContext.setSessionAttribute(Constant.LOGIN_FLAG,true);
					}
				}
			}else{
				if(emailType != null){
					retMap.put("msg","邮箱校验失败");
				}else {
					retMap.put("msg","用户名或密码错误，如果有疑问，请联系管理员！");
				}
			}
		}catch (Exception e){
			LOGGER.error("登录验证报错：{}",e);
		}
		return retMap;
    }
	

	/**
	 * 登出
	 */
	@RequestMapping(value = "/logout")
    public @ResponseBody Map<String,Object> logout(HttpServletRequest request){
		Map<String, Object> retMap = new HashMap<String, Object>();
		try {
			invalidateSession(request);
			retMap.put("result", true);
		}catch (Exception e){
			retMap.put("result", false);
			retMap.put("msg", "退出失败");
		}
		return retMap;
	}

	public void saveSession(String userName,String userPwd){
		RequestContext.setSessionAttribute(Constant.CUSTOM_USER_SESSION_NAME, RequestContextUtil.getUserInfoByUserName(userName));
	    User user = new User();
	    user.setUserName(userName);
		user.setUserPwd(userPwd);
	    RequestContext.setSessionAttribute(Constant.USER_SESSION_NAME, user);
	}

	private void invalidateSession(HttpServletRequest request){
		request.getSession().invalidate();
	}
}
