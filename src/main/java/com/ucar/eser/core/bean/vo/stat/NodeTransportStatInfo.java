package com.ucar.eser.core.bean.vo.stat;

import java.text.DecimalFormat;
import java.util.Date;

/**
 *
 * Created by wangjiulin on 2017/11/6.
 */
public class NodeTransportStatInfo {

    private String clustName;
    private Long clusterId;
    private String host;
    private Date createTime;
    private Long  rx_count;
    private Long  tx_count;
    private Long tx_size_in_bytes;
    private String tx_size;
    private String rx_size;
    private Long rx_size_in_bytes;
    private Long server_open;

    public Long getClusterId() {
        return clusterId;
    }

    public void setClusterId(Long clusterId) {
        this.clusterId = clusterId;
    }

    public String getClustName() {
        return clustName;
    }

    public void setClustName(String clustName) {
        this.clustName = clustName;
    }

    public String getHost() {
        return host;
    }

    public void setHost(String host) {
        this.host = host;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public Long getRx_count() {
        return rx_count;
    }

    public void setRx_count(Long rx_count) {
        this.rx_count = rx_count;
    }

    public Long getTx_count() {
        return tx_count;
    }

    public void setTx_count(Long tx_count) {
        this.tx_count = tx_count;
    }

    public Long getTx_size_in_bytes() {
        return tx_size_in_bytes;
    }

    public void setTx_size_in_bytes(Long tx_size_in_bytes) {
        this.tx_size_in_bytes = tx_size_in_bytes;
        this.tx_size = formatData(tx_size_in_bytes)+"gb";
    }

    public String getTx_size() {
        return tx_size;
    }

    public void setTx_size(String tx_size) {
        this.tx_size = tx_size;
    }

    public String getRx_size() {
        return rx_size;
    }

    public void setRx_size(String rx_size) {
        this.rx_size = rx_size;
    }

    public Long getRx_size_in_bytes() {
        return rx_size_in_bytes;
    }

    public void setRx_size_in_bytes(Long rx_size_in_bytes) {
        this.rx_size_in_bytes = rx_size_in_bytes;
        this.rx_size = formatData(rx_size_in_bytes)+"gb";
    }

    public Long getServer_open() {
        return server_open;
    }

    public void setServer_open(Long server_open) {
        this.server_open = server_open;
    }


    public String formatData(Long data){
        float num =(float)data/1024/1024/1024;
        DecimalFormat df = new DecimalFormat("0.0");
        String result = df.format(num);
        return result;
    }
}
