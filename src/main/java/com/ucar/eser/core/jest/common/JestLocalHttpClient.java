package com.ucar.eser.core.jest.common;

import com.google.gson.Gson;

/**
 *
 * Created by wangjiulin on 2017/10/31.
 */
public class JestLocalHttpClient extends LocalResultAbstractAction {

    private String query;

    protected JestLocalHttpClient(JestLocalHttpClient.Builder builder) {
        super(builder);
        this.setURI(this.buildURI()+""+getUrl());
        this.query = getQueryParam();
    }

    public String getRestMethodName() {
        return getMethodName();
    }

    public String getData(Gson gson) {
        return this.query;
    }
    public static class Builder extends AbstractLocalHttpAction.Builder<JestLocalHttpClient, JestLocalHttpClient.Builder> {

        public Builder(String url, String methodName,String queryParam) {
            this.url(url);
            this.methodName(methodName);
            this.queryParam(queryParam);
        }
        public JestLocalHttpClient build() {
            return new JestLocalHttpClient(this);
        }
    }

}
