package com.ucar.eser.core.jest.result.impl;

import com.alibaba.fastjson.JSONObject;
import com.ucar.eser.core.jest.result.ParseHandler;
import com.ucar.eser.core.jest.vo.AliasInfo;
import com.ucar.eser.core.jest.vo.SearchAliasReslut;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 *
 * Description: 查询别名返回结果解析
 * All Rights Reserved.
 * Created on 2016-7-22 下午4:36:21
 */
public class SearchAliasParseHandler extends ParseHandler {

    @Override
    public List<SearchAliasReslut> parseData(JSONObject json) {

        List<SearchAliasReslut> list = new ArrayList<SearchAliasReslut>();

        if(json == null) {
            return list;
        }

        for (Map.Entry<String, Object> entry : json.entrySet()) {
            String index = entry.getKey();
            JSONObject obj = json.getJSONObject(index).getJSONObject("aliases");
            if (obj.size() == 0) {
                continue;
            }
            SearchAliasReslut sar = new SearchAliasReslut(index);
            List<AliasInfo> aliasList = new ArrayList<AliasInfo>();
            sar.setAliases(aliasList);
            for (Map.Entry<String, Object> aliasEntry : obj.entrySet()) {
                aliasList.add(new AliasInfo(aliasEntry.getKey(), String.valueOf(aliasEntry.getValue())));
            }

            list.add(sar);

        }

        return list;
    }

}
