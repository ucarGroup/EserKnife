package com.ucar.eser.core.util.http;

import org.apache.commons.codec.binary.Base64;
import org.apache.http.HttpEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.slf4j.LoggerFactory;

import java.io.IOException;

/**
 *
 * Created by wangjiulin on 2018/4/19.
 */
public class HttpClientUtils {

    private static final org.slf4j.Logger LOG = LoggerFactory.getLogger(SimpleHttpClient.class);

    private static final String AUTHENKEY = "Authorization";

    private static final String BASICKEY = "Basic ";

    public static  String  getConnect(String url,String username,String password) {

        CloseableHttpResponse response = null;

        CloseableHttpClient client = HttpClients.createDefault();

        HttpGet httpGet = new HttpGet(url);
        Base64 token = new Base64();
        String authenticationEncoding = token.encodeAsString(new String(username + ":" + password).getBytes());

        httpGet.setHeader(AUTHENKEY, BASICKEY + authenticationEncoding);

        String responseContent = "";
        try {
            response = client.execute(httpGet);

            HttpEntity entity = response.getEntity();

            responseContent = EntityUtils.toString(entity, "UTF-8");

        } catch (IOException e) {
            LOG.error(e.toString());
        } finally {
            if (response != null) {
                try {
                    response.close();
                } catch (IOException e) {
                    LOG.error(e.toString());
                }
            }
            if (client != null) {
                try {
                    client.close();
                } catch (IOException e) {
                    LOG.error(e.toString());
                }
            }
        }
        return responseContent;
    }

}