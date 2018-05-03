package com.ucar.eser.core.util;

import org.apache.commons.configuration.ConfigurationException;
import org.apache.commons.configuration.PropertiesConfiguration;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


/**
 * Created by wangzhen on 2015/10/22
 */
public enum ConfigUtil {

    I;
    private final Logger LOGGER = LoggerFactory.getLogger(ConfigUtil.class);
    private PropertiesConfiguration impl;

    public PropertiesConfiguration getInstance() {
        if (impl == null) {
            try {
                impl = new PropertiesConfiguration("config.properties");
                impl.setAutoSave(true);
            } catch (ConfigurationException e) {
                LOGGER.error(e.getMessage(), e);
            }
        }
        return impl;
    }
    /**
     *
     * Description: 当前环境名称
     * Created on 2016-11-17 下午4:28:46
     * @author  孔增（kongzeng@zuche.com）
     * @return
     */
    public String envTypeName() {
        Integer envType = getInstance().getInteger("envType", 1);
        if(envType == 1) {
            return "【测试环境】";
        } else if(envType == 2) {
            return "【预生产环境】";
        } else if(envType == 3) {
            return "【生产环境】";
        } else {
            return "【测试环境】";
        }
    }

    /**
     *
     * Description: 当前环境标识
     * Created on 2016-11-17 下午4:29:04
     * @author  孔增（kongzeng@zuche.com）
     * @return
     */
    public Integer envType() {
        return getInstance().getInteger("envType", 1);
    }


    public String getHttpHostUrl(String hostList,String prefix) {
        return "http://"+hostList+"/"+prefix;
    }

}
