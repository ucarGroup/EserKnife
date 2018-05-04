package com.ucar.eser.core.util.http;


import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.util.HashMap;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;
import java.util.concurrent.atomic.AtomicInteger;


/**
 * HTTP通讯帮助类<br/> Created on 2013-9-9 上午10:36:06
 *
 * @since 3.2
 */
public final class DefaultHttpClient {

    public static final Logger LOG = LoggerFactory.getLogger(DefaultHttpClient.class);
    public static final String DEFAULT_CHARSET = "UTF-8";
    private static final String METHOD_POST = "POST";
    private static final String METHOD_GET = "GET";
    private static final int MAX_SIZE = 1024;

    private static final int DEFAULT_TIMEOUT = 5000;
    private static final int DEFAULT_CONNECT = 5000;
  //  private static final int DEFAULT_SOCKET_TIME = 5000;

    public static volatile AtomicInteger failCount  = new AtomicInteger(0);

    private DefaultHttpClient() {



    }

    /**
     * 执行HTTP POST请求。<br/> Created on 2013-9-9 上午10:37:13
     *
     * @param url            请求地址
     * @param params         请求参数
     * @param connectTimeout 客户端连接时间
     * @param readTimeout    服务端响应时间
     * @return 响应字符串
     * @since 3.2
     *
     *
     *
     */


    /**
     * 执行HTTP POST请求 <br/> Created on 2013-9-9 上午10:38:34
     *
     * @param url            请求地址
     * @param params         请求参数
     * @param charset        字符集，如UTF-8, GBK, GB2312
     * @param connectTimeout 客户端连接时间
     * @param readTimeout    服务端响应时间
     * @return 响应字符串
     * @since 3.2
     */
    public static String doPost(String url, Map<String, String> params, String type,String charset, int connectTimeout, int readTimeout) {

        String ctype = null;
        if(type == null) {
            ctype = "application/x-www-form-urlencoded;charset=" + charset;
        } else {
            ctype = type+";charset="+charset;
        }

        byte[] content = {};
        try {
            String query = buildQuery(params, charset);

            if (query != null) {
                content = query.getBytes(charset);
            }
        } catch (IOException e) {
            LOG.error(e.getMessage(), e);
        }
        return doPost(url, ctype, content, connectTimeout, readTimeout);
    }

    /**
     * 执行HTTP POST请求<br/> Created on 2013-9-9 上午10:39:31
     *
     * @param url            请求地址
     * @param ctype          请求类型
     * @param content        请求字节数组
     * @param connectTimeout 客户端连接时间
     * @param readTimeout    服务端响应时间
     * @return 响应字符串
     * @since 3.2
     */
    public static String doPost(String url, String ctype, byte[] content, int connectTimeout, int readTimeout) {
        HttpURLConnection conn = null;
        OutputStream out = null;
        String rsp = null;
        try {
            conn = getConnection(new URL(url), METHOD_POST, ctype,readTimeout,connectTimeout);
            conn.setConnectTimeout(connectTimeout);
            conn.setReadTimeout(readTimeout);
            out = conn.getOutputStream();
            out.write(content);
            rsp = getResponseAsString(conn);
        } catch (IOException e) {
            Map<String, String> map = getParamsFromUrl(url);
            LOG.error(map.get("serviceId") + "访问出现错误.");
        } finally {
            if (out != null) {
                try {
                    out.close();
                } catch (IOException e) {
                    LOG.error(e.getMessage(), e);
                }
            }
            if (conn != null) {
                conn.disconnect();
            }
        }
        return rsp;
    }

    /**
     * 执行HTTP GET请求<br/> Created on 2013-9-9 上午10:41:07
     *
     * @param url    请求地址
     * @param params 请求参数
     * @return 响应字符串
     * @since 3.2
     */
    public static String doGet(String url, Map<String, String> params,int readTimeOut,int connectionTimeout) throws Exception{
        if(readTimeOut <= 0) {
            readTimeOut = DEFAULT_TIMEOUT;
        }
        if(connectionTimeout <= 0) {
            connectionTimeout = DEFAULT_CONNECT;
        }
        return doGet(url, params, DEFAULT_CHARSET,readTimeOut,connectionTimeout);
    }

    /**
     * 执行HTTP GET请求<br/> Created on 2013-9-9 上午10:41:44
     *
     * @param url     请求地址
     * @param params  请求参数
     * @param charset 字符集，如UTF-8, GBK, GB2312
     * @return 响应字符串
     * @since 3.2
     */
    public static String doGet(String url, Map<String, String> params, String charset,int readTimeOut,int connectionTimeout) throws Exception{
        HttpURLConnection conn = null;
        String rsp = null;
        try {
            String ctype = "application/x-www-form-urlencoded;charset=" + charset;
            String query = buildQuery(params, charset);

            conn = getConnection(buildGetUrl(url, query), METHOD_GET, ctype,readTimeOut,connectionTimeout);
            rsp = getResponseAsString(conn);
            if(failCount.get() != 0) {
                failCount.set(0);
            }
        } catch (IOException e) {
            failCount.addAndGet(1);
            LOG.error(e.getMessage(),e);
            throw new Exception(e.getMessage());
        } finally {
            if (conn != null) {
                conn.disconnect();
            }
        }
        return rsp;
    }

