package com.ucar.eser.core.util;

import org.apache.commons.configuration.ConfigurationException;
import org.apache.commons.configuration.PropertiesConfiguration;
import org.influxdb.InfluxDB;
import org.influxdb.InfluxDBFactory;
import org.influxdb.dto.Query;
import org.influxdb.dto.QueryResult;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.TimeUnit;

/**
 * Created by wangjiulin on 2017/11/6.
 */
public class InflusDbUtil {

    protected static Logger LOGGER = LoggerFactory.getLogger(InflusDbUtil.class);

    private static InfluxDB influxDB;

    public static String HOST_PORT;

    public static String USER_NAME;

    public static String PWD;

    public static String DATABASE;

    public static Boolean FLAG;

    static {
        PropertiesConfiguration propertiesConfiguration = null;
        try {
            propertiesConfiguration = new PropertiesConfiguration("influxdb.properties");
        } catch (ConfigurationException e) {
            e.printStackTrace();
        }
        if(propertiesConfiguration != null){
            HOST_PORT = propertiesConfiguration.getString("HOST_PORT");
            USER_NAME = propertiesConfiguration.getString("USER_NAME");
            PWD = propertiesConfiguration.getString("PWD");
            DATABASE = propertiesConfiguration.getString("DATABASE");
            FLAG = Boolean.valueOf(propertiesConfiguration.getString("FLAG"));
            try {
                influxDB = InfluxDBFactory.connect(HOST_PORT, USER_NAME, PWD);
                influxDB.enableBatch(2000, 100, TimeUnit.MILLISECONDS);
            }catch (Exception e){
                LOGGER.error("influxdb connect error:",e);
            }
        }
    }


    public static InfluxDB getConnection(){
        if(influxDB == null ){
            synchronized (InflusDbUtil.class){
                influxDB = InfluxDBFactory.connect(HOST_PORT, USER_NAME, PWD);
                influxDB.enableBatch(2000, 100, TimeUnit.MILLISECONDS);
            }
        }
        return influxDB;
    }


    public static QueryResult query(String q){
        return getConnection().query(new Query(q,DATABASE));
    }


    public static Map<String,Object> query(QueryResult queryResult,Integer seriesIndex,Integer valRow,Integer indexVal){
        Map<String,Object> map =new HashMap<String, Object>();
        String result = null;
       if(valRow != null && indexVal != null && queryResult != null){
           result =queryResult.getResults().get(0).getSeries().get(seriesIndex).getValues().get(valRow).get(indexVal).toString();
           map.put("result",result);
       }
        return map;
    }

}
