package com.ucar.eser.core.jest.result.impl;

import com.alibaba.fastjson.JSONObject;
import com.ucar.eser.core.jest.common.EsVoEnum.*;
import com.ucar.eser.core.jest.result.ParseHandler;
import com.ucar.eser.core.jest.vo.CrdResultDetailVo;

/**
 *
 * Description: 插入和全部更新返回结果解析器
 * All Rights Reserved.
 * Created on 2016-7-22 下午6:18:58
 */
public class CreateAndAllUpdateParseHandler extends ParseHandler {

    @Override
    public CrdResultDetailVo parseData(JSONObject json) {

        CrdResultDetailVo vo = new CrdResultDetailVo();

        if(json == null) {
            return vo;
        }

        vo.setJsonString(json.toJSONString());

        boolean isCreate = json.getBooleanValue(CREATED_NAME);

        if(isCreate) {
            vo.setOperateType(OperateTypeEnum.CREATE);
        }else {
            vo.setOperateType(OperateTypeEnum.ALLUPDATE);
        }

        vo.setIndex(json.getString(INDEX_NAME));
        vo.setType(json.getString(TYPE_NAME));
        vo.setId(json.getString(ID_NAME));

        vo.setSuccess(true);

        return vo;

    }

}
