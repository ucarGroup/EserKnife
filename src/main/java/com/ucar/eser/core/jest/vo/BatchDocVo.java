package com.ucar.eser.core.jest.vo;

import com.ucar.eser.core.util.StringUtils;
import org.springframework.util.Assert;

import java.io.Serializable;

public class BatchDocVo extends VoItf implements Serializable {

    private String batchType ;
    /**
     * 记录拼装后的批量操作内容，监控统计使用
     */
    private String contents;

    public BatchDocVo() {}

    public BatchDocVo(String clusterName) {
        super.clusterName = clusterName;
    }


    public String getBatchType() {
        return batchType;
    }

    public void setBatchType(String batchType) {
        this.batchType = batchType;
    }

    public String getContents() {
        return contents;
    }

    public void setContents(String contents) {
        this.contents = contents;
    }

    /* (non-Javadoc)
     * @see com.zuche.framework.es.vo.VoItf#getUrl()
     */
    @Override
    public String getUrl() {
        if(StringUtils.isEmpty(this.batchType)){
            throw new IllegalArgumentException("batchType is not null!");
        }

        String url = "http://" + host ;
        if(!StringUtils.isEmpty(index)){
            url = url + "/" + index ;
        }
        if(!StringUtils.isEmpty(type)) {
            Assert.notNull(index, "when type is not null,index con't be null！");
            url = url + "/" + type ;
        }
        url = url + "/" + this.batchType;
        return url;
    }

}
