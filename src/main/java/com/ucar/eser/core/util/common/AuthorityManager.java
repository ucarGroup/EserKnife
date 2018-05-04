package com.ucar.eser.core.util.common;

import com.ucar.eser.admin.service.user.UserInfoService;
import com.ucar.eser.admin.service.user.impl.UserInfoServiceImpl;
import com.ucar.eser.core.bean.po.UserInfo;
import com.ucar.eser.core.init.SpringInit;
import com.ucar.eser.core.util.EncryptUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.naming.Context;
import javax.naming.directory.DirContext;
import javax.naming.directory.InitialDirContext;
import java.util.HashSet;
import java.util.Hashtable;
import java.util.Set;

/**
 * 
 * Description: 权限控制
 * All Rights Reserved.
 * Created on 2016-12-12 上午10:46:10
 */
public class AuthorityManager {
	
	public static final Set<String> ADMINURL =  new HashSet<String>();
	
	static {
		ADMINURL.add("/eserknife/clusterInfo/getList");
		ADMINURL.add("/eserknife/user/manager/getUserList");
		ADMINURL.add("/eserknife/manage/quartz/list");
		ADMINURL.add("/eserknife/alarm/rule/getAlarmRuleList");
        //索引管理
		ADMINURL.add("/eserknife/indexmsg/indexManager");
		ADMINURL.add("/eserknife/indexmsg/delIndex");
		ADMINURL.add("/eserknife/indexmsg/settingIndex");
		ADMINURL.add("/eserknife/indexmsg/addNewIndex");
        ADMINURL.add("/eserknife/indexmsg/addNewType");
		ADMINURL.add("/eserknife/indexmsg/reindex");
		ADMINURL.add("/eserknife/indexmsg/importIndex");
		ADMINURL.add("/eserknife/bigdesk/proxy");
		ADMINURL.add("/eserknife/query/exportOrDelete");
		ADMINURL.add("/eserknife/nodesmng/startOrStop");
	}

    private final static Logger LOGGER = LoggerFactory.getLogger(AuthorityManager.class);

    public static boolean passportCheck(String username, String password, Integer emailType) {
        // ldap 邮箱验证需要填写下边信息
        Hashtable<String, String> env = new Hashtable<String, String>();
        env.put(Context.INITIAL_CONTEXT_FACTORY, "");
        env.put(Context.PROVIDER_URL, "");//
        env.put(Context.SECURITY_PRINCIPAL, "");//
        env.put(Context.SECURITY_AUTHENTICATION, "");
        env.put(Context.SECURITY_PRINCIPAL, username + "");//
        env.put(Context.SECURITY_CREDENTIALS, password);
        DirContext ctx = null;
        try {
            ctx = new InitialDirContext(env);
            if (ctx != null) {
                return true;
            }
        } catch (Exception e) {
            LOGGER.error("登录认证失败 username="+username+",password="+password);
        } finally {
            if (ctx != null) {
                try {
                    ctx.close();
                } catch (Exception e) {
                    LOGGER.error("登录认证失败", e);
                }
            }
        }
        return false;
    }

    public static boolean dbCheck(String username, String password) {
        UserInfoService userInfoService = (UserInfoServiceImpl) SpringInit.getApplicationContext().getBean("userInfoServiceImpl");
        UserInfo  userInfo =userInfoService.getUserInfoByUserName(username);
        if(userInfo != null ){
            if(EncryptUtil.md5EncodeHex(password).equals(userInfo.getUserPwd())){
                return true;
            }else{
                return false;
            }
        }else{
            return false;
        }
    }
}
