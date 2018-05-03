package com.ucar.eser.core.util;


import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

/**
 * Created by wangjiulin on 2017/10/23.
 */
public class RequestContext {

    public static HttpServletRequest getRequest(){
        ServletRequestAttributes requestAttributes = (ServletRequestAttributes)RequestContextHolder.getRequestAttributes();
        return requestAttributes==null? null : requestAttributes.getRequest();
    }

    public static HttpSession getSession(){
        HttpServletRequest request=  getRequest();
        if(request == null){
            return null;
        }else {
            HttpSession session = getRequest().getSession(false);
            if(session == null){
                session = getRequest().getSession(true);
                session.setMaxInactiveInterval(1800);
            }
            return session;
        }

    }

    public static String getIp() {
        ServletRequestAttributes servletRequestAttributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        if(servletRequestAttributes!=null){
            HttpServletRequest request = servletRequestAttributes.getRequest();
            return request.getRemoteAddr();
        }
        return null;
    }

    public static Object getSessionAttribute(String name){
        HttpServletRequest request = getRequest();
        return request == null?null:getSession().getAttribute(name);
    }

    public static void setSessionAttribute(String name,Object value){
        HttpServletRequest request = getRequest();
        if(request!=null){
            getSession().setAttribute(name, value);
        }
    }

    public static Object getRequestAttribute(String name){
        HttpServletRequest request = getRequest();
        return request == null?null:request.getAttribute(name);
    }
    public static void setRequestAttribute(String name,Object value){
        HttpServletRequest request = getRequest();
        if(request!=null){
            request.setAttribute(name, value);
        }
    }

    public static String getContextPath() {
        return getRequest().getContextPath();
    }

    public static void removeSessionAttribute(String name) {
        getRequest().getSession().removeAttribute(name);
    }
}
