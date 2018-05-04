package com.ucar.eser.core.jest.result.impl;

import com.alibaba.fastjson.JSONObject;
import com.ucar.eser.core.jest.result.ParseHandler;
import com.ucar.eser.core.jest.vo.SearchResultDetailVO;

/**
 *
 * Description: 带有详细信息的查询结果解析器
 * All Rights Reserved.
 * Created on 2016-7-22 下午6:19:16
 */
public class SingleSearchParseHandler extends ParseHandler {

    @Override
    public SearchResultDetailVO parseData(JSONObject json) {

        SearchResultDetailVO resultVo;

        resultVo = new SearchResultDetailVO();
        resultVo.setIndex(json.getString(ParseHandler.INDEX_NAME));
        resultVo.setType(json.getString(ParseHandler.TYPE_NAME));
        resultVo.setId(json.getString(ParseHandler.ID_NAME));
        resultVo.setVersion(json.getLong(ParseHandler.VERSION_NAME));
        resultVo.setResult(json.getString(ParseHandler.SOURCE_NAME));

        return resultVo;
    }

}