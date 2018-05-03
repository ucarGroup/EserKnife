package com.ucar.eser.core.util.http;

import com.ucar.eser.core.util.exception.ElasticAuthException;
import com.ucar.eser.core.util.exception.ElasticSearchException;
import org.apache.http.HttpEntity;
import org.apache.http.client.config.RequestConfig;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpRequestBase;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.impl.conn.PoolingHttpClientConnectionManager;
import org.apache.http.util.EntityUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;

/**
 * @author forest
 * @create 2017-02-28 10:50
 */
public class SimpleHttpClient {

    private static final Logger LOGGER = LoggerFactory.getLogger(SimpleHttpClient.class);

    private static final int SOCKET_TIMEOUT = 15000;

    private static final int CONNECTION_TIMEOUT = 5000;

    private static final int MAX_HTTP_CONNECTION = 1000;

    private static final int MAX_CONNECTION_PER_HOST = 200;

    private static final CloseableHttpClient httpClient;

    static {
        RequestConfig config = RequestConfig.custom()
                .setConnectTimeout(CONNECTION_TIMEOUT)
                .setSocketTimeout(SOCKET_TIMEOUT)
                .build();

        PoolingHttpClientConnectionManager cm = new PoolingHttpClientConnectionManager();
        cm.setMaxTotal(MAX_HTTP_CONNECTION);
        cm.setDefaultMaxPerRoute(MAX_CONNECTION_PER_HOST);


        httpClient = HttpClients.custom().setConnectionManager(cm).disableAutomaticRetries()
                .setDefaultRequestConfig(config).build();
    }

    public static String get(String url) throws Exception {

        HttpRequestBase request = new HttpGet(url);

        HttpEntity entity = null;
        CloseableHttpResponse response = null;
        try {
            response = httpClient.execute(request);
            if (response == null || response.getStatusLine() == null) {
                throw new ElasticSearchException("get http line error");
            }
            int statusCode = response.getStatusLine().getStatusCode();
            if (statusCode == 401) {
                throw new ElasticAuthException("401 authority error:username or password not correct");
            } else if (statusCode == 403) {
                throw new ElasticAuthException("403 pemission error:you have right to take current option");
            }
            entity = response.getEntity();

            String result = null;
            if (entity != null) {
                result = EntityUtils.toString(entity, "UTF-8");
            } else {
                result = String.valueOf(response.getStatusLine());
            }
            return result;
        } catch (Exception e) {
            throw e;
        } finally {
            try {
                EntityUtils.consume(entity);
            } catch (IOException e) {
                LOGGER.error("", e);
            }
            if (response != null) {
                try {
                    response.close();
                } catch (IOException e) {
                    LOGGER.error("连接关闭失败:", e);
                }
            }
            if (request != null) {
                request.releaseConnection();
            }
        }
    }
}
