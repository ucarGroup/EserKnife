package com.ucar.eser.core.jest.vo.dsl;

import com.ucar.eser.core.jest.common.EsVoEnum;

/**
 *
 * Description:创建域结点
 * All Rights Reserved.
 * Created on 2016-6-29 下午12:11:04
 */
public class FieldNode extends Node {

    /**
     *
     */
    private static final long serialVersionUID = 3634169758351555211L;

    public FieldNode() {}

    public FieldNode (String fieldName) {
        super.setNodeName(fieldName);
    }

    public FieldNode addField(EsVoEnum.DSLFieldKeyEnum fieldKeyEnum, Object value) {
        this.put(fieldKeyEnum.getName(), value);
        return this;
    }

    public FieldNode addField(String fieldKey, Object value) {
        this.put(fieldKey, value);
        return this;
    }

}

