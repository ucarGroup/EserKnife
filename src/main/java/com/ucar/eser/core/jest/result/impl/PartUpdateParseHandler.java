package com.ucar.eser.core.jest.result.impl;

import com.alibaba.fastjson.JSONObject;
import com.ucar.eser.core.jest.common.EsVoEnum;
import com.ucar.eser.core.jest.result.ParseHandler;
import com.ucar.eser.core.jest.vo.CrdResultDetailVo;
import com.ucar.eser.core.util.exception.ElasticSearchException;

/**
 *
 * Description: 部分更新返回结果解析器
 * All Rights Reserved.
 * Created on 2016-7-22 下午6:18:58
 */
public class PartUpdateParseHandler extends ParseHandler {

    @Override
    public CrdResultDetailVo parseData(JSONObject json) {

        CrdResultDetailVo vo = new CrdResultDetailVo();

        vo.setOperateType(EsVoEnum.OperateTypeEnum.UPDATE);

        if(json == null) {
            return vo;
        }

        vo.setJsonString(json.toJSONString());

        JSONObject shard = json.getJSONObject(SHARD_NAME);

        int failed = shard.getIntValue(FAILED_NAME);
        int success = shard.getIntValue(SUCCESS_NAME);

        if(success > 0 && failed == 0) {
            vo.setSuccess(true);
        }

        vo.setIndex(json.getString(INDEX_NAME));
        vo.setType(json.getString(TYPE_NAME));
        vo.setId(json.getString(ID_NAME));

        return vo;

    }


    @Override
    public Object parseError(JSONObject originalData, Object error) {

        CrdResultDetailVo vo = new CrdResultDetailVo();

        if(originalData == null) {
            return vo;
        }

        vo.setJsonString(originalData.toJSONString());

        vo.setSuccess(false);

        int status = originalData.getIntValue(STATUS_NAME);
        if(status != 404) {
            throw new ElasticSearchException(error.toString());
        }

        return vo;
    }



}
