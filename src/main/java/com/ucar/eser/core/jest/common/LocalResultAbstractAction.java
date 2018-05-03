package com.ucar.eser.core.jest.common;

import com.google.gson.Gson;
import io.searchbox.client.JestResult;

/**
 *
 * Created by wangjiulin on 2017/10/31.
 */
public abstract class LocalResultAbstractAction extends AbstractLocalHttpAction<JestResult> {

    public LocalResultAbstractAction(Builder builder) {
        super(builder);
    }

    public JestResult createNewElasticSearchResult(String responseBody, int statusCode, String reasonPhrase, Gson gson) {
            return this.createNewElasticSearchResult(new JestResult(gson), responseBody, statusCode, reasonPhrase, gson);
    }

}
