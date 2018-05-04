package com.ucar.eser.core.jest.vo;

import com.ucar.eser.core.jest.common.EsVoEnum.*;

import java.io.Serializable;

/**
 *
 * Description: es向外同步vo
 * All Rights Reserved.
 * Created on 2016-8-15 上午11:12:58
 */
public class EsSynDetailVo implements Serializable {

    /**
     *
     */
    private static final long serialVersionUID = 4798847850863790143L;
    /**
     * 操作类型
     */
    private OperateTypeEnum operateType;

    private String index;

    private String type;

    private String id;

    /**
     * 操作内容，格式为json串
     */
    private String content;

    public EsSynDetailVo() {}

    public EsSynDetailVo(OperateTypeEnum operateType, String index, String type,
                         String id, String content) {
        this.operateType = operateType;
        this.index = index;
        this.type = type;
        this.id = id;
        this.content = content;
    }



    public OperateTypeEnum getOperateType() {
        return operateType;
    }

    public void setOperateType(OperateTypeEnum operateType) {
        this.operateType = operateType;
    }

    public String getIndex() {
        return index;
    }

    public void setIndex(String index) {
        this.index = index;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    @Override
    public String toString() {
        return "ESSynVo [operateType=" + operateType + ", index=" + index
                + ", type=" + type + ", id=" + id + ", content=" + content
                + "]";
    }


}