    /**
     * 获取http连接<br/> Created on 2013-9-9 上午10:44:13
     *
     * @param url    请求地址
     * @param method 请求方法
     * @param ctype  请求类型
     * @return
     * @since 3.2
     */
    public static HttpURLConnection getConnection(URL url, String method, String ctype,int readTimeOut,int connectionTimeout) throws IOException{

        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        conn.setRequestMethod(method);
        conn.setDoInput(true);
        conn.setDoOutput(true);
        conn.setRequestProperty("Accept", "text/xml,text/javascript,text/html,text/plain");
        conn.setRequestProperty("Content-Type", ctype);
        conn.setRequestProperty("Accept-Language", "zh-CN");
        conn.setReadTimeout(readTimeOut);
        conn.setRequestProperty("Authorization","Basic c2RrOnBhc3M0U2Rr");
        conn.setConnectTimeout(connectionTimeout);
        return conn;


    }


    private static URL buildGetUrl(String strUrl, String query) throws IOException {
        StringBuffer buffer = new StringBuffer(strUrl);
        URL url = new URL(strUrl);
        if (StringUtils.isEmpty(query)) {
            return url;
        }

        if (StringUtils.isEmpty(url.getQuery())) {
            if (strUrl.endsWith("?")) {
                buffer.append(query);
            } else {
                buffer.append("?").append(query);
            }
        } else {
            if (strUrl.endsWith("&")) {
                buffer.append(query);
            } else {
                buffer.append("&").append(query);
            }
        }

        return new URL(buffer.toString());
    }

    /**
     * 构建http查询<br/> Created on 2013-9-9 上午10:44:56
     *
     * @param params  请求参数
     * @param charset 字符集，如UTF-8, GBK, GB2312
     * @return 查询字符串
     * @since 3.2
     */
    public static String buildQuery(Map<String, String> params, String charset) throws IOException{
        if (params == null || params.isEmpty()) {
            return null;
        }

        StringBuilder query = new StringBuilder();
        Set<Entry<String, String>> entries = params.entrySet();
        boolean hasParam = false;

        for (Entry<String, String> entry : entries) {
            String name = entry.getKey();
            String value = entry.getValue();
            // 忽略参数名或参数值为空的参数
            if (StringUtils.isNotBlank(name)) {
                if (hasParam) {
                    query.append("&");
                } else {
                    hasParam = true;
                }

                query.append(name).append("=").append(URLEncoder.encode(value, charset));

            }
        }

        return query.toString();
    }

    protected static String getResponseAsString(HttpURLConnection conn) throws IOException{
        String charset = getResponseCharset();
        InputStream es = conn.getErrorStream();
        String msg;
        if (es == null) {
            try {
                return getStreamAsString(conn.getInputStream(), charset);
            } catch (IOException e) {
                throw new IOException(e.getMessage()+",url is "+conn.getURL());
            }
        } else {
            msg = getStreamAsString(es, charset);
            if (StringUtils.isEmpty(msg)) {

            }
        }
        return msg;
    }

    private static String getStreamAsString(InputStream stream, String charset) throws IOException{
        try {
            BufferedReader reader = new BufferedReader(new InputStreamReader(stream, charset));
            StringWriter writer = new StringWriter();

            char[] chars = new char[MAX_SIZE];
            int count = 0;
            while ((count = reader.read(chars)) > 0) {
                writer.write(chars, 0, count);
            }
            return writer.toString();
        } catch (IOException e) {
            throw new IOException(e.getMessage());
        } finally {
            if (stream != null) {
                try {
                    stream.close();
                } catch (IOException e) {
                    LOG.error(e.getMessage(), e);
                }
            }
        }
    }

    private static String getResponseCharset() {
        String charset = DEFAULT_CHARSET;
        return charset;
    }

    /**
     * 使用默认的UTF-8字符集反编码请求参数值<br/> Created on 2013-9-9 上午10:52:28
     *
     * @param value 参数值
     * @return 反编码后的参数值
     * @since 3.2
     */
    public static String decode(String value) {
        return decode(value, DEFAULT_CHARSET);
    }

    /**
     * 使用默认的UTF-8字符集编码请求参数值<br/> Created on 2013-9-9 上午10:52:06
     *
     * @param value 参数值
     * @return 编码后的参数值
     * @since 3.2
     */
    public static String encode(String value) {
        return encode(value, DEFAULT_CHARSET);
    }

    /**
     * 使用指定的字符集反编码请求参数值<br/> Created on 2013-9-9 上午10:50:50
     *
     * @param value   参数值
     * @param charset 字符集
     * @return 反编码后的参数值
     * @since 3.2
     */
    public static String decode(String value, String charset) {
        String result = null;
        if (!StringUtils.isEmpty(value)) {
            try {
                result = URLDecoder.decode(value, charset);
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        }
        return result;
    }

    /**
     * 使用指定的字符集编码请求参数值<br/> Created on 2013-9-9 上午10:50:25
     *
     * @param value   参数值
     * @param charset 字符集
     * @return 编码后的参数值
     * @since 3.2
     */
    public static String encode(String value, String charset) {
        String result = null;
        if (!StringUtils.isEmpty(value)) {
            try {
                result = URLEncoder.encode(value, charset);
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        }
        return result;
    }


    private static Map<String, String> getParamsFromUrl(String url) {
        Map<String, String> map = null;
        if (url != null && url.indexOf('?') != -1) {
            map = splitUrlQuery(url.substring(url.indexOf('?') + 1));
        }
        if (map == null) {
            map = new HashMap<String, String>();
        }
        return map;
    }

    /**
     * 从URL中提取所有的参数。<br/> Created on 2013-9-9 上午10:49:40
     *
     * @param query query URL地址
     * @return 参数映射
     * @since 3.2
     */
    public static Map<String, String> splitUrlQuery(String query) {
        Map<String, String> result = new HashMap<String, String>();

        String[] pairs = query.split("&");
        if (pairs != null && pairs.length > 0) {
            for (String pair : pairs) {
                String[] param = pair.split("=", 2);
                if (param != null && param.length == 2) {
                    result.put(param[0], param[1]);
                }
            }
        }

        return result;
    }

}
