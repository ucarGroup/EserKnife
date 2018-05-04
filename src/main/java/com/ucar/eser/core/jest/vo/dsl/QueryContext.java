package com.ucar.eser.core.jest.vo.dsl;

import com.ucar.eser.core.jest.common.EsVoEnum.*;

/**
 *
 * Description: 查询上下文
 * All Rights Reserved.
 * Created on 2016-6-16 下午7:21:41
 */
public class QueryContext extends SearchContext{


    public QueryContext () {
        super.queryNode = new KeyNode(DSLKeyEnum.QUERY);
        super.root.addNode(queryNode);
    }


    public KeyNode addNode(Node customNode) {
        queryNode.addNode(customNode);
        return queryNode;
    }

    public KeyNode addFiled(String name, Object value) {
        queryNode.addField(name, value);
        return queryNode;
    }

    public KeyNode addNode(String name, Node customNode) {
        queryNode.addNode(name, customNode);
        return queryNode;
    }


    public KeyNode addFiled(DSLFieldKeyEnum fieldKeyEnum, Object value) {
        queryNode.addField(fieldKeyEnum, value);
        return queryNode;
    }

}
