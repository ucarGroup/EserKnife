package com.ucar.eser.core.interceptor;


import com.ucar.eser.core.bean.User;
import com.ucar.eser.core.bean.po.CustomUser;
import com.ucar.eser.core.util.RequestContext;
import com.ucar.eser.core.util.RequestContextUtil;
import com.ucar.eser.core.util.common.AuthorityManager;
import com.ucar.eser.core.util.common.Constant;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.PrintWriter;

public class UserInterceptor implements HandlerInterceptor {

    public boolean preHandle(HttpServletRequest request,
                             HttpServletResponse response, Object handler) throws Exception {

        if(request.getRequestURI().toLowerCase().indexOf("login") > 0
                || request.getRequestURI().toLowerCase().indexOf("logout") > 0 ||
                request.getRequestURI().toLowerCase().indexOf("doregist") > 0||
                request.getRequestURI().toLowerCase().indexOf("newtechplat") > 0||
                request.getRequestURI().toLowerCase().indexOf("user/manager/applyuserinfo") > 0) {
            return true;
        }

        User user = (User) RequestContext.getSessionAttribute(Constant.USER_SESSION_NAME);
        CustomUser customUser = (CustomUser) RequestContext.getSessionAttribute(Constant.CUSTOM_USER_SESSION_NAME);
        if (user != null) {

            if(customUser == null) {
                customUser = RequestContextUtil.getUserInfoByUserName(user.getUserName());
                RequestContext.setSessionAttribute(Constant.CUSTOM_USER_SESSION_NAME, customUser);
            }

            if(!checkUrl(request.getRequestURI(), customUser.isAdmin())) {
            //    response.sendRedirect(request.getContextPath() + "/noAuthority.jsp");
                response.setContentType("text/html;charset=UTF-8");
                PrintWriter writer = response.getWriter();
                writer.print("您没有权限访问该页面,如有疑问，请联系管理员!!");
                writer.close();
                return false;
            }

            return true;
        } else {
            response.sendRedirect(request.getContextPath() + "/login.jsp");
            return false;
        }
    }

    private boolean checkUrl(String url,boolean isAdmin) {
        if(isAdmin /*|| ConfigUtil.I.envType() != 3*/) {
            return true;
        }
        url = url.split("[.]")[0];
        return !AuthorityManager.ADMINURL.contains(url);
    }

    public void postHandle(HttpServletRequest request,
                           HttpServletResponse response, Object handler,
                           ModelAndView modelAndView) throws Exception {
    }

    public void afterCompletion(HttpServletRequest request,
                                HttpServletResponse response, Object handler, Exception ex)
            throws Exception {
    }
}