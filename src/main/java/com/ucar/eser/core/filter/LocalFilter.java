package com.ucar.eser.core.filter;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

/**
 *
 * Created by wangjiulin on 2017/10/30.
 */
public class LocalFilter implements Filter {

    String encoding=null;

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        encoding=filterConfig.getInitParameter("encoding");
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        if(encoding!=null){
            request.setCharacterEncoding(encoding);
            response.setContentType("text/html;charset="+encoding);
            response.setCharacterEncoding("UTF-8");
            HttpServletRequest req = (HttpServletRequest)request;
            if(req.getMethod().equalsIgnoreCase("get")){
                req=new GetHttpServletRequestWrapper(req,encoding);
            }
            chain.doFilter(req, response);
        }
    }

    @Override
    public void destroy() {
        encoding=null;
    }
}
