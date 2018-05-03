package com.ucar.eser.core.jest.common;

import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import io.searchbox.action.AbstractAction;
import io.searchbox.client.JestResult;
import org.apache.commons.lang3.StringUtils;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;

/**
 *
 * Created by wangjiulin on 2017/10/31.
 */
public abstract class AbstractLocalHttpAction <T extends JestResult> extends AbstractAction<T>  {

    protected String id;

    protected String methodName;

    private String queryParam;

    private String url;

    public AbstractLocalHttpAction(AbstractLocalHttpAction.Builder builder) {
        super(builder);
        this.queryParam = builder.queryParam;
        this.methodName = builder.methodName;
        this.url = builder.url;
    }

    protected JsonObject parseResponseBody(String responseBody) {
        if(this.url.contains("_cat")&& responseBody != null && !responseBody.trim().isEmpty()) {
            String str = "{\"result\":\""+responseBody +"\"}";
            return !str.trim().isEmpty()?(new JsonParser()).parse(str).getAsJsonObject():new JsonObject();
        }else{
            return responseBody != null && !responseBody.trim().isEmpty()?(new JsonParser()).parse(responseBody).getAsJsonObject():new JsonObject();
        }
    }

    public String getMethodName() {
        return this.methodName;
    }

    public String getQueryParam() {
        return this.queryParam;
    }

    public String getUrl() {
        return this.url;
    }

    public String getId() {
        return this.id;
    }

    protected String buildURI() {
        StringBuilder sb = new StringBuilder(super.buildURI());
        if(StringUtils.isNotBlank(this.id)) {
            try {
                sb.append("/").append(URLEncoder.encode(this.id, CHARSET));
            } catch (UnsupportedEncodingException var3) {
                log.error("Error occurred while adding document id to uri.", var3);
            }
        }

        return sb.toString();
    }

    protected abstract static class Builder<T extends AbstractLocalHttpAction, K> extends io.searchbox.action.AbstractAction.Builder<T, K> {
        private String url;
        private String methodName;
        private String queryParam;

        protected Builder() {
        }

        public K url(String url) {
            this.url = url;
            return (K)this;
        }

        public K methodName(String methodName) {
            this.methodName = methodName;
            return (K)this;
        }

        public K queryParam(String queryParam) {
            this.queryParam = queryParam;
            return (K)this;
        }

    }
}
