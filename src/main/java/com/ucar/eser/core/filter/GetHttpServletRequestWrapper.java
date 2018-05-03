package com.ucar.eser.core.filter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletRequestWrapper;
import java.io.UnsupportedEncodingException;

/**
 *
 * Created by wangjiulin on 2017/10/30.
 */
public class GetHttpServletRequestWrapper extends HttpServletRequestWrapper {

    private String charset = "UTF-8";

    /**
     * Constructs a request object wrapping the given request.
     *
     * @param request
     * @throws IllegalArgumentException if the request is null
     */
    public GetHttpServletRequestWrapper(HttpServletRequest request) {
        super(request);
    }

    public GetHttpServletRequestWrapper(HttpServletRequest request, String chars) {
        super(request);
        this.charset = chars;
    }

    public String getParameter(String name) {
        String value = super.getParameter(name);
        value = value == null ? null : convert(value);
        return value;
    }

    public String convert(String target) {
        try {
            return new String(target.trim().getBytes("ISO-8859-1"), charset);
        } catch (UnsupportedEncodingException e) {
            return target;
        }
    }
}
