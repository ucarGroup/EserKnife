package com.ucar.eser.core.jest.vo.dsl;

import com.alibaba.fastjson.JSONObject;
import com.ucar.eser.core.jest.common.EsVoEnum.*;

public abstract class Node extends JSONObject {

    /**
     *
     */
    private static final long serialVersionUID = -8173783528909022699L;

    private String nodeName;

    protected DSLEnum nodeNameEnum;

    protected boolean isArray = false;

    public String getNodeName() {
        return nodeName;
    }

    public void setNodeName(DSLEnum nodeNameEnum) {
        this.nodeNameEnum = nodeNameEnum;
        if(nodeNameEnum instanceof DSLKeyEnum) {
            isArray = ((DSLKeyEnum)nodeNameEnum).isArray();
        }
        this.nodeName = nodeNameEnum.getName();
    }

    protected void setNodeName(String nodeName) {
        this.nodeName = nodeName;
    }

    public DSLEnum getNodeNameEnum() {
        return nodeNameEnum;
    }


    public void setNodeNameEnum(DSLKeyEnum nodeNameEnum) {
        this.nodeNameEnum = nodeNameEnum;
    }

}