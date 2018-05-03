package com.ucar.eser.core.bean.vo.alarm;

import java.io.Serializable;

/**
 *
 * Created by wangjiulin on 2018/2/1.
 */
public class AlarmResult implements Serializable {

    private static final long serialVersionUID = 3602599473787601610L;

    private Double result;

    public Double getResult() {
        return result;
    }

    public void setResult(Double result) {
        this.result = result;
    }
}
