package com.ucar.eser.admin.controller.index;

import com.alibaba.fastjson.JSON;
import com.ucar.eser.admin.service.user.UserInfoService;
import com.ucar.eser.core.bean.po.CustomUser;
import com.ucar.eser.core.bean.po.UserInfo;
import com.ucar.eser.core.jest.common.EsCloudVoEnum;
import com.ucar.eser.core.util.RequestContextUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Map;


/**
 *
 * Created by user on 2016/8/5.
 */
@Controller
@RequestMapping("index")
public class IndexController {

    protected Logger LOGGER = LoggerFactory.getLogger(this.getClass());

    @Autowired
    private UserInfoService userInfoService;

    /**
     * 进入首页
     */
    @RequestMapping(value = "/nav")
    public String nav() {
          return "/jsp/index/index.jsp";
    }

    @RequestMapping("/techplat")
    public String techplat(){
        CustomUser user = RequestContextUtil.getCustomUser();
        if(user != null && user.isAdmin()) {//跳转至后台
            return "/index/nav";
        }else{//跳转至前台
            return "/frontRouter";
        }
    }


}
